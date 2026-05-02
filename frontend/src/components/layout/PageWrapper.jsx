import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import useAuth from '../../hooks/useAuth';

const PageWrapper = ({ title }) => {
  const { user } = useAuth();
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
      <Sidebar />
      <div style={contentAreaStyle}>
        <Header title={title} user={user} />
        <main style={mainStyle} className="animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PageWrapper;
