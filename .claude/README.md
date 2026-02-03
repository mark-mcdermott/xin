# .claude/ Configuration Directory

This directory contains the complete Claude Code configuration for the Xin project, structured as a layered teaching and development system.

## Directory Structure

```
.claude/
├── README.md                    # This file
├── settings.local.json          # Permission configuration
├── agents/
│   ├── README.md                # Agent/consultant index and decision tree
│   ├── git-manager.md           # Complex git operations (delegate via Task)
│   ├── documentation.md         # Doc maintenance (delegate via Task)
│   ├── react-expert.md          # React/hooks consultant (load inline)
│   └── electron-expert.md       # Electron/IPC consultant (load inline)
├── skills/
│   ├── README.md                # Skills index
│   ├── commit/SKILL.md          # Quick git commits
│   ├── lesson-start/SKILL.md    # Session initialization
│   ├── progress-review/SKILL.md # Spaced repetition review
│   ├── app-test/SKILL.md        # Playwright app testing
│   ├── educational-workflow/SKILL.md # Session structure
│   └── docs-audit/SKILL.md      # Documentation audit
├── output-styles/
│   ├── README.md                # Style framework
│   └── teaching-mentor.md       # Senior engineer mentor personality
└── rules/
    ├── learning-workflow.md      # Teaching protocols (always active)
    └── local-overrides.md        # Project-level setting overrides
```

## How It Works

### Layered Architecture
1. **CLAUDE.md** (root) - Single entry point, points to everything
2. **Agents** - Specialized delegators for complex work (fresh context)
3. **Consultants** - Expert advice loaded inline (keeps conversation context)
4. **Skills** - Invokable command workflows and references
5. **Rules** - Always-active behavioral protocols
6. **Output Style** - Communication personality
7. **Context Modules** (`docs/context-modules/`) - Project state/specs (on-demand)

### Hook System
- **SessionStart**: Auto-load learning progress at session start
- **PostToolUse**: Test reminder after React/Electron file edits
- **PreToolUse**: Commit checklist before git commits

### Configuration
- `settings.local.json`: Permission rules for Claude Code agents
- Permissions cover bash commands, MCP servers, and tool access
