import React from 'react';
import { MessageSquare, Shield, Clock, User, Phone, Video, MoreHorizontal, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChatWindow from '../../components/chat/ChatWindow';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';

const ChatWidget = () => {
  const navigate = useNavigate();
  const ticketId = 'TC-1024';

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: '320px 1fr',
    gap: '24px',
    height: 'calc(100vh - 160px)',
  };

  const sidebarStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  };

  const sectionTitleStyle = {
    fontSize: '12px',
    fontWeight: '700',
    color: 'var(--text)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '16px',
  };

  const infoItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginBottom: '16px',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Button variant="ghost" size="small" onClick={() => navigate('/customer')}>
            <ArrowLeft size={20} />
          </Button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-bright)' }}>Chat Support</h2>
              <Badge variant="success">ACTIVE</Badge>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text)' }}>Ticket #{ticketId} • Technical Support</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="outline" icon={Phone}>Call Support</Button>
          <Button variant="ghost" icon={MoreHorizontal} />
        </div>
      </div>

      <div style={containerStyle}>
        {/* Left Sidebar: Ticket Info */}
        <div style={sidebarStyle}>
          <div className="glass-card" style={{ padding: '24px' }}>
            <h4 style={sectionTitleStyle}>Ticket Information</h4>
            
            <div style={infoItemStyle}>
              <span style={{ fontSize: '12px', color: 'var(--text)' }}>Subject</span>
              <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-bright)' }}>Unable to access dashboard</span>
            </div>

            <div style={infoItemStyle}>
              <span style={{ fontSize: '12px', color: 'var(--text)' }}>Priority</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--error)' }}></div>
                <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-bright)' }}>High</span>
              </div>
            </div>

            <div style={infoItemStyle}>
              <span style={{ fontSize: '12px', color: 'var(--text)' }}>Created</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-bright)', fontSize: '14px', marginTop: '4px' }}>
                <Clock size={14} /> Oct 24, 2024
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px' }}>
            <h4 style={sectionTitleStyle}>Assigned Agent</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Avatar name="Sarah Wilson" size="medium" />
              <div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-bright)' }}>Sarah Wilson</div>
                <div style={{ fontSize: '12px', color: 'var(--success)', fontWeight: '600' }}>Online</div>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text)', marginTop: '16px', lineHeight: '1.5' }}>
              Sarah is a Technical Support Specialist with 5+ years of experience.
            </p>
            <Button variant="outline" fullWidth size="small" style={{ marginTop: '16px' }}>View Full Profile</Button>
          </div>

          <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'var(--accent-muted)', border: '1px solid var(--accent-muted)', display: 'flex', gap: '12px' }}>
            <Shield size={20} color="var(--accent)" />
            <span style={{ fontSize: '12px', color: 'var(--text)', lineHeight: '1.4' }}>
              Your conversation is encrypted and secure.
            </span>
          </div>
        </div>

        {/* Right Content: Chat Window */}
        <div style={{ height: '100%' }}>
          <ChatWindow contactName="Support Assistant" status="Online" />
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
