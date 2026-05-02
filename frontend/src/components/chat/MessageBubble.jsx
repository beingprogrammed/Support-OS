import React from 'react';

const MessageBubble = ({ text, sender, timestamp }) => {
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

  return (
    <div style={containerStyle}>
      <div style={bubbleStyle}>
        {text}
        <span style={timeStyle}>{timestamp}</span>
      </div>
    </div>
  );
};

export default MessageBubble;
