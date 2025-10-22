/**
 * Arcjet Security Configuration
 *
 * Arcjet provides comprehensive security protection:
 * 1. Shield: Protects against common attacks (SQL injection, XSS, etc.)
 * 2. Bot Detection: Blocks malicious bots while allowing legitimate ones
 * 3. Rate Limiting: Prevents API abuse with token bucket algorithm
 *
 * Documentation: https://docs.arcjet.com
 */

import arcjet, { shield, detectBot, tokenBucket } from '@arcjet/node';

/**
 * Initialize Arcjet with security rules
 * API key is loaded from environment variables (ARCJET_KEY)
 */
const aj = arcjet({
  // API key from environment (get it from https://app.arcjet.com)
  key: process.env.ARCJET_KEY,

  rules: [
    /**
     * Shield Protection
     * Protects against common web attacks:
     * - SQL injection
     * - Cross-site scripting (XSS)
     * - Path traversal
     * - Command injection
     */
    shield({ mode: 'LIVE' }),

    /**
     * Bot Detection
     * Blocks automated bots while allowing legitimate traffic
     * - Allows search engine crawlers (Google, Bing, etc.)
     * - Blocks malicious bots and scrapers
     * - Uses fingerprinting to identify bot behavior
     */
    detectBot({
      mode: 'LIVE', // LIVE = blocks bots, DRY_RUN = logs only

      // Allow specific bot categories
      allow: [
        'CATEGORY:SEARCH_ENGINE', // Google, Bing, DuckDuckGo, etc.

        // Uncomment to allow additional categories:
        // 'CATEGORY:MONITOR',  // Uptime monitoring (Pingdom, UptimeRobot)
        // 'CATEGORY:PREVIEW',  // Link previews (Slack, Discord, Twitter)
      ],
    }),

    /**
     * Rate Limiting (Token Bucket Algorithm)
     * Prevents API abuse by limiting request frequency
     * - Each request consumes 1 token
     * - Tokens refill over time
     * - Exceeded capacity = request denied
     */
    tokenBucket({
      mode: 'LIVE',

      // Rate limiting parameters
      refillRate: 5, // Add 5 tokens per interval
      interval: 10, // Every 10 seconds
      capacity: 10, // Maximum 10 tokens in bucket

      // Tracked by IP address (can be customized)
      // characteristics: ["ip.src"], // Track by IP
      // characteristics: ["userId"], // Track by user ID
    }),
  ],
});

// Export Arcjet instance
export default aj;
