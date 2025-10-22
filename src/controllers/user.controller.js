/**
 * User Controller
 *
 * Handles user management HTTP requests:
 * - Fetching all users
 * - (Future: CRUD operations for individual users)
 *
 * This controller manages user-related endpoints after authentication.
 */

// Import logger for tracking
import logger from '#config/logger.js';

// Import user service functions
import { getAllUsers } from '#services/users.service.js';

/**
 * Fetch All Users Controller
 *
 * GET /api/users
 *
 * Retrieves all users from the database:
 * 1. Calls service to get all users (passwords excluded)
 * 2. Returns users array with count
 *
 * @returns {200} Success - List of users
 * @returns {500} Internal Server Error
 */
export const fetchAllUsers = async (req, res, next) => {
  try {
    // Log request
    logger.info('Getting users...');

    // Fetch all users from database (passwords excluded)
    const allUsers = await getAllUsers();

    // Return users with count
    res.json({
      message: 'Successfully retrieved users',
      users: allUsers,
      count: allUsers.length,
    });
  } catch (e) {
    // Log error
    logger.error(e);

    // Pass error to global error handler
    next(e);
  }
};
