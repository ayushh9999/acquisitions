# GitHub Actions Workflows

This directory contains automated CI/CD workflows for the Acquisitions API.

## Available Workflows

### 🔍 Lint and Format

**File:** `lint-and-format.yml`

Ensures code quality and consistent formatting across the codebase.

- **Triggers:** Push/PR to `main` or `staging`
- **Checks:** ESLint, Prettier
- **Auto-fix suggestions:** Yes
- **Artifacts:** Lint results (7 days)

### 🧪 Tests

**File:** `tests.yml`

Runs automated tests with coverage reporting.

- **Triggers:** Push/PR to `main` or `staging`
- **Environment:** Node.js 20.x, PostgreSQL 16
- **Coverage:** Uploaded for 30 days
- **PR Comments:** Automatic test results

### 🐳 Docker Build and Push

**File:** `docker-build-and-push.yml`

Builds and publishes multi-platform Docker images.

- **Triggers:** Push to `main`, Manual dispatch
- **Platforms:** linux/amd64, linux/arm64
- **Registry:** Docker Hub
- **Security:** Trivy vulnerability scanning

## Quick Setup

### 1. Required Secrets

Add these secrets in **Settings → Secrets and variables → Actions**:

| Secret            | Description              |
| ----------------- | ------------------------ |
| `DOCKER_USERNAME` | Your Docker Hub username |
| `DOCKER_PASSWORD` | Docker Hub access token  |

### 2. Enable Workflows

Workflows are automatically enabled when pushed to GitHub. Check the **Actions** tab to see them.

### 3. Branch Protection (Recommended)

Protect your `main` branch by requiring these status checks:

- ✅ Code Quality Check
- ✅ Run Tests

**Settings → Branches → Add rule**

## Workflow Status

Check the status of all workflows:

[![Lint and Format](https://github.com/ayushh9999/acquisitions/actions/workflows/lint-and-format.yml/badge.svg)](https://github.com/ayushh9999/acquisitions/actions/workflows/lint-and-format.yml)
[![Tests](https://github.com/ayushh9999/acquisitions/actions/workflows/tests.yml/badge.svg)](https://github.com/ayushh9999/acquisitions/actions/workflows/tests.yml)
[![Docker Build](https://github.com/ayushh9999/acquisitions/actions/workflows/docker-build-and-push.yml/badge.svg)](https://github.com/ayushh9999/acquisitions/actions/workflows/docker-build-and-push.yml)

## Local Testing

Before pushing, test locally to avoid CI failures:

```bash
# Check linting
npm run lint

# Check formatting
npm run format:check

# Run tests
npm test

# Build Docker image
docker build -t acquisitions:test .
```

## Documentation

For detailed information about each workflow, see [CI_CD_GUIDE.md](./CI_CD_GUIDE.md)

## Troubleshooting

### Workflow doesn't trigger

- Check branch name (must be `main` or `staging`)
- Verify YAML syntax
- Ensure Actions are enabled in repository settings

### Tests fail in CI

- Compare Node.js versions (should be 20.x)
- Check environment variables
- Review database connection settings

### Docker build fails

- Verify Docker Hub credentials
- Check `DOCKER_USERNAME` and `DOCKER_PASSWORD` secrets
- Review Dockerfile syntax

For more help, see the [CI_CD_GUIDE.md](./CI_CD_GUIDE.md) troubleshooting section.

## Contributing

When adding new workflows:

1. Place `.yml` files in `.github/workflows/`
2. Test locally with `act` (GitHub Actions local simulator)
3. Document the workflow in `CI_CD_GUIDE.md`
4. Add status badge to README.md

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [Docker Build Push Action](https://github.com/docker/build-push-action)
