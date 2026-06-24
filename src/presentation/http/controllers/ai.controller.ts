import {
    ChatWithStudentAIUseCase,
    CheatRequestError,
    StudentNotFoundError
} from "../../../application/use-cases/chat-with-student-ai.use-case";
import type { ChatRequestDto } from "../dto/chat.request.dto";

export class AiController {
    constructor(
        private readonly chatWithStudentAIUseCase: ChatWithStudentAIUseCase
    ){}

    // TODO: Implementar sistema de errores
    async chat(req: Request) {
        let body: ChatRequestDto;

        try {
            body = await req.json() as ChatRequestDto;
        } catch {
            return Response.json(
                { error: "El body debe ser un JSON válido." },
                { status: 400 }
            );
        }

        try {
            const stream = await this.chatWithStudentAIUseCase.execute({
                userId: body.userId,
                messages: body.messages ?? [],
                channel: "web"
            });

            return new Response(stream, {
                headers: {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive'
                }
            })
        } catch (error) {
            if (error instanceof CheatRequestError) {
                return new Response(error.message, { status: 403 });
            }

            if (error instanceof StudentNotFoundError) {
                return new Response(error.message, { status: 404 });
            }

            console.error(error);
            return new Response("Error interno del servidor", { status: 500 });
        }
    }
}
