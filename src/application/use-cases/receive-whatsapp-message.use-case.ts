import { StudentRepositoryPort } from "../ports/student-repository.port";
import { WhatsAppGatewayPort } from "../ports/whatsapp-gateway.port";
import {
    ChatWithStudentAIUseCase,
    CheatRequestError
} from "./chat-with-student-ai.use-case";

export interface ReceiveWhatsAppMessageInput {
    phoneNumber: string;
    message: string;
}

export class StudentPhoneNotFoundError extends Error {}

export class ReceiveWhatsAppMessageUseCase {
    constructor(
        private readonly studentRepository: StudentRepositoryPort,
        private readonly chatWithStudentAIUseCase: ChatWithStudentAIUseCase,
        private readonly whatsAppGateway: WhatsAppGatewayPort
    ) {}

    async execute(input: ReceiveWhatsAppMessageInput): Promise<void> {
        const student = this.studentRepository.getStudentByPhoneNumber(input.phoneNumber);

        if (!student) {
            // TODO: adaptar a politica de errores
            throw new StudentPhoneNotFoundError("No existe un estudiante asociado a ese número de WhatsApp.");
        }

        try {
            const stream = await this.chatWithStudentAIUseCase.execute({
                userId: student.id,
                messages: [{ role: "user", content: input.message }],
                channel: "whatsapp"
            });

            const response = await this.collectResponse(stream);
            if (response.trim()) {
                await this.whatsAppGateway.sendMessage(input.phoneNumber, response);
            }
        } catch (error) {
            if (error instanceof CheatRequestError) {
                await this.whatsAppGateway.sendMessage(input.phoneNumber, error.message);
                return;
            }

            throw error;
        }
    }

    private async collectResponse(stream: AsyncIterable<string>) {
        let response = "";

        for await (const chunk of stream) {
            response += chunk;
        }

        return response;
    }
}
