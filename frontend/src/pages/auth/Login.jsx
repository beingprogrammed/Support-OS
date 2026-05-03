import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Zap, Search, Shield, User, Users } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import useNotification from '../../hooks/useNotification';
import Button from '../../components/common/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState('login'); // 'login' or 'role-selection'
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const notification = useNotification();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // Simulate login success and move to role selection
    setStep('role-selection');
    notification.success('Logged in! Now select your role.');
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      setIsGoogleLoading(false);
      setStep('role-selection');
      notification.success('Google Login successful! Select your role.');
    }, 1500);
  };

  const handleRoleSelect = (role) => {
    // In a real app, you'd update the user object in context/store
    // For this demo, we'll simulate the update
    const mockUser = {
      email: email || 'user@example.com',
      name: 'Demo User',
      role: role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`,
    };

    localStorage.setItem('supportos_user', JSON.stringify(mockUser));
    // We might need to refresh the page or call a function to update the auth state
    // but for simplicity, we'll just navigate
    window.location.href = `/${role}`;
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '24px',
    backgroundColor: 'var(--bg)',
    background: 'radial-gradient(circle at top right, rgba(124, 58, 237, 0.05), transparent 40%), radial-gradient(circle at bottom left, rgba(124, 58, 237, 0.05), transparent 40%)',
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '440px',
    padding: '48px',
    textAlign: 'center',
  };

  const headerStyle = {
    marginBottom: '40px',
  };

  const logoIconStyle = {
    width: '56px',
    height: '56px',
    borderRadius: '14px',
    background: 'var(--accent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    margin: '0 auto 20px',
    boxShadow: '0 8px 30px rgba(124, 58, 237, 0.3)',
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: '800',
    color: 'var(--text-bright)',
    marginBottom: '10px',
    letterSpacing: '-1px',
  };

  const subtitleStyle = {
    color: 'var(--text)',
    fontSize: '16px',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const inputStyle = {
    width: '100%',
    backgroundColor: '#ffffff',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    padding: '14px 16px 14px 48px',
    color: 'var(--text-bright)',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.2s',
  };

  const inputWrapperStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const iconStyle = {
    position: 'absolute',
    left: '16px',
    color: 'var(--text)',
  };

  const dividerStyle = {
    display: 'flex',
    alignItems: 'center',
    margin: '24px 0',
    color: 'var(--text)',
    fontSize: '14px',
  };

  const lineStyle = {
    flex: 1,
    height: '1px',
    backgroundColor: 'var(--border)',
    margin: '0 12px',
  };

  const roleGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginTop: '20px',
  };

  return (
    <div style={containerStyle}>
      <div className="glass-card animate-fade-in" style={cardStyle}>
        <div style={headerStyle}>
          <div style={logoIconStyle}>
            <Zap size={32} fill="currentColor" />
          </div>
          <h1 style={titleStyle}>SupportOS</h1>
          <p style={subtitleStyle}>
            {step === 'login' ? 'Welcome back! Please enter your details.' : 'Select your workspace persona.'}
          </p>
        </div>

        {step === 'login' ? (
          <>
            <form onSubmit={handleLoginSubmit} style={formStyle}>
              <div style={inputWrapperStyle}>
                <Mail size={20} style={iconStyle} />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>
              <div style={inputWrapperStyle}>
                <Lock size={20} style={iconStyle} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>

              <Button type="submit" variant="primary" fullWidth loading={loading}>
                Sign In
              </Button>
            </form>

            <div style={dividerStyle}>
              <div style={lineStyle}></div>
              <span>OR</span>
              <div style={lineStyle}></div>
            </div>

            <Button
              variant="outline"
              fullWidth
              onClick={handleGoogleLogin}
              loading={isGoogleLoading}
              icon={() => (
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  style={{ width: '18px', height: '18px' }}
                />
              )}
            >
              Continue with Google
            </Button>
          </>
        ) : (
          <div style={roleGridStyle}>
            <Button variant="outline" onClick={() => handleRoleSelect('customer')} icon={User}>
              Customer
            </Button>
            <Button variant="outline" onClick={() => handleRoleSelect('agent')} icon={Users}>
              Agent
            </Button>
            <Button variant="outline" onClick={() => handleRoleSelect('admin')} icon={Settings}>
              Admin
            </Button>
            <Button variant="outline" onClick={() => handleRoleSelect('superadmin')} icon={Shield}>
              Super Admin
            </Button>

            <Button
              variant="ghost"
              fullWidth
              style={{ gridColumn: 'span 2', marginTop: '12px' }}
              onClick={() => setStep('login')}
            >
              Back to Login
            </Button>
          </div>
        )}

        <div style={{ marginTop: '40px', fontSize: '15px', color: 'var(--text)' }}>
          <p>Don't have an account? <Link to="/register" style={{ color: 'var(--accent)', fontWeight: '700' }}>Create one</Link></p>
          <p style={{ marginTop: '12px', fontSize: '12px' }}>
            <Link to="/alerts-demo" style={{ color: 'var(--text)', opacity: 0.6 }}>View Alerts Demo</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Simple inline Settings icon since we didn't import it
const Settings = ({ size }) => <Search size={size} />;

export default Login;
