import qrcode from "qrcode-terminal";
import { Client, LocalAuth } from "whatsapp-web.js";

export const whatsappClient = new Client({
    authStrategy: new LocalAuth()
});

let isWhatsAppInitialized = false;

export function initWhatsApp() {
    if (isWhatsAppInitialized) {
        console.log("WhatsApp ya fue inicializado. Se omite nueva inicialización.");
        return;
    }

    isWhatsAppInitialized = true;

    console.log("Inicializando WhatsApp...");

    whatsappClient.once("qr", (qr) => {
        console.log("QR recibido");
        qrcode.generate(qr, { small: true });
    });

    whatsappClient.once("authenticated", () => {
        console.log("Autenticado");
    });

    whatsappClient.once("ready", () => {
        console.log("WhatsApp conectado ✅");
    });

    whatsappClient.on("auth_failure", (msg) => {
        console.error("Error de autenticación:", msg);
        isWhatsAppInitialized = false;
    });

    whatsappClient.on("disconnected", (reason) => {
        console.log("Desconectado:", reason);
        isWhatsAppInitialized = false;
    });

    whatsappClient.initialize();
}
