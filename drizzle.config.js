/**
 * Drizzle ORM Configuration
 *
 * Configuration for Drizzle Kit (migration tool):
 * - schema: Location of database schema files
 * - out: Output directory for migration files
 * - dialect: Database type (PostgreSQL)
 * - dbCredentials: Connection string from environment
 *
 * Used by Drizzle Kit commands:
 * - npm run db:generate  (create migrations)
 * - npm run db:migrate   (apply migrations)
 * - npm run db:studio    (open database GUI)
 */

// Load environment variables
import 'dotenv/config';

export default {
  // Path to database schema files (models)
  schema: './src/models/*.js',

  // Output directory for generated migration files
  out: 'drizzle',

  // Database dialect (PostgreSQL)
  dialect: 'postgresql',

  // Database connection credentials
  dbCredentials: {
    url: process.env.DATABASE_URL, // Connection string from .env
  },
};
