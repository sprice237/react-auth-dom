import { FC, VFC } from 'react';

export const LoadingSpinner: VFC = () => (
  <div style={{ display: 'inline-block' }} className="loading" />
);

export const LoadingOverlay: FC<{ isLoading: boolean }> = ({ isLoading, children }) => {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'relative' }}>{children}</div>
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};
