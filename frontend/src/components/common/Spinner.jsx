import React from 'react';

const Spinner = ({ size = 'medium', color = 'var(--accent)' }) => {
  const sizes = {
    small: '16px',
    medium: '32px',
    large: '48px',
  };

  const dimension = sizes[size] || sizes.medium;
  const strokeWidth = size === 'small' ? 2 : 3;

  const spinnerStyle = {
    width: dimension,
    height: dimension,
    border: `${strokeWidth}px solid var(--border)`,
    borderTop: `${strokeWidth}px solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 0.8s cubic-bezier(0.5, 0.1, 0.5, 0.9) infinite',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '12px' }}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default Spinner;
