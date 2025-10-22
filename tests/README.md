# Testing Guide

This directory contains all the test files for the Acquisitions API.

## Test Structure

```
tests/
└── app.test.js          # API endpoint tests
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test app.test.js
```

## Test Coverage

The test suite covers:

### Health & Info Endpoints

- ✅ `GET /health` - Health check endpoint
- ✅ `GET /api` - API info endpoint
- ✅ `GET /` - Welcome message

### Authentication Endpoints

- ✅ `POST /api/auth/sign-up` - User registration
  - Valid user creation
  - Email validation
  - Password validation
- ✅ `POST /api/auth/sign-in` - User login
  - Valid credentials
  - Invalid email
  - Invalid password
- ✅ `POST /api/auth/sign-out` - User logout

### User Management Endpoints

- ✅ `GET /api/users` - Get all users
  - Returns user list
  - Excludes passwords

### Error Handling

- ✅ 404 handler for non-existent routes

## Test Database

Tests use the same database configuration as development. Make sure your `.env` file has:

```env
DATABASE_URL=your_test_database_url
```

**Recommendation**: Use a separate test database to avoid affecting development data.

## Writing New Tests

### Basic Structure

```javascript
import request from 'supertest';
import app from '../src/app.js';

describe('Feature Name', () => {
  describe('Endpoint Description', () => {
    it('should do something', async () => {
      const response = await request(app).get('/your-endpoint').expect(200);

      expect(response.body).toHaveProperty('expectedField');
    });
  });
});
```

### Best Practices

1. **Use descriptive test names** - Clearly state what's being tested
2. **Test both success and failure cases** - Cover happy path and edge cases
3. **Clean up test data** - Use `beforeAll`, `afterAll`, `beforeEach`, `afterEach`
4. **Mock external dependencies** - Don't rely on external APIs
5. **Keep tests isolated** - Each test should be independent
6. **Use meaningful assertions** - Test what matters

### Available Matchers

```javascript
expect(value).toBe(expected); // Strict equality
expect(value).toEqual(expected); // Deep equality
expect(value).toHaveProperty('key'); // Has property
expect(value).toHaveProperty('key', value); // Has property with value
expect(array).toContain(item); // Array contains
expect(string).toMatch(/pattern/); // String matches regex
expect(fn).toThrow(); // Function throws
expect(value).toBeDefined(); // Not undefined
expect(value).toBeNull(); // Is null
expect(value).toBeTruthy(); // Truthy value
expect(value).toBeFalsy(); // Falsy value
```

## Supertest API

```javascript
import request from 'supertest';
import app from '../src/app.js';

// GET request
await request(app).get('/endpoint').expect(200);

// POST request with body
await request(app).post('/endpoint').send({ key: 'value' }).expect(201);

// With headers
await request(app)
  .get('/endpoint')
  .set('Authorization', 'Bearer token')
  .expect(200);

// With cookies
await request(app).get('/endpoint').set('Cookie', 'token=value').expect(200);

// Check response
const response = await request(app).get('/endpoint');
expect(response.status).toBe(200);
expect(response.body).toHaveProperty('data');
expect(response.headers['content-type']).toMatch(/json/);
```

## Continuous Integration

Tests are automatically run in CI/CD pipelines. Make sure:

- All tests pass before merging
- Coverage meets minimum threshold
- No skipped tests in main branch

## Troubleshooting

### Tests Failing Locally

```bash
# Clear Jest cache
npm test -- --clearCache

# Run with verbose output
npm test -- --verbose

# Debug specific test
npm test -- --testNamePattern="test name"
```

### Database Connection Issues

Make sure:

1. Database is running
2. `DATABASE_URL` is correct in `.env`
3. Migrations are up to date: `npm run db:migrate`

### Port Already in Use

If you see "Port already in use" error:

- Stop any running server instances
- Tests use supertest which doesn't require a running server

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Testing Best Practices](https://testingjavascript.com/)
