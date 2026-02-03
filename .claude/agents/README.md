# Agents & Consultants Index

> **Load this first** to determine how to get help.

## Two Types of Helpers

### Agents (Delegate via Task tool)
Execute multi-step workflows in fresh context. Use when work should be **offloaded**.

| Agent | Delegate When | How |
|-------|---------------|-----|
| `git-manager.md` | Complex git (conflicts, rebase, PRs, branch strategy) | Task tool |
| `documentation.md` | Updating docs, maintaining learning progress | Task tool |

> **Git Routing**: Simple commits use `/commit` skill (has conversation context). Only delegate to git-manager for complex operations.

### Consultants (Load inline for advice)
Decision guides that provide expert advice within the main conversation. Use when you need **guidance** but want to stay in current context.

| Consultant | Consult When | How |
|------------|--------------|-----|
| `react-expert.md` | Component design, hooks, state management, React patterns | Read file |
| `electron-expert.md` | IPC, main/renderer architecture, packaging, native APIs | Read file |

> **Note**: Teaching protocols are in `.claude/rules/learning-workflow.md` (always active), not an agent or consultant.

## Decision Tree

```
Need to do git operations?
  |-> Read-only (status/log/diff)?
  |     -> Execute directly
  |-> Simple commit?
  |     -> /commit skill (keeps conversation context)
  -> Complex (conflicts/rebase/PRs)?
        -> DELEGATE to git-manager.md

Need to update documentation?
  -> DELEGATE to documentation.md

Need implementation advice for React/frontend code?
  -> CONSULT react-expert.md (load inline, don't delegate)

Need implementation advice for Electron/desktop code?
  -> CONSULT electron-expert.md (load inline, don't delegate)

Need teaching guidance?
  -> NOT here. Use rules in .claude/rules/learning-workflow.md
```

## When to Delegate vs Consult

| Scenario | Use Agent (Delegate) | Use Consultant (Load) |
|----------|---------------------|----------------------|
| Multi-step workflow with state | Yes | No |
| Need fresh context | Yes | No |
| Quick decision/pattern question | No | Yes |
| Need conversation history | No | Yes |
| Can run in parallel with other work | Yes | No |

## Classification Criteria

**Should be AGENT when:**
- Task requires fresh context (deep research, complex multi-step work)
- Work should be offloaded to preserve main conversation focus
- Output is a single result returned to main conversation
- Task is self-contained and doesn't need conversation history

**Should be CONSULTANT when:**
- Task is providing expert advice or decision guidance
- Needs conversation context to give relevant advice
- Main agent should implement the advice (not delegate implementation)
- Guidance applies to current work, not a separate workflow
