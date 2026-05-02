import React from 'react';
import { User } from 'lucide-react';

const Avatar = ({ 
  src, 
  alt, 
  size = 'medium', 
  name,
  className = '' 
}) => {
  const sizes = {
    small: '32px',
    medium: '48px',
    large: '64px',
    xl: '96px',
  };

  const dimension = sizes[size] || sizes.medium;

  const containerStyle = {
    width: dimension,
    height: dimension,
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: 'var(--surface)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--border)',
    flexShrink: 0,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  };

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const fallbackStyle = {
    color: 'var(--accent)',
    fontWeight: '600',
    fontSize: parseInt(dimension) / 2.5 + 'px',
    textTransform: 'uppercase',
  };

  const getInitials = (n) => {
    if (!n) return null;
    return n.split(' ').map(part => part[0]).join('').slice(0, 2);
  };

  const initials = getInitials(name);

  return (
    <div style={containerStyle} className={className}>
      {src ? (
        <img src={src} alt={alt || name} style={imgStyle} />
      ) : (
        initials ? (
          <span style={fallbackStyle}>{initials}</span>
        ) : (
          <User size={parseInt(dimension) / 2} color="var(--text)" />
        )
      )}
    </div>
  );
};

export default Avatar;
