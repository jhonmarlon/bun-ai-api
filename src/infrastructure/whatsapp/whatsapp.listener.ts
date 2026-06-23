import type { Message } from "whatsapp-web.js";
import { ReceiveWhatsAppMessageUseCase, StudentPhoneNotFoundError } from "../../application/use-cases/receive-whatsapp-message.use-case";
import { WhatsAppGateway } from "./whatsapp.gateway";
import { whatsappClient } from "./whatsapp.client";

let isWhatsAppListenerRegistered = false;

export function registerWhatsAppListener(
    receiveWhatsAppMessageUseCase: ReceiveWhatsAppMessageUseCase,
    whatsAppGateway: WhatsAppGateway
) {
     console.log("Registrando listener de WhatsApp...");

    if (isWhatsAppListenerRegistered) {
        return;
    }

    isWhatsAppListenerRegistered = true;
    
    /*whatsappClient.on("message_create", async (message: Message) => {
        console.log("message_create", {
            from: message.from,
            body: message.body,
            fromMe: message.fromMe
        });
    });*/

    // Evento de mensaje entrante
    whatsappClient.on("message", async (message: Message) => {
        if (message.fromMe) {
            return;
        }

        if (!isPrivateChat(message.from)) {
            return;
        }
        const phoneNumber = await resolveIncomingPhoneNumber(message);
        const text = message.body?.trim();

        if (!text || !phoneNumber) {
            return;
        }

        try {
            await receiveWhatsAppMessageUseCase.execute({
                phoneNumber,
                message: text
            });
        } catch (error) {
            // TODO: Implementar en sistema de errores
            if (error instanceof StudentPhoneNotFoundError) {
                console.warn(error.message, phoneNumber);

                await whatsAppGateway.sendMessage(
                    phoneNumber,
                    "Tu número no está registrado en el sistema académico, así que no puedo responderte todavía. Contactá al administrador o al docente para solicitar acceso."
                );

                return;
            }

            console.error("Error procesando mensaje entrante de WhatsApp:", error);
        }
    });
}

async function resolveIncomingPhoneNumber(message: Message) {
    if (message.from.endsWith("@c.us")) {
        return normalizeIncomingPhoneNumber(message.from);
    }

    if (message.from.endsWith("@lid")) {
        const contact = await message.getContact();
        const rawPhoneNumber = contact.id.user;

        console.log("Contacto resuelto desde @lid", {
            from: message.from,
            contactId: contact.id._serialized,
            rawPhoneNumber
        });

        if (!rawPhoneNumber) {
            return null;
        }

        return normalizeIncomingPhoneNumber(`${rawPhoneNumber}@c.us`);
    }

    return null;
}

function normalizeIncomingPhoneNumber(from: string) {
    const [rawPhoneNumber] = from.split("@");
    return `+${rawPhoneNumber}`;
}

function isPrivateChat(from: string) {
    return from.endsWith("@c.us") || from.endsWith("@lid");
}
