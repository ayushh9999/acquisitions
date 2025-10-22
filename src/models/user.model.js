/**
 * User Model (Database Schema)
 *
 * Defines the users table structure using Drizzle ORM
 * This schema is used for:
 * - Database migrations
 * - Type-safe queries
 * - Data validation
 */

import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

/**
 * Users Table Schema
 *
 * Table: users
 * Purpose: Store user account information
 */
export const users = pgTable('users', {
  // Primary key: Auto-incrementing integer
  id: serial('id').primaryKey(),

  // User's full name (max 256 characters)
  name: varchar('name', { length: 256 }).notNull(),

  // User's email (unique, max 256 characters)
  email: varchar('email', { length: 256 }).notNull().unique(),

  // Hashed password (max 256 characters)
  // Note: Never store plain text passwords
  password: varchar('password', { length: 256 }).notNull(),

  // User role: 'user' or 'admin' (default: 'user')
  role: varchar('role', { length: 256 }).notNull().default('user'),

  // Timestamp when user was created
  created_at: timestamp().notNull().defaultNow(),

  // Timestamp when user was last updated
  updated_at: timestamp().notNull().defaultNow(),
});
