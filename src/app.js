/**
 * Express Application Setup
 *
 * This file configures the Express application with:
 * - Security middleware (Helmet, CORS)
 * - Body parsing (JSON, URL-encoded)
 * - Cookie parsing
 * - Request logging (Morgan)
 * - Custom security middleware (Arcjet)
 * - Route handlers
 * - Error handlers
 */

// Import required packages
import express from 'express';
import logger from '#config/logger.js';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// Import route handlers
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

// Import custom middleware
import securityMiddleware from './middleware/security.middleware.js';

// Initialize Express application
const app = express();

// =============================================================================
// MIDDLEWARE CONFIGURATION
// =============================================================================

// Security: Add security headers with Helmet
app.use(helmet());

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Parse cookies from request headers
app.use(cookieParser());

// HTTP request logging with Morgan
app.use(
  morgan('combined', {
    stream: { write: message => logger.info(message.trim()) },
  })
);

// Apply custom security middleware (Arcjet protection)
app.use(securityMiddleware);

// =============================================================================
// BASIC ROUTES
// =============================================================================

/**
 * Home Route
 * GET /
 * Returns a welcome message
 */
app.get('/', (req, res) => {
  logger.info('Received request to /');
  res.status(200).send('Hello, from acquisitions app!');
});

/**
 * Health Check Route
 * GET /health
 * Returns server health status, timestamp, and uptime
 * Used for monitoring and load balancers
 */
app.get('/health', (req, res) => {
  res.status(200).send({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

/**
 * API Info Route
 * GET /api
 * Returns basic API information
 */
app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Acquisitions API is running!' });
});

// =============================================================================
// API ROUTES
// =============================================================================

// Authentication routes: /api/auth/*
app.use('/api/auth', authRoutes);

// User management routes: /api/users/*
app.use('/api/users', userRoutes);

// =============================================================================
// ERROR HANDLERS
// =============================================================================

/**
 * 404 Not Found Handler
 * Catches all undefined routes
 * Must be placed after all other routes
 */
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`,
  });
});

/**
 * Global Error Handler
 * Catches all unhandled errors from routes and middleware
 * Must be the last middleware
 */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Log the error for debugging
  logger.error('Unhandled error:', err);

  // Determine status code and message
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Send error response
  res.status(statusCode).json({
    error: statusCode === 500 ? 'Internal Server Error' : message,
    // Include stack trace only in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Export the configured Express application
export default app;
