import { WhatsAppGatewayPort } from "../ports/whatsapp-gateway.port";

export interface SendWhatsAppMessageInput {
    phoneNumber: string;
    message: string;
}

export class InvalidWhatsAppNumberError extends Error {}

export class SendWhatsAppMessageUseCase {
    constructor(
        private readonly whatsAppGateway: WhatsAppGatewayPort
    ) {}

    async execute(input: SendWhatsAppMessageInput): Promise<void> {
        await this.whatsAppGateway.sendMessage(input.phoneNumber, input.message);
    }
}
