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

```text
src
├── domain
│   ├── entities
│   ├── value-objects
│   ├── policies
│   └── repositories
│
├── application
│   ├── ports
│   │   ├── input
│   │   └── output
│   ├── use-cases
│   └── dto
│
├── infrastructure
│   ├── ai
│   │   ├── groq
│   │   └── cerebras
│   ├── whatsapp
│   ├── persistence
│   └── external-services
│
├── presentation
│   ├── http
│   │   ├── controllers
│   │   ├── routes
│   │   └── middleware
│   └── whatsapp
│
└── shared
    ├── config
    ├── constants
    ├── di
    ├── logger
    └── utils
```

### Layer Responsibilities

#### Domain

Contiene las reglas centrales del negocio y no depende de ninguna tecnología externa.

- Entities
- Value Objects
- Domain Policies
- Repository Contracts

**Ejemplos:**

- Student
- Course
- Activity
- AcademicSafetyPolicy

---

#### Application

Orquesta los casos de uso de la aplicación.

- Use Cases
- Input/Output Ports
- DTOs
- Business Workflows

**Ejemplos:**

- AskAcademicQuestionUseCase
- GetPendingActivitiesUseCase
- ValidateAcademicRequestUseCase

---

#### Infrastructure

Implementaciones concretas de servicios externos.

- WhatsApp Integration
- AI Providers
- Moodle Repository
- Database Access
- External APIs

**Ejemplos:**

- GroqAIProvider
- CerebrasAIProvider
- WhatsAppWebClient
- MockMoodleRepository

---

#### Presentation

Puntos de entrada al sistema.

- HTTP Controllers
- REST Routes
- WhatsApp Message Handlers
- Request Validation

**Ejemplos:**

- ChatController
- WhatsAppWebhookHandler

---

#### Shared

Componentes reutilizables y configuración transversal.

- Dependency Injection
- Environment Configuration
- Logging
- Utilities
- Constants

---

### Dependency Flow

```text
Presentation
      ↓
Application
      ↓
Domain

Infrastructure ─────► Application
Infrastructure ─────► Domain
```

Las dependencias siempre apuntan hacia el núcleo del negocio, manteniendo el dominio aislado de frameworks, proveedores de IA y tecnologías externas.
```

## Architecture Overview

```text
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
          ┌───────────────┼────────────────┐
          │               │                │
   ┌──────▼─────┐ ┌──────▼─────┐ ┌────────▼──────┐
   │ Moodle API │ │    Groq    │ │   Cerebras    │
   └────────────┘ └────────────┘ └───────────────┘
```