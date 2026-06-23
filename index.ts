
import { handleAiRoutes } from './src/presentation/http/routes/ai.routes';
import { handleWhatsAppRoutes } from './src/presentation/http/routes/whatsapp.routes';
import { initWhatsApp } from './src/infrastructure/whatsapp/whatsapp.client';

initWhatsApp();

const port = Number(process.env.PORT ?? 3000);

try {
    const server = Bun.serve({
        port,

        async fetch(req: Request) {
            const { pathname } = new URL(req.url);

            const whatsappRoutes = await handleWhatsAppRoutes(req, pathname);
            if (whatsappRoutes) return whatsappRoutes;

            const aiRoutes = await handleAiRoutes(req, pathname);
            if (aiRoutes) return aiRoutes;

            return new Response('Not found', { status: 404 })
        }
    })

    console.log(`Server is running on http://localhost:${server.port}`)
} catch (error) {
    console.error(`No se pudo iniciar el servidor en el puerto ${port}.`)
    console.error(error)
}
