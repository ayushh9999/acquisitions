# 📚 Documentation Index

<div align="center">

## Complete Documentation Overview

**All the resources you need to understand, use, and contribute to Acquisitions API**

</div>

---

## 🚀 Getting Started

Perfect for newcomers and quick setup:

| Document                             | Description                                 | Best For         |
| ------------------------------------ | ------------------------------------------- | ---------------- |
| [📖 README.md](./README.md)          | Main project documentation with quick start | Everyone         |
| [⚡ Quick Start](#quick-start-guide) | 5-minute setup guide                        | Beginners        |
| [🐳 Docker Setup](./DOCKER_SETUP.md) | Complete Docker guide                       | DevOps Engineers |

---

## 📡 API Documentation

Everything about the API endpoints:

| Document                                   | Description                | Best For               |
| ------------------------------------------ | -------------------------- | ---------------------- |
| [📡 API Reference](./API_REFERENCE.md)     | Complete API documentation | Frontend Developers    |
| [🔐 Authentication Guide](#authentication) | Auth flows and examples    | Integration Developers |
| [🚨 Error Handling](#errors)               | Error codes and responses  | Debugging              |

---

## 🏗️ Architecture & Design

Deep dive into system design:

| Document                             | Description                    | Best For                |
| ------------------------------------ | ------------------------------ | ----------------------- |
| [🏗️ Architecture](./ARCHITECTURE.md) | System architecture & diagrams | Architects & Tech Leads |
| [🗄️ Database Schema](#database)      | Database design                | Backend Developers      |
| [🔒 Security Design](#security)      | Security architecture          | Security Engineers      |

---

## 🤝 Contributing

Help improve the project:

| Document                                   | Description           | Best For         |
| ------------------------------------------ | --------------------- | ---------------- |
| [🤝 Contributing Guide](./CONTRIBUTING.md) | How to contribute     | Contributors     |
| [📝 Commit Guidelines](#commits)           | Commit message format | All Contributors |
| [🧪 Testing Guide](./tests/README.md)      | How to write tests    | QA Engineers     |

---

## 🔄 CI/CD & DevOps

Automation and deployment:

| Document                                                   | Description              | Best For         |
| ---------------------------------------------------------- | ------------------------ | ---------------- |
| [🔄 CI/CD Guide](.github/workflows/README.md)              | GitHub Actions workflows | DevOps Engineers |
| [📋 Deployment Checklist](.github/DEPLOYMENT_CHECKLIST.md) | Pre-deployment checks    | Release Managers |
| [🐳 Docker Guide](./DOCKER_SETUP.md)                       | Container deployment     | DevOps Teams     |

---

## ⚡ Quick Start Guide

### 1. Clone & Install

```bash
git clone https://github.com/ayushh9999/acquisitions.git
cd acquisitions
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Setup Database

```bash
npm run db:migrate
```

### 4. Start Development

```bash
npm run dev
```

### 5. Test the API

```bash
curl http://localhost:5000/health
```

**✅ You're ready to go!**

---

## 🔐 Authentication

### Sign Up

```bash
curl -X POST http://localhost:5000/api/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"test123"}'
```

### Sign In

```bash
curl -X POST http://localhost:5000/api/auth/sign-in \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"john@test.com","password":"test123"}'
```

### Make Authenticated Request

```bash
curl http://localhost:5000/api/users \
  -b cookies.txt
```

📚 **Full Authentication Guide**: [API_REFERENCE.md](./API_REFERENCE.md#-authentication)

---

## 🗄️ Database

### Schema Overview

```
users
├── id (UUID, Primary Key)
├── name (VARCHAR 255)
├── email (VARCHAR 255, Unique)
├── password (VARCHAR 255, Hashed)
├── role (VARCHAR 50)
└── createdAt (TIMESTAMP)
```

### Database Commands

```bash
# Generate migrations
npm run db:generate

# Run migrations
npm run db:migrate

# Open database GUI
npm run db:studio
```

📚 **Full Database Guide**: [ARCHITECTURE.md](./ARCHITECTURE.md#-database-architecture)

---

## 🔒 Security

### Security Layers

1. **🔒 HTTPS/TLS** - Encrypted communication
2. **⛑️ Helmet** - Security headers
3. **🛡️ Arcjet** - Bot detection, rate limiting, DDoS protection
4. **🔑 JWT** - Token-based authentication
5. **🍪 Secure Cookies** - HttpOnly, SameSite
6. **🔒 bcrypt** - Password hashing
7. **✅ Zod** - Input validation

### Rate Limits

- Auth endpoints: 5 requests/minute
- User endpoints: 10 requests/minute
- General endpoints: 20 requests/minute

📚 **Full Security Guide**: [ARCHITECTURE.md](./ARCHITECTURE.md#-security-architecture)

---

## 🚨 Error Handling

### HTTP Status Codes

| Code | Meaning           | Example             |
| ---- | ----------------- | ------------------- |
| 200  | Success           | Request completed   |
| 201  | Created           | User registered     |
| 400  | Bad Request       | Invalid input       |
| 401  | Unauthorized      | Invalid credentials |
| 404  | Not Found         | User not found      |
| 429  | Too Many Requests | Rate limited        |
| 500  | Server Error      | Internal error      |

### Error Response Format

```json
{
  "error": "Error Type",
  "message": "Detailed error message",
  "details": {...}
}
```

📚 **Full Error Guide**: [API_REFERENCE.md](./API_REFERENCE.md#-error-handling)

---

## 📝 Commit Guidelines

### Format

```
<type>(<scope>): <subject>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code refactoring
- `test`: Tests
- `chore`: Maintenance

### Examples

```bash
feat(auth): add password reset endpoint
fix(validation): correct email regex
docs(readme): update installation steps
```

📚 **Full Commit Guide**: [CONTRIBUTING.md](./CONTRIBUTING.md#-commit-guidelines)

---

## 🧪 Testing

### Run Tests

```bash
# All tests
npm test

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage
```

### Test Coverage

- ✅ Health endpoints
- ✅ Authentication (sign-up, sign-in, sign-out)
- ✅ User management
- ✅ Error handling
- ✅ Validation

📚 **Full Testing Guide**: [tests/README.md](./tests/README.md)

---

## 🛠️ Available Commands

### Development

```bash
npm run dev          # Start with hot reload
npm start            # Start production
```

### Database

```bash
npm run db:generate  # Generate migrations
npm run db:migrate   # Run migrations
npm run db:studio    # Open GUI
```

### Testing

```bash
npm test             # Run tests
npm run test:watch   # Watch mode
```

### Code Quality

```bash
npm run lint         # Check code
npm run lint:fix     # Fix issues
npm run format       # Format code
```

---

## 🐳 Docker Commands

### Development

```bash
docker-compose -f docker-compose.dev.yml up
```

### Production

```bash
docker-compose -f docker-compose.prod.yml up
```

### Useful Commands

```bash
docker-compose down          # Stop containers
docker-compose logs -f       # View logs
docker-compose ps            # List containers
docker-compose exec app sh   # Access container
```

📚 **Full Docker Guide**: [DOCKER_SETUP.md](./DOCKER_SETUP.md)

---

## 📦 Project Structure

```
acquisitions/
├── 📂 src/              # Source code
│   ├── app.js          # Express app
│   ├── index.js        # Entry point
│   ├── config/         # Configuration
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Express middleware
│   ├── models/         # Database schemas
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── utils/          # Utilities
│   └── validations/    # Input validation
├── 📂 tests/            # Test suite
├── 📂 drizzle/          # DB migrations
├── 📂 .github/          # CI/CD workflows
└── 📄 Documentation     # You are here!
```

---

## 🔗 Quick Links

### Documentation

- [📖 README](./README.md)
- [📡 API Reference](./API_REFERENCE.md)
- [🏗️ Architecture](./ARCHITECTURE.md)
- [🤝 Contributing](./CONTRIBUTING.md)
- [🐳 Docker Setup](./DOCKER_SETUP.md)

### GitHub

- [🐛 Issues](https://github.com/ayushh9999/acquisitions/issues)
- [💬 Discussions](https://github.com/ayushh9999/acquisitions/discussions)
- [🔄 Pull Requests](https://github.com/ayushh9999/acquisitions/pulls)
- [📦 Releases](https://github.com/ayushh9999/acquisitions/releases)

### External Resources

- [🐘 Neon Docs](https://neon.tech/docs)
- [⚡ Drizzle Docs](https://orm.drizzle.team)
- [🛡️ Arcjet Docs](https://docs.arcjet.com)
- [🚂 Express Docs](https://expressjs.com)

---

## 💡 Tips & Tricks

### For Beginners

1. Start with [Quick Start Guide](#quick-start-guide)
2. Read [API Reference](./API_REFERENCE.md) for endpoints
3. Check [CONTRIBUTING.md](./CONTRIBUTING.md) to help out

### For Developers

1. Review [Architecture](./ARCHITECTURE.md) for design patterns
2. Use [API Reference](./API_REFERENCE.md) for integration
3. Read [Testing Guide](./tests/README.md) for quality assurance

### For DevOps

1. Follow [Docker Setup](./DOCKER_SETUP.md) for containers
2. Check [CI/CD Guide](.github/workflows/README.md) for automation
3. Review [Deployment Checklist](.github/DEPLOYMENT_CHECKLIST.md)

---

## 📞 Getting Help

### Found a Bug?

1. Check [existing issues](https://github.com/ayushh9999/acquisitions/issues)
2. Create a [new issue](https://github.com/ayushh9999/acquisitions/issues/new)
3. Provide detailed information

### Have a Question?

1. Check this documentation first
2. Search [discussions](https://github.com/ayushh9999/acquisitions/discussions)
3. Ask a new question

### Want to Contribute?

1. Read [Contributing Guide](./CONTRIBUTING.md)
2. Fork the repository
3. Submit a pull request

---

## 🌟 Featured Documentation

### Most Popular

- [📖 Getting Started](./README.md#-quick-start)
- [📡 API Endpoints](./API_REFERENCE.md)
- [🐳 Docker Deployment](./DOCKER_SETUP.md)

### Most Useful

- [🔐 Authentication](./API_REFERENCE.md#-authentication)
- [🚨 Error Handling](./API_REFERENCE.md#-error-handling)
- [🧪 Testing](./tests/README.md)

### Most Technical

- [🏗️ System Architecture](./ARCHITECTURE.md)
- [🗄️ Database Design](./ARCHITECTURE.md#-database-architecture)
- [🔒 Security](./ARCHITECTURE.md#-security-architecture)

---

<div align="center">

## 📚 Keep Learning!

**Explore our comprehensive documentation to master Acquisitions API**

[![GitHub stars](https://img.shields.io/github/stars/ayushh9999/acquisitions?style=social)](https://github.com/ayushh9999/acquisitions/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/ayushh9999/acquisitions?style=social)](https://github.com/ayushh9999/acquisitions/network/members)

[⬆ Back to Top](#-documentation-index)

Built with ❤️ by [Ayush Mondal](https://github.com/ayushh9999)

</div>
