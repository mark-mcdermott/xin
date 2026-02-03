# App Test Skill

Playwright-based testing for the Xun Electron app.

## Workflow

1. **Run existing E2E tests**: `npm run test:e2e`
2. **Check test results**: Review pass/fail and console output
3. **If tests pass**: Report success
4. **If tests fail**: Analyze failure, suggest fix

## Testing Standards

### Pass Criteria
- All Playwright tests pass
- No unhandled errors in console
- Core user flows work (create note, edit, save, navigate)

### Common Issues to Check
- IPC communication errors between main and renderer
- File system permission issues
- React rendering errors or unhandled promise rejections
- CodeMirror initialization failures
- Tailwind class conflicts or missing styles

### What to Test Manually (Playwright MCP)
If E2E tests are insufficient, use Playwright MCP to verify:
1. App launches and shows sidebar
2. Can create a new daily note
3. Editor loads and accepts input
4. Markdown preview renders correctly
5. Tag sections work (open/close with #tag and ---)
6. Blog post template macro (===) works
7. Settings panel opens and saves

## Integration
- Run after any code changes that affect UI or IPC
- Run before committing (part of pre-commit workflow)
- Use `/commit` skill after tests pass
