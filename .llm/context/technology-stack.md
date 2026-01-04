# Technology Stack

## Runtime Versions

- Node.js 22 (LTS)
- npm (package manager)
- TypeScript 5 (strict mode enabled)

## Desktop Framework

- Electron 39 (desktop application framework)
- vite-plugin-electron (Electron integration with Vite)
- vite-plugin-electron-renderer (renderer process support)
- electron-builder (packaging and distribution)

## Web Framework

- React 19 (UI framework)
- Vite 7 (build tool and dev server)
- @vitejs/plugin-react (React HMR and JSX support)

## UI and Styling

- Tailwind CSS 4 (utility-first styling)
- @tailwindcss/postcss (PostCSS integration)
- @tailwindcss/typography (prose styling for rendered markdown)
- Lucide React (icon library)

## Markdown Editor

- CodeMirror 6 (extensible code/markdown editor)
  - @codemirror/view (editor view layer)
  - @codemirror/state (state management)
  - @codemirror/commands (keybindings and commands)
  - @codemirror/lang-markdown (markdown language support)
  - @codemirror/language (language infrastructure)
  - @codemirror/autocomplete (completion support)
  - @lezer/highlight (syntax highlighting)

## Markdown Rendering

- react-markdown (markdown to React components)
- remark-gfm (GitHub Flavored Markdown support)
- rehype-raw (raw HTML passthrough)
- rehype-sanitize (HTML sanitization)

## Testing

- Playwright (E2E testing)
- @playwright/test (test runner)

## Development Tools

- ESLint 9 (linting)
- @typescript-eslint (TypeScript linting)
- Prettier (code formatting)
- PostCSS (CSS processing)
- Autoprefixer (CSS vendor prefixes)

## Data Storage

- Local filesystem (markdown files in user's vault)
- JSON files for app configuration and metadata
- No external database

## Build & Package

- electron-builder (macOS DMG packaging)
- Vite production builds
- TypeScript compilation

## MCP Servers (Claude Code Integration)

- **Context7** - Up-to-date library documentation for React, Tailwind CSS 4, CodeMirror
- **Playwright** - Browser automation for testing and verification

## Package Scripts

```bash
npm run dev           # Start Vite dev server with Electron
npm run build         # TypeScript compile + Vite production build
npm run preview       # Preview production build
npm run typecheck     # TypeScript type checking
npm run lint          # ESLint checking
npm run lint:fix      # ESLint with auto-fix
npm run format        # Prettier formatting
npm run test:e2e      # Run Playwright E2E tests
npm run test:e2e:ui   # Run Playwright with UI
npm run package       # Build and package as macOS DMG
npm run clean         # Clear build artifacts
```

## Key Dependencies

### Production
- `electron` - Desktop framework
- `react` - UI framework
- `react-dom` - React DOM rendering
- `@codemirror/*` - Markdown editor
- `react-markdown` - Markdown rendering
- `lucide-react` - Icons
- `remark-gfm` - GFM markdown support
- `rehype-raw` - Raw HTML in markdown
- `rehype-sanitize` - HTML sanitization

### Development
- `vite` - Build tool
- `vite-plugin-electron` - Electron integration
- `electron-builder` - App packaging
- `tailwindcss` - Styling
- `typescript` - Type safety
- `@playwright/test` - E2E testing
- `eslint` - Linting
- `prettier` - Formatting
