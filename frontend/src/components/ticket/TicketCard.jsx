import React from 'react';
import { Clock, MessageSquare, Paperclip, User } from 'lucide-react';
import TicketStatusBadge from './TicketStatusBadge';
import PrioritySelector from './PrioritySelector';
import Avatar from '../common/Avatar';

const TicketCard = ({ ticket, onClick }) => {
  const { id, subject, customer, status, priority, lastUpdate, messageCount, attachmentCount } = ticket;

  const cardStyle = {
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    borderBottom: '1px solid var(--border)',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  };

  const footerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '4px',
  };

  const metaStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '13px',
    color: 'var(--text)',
  };

  const iconTextStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  return (
    <div 
      className="ticket-card" 
      style={cardStyle} 
      onClick={onClick}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-hover)'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      <div style={headerStyle}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--accent)' }}>{id}</span>
            <TicketStatusBadge status={status} />
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-bright)', marginTop: '4px' }}>{subject}</h3>
        </div>
        <PrioritySelector value={priority} />
      </div>

      <div style={footerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Avatar name={customer?.name} size="small" />
          <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-bright)' }}>{customer?.name}</div>
        </div>
        
        <div style={metaStyle}>
          <div style={iconTextStyle}>
            <Clock size={14} />
            {lastUpdate}
          </div>
          {messageCount > 0 && (
            <div style={iconTextStyle}>
              <MessageSquare size={14} />
              {messageCount}
            </div>
          )}
          {attachmentCount > 0 && (
            <div style={iconTextStyle}>
              <Paperclip size={14} />
              {attachmentCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
