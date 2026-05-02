import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false, 
  disabled = false,
  loading = false,
  icon: Icon,
  type = 'button'
}) => {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: size === 'small' ? '13px' : '15px',
    padding: size === 'small' ? '8px 16px' : '12px 24px',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled || loading ? 0.6 : 1,
    boxShadow: variant === 'primary' ? '0 4px 12px rgba(124, 58, 237, 0.2)' : 'none',
  };

  const variants = {
    primary: {
      backgroundColor: 'var(--accent)',
      color: '#ffffff',
    },
    secondary: {
      backgroundColor: 'var(--accent-muted)',
      color: 'var(--accent)',
    },
    outline: {
      backgroundColor: 'transparent',
      border: '1px solid var(--border)',
      color: 'var(--text-bright)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--text)',
    },
    error: {
      backgroundColor: 'var(--error)',
      color: '#ffffff',
    }
  };

  const hoverStyle = (e) => {
    if (disabled || loading) return;
    if (variant === 'primary') e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
    if (variant === 'ghost') e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
    if (variant === 'outline') e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
    e.currentTarget.style.transform = 'translateY(-1px)';
  };

  const resetStyle = (e) => {
    e.currentTarget.style.backgroundColor = variants[variant].backgroundColor;
    e.currentTarget.style.transform = 'translateY(0)';
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{ ...baseStyle, ...variants[variant] }}
      onMouseEnter={hoverStyle}
      onMouseLeave={resetStyle}
    >
      {loading ? (
        <span style={{ display: 'flex', gap: '4px' }}>
          <span className="spinner-dot" style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'currentColor' }}></span>
          <span className="spinner-dot" style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'currentColor', animationDelay: '0.1s' }}></span>
          <span className="spinner-dot" style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'currentColor', animationDelay: '0.2s' }}></span>
        </span>
      ) : (
        <>
          {Icon && <Icon size={size === 'small' ? 16 : 18} />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
