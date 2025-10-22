/**
 * JWT (JSON Web Token) Utility
 *
 * Provides functions for creating and verifying JWT tokens:
 * - Token signing with secret key
 * - Token verification
 * - Automatic expiration (24 hours)
 *
 * Used for stateless authentication across requests.
 */

import jwt from 'jsonwebtoken';
import logger from '#config/logger.js';

// JWT secret key from environment (MUST be strong in production)
const JWT_SECRET =
  process.env.JWT_SECRET || 'your-secret-key-please-change-in-production';

// Token expiration time (24 hours)
const JWT_EXPIRES_IN = '1d';

/**
 * JWT Token Operations
 *
 * Object containing methods for JWT operations:
 * - sign: Create new JWT token
 * - verify: Validate and decode JWT token
 */
export const jwtToken = {
  /**
   * Sign (Create) JWT Token
   *
   * Creates a new JWT token with the provided payload
   * - Token expires after 24 hours
   * - Signed with JWT_SECRET from environment
   *
   * @param {Object} payload - Data to encode in token (user id, email, role)
   * @returns {string} Signed JWT token
   * @throws {Error} If token creation fails
   *
   * @example
   * const token = jwtToken.sign({ id: 1, email: 'user@example.com', role: 'user' });
   */
  sign: payload => {
    try {
      return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    } catch (e) {
      logger.error('Failed to authenticate token', e);
      throw new Error('Failed to authenticate token');
    }
  },

  /**
   * Verify JWT Token
   *
   * Validates and decodes a JWT token
   * - Checks signature against JWT_SECRET
   * - Checks if token has expired
   * - Returns decoded payload if valid
   *
   * @param {string} token - JWT token to verify
   * @returns {Object} Decoded token payload
   * @throws {Error} If token is invalid or expired
   *
   * @example
   * const payload = jwtToken.verify(token);
   * console.log(payload.email); // Access decoded data
   */
  verify: token => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (e) {
      logger.error('Failed to authenticate token', e);
      throw new Error('Failed to authenticate token');
    }
  },
};
