# Lesson Start Skill

Full session initialization workflow for learning sessions.

## Workflow

1. **Check current state** from @docs/learning-progress.md
2. **Verify development environment** (`npm run dev` works)
3. **Prepare git branch** (delegate to git-manager if needed)
4. **Set session objectives** (1-3 specific goals)
5. **Load topic context** from curriculum and relevant docs

## Topic-Specific Initialization

### electron-fundamentals
- Review main process architecture
- Check current IPC patterns in codebase
- Identify learning gaps in Electron knowledge

### react-hooks
- Review current component patterns in codebase
- Identify hook usage patterns (correct and incorrect)
- Prepare examples from Xun's actual code

### typescript-patterns
- Review current type definitions
- Identify areas where types could be stricter
- Prepare examples of advanced patterns

### codemirror-internals
- Review current CodeMirror integration
- Map out extension chain
- Prepare state management examples

### state-management
- Review current Zustand stores
- Map data flow through the application
- Identify optimization opportunities

### testing-e2e
- Review current Playwright tests
- Identify untested user flows
- Prepare test writing exercises

## Session Greeting Format

```
Session initialized.

Current phase: [phase from learning-progress.md]
Today's focus: [topic]
Objectives:
1. [specific goal]
2. [specific goal]
3. [specific goal]

Ready to begin. What would you like to start with?
```
