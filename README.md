## Project Structure

```text
src
├── application
│   ├── ports
│   └── use-cases
│
├── domain
│   ├── entities
│   └── policies
│
├── infrastructure
│   ├── ai
│   ├── persistence
│   │   ├── memory
│   │   └── mock
│   └── whatsapp
│
├── presentation
│   └── http
│       ├── controllers
│       ├── dto
│       └── routes
│
└── shared
    ├── config
    ├── di
    └── utils
```

### Layer Responsibilities

#### Domain

Contiene las entidades y reglas centrales del negocio.

**Components**

* Entities
* Policies

**Examples**

* Student
* Course
* Activity
* Conversation
* QuestionPolicy

---

#### Application

Orquesta los casos de uso de la aplicación y define los contratos que necesita.

**Components**

* Use Cases
* Ports

**Examples**

* ChatWithStudentAIUseCase
* ReceiveWhatsAppMessageUseCase
* SendWhatsAppMessageUseCase
* AIProviderPort
* StudentRepositoryPort
* ConversationRepositoryPort
* WhatsAppGatewayPort
* ContextBuilderPort

---

#### Infrastructure

Implementaciones concretas de servicios externos y persistencia.

**Components**

* AI Providers
* WhatsApp Client / Gateway / Listener
* Repositorios mock y en memoria

**Examples**

* groq-ai.provider.ts
* cerebras-ai.provider.ts
* ai-provider-rotator.ts
* context-builder.ts
* whatsapp.client.ts
* whatsapp.gateway.ts
* whatsapp.listener.ts
* mock-student.repository.ts
* in-memory-conversation.repository.ts

---

#### Presentation

Puntos de entrada HTTP al sistema.

**Components**

* Controllers
* Routes
* DTOs

**Examples**

* ai.controller.ts
* whatsapp.controller.ts
* ai.routes.ts
* whatsapp.routes.ts
* chat.request.dto.ts

---

#### Shared

Configuración, composición de dependencias y utilidades transversales.

**Components**

* Config
* Dependency Injection
* Utilities

**Examples**

* system-prompt.ts
* container.ts
* sanitize-ai-response.ts

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

### Architecture Overview

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
          ┌───────────────┼──────────────────────┐
          │               │                      │
   ┌──────▼──────────┐ ┌──▼─────────┐ ┌─────────▼────────┐
   │ Mock Student    │ │    Groq    │ │    Cerebras      │
   │ Repository      │ └────────────┘ └──────────────────┘
   └─────────────────┘
```
## Project Structure

```text
src
├── application
│   ├── ports
│   └── use-cases
│
├── domain
│   ├── entities
│   └── policies
│
├── infrastructure
│   ├── ai
│   ├── persistence
│   │   ├── memory
│   │   └── mock
│   └── whatsapp
│
├── presentation
│   └── http
│       ├── controllers
│       ├── dto
│       └── routes
│
└── shared
    ├── config
    ├── di
    └── utils
```

### Layer Responsibilities

#### Domain

Contiene las entidades y reglas centrales del negocio.

**Components**

* Entities
* Policies

**Examples**

* Student
* Course
* Activity
* Conversation
* QuestionPolicy

---

#### Application

Orquesta los casos de uso de la aplicación y define los contratos que necesita.

**Components**

* Use Cases
* Ports

**Examples**

* ChatWithStudentAIUseCase
* ReceiveWhatsAppMessageUseCase
* SendWhatsAppMessageUseCase
* AIProviderPort
* StudentRepositoryPort
* ConversationRepositoryPort
* WhatsAppGatewayPort
* ContextBuilderPort

---

#### Infrastructure

Implementaciones concretas de servicios externos y persistencia.

**Components**

* AI Providers
* WhatsApp Client / Gateway / Listener
* Repositorios mock y en memoria

**Examples**

* groq-ai.provider.ts
* cerebras-ai.provider.ts
* ai-provider-rotator.ts
* context-builder.ts
* whatsapp.client.ts
* whatsapp.gateway.ts
* whatsapp.listener.ts
* mock-student.repository.ts
* in-memory-conversation.repository.ts

---

#### Presentation

Puntos de entrada HTTP al sistema.

**Components**

* Controllers
* Routes
* DTOs

**Examples**

* ai.controller.ts
* whatsapp.controller.ts
* ai.routes.ts
* whatsapp.routes.ts
* chat.request.dto.ts

---

#### Shared

Configuración, composición de dependencias y utilidades transversales.

**Components**

* Config
* Dependency Injection
* Utilities

**Examples**

* system-prompt.ts
* container.ts
* sanitize-ai-response.ts

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

### Architecture Overview

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
          ┌───────────────┼──────────────────────┐
          │               │                      │
   ┌──────▼──────────┐ ┌──▼─────────┐ ┌─────────▼────────┐
   │ Mock Student    │ │    Groq    │ │    Cerebras      │
   │ Repository      │ └────────────┘ └──────────────────┘
   └─────────────────┘
```
