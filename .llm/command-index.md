# Development Workflow Shortcuts

These shortcuts allow you to quickly invoke development workflows by typing simple keywords. They work across all LLM coding assistants.

## Available Shortcuts

### Feature Development

**`qfeature`** - Feature Development Workflow
See @.llm/workflows/feature-development.md
End-to-end feature development from planning through implementation and verification.

### Git Operations

**`qgit`** - Git Workflow
See @.llm/workflows/git-workflow.md
Commit and push changes with proper commit message formatting (Mark McDermott author only).

## How Shortcuts Work

Shortcuts are simple keywords that:
1. Load the relevant workflow documentation
2. Set the context for the current development phase
3. Guide the LLM to follow established patterns and practices

They provide a consistent interface regardless of which LLM tool you're using.

## Key Workflow Points

### Before Coding
- Use Context7 MCP to verify current library syntax
- Check React, Tailwind CSS 4, CodeMirror

### After Implementing
- Use Playwright MCP to verify features work
- Navigate, interact, and verify expected behavior
- Fix any issues and re-test

### Before Committing
- Run `npm run typecheck` - TypeScript validation
- Run `npm run lint` - ESLint passes
- Run `npm run build` - Build succeeds

### Commits
- Author: Mark McDermott (never Claude/AI)
- No Co-Authored-By for AI
- No "Generated with Claude Code"
- Conventional commit format (`feat:`, `fix:`, etc.)
