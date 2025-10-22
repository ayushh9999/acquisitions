/**
 * User Service
 *
 * Contains business logic for user management operations:
 * - Fetching all users
 * - (Future: Individual user CRUD operations)
 *
 * This service handles database queries for user data.
 */

// Import database and models
import { db } from '#config/database.js';
import { users } from '#models/user.model.js';
import logger from '#config/logger.js';

/**
 * Get All Users
 *
 * Retrieves all users from the database:
 * - Excludes password field for security
 * - Returns id, name, email, role, and createdAt
 * - Includes count in log for monitoring
 *
 * @returns {Promise<Array>} Array of user objects (without passwords)
 * @throws {Error} If database query fails
 */
export const getAllUsers = async () => {
  try {
    // Query database for all users (password excluded)
    const allUsers = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.created_at,
      })
      .from(users);

    // Log successful retrieval with count
    logger.info(`Retrieved ${allUsers.length} users from database`);

    // Return users array
    return allUsers;
  } catch (e) {
    // Log error
    logger.error(`Error fetching all users: ${e}`);

    // Rethrow error for controller to handle
    throw e;
  }
};
