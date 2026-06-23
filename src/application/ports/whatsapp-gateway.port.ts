export abstract class WhatsAppGatewayPort {
    abstract sendMessage(phoneNumber: string, message: string): Promise<void>;
}
