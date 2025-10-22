# 🏗️ Architecture Documentation

<div align="center">

## System Architecture & Design

**Comprehensive architecture overview of Acquisitions API**

[System Overview](#-system-overview) • [Component Design](#-component-design) • [Data Flow](#-data-flow) • [Security](#-security-architecture)

</div>

---

## 📊 System Overview

### High-Level Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        Web[🌐 Web Browser]
        Mobile[📱 Mobile App]
        API_Client[⚙️ API Client]
    end

    subgraph "API Gateway & Security"
        LoadBalancer[⚖️ Load Balancer]
        Arcjet[🛡️ Arcjet Protection]
        RateLimit[⏱️ Rate Limiter]
    end

    subgraph "Application Layer"
        Express[🚂 Express Server]
        Routes[🛣️ Routes]
        Middleware[🔐 Middleware]
        Controllers[🎮 Controllers]
    end

    subgraph "Business Logic Layer"
        Services[⚙️ Services]
        Validators[✅ Validators]
        Utils[🔧 Utilities]
    end

    subgraph "Data Layer"
        ORM[⚡ Drizzle ORM]
        ConnectionPool[🔄 Connection Pool]
        Database[(🗄️ Neon PostgreSQL)]
    end

    subgraph "Infrastructure"
        Docker[🐳 Docker Container]
        Logger[📝 Winston Logger]
        FileSystem[📁 File System]
    end

    Web --> LoadBalancer
    Mobile --> LoadBalancer
    API_Client --> LoadBalancer

    LoadBalancer --> Arcjet
    Arcjet --> RateLimit
    RateLimit --> Express

    Express --> Routes
    Routes --> Middleware
    Middleware --> Controllers

    Controllers --> Services
    Services --> Validators
    Services --> Utils

    Services --> ORM
    ORM --> ConnectionPool
    ConnectionPool --> Database

    Express --> Logger
    Logger --> FileSystem

    Express -.-> Docker
    Database -.-> Docker

    style Web fill:#e1f5ff
    style Arcjet fill:#ffe1e1
    style Express fill:#fff4e1
    style Services fill:#e1ffe1
    style Database fill:#f0e1ff
    style Docker fill:#e1f0ff
```

---

## 🧩 Component Design

### Layer Architecture

```mermaid
graph TD
    subgraph "Presentation Layer"
        A1[Routes] --> A2[Controllers]
    end

    subgraph "Business Logic Layer"
        B1[Services] --> B2[Validators]
        B1 --> B3[Utils]
    end

    subgraph "Data Access Layer"
        C1[Models] --> C2[ORM]
        C2 --> C3[Database]
    end

    subgraph "Cross-Cutting Concerns"
        D1[Middleware]
        D2[Logging]
        D3[Error Handling]
    end

    A2 --> B1
    B1 --> C1

    D1 -.-> A1
    D2 -.-> B1
    D3 -.-> A2

    style A1 fill:#FFE4B5
    style B1 fill:#90EE90
    style C1 fill:#87CEEB
    style D1 fill:#FFB6C1
```

### Component Breakdown

| Layer              | Components                                 | Responsibilities                          |
| ------------------ | ------------------------------------------ | ----------------------------------------- |
| 🌐 **Routes**      | `auth.routes.js`, `user.routes.js`         | Define API endpoints, HTTP methods        |
| 🎮 **Controllers** | `auth.controller.js`, `user.controller.js` | Handle requests, send responses           |
| ⚙️ **Services**    | `auth.service.js`, `users.service.js`      | Business logic, data operations           |
| 🗄️ **Models**      | `user.model.js`                            | Database schemas, table definitions       |
| 🛡️ **Middleware**  | `security.middleware.js`                   | Authentication, authorization, protection |
| ✅ **Validators**  | `auth.validation.js`                       | Input validation, schema validation       |
| 🔧 **Utils**       | `jwt.js`, `cookies.js`, `format.js`        | Helper functions, utilities               |
| ⚙️ **Config**      | `database.js`, `logger.js`, `arcjet.js`    | Configuration management                  |

---

## 🔄 Data Flow

### Request-Response Flow

```mermaid
sequenceDiagram
    autonumber
    participant C as 👤 Client
    participant LB as ⚖️ Load Balancer
    participant AJ as 🛡️ Arcjet
    participant RL as ⏱️ Rate Limiter
    participant E as 🚂 Express
    participant M as 🔐 Middleware
    participant R as 🛣️ Router
    participant CT as 🎮 Controller
    participant V as ✅ Validator
    participant S as ⚙️ Service
    participant O as ⚡ ORM
    participant DB as 🗄️ Database
    participant L as 📝 Logger

    C->>LB: HTTP Request
    LB->>AJ: Forward Request
    AJ->>AJ: Check Shield Rules
    AJ->>RL: Pass Security Check
    RL->>RL: Check Rate Limit
    RL->>E: Allow Request
    E->>M: Apply Middleware
    M->>M: Parse Body, Cookies
    M->>R: Route to Handler
    R->>CT: Call Controller
    CT->>V: Validate Input
    V->>V: Check Schema
    V-->>CT: Return Validation Result
    CT->>S: Call Service
    S->>O: Query Database
    O->>DB: Execute SQL
    DB-->>O: Return Data
    O-->>S: Return Results
    S->>L: Log Operation
    L->>L: Write to File
    S-->>CT: Return Data
    CT-->>E: Format Response
    E-->>C: JSON Response

    Note over C,DB: 🔒 Secure • ⚡ Fast • 📊 Monitored
```

### Authentication Flow

```mermaid
sequenceDiagram
    participant U as 👤 User
    participant C as 🌐 Client
    participant A as 🚂 API
    participant S as ⚙️ Auth Service
    participant DB as 🗄️ Database
    participant J as 🔑 JWT

    rect rgb(230, 255, 230)
        Note over U,J: Sign Up Flow
        U->>C: Enter Credentials
        C->>A: POST /api/auth/sign-up
        A->>S: Create User
        S->>S: Hash Password (bcrypt)
        S->>DB: Save User
        DB-->>S: User Created
        S-->>A: Return User
        A-->>C: 201 Created
        C-->>U: Registration Success
    end

    rect rgb(255, 240, 230)
        Note over U,J: Sign In Flow
        U->>C: Enter Credentials
        C->>A: POST /api/auth/sign-in
        A->>S: Verify User
        S->>DB: Find User by Email
        DB-->>S: Return User
        S->>S: Compare Passwords
        S->>J: Generate JWT Token
        J-->>S: Return Token
        S-->>A: Return User + Token
        A->>C: Set Cookie with Token
        A-->>C: 200 OK
        C-->>U: Login Success
    end

    rect rgb(255, 230, 230)
        Note over U,J: Protected Request Flow
        U->>C: Make Request
        C->>A: Request with Cookie
        A->>A: Extract Token
        A->>J: Verify Token
        J-->>A: Token Valid
        A->>S: Process Request
        S->>DB: Query Data
        DB-->>S: Return Data
        S-->>A: Return Result
        A-->>C: 200 OK
        C-->>U: Display Data
    end
```

---

## 🔒 Security Architecture

### Security Layers

```mermaid
graph TB
    subgraph "Layer 1: Network Security"
        HTTPS[🔒 HTTPS/TLS]
        CORS[🌐 CORS]
    end

    subgraph "Layer 2: Application Security"
        Helmet[⛑️ Helmet Headers]
        Arcjet[🛡️ Arcjet Shield]
        RateLimit[⏱️ Rate Limiting]
    end

    subgraph "Layer 3: Authentication & Authorization"
        JWT[🔑 JWT Tokens]
        Cookies[🍪 Secure Cookies]
        Bcrypt[🔒 Password Hashing]
    end

    subgraph "Layer 4: Input Validation"
        Zod[✅ Zod Validation]
        Sanitize[🧹 Input Sanitization]
    end

    subgraph "Layer 5: Data Security"
        SSL[🔐 SSL/TLS to DB]
        Encryption[🔐 Data Encryption]
    end

    HTTPS --> Helmet
    CORS --> Helmet
    Helmet --> Arcjet
    Arcjet --> RateLimit
    RateLimit --> JWT
    JWT --> Cookies
    Cookies --> Bcrypt
    Bcrypt --> Zod
    Zod --> Sanitize
    Sanitize --> SSL
    SSL --> Encryption

    style HTTPS fill:#ffe1e1
    style Arcjet fill:#ffe1e1
    style JWT fill:#fff4e1
    style Zod fill:#e1ffe1
    style SSL fill:#e1f5ff
```

### Security Features

| Feature                 | Implementation           | Protection Against                |
| ----------------------- | ------------------------ | --------------------------------- |
| 🔒 **HTTPS**            | TLS 1.3                  | Man-in-the-middle attacks         |
| ⛑️ **Helmet**           | Security headers         | XSS, clickjacking, MIME sniffing  |
| 🛡️ **Arcjet Shield**    | Bot detection & blocking | Bots, scrapers, malicious traffic |
| ⏱️ **Rate Limiting**    | Request throttling       | DDoS, brute force attacks         |
| 🔑 **JWT**              | Token-based auth         | Unauthorized access               |
| 🍪 **HttpOnly Cookies** | Secure cookie storage    | XSS attacks                       |
| 🔒 **bcrypt**           | Password hashing         | Rainbow table attacks             |
| ✅ **Zod Validation**   | Input validation         | SQL injection, XSS                |
| 🔐 **SSL to DB**        | Encrypted connection     | Data interception                 |

---

## 🗄️ Database Architecture

### Schema Design

```mermaid
erDiagram
    USERS {
        uuid id PK
        varchar name
        varchar email UK
        varchar password
        varchar role
        timestamp createdAt
    }

    USERS ||--o{ SESSIONS : has

    SESSIONS {
        uuid id PK
        uuid userId FK
        varchar token
        timestamp expiresAt
        timestamp createdAt
    }
```

### User Model Structure

```javascript
// user.model.js - Drizzle Schema
{
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).default('user'),
  createdAt: timestamp('created_at').defaultNow()
}
```

### Database Connection Flow

```mermaid
graph LR
    A[Application] --> B{Connection Pool}
    B -->|Connection 1| C[Neon PostgreSQL]
    B -->|Connection 2| C
    B -->|Connection 3| C
    B -->|Connection N| C

    C --> D[Data]

    style A fill:#e1f5ff
    style B fill:#fff4e1
    style C fill:#f0e1ff
```

---

## 🐳 Deployment Architecture

### Docker Architecture

```mermaid
graph TB
    subgraph "Development Environment"
        DC1[docker-compose.dev.yml]
        DC1 --> APP1[App Container]
        DC1 --> DB1[Neon Local Container]
        APP1 <--> DB1
    end

    subgraph "Production Environment"
        DC2[docker-compose.prod.yml]
        DC2 --> APP2[App Container<br/>Multi-stage Build]
        APP2 --> NEON[☁️ Neon Cloud]
    end

    subgraph "Container Layers"
        BASE[📦 Node.js 20 Alpine]
        DEPS[📦 Dependencies]
        APP[📦 Application Code]
        BASE --> DEPS
        DEPS --> APP
    end

    APP1 -.-> BASE
    APP2 -.-> BASE

    style APP1 fill:#e1f5ff
    style DB1 fill:#90EE90
    style APP2 fill:#FFD700
    style NEON fill:#FF6B6B
```

### Multi-Stage Docker Build

```dockerfile
# Stage 1: Base
FROM node:20-alpine AS base
WORKDIR /app

# Stage 2: Dependencies
FROM base AS deps
COPY package*.json ./
RUN npm ci

# Stage 3: Builder
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Stage 4: Production
FROM base AS runner
COPY --from=builder /app .
EXPOSE 5000
CMD ["node", "src/index.js"]
```

---

## 📊 Monitoring & Logging

### Logging Architecture

```mermaid
graph TB
    subgraph "Application Layer"
        A[Express App]
        B[Controllers]
        C[Services]
    end

    subgraph "Logger (Winston)"
        L[Logger Instance]
        T1[Console Transport]
        T2[File Transport - Combined]
        T3[File Transport - Errors]
    end

    A --> L
    B --> L
    C --> L

    L --> T1
    L --> T2
    L --> T3

    T2 --> F1[logs/combined.log]
    T3 --> F2[logs/error.log]

    style A fill:#e1f5ff
    style L fill:#fff4e1
    style F1 fill:#e1ffe1
    style F2 fill:#ffe1e1
```

### Log Levels

| Level        | Purpose         | Example                     |
| ------------ | --------------- | --------------------------- |
| 🔴 **error** | Critical errors | Database connection failed  |
| ⚠️ **warn**  | Warnings        | Deprecated API usage        |
| ℹ️ **info**  | General info    | Server started on port 5000 |
| 🔍 **debug** | Debug info      | Query execution details     |

---

## 🚀 Performance Optimization

### Caching Strategy

```mermaid
graph LR
    C[Client] -->|Request| APP[Application]
    APP -->|Check| CACHE{Cache Hit?}
    CACHE -->|Yes| RET1[Return Cached]
    CACHE -->|No| DB[(Database)]
    DB --> STORE[Store in Cache]
    STORE --> RET2[Return Data]

    style CACHE fill:#FFD700
    style DB fill:#87CEEB
```

### Connection Pooling

- **Min Connections**: 2
- **Max Connections**: 10
- **Idle Timeout**: 30s
- **Connection Timeout**: 10s

### Query Optimization

```javascript
// ✅ Good: Selective fields
const users = await db
  .select({
    id: usersTable.id,
    name: usersTable.name,
    email: usersTable.email,
  })
  .from(usersTable);

// ❌ Bad: Select all fields
const users = await db.select().from(usersTable);
```

---

## 🔧 Technology Stack Details

### Runtime Environment

```mermaid
graph TB
    NODE[Node.js 20.x]
    NODE --> V8[V8 JavaScript Engine]
    NODE --> LIBUV[libuv - Event Loop]
    NODE --> MODULES[Core Modules]

    V8 --> JIT[JIT Compiler]
    LIBUV --> ASYNC[Async I/O]
    MODULES --> FS[File System]
    MODULES --> HTTP[HTTP/HTTPS]

    style NODE fill:#90EE90
    style V8 fill:#FFD700
    style LIBUV fill:#87CEEB
```

### Dependency Graph

```mermaid
graph TD
    APP[Acquisitions API]

    APP --> EXPRESS[Express 5.1.0]
    APP --> NEON[Neon PostgreSQL]
    APP --> DRIZZLE[Drizzle ORM]
    APP --> ARCJET[Arcjet 1.0.0]
    APP --> JWT[jsonwebtoken]
    APP --> BCRYPT[bcrypt 6.0.0]
    APP --> ZOD[Zod 3.24.1]
    APP --> WINSTON[Winston 3.17.0]
    APP --> HELMET[Helmet 8.1.0]

    EXPRESS --> MIDDLEWARE[Middleware Stack]
    DRIZZLE --> NEON
    ARCJET --> PROTECTION[Shield, Bot, Rate Limit]

    style APP fill:#FFB6C1
    style EXPRESS fill:#90EE90
    style NEON fill:#87CEEB
    style ARCJET fill:#FFD700
```

---

## 📈 Scalability

### Horizontal Scaling

```mermaid
graph TB
    LB[⚖️ Load Balancer]

    LB --> APP1[App Instance 1]
    LB --> APP2[App Instance 2]
    LB --> APP3[App Instance 3]

    APP1 --> DB[(Neon PostgreSQL)]
    APP2 --> DB
    APP3 --> DB

    style LB fill:#FFD700
    style APP1 fill:#90EE90
    style APP2 fill:#90EE90
    style APP3 fill:#90EE90
    style DB fill:#87CEEB
```

### Vertical Scaling

| Resource    | Development | Production |
| ----------- | ----------- | ---------- |
| CPU         | 1 core      | 2-4 cores  |
| RAM         | 512 MB      | 2-4 GB     |
| Disk        | 10 GB       | 50-100 GB  |
| Connections | 10          | 50-100     |

---

## 🔍 API Gateway Pattern

```mermaid
graph TB
    CLIENT[👤 Client]

    subgraph "API Gateway"
        GATEWAY[🚪 Gateway]
        AUTH[🔐 Authentication]
        RATE[⏱️ Rate Limiting]
        LOG[📝 Logging]
    end

    subgraph "Microservices (Future)"
        AUTH_SVC[Auth Service]
        USER_SVC[User Service]
        NOTIF_SVC[Notification Service]
    end

    CLIENT --> GATEWAY
    GATEWAY --> AUTH
    AUTH --> RATE
    RATE --> LOG
    LOG --> AUTH_SVC
    LOG --> USER_SVC
    LOG --> NOTIF_SVC

    style GATEWAY fill:#FFD700
    style AUTH_SVC fill:#90EE90
    style USER_SVC fill:#87CEEB
    style NOTIF_SVC fill:#FFB6C1
```

---

## 📚 Additional Resources

- [Main Documentation](./README.md)
- [API Reference](./API_REFERENCE.md)
- [Contributing Guide](./CONTRIBUTING.md)
- [Docker Setup](./DOCKER_SETUP.md)

---

<div align="center">

**Questions?** [Open an issue](https://github.com/ayushh9999/acquisitions/issues)

Built with ❤️ by [Ayush Mondal](https://github.com/ayushh9999)

</div>
