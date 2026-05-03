import React, { useState } from 'react';
import { Bell, MessageSquare, Zap, Shield, AlertCircle, Clock, Check, CheckCheck, Trash2, Filter, Search, Archive, MailOpen } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import useNotification from '../../hooks/useNotification';

const CustomerNotifications = () => {
    const notification = useNotification();
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Ticket #TC-1024 Updated', message: 'Your ticket "Unable to access dashboard" has been assigned to agent Sarah Wilson.', time: '2 minutes ago', type: 'ticket', icon: MessageSquare, read: false, category: 'update' },
        { id: 2, title: 'Reply from Support', message: 'Sarah Wilson replied to your ticket #TC-1024: "Hi there, I\'ve identified the issue..."', time: '15 minutes ago', type: 'ticket', icon: MessageSquare, read: false, category: 'reply' },
        { id: 3, title: 'System Maintenance', message: 'SupportOS will undergo scheduled maintenance on May 5th from 2:00 AM to 4:00 AM UTC.', time: '1 hour ago', type: 'system', icon: Zap, read: false, category: 'system' },
        { id: 4, title: 'Ticket #TC-1025 Resolved', message: 'Your billing inquiry has been resolved. Please confirm if the issue is fixed.', time: '3 hours ago', type: 'success', icon: Check, read: true, category: 'update' },
        { id: 5, title: 'Security Alert', message: 'New login detected from Chrome on macOS in San Francisco, CA.', time: '5 hours ago', type: 'security', icon: Shield, read: true, category: 'security' },
        { id: 6, title: 'New Feature Available', message: 'You can now attach files directly in the live chat! Try it out in your next conversation.', time: '1 day ago', type: 'info', icon: Zap, read: true, category: 'system' },
        { id: 7, title: 'Ticket #TC-1026 Closed', message: 'Your feature request "Dark mode export" has been closed after 7 days of inactivity.', time: '2 days ago', type: 'ticket', icon: MessageSquare, read: true, category: 'update' },
        { id: 8, title: 'Survey Request', message: 'How was your experience with ticket #TC-1023? Take a quick 30-second survey.', time: '3 days ago', type: 'info', icon: AlertCircle, read: true, category: 'system' },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        notification.success('All notifications marked as read.');
    };

    const deleteNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
        notification.info('Notification removed.');
    };

    const clearAll = () => {
        setNotifications([]);
        notification.success('All notifications cleared.');
    };

    const filteredNotifications = notifications.filter(n => {
        const matchesFilter = filter === 'all' || (filter === 'unread' && !n.read) || (filter === 'read' && n.read) || n.category === filter;
        const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.message.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getIconColor = (type) => {
        switch (type) {
            case 'ticket': return { bg: 'var(--accent-muted)', color: 'var(--accent)' };
            case 'success': return { bg: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' };
            case 'security': return { bg: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)' };
            case 'system': return { bg: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' };
            case 'info': return { bg: 'var(--accent-muted)', color: 'var(--accent)' };
            default: return { bg: 'var(--bg)', color: 'var(--text)' };
        }
    };

    const activeTabStyle = (isActive) => ({
        padding: '8px 16px',
        borderRadius: '8px',
        fontSize: '13px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s',
        backgroundColor: isActive ? 'var(--accent)' : 'transparent',
        color: isActive ? 'white' : 'var(--text)',
        border: 'none',
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Page Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-bright)' }}>Notifications</h2>
                        {unreadCount > 0 && (
                            <span style={{
                                padding: '4px 12px', borderRadius: '20px',
                                backgroundColor: 'var(--accent)', color: 'white',
                                fontSize: '13px', fontWeight: '700',
                                boxShadow: '0 2px 8px rgba(124, 58, 237, 0.3)',
                            }}>
                                {unreadCount} new
                            </span>
                        )}
                    </div>
                    <p style={{ color: 'var(--text)', fontSize: '15px' }}>Stay up to date with your support activity.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Button variant="outline" icon={CheckCheck} size="small" onClick={markAllRead}>Mark All Read</Button>
                    <Button variant="ghost" icon={Trash2} size="small" onClick={clearAll}>Clear All</Button>
                </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ flexGrow: 1, position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text)' }} />
                        <input
                            type="text"
                            placeholder="Search notifications..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%', padding: '10px 16px 10px 44px', borderRadius: '10px',
                                border: '1px solid var(--border)', backgroundColor: 'var(--bg)',
                                color: 'var(--text-bright)', outline: 'none', fontSize: '14px',
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {[
                            { id: 'all', label: 'All' },
                            { id: 'unread', label: 'Unread' },
                            { id: 'update', label: 'Updates' },
                            { id: 'reply', label: 'Replies' },
                            { id: 'security', label: 'Security' },
                            { id: 'system', label: 'System' },
                        ].map(f => (
                            <button key={f.id} onClick={() => setFilter(f.id)} style={activeTabStyle(filter === f.id)}>
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Notifications List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((n) => {
                        const iconColors = getIconColor(n.type);
                        return (
                            <div
                                key={n.id}
                                className="glass-card"
                                onClick={() => markAsRead(n.id)}
                                style={{
                                    padding: '20px 24px',
                                    display: 'flex',
                                    gap: '16px',
                                    alignItems: 'flex-start',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    borderLeft: !n.read ? '3px solid var(--accent)' : '3px solid transparent',
                                    backgroundColor: !n.read ? 'var(--surface)' : 'var(--surface)',
                                    opacity: n.read ? 0.75 : 1,
                                }}
                                onMouseOver={e => { e.currentTarget.style.transform = 'translateX(4px)'; e.currentTarget.style.opacity = '1'; }}
                                onMouseOut={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.opacity = n.read ? '0.75' : '1'; }}
                            >
                                {/* Icon */}
                                <div style={{
                                    width: '44px', height: '44px', borderRadius: '12px',
                                    backgroundColor: iconColors.bg, color: iconColors.color,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0,
                                }}>
                                    <n.icon size={20} />
                                </div>

                                {/* Content */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '6px' }}>
                                        <div style={{ fontSize: '15px', fontWeight: n.read ? '500' : '700', color: 'var(--text-bright)' }}>{n.title}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                                            {!n.read && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)', boxShadow: '0 0 8px rgba(124, 58, 237, 0.4)' }} />}
                                            <span style={{ fontSize: '12px', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                                                <Clock size={11} /> {n.time}
                                            </span>
                                        </div>
                                    </div>
                                    <p style={{ fontSize: '14px', color: 'var(--text)', lineHeight: '1.5', margin: 0 }}>{n.message}</p>
                                </div>

                                {/* Actions */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0 }}>
                                    {!n.read && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); markAsRead(n.id); }}
                                            style={{ padding: '6px', borderRadius: '6px', color: 'var(--text)', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--surface-hover)'}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                            title="Mark as read"
                                        >
                                            <MailOpen size={16} />
                                        </button>
                                    )}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }}
                                        style={{ padding: '6px', borderRadius: '6px', color: 'var(--text)', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = 'var(--error)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text)'; }}
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="glass-card" style={{ padding: '64px', textAlign: 'center' }}>
                        <div style={{
                            width: '64px', height: '64px', borderRadius: '16px',
                            backgroundColor: 'var(--accent-muted)', color: 'var(--accent)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 16px',
                        }}>
                            <Bell size={28} />
                        </div>
                        <h3 style={{ color: 'var(--text-bright)', fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>No notifications</h3>
                        <p style={{ color: 'var(--text)', fontSize: '14px' }}>
                            {filter !== 'all' ? 'No notifications match your current filter.' : 'You\'re all caught up! Check back later.'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerNotifications;


