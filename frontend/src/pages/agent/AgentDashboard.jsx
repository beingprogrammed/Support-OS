import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Ticket, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  BarChart3,
  Users,
  MessageSquare
} from 'lucide-react';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';

const AgentDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Open Tickets', value: '14', icon: Ticket, trend: '+3', isUp: true, color: 'var(--accent)' },
    { label: 'Pending Response', value: '5', icon: Clock, trend: '-2', isUp: false, color: 'var(--warning)' },
    { label: 'Resolved Today', value: '12', icon: CheckCircle, trend: '+5', isUp: true, color: 'var(--success)' },
    { label: 'Average CSAT', value: '98%', icon: Zap, trend: '+1%', isUp: true, color: '#f59e0b' },
  ];

  const recentTickets = [
    { id: 'TC-1024', subject: 'Server connection issues in EMEA', priority: 'High', status: 'Open', customer: 'Sarah Connor' },
    { id: 'TC-1025', subject: 'Password reset not working', priority: 'Medium', status: 'Pending', customer: 'John Smith' },
    { id: 'TC-1026', subject: 'New feature request: API access', priority: 'Low', status: 'Open', customer: 'Maria Garcia' },
  ];

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '24px',
  };

  const statCardStyle = (color) => ({
    padding: '24px',
    backgroundColor: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-sm)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  });

  return (
    <div style={containerStyle}>
      {/* Welcome Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-bright)', marginBottom: '4px' }}>Welcome back, Agent!</h1>
          <p style={{ color: 'var(--text)', fontSize: '15px' }}>Here's what's happening with your tickets today.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="outline" icon={BarChart3} onClick={() => console.log('View reports')}>Reports</Button>
          <Button variant="primary" icon={Zap} onClick={() => navigate('/agent/queue')}>View Queue</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={gridStyle}>
        {stats.map((stat, i) => (
          <div key={i} style={statCardStyle(stat.color)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: `${stat.color}15`, color: stat.color }}>
                <stat.icon size={22} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '700', color: stat.isUp ? 'var(--success)' : 'var(--error)' }}>
                {stat.trend} {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: 'var(--text)', marginBottom: '4px', fontWeight: '500' }}>{stat.label}</div>
              <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-bright)' }}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px' }}>
        {/* Recent Tickets List */}
        <div className="glass-card" style={{ padding: '0' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-bright)' }}>My Active Tickets</h3>
            <Button variant="ghost" size="small" onClick={() => navigate('/agent/queue')}>View All</Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {recentTickets.map((ticket, i) => (
              <div 
                key={i} 
                onClick={() => navigate(`/agent/ticket/${ticket.id}`)}
                style={{ padding: '20px 24px', borderBottom: i === recentTickets.length - 1 ? 'none' : '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--surface-hover)'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--accent)' }}>{ticket.id}</span>
                  <Badge variant={ticket.priority === 'High' ? 'error' : 'warning'}>{ticket.priority}</Badge>
                </div>
                <div style={{ fontWeight: '600', color: 'var(--text-bright)', marginBottom: '4px' }}>{ticket.subject}</div>
                <div style={{ fontSize: '13px', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Avatar name={ticket.customer} size="small" /> {ticket.customer}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-bright)', marginBottom: '24px' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { user: 'Sarah Connor', action: 'replied to', target: '#TC-1024', time: '2m ago', icon: MessageSquare },
              { user: 'System', action: 'escalated', target: '#TC-1030', time: '1h ago', icon: Zap },
              { user: 'Admin User', action: 'assigned', target: '#TC-1045', time: '2h ago', icon: Users },
            ].map((activity, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>
                  <activity.icon size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: 'var(--text-bright)', lineHeight: '1.4' }}>
                    <span style={{ fontWeight: '600' }}>{activity.user}</span> {activity.action} <span style={{ color: 'var(--accent)', fontWeight: '600' }}>{activity.target}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text)', marginTop: '2px' }}>{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" fullWidth style={{ marginTop: '24px' }}>View Full Audit Log</Button>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
