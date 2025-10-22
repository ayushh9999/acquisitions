/**
 * Logger Configuration
 *
 * This file sets up Winston logger with:
 * - File logging for errors and all logs
 * - Console logging in development mode
 * - JSON format for production
 * - Colorized output for development
 *
 * Log Levels: error, warn, info, http, verbose, debug, silly
 */

import winston from 'winston';

/**
 * Create Winston logger instance
 * - Logs are stored in the 'logs/' directory
 * - Log level can be configured via LOG_LEVEL environment variable
 */
const logger = winston.createLogger({
  // Set log level from environment or default to 'info'
  level: process.env.LOG_LEVEL || 'info',

  // Format logs with timestamp and JSON structure
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),

  // Define log output destinations
  transports: [
    // Error logs: Only error level messages
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),

    // Combined logs: All log levels
    new winston.transports.File({
      filename: 'logs/combined.log',
    }),
  ],
});

/**
 * Add console logging in non-production environments
 * - Colorized output for better readability
 * - Simple format instead of JSON
 */
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

// Export logger instance
export default logger;
