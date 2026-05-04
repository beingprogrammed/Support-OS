import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Ticket, 
  MessageSquare, 
  User, 
  Settings, 
  LogOut, 
  Zap,
  Shield,
  Users,
  Building2,
  BarChart3
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const Sidebar = ({ isMobileOpen, closeSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const sidebarStyle = {
    width: '280px',
    height: '100vh',
    borderRight: '1px solid var(--border)',
    backgroundColor: 'var(--surface)',
    display: 'flex',
    flexDirection: 'column',
    padding: '32px 20px',
    boxSizing: 'border-box',
    flexShrink: 0,
    position: 'sticky',
    top: 0,
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '22px',
    fontWeight: '800',
    color: 'var(--text-bright)',
    marginBottom: '48px',
    paddingLeft: '12px',
    letterSpacing: '-0.5px',
  };

  const navSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flexGrow: 1,
  };

  const navItemStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '12px',
    textDecoration: 'none',
    color: isActive ? 'var(--accent)' : 'var(--text)',
    backgroundColor: isActive ? 'var(--accent-muted)' : 'transparent',
    fontWeight: isActive ? '600' : '500',
    fontSize: '15px',
    transition: 'all 0.2s ease',
  });

  const footerStyle = {
    paddingTop: '20px',
    borderTop: '1px solid var(--border)',
  };

  const logoutButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '12px',
    color: 'var(--error)',
    width: '100%',
    textAlign: 'left',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  // Define links based on role
  const getNavItems = () => {
    switch (user?.role) {
      case 'customer':
        return [
          { path: '/customer', label: 'My Tickets', icon: Ticket },
          { path: '/customer/new-ticket', label: 'New Ticket', icon: Zap },
          { path: '/customer/chat', label: 'Live Chat', icon: MessageSquare },
        ];
      case 'agent':
        return [
          { path: '/agent', label: 'Dashboard', icon: LayoutDashboard },
          { path: '/agent/queue', label: 'Ticket Queue', icon: Ticket },
        ];
      case 'admin':
        return [
          { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
          { path: '/admin/agents', label: 'Agent Mgmt', icon: Users },
          { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
          { path: '/admin/settings', label: 'Settings', icon: Settings },
        ];
      case 'superadmin':
        return [
          { path: '/superadmin', label: 'Platform', icon: Shield },
          { path: '/superadmin/tenants', label: 'Tenants', icon: Building2 },
        ];
      default:
        return [];
    }
  };

  return (
    <aside className={isMobileOpen ? "mobile-open" : ""} style={sidebarStyle}>
      <div style={logoStyle}>
        <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'var(--accent)', color: 'white' }}>
          <Zap size={20} fill="currentColor" />
        </div>
        SupportOS
      </div>
      
      <nav style={navSectionStyle}>
        {getNavItems().map((item) => (
          <NavLink key={item.path} to={item.path} style={navItemStyle} end onClick={closeSidebar}>
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div style={footerStyle}>
        <button 
          style={logoutButtonStyle}
          onClick={logout}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.05)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
