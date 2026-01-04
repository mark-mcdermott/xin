# Xin LLM Context Documentation

This directory contains tool-agnostic documentation and guidelines for AI coding assistants (Claude Code, GitHub Copilot, Cursor, Codex CLI, etc.) working on Xin, a lightweight desktop note-taking application for macOS.

## Directory Structure

```
.llm/
├── root-context.md          # Main entry point (symlinked to /CLAUDE.md)
├── command-index.md         # Universal workflow shortcut definitions
├── agents/                  # AI agent configurations
├── commands/                # Tool-specific command definitions
├── workflows/               # Development workflow procedures
├── rules/                   # Coding standards and best practices
└── context/                 # Project knowledge and runtime environment
```

## MCP Servers

This project uses two MCP servers that should be utilized throughout development:

1. **Context7** - For up-to-date library documentation
   - Use before writing code with React, Tailwind CSS 4, or CodeMirror
   - Ensures current syntax rather than outdated training data

2. **Playwright** - For browser automation and testing
   - Use to verify features after implementation
   - Debug UI issues and run interactive tests
   - Mandatory verification for all UI features

## CRITICAL: Git Author Configuration

**All commits MUST be authored by Mark McDermott, never by Claude or any AI.**

Commit messages MUST NOT include:
- Co-Authored-By lines for Claude, Anthropic, or any AI
- "Generated with Claude Code" or similar AI attribution
- Any emoji robots or AI indicators

See `workflows/git-workflow.md` for full details.

## File Organization

### `root-context.md`
- **Purpose**: Main entry point that imports all relevant context and guidelines
- **Usage**: Symlinked to `/CLAUDE.md` for Claude Code
- **Format**: Markdown with `@` syntax for importing other files

### `context/` - Project Knowledge & Environment
Project knowledge and runtime configuration:
- `xin-overview.md` - Project vision, features, and architecture
- `technology-stack.md` - Languages, frameworks, versions, key dependencies
- `project-structure.md` - Directory structure and Electron process model
- `coding-patterns.md` - React, CodeMirror, Electron IPC patterns
- `testing-strategy.md` - E2E testing with Playwright
- `development-commands.md` - How to run dev, build, and test
- `web-access.md` - Development environment and MCP server usage

### `workflows/` - Development Workflows
Procedures for accomplishing development tasks:
- `git-workflow.md` - Git operations and commit guidelines
- `feature-development.md` - Feature development workflow

### `rules/` - Coding Standards
Files defining coding standards with numbered rules:
- `architecture.md` - Design patterns, principles (`ARCH.*` codes)
- `javascript.md` - JavaScript/TypeScript/React standards (`JS.*` codes)
- `testing.md` - Testing standards (`TEST.*` codes)
- `documentation.md` - Documentation guidelines (`DOC.*` codes)

### `agents/` - AI Agents
Specialized AI agent configurations:
- `application-architect.md` - Architecture and planning agent
- `feature-implementer.md` - Feature development agent
- `test-writer-javascript.md` - JavaScript test writing agent
- `code-quality-enforcer.md` - Code review and quality agent
- `code-documentation-writer.md` - Documentation agent

## Symlink Setup

The CLAUDE.md symlink is already set up:

```bash
ln -sf .llm/root-context.md CLAUDE.md
```

## Development Workflow

1. **Before coding**: Use Context7 MCP to verify library syntax
2. **Implement feature**: Follow coding patterns
3. **After implementing**: Use Playwright MCP to verify it works
4. **Run checks**: `npm run typecheck && npm run lint && npm run build`
5. **Commit**: No AI attribution in commits (Mark McDermott only)

## Maintenance Guidelines

### Adding New Rules
1. Find the appropriate rule file (`rules/javascript.md`, etc.)
2. Add to the relevant section with next sequential number
3. Use format: `- **PREFIX.SECTION-N (MUST|SHOULD)**: Description`

### Adding New Context Files
1. Create file in `context/` directory
2. Add reference in `root-context.md` under "Project Context"
3. Must NOT reference other `.llm/` files (leaf nodes in DAG)

## Design Principles

1. **MCP-First**: Use Context7 before coding, Playwright after implementing
2. **Verification**: Always verify features work with Playwright MCP
3. **No AI Attribution**: All commits by Mark McDermott only
4. **Modular**: Each file has a single, clear purpose
5. **Desktop-First**: Electron desktop app is the primary platform
