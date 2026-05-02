import React from 'react';

const TypingIndicator = () => {
  const dotStyle = (delay) => ({
    width: '6px',
    height: '6px',
    backgroundColor: 'var(--text)',
    borderRadius: '50%',
    display: 'inline-block',
    margin: '0 2px',
    animation: 'bounce 1.4s infinite ease-in-out both',
    animationDelay: delay,
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', backgroundColor: 'var(--surface-hover)', borderRadius: '16px', width: 'fit-content', marginBottom: '16px' }}>
      <style>
        {`
          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1.0); }
          }
        `}
      </style>
      <div style={dotStyle('-0.32s')}></div>
      <div style={dotStyle('-0.16s')}></div>
      <div style={dotStyle('0s')}></div>
    </div>
  );
};

export default TypingIndicator;
