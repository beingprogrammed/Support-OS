import React from 'react';
import { FileText } from 'lucide-react';

const MessageBubble = ({ text, sender, timestamp, attachment }) => {
  const isAgent = sender === 'agent';

  const containerStyle = {
    display: 'flex',
    justifyContent: isAgent ? 'flex-end' : 'flex-start',
    marginBottom: '16px',
    width: '100%',
  };

  const bubbleStyle = {
    maxWidth: '70%',
    padding: '12px 16px',
    borderRadius: isAgent ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
    backgroundColor: isAgent ? 'var(--accent)' : 'var(--surface-hover)',
    color: isAgent ? '#ffffff' : 'var(--text-bright)',
    boxShadow: 'var(--shadow-sm)',
    fontSize: '14px',
    lineHeight: '1.5',
    position: 'relative',
  };

  const timeStyle = {
    fontSize: '10px',
    color: isAgent ? 'rgba(255, 255, 255, 0.7)' : 'var(--text)',
    marginTop: '4px',
    textAlign: isAgent ? 'right' : 'left',
    display: 'block',
  };

  const attachmentStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px',
    backgroundColor: isAgent ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    borderRadius: '8px',
    marginBottom: text ? '8px' : '0',
    fontSize: '13px',
    fontWeight: '500'
  };

  return (
    <div style={containerStyle}>
      <div style={bubbleStyle}>
        {attachment && (
          <div style={attachmentStyle}>
            <FileText size={18} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {attachment.name}
            </span>
          </div>
        )}
        {text && <div>{text}</div>}
        <span style={timeStyle}>{timestamp}</span>
      </div>
    </div>
  );
};

export default MessageBubble;
