
import { AIRoutes } from './routes/ai.routes';

const server = Bun.serve({
    port: process.env.PORT ?? 3000,

    async fetch(req: Request) {
        const { pathname } = new URL(req.url);

        const aiRoutes = await AIRoutes(req, pathname);
        if (aiRoutes) return aiRoutes;
        
        return new Response('Not found', { status: 404 })
    }
})

console.log(`Server is running on http://localhost:${server.port}`)