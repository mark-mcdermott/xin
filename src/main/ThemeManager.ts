import { app, nativeTheme, BrowserWindow } from 'electron';
import { join } from 'path';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';

export type Theme = 'light' | 'dark' | 'system';

interface Preferences {
  theme: Theme;
}

const DEFAULT_PREFERENCES: Preferences = {
  theme: 'dark'
};

class ThemeManager {
  private preferencesPath: string;
  private preferences: Preferences = DEFAULT_PREFERENCES;

  constructor() {
    const userDataPath = app.getPath('userData');
    this.preferencesPath = join(userDataPath, 'preferences.json');
  }

  async initialize(): Promise<void> {
    try {
      // Ensure the directory exists
      const dir = app.getPath('userData');
      if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true });
      }

      // Load existing preferences
      if (existsSync(this.preferencesPath)) {
        const data = await readFile(this.preferencesPath, 'utf-8');
        this.preferences = { ...DEFAULT_PREFERENCES, ...JSON.parse(data) };
      } else {
        // Create default preferences file
        await this.save();
      }
    } catch (error) {
      console.error('Failed to initialize preferences:', error);
      this.preferences = DEFAULT_PREFERENCES;
    }
  }

  private async save(): Promise<void> {
    try {
      await writeFile(this.preferencesPath, JSON.stringify(this.preferences, null, 2));
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  }

  getTheme(): Theme {
    return this.preferences.theme;
  }

  async setTheme(theme: Theme): Promise<void> {
    this.preferences.theme = theme;
    await this.save();
    this.notifyRenderer();
  }

  getEffectiveTheme(): 'light' | 'dark' {
    if (this.preferences.theme === 'system') {
      return nativeTheme.shouldUseDarkColors ? 'dark' : 'light';
    }
    return this.preferences.theme;
  }

  private notifyRenderer(): void {
    const windows = BrowserWindow.getAllWindows();
    const effectiveTheme = this.getEffectiveTheme();
    for (const win of windows) {
      win.webContents.send('theme:changed', {
        theme: this.preferences.theme,
        effectiveTheme
      });
    }
  }
}

export const themeManager = new ThemeManager();
