import { InvalidWhatsAppNumberError } from "../../application/use-cases/send-whatsapp-message.use-case";
import { WhatsAppGatewayPort } from "../../application/ports/whatsapp-gateway.port";
import { whatsappClient } from "./whatsapp.client";

export class WhatsAppGateway extends WhatsAppGatewayPort {
    async sendMessage(phoneNumber: string, message: string): Promise<void> {
        const normalizedPhoneNumber = this.normalizePhoneNumber(phoneNumber);
        const numberDetails = await whatsappClient.getNumberId(normalizedPhoneNumber);

        if (!numberDetails?._serialized) {
            // TODO: Implementar en sistema de errores
            throw new InvalidWhatsAppNumberError("El numero de telefono no es valido.");
        }

        await whatsappClient.sendMessage(numberDetails._serialized, message);
    }

    // TODO: normalizar el phone number en un metodo de util
    private normalizePhoneNumber(phoneNumber: string) {
        return phoneNumber.startsWith("+") ? phoneNumber.substring(1) : phoneNumber;
    }
}
