import { ConversationRepositoryPort } from "../../../application/ports/conversation-repository.port";
import type { ChatMessage } from "../../../domain/entities/chat-message";
import type { Conversation, ConversationChannel } from "../../../domain/entities/conversation";

export class InMemoryConversationRepository extends ConversationRepositoryPort {
    private readonly conversations = new Map<string, Conversation>();

    findByStudentId(studentId: number, channel: ConversationChannel): Conversation | undefined {
        return this.conversations.get(this.buildKey(studentId, channel));
    }

    save(conversation: Conversation): void {
        this.conversations.set(this.buildKey(conversation.studentId, conversation.channel), conversation);
    }

    appendMessage(studentId: number, channel: ConversationChannel, message: ChatMessage): Conversation {
        const existingConversation = this.findByStudentId(studentId, channel);

        const conversation: Conversation = existingConversation
            ? {
                ...existingConversation,
                messages: [...existingConversation.messages, message],
                updatedAt: new Date()
            }
            : {
                studentId,
                channel,
                messages: [message],
                updatedAt: new Date()
            };

        this.save(conversation);
        return conversation;
    }

    private buildKey(studentId: number, channel: ConversationChannel) {
        return `${studentId}:${channel}`;
    }
}
