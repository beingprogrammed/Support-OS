import React, { useState, useRef, useEffect } from 'react';
import Avatar from '../common/Avatar';
import { Bell, Settings, X, Check, Clock, MessageSquare, Zap, Shield, AlertCircle, Menu } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Header = ({ title, toggleSidebar }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const dropdownRef = useRef(null);

  const initialNotifications = [
    { id: 1, title: 'New Ticket Assigned', message: 'High priority ticket #TC-1024 assigned to you.', time: '2m ago', type: 'ticket', icon: MessageSquare, read: false },
    { id: 2, title: 'System Update', message: 'SupportOS will undergo maintenance at 2:00 AM UTC.', time: '1h ago', type: 'system', icon: Zap, read: false },
    { id: 3, title: 'Security Alert', message: 'New login detected from San Francisco, CA.', time: '3h ago', type: 'security', icon: Shield, read: true },
    { id: 4, title: 'Reply Received', message: 'Customer Sarah Connor replied to #TC-992.', time: '5h ago', type: 'ticket', icon: MessageSquare, read: true },
  ];

  const [notificationList, setNotificationList] = useState(initialNotifications);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !event.target.closest('.notification-trigger')) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAllAsRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleMarkAsRead = (id) => {
    setNotificationList(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notificationList.filter(n => !n.read).length;

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 32px',
    backgroundColor: 'var(--surface)',
    borderBottom: '1px solid var(--border)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  };

  const dropdownStyle = {
    position: 'absolute',
    top: '70px',
    right: '32px',
    width: '380px',
    backgroundColor: 'var(--surface)',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-lg)',
    border: '1px solid var(--border)',
    overflow: 'hidden',
    animation: 'slideDown 0.2s ease-out',
    display: showNotifications ? 'block' : 'none',
  };

  const notificationItemStyle = (read) => ({
    padding: '16px 20px',
    display: 'flex',
    gap: '16px',
    borderBottom: '1px solid var(--border)',
    cursor: 'pointer',
    backgroundColor: read ? 'transparent' : 'var(--bg)',
    transition: 'background-color 0.2s',
  });

  return (
    <header style={headerStyle}>
      <style>
        {`
          @keyframes slideDown {
            from { transform: translateY(-10px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>

      {user?.role !== 'customer' ? (
        <div style={{ position: 'relative', flex: 1, maxWidth: '400px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          {isMobile && (
            <button 
              onClick={toggleSidebar}
              style={{ color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--surface-hover)' }}
            >
              <Menu size={20} />
            </button>
          )}

        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          {isMobile && (
            <button 
              onClick={toggleSidebar}
              style={{ color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--surface-hover)' }}
            >
              <Menu size={20} />
            </button>
          )}
        </div>
      )}
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button 
            className="notification-trigger"
            onClick={() => setShowNotifications(!showNotifications)}
            style={{ color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '10px', position: 'relative', transition: 'all 0.2s', backgroundColor: showNotifications ? 'var(--surface-hover)' : 'transparent' }}
          >
            <Bell size={20} />
            {unreadCount > 0 && <span style={{ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', backgroundColor: 'var(--accent)', borderRadius: '50%', border: '2px solid var(--surface)' }}></span>}
          </button>

          {/* Notification Dropdown */}
          <div style={dropdownStyle} ref={dropdownRef}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg)' }}>
              <span style={{ fontWeight: '700', color: 'var(--text-bright)' }}>Notifications</span>
              <button 
                onClick={handleMarkAllAsRead}
                style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Mark all as read
              </button>
            </div>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {notificationList.map(n => (
                <div 
                  key={n.id} 
                  style={notificationItemStyle(n.read)}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--surface-hover)'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = n.read ? 'transparent' : 'var(--bg)'}
                  onClick={() => handleMarkAsRead(n.id)}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: n.type === 'security' ? 'rgba(239, 68, 68, 0.1)' : 'var(--accent-muted)', color: n.type === 'security' ? 'var(--error)' : 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <n.icon size={18} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-bright)', marginBottom: '4px' }}>{n.title}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text)', lineHeight: '1.4' }}>{n.message}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={10} /> {n.time}
                    </div>
                  </div>
                  {!n.read && <div style={{ width: '6px', height: '6px', backgroundColor: 'var(--accent)', borderRadius: '50%', marginTop: '6px' }}></div>}
                </div>
              ))}
            </div>
            <div style={{ padding: '12px', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
              <button style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)', background: 'none', border: 'none', cursor: 'pointer' }}>View All Activity</button>
            </div>
          </div>
        </div>

        {location.pathname !== '/agent/profile' && location.pathname !== '/superadmin/settings' && (
          <button 
            onClick={() => {
              if (user?.role === 'agent') navigate('/agent/profile');
              else navigate(`/${user?.role}/settings` || '/admin/settings');
            }}
            style={{ color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '10px', transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--surface-hover)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Settings size={20} />
          </button>
        )}
        
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '12px', paddingLeft: isMobile ? '8px' : '20px', borderLeft: isMobile ? 'none' : '1px solid var(--border)' }}>
          {!isMobile && (
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-bright)' }}>{user?.name || 'Demo User'}</div>
              <div style={{ fontSize: '12px', color: 'var(--text)', textTransform: 'capitalize' }}>{user?.role || 'Admin'}</div>
            </div>
          )}
          <Avatar name={user?.name || 'D'} size="medium" />
        </div>
      </div>
    </header>
  );
};

export default Header;
