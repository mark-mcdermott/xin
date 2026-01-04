import { ipcMain, dialog } from 'electron';
import { app } from 'electron';
import { join } from 'path';
import { vaultManager } from '../vault/VaultManager';

/**
 * Register all vault-related IPC handlers
 */
export function registerVaultHandlers(): void {
  // Initialize vault
  ipcMain.handle('vault:initialize', async (_event, vaultPath?: string) => {
    try {
      const path = await vaultManager.initialize(vaultPath);
      return { success: true, path };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  // Get vault path
  ipcMain.handle('vault:get-path', async () => {
    const path = vaultManager.getVaultPath();
    return { success: true, path };
  });

  // Get default vault path
  ipcMain.handle('vault:get-default-path', async () => {
    const path = join(app.getPath('documents'), 'XinVaults', 'Xin');
    return { success: true, path };
  });

  // Check if first run (no existing config)
  ipcMain.handle('vault:is-first-run', async () => {
    const isFirstRun = await vaultManager.isFirstRun();
    return { success: true, isFirstRun };
  });

  // Show open dialog for folder selection
  ipcMain.handle('dialog:show-open', async (_event, options: {
    title?: string;
    defaultPath?: string;
    properties?: Array<'openFile' | 'openDirectory' | 'multiSelections' | 'createDirectory'>;
  }) => {
    try {
      const result = await dialog.showOpenDialog({
        title: options.title,
        defaultPath: options.defaultPath,
        properties: options.properties as any
      });
      return {
        success: true,
        paths: result.filePaths,
        canceled: result.canceled
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  // Get file tree
  ipcMain.handle('vault:get-files', async () => {
    try {
      const tree = await vaultManager.getFileTree();
      return { success: true, tree };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  // Read file
  ipcMain.handle('vault:read-file', async (_event, path: string) => {
    try {
      const content = await vaultManager.readFile(path);
      return { success: true, content };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  // Write file
  ipcMain.handle('vault:write-file', async (_event, path: string, content: string) => {
    try {
      await vaultManager.writeFile(path, content);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  // Create file
  ipcMain.handle('vault:create-file', async (_event, path: string, content: string = '') => {
    try {
      await vaultManager.createFile(path, content);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  // Delete file
  ipcMain.handle('vault:delete-file', async (_event, path: string) => {
    try {
      await vaultManager.deleteFile(path);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  // Create folder
  ipcMain.handle('vault:create-folder', async (_event, path: string) => {
    try {
      await vaultManager.createFolder(path);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  // Move file or folder
  ipcMain.handle('vault:move-file', async (_event, sourcePath: string, destFolder: string) => {
    try {
      const newPath = await vaultManager.moveFile(sourcePath, destFolder);
      return { success: true, newPath };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  // Rename file or folder
  ipcMain.handle('vault:rename-file', async (_event, oldPath: string, newName: string) => {
    try {
      const newPath = await vaultManager.renameFile(oldPath, newName);
      return { success: true, newPath };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  // Get today's note
  ipcMain.handle('vault:get-today-note', async () => {
    try {
      const note = await vaultManager.getTodayNote();
      return { success: true, ...note };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  // Get daily note for specific date
  ipcMain.handle('vault:get-daily-note', async (_event, date: string) => {
    try {
      const note = await vaultManager.getDailyNote(date);
      return { success: true, ...note };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  // Get all daily note dates
  ipcMain.handle('vault:get-daily-note-dates', async () => {
    try {
      const dates = await vaultManager.getDailyNoteDates();
      return { success: true, dates };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  // Get all configured vaults
  ipcMain.handle('vault:get-all', async () => {
    try {
      const vaults = await vaultManager.getAllVaults();
      const activeVaultId = await vaultManager.getActiveVaultId();
      return { success: true, vaults, activeVaultId };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  // Add a new vault
  ipcMain.handle('vault:add', async (_event, vaultPath: string) => {
    try {
      const vault = await vaultManager.addVault(vaultPath);
      return { success: true, vault };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  // Switch to a different vault
  ipcMain.handle('vault:switch', async (_event, vaultId: string) => {
    try {
      const path = await vaultManager.switchVault(vaultId);
      return { success: true, path };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  // Update a vault
  ipcMain.handle('vault:update', async (_event, vaultId: string, updates: { name?: string; path?: string }) => {
    try {
      const vault = await vaultManager.updateVault(vaultId, updates);
      return { success: true, vault };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  // Remove a vault from config (doesn't delete files)
  ipcMain.handle('vault:remove', async (_event, vaultId: string) => {
    try {
      await vaultManager.removeVault(vaultId);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  // Delete a vault and all its files
  ipcMain.handle('vault:delete', async (_event, vaultId: string) => {
    try {
      await vaultManager.deleteVault(vaultId);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });
}
