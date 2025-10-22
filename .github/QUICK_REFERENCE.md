# CI/CD Quick Reference

## 🚀 Quick Commands

```bash
# Before pushing code
npm run lint          # Check for code issues
npm run lint:fix      # Auto-fix lint issues
npm run format:check  # Check formatting
npm run format        # Format code
npm test              # Run tests locally

# Docker commands
docker build -t acquisitions:local .
docker-compose -f docker-compose.dev.yml up
docker-compose -f docker-compose.prod.yml up
```

## 📊 Workflow Triggers

| Workflow      | Auto Trigger               | Manual Trigger       |
| ------------- | -------------------------- | -------------------- |
| Lint & Format | ✅ Push/PR to main/staging | ❌                   |
| Tests         | ✅ Push/PR to main/staging | ❌                   |
| Docker Build  | ✅ Push to main            | ✅ workflow_dispatch |

## 🔐 Required Secrets

```
Repository Settings → Secrets and variables → Actions
```

- `DOCKER_USERNAME` - Docker Hub username
- `DOCKER_PASSWORD` - Docker Hub access token (not password!)

## 📦 Generated Docker Tags

```bash
# Format
{username}/acquisitions:latest
{username}/acquisitions:main
{username}/acquisitions:main-abc1234
{username}/acquisitions:prod-20251022-143022

# Pull example
docker pull yourusername/acquisitions:latest
docker pull yourusername/acquisitions:prod-20251022-143022
```

## ✅ Status Checks (for PRs)

Required before merge:

- [ ] Code Quality Check (Lint)
- [ ] Run Tests

## 🐛 Quick Fixes

### Lint Failed

```bash
npm run lint:fix
git add .
git commit -m "fix: lint issues"
git push
```

### Format Failed

```bash
npm run format
git add .
git commit -m "style: format code"
git push
```

### Tests Failed

```bash
npm test                    # Run locally first
npm test -- --verbose       # See detailed output
npm test -- --coverage      # Check coverage
```

### Docker Build Failed

```bash
# Check secrets first, then test locally:
docker build -t test .
docker run -p 5000:5000 --env-file .env.production test
```

## 📈 Coverage Thresholds

| Level         | Lines  | Action                |
| ------------- | ------ | --------------------- |
| 🟢 Excellent  | ≥80%   | Keep it up!           |
| 🟡 Good       | 60-79% | Consider adding tests |
| 🔴 Needs Work | <60%   | Add more tests        |

## 🔄 Standard Workflow

```bash
# 1. Create branch
git checkout -b feature/my-feature

# 2. Make changes
# ... code ...

# 3. Test locally
npm run lint
npm run format
npm test

# 4. Commit
git add .
git commit -m "feat: my feature"
git push origin feature/my-feature

# 5. Create PR on GitHub
# 6. Wait for CI checks ✅
# 7. Get approval 👍
# 8. Merge! 🎉
```

## 🏷️ Commit Types

```
feat:     New feature
fix:      Bug fix
docs:     Documentation
style:    Formatting
refactor: Code restructure
test:     Add/update tests
chore:    Maintenance
ci:       CI/CD changes
perf:     Performance improvement
```

## 📱 Notifications

Get notified of CI failures:

1. Click **Watch** (top right of repo)
2. Select **Custom**
3. Enable **Actions**
4. ✅ Save

## 🔗 Quick Links

- [Full CI/CD Guide](./CI_CD_GUIDE.md)
- [Workflows README](./workflows/README.md)
- [Docker Setup](../DOCKER_SETUP.md)
- [Main README](../README.md)

## ⚡ Manual Workflow Trigger

```
Actions tab → Docker Build and Push → Run workflow
- Select branch: main
- Optional tag suffix: (leave empty or e.g., "hotfix")
- Click "Run workflow"
```

## 💡 Pro Tips

1. **Always test locally first** before pushing
2. **Use descriptive commit messages** for better changelog
3. **Keep PRs small** for faster reviews
4. **Check Actions tab** if unsure about workflow status
5. **Enable branch protection** on main to require CI checks

## 📞 Need Help?

1. Check [CI_CD_GUIDE.md](./CI_CD_GUIDE.md) troubleshooting
2. Review workflow logs in Actions tab
3. Enable debug logging (see guide)
4. Open an issue if problem persists
