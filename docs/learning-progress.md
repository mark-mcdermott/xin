# Learning Progress

## Current Status
- **Phase**: Part 1 - Understanding What You Built
- **Branch**: `main` or `learn/[topic]` (for learning branches)
- **Focus**: Deep dive into Xin's Electron + React architecture
- **Pattern**: Reverse-engineer the app you built, then expand outward

## Immediate Next Steps
1. **Lesson 01-01**: The Electron Process Model (main vs renderer vs preload)
2. **Lesson 01-02**: Xin's Main Process Deep Dive (walk through src/main/index.ts)
3. **Lesson 01-03**: The Preload Bridge (contextBridge, security model)

## Curriculum Location
**Full outline**: `docs/lessons/00-curriculum-outline.md`

## Skills Status

### Xin Technologies
- [ ] Electron internals (main process, IPC, preload)
- [ ] React deep understanding (hooks internals, fiber, reconciliation)
- [ ] TypeScript advanced patterns (generics, utility types, strict mode)
- [ ] CodeMirror 6 architecture (state, view, extensions, transactions)
- [ ] Zustand state management (store design, selectors, middleware)
- [ ] Tailwind CSS 4 (utility internals, configuration, v4 changes)
- [ ] Vite build system (dev server, HMR, plugin system)
- [ ] Playwright E2E testing (selectors, assertions, page objects)

### CS Fundamentals
- [ ] Data structures (arrays, trees, graphs, heaps, tries)
- [ ] Algorithms (sorting, searching, DP, greedy, backtracking)
- [ ] System design (scaling, caching, databases, distributed systems)
- [ ] Big O analysis

### Software Engineering
- [ ] Testing strategy (unit, integration, E2E, TDD)
- [ ] Design patterns (SOLID, factory, observer, strategy)
- [ ] Git advanced workflows (rebase, bisect, reflog)
- [ ] CI/CD (GitHub Actions, deployment pipelines)

### Interview Readiness
- [ ] LeetCode Medium in 25 min
- [ ] System design (design a note-taking app at scale)
- [ ] Behavioral (STAR stories from QA + dev experience)
- [ ] Frontend-specific (build a component live)

---

## Project Essence

**Mission**: Deeply understand every piece of Xin, fill engineering knowledge gaps, reach FAANG-level competence
**Student**: ~15yr QA, ~5yr frontend, MS in SE, vibe-coded Xin, wants to internalize everything
**Pattern**: Reverse-engineer -> fundamentals -> patterns -> scale -> interview prep

### Core Rules
- Build understanding through the actual codebase, not abstract examples
- Simple commits -> `/commit` skill; complex git -> git-manager agent
- Subagents preserve context
- Never rush lessons - understanding over timeline
- One sentence gitmoji commit messages, no AI attribution

### Critical Agents
- **Git**: @.claude/agents/git-manager.md
- **Docs**: @.claude/agents/documentation.md

---

## Decisions Log

### Learning Architecture

**Reverse-Engineering Approach**
- Start by understanding what was already built
- More engaging than starting from scratch
- Provides immediate context for all concepts
- Builds confidence: "I already built something that works"

**FAANG Prep Integration**
- Every topic connects to interview expectations
- DSA practice woven throughout, not isolated
- System design built on actual architecture experience
- Behavioral prep leverages unique QA + dev background

### Technology Stack (Xin)

**Electron for Desktop**
- Chromium + Node.js runtime
- IPC-based architecture with security boundaries
- macOS-specific features via native APIs

**React 19 + TypeScript 5**
- Strict mode TypeScript for type safety
- Zustand for state management (lighter than Redux)
- CodeMirror 6 for the editor (functional architecture)

**Vite 7 + Tailwind CSS 4**
- ESM-based dev server with HMR
- Utility-first CSS with PostCSS integration
- electron-builder for macOS packaging

---

## Agent Context
**Ready for Phase 1: Understanding the Xin codebase.**

**Detailed progression**: @docs/context-modules/learning-phases.md
**Platform architecture**: @docs/context-modules/platform-specs.md
**Success metrics**: @docs/context-modules/progress-tracking.md

*Updated*: 2026-02-03
