import { cerebrasService } from './services/cerebras';
import { groqService } from './services/groq';
import type { ChatMessage, AIService } from './types'; 

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

const server = Bun.serve({
    port: process.env.PORT ?? 3000,
    async fetch(req) {
        const { pathname } = new URL(req.url);

        if(req.method === 'POST' && pathname === '/chat') {
            const { messages } = await req.json() as { messages: ChatMessage[] };
            const service = getNextService();

            console.log(`Using ${service?.name} service to generate response`);
            const stream = await service?.chat(messages);

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