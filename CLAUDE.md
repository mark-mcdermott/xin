# CLAUDE.md

**Educational desktop app project**: Electron + React + TypeScript + Tailwind CSS + CodeMirror

## Context Loading (On-Demand Only)
**Status**: @docs/learning-progress.md
**Curriculum**: @docs/lessons/00-curriculum-outline.md
**Git Guide**: @docs/git-complete-guide.md

## Agents (Delegate via Task tool)
**Index**: @.claude/agents/README.md (selection guide)
**Git**: @.claude/agents/git-manager.md (complex: conflicts, rebase, PRs)
**Docs**: @.claude/agents/documentation.md (progress updates)

## Consultants (Load inline for advice)
**React Expert**: @.claude/agents/react-expert.md (hooks, state, components, performance)
**Electron Expert**: @.claude/agents/electron-expert.md (IPC, main/renderer, packaging)

## Always Active
**Output Style**: @.claude/output-styles/teaching-mentor.md
**Teaching Rules**: @.claude/rules/learning-workflow.md

## Skills (Claude can invoke proactively or user can request)
**Index**: @.claude/skills/README.md (skill discovery)

| Command | Purpose |
|---------|---------|
| `/lesson-start` | Full session initialization |
| `/app-test` | Test the app for errors (Playwright) |
| `/progress-review` | Spaced repetition review |
| `/commit` | Quick git commits with conversation context |
| `/educational-workflow` | Session structure and checkpoint patterns |
| `/docs-audit` | Audit documentation architecture |

## Stack & Patterns
**Tech**: Electron 39 + React 19 + TypeScript 5 + Vite 7 + Tailwind CSS 4 + CodeMirror 6 + Zustand
**App**: Desktop note-taking/journaling with blog publishing (Xun)
**Workflow**: Subagent delegation + educational commits

## MCP Servers
1. **Context7** - For up-to-date library documentation. Use before writing code with React, Tailwind CSS 4, CodeMirror, or Electron APIs.
2. **Playwright** - For browser automation and testing. Use to verify features, debug UI issues, run E2E tests.

## Context Management
- Use subagents liberally to preserve main context
- **Git routing** (see rules/learning-workflow.md):
  - Read-only (status/log/diff) -> Direct execution
  - Simple commits -> `/commit` skill (has conversation context)
  - Complex (conflicts/rebase/PRs) -> git-manager agent
- Documentation -> documentation agent
- Teaching protocols -> rules (learning-workflow.md, always active)
- Load context modules only as needed

### Automated Workflow
1. **Session start**: Progress auto-loaded via SessionStart hook
2. **Code edits**: Test reminder injected after React/Electron file edits
3. **Commits**: Checklist injected before git commits
4. **Skills**: Claude can invoke proactively based on context

### Recovery
If overloaded: checkpoint via git-manager, fresh session with minimal context

## Detailed Context Modules
**Index**: @docs/context-modules/README.md (module selection)
- @docs/context-modules/progress-tracking.md - Spaced repetition tracking
- @docs/context-modules/learning-phases.md - Phase definitions
- @docs/context-modules/platform-specs.md - Architecture + tech specs

## Session Behavior
**Rules**: @.claude/rules/learning-workflow.md (teaching protocols, note-taking, lesson delivery)
**Lessons**: @docs/lessons/README.md (lesson navigation and structure)

## Student Profile
**Background**: ~15 years QA, ~5 years light frontend, MS in Software Engineering
**Goal**: FAANG-level engineering competence, rebuild Xun from scratch understanding
**Approach**: Vibe-coded Xun quickly, now wants to deeply understand every piece
**Strengths**: Testing instincts, theoretical CS background, systematic thinker
**Growth areas**: Deep frontend/React patterns, Electron internals, system design at scale
