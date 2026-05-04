import React, { useState, useEffect, useRef } from 'react';
import { Settings, Globe, Bell, Lock, Palette, Check, Upload, Moon, Sun, ShieldCheck, Mail, Smartphone, ChevronRight, Zap, Shield, Trash2, Plus, Key, Clock } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import useNotification from '../../hooks/useNotification';
import ThemeSelector from '../../components/common/ThemeSelector';
import Modal from '../../components/common/Modal';

const BusinessSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [accentColor, setAccentColor] = useState('#7c3aed');
  const [logo, setLogo] = useState(null);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [restrictedDomains, setRestrictedDomains] = useState(['supportos.com', 'lowxenergy.com']);
  const [newDomain, setNewDomain] = useState('');
  const [sessionTimeout, setSessionTimeout] = useState('24h');
  const [passwordComplexity, setPasswordComplexity] = useState('high');
  const fileInputRef = useRef(null);
  const notification = useNotification();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      notification.success('Settings saved successfully!');
    }, 1000);
  };

  const handleAction = (msg) => {
    notification.info(msg);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        notification.error('File size must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
        notification.success('Logo updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddDomain = () => {
    if (!newDomain) return;
    if (restrictedDomains.includes(newDomain)) {
      notification.warning('Domain already exists');
      return;
    }
    setRestrictedDomains([...restrictedDomains, newDomain]);
    setNewDomain('');
    notification.success(`Domain ${newDomain} added to whitelist`);
  };

  const handleRemoveDomain = (domain) => {
    setRestrictedDomains(restrictedDomains.filter(d => d !== domain));
    notification.info(`Domain ${domain} removed from whitelist`);
  };

  const handleEnable2FA = () => {
    setIs2FAEnabled(true);
    setIs2FAModalOpen(false);
    notification.success('Two-factor authentication enabled successfully!');
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    maxWidth: '1000px',
  };

  const settingsLayoutStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '260px 1fr',
    gap: '32px',
  };

  const sidebarStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'row' : 'column',
    overflowX: isMobile ? 'auto' : 'visible',
    gap: '4px',
    paddingBottom: isMobile ? '8px' : '0',
  };

  const navItemStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '10px',
    backgroundColor: isActive ? 'var(--accent-muted)' : 'transparent',
    color: isActive ? 'var(--accent)' : 'var(--text)',
    fontWeight: isActive ? '600' : '500',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    flexShrink: 0,
    whiteSpace: 'nowrap'
  });

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ color: 'var(--text-bright)', fontSize: '24px', fontWeight: '700' }}>Workspace Settings</h1>
          <p style={{ color: 'var(--text)', fontSize: '14px' }}>Global configuration for your SupportOS environment.</p>
        </div>
        <Button variant="primary" onClick={handleSave} loading={isSaving}>Save All Changes</Button>
      </div>

      <div style={settingsLayoutStyle}>
        <div style={sidebarStyle}>
          <div style={navItemStyle(activeTab === 'general')} onClick={() => setActiveTab('general')}>
            <Settings size={18} /> General
          </div>
          <div style={navItemStyle(activeTab === 'appearance')} onClick={() => setActiveTab('appearance')}>
            <Palette size={18} /> Appearance
          </div>
          <div style={navItemStyle(activeTab === 'notifications')} onClick={() => setActiveTab('notifications')}>
            <Bell size={18} /> Notifications
          </div>
          <div style={navItemStyle(activeTab === 'security')} onClick={() => setActiveTab('security')}>
            <ShieldCheck size={18} /> Security & Auth
          </div>
        </div>

        <div className="glass-card" style={{ padding: '32px' }}>
          {activeTab === 'general' && (
            <div className="animate-fade-in">
              <h3 style={{ color: 'var(--text-bright)', fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Company Information</h3>
              <p style={{ color: 'var(--text)', fontSize: '14px', marginBottom: '32px' }}>Basic details about your organization.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <Input label="Company Name" defaultValue="SupportOS Inc." icon={Globe} />
                <Input label="Support Domain" defaultValue="help.supportos.com" icon={Zap} />
                <Input label="Business Email" defaultValue="admin@supportos.com" icon={Mail} />
                
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: 'var(--text-bright)', marginBottom: '12px' }}>Company Logo</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ 
                      width: '80px', 
                      height: '80px', 
                      borderRadius: '16px', 
                      backgroundColor: 'var(--bg)', 
                      border: '1px dashed var(--border)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      {logo ? (
                        <img src={logo} alt="Company Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <Upload size={24} style={{ color: 'var(--text)' }} />
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleLogoUpload} 
                        accept="image/*" 
                        style={{ display: 'none' }} 
                      />
                      <Button variant="outline" size="small" onClick={() => fileInputRef.current.click()}>
                        {logo ? 'Change Logo' : 'Upload Logo'}
                      </Button>
                      <p style={{ fontSize: '12px', color: 'var(--text)' }}>PNG, JPG or SVG. Max 2MB.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="animate-fade-in">
              <h3 style={{ color: 'var(--text-bright)', fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Interface Theme</h3>
              <p style={{ color: 'var(--text)', fontSize: '14px', marginBottom: '32px' }}>Customize the look and feel of your workspace.</p>
              
              <ThemeSelector />
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="animate-fade-in">
              <h3 style={{ color: 'var(--text-bright)', fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Notifications</h3>
              <p style={{ color: 'var(--text)', fontSize: '14px', marginBottom: '32px' }}>Configure how you receive updates.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { title: 'Email Notifications', desc: 'Receive daily digests and urgent alerts via email.', icon: Mail },
                  { title: 'Push Notifications', desc: 'Get desktop alerts for new replies and tickets.', icon: Smartphone },
                  { title: 'Browser Alerts', desc: 'Show toast notifications while the app is open.', icon: Bell },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '16px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <div style={{ color: 'var(--accent)' }}><item.icon size={20} /></div>
                      <div>
                        <div style={{ fontWeight: '600', color: 'var(--text-bright)', fontSize: '14px' }}>{item.title}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text)' }}>{item.desc}</div>
                      </div>
                    </div>
                    <input type="checkbox" defaultChecked style={{ width: '40px', height: '20px', accentColor: 'var(--accent)' }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="animate-fade-in">
              <h3 style={{ color: 'var(--text-bright)', fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Security & Auth</h3>
              <p style={{ color: 'var(--text)', fontSize: '14px', marginBottom: '32px' }}>Manage access control and authentication protocols.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* 2FA Section */}
                <div style={{ padding: '24px', borderRadius: '16px', backgroundColor: 'var(--bg)', border: '1px solid var(--border)', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? '16px' : '0' }}>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: is2FAEnabled ? 'var(--success-muted)' : 'var(--surface)', color: is2FAEnabled ? 'var(--success)' : 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Shield size={24} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', color: 'var(--text-bright)', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Two-Factor Authentication
                        {is2FAEnabled && <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '10px', backgroundColor: 'var(--success)', color: 'white', textTransform: 'uppercase' }}>Enabled</span>}
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--text)', marginTop: '4px' }}>Add an extra layer of security to your workspace login.</div>
                    </div>
                  </div>
                  <Button variant={is2FAEnabled ? "outline" : "primary"} size="small" onClick={() => is2FAEnabled ? setIs2FAEnabled(false) : setIs2FAModalOpen(true)}>
                    {is2FAEnabled ? 'Disable' : 'Configure 2FA'}
                  </Button>
                </div>

                {/* Restricted Domains */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ color: 'var(--text-bright)', fontSize: '15px', fontWeight: '700' }}>Allowed Domains</h4>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Input 
                      placeholder="e.g. supportos.com" 
                      value={newDomain} 
                      onChange={(e) => setNewDomain(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddDomain()}
                    />
                    <Button variant="secondary" onClick={handleAddDomain} icon={Plus}>Add</Button>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '8px' }}>
                    {restrictedDomains.map(domain => (
                      <div key={domain} style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-bright)' }}>
                        {domain}
                        <button onClick={() => handleRemoveDomain(domain)} style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ height: '1px', backgroundColor: 'var(--border)' }}></div>

                {/* Additional Settings Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '24px' }}>
                  <div>
                    <h4 style={{ color: 'var(--text-bright)', fontSize: '15px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Key size={18} /> Password Policy
                    </h4>
                    <select 
                      value={passwordComplexity} 
                      onChange={(e) => setPasswordComplexity(e.target.value)}
                      style={{ width: '100%', padding: '12px', borderRadius: '10px', backgroundColor: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-bright)', fontSize: '14px', outline: 'none' }}
                    >
                      <option value="low">Basic (8+ characters)</option>
                      <option value="medium">Medium (8+ chars, numbers, symbols)</option>
                      <option value="high">High (12+ chars, mixed case, symbols)</option>
                    </select>
                    <p style={{ fontSize: '12px', color: 'var(--text)', marginTop: '8px' }}>Stronger policies increase account security.</p>
                  </div>

                  <div>
                    <h4 style={{ color: 'var(--text-bright)', fontSize: '15px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={18} /> Session Timeout
                    </h4>
                    <select 
                      value={sessionTimeout} 
                      onChange={(e) => setSessionTimeout(e.target.value)}
                      style={{ width: '100%', padding: '12px', borderRadius: '10px', backgroundColor: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-bright)', fontSize: '14px', outline: 'none' }}
                    >
                      <option value="1h">1 Hour</option>
                      <option value="8h">8 Hours</option>
                      <option value="24h">24 Hours</option>
                      <option value="7d">7 Days</option>
                    </select>
                    <p style={{ fontSize: '12px', color: 'var(--text)', marginTop: '8px' }}>Automatically logout after period of inactivity.</p>
                  </div>
                </div>
              </div>

              {/* 2FA Configuration Modal */}
              <Modal 
                isOpen={is2FAModalOpen} 
                onClose={() => setIs2FAModalOpen(false)} 
                title="Configure Two-Factor Authentication"
                footer={
                  <>
                    <Button variant="outline" onClick={() => setIs2FAModalOpen(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleEnable2FA}>Verify & Enable</Button>
                  </>
                }
              >
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <div style={{ width: '160px', height: '160px', backgroundColor: 'white', borderRadius: '12px', padding: '10px', margin: '0 auto 24px', border: '1px solid var(--border)' }}>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=SupportOS-2FA-Demo" alt="QR Code" style={{ width: '100%', height: '100%' }} />
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text)', marginBottom: '24px' }}>Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.) and enter the 6-digit code below.</p>
                  <Input placeholder="000 000" style={{ textAlign: 'center', fontSize: '24px', letterSpacing: '8px', fontWeight: '700' }} />
                </div>
              </Modal>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessSettings;
