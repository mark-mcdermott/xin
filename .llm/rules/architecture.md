---
description: Design patterns, principles, and function quality standards for building maintainable code
alwaysApply: false
---
# Architecture Guidelines

## Purpose
Defines architectural patterns, design principles, and structural decisions for building maintainable, testable code in Xin.

## Core Principles
- **MUST** rules are enforced by linting/CI; **SHOULD** rules are strongly recommended.
- Terms "function" and "method" are used interchangeably.

## Design Patterns

### Module Organization
- **ARCH.MOD-1 (SHOULD)**: Organize code by feature/domain, not by type
- **ARCH.MOD-2 (SHOULD)**: Keep related functionality together (colocation)
- **ARCH.MOD-3 (SHOULD)**: Use clear boundaries between main, preload, and renderer code

### Utility Functions
- **ARCH.UTIL-1 (SHOULD)**: Extract pure functions for reusable logic
- **ARCH.UTIL-2 (SHOULD)**: Keep utilities stateless and deterministic
- **ARCH.UTIL-3 (SHOULD)**: Place utilities in `src/renderer/utils/`

### React State Management
- **ARCH.STATE-1 (SHOULD)**: Use React hooks for component state
- **ARCH.STATE-2 (SHOULD)**: Use Context for shared state across components
- **ARCH.STATE-3 (SHOULD)**: Keep state as close to where it's used as possible

### Error Handling
- **ARCH.ERR-1 (SHOULD)**: Handle IPC errors gracefully
- **ARCH.ERR-2 (MUST)**: Handle all async errors with try/catch
- **ARCH.ERR-3 (SHOULD)**: Display user-friendly error messages in UI

## Design Principles

### Single Responsibility
- **ARCH.SRP-1 (SHOULD)**: Functions and modules should have one clear purpose
- **ARCH.SRP-2 (SHOULD)**: Components should do one thing well

### Separation of Concerns
- **ARCH.SOC-1 (MUST)**: Keep business logic out of UI components
- **ARCH.SOC-2 (MUST)**: Handle file operations in main process, not renderer
- **ARCH.SOC-3 (SHOULD)**: Separate data transformation from UI rendering

### Composition Over Inheritance
- **ARCH.COMP-1 (SHOULD)**: Use hooks and functions for shared behavior
- **ARCH.COMP-2 (SHOULD NOT)**: Use class inheritance for code reuse
- **ARCH.COMP-3 (SHOULD)**: Compose small functions to build complex behavior

### Immutability
- **ARCH.IMMUT-1 (SHOULD)**: Prefer immutable data structures
- **ARCH.IMMUT-2 (SHOULD)**: Use spread operators or methods like `map()` instead of mutation

### Pattern Consistency
- **ARCH.PATTERN-1 (SHOULD)**: Follow existing patterns in the codebase before creating new ones
- **ARCH.PATTERN-2 (SHOULD)**: Use consistent naming conventions throughout

## Code Organization

### Naming and Vocabulary
- **ARCH.NAME-1 (MUST)**: Use clear, descriptive names that match domain vocabulary
- **ARCH.NAME-2 (SHOULD)**: Avoid abbreviations unless widely understood
- **ARCH.NAME-3 (SHOULD)**: Use verb-noun pairs for function names (`loadFile`, `saveNote`)

### Function Design
- **ARCH.FUNC-1 (SHOULD)**: Prefer small, composable, testable functions
- **ARCH.FUNC-2 (SHOULD)**: Keep functions under 50 lines when possible
- **ARCH.FUNC-3 (SHOULD NOT)**: Extract a new function unless:
  - It will be reused elsewhere
  - It's the only way to unit-test otherwise untestable logic
  - It drastically improves readability

### Comments and Documentation
- **ARCH.DOC-1 (SHOULD NOT)**: Add comments except for critical caveats or complex algorithms
- **ARCH.DOC-2 (SHOULD)**: Rely on self-explanatory code with good naming
- **ARCH.DOC-3 (SHOULD)**: Document public API functions with JSDoc

## Function Quality Checklist

When evaluating function quality, check:

1. **ARCH.Q-1 (SHOULD)**: Ensure functions are readable and easy to follow
2. **ARCH.Q-2 (SHOULD)**: Avoid high cyclomatic complexity (excessive branching)
3. **ARCH.Q-3 (SHOULD)**: Use appropriate data structures to improve clarity
4. **ARCH.Q-4 (MUST NOT)**: Include unused parameters in function signatures
5. **ARCH.Q-5 (SHOULD NOT)**: Hide dependencies; pass them as arguments
6. **ARCH.Q-6 (MUST)**: Use descriptive function names consistent with domain vocabulary

## Electron-Specific Architecture

### Process Separation
- **ARCH.ELECTRON-1 (MUST)**: Use main process for file system operations
- **ARCH.ELECTRON-2 (MUST)**: Use preload scripts for IPC bridge
- **ARCH.ELECTRON-3 (MUST NOT)**: Import Node.js modules directly in renderer
- **ARCH.ELECTRON-4 (MUST)**: Use contextBridge for safe IPC communication

### IPC Communication
- **ARCH.IPC-1 (MUST)**: Define IPC channels with clear naming
- **ARCH.IPC-2 (SHOULD)**: Use `invoke/handle` for request/response patterns
- **ARCH.IPC-3 (SHOULD)**: Use `on/send` for event-based communication
- **ARCH.IPC-4 (MUST)**: Validate all IPC inputs in main process

### Window Management
- **ARCH.WINDOW-1 (SHOULD)**: Handle window lifecycle in main process
- **ARCH.WINDOW-2 (SHOULD)**: Save and restore window state
- **ARCH.WINDOW-3 (SHOULD)**: Use native menus and dialogs

## React-Specific Architecture

### Component Structure
- **ARCH.REACT-1 (SHOULD)**: Use functional components with hooks
- **ARCH.REACT-2 (SHOULD)**: Keep components focused and small
- **ARCH.REACT-3 (SHOULD)**: Extract complex logic into custom hooks
- **ARCH.REACT-4 (SHOULD)**: Use TypeScript interfaces for props

### State Management
- **ARCH.REACT-5 (SHOULD)**: Use useState for local state
- **ARCH.REACT-6 (SHOULD)**: Use useContext for shared state
- **ARCH.REACT-7 (SHOULD)**: Use useReducer for complex state logic
- **ARCH.REACT-8 (SHOULD)**: Lift state up when needed by sibling components

## File System Architecture

### Vault Structure
- **ARCH.VAULT-1 (SHOULD)**: Store notes as markdown files
- **ARCH.VAULT-2 (SHOULD)**: Use directory structure for organization
- **ARCH.VAULT-3 (SHOULD)**: Cache file metadata for performance
- **ARCH.VAULT-4 (MUST)**: Watch for external file changes

### Data Persistence
- **ARCH.DATA-1 (SHOULD)**: Store app config in Electron's app data directory
- **ARCH.DATA-2 (SHOULD)**: Use JSON for configuration files
- **ARCH.DATA-3 (MUST NOT)**: Store sensitive data in plain text

## Testability

### Test Design
- **ARCH.TEST-1 (SHOULD)**: Design functions to be easily testable
- **ARCH.TEST-2 (SHOULD)**: Mock IPC in renderer tests
- **ARCH.TEST-3 (SHOULD)**: Use E2E tests for integration scenarios

## Performance Considerations

- **ARCH.PERF-1 (SHOULD)**: Avoid premature optimization
- **ARCH.PERF-2 (SHOULD)**: Profile before optimizing
- **ARCH.PERF-3 (SHOULD)**: Use virtualization for large lists
- **ARCH.PERF-4 (SHOULD)**: Debounce search and autosave inputs
