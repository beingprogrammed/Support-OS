import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, Smile, MoreVertical, Phone, Video, X } from 'lucide-react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import AttachmentUploader from './AttachmentUploader';
import Avatar from '../common/Avatar';
import Button from '../common/Button';

const ChatWindow = ({ contactName = 'John Doe', status = 'Online' }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I have a question about my recent order.", sender: 'customer', timestamp: '10:00 AM' },
    { id: 2, text: "Sure thing! I'd be happy to help. Can you provide your order number?", sender: 'agent', timestamp: '10:02 AM' },
    { id: 3, text: "It's #SO-99281.", sender: 'customer', timestamp: '10:05 AM' },
  ]);
  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const emojis = ['😊', '😂', '👍', '🙏', '🔥', '✨', '👋', '💯', '🤔', '🙌', '🎉', '💡'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'customer', // In the customer route, sender is 'customer'
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const handleFileSelect = (file) => {
    const newMessage = {
      id: Date.now(),
      sender: 'customer',
      attachment: file,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMessage]);
  };

  const handleEmojiSelect = (emoji) => {
    setInputText(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: 'var(--surface)',
    borderRadius: '16px',
    border: '1px solid var(--border)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow)',
  };

  const headerStyle = {
    padding: '16px 24px',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  };

  const messagesContainerStyle = {
    flexGrow: 1,
    padding: '24px',
    overflowY: 'auto',
    backgroundColor: '#f8fafc',
  };

  const inputAreaStyle = {
    padding: '16px 24px',
    borderTop: '1px solid var(--border)',
    backgroundColor: '#ffffff',
    position: 'relative'
  };

  const aiBoxStyle = {
    backgroundColor: 'var(--accent-muted)',
    border: '1px solid var(--accent-border)',
    borderRadius: '12px',
    padding: '12px 16px',
    marginBottom: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const emojiPickerStyle = {
    position: 'absolute',
    bottom: '80px',
    left: '24px',
    backgroundColor: 'white',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    padding: '12px',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
    boxShadow: 'var(--shadow-lg)',
    zIndex: 1000,
    animation: 'fadeIn 0.2s ease-out'
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      {/* Header */}
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar name={contactName} size="medium" />
          <div>
            <div style={{ fontWeight: '700', color: 'var(--text-bright)', fontSize: '15px' }}>{contactName}</div>
            <div style={{ fontSize: '12px', color: 'var(--success)', fontWeight: '500' }}>{status}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', color: 'var(--text)' }}>
          <Button variant="ghost" size="small"><Phone size={18} /></Button>
          <Button variant="ghost" size="small"><Video size={18} /></Button>
          <Button variant="ghost" size="small"><MoreVertical size={18} /></Button>
        </div>
      </div>

      {/* Messages */}
      <div style={messagesContainerStyle}>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} {...msg} />
        ))}
        <TypingIndicator />
        <div ref={messagesEndRef} />
      </div>

      {/* Footer */}
      <div style={inputAreaStyle}>
        {/* Emoji Picker Popover */}
        {showEmojiPicker && (
          <div style={emojiPickerStyle} ref={emojiPickerRef}>
            {emojis.map(emoji => (
              <button
                key={emoji}
                onClick={() => handleEmojiSelect(emoji)}
                style={{
                  fontSize: '24px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '8px',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        {/* AI Suggested Reply */}
        <div style={aiBoxStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent)', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <Sparkles size={14} fill="currentColor" /> AI Suggested Reply
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-bright)', lineHeight: '1.4' }}>
            "I've located order #SO-99281. It shows as 'Shipped' and is expected to arrive by Friday. Would you like me to send you the tracking link?"
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            <Button variant="primary" size="small" onClick={() => setInputText("I've located order #SO-99281. It shows as 'Shipped' and is expected to arrive by Friday. Would you like me to send you the tracking link?")}>Use Reply</Button>
            <Button variant="outline" size="small">Edit</Button>
          </div>
        </div>

        {/* Input Field */}
        <form onSubmit={handleSendMessage} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <AttachmentUploader onFileSelect={handleFileSelect} />
          <Button 
            variant="ghost" 
            size="small" 
            onClick={(e) => { e.preventDefault(); setShowEmojiPicker(!showEmojiPicker); }}
          >
            <Smile size={20} />
          </Button>
          <div style={{ flexGrow: 1, position: 'relative' }}>
            <input
              type="text"
              placeholder="Type a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                outline: 'none',
                fontSize: '14px',
                backgroundColor: '#f1f5f9',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
              color: 'white',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
            }}
          >
            <Send size={18} fill="currentColor" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
