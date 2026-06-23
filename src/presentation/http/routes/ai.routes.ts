import { aiController } from "../../../shared/di/container";

export async function handleAiRoutes(
    req: Request,
    pathname: string
) {
    if(req.method === 'POST' && pathname === '/chat') {
        return aiController.chat(req);
    }
}
