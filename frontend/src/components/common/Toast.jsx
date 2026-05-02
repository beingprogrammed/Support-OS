import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const variants = {
    info: { 
      bg: 'var(--bg)', 
      color: 'var(--accent)', 
      icon: Info,
      borderColor: 'var(--accent)'
    },
    success: { 
      bg: 'var(--bg)', 
      color: '#15803d', 
      icon: CheckCircle,
      borderColor: '#bcf0da'
    },
    error: { 
      bg: 'var(--bg)', 
      color: '#b91c1c', 
      icon: AlertCircle,
      borderColor: '#fecaca'
    },
    warning: { 
      bg: 'var(--bg)', 
      color: '#b45309', 
      icon: AlertTriangle,
      borderColor: '#fde68a'
    },
  };

  const { color, icon: Icon, borderColor } = variants[type] || variants.info;

  const toastStyle = {
    padding: '12px 20px',
    backgroundColor: 'var(--surface)',
    color: 'var(--text-bright)',
    borderRadius: '12px',
    boxShadow: 'var(--shadow-lg)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    minWidth: '320px',
    maxWidth: '420px',
    border: `1px solid var(--border)`,
    borderLeft: `4px solid ${color}`,
    animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    pointerEvents: 'auto',
  };

  return (
    <div style={toastStyle}>
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}
      </style>
      <div style={{ color: color, display: 'flex' }}>
        <Icon size={20} strokeWidth={2.5} />
      </div>
      <span style={{ flexGrow: 1, fontSize: '14px', fontWeight: '500' }}>{message}</span>
      <button 
        onClick={onClose}
        style={{ 
          background: 'none', 
          border: 'none', 
          color: 'var(--text)', 
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--surface)'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <X size={18} strokeWidth={2} />
      </button>
    </div>
  );
};

export default Toast;
