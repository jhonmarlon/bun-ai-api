import type { AIService } from "../../contracts/ai.service";
import { cerebrasService } from "./cerebras";
import { groqService } from "./groq";

export class AIRotatorService {
    private readonly services: AIService[] = [
        groqService,
        cerebrasService
    ];
    private currentServiceIndex = 0;

    getNextService() {
        const service = this.services[this.currentServiceIndex];
        // Cada vez que se llama a la API se cambia el servicio, cuando se llega al ultimo se vuelve al primero
        this.currentServiceIndex = (this.currentServiceIndex + 1) % this.services.length;
        return service
    }
}

