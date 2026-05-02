import React from 'react';

const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error, 
  name,
  className = '',
  icon: Icon,
  ...props 
}) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    width: '100%',
    marginBottom: '16px',
  };

  const labelStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--text-bright)',
    textAlign: 'left',
    paddingLeft: '4px',
  };

  const inputWrapperStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyle = {
    padding: Icon ? '12px 16px 12px 44px' : '12px 16px',
    borderRadius: '12px',
    border: `1px solid ${error ? '#ef4444' : 'var(--border)'}`,
    backgroundColor: 'var(--bg)',
    color: 'var(--text-bright)',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.2s ease',
    width: '100%',
    boxSizing: 'border-box',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
  };

  const iconStyle = {
    position: 'absolute',
    left: '14px',
    color: 'var(--text)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  };

  const errorStyle = {
    fontSize: '12px',
    color: '#ef4444',
    textAlign: 'left',
    marginTop: '4px',
    paddingLeft: '4px',
  };

  return (
    <div style={containerStyle} className={className}>
      {label && <label style={labelStyle}>{label}</label>}
      <div style={inputWrapperStyle}>
        {Icon && (
          <div style={iconStyle}>
            <Icon size={18} strokeWidth={2} />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--accent)';
            e.target.style.boxShadow = '0 0 0 3px rgba(var(--accent-rgb, 59, 130, 246), 0.1)';
            e.target.style.backgroundColor = 'var(--surface)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? '#ef4444' : 'var(--border)';
            e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)';
            e.target.style.backgroundColor = 'var(--bg)';
          }}
          {...props}
        />
      </div>
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
};

export default Input;
