import React, { useState, useEffect } from 'react';
import { User, Lock, Bell, Globe, Moon, Sun, Shield, Camera, Save, Eye, EyeOff, Trash2, LogOut, ChevronRight, Check, AlertTriangle } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Avatar from '../../components/common/Avatar';
import Modal from '../../components/common/Modal';
import useAuth from '../../hooks/useAuth';
import useNotification from '../../hooks/useNotification';
import ThemeSelector from '../../components/common/ThemeSelector';

const CustomerSettings = () => {
    const { user, logout } = useAuth();
    const notification = useNotification();

    const [activeTab, setActiveTab] = useState('profile');
    const [saving, setSaving] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [profile, setProfile] = useState({
        name: user?.name || 'Valued Customer',
        email: user?.email || 'customer@supportos.com',
        phone: '+1 (555) 123-4567',
        company: 'Acme Corp',
        timezone: 'America/New_York',
        language: 'en',
    });

    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: '',
    });

    const [preferences, setPreferences] = useState({
        theme: 'light',
        emailNotifications: true,
        pushNotifications: true,
        ticketUpdates: true,
        marketingEmails: false,
        weeklyDigest: true,
        soundAlerts: false,
        autoCloseResolved: true,
    });

    const [sessions] = useState([
        { device: 'Chrome on macOS', location: 'San Francisco, CA', time: 'Current session', current: true },
        { device: 'Safari on iPhone', location: 'San Francisco, CA', time: '2 hours ago', current: false },
        { device: 'Firefox on Windows', location: 'New York, NY', time: '3 days ago', current: false },
    ]);

    const handleSave = (section) => {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            notification.success(`${section} updated successfully!`);
        }, 800);
    };

    const handlePasswordChange = () => {
        if (passwords.new !== passwords.confirm) {
            notification.error('Passwords do not match.');
            return;
        }
        if (passwords.new.length < 8) {
            notification.error('Password must be at least 8 characters.');
            return;
        }
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            setPasswords({ current: '', new: '', confirm: '' });
            notification.success('Password changed successfully!');
        }, 800);
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'preferences', label: 'Preferences', icon: Globe },
    ];

    const sectionTitleStyle = {
        fontSize: '12px',
        fontWeight: '700',
        color: 'var(--text)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginBottom: '20px',
    };

    const labelStyle = {
        display: 'block',
        fontSize: '14px',
        fontWeight: '600',
        color: 'var(--text-bright)',
        marginBottom: '8px',
        paddingLeft: '4px',
    };

    const selectStyle = {
        width: '100%',
        padding: '12px 16px',
        borderRadius: '12px',
        border: '1px solid var(--border)',
        backgroundColor: 'var(--bg)',
        color: 'var(--text-bright)',
        fontSize: '15px',
        outline: 'none',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 16px center',
        backgroundSize: '16px',
    };

    const Toggle = ({ checked, onChange, label, description }) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
            <div style={{ flex: 1, marginRight: '16px' }}>
                <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-bright)', marginBottom: '2px' }}>{label}</div>
                {description && <div style={{ fontSize: '13px', color: 'var(--text)', lineHeight: '1.4' }}>{description}</div>}
            </div>
            <button
                onClick={onChange}
                style={{
                    width: '48px',
                    height: '26px',
                    borderRadius: '13px',
                    backgroundColor: checked ? 'var(--accent)' : 'var(--border)',
                    position: 'relative',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    border: 'none',
                    flexShrink: 0,
                    boxShadow: checked ? '0 2px 8px rgba(124, 58, 237, 0.3)' : 'none',
                }}
            >
                <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    position: 'absolute',
                    top: '3px',
                    left: checked ? '25px' : '3px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }} />
            </button>
        </div>
    );

    const renderProfile = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Avatar Section */}
            <div className="glass-card" style={{ padding: '32px' }}>
                <h4 style={sectionTitleStyle}>Avatar</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{ position: 'relative' }}>
                        <Avatar name={profile.name} size="xl" />
                        <button
                            onClick={() => notification.info('Avatar upload coming soon!')}
                            style={{
                                position: 'absolute', bottom: '-4px', right: '-4px',
                                width: '32px', height: '32px', borderRadius: '50%',
                                backgroundColor: 'var(--accent)', color: 'white',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                border: '3px solid var(--surface)', cursor: 'pointer',
                                transition: 'transform 0.2s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <Camera size={14} />
                        </button>
                    </div>
                    <div>
                        <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-bright)' }}>{profile.name}</div>
                        <div style={{ fontSize: '14px', color: 'var(--text)', marginTop: '4px' }}>{profile.email}</div>
                        <div style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: '600', marginTop: '8px', textTransform: 'capitalize' }}>{user?.role || 'Customer'} Account</div>
                    </div>
                </div>
            </div>

            {/* Personal Info */}
            <div className="glass-card" style={{ padding: isMobile ? '20px' : '32px' }}>
                <h4 style={sectionTitleStyle}>Personal Information</h4>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
                    <Input label="Full Name" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} icon={User} />
                    <Input label="Email Address" type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
                    <Input label="Phone Number" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} />
                    <Input label="Company" value={profile.company} onChange={e => setProfile({ ...profile, company: e.target.value })} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px', marginTop: '4px' }}>
                    <div>
                        <label style={labelStyle}>Timezone</label>
                        <select style={selectStyle} value={profile.timezone} onChange={e => setProfile({ ...profile, timezone: e.target.value })}>
                            <option value="America/New_York">Eastern Time (ET)</option>
                            <option value="America/Chicago">Central Time (CT)</option>
                            <option value="America/Denver">Mountain Time (MT)</option>
                            <option value="America/Los_Angeles">Pacific Time (PT)</option>
                            <option value="Europe/London">GMT (London)</option>
                            <option value="Asia/Kolkata">IST (India)</option>
                        </select>
                    </div>
                    <div>
                        <label style={labelStyle}>Language</label>
                        <select style={selectStyle} value={profile.language} onChange={e => setProfile({ ...profile, language: e.target.value })}>
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                            <option value="hi">Hindi</option>
                        </select>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                    <Button variant="primary" icon={Save} loading={saving} onClick={() => handleSave('Profile')}>Save Changes</Button>
                </div>
            </div>
        </div>
    );

    const renderSecurity = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Change Password */}
            <div className="glass-card" style={{ padding: '32px' }}>
                <h4 style={sectionTitleStyle}>Change Password</h4>
                <div style={{ maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ position: 'relative' }}>
                        <Input label="Current Password" type={showPassword ? 'text' : 'password'} value={passwords.current} onChange={e => setPasswords({ ...passwords, current: e.target.value })} icon={Lock} placeholder="Enter current password" />
                    </div>
                    <Input label="New Password" type={showPassword ? 'text' : 'password'} value={passwords.new} onChange={e => setPasswords({ ...passwords, new: e.target.value })} icon={Lock} placeholder="At least 8 characters" />
                    <Input label="Confirm Password" type={showPassword ? 'text' : 'password'} value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} icon={Lock} placeholder="Re-enter new password" />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <button onClick={() => setShowPassword(!showPassword)} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--accent)', fontWeight: '600', cursor: 'pointer' }}>
                            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                            {showPassword ? 'Hide' : 'Show'} passwords
                        </button>
                    </div>
                    <Button variant="primary" icon={Lock} loading={saving} onClick={handlePasswordChange}>Update Password</Button>
                </div>
            </div>

            {/* Active Sessions */}
            <div className="glass-card" style={{ padding: '32px' }}>
                <h4 style={sectionTitleStyle}>Active Sessions</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {sessions.map((session, i) => (
                        <div key={i} style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '16px 0',
                            borderBottom: i < sessions.length - 1 ? '1px solid var(--border)' : 'none',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '10px',
                                    backgroundColor: session.current ? 'var(--accent-muted)' : 'var(--bg)',
                                    color: session.current ? 'var(--accent)' : 'var(--text)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <Globe size={18} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-bright)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {session.device}
                                        {session.current && <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '6px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', fontWeight: '700' }}>Current</span>}
                                    </div>
                                    <div style={{ fontSize: '13px', color: 'var(--text)', marginTop: '2px' }}>{session.location} • {session.time}</div>
                                </div>
                            </div>
                            {!session.current && (
                                <Button variant="ghost" size="small" onClick={() => notification.success('Session revoked.')}>Revoke</Button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Danger Zone */}
            <div style={{ padding: '32px', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)', backgroundColor: 'rgba(239, 68, 68, 0.02)' }}>
                <h4 style={{ ...sectionTitleStyle, color: 'var(--error)' }}>Danger Zone</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-bright)' }}>Delete Account</div>
                        <div style={{ fontSize: '13px', color: 'var(--text)', marginTop: '4px' }}>Permanently delete your account and all associated data. This action cannot be undone.</div>
                    </div>
                    <Button variant="error" size="small" icon={Trash2} onClick={() => setShowDeleteModal(true)}>Delete Account</Button>
                </div>
            </div>

            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Delete Account"
                footer={
                    <>
                        <Button variant="outline" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                        <Button variant="error" icon={Trash2} onClick={() => { setShowDeleteModal(false); notification.error('Account deletion is disabled in demo.'); }}>Delete Forever</Button>
                    </>
                }
            >
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <AlertTriangle size={20} />
                    </div>
                    <div>
                        <p style={{ marginBottom: '12px' }}>Are you sure you want to delete your account? This will:</p>
                        <ul style={{ paddingLeft: '20px', fontSize: '14px', lineHeight: '1.8', color: 'var(--text)' }}>
                            <li>Remove all your tickets and chat history</li>
                            <li>Cancel any active subscriptions</li>
                            <li>Delete all personal information</li>
                        </ul>
                    </div>
                </div>
            </Modal>
        </div>
    );

    const renderPreferences = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Theme */}
            <div className="glass-card" style={{ padding: '32px' }}>
                <h4 style={sectionTitleStyle}>Appearance</h4>
                <ThemeSelector />
            </div>

            {/* Notification Preferences */}
            <div className="glass-card" style={{ padding: '32px' }}>
                <h4 style={sectionTitleStyle}>Notification Preferences</h4>
                <Toggle checked={preferences.emailNotifications} onChange={() => setPreferences({ ...preferences, emailNotifications: !preferences.emailNotifications })} label="Email Notifications" description="Receive email notifications for ticket updates and replies." />
                <Toggle checked={preferences.pushNotifications} onChange={() => setPreferences({ ...preferences, pushNotifications: !preferences.pushNotifications })} label="Push Notifications" description="Get browser push notifications for real-time updates." />
                <Toggle checked={preferences.ticketUpdates} onChange={() => setPreferences({ ...preferences, ticketUpdates: !preferences.ticketUpdates })} label="Ticket Status Updates" description="Get notified when your ticket status changes." />
                <Toggle checked={preferences.weeklyDigest} onChange={() => setPreferences({ ...preferences, weeklyDigest: !preferences.weeklyDigest })} label="Weekly Digest" description="Receive a weekly summary of your support activity." />
                <Toggle checked={preferences.soundAlerts} onChange={() => setPreferences({ ...preferences, soundAlerts: !preferences.soundAlerts })} label="Sound Alerts" description="Play a sound when new notifications arrive." />
                <Toggle checked={preferences.marketingEmails} onChange={() => setPreferences({ ...preferences, marketingEmails: !preferences.marketingEmails })} label="Marketing Emails" description="Receive product updates and promotional offers." />
            </div>

            {/* Ticket Preferences */}
            <div className="glass-card" style={{ padding: '32px' }}>
                <h4 style={sectionTitleStyle}>Ticket Preferences</h4>
                <Toggle checked={preferences.autoCloseResolved} onChange={() => setPreferences({ ...preferences, autoCloseResolved: !preferences.autoCloseResolved })} label="Auto-close Resolved Tickets" description="Automatically close tickets 7 days after resolution." />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                    <Button variant="primary" icon={Save} loading={saving} onClick={() => handleSave('Preferences')}>Save Preferences</Button>
                </div>
            </div>
        </div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Page Header */}
            <div>
                <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-bright)', marginBottom: '4px' }}>Settings</h2>
                <p style={{ color: 'var(--text)', fontSize: '15px' }}>Manage your account preferences and security.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '240px 1fr', gap: '32px' }}>
                {/* Settings Nav */}
                <div className="glass-card" style={{ padding: '16px', alignSelf: 'start', position: isMobile ? 'static' : 'sticky', top: '100px', display: 'flex', flexDirection: isMobile ? 'row' : 'column', overflowX: isMobile ? 'auto' : 'visible' }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
                                padding: '12px 16px', borderRadius: '10px', cursor: 'pointer',
                                fontSize: '14px', fontWeight: activeTab === tab.id ? '600' : '500',
                                color: activeTab === tab.id ? 'var(--accent)' : 'var(--text)',
                                backgroundColor: activeTab === tab.id ? 'var(--accent-muted)' : 'transparent',
                                transition: 'all 0.2s',
                                marginBottom: isMobile ? '0' : '4px',
                                flexShrink: 0,
                                whiteSpace: 'nowrap'
                            }}
                            onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.backgroundColor = 'var(--surface-hover)'; }}
                            onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.backgroundColor = 'transparent'; }}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                            {activeTab === tab.id && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
                        </button>
                    ))}
                </div>

                {/* Settings Content */}
                <div className="animate-fade-in">
                    {activeTab === 'profile' && renderProfile()}
                    {activeTab === 'security' && renderSecurity()}
                    {activeTab === 'preferences' && renderPreferences()}
                </div>
            </div>
        </div>
    );
};

export default CustomerSettings;
