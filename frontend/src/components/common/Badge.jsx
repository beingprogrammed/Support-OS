import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default', 
  className = '' 
}) => {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 12px',
    borderRadius: '10px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'capitalize',
    letterSpacing: '0.01em',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
  };

  const variants = {
    default: {
      backgroundColor: 'var(--surface)',
      color: 'var(--text)',
      border: '1px solid var(--border)',
    },
    success: {
      backgroundColor: '#f0fdf4',
      color: '#15803d',
      border: '1px solid #bcf0da',
    },
    warning: {
      backgroundColor: '#fffbeb',
      color: '#b45309',
      border: '1px solid #fde68a',
    },
    error: {
      backgroundColor: '#fef2f2',
      color: '#b91c1c',
      border: '1px solid #fecaca',
    },
    info: {
      backgroundColor: 'var(--surface)',
      color: 'var(--accent)',
      border: '1px solid var(--accent)',
    },
  };

  const combinedStyle = {
    ...baseStyle,
    ...(variants[variant] || variants.default),
  };

  return (
    <span style={combinedStyle} className={className}>
      {children}
    </span>
  );
};

export default Badge;
