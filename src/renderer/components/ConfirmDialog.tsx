import React, { useEffect, useRef } from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'default';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'OK',
  cancelText = 'Cancel',
  variant = 'default',
  onConfirm,
  onCancel
}) => {
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => confirmButtonRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  if (!isOpen) return null;

  const getConfirmButtonStyle = () => {
    if (variant === 'danger') {
      return {
        color: 'white',
        backgroundColor: 'var(--status-error)',
        border: 'none'
      };
    }
    return {
      color: 'var(--btn-primary-text)',
      backgroundColor: 'var(--text-icon)',
      border: 'none'
    };
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'var(--dialog-backdrop)' }}
      onClick={onCancel}
    >
      <div
        className="rounded-lg shadow-xl w-[400px]"
        style={{ backgroundColor: 'var(--dialog-bg)' }}
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--border-primary)' }}>
          <div className="flex items-center gap-2">
            {variant === 'danger' && (
              <AlertTriangle size={18} style={{ color: 'var(--status-error)' }} />
            )}
            <h2 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--dialog-heading)' }}>
              {title}
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="p-1 rounded hover:bg-[var(--dialog-hover)] transition-colors"
            style={{ color: 'var(--text-icon)', backgroundColor: 'transparent' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 px-4 pb-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1.5 rounded transition-colors"
            style={{
              fontSize: '13px',
              color: 'var(--btn-secondary-text)',
              backgroundColor: 'transparent',
              border: '1px solid var(--btn-secondary-border)'
            }}
          >
            {cancelText}
          </button>
          <button
            ref={confirmButtonRef}
            type="button"
            onClick={onConfirm}
            className="px-3 py-1.5 rounded transition-colors"
            style={{
              fontSize: '13px',
              ...getConfirmButtonStyle()
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
