/**
 * ESLint Configuration
 *
 * Configures code quality rules for the project:
 * - Extends recommended JavaScript rules
 * - Integrates Prettier for formatting
 * - Defines global variables for Node.js environment
 * - Custom rules for code quality
 * - Separate configuration for test files (Jest)
 *
 * Uses ESLint flat config format (modern approach)
 */

// Import ESLint configurations and plugins
import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  // Apply recommended JavaScript rules
  js.configs.recommended,

  // Disable rules that conflict with Prettier
  prettierConfig,

  // Main configuration for all JavaScript files
  {
    // Enable Prettier plugin
    plugins: {
      prettier: prettierPlugin,
    },

    // Language settings
    languageOptions: {
      ecmaVersion: 2022, // Use ES2022 features
      sourceType: 'module', // Enable ES modules (import/export)

      // Define global variables available in Node.js
      globals: {
        console: 'readonly', // Console object
        process: 'readonly', // Process object (Node.js)
        Buffer: 'readonly', // Buffer class (Node.js)
        __dirname: 'readonly', // Current directory path
        __filename: 'readonly', // Current file path
        URL: 'readonly', // URL constructor
        setTimeout: 'readonly', // Timer functions
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
      },
    },

    // Custom linting rules
    rules: {
      // Allow console statements (needed for logging)
      'no-console': 'off',

      // Error on unused variables (with exceptions)
      'no-unused-vars': [
        'error',
        {
          vars: 'all', // Check all variables
          args: 'after-used', // Check arguments after they're used
          ignoreRestSiblings: false, // Don't ignore rest siblings
        },
      ],

      // Disallow 'var' keyword (use 'let' or 'const')
      'no-var': 'error',

      // Prefer 'const' over 'let' when possible
      'prefer-const': 'error',
    },
  },

  // =============================================================================
  // TEST FILES CONFIGURATION
  // =============================================================================
  // Separate configuration for Jest test files
  {
    // Apply to test files only
    files: ['**/*.test.js', '**/*.spec.js', 'tests/**/*.js'],

    // Define Jest-specific global functions
    languageOptions: {
      globals: {
        describe: 'readonly', // Test suite declaration
        it: 'readonly', // Test case declaration (alias for test)
        test: 'readonly', // Test case declaration
        expect: 'readonly', // Assertion function
        beforeAll: 'readonly', // Setup before all tests in suite
        beforeEach: 'readonly', // Setup before each test
        afterAll: 'readonly', // Cleanup after all tests in suite
        afterEach: 'readonly', // Cleanup after each test
        jest: 'readonly', // Jest object (mocking, timers, etc.)
      },
    },
  },
];
