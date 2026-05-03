import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import useAuth from '../../hooks/useAuth';

const PageWrapper = ({ title }) => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const layoutStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: 'var(--bg)',
    color: 'var(--text)',
  };

  const contentAreaStyle = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minWidth: 0, // Prevent flex items from overflowing
  };

  const mainStyle = {
    padding: '32px',
    flexGrow: 1,
    overflowY: 'auto',
  };

  return (
    <div style={layoutStyle}>
      <Sidebar isMobileOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 90 }}
        />
      )}
      <div style={contentAreaStyle}>
        <Header title={title} user={user} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main style={mainStyle} className="animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PageWrapper;
