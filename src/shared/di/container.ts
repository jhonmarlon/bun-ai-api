import { ChatWithStudentAIUseCase } from "../../application/use-cases/chat-with-student-ai.use-case";
import { ReceiveWhatsAppMessageUseCase } from "../../application/use-cases/receive-whatsapp-message.use-case";
import { SendWhatsAppMessageUseCase } from "../../application/use-cases/send-whatsapp-message.use-case";
import { QuestionPolicy } from "../../domain/policies/question-policy";
import { AIProviderRotator } from "../../infrastructure/ai/ai-provider-rotator";
import { ContextBuilder } from "../../infrastructure/ai/context-builder";
import { InMemoryConversationRepository } from "../../infrastructure/persistence/memory/in-memory-conversation.repository";
import { MockStudentRepository } from "../../infrastructure/persistence/mock/mock-student.repository";
import { WhatsAppGateway } from "../../infrastructure/whatsapp/whatsapp.gateway";
import { registerWhatsAppListener } from "../../infrastructure/whatsapp/whatsapp.listener";
import { AiController } from "../../presentation/http/controllers/ai.controller";
import { WhatsappController } from "../../presentation/http/controllers/whatsapp.controller";

const studentRepository = new MockStudentRepository();
const questionPolicy = new QuestionPolicy();
const contextBuilder = new ContextBuilder();
const aiProviderRotator = new AIProviderRotator();
const conversationRepository = new InMemoryConversationRepository();
const whatsAppGateway = new WhatsAppGateway();

const chatWithStudentAIUseCase = new ChatWithStudentAIUseCase(
    studentRepository,
    questionPolicy,
    contextBuilder,
    aiProviderRotator,
    conversationRepository
);

const sendWhatsAppMessageUseCase = new SendWhatsAppMessageUseCase(whatsAppGateway);
const receiveWhatsAppMessageUseCase = new ReceiveWhatsAppMessageUseCase(
    studentRepository,
    chatWithStudentAIUseCase,
    whatsAppGateway
);

registerWhatsAppListener(receiveWhatsAppMessageUseCase, whatsAppGateway);

export const aiController = new AiController(chatWithStudentAIUseCase);
export const whatsAppController = new WhatsappController(sendWhatsAppMessageUseCase);
