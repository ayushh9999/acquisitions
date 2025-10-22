/**
 * Database Configuration
 *
 * This file sets up the database connection using:
 * - Neon: Serverless PostgreSQL database
 * - Drizzle ORM: Type-safe database queries
 *
 * The connection uses HTTP-based queries which is ideal for:
 * - Serverless environments
 * - Edge computing
 * - Low-latency queries
 */

// Load environment variables
import 'dotenv/config';

// Import Neon database client
import { neon } from '@neondatabase/serverless';

// Import Drizzle ORM
import { drizzle } from 'drizzle-orm/neon-http';

// Create Neon SQL client with connection string from environment
const sql = neon(process.env.DATABASE_URL);

// Initialize Drizzle ORM with Neon client
const db = drizzle(sql);

// Export database instance and SQL client
export { db, sql };
