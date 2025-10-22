/**
 * Authentication Controller
 *
 * Handles all authentication-related HTTP requests:
 * - User registration (sign-up)
 * - User login (sign-in)
 * - User logout (sign-out)
 *
 * Each function validates input, calls appropriate services,
 * and returns formatted responses.
 */

// Import validation schemas
import { signupSchema, signInSchema } from '#validations/auth.validation.js';

// Import utilities
import { formatValidationError } from '#utils/format.js';
import logger from '#config/logger.js';
import { jwtToken } from '#utils/jwt.js';
import { cookies } from '#utils/cookies.js';

// Import authentication services
import {
  createUser,
  findUserByEmail,
  verifyPassword,
} from '#services/auth.service.js';

/**
 * Sign Up Controller
 *
 * POST /api/auth/sign-up
 *
 * Creates a new user account:
 * 1. Validates input data (name, email, password, role)
 * 2. Creates user in database with hashed password
 * 3. Generates JWT token
 * 4. Sets authentication cookie
 * 5. Returns user data (without password)
 *
 * @param {Object} req.body - { name, email, password, role? }
 * @returns {201} Success - User created
 * @returns {400} Bad Request - Validation failed
 * @returns {409} Conflict - Email already exists
 * @returns {500} Internal Server Error
 */
export const signup = async (req, res, next) => {
  try {
    // Validate request body against schema
    const validationResult = signupSchema.safeParse(req.body);

    // Return error if validation fails
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(validationResult.error),
      });
    }

    // Extract validated data
    const { email, role, name, password } = validationResult.data;

    // Create user in database (password will be hashed)
    const user = await createUser({ email, name, role, password });

    // Generate JWT token with user information
    const token = jwtToken.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Set authentication cookie
    cookies.set(res, 'token', token);

    // Log successful registration
    logger.info(`user registered successfully :${email}`);

    // Return success response
    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (e) {
    // Log error
    logger.error('Signup error', e);

    // Handle duplicate email error
    if (e.message === 'User with this email already exists') {
      return res.status(409).json({ error: 'Email already exist' });
    }

    // Pass other errors to global error handler
    next(e);
  }
};

/**
 * Sign In Controller
 *
 * POST /api/auth/sign-in
 *
 * Authenticates existing user:
 * 1. Validates input data (email, password)
 * 2. Finds user by email
 * 3. Verifies password hash
 * 4. Generates JWT token
 * 5. Sets authentication cookie
 * 6. Returns user data (without password)
 *
 * @param {Object} req.body - { email, password }
 * @returns {200} Success - User authenticated
 * @returns {400} Bad Request - Validation failed
 * @returns {401} Unauthorized - Invalid credentials
 * @returns {500} Internal Server Error
 */
export const signin = async (req, res, next) => {
  try {
    // Validate request body against schema
    const validationResult = signInSchema.safeParse(req.body);

    // Return error if validation fails
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(validationResult.error),
      });
    }

    // Extract validated credentials
    const { email, password } = validationResult.data;

    // Find user by email
    const user = await findUserByEmail(email);

    // Return error if user not found
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password against stored hash
    const isPasswordValid = await verifyPassword(password, user.password);

    // Return error if password is incorrect
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token with user information
    const token = jwtToken.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Set authentication cookie
    cookies.set(res, 'token', token);

    // Log successful sign-in
    logger.info(`User signed in successfully: ${email}`);

    // Return success response
    return res.status(200).json({
      message: 'Signed in successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (e) {
    // Log error
    logger.error('Signin error', e);

    // Pass error to global error handler
    next(e);
  }
};

/**
 * Sign Out Controller
 *
 * POST /api/auth/sign-out
 *
 * Logs out the current user:
 * 1. Clears the authentication cookie
 * 2. Returns success message
 *
 * Note: JWT tokens are stateless, so we can't invalidate them.
 * We rely on cookie expiration and client-side removal.
 *
 * @returns {200} Success - User signed out
 * @returns {500} Internal Server Error
 */
export const signout = async (req, res, next) => {
  try {
    // Clear authentication cookie
    cookies.clear(res, 'token');

    // Log successful sign-out
    logger.info('User signed out successfully');

    // Return success response
    return res.status(200).json({ message: 'Signed out successfully' });
  } catch (e) {
    // Log error
    logger.error('Signout error', e);

    // Pass error to global error handler
    next(e);
  }
};
