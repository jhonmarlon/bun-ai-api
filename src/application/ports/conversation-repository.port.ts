import type { ChatMessage } from "../../domain/entities/chat-message";
import type { Conversation, ConversationChannel } from "../../domain/entities/conversation";

export abstract class ConversationRepositoryPort {
    abstract findByStudentId(studentId: number, channel: ConversationChannel): Conversation | undefined;
    abstract save(conversation: Conversation): void;
    abstract appendMessage(studentId: number, channel: ConversationChannel, message: ChatMessage): Conversation;
}
