import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import useAuth from '../hooks/useAuth';

const NotFound = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGoBack = () => {
    if (user?.role) {
      navigate(`/${user.role}`);
    } else {
      navigate('/login');
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: 'var(--bg)',
    position: 'relative',
    overflow: 'hidden',
    padding: '20px',
  };

  const background404Style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '50vw',
    fontWeight: '900',
    color: 'var(--text)',
    opacity: 0.1,
    zIndex: 0,
    pointerEvents: 'none',
    userSelect: 'none',
    lineHeight: 1,
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 1,
    textAlign: 'center',
  };

  const imageStyle = {
    width: '100%',
    maxWidth: '400px',
    height: 'auto',
    marginBottom: '24px',
    animation: 'float 6s ease-in-out infinite',
  };

  const titleStyle = {
    fontSize: '36px',
    fontWeight: '700',
    color: 'var(--text-bright)',
    marginBottom: '16px',
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
      
      <div style={background404Style}>404</div>
      
      <div style={contentStyle} className="animate-fade-in">
        <img 
          src="/images/404-monster.png" 
          alt="Confused purple monster" 
          style={imageStyle}
        />
        <h1 style={titleStyle}>Oops, I think we're lost</h1>
        <Button variant="primary" onClick={handleGoBack}>
          Let's get you back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
