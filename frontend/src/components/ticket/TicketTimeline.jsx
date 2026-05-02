import React from 'react';
import { Clock, User, CheckCircle, MessageSquare, AlertCircle } from 'lucide-react';

const TicketTimeline = ({ events }) => {
  const defaultEvents = [
    { id: 1, type: 'created', text: 'Ticket created by Sarah Connor', time: 'Oct 24, 10:00 AM', icon: AlertCircle, color: 'var(--accent)' },
    { id: 2, type: 'assigned', text: 'Assigned to SupportOS Agent', time: 'Oct 24, 10:02 AM', icon: User, color: 'var(--text)' },
    { id: 3, type: 'message', text: 'Agent replied to ticket', time: 'Oct 24, 10:05 AM', icon: MessageSquare, color: 'var(--accent)' },
    { id: 4, type: 'status', text: 'Status changed to Pending', time: 'Oct 24, 10:05 AM', icon: Clock, color: 'var(--warning)' },
  ];

  const timelineEvents = events || defaultEvents;

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    position: 'relative',
    paddingLeft: '12px',
    marginTop: '12px',
  };

  const lineStyle = {
    position: 'absolute',
    left: '23px',
    top: '0',
    bottom: '0',
    width: '2px',
    backgroundColor: 'var(--border)',
    zIndex: 0,
  };

  const eventStyle = {
    display: 'flex',
    gap: '16px',
    position: 'relative',
    zIndex: 1,
  };

  const iconContainerStyle = (color) => ({
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: 'var(--surface)',
    border: `2px solid ${color}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: color,
    flexShrink: 0,
  });

  return (
    <div style={containerStyle}>
      <div style={lineStyle}></div>
      {timelineEvents.map((event) => (
        <div key={event.id} style={eventStyle}>
          <div style={iconContainerStyle(event.color)}>
            <event.icon size={12} strokeWidth={3} />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-bright)' }}>{event.text}</div>
            <div style={{ fontSize: '12px', color: 'var(--text)', marginTop: '2px' }}>{event.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketTimeline;
