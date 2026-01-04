# Development Commands

## Setup & Install

```bash
npm install              # Install all dependencies
```

## Development

```bash
npm run dev              # Start Vite dev server with Electron (HMR enabled)
```

## Type Checking

```bash
npm run typecheck        # Run TypeScript type checking
```

## Linting & Formatting

```bash
npm run lint             # Run ESLint
npm run lint:fix         # Run ESLint with auto-fix
npm run format           # Run Prettier formatting
```

## Testing

```bash
npm run test:e2e         # Run Playwright E2E tests
npm run test:e2e:ui      # Run Playwright with interactive UI
```

## Build & Package

```bash
npm run build            # TypeScript compile + Vite production build
npm run preview          # Preview production build
npm run package          # Build and package as macOS DMG
```

## Clean

```bash
npm run clean            # Clear build artifacts (dist, node_modules/.vite)
```

## Git Workflow

Development workflow:

```bash
# 1. Work on main branch (or feature branch)
git checkout main

# 2. Make changes and run checks locally
npm run typecheck
npm run lint
npm run build

# 3. Commit and push
git add .
git commit -m "feat: description"
git push origin main
```

## Pre-Push Checklist

Before pushing:

```bash
npm run typecheck        # No TypeScript errors
npm run lint             # No linting errors
npm run build            # Build succeeds
```

## Playwright Testing Commands

```bash
npm run test:e2e                    # Run all E2E tests
npx playwright test --ui            # Run with Playwright UI
npx playwright test --debug         # Run in debug mode
npx playwright show-report          # View test report
```

## Electron Development

The dev server starts both Vite and Electron:
- Vite serves the renderer process with HMR
- Electron main process reloads on changes
- DevTools available in Electron window (Cmd+Option+I)

## Packaging

```bash
# Build and package for macOS
npm run package

# Output: release/Xin-{version}.dmg
```

The packaged app will be in the `release/` directory.
