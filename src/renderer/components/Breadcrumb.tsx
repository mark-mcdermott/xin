import React from 'react';

interface BreadcrumbProps {
  path: string;
  onNavigate?: (path: string) => void;
  displayName?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ path, onNavigate, displayName }) => {
  // Split path into segments
  const segments = path.split('/').filter(Boolean);
  const hasLeadingSlash = path.startsWith('/');

  // Build cumulative paths for each segment
  const pathSegments = segments.map((segment, index) => {
    // Preserve leading slash if original path had one
    const fullPath = (hasLeadingSlash ? '/' : '') + segments.slice(0, index + 1).join('/');
    return {
      name: segment.replace('.md', ''),
      path: fullPath,
      isLast: index === segments.length - 1
    };
  });

  return (
    <p className="overflow-x-auto whitespace-nowrap" style={{ fontSize: '13.75px', color: 'var(--breadcrumb-text)', margin: 0 }}>
      {pathSegments.map((segment, index) => (
        <React.Fragment key={segment.path}>
          {index > 0 && (
            <span style={{ color: 'var(--breadcrumb-separator)', margin: '0 6px' }}>/</span>
          )}
          {segment.isLast ? (
            <span>{displayName || segment.name}</span>
          ) : (
            <button
              onClick={() => onNavigate?.(segment.path)}
              className="transition-all hover:opacity-60"
              style={{ color: 'var(--breadcrumb-text)', cursor: onNavigate ? 'pointer' : 'default', padding: 0, border: 'none', background: 'none', font: 'inherit' }}
            >
              {segment.name}
            </button>
          )}
        </React.Fragment>
      ))}
    </p>
  );
};
