import React from 'react';

export const MerchPage: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto" style={{ padding: '40px 48px' }}>
      <div className="max-w-2xl">
        <h1 className="font-semibold" style={{ fontSize: '24px', color: 'var(--text-primary)', marginBottom: '32px' }}>Merch</h1>

        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
          High quality hoodies, T-shirts and stickers with the Xun mech logo.
        </p>
      </div>
    </div>
  );
};
