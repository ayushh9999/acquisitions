/**
 * Server Configuration
 *
 * This file initializes and starts the HTTP server:
 * - Loads environment configuration
 * - Imports the Express application
 * - Starts listening on the configured port
 */

// Load environment variables
import 'dotenv/config';

// Import the Express application
import app from './app.js';

// Import logger for server logs
import logger from '#config/logger.js';

// Get port from environment or use default
const PORT = process.env.PORT || 5000;

// Start the HTTP server
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
