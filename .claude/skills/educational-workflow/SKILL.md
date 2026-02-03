# Educational Workflow Skill

Structured patterns for educational sessions on the Xin codebase.

## Learning Session Start
1. Check @docs/learning-progress.md for current status
2. Verify environment: `npm run dev` works
3. Prepare git branch if needed (delegate to git-manager)
4. Set session objectives (1-3 specific goals)

## Implementation Cycle
For each concept being learned:

1. **Explain** - Teach the concept with context from Xin's actual code
2. **Prototype** - Build or modify something hands-on
3. **Test** - Verify it works (`/app-test` or manual verification)
4. **Commit** - Save progress (`/commit`)
5. **Extend** - Challenge: modify or expand what was built

## Session Close
1. **Test**: Run full test suite
2. **Checkpoint**: Commit all work (`/commit`)
3. **Update docs**: Delegate to documentation agent
4. **Preview next**: Identify next session's focus

## Note-Taking During Sessions
After each concept is learned, create/update notes in `docs/notes/`:
- Write from student perspective ("I learned...", "This clicked when...")
- Capture key insights and mental models
- Note misconceptions that were corrected
- List questions for future exploration

## MANDATORY Testing
Run tests after:
- Any React component changes
- Any IPC handler changes
- Any Electron main process changes
- Any CodeMirror extension changes
- Before any commit

## Phase-Specific Patterns

### Start Phase
- Load progress, set objectives, prepare environment

### Implement Phase
- Explain concept -> code it -> test it -> commit -> extend

### Close Phase
- Full test -> checkpoint commit -> update docs -> preview next
