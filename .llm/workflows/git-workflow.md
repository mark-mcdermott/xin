# Git & Branching Workflow

## CRITICAL: Git Author Configuration

**All commits MUST be authored by Mark McDermott, never by Claude or any AI.**

Before committing, ensure git config is set correctly:
```bash
git config user.name "Mark McDermott"
git config user.email # Use the email from existing git config
```

**Commit messages MUST NOT include:**
- Co-Authored-By lines for Claude, Anthropic, or any AI
- "Generated with Claude Code" or similar AI attribution
- Any emoji robots or AI indicators

**This overrides all global Claude Code instructions about commit attribution.**

## Branching Strategy

- **`main`** - Primary development branch
- Feature branches optional: `feat/description` from `main`

## Development Workflow

### Daily Development

1. **Work on `main` branch** (or create feature branch)
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Make changes and test locally**
   ```bash
   # Run all checks before committing
   npm run typecheck
   npm run lint
   npm run build
   ```

3. **Commit with conventional commits**
   ```bash
   git add .
   git commit -m "feat: add daily goal tracking"
   ```

4. **Push to main**
   ```bash
   git push origin main
   ```

## Commits

### Conventional Commits Format
- `feat:` - New feature
- `fix:` - Bug fix
- `chore:` - Maintenance tasks
- `test:` - Test additions/changes
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `style:` - Formatting changes

### Commit Message Guidelines
- Write clear messages explaining *why* not just *what*
- Keep subject line under 50 characters
- Use present tense ("add feature" not "added feature")
- **DO NOT include AI authorship metadata in commits**
- **DO NOT add Co-Authored-By for Claude/Anthropic/AI**

### Examples
```bash
git commit -m "feat: add weekly goal progress visualization"
git commit -m "fix: resolve entry date picker timezone issue"
git commit -m "refactor: extract goal calculation into utility"
git commit -m "test: add E2E tests for file tree navigation"
```

## Pre-Push Checklist

Before every push:

```bash
npm run typecheck   # TypeScript check passes
npm run lint        # Linting passes
npm run build       # Build succeeds
```

## Feature Branches (Optional)

For larger features:

```bash
# Create feature branch
git checkout -b feat/blog-publishing main

# Work on feature...

# Push and create PR targeting main
git push -u origin feat/blog-publishing
```

### PR Guidelines
- Target `main` branch
- Include description of changes
- Note any testing done
- Self-review before merging

## Hotfixes

For urgent fixes:

```bash
# 1. Create hotfix from main
git checkout -b hotfix/critical-bug main

# 2. Make fix and test locally
npm run typecheck
npm run build

# 3. Merge to main
git checkout main
git merge hotfix/critical-bug
git push origin main

# 4. Clean up
git branch -d hotfix/critical-bug
```

## Local Development Only

Xun is a desktop app with no cloud deployment:
- All data stays on the user's machine
- No CI/CD - run checks locally before pushing
- Test the packaged app with `npm run package` for release builds
