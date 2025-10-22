# 🤝 Contributing to Acquisitions API

First off, thank you for considering contributing to Acquisitions API! 🎉

It's people like you that make this project such a great tool. We welcome contributions from everyone, whether you're fixing a typo, adding new features, or reporting bugs.

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Getting Started](#-getting-started)
- [How Can I Contribute?](#-how-can-i-contribute)
- [Development Setup](#-development-setup)
- [Coding Standards](#-coding-standards)
- [Commit Guidelines](#-commit-guidelines)
- [Pull Request Process](#-pull-request-process)
- [Community](#-community)

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please be respectful and welcoming to all contributors.

### Our Standards

- ✅ Using welcoming and inclusive language
- ✅ Being respectful of differing viewpoints
- ✅ Gracefully accepting constructive criticism
- ✅ Focusing on what is best for the community
- ❌ Trolling, insulting/derogatory comments
- ❌ Public or private harassment
- ❌ Publishing others' private information

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

- Node.js v20 or higher
- npm v9 or higher
- Git
- A GitHub account

### First Time Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

   ```bash
   git clone https://github.com/YOUR_USERNAME/acquisitions.git
   cd acquisitions
   ```

3. **Add upstream remote**:

   ```bash
   git remote add upstream https://github.com/ayushh9999/acquisitions.git
   ```

4. **Install dependencies**:

   ```bash
   npm install
   ```

5. **Setup environment**:

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

6. **Run migrations**:

   ```bash
   npm run db:migrate
   ```

7. **Start development server**:
   ```bash
   npm run dev
   ```

---

## 💡 How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

**How to Report a Bug:**

1. Go to [Issues](https://github.com/ayushh9999/acquisitions/issues)
2. Click "New Issue"
3. Choose "Bug Report" template
4. Fill in all required information:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node version, etc.)
   - Screenshots if applicable

### ✨ Suggesting Features

We love new ideas! Here's how to suggest features:

1. Check if the feature has already been suggested
2. Create a new issue with "Feature Request" template
3. Provide:
   - Clear description of the feature
   - Use case and benefits
   - Possible implementation approach
   - Any relevant examples

### 📝 Improving Documentation

Documentation improvements are always welcome:

- Fix typos or grammatical errors
- Add examples or clarifications
- Update outdated information
- Add missing sections
- Translate documentation

### 💻 Contributing Code

Ready to contribute code? Awesome!

**Areas You Can Help:**

- Fixing bugs from issues
- Adding new features
- Writing tests
- Improving error handling
- Optimizing performance
- Refactoring code

---

## 🛠️ Development Setup

### Branch Strategy

We use the following branch structure:

- `main` - Production-ready code
- `staging` - Pre-production testing
- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates

### Creating a Feature Branch

```bash
# Update your local main branch
git checkout main
git pull upstream main

# Create and checkout new branch
git checkout -b feature/your-feature-name
```

### Making Changes

1. **Make your changes** in your feature branch
2. **Follow coding standards** (see below)
3. **Add tests** for new functionality
4. **Update documentation** if needed
5. **Test thoroughly**:
   ```bash
   npm test
   npm run lint
   npm run format
   ```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- tests/app.test.js
```

### Linting and Formatting

```bash
# Check for linting errors
npm run lint

# Fix linting errors automatically
npm run lint:fix

# Format code with Prettier
npm run format

# Check if code is formatted
npm run format:check
```

---

## 📏 Coding Standards

### Code Style

- ✅ Use ES6+ features
- ✅ Use async/await over callbacks
- ✅ Use meaningful variable names
- ✅ Keep functions small and focused
- ✅ Add JSDoc comments for functions
- ✅ Use proper error handling
- ✅ Follow DRY principle

### Example Good Code

```javascript
/**
 * Authenticate user and generate JWT token
 *
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<Object>} User object and token
 * @throws {Error} If credentials are invalid
 */
async function authenticateUser(email, password) {
  // Find user by email
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Verify password
  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  // Generate token
  const token = generateJWT({ id: user.id, email: user.email });

  return { user, token };
}
```

### File Structure

- Place files in appropriate directories:
  - `controllers/` - Request handlers
  - `services/` - Business logic
  - `models/` - Database schemas
  - `utils/` - Helper functions
  - `middleware/` - Express middleware
  - `validations/` - Input validation schemas

### Naming Conventions

- **Files**: `kebab-case.js` (e.g., `auth.controller.js`)
- **Variables/Functions**: `camelCase` (e.g., `getUserById`)
- **Classes**: `PascalCase` (e.g., `UserService`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_ATTEMPTS`)

### Error Handling

```javascript
// ✅ Good: Proper error handling
try {
  const result = await someAsyncOperation();
  return result;
} catch (error) {
  logger.error('Operation failed:', error);
  throw new Error('Failed to complete operation');
}

// ❌ Bad: Silent failures
try {
  await someAsyncOperation();
} catch (error) {
  // Silent failure
}
```

---

## 📝 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Commit Types

| Type       | Description      | Example                                        |
| ---------- | ---------------- | ---------------------------------------------- |
| `feat`     | New feature      | `feat(auth): add password reset endpoint`      |
| `fix`      | Bug fix          | `fix(validation): correct email regex pattern` |
| `docs`     | Documentation    | `docs(readme): update installation steps`      |
| `style`    | Formatting       | `style(lint): fix ESLint warnings`             |
| `refactor` | Code refactoring | `refactor(services): simplify user service`    |
| `test`     | Tests            | `test(auth): add sign-up validation tests`     |
| `chore`    | Maintenance      | `chore(deps): update dependencies`             |
| `perf`     | Performance      | `perf(db): optimize user queries`              |

### Examples

```bash
# Feature
git commit -m "feat(users): add user profile endpoint"

# Bug fix
git commit -m "fix(auth): resolve JWT expiration issue"

# Documentation
git commit -m "docs(api): add authentication examples"

# Multi-line commit
git commit -m "feat(rate-limit): implement custom rate limiting

- Add configurable rate limits per endpoint
- Integrate with Arcjet protection
- Add rate limit headers to responses

Closes #42"
```

### Commit Best Practices

- ✅ Write clear, concise commit messages
- ✅ Use present tense ("add feature" not "added feature")
- ✅ Keep first line under 72 characters
- ✅ Reference issues in footer (`Closes #123`)
- ✅ Make atomic commits (one logical change per commit)

---

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] All tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Code is formatted (`npm run format`)
- [ ] Documentation is updated
- [ ] Commit messages follow conventions
- [ ] Branch is up to date with main

### Submitting a Pull Request

1. **Push your changes** to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request** on GitHub:
   - Go to original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in PR template

3. **PR Description Should Include**:
   - Clear description of changes
   - Motivation and context
   - List of changes made
   - Screenshots (if UI changes)
   - Related issue numbers
   - Testing instructions

### PR Title Format

Use same format as commit messages:

```
feat(auth): add OAuth2 integration
fix(validation): correct password validation
docs(api): update endpoint documentation
```

### Example PR Description

```markdown
## Description

Add password reset functionality to allow users to recover their accounts.

## Motivation

Users frequently request password reset feature when they forget credentials.

## Changes Made

- Added password reset endpoint
- Implemented email verification
- Added reset token generation
- Updated user model with reset token fields
- Added comprehensive tests

## Testing

1. Request password reset: `POST /api/auth/forgot-password`
2. Check email for reset link
3. Submit new password: `POST /api/auth/reset-password`
4. Verify login with new password

## Related Issues

Closes #123
Related to #124

## Screenshots

![Password Reset Flow](screenshot.png)
```

### Review Process

1. **Automated Checks**: CI/CD runs automatically
   - Linting and formatting
   - Test suite
   - Docker build

2. **Code Review**: Maintainers will review your code
   - Address review comments
   - Make requested changes
   - Push updates to same branch

3. **Approval**: Once approved, PR will be merged

### After Merge

- [ ] Delete your feature branch
- [ ] Update your local main branch
- [ ] Close related issues

---

## 🌟 Recognition

Contributors will be recognized in:

- Project README
- Release notes
- Contributors page

---

## 💬 Community

### Getting Help

- 💬 **Discussions**: [GitHub Discussions](https://github.com/ayushh9999/acquisitions/discussions)
- 🐛 **Issues**: [GitHub Issues](https://github.com/ayushh9999/acquisitions/issues)
- 📧 **Email**: Open an issue for sensitive matters

### Stay Updated

- ⭐ **Star** the repository
- 👀 **Watch** for updates
- 🔔 **Subscribe** to release notifications

---

## 📚 Additional Resources

- [Project README](./README.md)
- [Docker Setup Guide](./DOCKER_SETUP.md)
- [API Documentation](./README.md#-api-documentation)
- [Testing Guide](./tests/README.md)

---

<div align="center">

**Thank you for contributing! 🎉**

Every contribution, no matter how small, is valued and appreciated.

Built with ❤️ by the community

</div>
