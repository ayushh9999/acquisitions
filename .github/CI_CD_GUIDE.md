# CI/CD Pipeline Documentation

Complete guide for the GitHub Actions CI/CD pipelines implemented for the Acquisitions API.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Workflows](#workflows)
3. [Required Secrets](#required-secrets)
4. [Setup Instructions](#setup-instructions)
5. [Workflow Details](#workflow-details)
6. [Troubleshooting](#troubleshooting)
7. [Best Practices](#best-practices)

---

## Overview

This project uses GitHub Actions for automated CI/CD pipelines. Three main workflows handle code quality, testing, and deployment:

| Workflow                | Trigger                 | Purpose                         |
| ----------------------- | ----------------------- | ------------------------------- |
| **Lint and Format**     | Push/PR to main/staging | Code quality checks             |
| **Tests**               | Push/PR to main/staging | Run tests with coverage         |
| **Docker Build & Push** | Push to main, Manual    | Build and publish Docker images |

---

## Workflows

### 1. Lint and Format (`lint-and-format.yml`)

**Triggers:**

- Push to `main` or `staging` branches
- Pull requests to `main` or `staging` branches

**Steps:**

1. ✅ Checkout code
2. ✅ Setup Node.js 20.x with npm caching
3. ✅ Install dependencies with `npm ci`
4. ✅ Run ESLint (`npm run lint`)
5. ✅ Run Prettier check (`npm run format:check`)
6. ✅ Generate GitHub step summary
7. ✅ Create annotations for failures
8. ✅ Upload lint results as artifacts

**Success Criteria:**

- No ESLint errors
- All files properly formatted with Prettier

**On Failure:**

- Provides clear error annotations
- Suggests fix commands: `npm run lint:fix` and `npm run format`
- Uploads detailed error logs

---

### 2. Tests (`tests.yml`)

**Triggers:**

- Push to `main` or `staging` branches
- Pull requests to `main` or `staging` branches

**Environment:**

```yaml
NODE_ENV: test
NODE_OPTIONS: --experimental-vm-modules
DATABASE_URL: postgresql://test_user:test_password@localhost:5432/test_db
JWT_SECRET: test_jwt_secret_for_ci_cd_pipeline_testing_only
ARCJET_KEY: test_arcjet_key
```

**Services:**

- PostgreSQL 16 (alpine) running on port 5432

**Steps:**

1. ✅ Checkout code
2. ✅ Setup Node.js 20.x with npm caching
3. ✅ Start PostgreSQL service
4. ✅ Install dependencies with `npm ci`
5. ✅ Wait for PostgreSQL to be ready
6. ✅ Run database migrations
7. ✅ Run tests with coverage (`npm test -- --coverage`)
8. ✅ Generate coverage summary
9. ✅ Upload coverage reports (30 days retention)
10. ✅ Create PR comment with results
11. ✅ Create annotations for failures

**Artifacts:**

- Coverage reports (HTML, JSON, LCOV)
- Test output logs
- Retention: 30 days

**Success Criteria:**

- All tests pass
- Coverage reports generated successfully

---

### 3. Docker Build and Push (`docker-build-and-push.yml`)

**Triggers:**

- Push to `main` branch (automatic)
- Manual trigger via `workflow_dispatch`

**Manual Trigger Options:**

- `tag_suffix`: Optional custom tag suffix

**Platforms:**

- `linux/amd64` (Intel/AMD 64-bit)
- `linux/arm64` (ARM 64-bit, Apple Silicon, ARM servers)

**Steps:**

1. ✅ Checkout code
2. ✅ Setup QEMU for multi-platform builds
3. ✅ Setup Docker Buildx
4. ✅ Login to Docker Hub
5. ✅ Extract metadata (tags, labels)
6. ✅ Build production Docker image
7. ✅ Push to Docker Hub with caching
8. ✅ Generate deployment summary
9. ✅ Scan image with Trivy (security)
10. ✅ Upload security scan results

**Generated Tags:**

```
{DOCKER_USERNAME}/acquisitions:latest
{DOCKER_USERNAME}/acquisitions:main
{DOCKER_USERNAME}/acquisitions:main-{SHORT_SHA}
{DOCKER_USERNAME}/acquisitions:prod-YYYYMMDD-HHmmss
```

**Image Labels:**

- `org.opencontainers.image.title`
- `org.opencontainers.image.description`
- `org.opencontainers.image.vendor`
- `org.opencontainers.image.authors`
- Build date, VCS reference, version

**Caching:**

- Layer caching enabled for faster builds
- Cache stored in Docker Hub registry

---

## Required Secrets

Configure these secrets in **Repository Settings → Secrets and variables → Actions**:

### Docker Hub Credentials

| Secret            | Description             | Example           |
| ----------------- | ----------------------- | ----------------- |
| `DOCKER_USERNAME` | Docker Hub username     | `yourusername`    |
| `DOCKER_PASSWORD` | Docker Hub access token | `dckr_pat_xxx...` |

### How to Get Docker Hub Token:

1. Go to [Docker Hub](https://hub.docker.com/)
2. Click your profile → **Account Settings**
3. Click **Security** → **New Access Token**
4. Name: `github-actions`
5. Permissions: **Read, Write, Delete**
6. Copy the token (you won't see it again!)

---

## Setup Instructions

### 1. Initial Setup

```bash
# Clone your repository
git clone https://github.com/ayushh9999/acquisitions.git
cd acquisitions

# Ensure .github/workflows directory exists
ls .github/workflows/

# You should see:
# - lint-and-format.yml
# - tests.yml
# - docker-build-and-push.yml
```

### 2. Configure GitHub Secrets

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add `DOCKER_USERNAME` and `DOCKER_PASSWORD`

### 3. Enable GitHub Actions

1. Go to **Actions** tab in your repository
2. If prompted, click **I understand my workflows, go ahead and enable them**
3. Workflows will now run automatically on push/PR

### 4. Test the Workflows

**Test Lint Workflow:**

```bash
# Make a small change and push
git checkout -b test-ci
echo "// test comment" >> src/app.js
git add src/app.js
git commit -m "test: CI/CD pipeline"
git push origin test-ci

# Create a PR on GitHub
# Watch the workflows run!
```

**Test Docker Build (Manual):**

1. Go to **Actions** tab
2. Click **Docker Build and Push**
3. Click **Run workflow**
4. Select branch: `main`
5. Click **Run workflow**

---

## Workflow Details

### Lint and Format Workflow

**Configuration:**

```yaml
on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main, staging]
```

**Node Setup:**

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20.x'
    cache: 'npm'
```

**Error Handling:**

- Captures ESLint output to file
- Captures Prettier output to file
- Creates GitHub annotations
- Provides fix suggestions
- Fails workflow if issues found

**GitHub Summary Example:**

```
## ❌ ESLint Failed

ESLint found issues in your code.

### How to fix:
npm run lint:fix

### Issues found:
src/app.js
  10:5  error  'unusedVar' is defined but never used  no-unused-vars
```

---

### Tests Workflow

**PostgreSQL Service:**

```yaml
services:
  postgres:
    image: postgres:16-alpine
    env:
      POSTGRES_USER: test_user
      POSTGRES_PASSWORD: test_password
      POSTGRES_DB: test_db
    ports:
      - 5432:5432
    options: >-
      --health-cmd pg_isready
      --health-interval 10s
      --health-timeout 5s
      --health-retries 5
```

**Test Execution:**

```bash
npm test -- --coverage --verbose
```

**Coverage Report:**

```
| Metric     | Coverage |
|------------|----------|
| Statements | 85.5%    |
| Branches   | 78.2%    |
| Functions  | 90.1%    |
| Lines      | 84.8%    |
```

**PR Comment Example:**

```
## 🧪 Test Results

✅ All Tests Passed

### Coverage
| Metric     | Coverage |
|------------|----------|
| Statements | 85.5%    |
| Branches   | 78.2%    |
| Functions  | 90.1%    |
| Lines      | 84.8%    |
```

---

### Docker Build and Push Workflow

**Multi-Platform Build:**

```yaml
platforms: linux/amd64,linux/arm64
```

**Tag Strategy:**

| Tag Type  | Example                | When                 |
| --------- | ---------------------- | -------------------- |
| Branch    | `main`                 | Every push to branch |
| SHA       | `main-abc1234`         | Every commit         |
| Latest    | `latest`               | Only on main branch  |
| Timestamp | `prod-20251022-143022` | Every build          |
| Semver    | `1.0.0`, `1.0`         | Version tags         |

**Build Arguments:**

```dockerfile
BUILD_DATE=2025-10-22 14:30:22 UTC
VCS_REF=abc1234567890...
VERSION=main
```

**Cache Strategy:**

```yaml
cache-from: type=registry,ref=image:buildcache
cache-to: type=registry,ref=image:buildcache,mode=max
```

**Security Scan:**

- Trivy scans for vulnerabilities
- Reports CRITICAL and HIGH severity issues
- Results uploaded to GitHub Security tab

---

## Troubleshooting

### Common Issues

#### 1. **Lint Workflow Fails**

**Problem:** ESLint or Prettier errors

**Solution:**

```bash
# Fix ESLint issues
npm run lint:fix

# Format code
npm run format

# Commit and push
git add .
git commit -m "fix: code quality issues"
git push
```

---

#### 2. **Tests Fail in CI but Pass Locally**

**Problem:** Environment differences

**Solutions:**

**Check Node version:**

```bash
# Locally
node --version  # Should be 20.x

# Update if needed
nvm install 20
nvm use 20
```

**Check DATABASE_URL:**

```bash
# CI uses:
DATABASE_URL=postgresql://test_user:test_password@localhost:5432/test_db

# Make sure your local tests use similar config
```

**Check for hardcoded values:**

```javascript
// Bad
const PORT = 5000;

// Good
const PORT = process.env.PORT || 5000;
```

---

#### 3. **Docker Build Fails**

**Problem:** Authentication error

**Solution:**

```bash
# Verify secrets are set correctly
# Go to Settings → Secrets → Actions
# Ensure DOCKER_USERNAME and DOCKER_PASSWORD are set

# Test locally
docker login
docker build -t test-image .
```

**Problem:** Build timeout

**Solution:**

```yaml
# Workflow already has caching enabled
# If still slow, check Dockerfile for:
# - Unnecessary COPY commands
# - Large files being copied
# - Missing .dockerignore entries
```

---

#### 4. **Workflow Not Triggering**

**Problem:** Push doesn't start workflow

**Checks:**

```bash
# 1. Check branch name
git branch  # Should be 'main' or 'staging'

# 2. Check workflow file location
ls .github/workflows/
# Files should be in .github/workflows/

# 3. Check YAML syntax
# Use https://www.yamllint.com/ to validate

# 4. Enable workflows in repo settings
# Settings → Actions → General → Allow all actions
```

---

### Debugging Workflows

**Enable debug logging:**

1. Go to **Settings** → **Secrets**
2. Add secret: `ACTIONS_STEP_DEBUG` = `true`
3. Add secret: `ACTIONS_RUNNER_DEBUG` = `true`
4. Re-run workflow

**View detailed logs:**

```bash
# In workflow run, click on any step
# Click "View raw logs" in top right
# Download logs for offline analysis
```

---

## Best Practices

### 1. **Branch Protection Rules**

Set up branch protection for `main`:

1. Go to **Settings** → **Branches**
2. Add rule for `main` branch
3. Enable:
   - ✅ Require pull request reviews
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date
   - ✅ Include administrators

**Required Status Checks:**

- `Code Quality Check` (Lint workflow)
- `Run Tests` (Tests workflow)

---

### 2. **Commit Message Convention**

Use conventional commits for automatic changelog:

```
feat: add user management endpoint
fix: resolve database connection issue
docs: update API documentation
test: add tests for auth controller
ci: update docker build workflow
chore: update dependencies
```

---

### 3. **PR Workflow**

**Recommended flow:**

```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes
# ... code changes ...

# 3. Test locally
npm run lint
npm run format
npm test

# 4. Commit and push
git add .
git commit -m "feat: implement new feature"
git push origin feature/new-feature

# 5. Create PR on GitHub
# 6. Wait for CI checks
# 7. Request review
# 8. Merge after approval
```

---

### 4. **Docker Image Management**

**Tagging strategy:**

```bash
# Development: Use branch name
docker pull yourusername/acquisitions:staging

# Production: Use specific timestamp
docker pull yourusername/acquisitions:prod-20251022-143022

# Latest stable: Use latest
docker pull yourusername/acquisitions:latest
```

**Clean up old images:**

```bash
# Manually on Docker Hub
# Settings → General → Delete repository (for old repos)

# Or use Docker Hub API to delete old tags
```

---

### 5. **Monitoring and Alerts**

**GitHub Actions alerts:**

1. Go to your repository
2. Click **Watch** → **Custom**
3. Enable **Actions**
4. Get email notifications on failures

**Slack notifications (optional):**

```yaml
# Add to workflows:
- name: Slack Notification
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
```

---

## Workflow Status Badges

Add to your README.md:

```markdown
[![Lint and Format](https://github.com/ayushh9999/acquisitions/actions/workflows/lint-and-format.yml/badge.svg)](https://github.com/ayushh9999/acquisitions/actions/workflows/lint-and-format.yml)
[![Tests](https://github.com/ayushh9999/acquisitions/actions/workflows/tests.yml/badge.svg)](https://github.com/ayushh9999/acquisitions/actions/workflows/tests.yml)
[![Docker Build](https://github.com/ayushh9999/acquisitions/actions/workflows/docker-build-and-push.yml/badge.svg)](https://github.com/ayushh9999/acquisitions/actions/workflows/docker-build-and-push.yml)
```

---

## Additional Resources

- **GitHub Actions Documentation**: https://docs.github.com/en/actions
- **Docker Build Push Action**: https://github.com/docker/build-push-action
- **Docker Metadata Action**: https://github.com/docker/metadata-action
- **Supertest Testing**: https://github.com/visionmedia/supertest
- **Jest Documentation**: https://jestjs.io/

---

**Your CI/CD pipeline is ready! Happy deploying! 🚀**
