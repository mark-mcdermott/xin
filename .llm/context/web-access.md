# Application Access

## Development Environment

### Electron Desktop App
- **Dev Mode:** Launched via `npm run dev`
- **Window:** Electron window with React renderer
- **DevTools:** Cmd+Option+I to open Chrome DevTools in Electron
- **HMR:** Vite provides hot module replacement for the renderer

### Playwright MCP Server

This project has a Playwright MCP server configured for browser automation and testing. Agents can use it to:

**Navigation & Inspection:**
- `mcp__playwright__browser_navigate` - Navigate to URLs
- `mcp__playwright__browser_snapshot` - Get accessibility tree (best for element inspection)
- `mcp__playwright__browser_take_screenshot` - Capture visual state

**Interaction:**
- `mcp__playwright__browser_click` - Click elements
- `mcp__playwright__browser_type` - Type into fields
- `mcp__playwright__browser_fill_form` - Fill multiple form fields
- `mcp__playwright__browser_select_option` - Select dropdown options
- `mcp__playwright__browser_hover` - Hover over elements

**Debugging:**
- `mcp__playwright__browser_console_messages` - View console output
- `mcp__playwright__browser_network_requests` - View network activity
- `mcp__playwright__browser_evaluate` - Run JavaScript in page

**Tab Management:**
- `mcp__playwright__browser_tabs` - List, create, close, or select tabs
- `mcp__playwright__browser_close` - Close the browser

Use Playwright MCP for:
- Interactive test development and debugging
- Visual verification of UI changes
- Exploratory testing
- Debugging E2E test failures
- Verifying accessibility tree structure

**IMPORTANT: After implementing any feature, always use Playwright MCP to verify it works:**
1. Navigate to the relevant page
2. Interact with the feature (click, type, fill forms)
3. Verify expected behavior with snapshots and screenshots
4. If it fails: Fix the code, then test again
5. Iterate until the feature works as expected

### Context7 MCP Server

Use Context7 for up-to-date library documentation:
- `mcp__context7__resolve-library-id` - Find library IDs
- `mcp__context7__query-docs` - Query documentation

Always use before writing code with:
- React 19 (hooks, patterns)
- Tailwind CSS 4 (new syntax)
- CodeMirror 6 (editor APIs)

## Data Storage

### Local Vault
- User's vault directory (default: `~/Documents/XunVault`)
- Markdown files for all notes
- JSON files for app configuration

### App Data
- Electron stores app preferences in standard OS locations
- macOS: `~/Library/Application Support/Xun/`

## No External Services

Xun is a fully local application:
- No external database
- No cloud sync
- No authentication service
- No API keys required

## Production Build

```bash
npm run package
```

Output: `release/Xun-{version}.dmg`

## Security Notes

- All data stays local on the user's machine
- No network requests except for optional blog publishing
- File system access limited to user-selected vault directory
- Electron contextBridge for safe IPC between processes
