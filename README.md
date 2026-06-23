# Bun AI WhatsApp Tutor API

API construida con **Bun + TypeScript** para asistir estudiantes de Moodle mediante **IA** y **WhatsApp**.

El sistema responde preguntas académicas usando el contexto del estudiante, sus cursos, actividades y syllabus, actuando como **tutor**, pero **sin revelar respuestas de quizzes o exámenes**.

---

## Features

- Chat académico con contexto de cursos Moodle
- Integración con proveedores de IA
- Flujo bidireccional por WhatsApp
- Protección contra solicitudes de cheating
- Clean Architecture
- Repositorio mock para pruebas locales

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

```txt
src/
  domain/
    entities/
    policies/

  application/
    ports/
    use-cases/

  presentation/
    http/
      controllers/
      routes/
      dto/

  infrastructure/
    ai/
    persistence/
    whatsapp/

  shared/
    config/
    di/
    utils/
Layers
- domain: entidades y reglas del negocio
- application: casos de uso y puertos
- presentation: controllers y routes HTTP
- infrastructure: integración con IA, WhatsApp y persistencia
- shared: configuración, utilidades y composición de dependencias
Requirements
- Bun (https://bun.sh/)
- Una cuenta de WhatsApp para vincular el bot
- API keys de los proveedores de IA
Installation
bun install
Environment Variables
Creá un archivo .env con algo como esto:
PORT=3000
GROQ_API_KEY=your_groq_key
CEREBRAS_API_KEY=your_cerebras_key
Run Locally
bun run index.ts
o en desarrollo:
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
4. Se ejecuta el caso de uso académico con contexto Moodle
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
- Moodle integrado actualmente con repositorio mock
- Historial de conversación en memoria
- WhatsApp funcional para pruebas locales
- Arquitectura preparada para evolucionar hacia Moodle API o base de datos real
Next Steps
- Integrar Moodle API real
- Persistir conversaciones en base de datos
- Mejorar identificación de contactos WhatsApp
- Preparar estrategia de sesión estable para despliegues cloud
Example Use Cases
- “¿Qué actividades tengo pendientes?”
- “Ayudame a entender qué es una variable”
- “¿Cómo me preparo para el quiz de programación?”
- “¿Cuál es mi progreso en el curso?”
Notes
- Si un número no está registrado en el sistema académico, el bot responde informando que no puede atenderlo todavía.
- Las respuestas de IA son sanitizadas para evitar exponer bloques internos como <think>...</think>.
License
MIT