import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Globe, Calendar, Shield, ExternalLink, MoreVertical } from 'lucide-react';
import ChatWindow from '../../components/chat/ChatWindow';
import TicketTimeline from '../../components/ticket/TicketTimeline';
import TicketStatusBadge from '../../components/ticket/TicketStatusBadge';
import PrioritySelector from '../../components/ticket/PrioritySelector';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';

import AISuggestedReply from './AISuggestedReply';

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const ticket = {
    id: id || 'TC-1024',
    subject: 'Server connection issues in EMEA',
    status: 'Open',
    priority: 'High',
    customer: {
      name: 'Sarah Connor',
      email: 'sarah.c@cyberdyne.com',
      location: 'Los Angeles, CA',
      joinDate: 'Jan 2024',
    },
    meta: {
      category: 'Technical Support',
      assignedAgent: 'SupportOS Agent',
      createdAt: 'Oct 24, 2024, 10:00 AM',
    }
  };

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 340px',
    gap: '32px',
    height: 'calc(100vh - 160px)',
  };

  const infoColumnStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    overflowY: 'auto',
    paddingRight: '8px',
  };

  const sectionTitleStyle = {
    fontSize: '14px',
    fontWeight: '700',
    color: 'var(--text-bright)',
    marginBottom: '16px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const infoRowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '14px',
    color: 'var(--text)',
    marginBottom: '12px',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Button variant="ghost" size="small" onClick={() => navigate('/agent/queue')}>
            <ArrowLeft size={20} />
          </Button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-bright)' }}>{ticket.id}</span>
              <TicketStatusBadge status={ticket.status} />
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text)', marginTop: '2px' }}>{ticket.subject}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="outline">Close Ticket</Button>
          <Button variant="primary">Submit Changes</Button>
          <Button variant="ghost" icon={MoreVertical} />
        </div>
      </div>

      {/* Main Content Split */}
      <div style={containerStyle}>
        {/* Left: Chat */}
        <div style={{ height: '100%' }}>
          <ChatWindow contactName={ticket.customer.name} />
        </div>

        {/* Right: Info + Timeline */}
        <div style={infoColumnStyle}>
          {/* Customer Card */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h4 style={sectionTitleStyle}>Customer Details</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Avatar name={ticket.customer.name} size="large" />
              <div>
                <div style={{ fontWeight: '700', color: 'var(--text-bright)' }}>{ticket.customer.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text)' }}>ID: C-90210</div>
              </div>
            </div>
            <div style={infoRowStyle}><Mail size={16} /> {ticket.customer.email}</div>
            <div style={infoRowStyle}><Globe size={16} /> {ticket.customer.location}</div>
            <div style={infoRowStyle}><Calendar size={16} /> Member since {ticket.customer.joinDate}</div>
            <Button variant="outline" fullWidth size="small" style={{ marginTop: '8px' }}>View Profile</Button>
          </div>

          {/* Ticket Properties */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h4 style={sectionTitleStyle}>Properties</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text)', display: 'block', marginBottom: '6px' }}>Priority</label>
                <PrioritySelector value={ticket.priority} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text)', display: 'block', marginBottom: '6px' }}>Category</label>
                <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-bright)' }}>{ticket.meta.category}</div>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text)', display: 'block', marginBottom: '6px' }}>Created At</label>
                <div style={{ fontSize: '13px', color: 'var(--text-bright)' }}>{ticket.meta.createdAt}</div>
              </div>
            </div>
          </div>

          {/* AI Suggestions */}
          <AISuggestedReply onSelect={(text) => console.log('AI Reply Selected:', text)} />

          {/* Timeline */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h4 style={sectionTitleStyle}>History</h4>
            <TicketTimeline />
            <Button variant="ghost" fullWidth size="small" style={{ marginTop: '16px' }} icon={ExternalLink}>View Full Log</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
