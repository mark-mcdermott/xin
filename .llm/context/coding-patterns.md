# Coding Patterns

## Documentation Verification (Context7)

Before writing code using these libraries, **always use Context7 MCP** to verify current syntax:

- **React 19** - Hooks and patterns; verify useState, useEffect, useContext usage
- **Tailwind CSS 4** - New syntax and features; verify utility classes
- **CodeMirror 6** - Editor APIs change; verify extension and view patterns

This ensures generated code uses current syntax rather than outdated training data.

## React Patterns

### Component Structure
- Use functional components with hooks
- Keep components small and focused
- Co-locate related logic within components
- Extract reusable logic into custom hooks

### State Management
- Use `useState` for local component state
- Use `useReducer` for complex state logic
- Use React Context for shared state across components
- Prefer lifting state up over deep prop drilling

### Effects
- Use `useEffect` for side effects
- Always include cleanup functions when needed
- Avoid unnecessary effect dependencies

### Component Example
```tsx
import { useState, useEffect, useCallback } from 'react';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function Editor({ content, onChange }: EditorProps) {
  const [localContent, setLocalContent] = useState(content);

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const handleChange = useCallback((newContent: string) => {
    setLocalContent(newContent);
    onChange(newContent);
  }, [onChange]);

  return (
    <div className="editor-container">
      {/* Editor implementation */}
    </div>
  );
}
```

## CodeMirror 6 Patterns

### Basic Editor Setup
```tsx
import { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { markdown } from '@codemirror/lang-markdown';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';

export function useCodeMirror(
  containerRef: React.RefObject<HTMLDivElement>,
  content: string,
  onChange: (content: string) => void
) {
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const state = EditorState.create({
      doc: content,
      extensions: [
        markdown(),
        history(),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChange(update.state.doc.toString());
          }
        }),
      ],
    });

    const view = new EditorView({
      state,
      parent: containerRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
    };
  }, [containerRef]);

  return viewRef;
}
```

### Custom Extensions
```typescript
import { Decoration, DecorationSet, ViewPlugin, ViewUpdate } from '@codemirror/view';

const highlightPlugin = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;

    constructor(view: EditorView) {
      this.decorations = this.buildDecorations(view);
    }

    update(update: ViewUpdate) {
      if (update.docChanged || update.viewportChanged) {
        this.decorations = this.buildDecorations(update.view);
      }
    }

    buildDecorations(view: EditorView): DecorationSet {
      // Build decorations based on document content
      return Decoration.none;
    }
  },
  { decorations: (v) => v.decorations }
);
```

## Electron IPC Patterns

### Main Process Handler
```typescript
// src/main/ipc/fileHandlers.ts
import { ipcMain } from 'electron';
import { readFile, writeFile } from 'fs/promises';

export function registerFileHandlers() {
  ipcMain.handle('file:read', async (_, path: string) => {
    try {
      return await readFile(path, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to read file: ${path}`);
    }
  });

  ipcMain.handle('file:write', async (_, path: string, content: string) => {
    try {
      await writeFile(path, content, 'utf-8');
      return true;
    } catch (error) {
      throw new Error(`Failed to write file: ${path}`);
    }
  });
}
```

### Preload Script
```typescript
// src/preload/index.ts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  readFile: (path: string) => ipcRenderer.invoke('file:read', path),
  writeFile: (path: string, content: string) =>
    ipcRenderer.invoke('file:write', path, content),
  onFileChange: (callback: (path: string) => void) =>
    ipcRenderer.on('file:changed', (_, path) => callback(path)),
});
```

### Renderer Usage
```typescript
// src/renderer/hooks/useFile.ts
export function useFile(path: string) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    window.api.readFile(path)
      .then(setContent)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [path]);

  const save = useCallback(async (newContent: string) => {
    await window.api.writeFile(path, newContent);
    setContent(newContent);
  }, [path]);

  return { content, loading, save };
}
```

## Tailwind CSS Patterns

### Component Styling
```tsx
// Use className with Tailwind utilities
<div className="flex flex-col h-full bg-gray-900 text-gray-100">
  <header className="flex items-center h-12 px-4 border-b border-gray-700">
    <h1 className="text-lg font-semibold">Xin</h1>
  </header>
  <main className="flex-1 overflow-auto">
    {/* Content */}
  </main>
</div>
```

### Conditional Classes
```tsx
import { clsx } from 'clsx';

<button
  className={clsx(
    'px-4 py-2 rounded transition-colors',
    isActive
      ? 'bg-blue-600 text-white'
      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
  )}
>
  Click me
</button>
```

## Error Handling

### Async Operations
```typescript
async function loadFile(path: string): Promise<string> {
  try {
    const content = await window.api.readFile(path);
    return content;
  } catch (error) {
    console.error(`Failed to load file: ${path}`, error);
    throw error;
  }
}
```

### Error Boundaries
```tsx
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
```

## File System Patterns

### Path Handling
```typescript
import { join, basename, dirname, extname } from 'path';

// Always use path.join for cross-platform compatibility
const filePath = join(vaultPath, 'daily', `${date}.md`);

// Extract file info
const fileName = basename(filePath); // "2025-01-03.md"
const fileDir = dirname(filePath);   // "/path/to/vault/daily"
const fileExt = extname(filePath);   // ".md"
```

### Reading Directory Contents
```typescript
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

interface FileNode {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: FileNode[];
}

async function buildFileTree(dirPath: string): Promise<FileNode[]> {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const nodes: FileNode[] = [];

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    const node: FileNode = {
      name: entry.name,
      path: fullPath,
      isDirectory: entry.isDirectory(),
    };

    if (entry.isDirectory()) {
      node.children = await buildFileTree(fullPath);
    }

    nodes.push(node);
  }

  return nodes.sort((a, b) => {
    // Directories first, then alphabetical
    if (a.isDirectory !== b.isDirectory) {
      return a.isDirectory ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });
}
```

## Icon Usage with Lucide React

```tsx
import { File, Folder, ChevronRight, ChevronDown, Plus, X } from 'lucide-react';

<File className="h-4 w-4" />
<Folder className="h-4 w-4" />
<ChevronRight className="h-4 w-4" />
```

## Async Patterns

- Prefer async/await over raw promises
- Use loading states in UI during async operations
- Handle errors gracefully with user feedback
- Debounce rapid user inputs (search, typing)

```typescript
import { useMemo } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```
