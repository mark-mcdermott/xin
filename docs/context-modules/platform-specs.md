# Platform Architecture & Specs

## Technology Stack

### Desktop Framework
- **Electron 39** - Chromium + Node.js desktop runtime
- **vite-plugin-electron** - Vite integration for Electron dev workflow
- **electron-builder** - macOS DMG packaging

### UI & Frontend
- **React 19** - UI component framework
- **TypeScript 5** - Strict mode type safety
- **Tailwind CSS 4** - Utility-first styling (with @tailwindcss/postcss)
- **Zustand 5** - Lightweight state management
- **Lucide React** - Icon library

### Editor
- **CodeMirror 6** - Extensible code/markdown editor
  - @codemirror/view, state, commands, lang-markdown, language, autocomplete, lint
- **react-markdown** - Markdown to React rendering
- **remark-gfm** - GitHub Flavored Markdown support
- **rehype-raw** - Raw HTML passthrough
- **rehype-sanitize** - HTML sanitization
- **highlight.js / prismjs** - Syntax highlighting
- **katex** - LaTeX math rendering

### Testing
- **Playwright** - E2E testing framework
- **@playwright/test** - Test runner

### Build & Dev Tools
- **Vite 7** - ESM dev server + Rollup bundler
- **ESLint 9** + @typescript-eslint - Linting
- **Prettier 3** - Code formatting
- **PostCSS** + Autoprefixer - CSS processing

## Project Structure

```
xun/
|-- src/
|   |-- main/              # Electron main process
|   |   |-- index.ts       # App entry, window creation
|   |   |-- ipc/           # IPC handlers (file ops, vault, etc.)
|   |   |-- cms/           # CMS/blog management
|   |   |-- publish/       # Blog publishing logic
|   |   |-- vault/         # Vault/file management
|   |   |-- menu.ts        # App menu configuration
|   |   |-- ThemeManager.ts # Theme management
|   |-- preload/
|   |   |-- index.ts       # Context bridge (IPC API exposure)
|   |-- renderer/
|       |-- App.tsx         # Root React component
|       |-- index.tsx       # React entry point
|       |-- components/     # React UI components
|       |-- hooks/          # Custom React hooks
|       |-- stores/         # Zustand stores
|       |-- utils/          # Utilities (spellcheck, etc.)
|       |-- lib/            # Library code
|       |-- features/       # Feature modules
|       |-- data/           # Static data files
|       |-- assets/         # Images, fonts
|       |-- styles/         # CSS files
|-- tests/                  # E2E test files
|-- .claude/                # Claude Code configuration
|-- docs/                   # Learning documentation
|-- dist/                   # Build output
|-- release/                # Packaged app
```

## Key Commands

```bash
npm run dev          # Development server with HMR
npm run build        # TypeScript compile + Vite build
npm run package      # Build + macOS DMG packaging
npm run test:e2e     # Playwright E2E tests
npm run lint         # ESLint
npm run lint:fix     # ESLint with auto-fix
npm run format       # Prettier formatting
npm run typecheck    # TypeScript validation (--noEmit)
```

## Architecture Notes

### Electron Process Model
- **Main process**: Node.js runtime. File I/O, native APIs, window management.
- **Renderer process**: Chromium. React UI, user interaction, visual state.
- **Preload script**: Bridge layer. Exposes typed IPC API via contextBridge.

### State Management
- **Zustand stores**: Global app state (current file, sidebar state, settings)
- **React local state**: Component-specific UI state
- **CodeMirror state**: Editor content and cursor (separate from React)

### IPC Channels
- File operations: read, write, list, delete, rename
- Vault management: open vault, create daily note
- Blog publishing: push to GitHub, poll Cloudflare build status
- Settings: read/write app preferences
- Theme: get/set system theme

### Blog Publishing Flow
1. User writes post in === block or @ format
2. Clicks publish (rocket icon)
3. Main process: parse frontmatter, create/update file in GitHub repo
4. Main process: poll Cloudflare Pages for build status
5. Renderer: show progress bar, update status on completion
