# Bun AI WhatsApp Tutor API

API construida con **Bun + TypeScript** para asistir estudiantes de Moodle mediante **IA** y **WhatsApp**.

El sistema responde preguntas académicas usando el contexto del estudiante, sus cursos, actividades y syllabus, actuando como **tutor**, pero **sin revelar respuestas de quizzes o exámenes**.

---

## Features

- Chat académico con contexto de cursos Moodle
- Integración con múltiples proveedores de IA
- Flujo bidireccional por WhatsApp
- Protección contra solicitudes de cheating
- Clean Architecture
- Repositorio mock para pruebas locales
- Sanitización de respuestas para evitar exponer bloques internos como `<think>`

---

## Stack

- Bun
- TypeScript
- whatsapp-web.js
- Groq
- Cerebras
- Clean Architecture

---

## Project Structure

```text
src
├── application
│   ├── ports
│   └── use-cases
├── domain
│   ├── entities
│   └── policies
├── infrastructure
│   ├── ai
│   ├── persistence
│   │   ├── memory
│   │   └── mock
│   └── whatsapp
├── presentation
│   └── http
│       ├── controllers
│       ├── dto
│       └── routes
└── shared
    ├── config
    ├── di
    └── utils
Layer Responsibilities
Domain
Contiene las entidades y reglas centrales del negocio.
- Entities
- Policies
Ejemplos:
- Student
- Course
- Activity
- Conversation
- QuestionPolicy
Application
Orquesta los casos de uso de la aplicación y define los contratos que necesita.
- Use Cases
- Ports
Ejemplos:
- ChatWithStudentAIUseCase
- ReceiveWhatsAppMessageUseCase
- SendWhatsAppMessageUseCase
- AIProviderPort
- StudentRepositoryPort
- ConversationRepositoryPort
- WhatsAppGatewayPort
- ContextBuilderPort
Infrastructure
Implementaciones concretas de servicios externos y persistencia.
- AI Providers
- WhatsApp Client / Gateway / Listener
- Repositorios mock y en memoria
Ejemplos:
- groq-ai.provider.ts
- cerebras-ai.provider.ts
- ai-provider-rotator.ts
- context-builder.ts
- whatsapp.client.ts
- whatsapp.gateway.ts
- whatsapp.listener.ts
- mock-student.repository.ts
- in-memory-conversation.repository.ts
Presentation
Puntos de entrada HTTP al sistema.
- Controllers
- Routes
- DTOs
Ejemplos:
- ai.controller.ts
- whatsapp.controller.ts
- ai.routes.ts
- whatsapp.routes.ts
- chat.request.dto.ts
Shared
Configuración, composición de dependencias y utilidades transversales.
- Config
- Dependency Injection
- Utilities
Ejemplos:
- system-prompt.ts
- container.ts
- sanitize-ai-response.ts
Dependency Flow
Presentation
      ↓
Application
      ↓
Domain

Infrastructure ─────► Application
Infrastructure ─────► Domain
Las dependencias siempre apuntan hacia el núcleo del negocio, manteniendo el dominio aislado de frameworks, proveedores de IA y tecnologías externas.
Architecture Overview
                   ┌──────────────┐
                   │   WhatsApp   │
                   └──────┬───────┘
                          │
                   ┌──────▼───────┐
                   │ Presentation │
                   └──────┬───────┘
                          │
                   ┌──────▼───────┐
                   │ Application  │
                   └──────┬───────┘
                          │
                   ┌──────▼───────┐
                   │    Domain    │
                   └──────┬───────┘
                          │
          ┌───────────────┼──────────────────────┐
          │               │                      │
   ┌──────▼──────────┐ ┌──▼─────────┐ ┌─────────▼────────┐
   │ Mock Student    │ │    Groq    │ │    Cerebras      │
   │ Repository      │ └────────────┘ └──────────────────┘
   └─────────────────┘
Requirements
- Bun (https://bun.sh/)
- Una cuenta de WhatsApp para vincular el bot
- API keys de los proveedores de IA
Environment Variables
Creá un archivo .env con valores como estos:
PORT=3000
GROQ_API_KEY=your_groq_key
CEREBRAS_API_KEY=your_cerebras_key
Installation
bun install
Run Locally
bun run index.ts
o en modo desarrollo:
bun --watch run index.ts
WhatsApp Authentication
La primera vez que ejecutes la app, se generará un QR en consola.
Debés escanearlo con la cuenta de WhatsApp que actuará como bot.
Importante
- .wwebjs_auth/ guarda la sesión autenticada
- .wwebjs_cache/ guarda cache local
- ninguno de esos directorios debe subirse al repositorio
Agregalos a tu .gitignore:
.wwebjs_auth/
.wwebjs_cache/
Endpoints
POST /chat
Canal HTTP para probar el caso de uso académico.
Body
{
  "userId": 1,
  "messages": [
    {
      "role": "user",
      "content": "¿Qué actividades tengo pendientes?"
    }
  ]
}
Response
Stream de texto generado por la IA.
POST /enviar-mensaje
Envía un mensaje manual por WhatsApp.
Body
{
  "phoneNumber": "+573001112233",
  "message": "Hola"
}
WhatsApp Bidirectional Flow
1. Un estudiante envía un mensaje al número del bot
2. El listener de WhatsApp captura el mensaje
3. El sistema identifica al estudiante por phoneNumber
4. Se ejecuta el caso de uso académico con contexto del estudiante
5. La respuesta se envía de vuelta por WhatsApp
Nota
Actualmente la relación estudiante ↔ número telefónico se resuelve con datos mock.
Academic Safety Rules
La IA puede:
- explicar conceptos del curso
- ayudar a preparar evaluaciones
- resumir temas del syllabus
- orientar sobre actividades pendientes
- mostrar progreso y calificaciones
La IA no puede:
- revelar respuestas de quizzes
- entregar solucionarios
- responder exámenes directamente
- inventar información fuera del contexto académico del estudiante
Current Status
- Integración académica actualmente basada en repositorio mock
- Historial de conversación en memoria
- WhatsApp funcional para pruebas locales
- Arquitectura preparada para evolucionar hacia Moodle API o base de datos real
Next Steps
- Integrar Moodle API real
- Persistir conversaciones en base de datos
- Mejorar identificación de contactos WhatsApp
- Preparar una estrategia de sesión más estable para entornos cloud
Notes
- Si un número no está registrado en el sistema académico, el bot responde informando que no puede atenderlo todavía.
- Las respuestas de IA son sanitizadas para evitar exponer bloques internos como <think>...</think>.
License
MIT