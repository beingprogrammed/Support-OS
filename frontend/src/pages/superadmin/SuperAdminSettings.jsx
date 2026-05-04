import React, { useState, useEffect, useRef } from 'react';
import { User, Lock, Bell, Globe, Camera, Save, Eye, EyeOff, Trash2, ChevronRight, AlertTriangle } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Avatar from '../../components/common/Avatar';
import Modal from '../../components/common/Modal';
import useAuth from '../../hooks/useAuth';
import useNotification from '../../hooks/useNotification';
import ThemeSelector from '../../components/common/ThemeSelector';

const SuperAdminSettings = () => {
    const { user, logout } = useAuth();
    const notification = useNotification();

    const [activeTab, setActiveTab] = useState('profile');
    const [saving, setSaving] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [errors, setErrors] = useState({});
    const [avatarSrc, setAvatarSrc] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAvatarSrc(url);
            notification.success('Avatar updated successfully!');
        }
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [profile, setProfile] = useState({
        name: user?.name || 'Platform Admin',
        email: user?.email || 'super@supportos.com',
        phone: '+1 (800) 555-1234',
        company: 'SupportOS Global',
        timezone: 'UTC',
        language: 'en',
    });

    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: '',
    });

    const [preferences, setPreferences] = useState({
        theme: 'dark',
        emailNotifications: true,
        pushNotifications: true,
        platformAlerts: true,
        securityDigests: true,
        soundAlerts: false,
    });

    const [sessions] = useState([
        { device: 'Chrome on macOS', location: 'San Francisco, CA', time: 'Current session', current: true },
        { device: 'Terminal SSH', location: 'AWS EU-West', time: '2 hours ago', current: false },
    ]);

    const handleSave = (section) => {
        if (section === 'Profile') {
            const newErrors = {};
            if (!profile.name.trim()) newErrors.name = 'Full Name is required';
            if (!profile.email.trim()) newErrors.email = 'Email Address is required';
            else if (!/^\S+@\S+\.\S+$/.test(profile.email)) newErrors.email = 'Invalid email format';
            if (!profile.phone.trim()) newErrors.phone = 'Phone Number is required';
            else if (!/^\+?[\d\s-]{10,}$/.test(profile.phone)) newErrors.phone = 'Invalid phone number format';
            
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                notification.error('Please fix the errors in the profile form.');
                return;
            }
            setErrors({});
        }

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
            <div className="glass-card" style={{ padding: '32px' }}>
                <h4 style={sectionTitleStyle}>Avatar</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{ position: 'relative' }}>
                        <Avatar name={profile.name} size="xl" src={avatarSrc} />
                        <button
                            onClick={() => fileInputRef.current.click()}
                            style={{
                                position: 'absolute', bottom: '-4px', right: '-4px',
                                width: '32px', height: '32px', borderRadius: '50%',
                                backgroundColor: 'var(--accent)', color: 'white',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                border: '3px solid var(--surface)', cursor: 'pointer',
                                transition: 'transform 0.2s',
                            }}
                        >
                            <Camera size={14} />
                        </button>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            style={{ display: 'none' }} 
                            accept="image/*" 
                            onChange={handleFileChange} 
                        />
                    </div>
                    <div>
                        <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-bright)' }}>{profile.name}</div>
                        <div style={{ fontSize: '14px', color: 'var(--text)', marginTop: '4px' }}>{profile.email}</div>
                        <div style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: '600', marginTop: '8px', textTransform: 'capitalize' }}>SuperAdmin Account</div>
                    </div>
                </div>
            </div>

            <div className="glass-card" style={{ padding: isMobile ? '20px' : '32px' }}>
                <h4 style={sectionTitleStyle}>Personal Information</h4>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
                    <Input label="Full Name" value={profile.name} onChange={e => { setProfile({ ...profile, name: e.target.value }); setErrors({ ...errors, name: null }); }} icon={User} error={errors.name} />
                    <Input label="Email Address" type="email" value={profile.email} onChange={e => { setProfile({ ...profile, email: e.target.value }); setErrors({ ...errors, email: null }); }} error={errors.email} />
                    <Input label="Phone Number" value={profile.phone} onChange={e => { setProfile({ ...profile, phone: e.target.value }); setErrors({ ...errors, phone: null }); }} error={errors.phone} />
                    <Input label="Organization" value={profile.company} onChange={e => setProfile({ ...profile, company: e.target.value })} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px', marginTop: '4px' }}>
                    <div>
                        <label style={labelStyle}>Timezone</label>
                        <select style={selectStyle} value={profile.timezone} onChange={e => setProfile({ ...profile, timezone: e.target.value })}>
                            <option value="UTC">Coordinated Universal Time (UTC)</option>
                            <option value="America/New_York">Eastern Time (ET)</option>
                            <option value="America/Chicago">Central Time (CT)</option>
                            <option value="America/Denver">Mountain Time (MT)</option>
                            <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        </select>
                    </div>
                    <div>
                        <label style={labelStyle}>Language</label>
                        <select style={selectStyle} value={profile.language} onChange={e => setProfile({ ...profile, language: e.target.value })}>
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
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
            <div className="glass-card" style={{ padding: '32px' }}>
                <h4 style={sectionTitleStyle}>Change Password</h4>
                <div style={{ maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <Input label="Current Password" type={showPassword ? 'text' : 'password'} value={passwords.current} onChange={e => setPasswords({ ...passwords, current: e.target.value })} icon={Lock} />
                    <Input label="New Password" type={showPassword ? 'text' : 'password'} value={passwords.new} onChange={e => setPasswords({ ...passwords, new: e.target.value })} icon={Lock} />
                    <Input label="Confirm Password" type={showPassword ? 'text' : 'password'} value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} icon={Lock} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <button onClick={() => setShowPassword(!showPassword)} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--accent)', fontWeight: '600', cursor: 'pointer', background: 'none', border: 'none' }}>
                            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                            {showPassword ? 'Hide' : 'Show'} passwords
                        </button>
                    </div>
                    <Button variant="primary" icon={Lock} loading={saving} onClick={handlePasswordChange}>Update Password</Button>
                </div>
            </div>

            <div className="glass-card" style={{ padding: '32px' }}>
                <h4 style={sectionTitleStyle}>Active Sessions</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {sessions.map((session, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: i < sessions.length - 1 ? '1px solid var(--border)' : 'none' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: session.current ? 'var(--accent-muted)' : 'var(--bg)', color: session.current ? 'var(--accent)' : 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderPreferences = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="glass-card" style={{ padding: '32px' }}>
                <h4 style={sectionTitleStyle}>Appearance</h4>
                <ThemeSelector />
            </div>

            <div className="glass-card" style={{ padding: '32px' }}>
                <h4 style={sectionTitleStyle}>Platform Notifications</h4>
                <Toggle checked={preferences.emailNotifications} onChange={() => setPreferences({ ...preferences, emailNotifications: !preferences.emailNotifications })} label="Email Notifications" description="Receive email notifications for critical platform events." />
                <Toggle checked={preferences.pushNotifications} onChange={() => setPreferences({ ...preferences, pushNotifications: !preferences.pushNotifications })} label="Push Notifications" description="Get browser push notifications for real-time alerts." />
                <Toggle checked={preferences.platformAlerts} onChange={() => setPreferences({ ...preferences, platformAlerts: !preferences.platformAlerts })} label="Platform Status Alerts" description="Get notified when platform health status changes." />
                <Toggle checked={preferences.securityDigests} onChange={() => setPreferences({ ...preferences, securityDigests: !preferences.securityDigests })} label="Security Digests" description="Receive periodic summaries of security events." />
                <Toggle checked={preferences.soundAlerts} onChange={() => setPreferences({ ...preferences, soundAlerts: !preferences.soundAlerts })} label="Sound Alerts" description="Play a sound when urgent platform alerts arrive." />
            </div>
        </div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
                <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-bright)', marginBottom: '4px' }}>SuperAdmin Settings</h2>
                <p style={{ color: 'var(--text)', fontSize: '15px' }}>Manage your global administrative account preferences and security.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '240px 1fr', gap: '32px' }}>
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
                                whiteSpace: 'nowrap',
                                border: 'none'
                            }}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                            {activeTab === tab.id && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
                        </button>
                    ))}
                </div>

                <div className="animate-fade-in">
                    {activeTab === 'profile' && renderProfile()}
                    {activeTab === 'security' && renderSecurity()}
                    {activeTab === 'preferences' && renderPreferences()}
                </div>
            </div>
        </div>
    );
};

export default SuperAdminSettings;
