/**
 * Authentication Routes
 *
 * Defines all authentication-related endpoints:
 * - POST /api/auth/sign-up  - Register new user
 * - POST /api/auth/sign-in  - Login existing user
 * - POST /api/auth/sign-out - Logout current user
 *
 * All routes are prefixed with /api/auth in app.js
 */

import express from 'express';
import { signup, signin, signout } from '#controllers/auth.controller.js';

// Create router instance
const router = express.Router();

/**
 * Sign Up Route
 * POST /api/auth/sign-up
 * Creates a new user account
 */
router.post('/sign-up', signup);

/**
 * Sign In Route
 * POST /api/auth/sign-in
 * Authenticates existing user
 */
router.post('/sign-in', signin);

/**
 * Sign Out Route
 * POST /api/auth/sign-out
 * Logs out current user
 */
router.post('/sign-out', signout);

// Export router
export default router;
