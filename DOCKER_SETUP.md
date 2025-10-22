# Docker Setup Guide - Acquisitions API

Complete guide for running the Acquisitions API with Docker in both development and production environments.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Development Environment (with Neon Local)](#development-environment-with-neon-local)
4. [Production Environment (with Neon Cloud)](#production-environment-with-neon-cloud)
5. [Docker Commands Reference](#docker-commands-reference)
6. [Database Migrations](#database-migrations)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have installed:

- **Docker**: Version 20.10 or higher
- **Docker Compose**: Version 2.0 or higher
- **Git**: For cloning the repository

Check your installations:

```bash
docker --version
docker-compose --version
```

---

## Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ayushh9999/acquisitions.git
cd acquisitions
```

### 2. Prepare Environment Files

The project uses different environment files for different scenarios:

- `.env.development` - For Docker development (with Neon Local)
- `.env.production` - For Docker production (with Neon Cloud)
- `.env` - For local development without Docker

**Copy the example file:**

```bash
# For local development
cp .env.example .env

# For production (update with real values)
cp .env.example .env.production
```

---

## Development Environment (with Neon Local)

The development setup uses **Neon Local** - a local PostgreSQL proxy that simulates Neon's serverless database behavior.

### Architecture

```
┌─────────────────┐
│   Your App      │
│  (Node.js)      │
└────────┬────────┘
         │ DATABASE_URL
         ↓
┌─────────────────┐
│  Neon Local     │  ← Proxy that handles branching
│  (Port 5432)    │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  PostgreSQL     │  ← Actual database
│  (Internal)     │
└─────────────────┘
```

### Step-by-Step Setup

#### 1. Review Development Environment Variables

The `.env.development` file is pre-configured:

```bash
DATABASE_URL=postgres://neondb_owner:devpassword@neon-local:5432/neondb
NODE_ENV=development
PORT=5000
JWT_SECRET=dev_secret_key_change_in_production_123456789
ARCJET_KEY=ajkey_01k86dk5fse3gvpctkn126fqzw
```

#### 2. Start the Development Environment

```bash
# Build and start all services (app + neon-local + postgres)
docker-compose -f docker-compose.dev.yml up --build

# Or run in detached mode (background)
docker-compose -f docker-compose.dev.yml up -d --build
```

This will start:

- ✅ PostgreSQL database
- ✅ Neon Local proxy
- ✅ Your application with hot-reload

#### 3. Verify Services

Check all services are running:

```bash
docker-compose -f docker-compose.dev.yml ps
```

Expected output:

```
NAME                        STATUS              PORTS
acquisitions-app-dev        running             0.0.0.0:5000->5000/tcp
neon-local                  running             0.0.0.0:5432->5432/tcp
postgres-dev                running
```

#### 4. Test the Application

```bash
# Check health endpoint
curl http://localhost:5000/health

# Check API endpoint
curl http://localhost:5000/api
```

#### 5. View Logs

```bash
# All services
docker-compose -f docker-compose.dev.yml logs -f

# Specific service
docker-compose -f docker-compose.dev.yml logs -f app
docker-compose -f docker-compose.dev.yml logs -f neon-local
```

#### 6. Access the Database Directly

You can connect to the database through Neon Local:

```bash
# Using psql
docker exec -it postgres-dev psql -U neondb_owner -d neondb

# Or connect from host machine
psql postgres://neondb_owner:devpassword@localhost:5432/neondb
```

#### 7. Hot Reload Development

The application supports hot-reload. Edit any file in `src/` and the app will automatically restart:

```bash
# Watch logs to see reload
docker-compose -f docker-compose.dev.yml logs -f app
```

#### 8. Stop Development Environment

```bash
# Stop services
docker-compose -f docker-compose.dev.yml down

# Stop and remove volumes (clean slate)
docker-compose -f docker-compose.dev.yml down -v
```

---

## Production Environment (with Neon Cloud)

The production setup connects directly to **Neon Cloud** - no local proxy needed.

### Architecture

```
┌─────────────────┐
│   Your App      │
│  (Node.js)      │
└────────┬────────┘
         │ DATABASE_URL
         │ (Direct HTTPS connection)
         ↓
┌─────────────────────────────────┐
│  Neon Cloud (Serverless)        │
│  neon.tech                       │
│  ┌──────────┐  ┌──────────┐    │
│  │ Branch 1 │  │ Branch 2 │    │
│  └──────────┘  └──────────┘    │
└─────────────────────────────────┘
```

### Step-by-Step Setup

#### 1. Get Your Neon Cloud Database URL

1. Go to [Neon Console](https://console.neon.tech/)
2. Select your project
3. Go to **Connection Details**
4. Copy the **Connection String**

Example:

```
postgresql://user:password@ep-xxx-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require
```

#### 2. Configure Production Environment

Edit `.env.production` with your actual values:

```bash
# REQUIRED: Replace with your actual Neon Cloud URL
DATABASE_URL=postgresql://neondb_owner:YOUR_PASSWORD@ep-your-endpoint.region.aws.neon.tech/neondb?sslmode=require

# REQUIRED: Generate a strong secret
# Run: openssl rand -base64 32
JWT_SECRET=YOUR_STRONG_RANDOM_SECRET_HERE

# REQUIRED: Use production Arcjet key
ARCJET_KEY=ajkey_YOUR_PRODUCTION_KEY

# Production settings
NODE_ENV=production
PORT=5000
LOG_LEVEL=info
```

⚠️ **IMPORTANT**: Never commit `.env.production` with real secrets to Git!

#### 3. Build and Start Production Container

```bash
# Build production image
docker-compose -f docker-compose.prod.yml build

# Start production container
docker-compose -f docker-compose.prod.yml up -d
```

#### 4. Verify Production Deployment

```bash
# Check container status
docker-compose -f docker-compose.prod.yml ps

# Check logs
docker-compose -f docker-compose.prod.yml logs -f

# Test health endpoint
curl http://localhost:5000/health
```

#### 5. Run Database Migrations (Production)

```bash
# Connect to production container
docker-compose -f docker-compose.prod.yml exec app sh

# Inside container, run migrations
npm run db:migrate

# Exit container
exit
```

#### 6. Monitor Production Logs

```bash
# Follow logs in real-time
docker-compose -f docker-compose.prod.yml logs -f app

# View last 100 lines
docker-compose -f docker-compose.prod.yml logs --tail=100 app
```

#### 7. Stop Production Environment

```bash
# Stop services
docker-compose -f docker-compose.prod.yml down

# Stop and remove all data
docker-compose -f docker-compose.prod.yml down -v
```

---

## Docker Commands Reference

### Building

```bash
# Build development image
docker-compose -f docker-compose.dev.yml build

# Build production image
docker-compose -f docker-compose.prod.yml build

# Build without cache
docker-compose -f docker-compose.dev.yml build --no-cache
```

### Starting/Stopping

```bash
# Start services (foreground)
docker-compose -f docker-compose.dev.yml up

# Start services (background)
docker-compose -f docker-compose.dev.yml up -d

# Stop services
docker-compose -f docker-compose.dev.yml down

# Stop and remove volumes
docker-compose -f docker-compose.dev.yml down -v
```

### Viewing Logs

```bash
# All services
docker-compose -f docker-compose.dev.yml logs -f

# Specific service
docker-compose -f docker-compose.dev.yml logs -f app

# Last N lines
docker-compose -f docker-compose.dev.yml logs --tail=50 app
```

### Container Management

```bash
# List containers
docker-compose -f docker-compose.dev.yml ps

# Execute command in container
docker-compose -f docker-compose.dev.yml exec app sh

# Restart specific service
docker-compose -f docker-compose.dev.yml restart app

# View resource usage
docker stats
```

### Cleanup

```bash
# Remove stopped containers
docker-compose -f docker-compose.dev.yml rm

# Remove unused images
docker image prune -a

# Remove all unused resources
docker system prune -a --volumes
```

---

## Database Migrations

### Development (Neon Local)

```bash
# Generate migration
docker-compose -f docker-compose.dev.yml exec app npm run db:generate

# Run migrations
docker-compose -f docker-compose.dev.yml exec app npm run db:migrate

# Open Drizzle Studio
docker-compose -f docker-compose.dev.yml exec app npm run db:studio
```

### Production (Neon Cloud)

```bash
# Connect to production container
docker-compose -f docker-compose.prod.yml exec app sh

# Inside container:
npm run db:migrate

# Exit
exit
```

### Manual Migration with Neon CLI

If using Neon branching:

```bash
# Create a new branch for migration
neonctl branches create --name migration-$(date +%Y%m%d)

# Get branch connection string
neonctl connection-string migration-$(date +%Y%m%d)

# Run migration against branch
DATABASE_URL="<branch_url>" npm run db:migrate

# Merge branch to main after testing
```

---

## Troubleshooting

### Issue: Port Already in Use

```bash
# Find process using port 5000
# Windows
netstat -ano | findstr :5000

# Linux/Mac
lsof -i :5000

# Kill the process or change PORT in .env file
```

### Issue: Database Connection Failed

```bash
# Check if neon-local is healthy
docker-compose -f docker-compose.dev.yml ps

# Check neon-local logs
docker-compose -f docker-compose.dev.yml logs neon-local

# Restart services
docker-compose -f docker-compose.dev.yml restart
```

### Issue: Hot Reload Not Working

```bash
# Check if volumes are mounted correctly
docker-compose -f docker-compose.dev.yml config

# Restart with fresh build
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml up --build
```

### Issue: Cannot Connect to Neon Cloud (Production)

```bash
# Verify DATABASE_URL format
# Should include: ?sslmode=require

# Check from inside container
docker-compose -f docker-compose.prod.yml exec app sh
node -e "console.log(process.env.DATABASE_URL)"

# Test connection
npm run db:studio
```

### Issue: Permission Denied Errors

```bash
# Fix logs directory permissions
mkdir -p logs
chmod -R 777 logs

# Rebuild with no cache
docker-compose -f docker-compose.dev.yml build --no-cache
```

### Issue: Out of Memory

```bash
# Check Docker resources
docker stats

# Increase Docker memory limit in Docker Desktop:
# Settings > Resources > Memory > Increase to 4GB+

# For production, adjust in docker-compose.prod.yml:
deploy:
  resources:
    limits:
      memory: 1G  # Increase this
```

### Viewing Detailed Container Logs

```bash
# Enter container shell
docker-compose -f docker-compose.dev.yml exec app sh

# Check environment variables
env | grep DATABASE_URL

# Check Node.js version
node --version

# Test database connectivity
npm run db:studio
```

---

## Best Practices

### Development

- ✅ Always use `docker-compose.dev.yml` for development
- ✅ Commit `.env.development` to Git (no real secrets)
- ✅ Use Neon Local for isolated development
- ✅ Create database branches for testing features
- ✅ Keep development data separate from production

### Production

- ✅ Never commit `.env.production` with real secrets
- ✅ Use environment variables from your CI/CD or hosting platform
- ✅ Enable SSL/TLS for database connections (`sslmode=require`)
- ✅ Implement proper backup strategies
- ✅ Monitor database performance and scaling
- ✅ Use Neon branching for preview environments

### Security

- ✅ Rotate JWT_SECRET regularly
- ✅ Use strong database passwords
- ✅ Restrict database access by IP (Neon Console)
- ✅ Enable Arcjet protection in production
- ✅ Keep dependencies updated

---

## Additional Resources

- **Neon Documentation**: https://neon.tech/docs
- **Neon Local Guide**: https://neon.tech/docs/local/neon-local
- **Docker Compose**: https://docs.docker.com/compose/
- **Drizzle ORM**: https://orm.drizzle.team/

---

## Support

For issues or questions:

- GitHub Issues: https://github.com/ayushh9999/acquisitions/issues
- Neon Community: https://community.neon.tech/

---

**Happy Coding! 🚀**
