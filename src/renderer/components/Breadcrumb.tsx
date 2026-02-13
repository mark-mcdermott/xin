import React from 'react';

interface BreadcrumbProps {
  path: string;
  onNavigate?: (path: string) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ path, onNavigate }) => {
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
    <div className="flex items-center gap-1.5 overflow-x-auto" style={{ fontSize: '13.75px', color: 'var(--breadcrumb-text)' }}>
      {/* Path segments */}
      {pathSegments.map((segment, index) => (
        <React.Fragment key={segment.path}>
          {index > 0 && <span className="flex-shrink-0" style={{ color: 'var(--breadcrumb-separator)', marginRight: '4px' }}>/</span>}
          {segment.isLast ? (
            <span className="truncate" style={{ color: 'var(--breadcrumb-text)', marginLeft: '1px' }}>
              {segment.name}
            </span>
          ) : (
            <button
              onClick={() => onNavigate?.(segment.path)}
              className="transition-all truncate hover:opacity-60"
              style={{ color: 'var(--breadcrumb-text)', cursor: onNavigate ? 'pointer' : 'default' }}
            >
              {segment.name}
            </button>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
