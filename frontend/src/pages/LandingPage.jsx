import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Clock, 
  Users, 
  Repeat, 
  MessageSquare, 
  Bot, 
  Send, 
  Zap, 
  ShieldCheck, 
  Workflow, 
  Settings,
  Mic,
  Globe,
  Brain,
  BarChart3,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import Button from '../components/common/Button';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const handleScrollEvent = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScrollEvent);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  const theme = {
    bg: '#F9FAFB',
    text: '#111827',
    textMuted: '#6B7280',
    primary: '#7C3AED',
    primaryHover: '#6D28D9',
    cardBg: '#FFFFFF',
    border: '#E5E7EB',
  };

  const containerStyle = {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: theme.bg,
    color: theme.text,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
  };

  const sectionStyle = {
    padding: isMobile ? '48px 16px' : '96px 24px',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  };

  const headingStyle = {
    fontSize: isMobile ? '32px' : '48px',
    fontWeight: '800',
    letterSpacing: '-0.02em',
    lineHeight: '1.1',
    marginBottom: '24px',
    color: theme.text,
  };

  const subtitleStyle = {
    fontSize: isMobile ? '16px' : '20px',
    color: theme.textMuted,
    lineHeight: '1.6',
    maxWidth: '600px',
    margin: '0 auto 48px',
  };

  const cardStyle = {
    backgroundColor: theme.cardBg,
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
    border: `1px solid ${theme.border}`,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'default',
  };

  const handleCardHover = (e) => {
    e.currentTarget.style.transform = 'translateY(-4px)';
    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
  };

  const handleCardLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)';
  };

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: isScrolled || isMobile ? 'rgba(249, 250, 251, 0.9)' : 'transparent',
    backdropFilter: isScrolled || isMobile ? 'blur(8px)' : 'none',
    borderBottom: isScrolled ? `1px solid ${theme.border}` : '1px solid transparent',
    transition: 'all 0.3s ease',
  };

  const navStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '16px' : '0',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: isMobile ? '16px' : (isScrolled ? '16px 48px' : '24px 48px'),
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
  };

  const linkStyle = {
    color: theme.textMuted,
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'color 0.2s',
    background: 'none',
    border: 'none',
    padding: 0,
  };

  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={containerStyle}>
      {/* HEADER */}
      <header style={headerStyle}>
        <nav style={navStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Zap size={16} />
            </div>
            <span style={{ fontWeight: '800', color: theme.text, fontSize: '18px', letterSpacing: '-0.02em' }}>SupportOS</span>
          </div>
          
          <div style={{ display: isMobile ? 'none' : 'flex', gap: '32px', alignItems: 'center' }}>
            <button style={linkStyle} onMouseEnter={e => e.currentTarget.style.color = theme.text} onMouseLeave={e => e.currentTarget.style.color = theme.textMuted} onClick={() => handleScroll('problem')}>Problem</button>
            <button style={linkStyle} onMouseEnter={e => e.currentTarget.style.color = theme.text} onMouseLeave={e => e.currentTarget.style.color = theme.textMuted} onClick={() => handleScroll('solution')}>Solution</button>
            <button style={linkStyle} onMouseEnter={e => e.currentTarget.style.color = theme.text} onMouseLeave={e => e.currentTarget.style.color = theme.textMuted} onClick={() => handleScroll('features')}>Features</button>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button style={linkStyle} onMouseEnter={e => e.currentTarget.style.color = theme.text} onMouseLeave={e => e.currentTarget.style.color = theme.textMuted} onClick={() => navigate('/login')}>Sign in</button>
            <button 
              onClick={() => navigate('/login')}
              style={{
                backgroundColor: theme.text,
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Get Started
            </button>
          </div>
        </nav>
      </header>
      {/* 1. HERO SECTION */}
      <section style={{ ...sectionStyle, padding: isMobile ? '160px 16px 64px' : '160px 24px 96px', textAlign: 'center', opacity: isVisible ? 1 : 0, transition: 'opacity 0.8s ease' }}>
        <h1 style={{ ...headingStyle, fontSize: isMobile ? '40px' : '64px', maxWidth: '800px', margin: '0 auto 24px' }}>
          Customer Support, <span style={{ color: theme.primary }}>Powered by AI</span>
        </h1>
        <p style={subtitleStyle}>
          Instant replies. Smart tickets. Zero stress. Give your team the superpowers they need to deliver exceptional support at scale.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button 
            onClick={() => navigate('/login')}
            style={{
              backgroundColor: theme.primary,
              color: 'white',
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.primaryHover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.primary}
          >
            Get Started <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* 2. PROBLEM SECTION */}
      <section id="problem" style={{ ...sectionStyle, backgroundColor: theme.cardBg, borderRadius: isMobile ? '16px' : '32px', padding: isMobile ? '48px 24px' : '96px 48px', maxWidth: '1152px', margin: isMobile ? '0 16px 64px' : '0 auto 96px' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '32px' : '64px' }}>
          <h2 style={{ ...headingStyle, fontSize: isMobile ? '28px' : '36px', marginBottom: '16px' }}>Support is Broken</h2>
          <p style={{ color: theme.textMuted, fontSize: isMobile ? '16px' : '18px' }}>Traditional helpdesks can't keep up with modern expectations.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {[
            { icon: Clock, title: 'Slow Replies', desc: 'Customers wait hours or days for simple answers.' },
            { icon: Users, title: 'Overloaded Agents', desc: 'Support teams are drowning in infinite ticket queues.' },
            { icon: Repeat, title: 'Repetitive Work', desc: 'Agents answer the same 10 questions every single day.' }
          ].map((item, i) => (
            <div key={i} style={cardStyle} onMouseEnter={handleCardHover} onMouseLeave={handleCardLeave}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', color: theme.textMuted }}>
                <item.icon size={24} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ color: theme.textMuted, lineHeight: '1.5' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SOLUTION SECTION */}
      <section id="solution" style={{ ...sectionStyle, padding: isMobile ? '32px 16px 64px' : '48px 24px 96px', textAlign: 'center' }}>
        <h2 style={{ ...headingStyle, fontSize: isMobile ? '28px' : '36px', marginBottom: '16px' }}>Meet SupportOS</h2>
        <p style={{ ...subtitleStyle, marginBottom: isMobile ? '40px' : '80px' }}>A seamless workflow designed to eliminate friction.</p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', maxWidth: '800px', margin: '0 auto' }}>
          {[
            { icon: MessageSquare, title: 'User sends message', color: '#3B82F6' },
            { icon: Bot, title: 'AI generates draft', color: theme.primary },
            { icon: Send, title: 'Agent reviews & sends', color: '#10B981' }
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', backgroundColor: theme.cardBg, padding: '24px 32px', borderRadius: '16px', border: `1px solid ${theme.border}`, width: '100%', maxWidth: '400px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: `${step.color}15`, color: step.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <step.icon size={20} />
                </div>
                <div style={{ fontSize: '18px', fontWeight: '600' }}>{step.title}</div>
              </div>
              {i < 2 && (
                <div style={{ height: '40px', width: '2px', backgroundColor: theme.border, margin: '16px 0' }}></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURES SECTION */}
      <section id="features" style={{ ...sectionStyle, padding: '48px 24px 96px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {[
            { icon: Zap, title: 'AI Smart Replies', desc: 'Context-aware drafts instantly generated for every incoming ticket.' },
            { icon: MessageSquare, title: 'Real-time Chat', desc: 'Live widget integrated directly into your web application.' },
            { icon: Workflow, title: 'Smart Ticket Routing', desc: 'Automatically assign tickets based on agent expertise and workload.' },
            { icon: ShieldCheck, title: 'Role-based Access', desc: 'Granular permissions for Admins, Agents, and Customers.' }
          ].map((item, i) => (
            <div key={i} style={{ ...cardStyle, borderTop: `4px solid ${theme.primary}` }} onMouseEnter={handleCardHover} onMouseLeave={handleCardLeave}>
              <item.icon size={28} style={{ color: theme.primary, marginBottom: '20px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ color: theme.textMuted, fontSize: '14px', lineHeight: '1.6' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRODUCT SNAPSHOT */}
      <section style={{ ...sectionStyle, backgroundColor: '#F3F4F6', borderRadius: isMobile ? '16px' : '32px', padding: isMobile ? '48px 24px' : '96px 48px', maxWidth: '1152px', margin: isMobile ? '0 16px 64px' : '0 auto 96px' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '32px' : '64px' }}>
          <h2 style={{ ...headingStyle, fontSize: isMobile ? '28px' : '36px', marginBottom: '16px' }}>Simple, powerful interface</h2>
          <p style={{ color: theme.textMuted, fontSize: isMobile ? '16px' : '18px' }}>No clutter. Just the information you need.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '700px', margin: '0 auto' }}>
          {[
            { id: '#TC-1024', subject: 'Unable to access dashboard', status: 'Open', priority: 'High', agent: 'Sarah Wilson', time: '12m ago' },
            { id: '#TC-1025', subject: 'Billing inquiry - invoice #882', status: 'Pending', priority: 'Medium', agent: 'John Doe', time: '2h ago' },
            { id: '#TC-1026', subject: 'Feature request: Dark mode export', status: 'Resolved', priority: 'Low', agent: 'Unassigned', time: '1d ago' },
          ].map((ticket, i) => (
            <div key={i} style={{ backgroundColor: theme.cardBg, borderRadius: '12px', padding: isMobile ? '16px' : '20px 24px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? '16px' : '0', justifyContent: 'space-between', border: `1px solid ${theme.border}`, boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? '8px' : '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: theme.textMuted }}>{ticket.id}</div>
                <div style={{ fontSize: '16px', fontWeight: '600', lineHeight: '1.4' }}>{ticket.subject}</div>
              </div>
              <div style={{ display: 'flex', width: isMobile ? '100%' : 'auto', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '20px', backgroundColor: ticket.status === 'Open' ? '#DBEAFE' : ticket.status === 'Pending' ? '#FEF3C7' : '#D1FAE5', color: ticket.status === 'Open' ? '#1D4ED8' : ticket.status === 'Pending' ? '#B45309' : '#047857', fontWeight: '600' }}>{ticket.status}</span>
                  <span style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '20px', backgroundColor: ticket.priority === 'High' ? '#FEE2E2' : '#F3F4F6', color: ticket.priority === 'High' ? '#B91C1C' : theme.textMuted, fontWeight: '600' }}>{ticket.priority}</span>
                </div>
                <div style={{ fontSize: '14px', color: theme.textMuted, width: isMobile ? 'auto' : '100px', textAlign: 'right' }}>{ticket.agent}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. IMPACT SECTION */}
      <section style={{ ...sectionStyle, padding: isMobile ? '32px 16px 64px' : '48px 24px 96px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '24px' : '48px', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ backgroundColor: '#FEF2F2', borderRadius: '24px', padding: isMobile ? '32px' : '48px', border: '1px solid #FECACA' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#991B1B', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <XCircle size={24} /> Before
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {['Slow, delayed replies', 'Manual typing for every ticket', 'Agents buried in backlog', 'Frustrated customers'].map((item, i) => (
                <li key={i} style={{ color: '#7F1D1D', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#EF4444' }} /> {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div style={{ backgroundColor: '#F5F3FF', borderRadius: '24px', padding: isMobile ? '32px' : '48px', border: '1px solid #DDD6FE' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: theme.primary, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CheckCircle2 size={24} /> After SupportOS
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {['Instant AI-generated responses', 'One-click draft approvals', 'Zero-inbox achieved daily', 'Exceptional satisfaction'].map((item, i) => (
                <li key={i} style={{ color: theme.primaryHover, display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px', fontWeight: '500' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: theme.primary }} /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. VISION SECTION */}
      <section style={{ ...sectionStyle, padding: '48px 24px 96px', textAlign: 'center' }}>
        <h2 style={{ ...headingStyle, fontSize: '32px', marginBottom: '48px' }}>The Future of Support</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px', maxWidth: '800px', margin: '0 auto' }}>
          {[
            { icon: Mic, label: 'Voice-based Support' },
            { icon: Globe, label: 'Multi-language AI' },
            { icon: Brain, label: 'Autonomous Agents' },
            { icon: BarChart3, label: 'Deep Analytics' }
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 24px', backgroundColor: theme.cardBg, borderRadius: '100px', border: `1px solid ${theme.border}`, fontSize: '16px', fontWeight: '600', color: theme.text }}>
              <item.icon size={18} style={{ color: theme.textMuted }} />
              {item.label}
            </div>
          ))}
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section style={{ ...sectionStyle, padding: '96px 24px 160px', textAlign: 'center' }}>
        <h2 style={{ ...headingStyle, fontSize: '48px', marginBottom: '32px' }}>Give your support team superpowers</h2>
      </section>
      
      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${theme.border}`, padding: isMobile ? '32px 16px' : '48px 24px', textAlign: 'center', color: theme.textMuted, fontSize: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '6px', backgroundColor: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <Zap size={14} />
          </div>
          <span style={{ fontWeight: '700', color: theme.text, fontSize: '16px' }}>SupportOS</span>
        </div>
        <p>© 2026 SupportOS Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
