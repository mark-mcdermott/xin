# Testing Strategy

## File Organization

- **E2E Tests:** `e2e/**/*.test.ts` (Playwright)

## Test Scripts

```bash
npm run test:e2e      # Run Playwright E2E tests
npm run test:e2e:ui   # Run Playwright with interactive UI
```

## Test Types

| Type | Tools      | Purpose                          |
| ---- | ---------- | -------------------------------- |
| E2E  | Playwright | Full user flows in Electron app  |

## What to Test

### E2E Tests
- Application startup and window creation
- File tree navigation
- Creating and editing notes
- Tab management
- Markdown editor functionality
- File save/load operations
- Tag parsing and display
- Keyboard shortcuts

## Playwright MCP Server

This project has a Playwright MCP server for interactive testing. **IMPORTANT: After implementing any feature, always use Playwright MCP to verify it works:**

1. **Navigate** to the relevant page using `mcp__playwright__browser_navigate`
2. **Interact** with the feature (click, type, fill forms)
3. **Verify** expected behavior with snapshots and screenshots
4. **If it fails**: Fix the code, then test again
5. **Iterate** until the feature works as expected

This verification loop is mandatory for all UI features and user flows.

**Available MCP tools:**
- `mcp__playwright__browser_navigate` - Navigate to URLs
- `mcp__playwright__browser_snapshot` - Capture accessibility tree for element inspection
- `mcp__playwright__browser_take_screenshot` - Visual verification
- `mcp__playwright__browser_click` - Click elements
- `mcp__playwright__browser_type` - Type into inputs
- `mcp__playwright__browser_fill_form` - Fill form fields

## Playwright E2E Testing

### Configuration

`playwright.config.ts`:
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test';

test('app window loads', async ({ page }) => {
  // Navigate to the Electron app's renderer
  await page.goto('/');
  await expect(page.locator('.app-container')).toBeVisible();
});

test('can create a new note', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="new-note"]');
  await page.fill('[data-testid="note-title"]', 'Test Note');
  await page.click('[data-testid="save"]');
  await expect(page.locator('.file-tree')).toContainText('Test Note');
});

test('editor accepts input', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="editor"]');
  await page.keyboard.type('# Hello World');
  await expect(page.locator('.cm-content')).toContainText('Hello World');
});
```

## Development Workflow

1. Implement feature
2. Use Playwright MCP to verify UI manually
3. Write E2E test to capture the behavior
4. Run `npm run test:e2e` for full verification
5. Commit when all tests pass

## Principles

- Test user-visible behavior, not implementation details
- Focus on critical user flows
- Keep tests fast and deterministic
- Use Playwright MCP for interactive debugging
- Tests should work with the Electron app in development mode
