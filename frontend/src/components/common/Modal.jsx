import React from 'react';
import { X } from 'lucide-react';
import Button from './Button';

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(8px)',
    animation: 'fadeIn 0.2s ease-out',
  };

  const modalStyle = {
    backgroundColor: 'var(--bg)',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '90vh',
    border: '1px solid var(--border)',
    animation: 'slideUp 0.3s ease-out',
  };

  const headerStyle = {
    padding: '20px 24px',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const titleStyle = {
    margin: 0,
    fontSize: '18px',
    fontWeight: '700',
    color: 'var(--text-bright)',
  };

  const contentStyle = {
    padding: '24px',
    overflowY: 'auto',
    color: 'var(--text)',
    fontSize: '15px',
    lineHeight: '1.6',
  };

  const footerStyle = {
    padding: '16px 24px',
    borderTop: '1px solid var(--border)',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    backgroundColor: 'var(--surface)',
    borderBottomLeftRadius: '12px',
    borderBottomRightRadius: '12px',
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        <header style={headerStyle}>
          <h3 style={titleStyle}>{title}</h3>
          <button 
            onClick={onClose}
            style={closeButtonStyle}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--surface)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </header>
        
        <div style={contentStyle}>
          {children}
        </div>

        {(footer !== null) && (
          <footer style={footerStyle}>
            {footer || (
              <>
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button onClick={onClose}>Confirm</Button>
              </>
            )}
          </footer>
        )}
      </div>
    </div>
  );
};

export default Modal;
