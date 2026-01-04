# Project Structure

## Top-Level Layout

```
xin/
├── src/
│   ├── main/                    # Electron main process
│   │   ├── index.ts             # Main entry point
│   │   ├── ipc/                  # IPC handlers
│   │   └── utils/                # Main process utilities
│   ├── preload/                  # Preload scripts
│   │   └── index.ts              # IPC bridge for renderer
│   ├── renderer/                 # React renderer process
│   │   ├── components/           # React components
│   │   ├── hooks/                # Custom React hooks
│   │   ├── styles/               # CSS and Tailwind styles
│   │   ├── utils/                # Utility functions
│   │   ├── App.tsx               # Root React component
│   │   ├── main.tsx              # React entry point
│   │   └── index.html            # HTML template
├── e2e/                          # Playwright E2E tests
├── resources/                    # App resources (icons, etc.)
├── .llm/                         # LLM context and guidelines
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── tailwind.config.js
├── postcss.config.js
├── playwright.config.ts
└── electron-builder.json
```

## Key Directories

### `/src/main` - Electron Main Process

Server-side Electron code:
- `index.ts` - App lifecycle, window creation, menu setup
- `ipc/` - IPC handlers for file operations, vault management
- `utils/` - File system utilities, path helpers

### `/src/preload` - Preload Scripts

Bridge between main and renderer:
- `index.ts` - contextBridge API exposure
- Exposes safe IPC methods to renderer

### `/src/renderer` - React UI

Frontend React application:
- `components/` - React components
  - `Editor/` - CodeMirror markdown editor
  - `Sidebar/` - File tree and navigation
  - `Tabs/` - Tab management
  - `ui/` - Shared UI components
- `hooks/` - Custom React hooks
- `styles/` - CSS files and Tailwind config
- `utils/` - Client-side utilities
- `App.tsx` - Root component with layout
- `main.tsx` - React DOM render entry

### `/e2e` - E2E Tests

Playwright test files (`*.test.ts`):
- Navigation tests
- Editor functionality tests
- File operations tests

### `/resources` - App Resources

Static resources for packaging:
- `icon.icns` - macOS app icon
- Other platform-specific assets

### `/.llm` - LLM Context

Project documentation for AI assistants:
- Context files, rules, workflows, commands

## Naming Conventions

- **Components:** PascalCase (`Editor.tsx`, `Sidebar.tsx`, `FileTree.tsx`)
- **Hooks:** camelCase with `use` prefix (`useVault.ts`, `useEditor.ts`)
- **Utilities:** camelCase (`utils.ts`, `fileHelpers.ts`)
- **Styles:** kebab-case (`index.css`, `editor-styles.css`)
- **Tests:** `*.test.ts` or `*.spec.ts`

## Electron Process Model

```
┌─────────────────────────────────────────────────┐
│                  Main Process                    │
│  - Window management                            │
│  - File system operations                       │
│  - Native menus and dialogs                     │
│  - IPC handlers                                 │
└─────────────────────────────────────────────────┘
                       │
                 IPC Bridge
                       │
┌─────────────────────────────────────────────────┐
│               Preload Script                     │
│  - contextBridge.exposeInMainWorld              │
│  - Safe API surface for renderer                │
└─────────────────────────────────────────────────┘
                       │
                  window.api
                       │
┌─────────────────────────────────────────────────┐
│              Renderer Process                    │
│  - React UI                                     │
│  - CodeMirror editor                            │
│  - User interactions                            │
└─────────────────────────────────────────────────┘
```

## Build & Package

```bash
npm run dev           # Development mode with HMR
npm run build         # Production build
npm run package       # Build and package as macOS DMG
```

## Output Directories

- `dist/` - Compiled JavaScript output
  - `dist/main/` - Main process bundle
  - `dist/preload/` - Preload script bundle
  - `dist/renderer/` - Renderer bundle (Vite output)
- `release/` - Packaged application (DMG, etc.)
