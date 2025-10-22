/**
 * User Routes
 *
 * Defines all user management endpoints:
 * - GET    /api/users     - Fetch all users
 * - POST   /api/users     - Create new user (not implemented)
 * - GET    /api/users/:id - Fetch single user (not implemented)
 * - PUT    /api/users/:id - Update user (not implemented)
 * - DELETE /api/users/:id - Delete user (not implemented)
 *
 * All routes are prefixed with /api/users in app.js
 */

import express from 'express';
import { fetchAllUsers } from '#controllers/user.controller.js';

// Create router instance
const router = express.Router();

/**
 * Get All Users Route
 * GET /api/users
 * Returns list of all users (passwords excluded)
 */
router.get('/', fetchAllUsers);

// =============================================================================
// PLACEHOLDER ROUTES (Future Implementation)
// =============================================================================

/**
 * Create User Route (Not Implemented)
 * POST /api/users
 * Future: Create a new user (admin only)
 */
router.post('/', (req, res) =>
  res.status(501).json({ message: 'POST /users - Not implemented yet' })
);

/**
 * Get Single User Route (Not Implemented)
 * GET /api/users/:id
 * Future: Fetch user by ID
 */
router.get('/:id', (req, res) =>
  res.status(501).json({ message: 'GET /users/:id - Not implemented yet' })
);

/**
 * Update User Route (Not Implemented)
 * PUT /api/users/:id
 * Future: Update user information
 */
router.put('/:id', (req, res) =>
  res.status(501).json({ message: 'PUT /users/:id - Not implemented yet' })
);

/**
 * Delete User Route (Not Implemented)
 * DELETE /api/users/:id
 * Future: Delete user account
 */
router.delete('/:id', (req, res) =>
  res.status(501).json({ message: 'DELETE /users/:id - Not implemented yet' })
);

// Export router
export default router;
