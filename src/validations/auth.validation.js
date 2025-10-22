/**
 * Authentication Validation Schemas
 *
 * Defines validation rules for authentication endpoints using Zod:
 * - Sign-up validation (name, email, password, role)
 * - Sign-in validation (email, password)
 *
 * These schemas ensure data integrity and security before processing.
 */

import { z } from 'zod';

/**
 * Sign-Up Validation Schema
 *
 * Validates user registration data:
 *
 * Rules:
 * - name: 2-255 characters, trimmed
 * - email: Valid email format, max 255 chars, lowercase, trimmed
 * - password: 6-128 characters (plain text - will be hashed)
 * - role: Either 'user' or 'admin' (default: 'user')
 *
 * Used by: POST /api/auth/sign-up
 */
export const signupSchema = z.object({
  // User's full name
  name: z.string().min(2).max(255).trim(),

  // User's email (must be valid email format)
  email: z.string().email().max(255).toLowerCase().trim(),

  // Password (will be hashed before storage)
  password: z.string().min(6).max(128),

  // User role (default: 'user')
  role: z.enum(['user', 'admin']).default('user'),
});

/**
 * Sign-In Validation Schema
 *
 * Validates user login data:
 *
 * Rules:
 * - email: Valid email format, lowercase, trimmed
 * - password: At least 1 character (any length for login)
 *
 * Note: Password validation is minimal for login since we're
 * comparing against stored hash, not enforcing creation rules.
 *
 * Used by: POST /api/auth/sign-in
 */
export const signInSchema = z.object({
  // User's email
  email: z.string().email().toLowerCase().trim(),

  // User's password (minimal validation for login)
  password: z.string().min(1),
});
