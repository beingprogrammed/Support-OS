import React, { useState } from 'react';
import { Settings, Globe, Bell, Lock, Palette, Check, Upload, Moon, Sun, ShieldCheck, Mail, Smartphone, ChevronRight, Zap } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import useNotification from '../../hooks/useNotification';

const BusinessSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [accentColor, setAccentColor] = useState('#7c3aed');
  const notification = useNotification();

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      notification.success('Settings saved successfully!');
    }, 1000);
  };

  const updateThemeColor = (color) => {
    setAccentColor(color);
    document.documentElement.style.setProperty('--accent', color);
    notification.info(`Theme color updated to ${color}`);
  };

  const handleAction = (msg) => {
    notification.info(msg);
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    maxWidth: '1000px',
  };

  const settingsLayoutStyle = {
    display: 'grid',
    gridTemplateColumns: '260px 1fr',
    gap: '32px',
  };

  const sidebarStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
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
                    <div style={{ width: '64px', height: '64px', borderRadius: '12px', backgroundColor: 'var(--bg)', border: '1px dashed var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Upload size={20} style={{ color: 'var(--text)' }} />
                    </div>
                    <Button variant="outline" size="small" onClick={() => handleAction('File browser opened')}>Update Logo</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="animate-fade-in">
              <h3 style={{ color: 'var(--text-bright)', fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Interface Theme</h3>
              <p style={{ color: 'var(--text)', fontSize: '14px', marginBottom: '32px' }}>Customize the look and feel of your workspace.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                <div style={{ padding: '20px', borderRadius: '16px', border: '2px solid var(--accent)', cursor: 'pointer', textAlign: 'center', backgroundColor: '#fff' }}>
                  <Sun size={24} style={{ color: 'var(--accent)', marginBottom: '12px' }} />
                  <div style={{ fontWeight: '700', color: '#0f172a' }}>Light Mode</div>
                  <div style={{ fontSize: '12px', color: 'var(--text)', marginTop: '4px' }}>Active System Theme</div>
                </div>
                <div 
                  onClick={() => notification.warning('Dark mode is coming soon in v2.0!')}
                  style={{ padding: '20px', borderRadius: '16px', border: '1px solid var(--border)', cursor: 'pointer', textAlign: 'center', backgroundColor: '#0f172a', opacity: 0.7 }}
                >
                  <Moon size={24} style={{ color: '#fff', marginBottom: '12px' }} />
                  <div style={{ fontWeight: '700', color: '#fff' }}>Dark Mode</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>Coming Soon</div>
                </div>
              </div>

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
              
              <div style={{ padding: '24px', borderRadius: '16px', backgroundColor: 'var(--bg)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ color: 'var(--success)' }}><Shield size={24} /></div>
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--text-bright)', fontSize: '15px' }}>Two-Factor Authentication</div>
                    <div style={{ fontSize: '13px', color: 'var(--text)', marginTop: '4px' }}>Add an extra layer of security to your workspace.</div>
                  </div>
                </div>
                <Button variant="outline" size="small">Configure</Button>
              </div>
              
              <div style={{ marginTop: '32px' }}>
                <h4 style={{ color: 'var(--text-bright)', fontSize: '14px', fontWeight: '700', marginBottom: '16px' }}>Restricted Domains</h4>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Input placeholder="e.g. supportos.com" />
                  <Button variant="secondary" onClick={() => notification.info('Domain added to whitelist')}>Add Domain</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessSettings;
