import type { ChatMessage } from "./chat-message";

export type ConversationChannel = "web" | "whatsapp";

export interface Conversation {
    studentId: number;
    channel: ConversationChannel;
    messages: ChatMessage[];
    updatedAt: Date;
}
