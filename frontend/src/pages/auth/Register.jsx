import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, Zap, ChevronRight, Shield } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import useNotification from '../../hooks/useNotification';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { loading } = useAuth();
  const navigate = useNavigate();
  const notification = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registering:', formData);
    // Placeholder for registration logic
    notification.success('Registration successful! Redirecting to login...');
    navigate('/login');
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '24px',
    backgroundColor: 'var(--bg)',
    backgroundImage: 'radial-gradient(circle at 0% 0%, var(--accent-muted) 0%, transparent 50%), radial-gradient(circle at 100% 100%, var(--accent-muted) 0%, transparent 50%)',
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '480px',
    padding: '48px',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '32px',
  };

  const logoStyle = {
    width: '56px',
    height: '56px',
    borderRadius: '14px',
    backgroundColor: 'var(--accent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    margin: '0 auto 16px',
    boxShadow: '0 8px 16px rgba(124, 58, 237, 0.2)',
  };

  const footerStyle = {
    marginTop: '32px',
    textAlign: 'center',
    fontSize: '14px',
    color: 'var(--text)',
    paddingTop: '24px',
    borderTop: '1px solid var(--border)',
  };

  return (
    <div style={containerStyle}>
      <div className="glass-card animate-fade-in" style={cardStyle}>
        <div style={headerStyle}>
          <div style={logoStyle}>
            <Zap size={32} fill="currentColor" />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-bright)', marginBottom: '8px' }}>Create Account</h1>
          <p style={{ color: 'var(--text)', fontSize: '15px' }}>Start your 14-day free trial. No credit card required.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            placeholder="John Doe"
            icon={User}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            icon={Mail}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            icon={Lock}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            icon={Shield}
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <input type="checkbox" id="terms" required style={{ width: '16px', height: '16px' }} />
            <label htmlFor="terms" style={{ fontSize: '13px', color: 'var(--text)' }}>
              I agree to the <a href="#" onClick={(e) => {e.preventDefault(); notification.info('Terms of Service clicked');}} style={{ color: 'var(--accent)', fontWeight: '600' }}>Terms of Service</a> and <a href="#" onClick={(e) => {e.preventDefault(); notification.info('Privacy Policy clicked');}} style={{ color: 'var(--accent)', fontWeight: '600' }}>Privacy Policy</a>.
            </label>
          </div>

          <Button type="submit" variant="primary" fullWidth loading={loading} icon={UserPlus}>
            Create Account
          </Button>
        </form>

        <div style={footerStyle}>
          <span>Already have an account?</span>{' '}
          <Link to="/login" style={{ color: 'var(--accent)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            Sign in <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
