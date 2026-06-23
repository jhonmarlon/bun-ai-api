import type { ChatMessage } from "../../domain/entities/chat-message";
import type { AIProviderPort } from "../../application/ports/ai-provider.port";
import { cerebrasAIProvider } from "./cerebras-ai.provider";
import { groqAIProvider } from "./groq-ai.provider";

export class AIProviderRotator implements AIProviderPort {
    readonly name = "AI Provider Rotator";
    private readonly services: AIProviderPort[] = [
        groqAIProvider,
        cerebrasAIProvider,
        // ia local
        // open ai provider
    ];
    private currentServiceIndex = 0;

    getNextService(): AIProviderPort {
        if (this.services.length === 0) {
            throw new Error("No hay proveedores de IA configurados.");
        }

        const service = this.services[this.currentServiceIndex];
        // Cada vez que se llama a la API se cambia el servicio, cuando se llega al ultimo se vuelve al primero
        this.currentServiceIndex = (this.currentServiceIndex + 1) % this.services.length;
        return service as AIProviderPort;
    }

    async chat(messages: ChatMessage[]): Promise<AsyncIterable<string>> {
        const service = this.getNextService();
        console.log(`Using ${service.name} service to generate response`);
        return service.chat(messages);
    }
}
