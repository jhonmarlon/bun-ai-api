import type { ChatMessage } from "../../../domain/entities/chat-message";


// TODO: mejorar dto para validaciones de las props
export interface ChatRequestDto {
    userId: number;
    messages: ChatMessage[];
}
