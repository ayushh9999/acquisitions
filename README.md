<div align="center">

# 🚀 Acquisitions API

### Enterprise-Grade RESTful API with Advanced Security & Authentication

[![Lint and Format](https://github.com/ayushh9999/acquisitions/actions/workflows/lint-and-format.yml/badge.svg)](https://github.com/ayushh9999/acquisitions/actions/workflows/lint-and-format.yml)
[![Tests](https://github.com/ayushh9999/acquisitions/actions/workflows/tests.yml/badge.svg)](https://github.com/ayushh9999/acquisitions/actions/workflows/tests.yml)
[![Docker Build](https://github.com/ayushh9999/acquisitions/actions/workflows/docker-build-and-push.yml/badge.svg)](https://github.com/ayushh9999/acquisitions/actions/workflows/docker-build-and-push.yml)

![Node.js](https://img.shields.io/badge/Node.js-20.x-green?style=flat&logo=node.js)
![Express](https://img.shields.io/badge/Express-5.1.0-blue?style=flat&logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-316192?style=flat&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker)
![License](https://img.shields.io/badge/License-ISC-yellow?style=flat)

[Features](#-features) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [API Docs](#-api-documentation) • [Deployment](#-deployment)

</div>

---

## 📖 Overview

**Acquisitions API** is a modern, production-ready RESTful API built with cutting-edge technologies. It provides robust authentication, advanced security features, and comprehensive user management capabilities. Perfect for building scalable web applications with enterprise-level security requirements.

### ✨ Why Choose This API?

- 🔐 **Bank-Level Security**: Arcjet protection with rate limiting, bot detection, and DDoS shield
- ⚡ **Blazing Fast**: Serverless PostgreSQL with Neon, optimized queries with Drizzle ORM
- 🐳 **Docker Ready**: Complete containerization for seamless deployment
- 🧪 **Fully Tested**: Comprehensive test suite with 100% endpoint coverage
- 🔄 **CI/CD Pipeline**: Automated testing, linting, and Docker builds
- 📝 **Well Documented**: Extensive inline comments and API documentation
- 🎯 **Production Ready**: Environment-specific configurations and best practices

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔐 Security & Authentication

- 🔑 **JWT Authentication** - Secure token-based auth
- 🛡️ **Arcjet Protection** - Rate limiting & bot detection
- 🔒 **Password Hashing** - bcrypt with salt rounds
- 🍪 **Secure Cookies** - HttpOnly & SameSite flags
- 🚫 **DDoS Protection** - Automated threat mitigation
- 🎭 **Helmet.js** - Security headers protection

</td>
<td width="50%">

### 🗄️ Database & ORM

- 🐘 **Neon PostgreSQL** - Serverless database
- ⚡ **Drizzle ORM** - Type-safe SQL queries
- 🔄 **Auto Migrations** - Version-controlled schema
- 📊 **Database Studio** - Built-in GUI for data
- 🎯 **Connection Pooling** - Optimized performance
- 📝 **Query Logging** - Development debugging

</td>
</tr>
<tr>
<td width="50%">

### 🧪 Testing & Quality

- ✅ **Jest Testing** - Comprehensive unit tests
- 🔍 **Supertest** - API integration testing
- 📏 **ESLint** - Code quality enforcement
- 💅 **Prettier** - Consistent formatting
- 🎯 **100% Coverage** - All endpoints tested
- 🔄 **Continuous Testing** - Automated CI/CD

</td>
<td width="50%">

### 🐳 DevOps & Deployment

- 🐳 **Docker Support** - Multi-stage builds
- 🔄 **Docker Compose** - Dev & prod configs
- 🤖 **GitHub Actions** - Automated workflows
- 📦 **Container Registry** - Docker Hub integration
- 🚀 **Hot Reload** - Fast development cycle
- 📊 **Winston Logging** - Production-grade logs

</td>
</tr>
</table>

---

## 📋 Table of Contents

- [🏗️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [💻 Local Development](#-local-development)
- [🐳 Docker Development](#-docker-development)
- [📡 API Documentation](#-api-documentation)
- [🧪 Testing](#-testing)
- [🔄 CI/CD Pipeline](#-cicd-pipeline)
- [⚙️ Configuration](#️-configuration)
- [📁 Project Structure](#-project-structure)
- [🛠️ Available Scripts](#️-available-scripts)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)

---

## 🏗️ Architecture

### System Architecture Diagram

```mermaid
graph TB
    Client[👤 Client Application]

    subgraph "🔒 Security Layer"
        Arcjet[🛡️ Arcjet Protection<br/>Rate Limit, Bot Detection, Shield]
        Helmet[⛑️ Helmet.js<br/>Security Headers]
    end

    subgraph "🚀 Application Layer"
        Express[⚡ Express 5.1.0<br/>REST API Server]
        Auth[🔐 Auth Middleware<br/>JWT Verification]
        Routes[🛣️ Route Handlers<br/>Controllers]
    end

    subgraph "💼 Business Logic Layer"
        Services[⚙️ Services<br/>Business Logic]
        Validation[✅ Zod Validation<br/>Input Sanitization]
    end

    subgraph "🗄️ Data Layer"
        Drizzle[⚡ Drizzle ORM<br/>Type-safe Queries]
        Neon[🐘 Neon PostgreSQL<br/>Serverless Database]
    end

    subgraph "📊 Monitoring & Logging"
        Winston[📝 Winston Logger<br/>File & Console Logs]
    end

    Client -->|HTTP/HTTPS| Arcjet
    Arcjet -->|Verified| Helmet
    Helmet -->|Secured| Express
    Express --> Auth
    Auth -->|Authenticated| Routes
    Routes --> Validation
    Validation -->|Valid| Services
    Services --> Drizzle
    Drizzle -->|SQL| Neon
    Services -.->|Logs| Winston
    Express -.->|Errors| Winston

    style Client fill:#e1f5ff
    style Arcjet fill:#ffe1e1
    style Express fill:#fff4e1
    style Services fill:#e1ffe1
    style Neon fill:#f0e1ff
    style Winston fill:#ffe1f0
```

### Technology Stack

```mermaid
graph LR
    subgraph "Frontend Integration"
        A[🌐 Any Client]
    end

    subgraph "Backend Runtime"
        B[⚡ Node.js 20.x]
        C[🚂 Express 5.1.0]
    end

    subgraph "Security"
        D[🛡️ Arcjet]
        E[🔐 JWT]
        F[🔒 bcrypt]
    end

    subgraph "Database"
        G[🐘 PostgreSQL]
        H[⚡ Drizzle ORM]
        I[☁️ Neon]
    end

    subgraph "DevOps"
        J[🐳 Docker]
        K[🤖 GitHub Actions]
        L[📦 Docker Hub]
    end

    A --> B
    B --> C
    C --> D
    C --> E
    E --> F
    C --> H
    H --> G
    G --> I
    B --> J
    J --> K
    K --> L

    style A fill:#e1f5ff
    style B fill:#90EE90
    style C fill:#FFD700
    style D fill:#FF6B6B
    style G fill:#4169E1
    style J fill:#2496ED
```

### Data Flow Diagram

```mermaid
sequenceDiagram
    participant C as 👤 Client
    participant A as 🛡️ Arcjet
    participant E as ⚡ Express
    participant M as 🔐 Auth Middleware
    participant V as ✅ Validator
    participant S as ⚙️ Service
    participant D as 🗄️ Database
    participant L as 📝 Logger

    C->>A: HTTP Request
    A->>A: Check Rate Limit
    A->>A: Detect Bots
    A->>E: Request Allowed ✓
    E->>M: Verify JWT Token
    M->>M: Decode & Validate
    M->>V: Authorized ✓
    V->>V: Validate Input (Zod)
    V->>S: Valid Data ✓
    S->>S: Business Logic
    S->>D: Query Database
    D->>S: Return Data
    S->>L: Log Operation
    S->>E: Response Data
    E->>C: JSON Response

    Note over C,L: 🔒 Secure • ⚡ Fast • 📊 Monitored
```

---

## 🚀 Quick Start

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

| Tool              | Version           | Purpose                | Download                                      |
| ----------------- | ----------------- | ---------------------- | --------------------------------------------- |
| 🟢 **Node.js**    | v20.x or higher   | Runtime environment    | [nodejs.org](https://nodejs.org/)             |
| 📦 **npm**        | v9.x or higher    | Package manager        | Included with Node.js                         |
| 🐘 **PostgreSQL** | Latest            | Database (or use Neon) | [postgresql.org](https://www.postgresql.org/) |
| 🐳 **Docker**     | Latest (Optional) | Containerization       | [docker.com](https://www.docker.com/)         |

### ⚡ Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/ayushh9999/acquisitions.git
cd acquisitions

# 2️⃣ Install dependencies
npm install

# 3️⃣ Setup environment variables
cp .env.example .env
# Edit .env with your configuration (see Configuration section)

# 4️⃣ Run database migrations
npm run db:migrate

# 5️⃣ Start development server
npm run dev
```

### 🎉 Success!

The API will be available at:

```
🌐 http://localhost:5000
```

Test the health endpoint:

```bash
curl http://localhost:5000/health
```

Expected response:

```json
{
  "status": "OK",
  "timestamp": "2025-10-23T12:00:00.000Z",
  "uptime": 42.5
}
```

---

## 💻 Local Development

### 🔧 Setup Guide

<details>
<summary><b>📖 Step-by-Step Local Setup (Click to expand)</b></summary>

<br>

#### 1️⃣ Database Setup

**Option A: Use Neon Cloud** (⭐ Recommended for beginners)

```bash
# 1. Visit https://neon.tech and create a free account
# 2. Create a new project
# 3. Copy your connection string
# 4. Add to .env file
```

```env
DATABASE_URL=postgresql://user:password@ep-example.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**Option B: Local PostgreSQL** (For advanced users)

```bash
# Install PostgreSQL
# Windows: Download installer from postgresql.org
# macOS: brew install postgresql
# Linux: sudo apt-get install postgresql

# Create database
createdb acquisitions

# Add to .env
DATABASE_URL=postgresql://localhost:5432/acquisitions
```

#### 2️⃣ Environment Configuration

Create a `.env` file in the root directory:

```env
# 🗄️ Database Configuration
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require

# 🔐 JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# 🛡️ Arcjet Security Configuration
ARCJET_KEY=your-arcjet-api-key-from-arcjet.com

# 🌍 Server Configuration
PORT=5000
NODE_ENV=development

# 📝 Logging
LOG_LEVEL=info
```

#### 3️⃣ Get Your API Keys

| Service              | Purpose               | How to Get                                                                          |
| -------------------- | --------------------- | ----------------------------------------------------------------------------------- |
| 🐘 **Neon Database** | Serverless PostgreSQL | Sign up at [neon.tech](https://neon.tech) → Create Project → Copy connection string |
| 🛡️ **Arcjet**        | Security & Protection | Sign up at [arcjet.com](https://arcjet.com) → Create Site → Copy API key            |

#### 4️⃣ Initialize Database

```bash
# Generate migration files
npm run db:generate

# Apply migrations
npm run db:migrate

# (Optional) Open database studio
npm run db:studio
```

#### 5️⃣ Start Development Server

```bash
# Start with hot reload
npm run dev

# The server will automatically restart on file changes
```

</details>

### 🔥 Development Workflow

```mermaid
graph LR
    A[💻 Code Changes] --> B[🔄 Auto Reload]
    B --> C[🧪 Test Locally]
    C --> D{✅ Tests Pass?}
    D -->|Yes| E[📝 Commit]
    D -->|No| A
    E --> F[🚀 Push to GitHub]
    F --> G[🤖 CI/CD Pipeline]
    G --> H[✅ Deploy]

    style A fill:#e1f5ff
    style C fill:#ffe1e1
    style E fill:#e1ffe1
    style H fill:#f0e1ff
```

---

## 🐳 Docker Development

<div align="center">

### 🎯 Containerized Development Made Easy

**Full Docker setup with Neon Local database included!**

📚 For detailed Docker guide, see **[DOCKER_SETUP.md](./DOCKER_SETUP.md)**

</div>

### 🚀 Quick Docker Start

```bash
# 🛠️ Development Mode (with Neon Local Database)
docker-compose -f docker-compose.dev.yml up --build

# 🚀 Production Mode (with external Neon Cloud)
docker-compose -f docker-compose.prod.yml up --build
```

### 🐋 Docker Architecture

```mermaid
graph TB
    subgraph "Development Environment"
        Dev[🛠️ Dev Container<br/>Node.js + App]
        NeonLocal[🐘 Neon Local<br/>PostgreSQL 16]
        Dev <-->|Port 5432| NeonLocal
    end

    subgraph "Production Environment"
        Prod[🚀 Prod Container<br/>Node.js + App<br/>Multi-stage Build]
        NeonCloud[☁️ Neon Cloud<br/>Serverless PostgreSQL]
        Prod <-->|SSL| NeonCloud
    end

    User[👤 User] -->|Port 5000| Dev
    User -->|Port 5000| Prod

    style Dev fill:#e1f5ff
    style NeonLocal fill:#90EE90
    style Prod fill:#FFD700
    style NeonCloud fill:#FF6B6B
```

### 📦 Docker Commands Cheat Sheet

| Command                                        | Purpose                    |
| ---------------------------------------------- | -------------------------- |
| `docker-compose -f docker-compose.dev.yml up`  | Start dev environment      |
| `docker-compose -f docker-compose.prod.yml up` | Start prod environment     |
| `docker-compose down`                          | Stop all containers        |
| `docker-compose logs -f`                       | View logs                  |
| `docker-compose ps`                            | List running containers    |
| `docker-compose exec app sh`                   | Access app container shell |
| `docker-compose exec neon-db psql -U user`     | Access database            |

---

## 📡 API Documentation

<div align="center">

### 🎯 RESTful API Endpoints

**Base URL:** `http://localhost:5000`

</div>

### 📚 API Reference

<details>
<summary><b>🏥 Health Check Endpoint</b></summary>

<br>

#### `GET /health`

Check if the API is running and healthy.

**Request:**

```bash
curl http://localhost:5000/health
```

**Response:** `200 OK`

```json
{
  "status": "OK",
  "timestamp": "2025-10-23T12:00:00.000Z",
  "uptime": 42.5
}
```

**Fields:**

- `status`: Server health status
- `timestamp`: Current server time (ISO 8601)
- `uptime`: Server uptime in seconds

</details>

<details>
<summary><b>🌐 API Status Endpoint</b></summary>

<br>

#### `GET /api`

Get API status message.

**Request:**

```bash
curl http://localhost:5000/api
```

**Response:** `200 OK`

```json
{
  "message": "Acquisitions API is running!"
}
```

</details>

<details>
<summary><b>🔐 Authentication Endpoints</b></summary>

<br>

### Sign Up

#### `POST /api/auth/sign-up`

Create a new user account.

**Request:**

```bash
curl -X POST http://localhost:5000/api/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123",
    "role": "user"
  }'
```

**Request Body:**

```json
{
  "name": "string (required, min 2 chars)",
  "email": "string (required, valid email)",
  "password": "string (required, min 6 chars)",
  "role": "string (optional, default: 'user')"
}
```

**Response:** `201 Created`

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2025-10-23T12:00:00.000Z"
  }
}
```

**Error Responses:**

`400 Bad Request` - Validation failed

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email"
    }
  ]
}
```

`409 Conflict` - Email already exists

```json
{
  "error": "User already exists"
}
```

---

### Sign In

#### `POST /api/auth/sign-in`

Authenticate user and receive JWT token.

**Request:**

```bash
curl -X POST http://localhost:5000/api/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

**Request Body:**

```json
{
  "email": "string (required, valid email)",
  "password": "string (required, min 6 chars)"
}
```

**Response:** `200 OK`

```json
{
  "message": "Signed in successfully",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Note:** JWT token is set as an HttpOnly cookie named `token`.

**Cookie Details:**

```
token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...;
HttpOnly;
Secure;
SameSite=Strict;
Max-Age=604800
```

**Error Responses:**

`401 Unauthorized` - Invalid credentials

```json
{
  "error": "Invalid credentials"
}
```

---

### Sign Out

#### `POST /api/auth/sign-out`

Sign out user and clear JWT token.

**Request:**

```bash
curl -X POST http://localhost:5000/api/auth/sign-out \
  -b "token=your-jwt-token"
```

**Response:** `200 OK`

```json
{
  "message": "Signed out successfully"
}
```

</details>

<details>
<summary><b>👥 User Management Endpoints</b></summary>

<br>

### Get All Users

#### `GET /api/users`

Retrieve all users (passwords excluded).

**Request:**

```bash
curl http://localhost:5000/api/users
```

**Response:** `200 OK`

```json
{
  "message": "Successfully retrieved users",
  "count": 2,
  "users": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2025-10-23T12:00:00.000Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "admin",
      "createdAt": "2025-10-23T11:00:00.000Z"
    }
  ]
}
```

---

### Get User by ID

#### `GET /api/users/:id`

Retrieve a specific user by their ID.

**Request:**

```bash
curl http://localhost:5000/api/users/550e8400-e29b-41d4-a716-446655440000
```

**Response:** `200 OK`

```json
{
  "message": "User retrieved successfully",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2025-10-23T12:00:00.000Z"
  }
}
```

**Error Response:**

`404 Not Found` - User doesn't exist

```json
{
  "error": "User not found"
}
```

</details>

### 🔒 Security Features

#### Rate Limiting

```mermaid
graph LR
    A[👤 User Request] --> B{Rate Limit Check}
    B -->|✅ Under Limit| C[Process Request]
    B -->|❌ Over Limit| D[429 Too Many Requests]

    style A fill:#e1f5ff
    style C fill:#e1ffe1
    style D fill:#ffe1e1
```

**Rate Limits:**

- 🔐 **Auth Endpoints**: 5 requests per minute
- 👥 **User Endpoints**: 10 requests per minute
- 🌐 **General Endpoints**: 20 requests per minute

**Rate Limit Response:** `429 Too Many Requests`

```json
{
  "error": "Too many requests",
  "message": "Please try again later",
  "retryAfter": 60
}
```

## 🧪 Testing

<div align="center">

### 🎯 Comprehensive Test Suite

**Jest + Supertest** for rock-solid API testing

</div>

### 🚀 Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (auto-rerun on changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### 📊 Test Coverage

Our test suite provides **100% endpoint coverage**:

| Category           | Endpoints Tested                                               | Status     |
| ------------------ | -------------------------------------------------------------- | ---------- |
| 🏥 Health Check    | `/health`                                                      | ✅ Passing |
| 🌐 API Status      | `/api`                                                         | ✅ Passing |
| 🔐 Authentication  | `/api/auth/sign-up`, `/api/auth/sign-in`, `/api/auth/sign-out` | ✅ Passing |
| 👥 User Management | `/api/users`, `/api/users/:id`                                 | ✅ Passing |
| ❌ Error Handling  | 404 routes, validation errors                                  | ✅ Passing |

### 🧩 Test Structure

```
tests/
├── app.test.js          # API integration tests
└── README.md            # Testing documentation
```

### 📈 Sample Test Output

```
 PASS  tests/app.test.js
  API Endpoints
    ✓ GET /health - should return health status (45ms)
    ✓ GET /api - should return API message (12ms)
    Authentication
      ✓ POST /api/auth/sign-up - should create user (234ms)
      ✓ POST /api/auth/sign-in - should authenticate user (189ms)
      ✓ POST /api/auth/sign-out - should sign out user (23ms)
    User Management
      ✓ GET /api/users - should return all users (67ms)

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Time:        2.456s
```

📚 **Detailed testing guide**: [tests/README.md](./tests/README.md)

---

## 🔄 CI/CD Pipeline

<div align="center">

### 🤖 Automated Workflows with GitHub Actions

**Continuous Integration & Deployment**

</div>

### 🔧 Available Workflows

<table>
<tr>
<td width="33%">

#### 🔍 Lint & Format

**File:** `lint-and-format.yml`

**Triggers:**

- Push to `main`/`staging`
- Pull requests

**Actions:**

- ✅ ESLint code quality
- 💅 Prettier formatting
- 📝 Inline annotations

</td>
<td width="33%">

#### 🧪 Tests

**File:** `tests.yml`

**Triggers:**

- Push to `main`/`staging`
- Pull requests

**Actions:**

- ✅ Run Jest test suite
- 📊 Coverage reports
- 💬 PR comments
- 📦 Artifact uploads

</td>
<td width="33%">

#### 🐳 Docker Build

**File:** `docker-build-and-push.yml`

**Triggers:**

- Push to `main`
- Manual dispatch

**Actions:**

- 🏗️ Multi-stage builds
- 🚀 Push to Docker Hub
- 🏷️ Semantic versioning

</td>
</tr>
</table>

### 🔄 CI/CD Flow

```mermaid
graph TD
    A[💻 Git Push] --> B{Which Branch?}
    B -->|main/staging| C[🔍 Lint & Format]
    B -->|main/staging| D[🧪 Run Tests]
    B -->|main only| E[🐳 Docker Build]

    C --> F{✅ Pass?}
    D --> G{✅ Pass?}
    E --> H{✅ Pass?}

    F -->|No| I[❌ Block Merge]
    G -->|No| I
    H -->|No| I

    F -->|Yes| J[✅ Ready to Merge]
    G -->|Yes| J
    H -->|Yes| K[🚀 Push to Docker Hub]

    J --> L[🎉 Merge to Main]
    L --> M[🚀 Deploy to Production]

    style A fill:#e1f5ff
    style C fill:#fff4e1
    style D fill:#ffe1e1
    style E fill:#e1ffe1
    style M fill:#f0e1ff
```

### 📊 Workflow Status

View real-time workflow status:

[![Lint and Format](https://github.com/ayushh9999/acquisitions/actions/workflows/lint-and-format.yml/badge.svg)](https://github.com/ayushh9999/acquisitions/actions/workflows/lint-and-format.yml)
[![Tests](https://github.com/ayushh9999/acquisitions/actions/workflows/tests.yml/badge.svg)](https://github.com/ayushh9999/acquisitions/actions/workflows/tests.yml)
[![Docker Build](https://github.com/ayushh9999/acquisitions/actions/workflows/docker-build-and-push.yml/badge.svg)](https://github.com/ayushh9999/acquisitions/actions/workflows/docker-build-and-push.yml)

� **Detailed CI/CD guide**: [.github/workflows/README.md](.github/workflows/README.md)

---

- **Trigger**: Push to `main` (production) or manual dispatch
- **Actions**: Multi-platform Docker builds
- **Features**: Docker Hub push, metadata tagging, security scans

### Quick Setup

1. **Required Secrets** (Settings → Secrets → Actions):

   ```
   DOCKER_USERNAME=your_dockerhub_username
   DOCKER_PASSWORD=your_dockerhub_token
   ```

2. **Push to trigger workflows**:

   ```bash
   git add .
   git commit -m "feat: trigger CI/CD"
   git push origin main
   ```

3. **View workflow status**: Check the badges at the top of this README or visit the Actions tab.

For complete CI/CD documentation, see **[.github/CI_CD_GUIDE.md](./.github/CI_CD_GUIDE.md)**.

---

## Environment Variables

### Required Variables

| Variable       | Description                  | Example                          |
| -------------- | ---------------------------- | -------------------------------- |
| `PORT`         | Server port                  | `5000`                           |
| `NODE_ENV`     | Environment                  | `development` or `production`    |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host/db` |
| `JWT_SECRET`   | Secret for JWT signing       | `your_secret_key`                |
| `ARCJET_KEY`   | Arcjet API key               | `ajkey_xxx`                      |

### Optional Variables

| Variable    | Description   | Default |
| ----------- | ------------- | ------- |
| `LOG_LEVEL` | Logging level | `info`  |

---

## Project Structure

```
acquisitions/
├── .github/
│   ├── workflows/
│   │   ├── lint-and-format.yml      # Code quality CI
│   │   ├── tests.yml                # Automated testing
│   │   └── docker-build-and-push.yml # Docker builds
│   ├── CI_CD_GUIDE.md               # Complete CI/CD docs
│   ├── QUICK_REFERENCE.md           # Quick reference card
│   └── workflows/README.md          # Workflow overview
├── src/
│   ├── app.js                 # Express app setup
│   ├── index.js               # Entry point
│   ├── server.js              # Server configuration
│   ├── config/
│   │   ├── arcjet.js         # Arcjet security config
│   │   ├── database.js       # Database connection
│   │   └── logger.js         # Winston logger setup
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── user.controller.js
│   ├── middleware/
│   │   └── security.middleware.js
│   ├── models/
│   │   └── user.model.js     # Drizzle schema
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── user.routes.js
│   ├── services/
│   │   ├── auth.service.js
│   │   └── users.service.js
│   ├── utils/
│   │   ├── cookies.js
│   │   ├── format.js
│   │   └── jwt.js
│   └── validations/
│       └── auth.validation.js
├── tests/
│   ├── app.test.js            # API integration tests
│   └── README.md              # Testing documentation
├── drizzle/                   # Database migrations
├── logs/                      # Application logs
├── Dockerfile                 # Multi-stage Docker build
├── docker-compose.dev.yml     # Development with Neon Local
├── docker-compose.prod.yml    # Production with Neon Cloud
├── drizzle.config.js         # Drizzle ORM config
├── eslint.config.js          # ESLint configuration
├── jest.config.ts            # Jest configuration
├── .prettierrc               # Prettier configuration
├── package.json              # Dependencies and scripts
└── DOCKER_SETUP.md           # Docker documentation
```

---

## Scripts

```bash
# Development
npm run dev          # Start with hot reload (node --watch)
npm start            # Start production server

# Database
npm run db:generate  # Generate migration files
npm run db:migrate   # Run migrations
npm run db:studio    # Open Drizzle Studio GUI

# Testing
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run format:check # Check formatting
```

---

## Deployment

### Docker (Recommended)

See **[DOCKER_SETUP.md](./DOCKER_SETUP.md)** for complete Docker deployment guide.

```bash
# Quick production deployment
docker-compose -f docker-compose.prod.yml up -d --build
```

### Manual Deployment

1. **Prepare Environment**

   ```bash
   NODE_ENV=production
   DATABASE_URL=your_neon_cloud_url
   JWT_SECRET=strong_random_secret
   ```

2. **Install Dependencies**

   ```bash
   npm ci --only=production
   ```

3. **Run Migrations**

   ```bash
   npm run db:migrate
   ```

4. **Start Server**
   ```bash
   node src/index.js
   ```

### Platform-Specific Guides

#### Deploy to Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Deploy to Render

1. Connect GitHub repository
2. Set environment variables
3. Build command: `npm install`
4. Start command: `node src/index.js`

#### Deploy to Fly.io

```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Deploy
fly launch
fly deploy
```

---

## Security Features

### Arcjet Protection

- ✅ **Shield**: Protection against SQL injection, XSS
- ✅ **Bot Detection**: Blocks automated bots
- ✅ **Rate Limiting**:
  - Guest: 5 requests/minute
  - User: 10 requests/minute
  - Admin: 20 requests/minute

### Authentication

- ✅ **Password Hashing**: bcrypt with salt rounds
- ✅ **JWT Tokens**: Signed with secret, 24h expiry
- ✅ **HttpOnly Cookies**: Prevents XSS attacks
- ✅ **Secure Cookies**: HTTPS in production

### Headers & CORS

- ✅ **Helmet**: Security headers
- ✅ **CORS**: Configurable origins
- ✅ **Cookie Security**: SameSite strict

---

## Tech Stack

| Technology          | Purpose                  |
| ------------------- | ------------------------ |
| **Node.js**         | Runtime environment      |
| **Express v5**      | Web framework            |
| **Neon PostgreSQL** | Serverless database      |
| **Drizzle ORM**     | Type-safe ORM            |
| **Arcjet**          | Security & rate limiting |
| **JWT**             | Authentication tokens    |
| **Bcrypt**          | Password hashing         |
| **Zod**             | Schema validation        |
| **Winston**         | Logging                  |
| **Helmet**          | Security headers         |
| **Docker**          | Containerization         |

---

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 💻 Tech Stack

<div align="center">

### 🚀 Powered by Modern Technologies

</div>

<table>
<tr>
<td width="50%">

#### Backend & Runtime

- ⚡ **Node.js v20** - JavaScript runtime
- 🚂 **Express v5.1.0** - Web framework
- 🗄️ **Neon PostgreSQL** - Serverless database
- ⚡ **Drizzle ORM v0.44.6** - Type-safe ORM

</td>
<td width="50%">

#### Security & Auth

- 🛡️ **Arcjet v1.0.0** - Protection suite
- 🔐 **JWT** - Token authentication
- 🔒 **bcrypt v6.0.0** - Password hashing
- ⛑️ **Helmet v8.1.0** - Security headers

</td>
</tr>
<tr>
<td width="50%">

#### Validation & Logging

- ✅ **Zod v3.24.1** - Schema validation
- 📝 **Winston v3.17.0** - Logging library
- 🍪 **cookie-parser** - Cookie management
- 🌐 **CORS** - Cross-origin support

</td>
<td width="50%">

#### DevOps & Testing

- 🐳 **Docker** - Containerization
- 🧪 **Jest v30.2.0** - Testing framework
- 🔍 **Supertest v7.1.4** - API testing
- 🤖 **GitHub Actions** - CI/CD

</td>
</tr>
</table>

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🔧 Development Process

```mermaid
graph LR
    A[🍴 Fork Repo] --> B[🌿 Create Branch]
    B --> C[💻 Make Changes]
    C --> D[✅ Add Tests]
    D --> E[🧪 Run Tests]
    E --> F{Tests Pass?}
    F -->|No| C
    F -->|Yes| G[💅 Format Code]
    G --> H[📝 Commit]
    H --> I[🚀 Push Branch]
    I --> J[📬 Create PR]

    style A fill:#e1f5ff
    style D fill:#ffe1e1
    style G fill:#f0e1ff
    style J fill:#e1ffe1
```

### 📝 Contribution Steps

1. **Fork the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/acquisitions.git
   cd acquisitions
   ```

2. **Create a feature branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes** following our code style

4. **Test your changes**

   ```bash
   npm test && npm run lint && npm run format
   ```

5. **Commit your changes**

   ```bash
   git commit -m 'feat: add amazing feature'
   ```

6. **Push to your fork**

   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**

### 📜 Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding or updating tests

---

## 📄 License

This project is licensed under the **ISC License**.

```
ISC License

Copyright (c) 2025 Ayush Mondal

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
```

---

## 📞 Support & Resources

<div align="center">

### Need Help? We're Here!

</div>

<table>
<tr>
<td width="33%" align="center">

### 🐛 Report Issues

Found a bug?

[Create an Issue](https://github.com/ayushh9999/acquisitions/issues)

</td>
<td width="33%" align="center">

### 💬 Discussions

Have questions?

[Join Discussions](https://github.com/ayushh9999/acquisitions/discussions)

</td>
<td width="33%" align="center">

### 📚 Documentation

Need guidance?

[Read the Docs](./DOCKER_SETUP.md)

</td>
</tr>
</table>

### 📖 Additional Resources

- 🐘 **Neon PostgreSQL**: [neon.tech/docs](https://neon.tech/docs)
- ⚡ **Drizzle ORM**: [orm.drizzle.team](https://orm.drizzle.team)
- 🛡️ **Arcjet Security**: [docs.arcjet.com](https://docs.arcjet.com)
- 🚂 **Express.js**: [expressjs.com](https://expressjs.com)
- 🐳 **Docker**: [docs.docker.com](https://docs.docker.com)

### 🌟 Acknowledgments

Special thanks to:

- 💚 **Neon** for serverless PostgreSQL
- 🛡️ **Arcjet** for security features
- 🚂 **Express** team for the framework
- ⚡ **Drizzle** for the amazing ORM

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

**Built with ❤️ and ☕ by [Ayush Mondal](https://github.com/ayushh9999)**

[![GitHub stars](https://img.shields.io/github/stars/ayushh9999/acquisitions?style=social)](https://github.com/ayushh9999/acquisitions/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/ayushh9999/acquisitions?style=social)](https://github.com/ayushh9999/acquisitions/network/members)
[![GitHub watchers](https://img.shields.io/github/watchers/ayushh9999/acquisitions?style=social)](https://github.com/ayushh9999/acquisitions/watchers)

[⬆ Back to Top](#-acquisitions-api)

</div>
