# Feature Development Workflow

## Purpose
Coordinate end-to-end feature delivery using code review and testing.

## Overview
Phases: Planning → Implementation → Verification → Commit

### Quick Checklist
- Work from `main` branch (or feature branch)
- Use Playwright MCP to verify features work
- Push to GitHub when checks pass

## Workflow Steps

### 1. Planning Phase
- Understand the feature requirements
- Identify affected files and components
- Break down into smaller tasks
- Consider edge cases and error handling

### 2. Implementation Phase
- Implement code following project patterns
- Follow coding patterns in @.llm/context/coding-patterns.md
- Use Context7 MCP to verify library syntax
- Keep changes focused and minimal

### 3. Verification Phase
- Use Playwright MCP to verify UI:
  1. Navigate to the feature page
  2. Interact with the feature
  3. Verify expected behavior
  4. Fix any issues and re-test
- Run `npm run typecheck` to verify TypeScript
- Run `npm run lint` to verify linting
- Run `npm run build` to ensure build passes

### 4. Commit Phase
- Commit changes (no AI attribution)
- Push to `main` branch

## Agent Handoff Flow

```
Planning Agent → Feature Implementer → QA Verification → Commit
```

Each agent should:
1. Read the relevant context files
2. Complete their phase thoroughly
3. Document any issues or decisions
4. Hand off cleanly to next phase

## Git Commit Guidelines

**CRITICAL: All commits must be by Mark McDermott, not Claude.**

Do NOT include:
- Co-Authored-By for Claude/Anthropic/AI
- "Generated with Claude Code"
- Any AI attribution

Example commit:
```bash
git commit -m "feat: add entry quick-log from dashboard"
```

## MCP Server Usage

### Context7
Use before writing code to verify:
- React hooks and patterns
- Tailwind CSS 4 classes
- CodeMirror editor APIs

### Playwright
Use after implementing to verify:
- Navigate to feature page
- Test interactions
- Check accessibility tree
- Take screenshots if needed
- Iterate until working
