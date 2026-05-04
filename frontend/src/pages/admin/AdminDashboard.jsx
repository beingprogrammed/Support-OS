import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Ticket, Settings, ArrowUpRight, TrendingUp, Clock, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stats = [
    { label: 'Total Agents', value: '24', icon: Users, color: 'var(--accent)', trend: '+2 this month' },
    { label: 'Active Tickets', value: '142', icon: Ticket, color: '#f59e0b', trend: '-12% from yesterday' },
    { label: 'Avg. CSAT', value: '4.8', icon: BarChart3, color: '#10b981', trend: '+0.2 from last week' },
    { label: 'Resolution Rate', value: '94%', icon: ArrowUpRight, color: '#8b5cf6', trend: 'Stable' },
  ];

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
  };

  const statCardStyle = {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const statHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  };

  const statIconStyle = (color) => ({
    padding: '12px',
    borderRadius: '12px',
    backgroundColor: `${color}15`,
    color: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });

  const statValueStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: 'var(--text-bright)',
    marginBottom: '4px',
  };

  const statLabelStyle = {
    fontSize: '14px',
    color: 'var(--text)',
    fontWeight: '500',
  };

  const statTrendStyle = {
    fontSize: '12px',
    color: 'var(--text)',
    opacity: 0.7,
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  const mainGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
    gap: '24px',
  };

  const chartCardStyle = {
    padding: '24px',
    minHeight: '400px',
  };

  const chartPlaceholderStyle = {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '250px',
    marginTop: '32px',
    padding: '0 10px',
    gap: '12px',
  };

  const barStyle = (height) => ({
    width: '100%',
    height: height,
    background: 'linear-gradient(to top, var(--accent-muted), var(--accent))',
    borderRadius: '6px 6px 0 0',
    transition: 'height 1s ease-out',
  });

  const agentItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    borderRadius: '12px',
    backgroundColor: 'var(--surface)',
    border: '1px solid var(--border)',
    marginBottom: '12px',
    boxShadow: 'var(--shadow-sm)',
    transition: 'transform 0.2s',
    cursor: 'pointer'
  };

  const avatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: 'var(--accent-muted)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--accent)',
    fontWeight: '600',
  };

  return (
    <div style={containerStyle}>
      <div style={statsGridStyle}>
        {stats.map((stat, i) => (
          <div key={i} className="glass-card" style={statCardStyle}>
            <div style={statHeaderStyle}>
              <div style={statIconStyle(stat.color)}>
                <stat.icon size={24} />
              </div>
              <TrendingUp size={16} style={{ color: 'var(--success)', opacity: 0.8 }} />
            </div>
            <div>
              <div style={statValueStyle}>{stat.value}</div>
              <div style={statLabelStyle}>{stat.label}</div>
            </div>
            <div style={statTrendStyle}>
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      <div style={mainGridStyle}>
        <div className="glass-card" style={chartCardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h3 style={{ color: 'var(--text-bright)', fontSize: '18px', fontWeight: '700' }}>Ticket Volume</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'var(--accent)' }}></div>
              <span style={{ fontSize: '12px', color: 'var(--text)' }}>Resolved</span>
            </div>
          </div>
          <p style={{ color: 'var(--text)', fontSize: '14px' }}>Overview of ticket resolutions over the last 7 days.</p>
          
          <div style={chartPlaceholderStyle}>
            {[40, 65, 45, 85, 55, 75, 95].map((h, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={barStyle(`${h}%`)}></div>
                <span style={{ fontSize: '11px', color: 'var(--text)', opacity: 0.6 }}>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: 'var(--text-bright)', fontSize: '18px', fontWeight: '700' }}>Top Performing Agents</h3>
            <button onClick={() => navigate('/admin/agents')} style={{ color: 'var(--accent)', fontSize: '13px', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}>View All</button>
          </div>
          <div>
            {[
              { name: 'Alex Rivera', resolution: '98%', tickets: 45, initial: 'AR' },
              { name: 'Sarah Chen', resolution: '96%', tickets: 38, initial: 'SC' },
              { name: 'Marcus Bell', resolution: '94%', tickets: 42, initial: 'MB' },
              { name: 'Elena Frost', resolution: '92%', tickets: 35, initial: 'EF' },
            ].map((agent, i) => (
              <div 
                key={i} 
                style={agentItemStyle}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                onClick={() => console.log('View agent details', agent.name)}
              >
                <div style={avatarStyle}>{agent.initial}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'var(--text-bright)', fontSize: '14px', fontWeight: '600' }}>{agent.name}</div>
                  <div style={{ color: 'var(--text)', fontSize: '12px' }}>{agent.resolution} Resolution</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: 'var(--text-bright)', fontSize: '14px', fontWeight: '600' }}>{agent.tickets}</div>
                  <div style={{ color: 'var(--text)', fontSize: '11px' }}>Tickets</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
