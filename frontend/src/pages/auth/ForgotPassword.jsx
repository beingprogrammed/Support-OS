import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, Zap, CheckCircle, ChevronLeft } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Reset password for:', email);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '24px',
    backgroundColor: 'var(--bg)',
    backgroundImage: 'radial-gradient(circle at 50% 50%, var(--accent-muted) 0%, transparent 70%)',
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '440px',
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

  const successCardStyle = {
    textAlign: 'center',
    padding: '32px',
    backgroundColor: 'var(--bg)',
    borderRadius: '16px',
    border: '1px solid var(--border)',
    marginBottom: '24px',
  };

  return (
    <div style={containerStyle}>
      <div className="glass-card animate-fade-in" style={cardStyle}>
        <div style={headerStyle}>
          <div style={logoStyle}>
            <Zap size={32} fill="currentColor" />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-bright)', marginBottom: '8px' }}>Reset Password</h1>
          <p style={{ color: 'var(--text)', fontSize: '15px' }}>We'll help you get back into your account.</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <p style={{ fontSize: '14px', color: 'var(--text)', marginBottom: '24px', textAlign: 'center', lineHeight: '1.5' }}>
              Enter the email address associated with your account and we'll send you a link to reset your password.
            </p>
            <Input
              label="Email Address"
              type="email"
              placeholder="name@company.com"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" variant="primary" fullWidth icon={Send} loading={loading}>
              Send Reset Link
            </Button>
          </form>
        ) : (
          <div style={successCardStyle} className="animate-fade-in">
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
               <CheckCircle size={32} />
            </div>
            <h3 style={{ color: 'var(--text-bright)', fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Check your email</h3>
            <p style={{ fontSize: '14px', color: 'var(--text)', lineHeight: '1.5' }}>
               We've sent a password reset link to <br/>
               <strong style={{ color: 'var(--text-bright)' }}>{email}</strong>.
            </p>
            <Button variant="outline" size="small" style={{ marginTop: '24px' }} onClick={() => setSubmitted(false)}>
               Try another email
            </Button>
          </div>
        )}

        <div style={{ marginTop: '32px', textAlign: 'center', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
          <Link to="/login" style={{ color: 'var(--text)', fontWeight: '600', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <ChevronLeft size={16} /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
