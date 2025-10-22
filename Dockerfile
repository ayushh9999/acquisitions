# Multi-stage Dockerfile for Node.js Application
# Stage 1: Base
FROM node:20-alpine AS base

# Install necessary build tools
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files
COPY package*.json ./

# Stage 2: Dependencies
FROM base AS deps

# Install production dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Stage 3: Development
FROM base AS development

# Install all dependencies (including dev)
RUN npm ci

# Copy source code
COPY . .

# Expose port
EXPOSE 5000

# Set environment
ENV NODE_ENV=development

# Start with hot reload
CMD ["npm", "run", "dev"]

# Stage 4: Builder
FROM base AS builder

# Install all dependencies
RUN npm ci

# Copy source code
COPY . .

# Run any build steps if needed (migrations, etc.)
# RUN npm run build

# Stage 5: Production
FROM node:20-alpine AS production

WORKDIR /app

# Copy production dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application code
COPY --from=builder /app/src ./src
COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder /app/drizzle.config.js ./
COPY --from=builder /app/package*.json ./

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

# Create logs directory
RUN mkdir -p /app/logs && \
    chown -R nodejs:nodejs /app/logs

USER nodejs

# Expose port
EXPOSE 5000

# Set environment
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD node -e "require('http').get('http://localhost:5000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application
CMD ["node", "src/index.js"]
