import React from 'react';
import { ChevronDown } from 'lucide-react';

const PrioritySelector = ({ value, onChange }) => {
  const priorities = [
    { label: 'Low', color: 'var(--success)' },
    { label: 'Medium', color: 'var(--warning)' },
    { label: 'High', color: 'var(--error)' },
    { label: 'Urgent', color: '#7f1d1d' },
  ];

  const selectStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 12px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--surface)',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--text-bright)',
  };

  const dotStyle = (color) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: color,
  });

  const activePriority = priorities.find(p => p.label.toLowerCase() === value?.toLowerCase()) || priorities[0];

  return (
    <div style={selectStyle} onClick={() => console.log('Priority selector clicked')}>
      <div style={dotStyle(activePriority.color)}></div>
      {activePriority.label}
      <ChevronDown size={14} style={{ marginLeft: '4px', opacity: 0.5 }} />
    </div>
  );
};

export default PrioritySelector;
