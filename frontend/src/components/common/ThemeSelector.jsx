import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import useNotification from '../../hooks/useNotification';

const hoverColors = {
  '#7c3aed': '#6d28d9',
  '#3b82f6': '#2563eb',
  '#10b981': '#059669',
  '#f59e0b': '#d97706',
  '#ef4444': '#dc2626',
  '#ec4899': '#db2777',
};

const ThemeSelector = () => {
  const [accentColor, setAccentColor] = useState(() => {
    return document.documentElement.style.getPropertyValue('--accent') || '#7c3aed';
  });
  const notification = useNotification();

  const updateThemeColor = (color) => {
    setAccentColor(color);
    document.documentElement.style.setProperty('--accent', color);
    document.documentElement.style.setProperty('--accent-hover', hoverColors[color] || color);
    notification.info(`Theme color updated successfully.`);
  };

  return (
    <div>
      <h4 style={{ color: 'var(--text-bright)', fontSize: '14px', fontWeight: '700', marginBottom: '16px' }}>Accent Color</h4>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {['#7c3aed', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'].map(color => (
          <div 
            key={color}
            onClick={() => updateThemeColor(color)}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: color,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              transition: 'transform 0.2s',
              transform: accentColor === color ? 'scale(1.1)' : 'scale(1)',
              boxShadow: accentColor === color ? `0 0 0 3px var(--bg), 0 0 0 5px ${color}` : 'none'
            }}
          >
            {accentColor === color && <Check size={20} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
