import type { ChatMessage } from "../../domain/entities/chat-message";

export interface AIProviderPort {
    name: string;
    chat: (messages: ChatMessage[]) => Promise<AsyncIterable<string>>;
}