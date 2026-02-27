import { ipcMain, Menu, BrowserWindow } from 'electron';

/**
 * Register context menu IPC handlers
 */
export function registerContextMenuHandlers(): void {
  // Show file context menu
  ipcMain.handle('context-menu:show-file', async (_event, filePath: string, options?: { isRemote?: boolean; selectedCount?: number }) => {
    return new Promise<{ action: string } | null>((resolve) => {
      const count = options?.selectedCount ?? 1;
      const deleteLabel = count > 1 ? `Delete ${count} notes` : 'Delete';
      const menu = Menu.buildFromTemplate([
        {
          label: 'Rename',
          click: () => resolve({ action: 'rename' })
        },
        { type: 'separator' },
        {
          label: deleteLabel,
          click: () => resolve({ action: 'delete' })
        }
      ]);

      menu.popup({
        window: BrowserWindow.getFocusedWindow() ?? undefined,
        callback: () => resolve(null)
      });
    });
  });

  // Show folder context menu
  ipcMain.handle('context-menu:show-folder', async (_event, folderPath: string) => {
    return new Promise<{ action: string } | null>((resolve) => {
      const menu = Menu.buildFromTemplate([
        {
          label: 'New Note',
          click: () => resolve({ action: 'new-note' })
        },
        {
          label: 'New Folder',
          click: () => resolve({ action: 'new-folder' })
        },
        { type: 'separator' },
        {
          label: 'Rename',
          click: () => resolve({ action: 'rename' })
        },
        {
          label: 'Delete',
          click: () => resolve({ action: 'delete' })
        }
      ]);

      menu.popup({
        window: BrowserWindow.getFocusedWindow() ?? undefined,
        callback: () => resolve(null)
      });
    });
  });

  // Show sidebar empty space context menu
  ipcMain.handle('context-menu:show-sidebar', async () => {
    return new Promise<{ action: string } | null>((resolve) => {
      const menu = Menu.buildFromTemplate([
        {
          label: 'New Note',
          click: () => resolve({ action: 'new-note' })
        },
        {
          label: 'New Folder',
          click: () => resolve({ action: 'new-folder' })
        }
      ]);

      menu.popup({
        window: BrowserWindow.getFocusedWindow() ?? undefined,
        callback: () => resolve(null)
      });
    });
  });
}
