---
description: JavaScript/TypeScript and React coding standards for Electron apps
alwaysApply: false
---
# JavaScript and TypeScript Guidelines

## Purpose
Defines JavaScript/TypeScript coding standards, React patterns, and Electron best practices for Xun.

## Application Context

Xun is an Electron desktop application using:
- TypeScript with strict mode
- React 19 with hooks
- Vite for building
- CodeMirror 6 for the markdown editor
- Tailwind CSS 4 for styling
- Playwright for E2E testing

## TypeScript Standards

### Type Safety
- **JS.TS-1 (MUST)**: Enable strict mode in `tsconfig.json`
- **JS.TS-2 (MUST)**: Define types for IPC channel data
- **JS.TS-3 (SHOULD)**: Use explicit return types for functions
- **JS.TS-4 (SHOULD)**: Avoid `any` type; use `unknown` when type is truly unknown
- **JS.TS-5 (MUST)**: Define types for all component props

### Variable Declaration
- **JS.VAR-1 (MUST)**: Use `const` by default; use `let` only when reassignment needed
- **JS.VAR-2 (MUST NOT)**: Use `var`

## React Patterns

### Hooks
- **JS.HOOK-1 (MUST)**: Use `useState` for local component state
- **JS.HOOK-2 (MUST)**: Use `useEffect` for side effects
- **JS.HOOK-3 (SHOULD)**: Use `useCallback` for memoized callbacks
- **JS.HOOK-4 (SHOULD)**: Use `useMemo` for expensive computations
- **JS.HOOK-5 (MUST)**: Include cleanup functions in useEffect when needed

### Component Structure
- **JS.REACT-1 (SHOULD)**: Keep components small and focused (< 200 lines)
- **JS.REACT-2 (SHOULD)**: Extract complex logic into custom hooks
- **JS.REACT-3 (MUST)**: Use TypeScript for all components
- **JS.REACT-4 (SHOULD)**: Use function components, not class components

### State Management
- **JS.STATE-1 (SHOULD)**: Keep state as close to usage as possible
- **JS.STATE-2 (SHOULD)**: Use React Context for shared state
- **JS.STATE-3 (SHOULD NOT)**: Mutate state directly; use setState

## Electron Patterns

### IPC Communication
- **JS.IPC-1 (MUST)**: Use preload scripts for IPC bridge
- **JS.IPC-2 (MUST)**: Use contextBridge.exposeInMainWorld
- **JS.IPC-3 (MUST)**: Validate all inputs in main process handlers
- **JS.IPC-4 (SHOULD)**: Use invoke/handle for request-response patterns

### Main Process
- **JS.MAIN-1 (MUST)**: Handle file system operations in main process
- **JS.MAIN-2 (MUST)**: Register IPC handlers before window creation
- **JS.MAIN-3 (SHOULD)**: Use app.getPath() for standard directories

### Preload Scripts
- **JS.PRELOAD-1 (MUST)**: Expose minimal API surface to renderer
- **JS.PRELOAD-2 (MUST NOT)**: Expose Node.js APIs directly
- **JS.PRELOAD-3 (SHOULD)**: Type the exposed API with TypeScript

## CodeMirror Patterns

### Editor Setup
- **JS.CM-1 (SHOULD)**: Create editor in useEffect with cleanup
- **JS.CM-2 (SHOULD)**: Use EditorState.create for initial state
- **JS.CM-3 (SHOULD)**: Use view.destroy() in cleanup
- **JS.CM-4 (SHOULD)**: Use updateListener for content changes

### Extensions
- **JS.CM-5 (SHOULD)**: Keep extensions organized and documented
- **JS.CM-6 (SHOULD)**: Create custom extensions as separate functions
- **JS.CM-7 (SHOULD)**: Use ViewPlugin for decorations

## File Organization

See @.llm/context/project-structure.md for directory structure.

### File Naming
- **JS.NAME-1 (MUST)**: Use PascalCase for component files (`Editor.tsx`)
- **JS.NAME-2 (MUST)**: Use camelCase for utility files (`formatDate.ts`)
- **JS.NAME-3 (MUST)**: Use camelCase for hook files (`useVault.ts`)

### Directory Structure
- **JS.ORG-1 (MUST)**: Place React components in `src/renderer/components/`
- **JS.ORG-2 (MUST)**: Place custom hooks in `src/renderer/hooks/`
- **JS.ORG-3 (MUST)**: Place IPC handlers in `src/main/ipc/`
- **JS.ORG-4 (MUST)**: Place utilities in `src/renderer/utils/`

## Async Patterns

### Error Handling
- **JS.ASYNC-1 (MUST)**: Use try/catch for all async operations
- **JS.ASYNC-2 (SHOULD)**: Display user-friendly error messages in UI
- **JS.ASYNC-3 (MUST)**: Log detailed errors for debugging
- **JS.ASYNC-4 (SHOULD)**: Use AbortController for cancellable operations

### Promises
- **JS.PROM-1 (SHOULD)**: Prefer async/await over raw promises
- **JS.PROM-2 (MUST NOT)**: Leave promises unhandled
- **JS.PROM-3 (SHOULD)**: Use Promise.all() for parallel operations

## Testing Standards

See @.llm/context/testing-strategy.md for test organization.
See @.llm/rules/testing.md for testing quality standards.

- **JS.TEST-1 (SHOULD)**: Write E2E tests for critical user flows
- **JS.TEST-2 (SHOULD)**: Use Playwright for E2E testing
- **JS.TEST-3 (SHOULD)**: Mock IPC calls in component tests

## Code Quality

### Linting
- **JS.LINT-1 (MUST)**: ESLint must pass with zero errors
- **JS.LINT-2 (MUST)**: TypeScript must compile with zero errors
- **JS.LINT-3 (MUST)**: Build must succeed

### Code Style
- **JS.STYLE-1 (SHOULD)**: Use 2 spaces for indentation
- **JS.STYLE-2 (SHOULD)**: Limit line length to 100 characters
- **JS.STYLE-3 (SHOULD)**: Use single quotes for strings

## Performance

### React Performance
- **JS.PERF-1 (SHOULD)**: Use React.memo for expensive components
- **JS.PERF-2 (SHOULD)**: Use useCallback/useMemo appropriately
- **JS.PERF-3 (SHOULD NOT)**: Optimize prematurely; measure first

### Electron Performance
- **JS.PERF-4 (SHOULD)**: Minimize IPC calls
- **JS.PERF-5 (SHOULD)**: Batch file operations when possible
- **JS.PERF-6 (SHOULD)**: Use virtualization for long lists
