import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from '../components/common/Toast';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const show = useCallback((message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  }, []);

  const success = (msg) => show(msg, 'success');
  const error = (msg) => show(msg, 'error');
  const info = (msg) => show(msg, 'info');
  const warning = (msg) => show(msg, 'warning');

  return (
    <NotificationContext.Provider value={{ success, error, info, warning }}>
      {children}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        pointerEvents: 'none'
      }}>
        {notifications.map(n => (
          <Toast 
            key={n.id} 
            message={n.message} 
            type={n.type} 
            onClose={() => setNotifications(prev => prev.filter(item => item.id !== n.id))}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
