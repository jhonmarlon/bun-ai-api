import {
    InvalidWhatsAppNumberError,
    SendWhatsAppMessageUseCase
} from "../../../application/use-cases/send-whatsapp-message.use-case";

export class WhatsappController {
    constructor(
        private readonly sendWhatsAppMessageUseCase: SendWhatsAppMessageUseCase
    ) {}

    async sendMessage(req: Request) {
        let body: { phoneNumber?: string; message?: string };

        try {
            body = await req.json() as { phoneNumber?: string; message?: string };
        } catch {
            return Response.json(
                { error: 'El body debe ser un JSON válido.' },
                { status: 400 }
            );
        }

        const { phoneNumber = '+573226224623', message } = body;

        if (!message) {
            return Response.json(
                { error: 'El campo "message" es obligatorio.' },
                { status: 400 }
            );
        }

        try {
            await this.sendWhatsAppMessageUseCase.execute({ phoneNumber, message });
            return new Response('Mensaje enviado', { status: 200 });

        } catch (error) {
            // TODO: Implementar en sistema de errores
            if (error instanceof InvalidWhatsAppNumberError) {
                return Response.json(
                    { error: error.message },
                    { status: 400 }
                );
            }

            console.error(error);
            return Response.json(
                { error: 'Error interno del servidor.' },
                { status: 500 }
            );
        }
    }
}
