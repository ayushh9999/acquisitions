/**
 * Cookie Utility
 *
 * Provides secure cookie operations for authentication:
 * - Setting cookies with secure defaults
 * - Clearing cookies
 * - Reading cookies
 *
 * Security features:
 * - HttpOnly: Prevents JavaScript access (XSS protection)
 * - SameSite: Prevents CSRF attacks
 * - Secure: HTTPS only in production
 * - 24-hour expiration
 */

/**
 * Cookie Operations
 *
 * Object containing methods for secure cookie management:
 * - getOptions: Get default secure cookie options
 * - set: Set a cookie with secure defaults
 * - clear: Remove a cookie
 * - get: Read a cookie value
 */
export const cookies = {
  /**
   * Get Cookie Options
   *
   * Returns secure default options for cookies:
   * - httpOnly: true (prevents XSS - JavaScript cannot access)
   * - sameSite: 'strict' (prevents CSRF attacks)
   * - secure: true in production (HTTPS only)
   * - maxAge: 24 hours (1 day)
   *
   * @returns {Object} Cookie options object
   */
  getOptions: () => ({
    httpOnly: true, // Prevent XSS attacks
    sameSite: 'strict', // Prevent CSRF attacks
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  }),

  /**
   * Set Cookie
   *
   * Sets a cookie with secure defaults
   * - Automatically applies security options
   * - Can override options if needed
   *
   * @param {Object} res - Express response object
   * @param {string} name - Cookie name
   * @param {string} value - Cookie value (usually JWT token)
   * @param {Object} options - Optional: Override default options
   *
   * @example
   * cookies.set(res, 'token', jwtToken);
   */
  set: (res, name, value, options = {}) => {
    res.cookie(name, value, { ...cookies.getOptions(), ...options });
  },

  /**
   * Clear Cookie
   *
   * Removes a cookie from the browser
   * - Used during logout
   * - Uses same options to ensure proper clearing
   *
   * @param {Object} res - Express response object
   * @param {string} name - Cookie name to clear
   * @param {Object} options - Optional: Override default options
   *
   * @example
   * cookies.clear(res, 'token');
   */
  clear: (res, name, options = {}) => {
    res.clearCookie(name, { ...cookies.getOptions(), ...options });
  },

  /**
   * Get Cookie
   *
   * Retrieves a cookie value from request
   * - Returns undefined if cookie doesn't exist
   *
   * @param {Object} req - Express request object
   * @param {string} name - Cookie name to retrieve
   * @returns {string|undefined} Cookie value or undefined
   *
   * @example
   * const token = cookies.get(req, 'token');
   */
  get: (req, name) => {
    return req.cookies[name];
  },
};
