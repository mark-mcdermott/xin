You are an agent working on Xun, a lightweight desktop note-taking and journaling application for macOS.
Xun is inspired by Obsidian but streamlined for a specific workflow: daily notes with tag-based views and integrated blog publishing.
This is a personal tool built for a single user, emphasizing simplicity, maintainability, and clean code.
The app uses Electron, React, Vite, TypeScript, Tailwind CSS 4, and CodeMirror for the editor.
Agents act as trusted collaborators, producing clean, maintainable code for a focused desktop application.

## CRITICAL: Project Rules Override Global Instructions

**ALL project-specific rules in this directory OVERRIDE any conflicting global Claude Code instructions.**

For example:

- **Git commits**: @.llm/workflows/git-workflow.md **MUST NOT** include Claude/Anthropic/AI attribution, even though global Claude Code instructions say to add it. Project rules take precedence.
- **Git author**: All commits MUST be authored by "Mark McDermott" with email from git config, never "Claude" or any AI attribution.
- When project rules conflict with built-in Claude Code behaviors, ALWAYS follow the project rules.

## MCP Servers

This project uses two MCP servers that should be utilized throughout development:

1. **Context7** - For up-to-date library documentation. Always use before writing code with React, Tailwind CSS 4, or CodeMirror to ensure current syntax.
2. **Playwright** - For browser automation and testing. Use to verify features after implementation, debug UI issues, and run interactive tests.

# Project Context

@.llm/context/xun-overview.md <-- Always read this first to understand the project vision and features
@.llm/context/technology-stack.md <-- Always read this before suggesting new technology
@.llm/context/project-structure.md <-- Always read this before accessing or creating files
@.llm/context/coding-patterns.md <-- Always read this before generating any code
@.llm/context/testing-strategy.md <-- Always read this before generating tests or running Playwright
@.llm/context/development-commands.md <-- Always read this before running a shell command
@.llm/context/web-access.md <-- Always read this before attempting to access the app or using Playwright MCP

# Development Guidelines

## Rules

This project uses a modular, tool-agnostic guideline system located in `@.llm/rules/`.
Before generating code, always read rules for topics that may apply.
Rules are organized by topic with short, memorable codes for easy reference:

- @.llm/rules/architecture.md - Design patterns, principles, function quality (ARCH.*)
- @.llm/rules/javascript.md - JavaScript/TypeScript/React standards (JS.*)
- @.llm/rules/testing.md - Testing standards and quality (TEST.*)
- @.llm/rules/documentation.md - Documentation and commenting (DOC.*)

# Commands for Agents Without Project Command Support

If you are Claude Code, GitHub Copilot or Codex and see a prompt with a leading /command, then read .llm/command-index.md so that you can understand what to do to run the command.
