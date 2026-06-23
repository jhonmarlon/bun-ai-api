import { whatsAppController } from "../../../shared/di/container";

export async function handleWhatsAppRoutes(req: Request, pathname: string) {
    if (req.method === 'POST' && pathname === '/enviar-mensaje') {
        return whatsAppController.sendMessage(req);
    }
}
