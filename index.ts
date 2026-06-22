import { MoodleContextBuilder } from './config/context-builder';
import { QuestionGuard } from './config/question-guard';
import { MoodleDatasource } from './data/datasource';
import { cerebrasService } from './services/cerebras';
import { groqService } from './services/groq';
import { systemPrompt } from './services/prompt.config';
import type { ChatMessage, AIService } from './types'; 

/* =========================
   SERVICES (ROUND ROBIN)
========================= */
const services: AIService[] = [
    groqService,
    cerebrasService,
    // Google gemini
    // Otro servicio pago o local

]
let currentServiceIndex = 0;

function getNextService() {
    const service = services[currentServiceIndex];
    // Cada vez que se llama a la API se cambia el servicio, cuando se llega al ultimo se vuelve al primero
    currentServiceIndex = (currentServiceIndex + 1) % services.length;
    return service
}

const moodleDatasource = new MoodleDatasource();
const questionGuard = new QuestionGuard();
const contextBuilder = new MoodleContextBuilder();

const server = Bun.serve({
    port: process.env.PORT ?? 3000,
    async fetch(req: Request) {
        const { pathname } = new URL(req.url);

        if(req.method === 'POST' && pathname === '/chat') {
            const { messages, userId } = await req.json() as { messages: ChatMessage[], userId: number };

            // Question Guard
            const lastMessage = messages[messages.length - 1];
            const question = lastMessage?.content ?? "";

            const intent = questionGuard.classify(question);
            if (intent === "CHEAT_REQUEST") {
                return new Response(
                    "No puedo proporcionar respuestas directas de evaluaciones. Puedo ayudarte a estudiar los temas relacionados.",
                    { status: 403 }
                );
            }

            // Buscar el usuario
            const user = moodleDatasource.getUserById(userId);
            if (!user) {
                return new Response(
                    "Usuario no encontrado",
                    { status: 404 }
                );
            }

            // Context builder
            const context = contextBuilder.build(user.courses);

            // AI service round robin
            const service = getNextService();
            console.log(`Using ${service?.name} service to generate response`);

            const systemMessages: ChatMessage[] = [
                {
                    role: 'system',
                    content: systemPrompt
                },
                {
                    role: 'system',
                    content: context
                }
            ];

            let finalMessages: ChatMessage[];

            if (intent === "STUDY_HELP") {
            finalMessages = [
                ...systemMessages,
                {
                role: "system",
                content: `
                    El usuario necesita ayuda para aprender.
                    NO des respuestas directas.
                    Explica conceptos paso a paso.
                `
                },
                ...messages
            ];
            } else {
            finalMessages = [
                ...systemMessages,
                ...messages
            ];
            }       

            const stream = await service?.chat(finalMessages);

            // Devolvemos un streaming de datos, conforme el modelo de IA nos va respondiendo
            // Vamoa a estar devolviendo los datos (Tiempo real conforme va generando la respuesta)
            return new Response(stream, {
                headers: {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive'
                }
            })
        }

        return new Response('Not found', { status: 404 })
    }
})

console.log(`Server is running on http://localhost:${server.port}`)