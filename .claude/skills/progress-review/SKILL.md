# Progress Review Skill

Spaced repetition review for reinforcing learned concepts.

## Review Session Structure

1. **Load progress** from @docs/context-modules/progress-tracking.md
2. **Identify review candidates** based on spaced repetition schedule
3. **Generate questions** at appropriate depth level
4. **Conduct review** interactively
5. **Update tracking** with new confidence levels and review dates

## Spaced Repetition Schedule

| Review # | Interval | Purpose |
|----------|----------|---------|
| 1 | Day 1 | Immediate reinforcement |
| 2 | Day 3 | Short-term retention |
| 3 | Day 7 | Week-level retention |
| 4 | Day 14 | Consolidation |
| 5 | Day 30 | Long-term retention |
| 6 | Day 90 | Mastery verification |

## Focus Areas

### Electron
- Main vs renderer process responsibilities
- IPC patterns (invoke/handle vs send/on)
- Preload script and context bridge
- Security model
- App lifecycle

### React
- Hooks mental model (rendering as snapshots)
- useEffect cleanup and dependency arrays
- State management patterns (local vs Zustand)
- Component composition patterns
- Performance optimization triggers

### TypeScript
- Strict mode implications
- Generic patterns
- Utility types (Partial, Pick, Omit, etc.)
- Discriminated unions
- Type narrowing

### CodeMirror
- Extension architecture
- State vs view separation
- Transaction model
- Custom decorations and widgets

### Tailwind CSS
- Utility-first mental model
- Responsive design patterns
- Custom configuration
- v4 changes from v3

### Build Tooling
- Vite dev server vs build
- HMR (Hot Module Replacement)
- Electron + Vite integration
- Path aliases and module resolution

## Question Types

| Level | Purpose | Example |
|-------|---------|---------|
| **L1: Recall** | Can you name it? | "What are the three Electron processes?" |
| **L2: Explain** | Can you describe it? | "Why does Electron use a preload script?" |
| **L3: Apply** | Can you use it? | "Write an IPC handler for file reading" |
| **L4: Analyze** | Can you compare? | "When would you use invoke/handle vs send/on?" |
| **L5: Create** | Can you build it? | "Design the IPC layer for a new feature" |
