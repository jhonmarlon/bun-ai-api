import type { AIService, ChatMessage } from '../../contracts/ai.service';
import Cerebras from '@cerebras/cerebras_cloud_sdk';


const cerebras = new Cerebras();

export const cerebrasService: AIService = {
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

        return (async function* () {
            for await (const chunk of stream) {
                yield (chunk as any).choices[0]?.delta?.content || '';
            }
        })()
    }
}


