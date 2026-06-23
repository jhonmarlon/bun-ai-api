import { AIRotatorService } from '../services/ai/ai-rotator.service';
import { ContextBuilder } from "../config/context-builder";
import { QuestionGuard } from "../config/question-guard";
import { systemPrompt } from '../config/system-prompt';
import type { ChatMessage } from '../contracts/ai.service';
import type { MoodleUserDatasource } from '../contracts/moodle-users.datasource';

export class IAController {
 
    constructor(
        private readonly moodleDatasource: MoodleUserDatasource,
        private readonly questionGuard: QuestionGuard,
        private readonly contextBuilder: ContextBuilder,
        private readonly aiRotatorService: AIRotatorService
    ){}

    async chat(req: Request) {
        const { messages, userId } = await req.json() as { messages: ChatMessage[], userId: number };

        // Question Guard
        const lastMessage = messages[messages.length - 1];
        const question = lastMessage?.content ?? "";

        const intent = this.questionGuard.classify(question);
        if (intent === "CHEAT_REQUEST") {
            return new Response(
                "No puedo proporcionar respuestas directas de evaluaciones. Puedo ayudarte a estudiar los temas relacionados.",
                { status: 403 }
            );
        }

        // Buscar el usuario
        const user = this.moodleDatasource.getUserById(userId);
        if (!user) {
            return new Response(
                "Usuario no encontrado",
                { status: 404 }
            );
        }

        // Context builder
        const context = this.contextBuilder.build(user.courses);

        // AI service round robin
        const service = this.aiRotatorService.getNextService();
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
}