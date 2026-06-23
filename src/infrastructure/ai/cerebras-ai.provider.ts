import type { ChatMessage } from './../../domain/entities/chat-message';
import Cerebras from '@cerebras/cerebras_cloud_sdk';
import type { AIProviderPort } from '../../application/ports/ai-provider.port';
import { sanitizeAIResponseStream } from '../../shared/utils/sanitize-ai-response';


const cerebras = new Cerebras();

export const cerebrasAIProvider: AIProviderPort = {
    name: 'Cerebras',
    async chat(messages: ChatMessage[]) {
        const stream = await cerebras.chat.completions.create({
            messages: messages as any,
            model: 'zai-glm-4.7',
            stream: true,
            max_completion_tokens: 65000,
            temperature: 0.2, // Libertad de la IA
            top_p: 0.95
        });

        const responseStream = (async function* () {
            for await (const chunk of stream) {
                yield (chunk as any).choices[0]?.delta?.content || '';
            }
        })();

        return sanitizeAIResponseStream(responseStream);
    }
}


