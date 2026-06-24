import type { AIProviderPort } from "../ports/ai-provider.port";
import { ContextBuilderPort } from "../ports/context-builder.port";
import { ConversationRepositoryPort } from "../ports/conversation-repository.port";
import { StudentRepositoryPort } from "../ports/student-repository.port";
import type { ChatMessage } from "../../domain/entities/chat-message";
import type { ConversationChannel } from "../../domain/entities/conversation";
import { QuestionPolicy } from "../../domain/policies/question-policy";
import { systemPrompt } from "../../shared/config/system-prompt";

export interface ChatWithStudentAIInput {
    userId: number;
    messages: ChatMessage[];
    channel: ConversationChannel;
}

export class StudentNotFoundError extends Error {}
export class CheatRequestError extends Error {}

export class ChatWithStudentAIUseCase {
    constructor(
        private readonly studentRepository: StudentRepositoryPort,
        private readonly questionPolicy: QuestionPolicy,
        private readonly contextBuilder: ContextBuilderPort,
        private readonly aiProvider: AIProviderPort,
        private readonly conversationRepository: ConversationRepositoryPort
    ) {}

    async execute(input: ChatWithStudentAIInput): Promise<AsyncIterable<string>> {
        const lastMessage = input.messages[input.messages.length - 1];
        const question = lastMessage?.content ?? "";
        const intent = this.questionPolicy.classify(question);

        if (intent === "CHEAT_REQUEST") {
            // TODO: adaptar a politica de errores
            throw new CheatRequestError("No puedo proporcionar respuestas directas de evaluaciones. Puedo ayudarte a estudiar los temas relacionados.");
        }

        const student = this.studentRepository.getStudentById(input.userId);
        if (!student) {
            // TODO: adaptar a politica de errores
            throw new StudentNotFoundError("Usuario no encontrado");
        }

        const persistedMessages = this.conversationRepository
            .findByStudentId(input.userId, input.channel)
            ?.messages ?? [];

        if (lastMessage) {
            this.conversationRepository.appendMessage(input.userId, input.channel, lastMessage);
        }

        const context = this.contextBuilder.build(student.courses);

        const systemMessages: ChatMessage[] = [
            { role: "system", content: systemPrompt },
            { role: "system", content: context }
        ];

        const guidanceMessages: ChatMessage[] = intent === "STUDY_HELP"
            ? [{
                role: "system",
                content: `
                El usuario necesita ayuda para aprender.
                NO des respuestas directas.
                Explica conceptos paso a paso.
            `
            }]
            : [];

        const finalMessages: ChatMessage[] = [
            ...systemMessages,
            ...guidanceMessages,
            ...persistedMessages,
            ...(lastMessage ? [lastMessage] : [])
        ];

        const stream = await this.aiProvider.chat(finalMessages);
        return this.captureAssistantResponse(stream, input.userId, input.channel);
    }

    private captureAssistantResponse(
        stream: AsyncIterable<string>,
        userId: number,
        channel: ConversationChannel
    ): AsyncIterable<string> {
        const conversationRepository = this.conversationRepository;

        return (async function* () {
            let assistantResponse = "";

            for await (const chunk of stream) {
                assistantResponse += chunk;
                yield chunk;
            }

            if (assistantResponse.trim()) {
                conversationRepository.appendMessage(userId, channel, {
                    role: "assistant",
                    content: assistantResponse
                });
            }
        })();
    }
}
