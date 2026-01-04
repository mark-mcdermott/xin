import React, { useState } from 'react';
import { Folder } from 'lucide-react';

interface VaultSelectionDialogProps {
  defaultPath: string;
  onSelect: (path: string) => void;
  onSkip: () => void;
}

export const VaultSelectionDialog: React.FC<VaultSelectionDialogProps> = ({
  defaultPath,
  onSelect,
  onSkip
}) => {
  const [selectedPath, setSelectedPath] = useState(defaultPath);
  const [isSelecting, setIsSelecting] = useState(false);

  const handleBrowse = async () => {
    setIsSelecting(true);
    try {
      const result = await window.electronAPI.dialog.showOpenDialog({
        title: 'Select Vault Folder',
        defaultPath: selectedPath,
        properties: ['openDirectory', 'createDirectory']
      });

      if (result.success && result.paths && result.paths.length > 0) {
        setSelectedPath(result.paths[0]);
      }
    } catch (error) {
      console.error('Failed to open folder dialog:', error);
    } finally {
      setIsSelecting(false);
    }
  };

  const handleContinue = () => {
    onSelect(selectedPath);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div
        className="rounded-xl p-8 max-w-lg w-full mx-4 shadow-2xl"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)'
        }}
      >
        <div className="text-center mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: 'var(--accent-primary)', opacity: 0.1 }}
          >
            <Folder size={32} style={{ color: 'var(--accent-primary)' }} />
          </div>
          <h1
            className="text-2xl font-semibold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Welcome to Xun
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Choose where to store your notes and daily journals.
          </p>
        </div>

        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium"
            style={{ color: 'var(--text-secondary)' }}
          >
            Vault Location
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={selectedPath}
              onChange={e => setSelectedPath(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg text-sm"
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-primary)',
                color: 'var(--text-primary)'
              }}
              placeholder="Select vault folder..."
            />
            <button
              onClick={handleBrowse}
              disabled={isSelecting}
              className="px-4 py-3 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-primary)'
              }}
            >
              Browse
            </button>
          </div>
          <p
            className="mt-2 text-xs"
            style={{ color: 'var(--text-muted)' }}
          >
            A new vault will be created if the folder doesn't exist.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onSkip}
            className="flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-primary)'
            }}
          >
            Skip (use default)
          </button>
          <button
            onClick={handleContinue}
            className="flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: 'white'
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
