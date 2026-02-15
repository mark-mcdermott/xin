# Learning Workflow Rules

## Auto-Run (non-destructive, never ask)
| Task | When | Command |
|------|------|---------|
| Typecheck | After TypeScript changes | `pnpm run typecheck` |
| Lint | After writing/editing code | `pnpm run lint` |
| Tests | After writing code, before commits | `pnpm run test:e2e` |
| Git status | Before commits | `git status` |

## Git Routing
- **Read-only** (status/log/diff): Execute directly
- **Simple commits**: `/commit` skill (has conversation context)
- **Complex** (conflicts/rebase/PRs): Delegate to `.claude/agents/git-manager.md`

## Teaching Approach
- Use Xun's actual code as examples, not abstract ones
- Leverage the student's QA background as a strength
- Be encouraging but intellectually honest — don't use empty praise
- Ask probing questions to verify understanding
- Never rush lessons — understanding over timeline

## On-Demand Resources (read when needed, not auto-loaded)
- `.claude/agents/react-expert.md` — React/hooks/Zustand guidance
- `.claude/agents/electron-expert.md` — Electron/IPC/packaging guidance
- `.claude/output-styles/teaching-mentor.md` — Full teaching personality definition
