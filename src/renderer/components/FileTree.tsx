import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, FileText, Folder, Rocket } from 'lucide-react';
import type { FileNode } from '../../preload';

interface FileTreeNodeProps {
  node: FileNode;
  onFileClick?: (path: string) => void;
  onRemoteFileClick?: (blogId: string, path: string) => void;
  onPublishRemote?: (blogId: string, path: string) => void;
  onDelete?: (path: string, type: 'file' | 'folder') => void;
  onDeleteRemote?: (blogId: string, path: string, sha: string, fileName: string) => void;
  onMoveFile?: (sourcePath: string, destFolder: string) => void;
  onCreateInFolder?: (folderPath: string, type: 'file' | 'folder') => void;
  level?: number;
  ancestorHasMoreSiblings?: boolean[]; // Track which ancestor levels have more siblings below
  isLastChild?: boolean; // Whether this node is the last child of its parent
  draggedPath: string | null;
  setDraggedPath: (path: string | null) => void;
  inlineCreate: { folderPath: string; type: 'file' | 'folder' } | null | undefined;
  onInlineCreateSubmit?: (name: string) => void;
  onInlineCreateCancel?: () => void;
  renamingPath: string | null;
  onStartRename?: (path: string) => void;
  onRenameSubmit?: (oldPath: string, newName: string) => void;
  onRenameRemoteSubmit?: (blogId: string, oldPath: string, newName: string, sha: string) => void;
  onRenameCancel?: () => void;
  expandedPaths?: Set<string>; // Controlled expansion state
  onFolderToggle?: (path: string, expanded: boolean) => void;
  selectedFile?: string | null;
  displayNames?: Map<string, string>;
  multiSelectedPaths?: Set<string>;
  onFileClickWithShift?: (path: string, event: React.MouseEvent) => void;
  onDeleteSelected?: () => void;
}

const FileTreeNode: React.FC<FileTreeNodeProps> = ({
  node,
  onFileClick,
  onRemoteFileClick,
  onPublishRemote,
  onDelete,
  onDeleteRemote,
  onMoveFile,
  onCreateInFolder,
  level = 0,
  ancestorHasMoreSiblings = [],
  isLastChild = true,
  draggedPath,
  setDraggedPath,
  inlineCreate,
  onInlineCreateSubmit,
  onInlineCreateCancel,
  renamingPath,
  onStartRename,
  onRenameSubmit,
  onRenameRemoteSubmit,
  onRenameCancel,
  expandedPaths,
  onFolderToggle,
  selectedFile,
  displayNames,
  multiSelectedPaths,
  onFileClickWithShift,
  onDeleteSelected
}) => {
  const isRemote = node.source === 'remote';
  const isActive = node.type === 'file' && selectedFile === node.path;
  // Use controlled expansion if expandedPaths is provided, otherwise use local state
  // Default to collapsed on initial load
  const [localExpanded, setLocalExpanded] = useState(false);
  const isExpanded = expandedPaths ? expandedPaths.has(node.path) : localExpanded;
  const [isDragOver, setIsDragOver] = useState(false);

  const isMultiSelected = node.type === 'file' && multiSelectedPaths?.has(node.path);

  const handleClick = (e: React.MouseEvent) => {
    if (node.type === 'folder') {
      // Only use controlled mode when expandedPaths is provided
      if (expandedPaths !== undefined && onFolderToggle) {
        onFolderToggle(node.path, !isExpanded);
      } else {
        setLocalExpanded(!localExpanded);
      }
    } else if (onFileClickWithShift) {
      onFileClickWithShift(node.path, e);
    } else if (isRemote && node.remoteMeta) {
      // Handle remote file click
      // Extract the actual path from the remote path format "remote:blogId:path"
      const actualPath = node.path.replace(`remote:${node.remoteMeta.blogId}:`, '');
      onRemoteFileClick?.(node.remoteMeta.blogId, actualPath);
    } else {
      onFileClick?.(node.path);
    }
  };

  const handlePublishClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRemote && node.remoteMeta) {
      const actualPath = node.path.replace(`remote:${node.remoteMeta.blogId}:`, '');
      onPublishRemote?.(node.remoteMeta.blogId, actualPath);
    }
  };

  // Drag handlers
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', node.path);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedPath(node.path);
  };

  const handleDragEnd = () => {
    setDraggedPath(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (node.type !== 'folder') return;
    if (!draggedPath) return;
    // Don't allow dropping on self or into own parent
    if (draggedPath === node.path) return;
    // Don't allow dropping into the same folder it's already in
    const draggedParent = draggedPath.substring(0, draggedPath.lastIndexOf('/')) || '';
    if (draggedParent === node.path) return;
    // Don't allow dropping a folder into its own children
    if (draggedPath && node.path.startsWith(draggedPath + '/')) return;

    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const sourcePath = e.dataTransfer.getData('text/plain');
    if (sourcePath && node.type === 'folder' && sourcePath !== node.path) {
      onMoveFile?.(sourcePath, node.path);
    }
  };

  // Native context menu handler
  const handleContextMenu = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (node.type === 'folder') {
      const result = await window.electronAPI.contextMenu.showFolderMenu(node.path);
      if (result) {
        switch (result.action) {
          case 'new-note':
            onCreateInFolder?.(node.path, 'file');
            break;
          case 'new-folder':
            onCreateInFolder?.(node.path, 'folder');
            break;
          case 'rename':
            onStartRename?.(node.path);
            break;
          case 'delete':
            onDelete?.(node.path, 'folder');
            break;
        }
      }
    } else {
      const isMultiSel = multiSelectedPaths && multiSelectedPaths.size > 1 && multiSelectedPaths.has(node.path);
      const selectedCount = isMultiSel ? multiSelectedPaths.size : 1;
      const result = await window.electronAPI.contextMenu.showFileMenu(node.path, { isRemote, selectedCount });
      if (result) {
        switch (result.action) {
          case 'rename':
            onStartRename?.(node.path);
            break;
          case 'delete':
            if (isMultiSel && onDeleteSelected) {
              onDeleteSelected();
            } else if (isRemote && node.remoteMeta) {
              // For remote files, call onDeleteRemote with the file info
              const actualPath = node.path.replace(`remote:${node.remoteMeta.blogId}:`, '');
              onDeleteRemote?.(node.remoteMeta.blogId, actualPath, node.remoteMeta.sha, node.name);
            } else {
              onDelete?.(node.path, 'file');
            }
            break;
        }
      }
    }
  };

  // Render indent spacing for each level, with vertical lines where ancestors have more siblings
  // isFile param adjusts position since files have extra marginLeft
  const renderIndentGuides = (isFile: boolean = false) => {
    const guides = [];
    for (let i = 0; i < level; i++) {
      const showLine = ancestorHasMoreSiblings[i];
      // Files are offset by 22px, so we need to adjust the line position back
      const lineOffset = isFile ? -14 : 8;
      guides.push(
        <div
          key={i}
          className="flex-shrink-0 relative"
          style={{ width: '20px', height: '28px' }}
        >
          {showLine && (
            <div
              style={{
                position: 'absolute',
                left: `${lineOffset}px`,
                top: 0,
                bottom: 0,
                width: '1px',
                backgroundColor: 'var(--indent-guide)'
              }}
            />
          )}
        </div>
      );
    }
    return guides;
  };

  // Inline create input for this folder
  const showInlineCreate = inlineCreate && inlineCreate.folderPath === node.path;
  // Check if this node is being renamed
  const isRenaming = renamingPath === node.path;

  return (
    <div className="relative">
      <div
        className="flex items-center"
        style={{
          paddingLeft: '8px',
          marginLeft: node.type === 'file' ? '22px' : '0'
        }}
      >
        {level > 0 && renderIndentGuides(node.type === 'file')}
        {isRenaming ? (
          <InlineRenameInput
            currentName={node.name}
            type={node.type}
            level={level}
            onSubmit={(newName) => {
              if (isRemote && node.remoteMeta) {
                const actualPath = node.path.replace(`remote:${node.remoteMeta.blogId}:`, '');
                onRenameRemoteSubmit?.(node.remoteMeta.blogId, actualPath, newName, node.remoteMeta.sha);
              } else {
                onRenameSubmit?.(node.path, newName);
              }
            }}
            onCancel={() => onRenameCancel?.()}
          />
        ) : (
          <div
            className={`inline-flex items-center cursor-pointer group rounded-sm hover:bg-[var(--sidebar-hover)] hover:opacity-60 transition-all`}
            data-tree-item="true"
            style={{
              fontSize: '13.75px',
              color: 'var(--sidebar-text)',
              lineHeight: '2',
              paddingRight: '4px',
              backgroundColor: isDragOver ? 'var(--drag-over-bg)' : 'transparent'
            }}
            onClick={handleClick}
            onContextMenu={handleContextMenu}
            draggable={node.type === 'file'}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {node.type === 'folder' && (
              <ChevronRight
                size={16}
                strokeWidth={2}
                className={`transition-transform flex-shrink-0 ${isExpanded ? 'rotate-90' : ''}`}
                style={{ color: 'var(--sidebar-icon-muted)', marginRight: '6px' }}
              />
            )}
            <span className="truncate" style={{
              color: (isActive || isMultiSelected) ? 'var(--accent-primary)' : isRemote && node.type === 'folder' ? 'var(--accent-primary)' : undefined,
              fontWeight: (isActive || isMultiSelected) ? 600 : undefined
            }}>
              {displayNames?.get(node.path) || node.name.replace('.md', '')}
            </span>
            {/* Rocket icon for remote files */}
            {isRemote && node.type === 'file' && (
              <button
                onClick={handlePublishClick}
                className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity hover:opacity-80"
                style={{ color: 'var(--accent-primary)' }}
                title="Publish changes"
              >
                <Rocket size={14} strokeWidth={1.5} />
              </button>
            )}
          </div>
        )}
      </div>

      {node.type === 'folder' && isExpanded && (
        <div>
          {/* Inline create input at the top of folder contents */}
          {showInlineCreate && (
            <InlineCreateInput
              type={inlineCreate.type}
              level={level + 1}
              onSubmit={onInlineCreateSubmit!}
              onCancel={onInlineCreateCancel!}
            />
          )}
          {(() => {
            const filteredChildren = node.children?.filter(child => !child.name.startsWith('.')) || [];
            // Build the ancestorHasMoreSiblings array for children
            // Children inherit our ancestors' info, plus whether WE have more siblings
            const childAncestorInfo = [...ancestorHasMoreSiblings, !isLastChild];
            return filteredChildren.map((child, index) => {
              const isLast = index === filteredChildren.length - 1;
              return (
                <FileTreeNode
                  key={`${child.path}-${index}`}
                  node={child}
                  onFileClick={onFileClick}
                  onRemoteFileClick={onRemoteFileClick}
                  onPublishRemote={onPublishRemote}
                  onDelete={onDelete}
                  onDeleteRemote={onDeleteRemote}
                  onMoveFile={onMoveFile}
                  onCreateInFolder={onCreateInFolder}
                  level={level + 1}
                  ancestorHasMoreSiblings={childAncestorInfo}
                  isLastChild={isLast}
                  draggedPath={draggedPath}
                  setDraggedPath={setDraggedPath}
                  inlineCreate={inlineCreate}
                  onInlineCreateSubmit={onInlineCreateSubmit}
                  onInlineCreateCancel={onInlineCreateCancel}
                  renamingPath={renamingPath}
                  onStartRename={onStartRename}
                  onRenameSubmit={onRenameSubmit}
                  onRenameRemoteSubmit={onRenameRemoteSubmit}
                  onRenameCancel={onRenameCancel}
                  expandedPaths={expandedPaths}
                  onFolderToggle={onFolderToggle}
                  selectedFile={selectedFile}
                  displayNames={displayNames}
                  multiSelectedPaths={multiSelectedPaths}
                  onFileClickWithShift={onFileClickWithShift}
                  onDeleteSelected={onDeleteSelected}
                />
              );
            });
          })()}
        </div>
      )}
    </div>
  );
};

interface InlineCreateInputProps {
  type: 'file' | 'folder';
  onSubmit: (name: string) => void;
  onCancel: () => void;
  level?: number;
}

const InlineCreateInput: React.FC<InlineCreateInputProps> = ({ type, onSubmit, onCancel, level = 0 }) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (value.trim()) {
        let name = value.trim();
        if (type === 'file' && !name.endsWith('.md')) {
          name += '.md';
        }
        onSubmit(name);
      }
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  const handleBlur = () => {
    if (value.trim()) {
      let name = value.trim();
      if (type === 'file' && !name.endsWith('.md')) {
        name += '.md';
      }
      onSubmit(name);
    } else {
      onCancel();
    }
  };

  // Calculate padding based on level
  const renderIndentGuides = () => {
    const guides = [];
    for (let i = 0; i < level; i++) {
      guides.push(
        <div
          key={i}
          className="flex-shrink-0 flex items-center"
          style={{ width: '30px', marginLeft: '-15px' }}
        >
          <div
            style={{
              width: '1px',
              height: '28px',
              backgroundColor: 'var(--indent-guide)'
            }}
          />
        </div>
      );
    }
    return guides;
  };

  return (
    <div
      className="flex items-center gap-2 pr-2"
      style={{
        fontSize: '13.75px',
        lineHeight: '2',
        paddingLeft: '8px',
        marginLeft: type === 'file' ? '22px' : '0'
      }}
    >
      {level > 0 && renderIndentGuides()}
      {type === 'folder' ? (
        <Folder size={14} style={{ color: 'var(--sidebar-icon-muted)', flexShrink: 0 }} />
      ) : (
        <FileText size={14} style={{ color: 'var(--sidebar-icon-muted)', flexShrink: 0 }} />
      )}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          // Auto-size input to content
          if (inputRef.current) {
            inputRef.current.style.width = `${Math.max(40, (e.target.value.length + 1) * 8)}px`;
          }
        }}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={type === 'file' ? 'filename.md' : 'folder name'}
        className="outline-none"
        style={{
          fontSize: '13.75px',
          color: 'var(--sidebar-text)',
          backgroundColor: 'var(--selection-bg)',
          border: 'none',
          borderRadius: '3px',
          padding: '3px 4px',
          margin: '2px 0',
          width: `${Math.max(40, (value.length + 1) * 8)}px`
        }}
      />
    </div>
  );
};

interface InlineRenameInputProps {
  currentName: string;
  type: 'file' | 'folder';
  onSubmit: (newName: string) => void;
  onCancel: () => void;
  level?: number;
}

const InlineRenameInput: React.FC<InlineRenameInputProps> = ({ currentName, type, onSubmit, onCancel, level = 0 }) => {
  // For files, remove the .md extension for editing
  const displayName = type === 'file' ? currentName.replace('.md', '') : currentName;
  const [value, setValue] = useState(displayName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (value.trim() && value.trim() !== displayName) {
        let name = value.trim();
        if (type === 'file' && !name.endsWith('.md')) {
          name += '.md';
        }
        onSubmit(name);
      } else {
        onCancel();
      }
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  const handleBlur = () => {
    if (value.trim() && value.trim() !== displayName) {
      let name = value.trim();
      if (type === 'file' && !name.endsWith('.md')) {
        name += '.md';
      }
      onSubmit(name);
    } else {
      onCancel();
    }
  };

  return (
    <div
      className="inline-flex items-center"
      style={{
        fontSize: '13.75px',
        lineHeight: '2'
      }}
    >
      {type === 'folder' && (
        <ChevronRight
          size={16}
          strokeWidth={2}
          className="flex-shrink-0"
          style={{ color: 'var(--sidebar-icon-muted)', marginRight: '6px' }}
        />
      )}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (inputRef.current) {
            inputRef.current.style.width = `${Math.max(40, (e.target.value.length + 1) * 8)}px`;
          }
        }}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className="outline-none"
        style={{
          fontSize: '13.75px',
          color: 'var(--sidebar-text)',
          backgroundColor: 'var(--selection-bg)',
          border: 'none',
          borderRadius: '3px',
          padding: '3px 4px',
          margin: '2px 0',
          width: `${Math.max(40, (value.length + 1) * 8)}px`
        }}
      />
    </div>
  );
};

interface FileTreeComponentProps {
  tree: FileNode | null;
  remoteFolders?: FileNode[];
  onFileClick?: (path: string) => void;
  onRemoteFileClick?: (blogId: string, path: string) => void;
  onPublishRemote?: (blogId: string, path: string) => void;
  onDelete?: (path: string, type: 'file' | 'folder') => void;
  onDeleteRemote?: (blogId: string, path: string, sha: string, fileName: string) => void;
  onMoveFile?: (sourcePath: string, destFolder: string) => void;
  onRename?: (oldPath: string, newName: string) => Promise<string | null>;
  onRenameRemote?: (blogId: string, oldPath: string, newName: string, sha: string) => Promise<void>;
  inlineCreateType?: 'file' | 'folder' | null;
  onInlineCreate?: (name: string, type: 'file' | 'folder') => void;
  onInlineCancel?: () => void;
  inlineCreateFolder?: { folderPath: string; type: 'file' | 'folder' } | null;
  onInlineCreateInFolder?: (name: string, folderPath: string, type: 'file' | 'folder') => void;
  onInlineCreateInFolderCancel?: () => void;
  onCreateInFolder?: (folderPath: string, type: 'file' | 'folder') => void;
  onSidebarContextMenu?: () => void;
  expandedPaths?: Set<string>;
  onFolderToggle?: (path: string, expanded: boolean) => void;
  selectedFile?: string | null;
  displayNames?: Map<string, string>;
}

export const FileTree: React.FC<FileTreeComponentProps> = ({
  tree,
  remoteFolders,
  onFileClick,
  onRemoteFileClick,
  onPublishRemote,
  onDelete,
  onDeleteRemote,
  onMoveFile,
  onRename,
  onRenameRemote,
  inlineCreateType,
  onInlineCreate,
  onInlineCancel,
  inlineCreateFolder,
  onInlineCreateInFolder,
  onInlineCreateInFolderCancel,
  onCreateInFolder,
  onSidebarContextMenu,
  expandedPaths,
  onFolderToggle,
  selectedFile,
  displayNames
}) => {
  const [draggedPath, setDraggedPath] = useState<string | null>(null);
  const [renamingPath, setRenamingPath] = useState<string | null>(null);
  const [multiSelectedPaths, setMultiSelectedPaths] = useState<Set<string>>(new Set());
  const [lastClickedPath, setLastClickedPath] = useState<string | null>(null);

  // Clear multi-select when tree changes
  useEffect(() => {
    setMultiSelectedPaths(new Set());
  }, [tree]);

  // Find sibling file nodes for a given path by searching the tree
  const getSiblingsForPath = (filePath: string): FileNode[] | null => {
    const parentDir = filePath.substring(0, filePath.lastIndexOf('/'));

    const searchChildren = (nodes: FileNode[]): FileNode[] | null => {
      for (const node of nodes) {
        if (node.type === 'folder') {
          // Check if this folder's path matches the parent directory
          if (node.path === parentDir && node.children) {
            return node.children.filter(c => c.type === 'file');
          }
          // Recurse into subfolders
          if (node.children) {
            const result = searchChildren(node.children);
            if (result) return result;
          }
        }
      }
      return null;
    };

    // Check if the file is a direct child of the local tree root
    if (tree && tree.path === parentDir && tree.children) {
      return tree.children.filter(c => c.type === 'file');
    }
    // Search local tree
    if (tree?.children) {
      const result = searchChildren(tree.children);
      if (result) return result;
    }
    // Search remote folders
    if (remoteFolders) {
      for (const folder of remoteFolders) {
        if (folder.path === parentDir && folder.children) {
          return folder.children.filter(c => c.type === 'file');
        }
        if (folder.children) {
          const result = searchChildren(folder.children);
          if (result) return result;
        }
      }
    }
    return null;
  };

  const handleFileClickWithMultiSelect = (path: string, event: React.MouseEvent) => {
    if (event.shiftKey && lastClickedPath) {
      // Check if both paths share the same parent folder
      const parentA = lastClickedPath.substring(0, lastClickedPath.lastIndexOf('/'));
      const parentB = path.substring(0, path.lastIndexOf('/'));

      if (parentA === parentB) {
        const siblings = getSiblingsForPath(path);
        if (siblings) {
          const indexA = siblings.findIndex(s => s.path === lastClickedPath);
          const indexB = siblings.findIndex(s => s.path === path);
          if (indexA !== -1 && indexB !== -1) {
            const start = Math.min(indexA, indexB);
            const end = Math.max(indexA, indexB);
            const selected = new Set<string>();
            for (let i = start; i <= end; i++) {
              selected.add(siblings[i].path);
            }
            setMultiSelectedPaths(selected);
            return; // Don't open the file
          }
        }
      }
      // Fall through to normal click if cross-folder or not found
    }

    // Normal click: clear multi-select, set anchor, open file
    setMultiSelectedPaths(new Set());
    setLastClickedPath(path);

    // Determine if it's a remote file and route accordingly
    // Check remote folders for remote file detection
    const isRemotePath = path.startsWith('remote:');
    if (isRemotePath && remoteFolders) {
      // Extract blogId and actual path from "remote:blogId:path" format
      const parts = path.split(':');
      if (parts.length >= 3) {
        const blogId = parts[1];
        const actualPath = parts.slice(2).join(':');
        onRemoteFileClick?.(blogId, actualPath);
        return;
      }
    }
    onFileClick?.(path);
  };

  const handleDeleteSelected = () => {
    for (const path of multiSelectedPaths) {
      onDelete?.(path, 'file');
    }
    setMultiSelectedPaths(new Set());
  };

  if (!tree) {
    return (
      <div className="p-4 text-obsidian-text-muted text-sm">No vault loaded</div>
    );
  }

  const handleSubmit = (name: string) => {
    if (inlineCreateType && onInlineCreate) {
      onInlineCreate(name, inlineCreateType);
    }
  };

  const handleCancel = () => {
    onInlineCancel?.();
  };

  const handleInlineCreateInFolderSubmit = (name: string) => {
    if (inlineCreateFolder && onInlineCreateInFolder) {
      onInlineCreateInFolder(name, inlineCreateFolder.folderPath, inlineCreateFolder.type);
    }
  };

  const handleStartRename = (path: string) => {
    setRenamingPath(path);
  };

  const handleRenameSubmit = async (oldPath: string, newName: string) => {
    if (onRename) {
      await onRename(oldPath, newName);
    }
    setRenamingPath(null);
  };

  const handleRenameRemoteSubmit = async (blogId: string, oldPath: string, newName: string, sha: string) => {
    if (onRenameRemote) {
      await onRenameRemote(blogId, oldPath, newName, sha);
    }
    setRenamingPath(null);
  };

  const handleRenameCancel = () => {
    setRenamingPath(null);
  };

  const handleSidebarContextMenu = (e: React.MouseEvent) => {
    // Only trigger if clicking on empty space (not on a file/folder item)
    // Check if the click originated from a file tree node item
    const target = e.target as HTMLElement;
    const isOnTreeItem = target.closest('[data-tree-item]');

    if (!isOnTreeItem && onSidebarContextMenu) {
      e.preventDefault();
      onSidebarContextMenu();
    }
  };

  return (
    <div
      className="w-full h-full overflow-y-auto pt-1"
      onContextMenu={handleSidebarContextMenu}
    >
      {/* Remote blog folders at the top */}
      {remoteFolders && remoteFolders.length > 0 && (
        <>
          <div style={{ padding: '0 12px', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Posts
            </h3>
          </div>
          {remoteFolders.map((folder, index) => (
            <FileTreeNode
              key={`remote-${folder.path}-${index}`}
              node={folder}
              onFileClick={onFileClick}
              onRemoteFileClick={onRemoteFileClick}
              onPublishRemote={onPublishRemote}
              onDelete={onDelete}
              onDeleteRemote={onDeleteRemote}
              onMoveFile={onMoveFile}
              onCreateInFolder={onCreateInFolder}
              level={0}
              ancestorHasMoreSiblings={[]}
              isLastChild={index === remoteFolders.length - 1 && (!tree?.children || tree.children.length === 0)}
              draggedPath={draggedPath}
              setDraggedPath={setDraggedPath}
              inlineCreate={null}
              renamingPath={renamingPath}
              onStartRename={handleStartRename}
              onRenameSubmit={handleRenameSubmit}
              onRenameRemoteSubmit={handleRenameRemoteSubmit}
              onRenameCancel={handleRenameCancel}
              expandedPaths={expandedPaths}
              onFolderToggle={onFolderToggle}
              selectedFile={selectedFile}
              displayNames={displayNames}
              multiSelectedPaths={multiSelectedPaths}
              onFileClickWithShift={handleFileClickWithMultiSelect}
              onDeleteSelected={handleDeleteSelected}
            />
          ))}
          {/* Separator between remote and local files */}
          <div style={{ height: '8px' }} />
        </>
      )}

      {/* Notes section header */}
      <div style={{ padding: '0 12px', marginBottom: '8px', marginTop: remoteFolders && remoteFolders.length > 0 ? '0' : '0' }}>
        <h3 style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Notes
        </h3>
      </div>

      {/* Skip root folder, render its children directly - no header like Obsidian */}
      {(() => {
        const filteredChildren = tree.children?.filter(child => !child.name.startsWith('.')) || [];
        return filteredChildren.map((child, index) => {
          const isLast = index === filteredChildren.length - 1;
          return (
            <FileTreeNode
              key={`${child.path}-${index}`}
              node={child}
              onFileClick={onFileClick}
              onRemoteFileClick={onRemoteFileClick}
              onPublishRemote={onPublishRemote}
              onDelete={onDelete}
              onDeleteRemote={onDeleteRemote}
              onMoveFile={onMoveFile}
              onCreateInFolder={onCreateInFolder}
              level={0}
              ancestorHasMoreSiblings={[]}
              isLastChild={isLast}
              draggedPath={draggedPath}
              setDraggedPath={setDraggedPath}
              inlineCreate={inlineCreateFolder}
              onInlineCreateSubmit={handleInlineCreateInFolderSubmit}
              onInlineCreateCancel={onInlineCreateInFolderCancel}
              renamingPath={renamingPath}
              onStartRename={handleStartRename}
              onRenameSubmit={handleRenameSubmit}
              onRenameRemoteSubmit={handleRenameRemoteSubmit}
              onRenameCancel={handleRenameCancel}
              expandedPaths={expandedPaths}
              onFolderToggle={onFolderToggle}
              selectedFile={selectedFile}
              displayNames={displayNames}
              multiSelectedPaths={multiSelectedPaths}
              onFileClickWithShift={handleFileClickWithMultiSelect}
              onDeleteSelected={handleDeleteSelected}
            />
          );
        });
      })()}

      {/* Inline create input at root level */}
      {inlineCreateType && (
        <InlineCreateInput
          type={inlineCreateType}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};
