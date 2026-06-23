import { ContextBuilder } from "../config/context-builder";
import { QuestionGuard } from "../config/question-guard";
import { IAController } from "../controllers/ai.controller";
import { MockMoodleUserDatasourceImpl } from "../data/mock-moodle-user.datasource.impl";
import { AIRotatorService } from "../services/ai/ai-rotator.service";


const moodleDatasource = new MockMoodleUserDatasourceImpl();
const questionGuard = new QuestionGuard();
const contextBuilder = new ContextBuilder();
const aiRotatorService = new AIRotatorService();


const iaController = new IAController(
    moodleDatasource,
    questionGuard,
    contextBuilder,
    aiRotatorService
);
export async function AIRoutes(
    req: Request,
    pathname: string
) {
    if(req.method === 'POST' && pathname === '/chat') {
        return iaController.chat(req);
    }
}