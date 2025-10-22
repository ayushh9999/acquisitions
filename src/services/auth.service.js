/**
 * Authentication Service
 *
 * Contains business logic for authentication operations:
 * - Password hashing and verification
 * - User creation
 * - User lookup
 *
 * This service layer separates database operations from controllers.
 */

// Import required packages
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

// Import database and models
import { db } from '#config/database.js';
import { users } from '#models/user.model.js';
import logger from '#config/logger.js';

/**
 * Hash Password
 *
 * Hashes a plain text password using bcrypt
 * - Uses 10 salt rounds (good balance of security and performance)
 * - Returns hashed password string
 *
 * @param {string} password - Plain text password
 * @returns {Promise<string>} Hashed password
 * @throws {Error} If hashing fails
 */
export const hashPassword = async password => {
  try {
    // Hash password with 10 salt rounds
    return await bcrypt.hash(password, 10);
  } catch (e) {
    logger.error(`Error hashing the password: ${e}`);
    throw new Error('Error hashing');
  }
};

/**
 * Create User
 *
 * Creates a new user in the database:
 * 1. Checks if email already exists
 * 2. Hashes the password
 * 3. Inserts new user record
 * 4. Returns user data (without password)
 *
 * @param {Object} userData - User information
 * @param {string} userData.name - User's full name
 * @param {string} userData.email - User's email (must be unique)
 * @param {string} userData.password - Plain text password (will be hashed)
 * @param {string} [userData.role='user'] - User role ('user' or 'admin')
 * @returns {Promise<Object>} Created user object
 * @throws {Error} If email already exists or creation fails
 */
export const createUser = async ({ name, email, password, role = 'user' }) => {
  try {
    // Check if user with this email already exists
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    // Throw error if email is already registered
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash the password before storing
    const hashedPassword = await hashPassword(password);

    // Insert new user into database
    const [newUser] = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
        role,
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.created_at,
      });

    // Log successful creation
    logger.info(`New user created with email: ${email}`);

    // Return new user data (password not included)
    return newUser;
  } catch (e) {
    logger.error(`Error creating the user: ${e}`);
    throw e;
  }
};

/**
 * Verify Password
 *
 * Compares a plain text password with a hashed password
 * - Uses bcrypt.compare for secure comparison
 * - Returns true if passwords match, false otherwise
 *
 * @param {string} plainPassword - Plain text password from user
 * @param {string} hashedPassword - Hashed password from database
 * @returns {Promise<boolean>} True if passwords match
 * @throws {Error} If verification fails
 */
export const verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    // Compare plain password with hash
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (e) {
    logger.error(`Error verifying password: ${e}`);
    throw new Error('Error verifying password');
  }
};

/**
 * Find User By Email
 *
 * Searches for a user in the database by email address
 * - Returns user object if found
 * - Returns null if not found
 *
 * @param {string} email - Email address to search for
 * @returns {Promise<Object|null>} User object or null
 * @throws {Error} If database query fails
 */
export const findUserByEmail = async email => {
  try {
    // Query database for user with matching email
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    // Return user or null if not found
    return user || null;
  } catch (e) {
    logger.error(`Error finding user by email: ${e}`);
    throw e;
  }
};
