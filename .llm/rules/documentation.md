---
description: Documentation and commenting standards for code, APIs, and inline explanations
alwaysApply: false
---
# Documentation Guidelines

## Purpose
Defines standards for code documentation, comments, and inline explanations.

## Core Principles

- **DOC.PRIN-1 (SHOULD NOT)**: Add comments except for critical caveats; rely on self-explanatory code
- **DOC.PRIN-2 (MUST)**: Update relevant documentation as part of your work, not as follow-up

## When to Add Documentation

### File-Level Documentation
- **DOC.FILE-1 (SHOULD)**: Add header comments explaining the primary purpose of the file
- **DOC.FILE-2 (SHOULD)**: Document key dependencies or external integrations
- **DOC.FILE-3 (SHOULD)**: Explain important usage patterns or entry points
- **DOC.FILE-4 (SHOULD)**: Note any critical assumptions or constraints

### Inline Comments
- **DOC.INLINE-1 (SHOULD)**: Document complex algorithms or non-obvious logic
- **DOC.INLINE-2 (SHOULD)**: Explain important performance considerations or trade-offs
- **DOC.INLINE-3 (SHOULD)**: Clarify edge cases that aren't immediately apparent
- **DOC.INLINE-4 (SHOULD)**: Highlight critical caveats or gotchas for future developers
- **DOC.INLINE-5 (SHOULD)**: Explain business logic rules not self-evident from code structure
- **DOC.INLINE-6 (SHOULD)**: Document workarounds for known issues or bugs in dependencies

## When NOT to Document

- **DOC.SKIP-1 (MUST NOT)**: Add comments that simply restate what the code does
- **DOC.SKIP-2 (MUST NOT)**: Document trivial getters, setters, or simple property assignments
- **DOC.SKIP-3 (MUST NOT)**: Add comments just to have comments - every comment must add genuine value
- **DOC.SKIP-4 (MUST NOT)**: Document standard framework patterns developers would understand
- **DOC.SKIP-5 (SHOULD NOT)**: Comment out code - use version control instead
- **DOC.SKIP-6 (SHOULD NOT)**: Use comments as substitute for extracting a well-named function

## Language-Specific Standards

### JavaScript/TypeScript/React Documentation
- **DOC.JS-1 (SHOULD)**: Use JSDoc-style comments for complex functions and public APIs
- **DOC.JS-2 (SHOULD)**: Document component props and types with TypeScript interfaces

**Example React Component:**
```tsx
/**
 * NoteCard - Displays a note card with preview
 *
 * @param note - The note object to display
 * @param isLoading - Loading state indicator
 * @param onClick - Click handler
 */
interface NoteCardProps {
  note: Note;
  isLoading: boolean;
  onClick: (note: Note) => void;
}

export function NoteCard({ note, isLoading, onClick }: NoteCardProps) {
  // Component implementation
}
```

## Documentation Quality

### Quality Standards
- **DOC.QUAL-1 (SHOULD)**: Explain 'why' not 'what' (unless the 'what' is genuinely complex)
- **DOC.QUAL-2 (MUST)**: Verify documentation aligns with project conventions
- **DOC.QUAL-3 (SHOULD)**: Ensure documentation enhances understanding without cluttering code
- **DOC.QUAL-4 (MUST)**: Keep documentation concise, clear, and grammatically correct

### Good vs Bad Examples

**Good Comment:**
```typescript
// CAVEAT: Must run before midnight UTC or timezone calculations will be off by one day
// This is due to a known bug in the legacy timezone library we depend on
function scheduleSave(note: Note) {
```

**Bad Comment:**
```typescript
// This function schedules a save
function scheduleSave(note: Note) {
  // Set the time
  const time = calculateTime()
  // Schedule it
  schedule(time)
}
```

## Documentation Analysis Process

When reviewing code for documentation needs:

1. **DOC.PROC-1 (SHOULD)**: Examine the entire file to understand its purpose and architecture
2. **DOC.PROC-2 (SHOULD)**: Identify if file-level documentation is missing or inadequate
3. **DOC.PROC-3 (SHOULD)**: Scan for complex logic patterns needing explanation
4. **DOC.PROC-4 (SHOULD)**: Look for error handling or edge cases that aren't self-evident
5. **DOC.PROC-5 (SHOULD)**: Check for existing comments that might be outdated or misleading

## Refactoring vs Comments

- **DOC.REFACTOR-1 (SHOULD NOT)**: Extract a function solely to avoid comments
- **DOC.REFACTOR-2 (SHOULD)**: If you need comments everywhere, consider if it's too complex
- **DOC.REFACTOR-3 (SHOULD)**: Prefer extracting functions only when reused, testable in isolation, or drastically improve readability
