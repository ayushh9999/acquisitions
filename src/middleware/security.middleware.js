/**
 * Security Middleware
 *
 * Applies Arcjet security protection to all requests:
 * - Bot detection (blocks malicious bots)
 * - Shield protection (blocks common attacks)
 * - Role-based rate limiting (prevents API abuse)
 *
 * Rate limits by user role:
 * - Admin: 20 requests per minute
 * - User:  10 requests per minute
 * - Guest: 5 requests per minute
 */

// Import Arcjet instance and utilities
import aj from '#config/arcjet.js';
import logger from '#config/logger.js';
import { slidingWindow } from '@arcjet/node';

/**
 * Security Middleware Function
 *
 * Protects all routes with Arcjet security:
 * 1. Determines user role (admin, user, or guest)
 * 2. Applies role-based rate limiting
 * 3. Checks for bots, attacks, and rate limit violations
 * 4. Blocks or allows request based on decision
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
const securityMiddleware = async (req, res, next) => {
  try {
    // Get user role from request (default to 'guest' if not authenticated)
    const role = req.user?.role || 'guest';

    // Set rate limit based on user role
    let limit;
    switch (role) {
      case 'admin':
        limit = 20; // Admins get higher limit
        break;
      case 'user':
        limit = 10; // Regular users get standard limit
        break;
      case 'guest':
        limit = 5; // Guests get lowest limit
        break;
    }

    // Create Arcjet client with sliding window rate limit
    const client = aj.withRule(
      slidingWindow({
        mode: 'LIVE', // Block requests (use DRY_RUN for logging only)
        interval: '1m', // Time window: 1 minute
        max: limit, // Maximum requests in window
        name: `${role}-rate-limit`, // Rule name for tracking
      })
    );

    // Check request against Arcjet rules
    const decision = await client.protect(req);

    // ==========================================================================
    // BOT DETECTION
    // ==========================================================================
    // Block if request is from a malicious bot
    if (decision.isDenied() && decision.reason.isBot()) {
      logger.warn('Bot request blocked', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.path,
      });

      return res.status(403).json({
        error: 'Forbidden',
        message: 'Automated requests are not allowed',
      });
    }

    // ==========================================================================
    // SHIELD PROTECTION
    // ==========================================================================
    // Block if request contains malicious patterns (SQL injection, XSS, etc.)
    if (decision.isDenied() && decision.reason.isShield()) {
      logger.warn('Shield request blocked', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.path,
        method: req.method,
      });

      return res.status(403).json({
        error: 'Forbidden',
        message: 'Automated requests are not allowed',
      });
    }

    // ==========================================================================
    // RATE LIMITING
    // ==========================================================================
    // Block if user has exceeded rate limit
    if (decision.isDenied() && decision.reason.isRateLimit()) {
      logger.warn('Rate limit exceeded', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.path,
      });

      return res
        .status(429)
        .json({ error: 'Too Many Requests', message: 'Rate limit exceeded' });
    }

    // Request passed all security checks - continue to next middleware
    next();
  } catch (e) {
    // Log error and return 500 if middleware fails
    console.error('Arcjet middleware error:', e);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong with security middleware',
    });
  }
};

// Export middleware
export default securityMiddleware;
