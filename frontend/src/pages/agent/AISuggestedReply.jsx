import React from 'react';
import { Sparkles, Check, Edit2, Zap } from 'lucide-react';
import Button from '../../components/common/Button';

const AISuggestedReply = ({ onSelect }) => {
  const suggestions = [
    {
      id: 1,
      text: "I've checked our EMEA server logs and it appears there was a brief routing glitch. Everything is stable now. Can you please confirm if you can connect?",
      confidence: 94,
      tone: 'Professional',
    },
    {
      id: 2,
      text: "Apologies for the inconvenience! We're aware of the connection issues in EMEA. Our engineering team is on it. I'll update you as soon as we have a fix.",
      confidence: 88,
      tone: 'Empathetic',
    },
    {
      id: 3,
      text: "Hello! Try flushing your DNS cache and restarting your router. This usually fixes most EMEA connection drops. Let me know if that helps!",
      confidence: 72,
      tone: 'Technical',
    },
  ];

  const cardStyle = {
    padding: '24px',
    backgroundColor: 'var(--accent-muted)',
    border: '1px solid var(--accent-border)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const suggestionStyle = {
    padding: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    transition: 'all 0.2s',
  };

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontWeight: '800', fontSize: '15px' }}>
          <Sparkles size={20} fill="currentColor" /> AI MAGIC REPLIES
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text)', fontWeight: '600' }}>
          <Zap size={12} /> POWERED BY SupportOS AI
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {suggestions.map((s) => (
          <div key={s.id} style={suggestionStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {s.tone} • {s.confidence}% Match
              </span>
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-bright)', lineHeight: '1.5' }}>
              "{s.text}"
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button 
                variant="primary" 
                size="small" 
                icon={Check} 
                onClick={() => onSelect && onSelect(s.text)}
              >
                Use Reply
              </Button>
              <Button variant="outline" size="small" icon={Edit2}>Edit</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AISuggestedReply;
