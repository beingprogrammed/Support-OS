import React, { useRef } from 'react';
import { Paperclip } from 'lucide-react';

const AttachmentUploader = ({ onFileSelect }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div style={{ display: 'inline-block' }}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      <button
        type="button"
        onClick={handleClick}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text)',
          cursor: 'pointer',
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--surface-hover)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <Paperclip size={20} />
      </button>
    </div>
  );
};

export default AttachmentUploader;
