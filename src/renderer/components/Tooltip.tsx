import { useState, useRef, useCallback, type ReactNode, type CSSProperties } from 'react';

type Position = 'right' | 'top' | 'bottom';

interface TooltipProps {
  label: string;
  children: ReactNode;
  position?: Position;
  delay?: number;
  className?: string;
}

const balloonStyle: CSSProperties = {
  backgroundColor: 'var(--bg-tertiary)',
  color: 'var(--text-primary)',
  border: '1px solid var(--border-primary)',
  fontSize: '11px',
  fontWeight: 500,
  padding: '4px 8px',
  borderRadius: '6px',
  whiteSpace: 'nowrap',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
};

function Arrow({ position }: { position: Position }) {
  if (position === 'right') {
    return (
      <div style={{ width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderRight: '8px solid var(--border-primary)', marginRight: '-1px', position: 'relative', zIndex: 1 }}>
        <div style={{ position: 'absolute', top: '-8px', left: '1px', width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderRight: '8px solid var(--bg-tertiary)' }} />
      </div>
    );
  }
  if (position === 'top') {
    return (
      <div style={{ width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid var(--border-primary)', marginTop: '-1px', position: 'relative', zIndex: 1 }}>
        <div style={{ position: 'absolute', left: '-8px', top: '-9px', width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid var(--bg-tertiary)' }} />
      </div>
    );
  }
  // bottom
  return (
    <div style={{ width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderBottom: '8px solid var(--border-primary)', marginBottom: '-1px', position: 'relative', zIndex: 1 }}>
      <div style={{ position: 'absolute', left: '-8px', bottom: '-9px', width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderBottom: '8px solid var(--bg-tertiary)' }} />
    </div>
  );
}

const wrapperPositions: Record<Position, string> = {
  right: 'absolute left-full top-1/2 -translate-y-1/2 ml-2',
  top: 'absolute bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'absolute top-full left-1/2 -translate-x-1/2 mt-2',
};

const flexDir: Record<Position, string> = {
  right: 'row',
  top: 'column',
  bottom: 'column',
};

export default function Tooltip({ label, children, position = 'right', delay = 400, className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const show = useCallback(() => {
    if (localStorage.getItem('showTooltips') === 'false') return;
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  }, [delay]);

  const hide = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
  }, []);

  return (
    <div className={`relative${className ? ` ${className}` : ''}`} onMouseEnter={show} onMouseLeave={hide}>
      {children}
      {visible && (
        <div
          className={`${wrapperPositions[position]} pointer-events-none z-50`}
          style={{ display: 'flex', flexDirection: flexDir[position] as CSSProperties['flexDirection'], alignItems: 'center' }}
        >
          {position === 'bottom' && <Arrow position={position} />}
          {position === 'top' && <div style={balloonStyle}>{label}</div>}
          {position === 'right' && <Arrow position={position} />}
          {position === 'right' && <div style={balloonStyle}>{label}</div>}
          {position === 'top' && <Arrow position={position} />}
          {position === 'bottom' && <div style={balloonStyle}>{label}</div>}
        </div>
      )}
    </div>
  );
}
