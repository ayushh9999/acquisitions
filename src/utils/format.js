/**
 * Format Utility
 *
 * Provides formatting functions for API responses:
 * - Validation error formatting (for Zod errors)
 * - Converts technical errors to user-friendly messages
 *
 * Used by controllers to format error responses.
 */

/**
 * Format Validation Error
 *
 * Converts Zod validation errors into a readable string:
 * - Extracts all error messages
 * - Joins them with commas
 * - Returns user-friendly error description
 *
 * @param {Object} errors - Zod error object
 * @returns {string} Formatted error message
 *
 * @example
 * Input: { issues: [{ message: 'Email is required' }, { message: 'Password too short' }] }
 * Output: 'Email is required, Password too short'
 */
export const formatValidationError = errors => {
  // Return default message if no errors object
  if (!errors || !errors.issues) return 'Validation failed';

  // Extract and join error messages
  if (Array.isArray(errors.issues))
    return errors.issues.map(i => i.message).join(', ');

  // Fallback: stringify entire error object
  return JSON.stringify(errors);
};
