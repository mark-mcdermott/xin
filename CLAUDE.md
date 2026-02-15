# CLAUDE.md

**Xin**: Desktop note-taking app with blog publishing. Electron 39 + React 19 + TypeScript 5 + Vite 7 + Tailwind CSS 4 + CodeMirror 6 + Zustand.

## Commands
```
pnpm run dev          # Dev server with HMR
pnpm run build        # TypeScript compile + Vite build
pnpm run typecheck    # TypeScript validation
pnpm run lint         # ESLint
pnpm run test:e2e     # Playwright E2E tests
pnpm run package      # Build + macOS DMG packaging
```

## Commit Rules (CRITICAL)
- One gitmoji + one sentence. No bullet lists, no multiline bodies.
- No AI attribution. No co-author lines, no signatures, no references to Claude/AI.
- Commit as the developer (Mark McDermott), never as Claude.

## Skills
| Command | Purpose |
|---------|---------|
| `/commit` | Git commit with conversation context |
| `/app-test` | Run Playwright E2E tests |
| `/lesson-start` | Initialize a learning session |
| `/progress-review` | Spaced repetition review |

## Project Structure
```
src/main/           # Electron main process (IPC, file ops, publishing)
src/preload/        # Context bridge (secure IPC exposure)
src/renderer/       # React UI (components, hooks, stores)
tests/e2e/          # Playwright E2E tests
.claude/agents/     # Agents & consultants (read on demand, not auto-loaded)
.claude/skills/     # Skill definitions
.claude/rules/      # Always-active rules
```

## Student Profile
~15yr QA, ~5yr frontend, MS in Software Engineering. Built Xin via vibe-coding, learning to deeply understand every piece. Goal: FAANG-level engineering.
