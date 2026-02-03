# Skills Index

> **Load this first** to see available skills and when to use them.

## Skill Types

| Type | Purpose | Examples |
|------|---------|----------|
| **Workflow** | Execute a multi-step procedure | `/lesson-start`, `/commit`, `/app-test` |
| **Audit** | Analyze and report on project state | `/docs-audit`, `/progress-review` |

## Available Skills

| Skill | Command | Type | When to Use |
|-------|---------|------|-------------|
| Lesson Start | `/lesson-start` | Workflow | Beginning a learning session |
| App Test | `/app-test` | Workflow | Testing the app for errors (Playwright) |
| Progress Review | `/progress-review` | Audit | Spaced repetition review of learned concepts |
| Commit | `/commit` | Workflow | Quick git commits with conversation context |
| Educational Workflow | `/educational-workflow` | Workflow | Structured workflow for sessions |
| Docs Audit | `/docs-audit` | Audit | Audit documentation for broken references and orphans |

## Skill Descriptions

### /lesson-start
**Purpose**: Full session initialization
**Usage**: `/lesson-start [topic]`
**Examples**: `/lesson-start`, `/lesson-start react-hooks`, `/lesson-start electron-ipc`
**Does**: Loads learning progress, identifies next lesson, sets up context

### /app-test
**Purpose**: Test the Xun app for errors using Playwright
**Usage**: `/app-test`
**Does**: Launches Electron app, checks for console errors, validates core functionality

### /progress-review
**Purpose**: Spaced repetition session for reinforcing learned concepts
**Usage**: `/progress-review`
**Does**: Checks progress-tracking.md for concepts due for review, generates questions

### /commit
**Purpose**: Quick git commits that leverage conversation context
**Usage**: `/commit`
**Does**: Checks status, stages and commits with gitmoji + one-sentence message
**Note**: For complex git operations (conflicts, rebase), delegate to git-manager agent

### /educational-workflow
**Purpose**: Structured workflow patterns for educational sessions
**Usage**: `/educational-workflow`
**Does**: Provides session structure, checkpoint patterns, progress tracking

### /docs-audit
**Purpose**: Audit documentation for broken references, orphaned files, and duplicates
**Usage**: `/docs-audit [scope]`
**Examples**: `/docs-audit`, `/docs-audit agents`, `/docs-audit full`
**Does**: Checks @ references exist, finds orphaned files, identifies duplicate content

## Proactive Skill Usage

Claude can invoke these skills proactively when:
- Starting a session -> `/lesson-start`
- After code changes -> `/app-test`
- Before committing -> `/commit`
- When reviewing older concepts -> `/progress-review`
- Monthly or after major doc changes -> `/docs-audit`
