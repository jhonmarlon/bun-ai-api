import { ChatMessage } from './../types';
import { Groq } from 'groq-sdk';
import type { AIService } from '../types';

const groq = new Groq();

export const groqService: AIService = {
    name: 'Groq',
    async chat(messages: ChatMessage[]) {
        const chatCompletion = await groq.chat.completions.create({
            "messages": messages as any,
            "model": "qwen/qwen3.6-27b",
            "temperature": 0.2, // Libertad de la IA
            "max_completion_tokens": 4096,
            "top_p": 0.95,
            "stream": true,
            "reasoning_effort": "default",
            "stop": null
        });

        // Funcion generadora que retorna cada vez que tiene un trozo de la respuesta de la IA, 
        // Es decir, devuelve un stream donde se van añadiendo los trozos
        return (async function* () {
            for await (const chunk of chatCompletion) {
                // Devuelve el trozo de la IA en cada iteracion
                yield chunk.choices[0]?.delta?.content || '';
            }
        })()
    }
}

