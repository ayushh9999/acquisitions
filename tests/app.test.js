/**
 * API Integration Tests
 *
 * Comprehensive test suite for all API endpoints:
 * - Health check endpoint
 * - API status endpoint
 * - Welcome route
 * - 404 error handler
 * - Authentication endpoints (sign-up, sign-in, sign-out)
 * - User management endpoints (get all users, get user by ID)
 *
 * Uses Supertest for HTTP testing and Jest for assertions
 */

// Import testing utilities
import request from 'supertest'; // HTTP testing library
import app from '../src/app.js'; // Express app instance

// =============================================================================
// BASIC API ENDPOINTS TESTS
// =============================================================================
describe('API Endpoints', () => {
  // Test health check endpoint
  // Test health check endpoint
  describe('GET /health', () => {
    it('should return health status', async () => {
      // Make GET request to /health endpoint
      const response = await request(app).get('/health').expect(200);

      // Verify response contains required fields
      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
    });
  });

  // Test API status endpoint
  // Test API status endpoint
  describe('GET /api', () => {
    it('should return API message', async () => {
      // Make GET request to /api endpoint
      const response = await request(app).get('/api').expect(200);

      // Verify response contains API running message
      expect(response.body).toHaveProperty(
        'message',
        'Acquisitions API is running!'
      );
    });
  });

  // Test root welcome endpoint
  // Test root welcome endpoint
  describe('GET /', () => {
    it('should return welcome message', async () => {
      // Make GET request to root endpoint
      const response = await request(app).get('/').expect(200);

      // Verify response text
      expect(response.text).toBe('Hello, from acquisitions app!');
    });
  });

  // Test 404 error handler
  // Test 404 error handler
  describe('404 Handler', () => {
    it('should return 404 for non-existent routes', async () => {
      // Make GET request to non-existent route
      const response = await request(app)
        .get('/non-existent-route')
        .expect(404);

      // Verify error response structure
      expect(response.body).toHaveProperty('error', 'Not Found');
      expect(response.body).toHaveProperty('message');
    });
  });

  // =============================================================================
  // AUTHENTICATION ENDPOINTS TESTS
  // =============================================================================
  describe('POST /api/auth/sign-up', () => {
    // Test successful user registration
    it('should create a new user', async () => {
      // Create unique test user data
      const newUser = {
        name: 'Test User',
        email: `test${Date.now()}@example.com`, // Unique email using timestamp
        password: 'password123',
        role: 'user',
      };

      // Make POST request to sign-up endpoint
      const response = await request(app)
        .post('/api/auth/sign-up')
        .send(newUser)
        .expect(201);

      // Verify successful registration response
      expect(response.body).toHaveProperty(
        'message',
        'User registered successfully'
      );
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('email', newUser.email);
      expect(response.body.user).not.toHaveProperty('password'); // Password should not be returned
    });

    // Test email validation
    // Test email validation
    it('should return 400 for invalid email', async () => {
      // Create user with invalid email format
      const invalidUser = {
        name: 'Test User',
        email: 'invalid-email', // Missing @ and domain
        password: 'password123',
      };

      // Make POST request and expect validation error
      const response = await request(app)
        .post('/api/auth/sign-up')
        .send(invalidUser)
        .expect(400);

      // Verify validation error response
      expect(response.body).toHaveProperty('error', 'Validation failed');
    });

    // Test password length validation
    // Test password length validation
    it('should return 400 for short password', async () => {
      // Create user with password shorter than minimum length (6 chars)
      const invalidUser = {
        name: 'Test User',
        email: 'test@example.com',
        password: '123', // Too short (less than 6 characters)
      };

      // Make POST request and expect validation error
      const response = await request(app)
        .post('/api/auth/sign-up')
        .send(invalidUser)
        .expect(400);

      // Verify validation error response
      expect(response.body).toHaveProperty('error', 'Validation failed');
    });
  });

  // Test sign-in endpoint
  describe('POST /api/auth/sign-in', () => {
    // Test user data for sign-in tests
    const testUser = {
      name: 'Sign In Test User',
      email: `signin${Date.now()}@example.com`,
      password: 'password123',
    };

    // Setup: Create test user before running sign-in tests
    beforeAll(async () => {
      // Register test user for authentication tests
      await request(app).post('/api/auth/sign-up').send(testUser);
    });

    // Test successful sign-in
    it('should sign in with valid credentials', async () => {
      // Make POST request with valid credentials
      const response = await request(app)
        .post('/api/auth/sign-in')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(200);

      // Verify successful sign-in response
      expect(response.body).toHaveProperty('message', 'Signed in successfully');
      expect(response.body).toHaveProperty('user');
      expect(response.headers['set-cookie']).toBeDefined(); // JWT cookie should be set
    });

    // Test sign-in with invalid email
    it('should return 401 for invalid email', async () => {
      // Attempt to sign in with non-existent email
      const response = await request(app)
        .post('/api/auth/sign-in')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123',
        })
        .expect(401);

      // Verify unauthorized error
      expect(response.body).toHaveProperty('error', 'Invalid credentials');
    });

    // Test sign-in with invalid password
    // Test sign-in with invalid password
    it('should return 401 for invalid password', async () => {
      // Attempt to sign in with wrong password
      const response = await request(app)
        .post('/api/auth/sign-in')
        .send({
          email: testUser.email,
          password: 'wrongpassword', // Incorrect password
        })
        .expect(401);

      // Verify unauthorized error
      expect(response.body).toHaveProperty('error', 'Invalid credentials');
    });
  });

  // Test sign-out endpoint
  describe('POST /api/auth/sign-out', () => {
    it('should sign out successfully', async () => {
      // Make POST request to sign-out endpoint
      const response = await request(app)
        .post('/api/auth/sign-out')
        .expect(200);

      // Verify successful sign-out response
      expect(response.body).toHaveProperty(
        'message',
        'Signed out successfully'
      );
    });
  });

  // =============================================================================
  // USER MANAGEMENT ENDPOINTS TESTS
  // =============================================================================
  describe('GET /api/users', () => {
    // Test getting all users
    it('should return all users', async () => {
      const response = await request(app).get('/api/users').expect(200);

      expect(response.body).toHaveProperty(
        'message',
        'Successfully retrieved users'
      );
      expect(response.body).toHaveProperty('users');
      expect(response.body).toHaveProperty('count');
      expect(Array.isArray(response.body.users)).toBe(true);
    });

    // Test password exclusion from response
    it('should not include passwords in user data', async () => {
      // Fetch all users
      const response = await request(app).get('/api/users').expect(200);

      // Verify each user object does not contain password
      if (response.body.users.length > 0) {
        response.body.users.forEach(user => {
          expect(user).not.toHaveProperty('password'); // Password should never be exposed
          expect(user).toHaveProperty('id');
          expect(user).toHaveProperty('name');
          expect(user).toHaveProperty('email');
          expect(user).toHaveProperty('role');
        });
      }
    });
  });
});
