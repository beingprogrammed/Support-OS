import React, { useState, useEffect } from 'react';
import { Building2, Users, Database, Globe, ArrowUpRight, ArrowDownRight, Server, Activity, ShieldCheck, Zap, Plus, ExternalLink, MoreVertical, Palette } from 'lucide-react';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import useNotification from '../../hooks/useNotification';
import ThemeSelector from '../../components/common/ThemeSelector';

const SuperAdminDashboard = () => {
  const notification = useNotification();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const stats = [
    { label: 'Total Tenants', value: '128', icon: Building2, color: 'var(--accent)', trend: '+12%', up: true },
    { label: 'Total Users', value: '12,450', icon: Users, color: '#3b82f6', trend: '+5%', up: true },
    { label: 'Storage Used', value: '1.2 TB', icon: Database, color: '#f59e0b', trend: '+8%', up: true },
    { label: 'System Uptime', value: '99.99%', icon: Globe, color: '#10b981', trend: 'stable', up: true },
  ];

  const recentTenants = [
    { name: 'Skyline Corp', industry: 'Technology', users: 450, status: 'active', date: '2h ago' },
    { name: 'Global Logistics', industry: 'Transport', users: 120, status: 'active', date: '5h ago' },
    { name: 'HealthCare Plus', industry: 'Medical', users: 890, status: 'pending', date: '1d ago' },
    { name: 'EcoPower Solutions', industry: 'Energy', users: 55, status: 'active', date: '1d ago' },
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
    alignItems: 'center',
    gap: '20px',
  };

  const statIconStyle = (color) => ({
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    backgroundColor: `${color}15`,
    color: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });

  const mainGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
    gap: '24px',
  };

  const healthItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    borderRadius: '12px',
    backgroundColor: 'var(--bg)',
    border: '1px solid var(--border)',
    transition: 'all 0.2s',
  };

  const chartBarStyle = (height) => ({
    flex: 1,
    height: `${height}%`,
    backgroundColor: 'var(--accent)',
    borderRadius: '4px 4px 0 0',
    opacity: 0.8,
    transition: 'height 1s ease-out',
  });

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ color: 'var(--text-bright)', fontSize: '24px', fontWeight: '700' }}>Platform Overview</h1>
          <p style={{ color: 'var(--text)', fontSize: '14px' }}>Real-time metrics across all SupportOS instances.</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={() => notification.info('Add New Tenant clicked')}>
          Create New Tenant
        </Button>
      </div>

      <div style={statsGridStyle}>
        {stats.map((stat, i) => (
          <div key={i} className="glass-card animate-fade-in" style={statCardStyle}>
            <div style={statIconStyle(stat.color)}>
              <stat.icon size={28} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: 'var(--text)', fontSize: '14px', fontWeight: '500' }}>{stat.label}</div>
              <div style={{ color: 'var(--text-bright)', fontSize: '24px', fontWeight: '700', margin: '2px 0' }}>{stat.value}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: stat.up ? 'var(--success)' : 'var(--error)' }}>
                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                <span>{stat.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={mainGridStyle}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ color: 'var(--text-bright)', fontSize: '18px', fontWeight: '600' }}>Platform Activity</h3>
              <select style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none', fontSize: '13px' }}>
                <option>Last 30 Days</option>
                <option>Last 7 Days</option>
                <option>Last 24 Hours</option>
              </select>
            </div>
            <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '8px', padding: '0 10px' }}>
              {[45, 60, 75, 40, 85, 55, 90, 65, 50, 80, 70, 95].map((h, i) => (
                <div key={i} style={chartBarStyle(h)} onMouseOver={(e) => e.currentTarget.style.opacity = 1} onMouseOut={(e) => e.currentTarget.style.opacity = 0.8}></div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', padding: '0 10px' }}>
               {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                 <span key={m} style={{ fontSize: '11px', color: 'var(--text)' }}>{m}</span>
               ))}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
               <h3 style={{ color: 'var(--text-bright)', fontSize: '18px', fontWeight: '600' }}>Recent Tenants</h3>
               <Button variant="ghost" size="small" onClick={() => notification.info('View All Tenants')}>View All</Button>
             </div>
             <div style={{ overflowX: 'auto' }}>
               <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                 <thead>
                   <tr style={{ borderBottom: '1px solid var(--border)' }}>
                     <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: 'var(--text)', fontWeight: '500' }}>Tenant Name</th>
                     <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: 'var(--text)', fontWeight: '500' }}>Industry</th>
                     <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: 'var(--text)', fontWeight: '500' }}>Users</th>
                     <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', color: 'var(--text)', fontWeight: '500' }}>Status</th>
                     <th style={{ textAlign: 'right', padding: '12px', fontSize: '13px', color: 'var(--text)', fontWeight: '500' }}>Action</th>
                   </tr>
                 </thead>
                 <tbody>
                   {recentTenants.map((tenant, i) => (
                     <tr key={i} style={{ borderBottom: i === recentTenants.length - 1 ? 'none' : '1px solid var(--border)' }}>
                       <td style={{ padding: '12px' }}>
                         <div style={{ fontWeight: '600', color: 'var(--text-bright)', fontSize: '14px' }}>{tenant.name}</div>
                         <div style={{ fontSize: '12px', color: 'var(--text)' }}>Added {tenant.date}</div>
                       </td>
                       <td style={{ padding: '12px', fontSize: '14px' }}>{tenant.industry}</td>
                       <td style={{ padding: '12px', fontSize: '14px' }}>{tenant.users.toLocaleString()}</td>
                       <td style={{ padding: '12px' }}>
                         <Badge variant={tenant.status === 'active' ? 'success' : 'warning'}>{tenant.status}</Badge>
                       </td>
                       <td style={{ padding: '12px', textAlign: 'right' }}>
                         <Button variant="ghost" size="small" onClick={() => notification.info(`Manage ${tenant.name}`)}>
                           <MoreVertical size={16} />
                         </Button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <Activity size={20} style={{ color: 'var(--accent)' }} />
              <h3 style={{ color: 'var(--text-bright)', fontSize: '18px', fontWeight: '600' }}>System Health</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'API Gateway', status: 'Online', variant: 'success' },
                { name: 'Database Cluster', status: 'Healthy', variant: 'success' },
                { name: 'AI Processing Unit', status: 'Online', variant: 'success' },
                { name: 'Media Storage', status: 'High Load', variant: 'warning' },
                { name: 'Real-time Socket', status: 'Online', variant: 'success' },
              ].map((item, i) => (
                <div key={i} style={healthItemStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Server size={18} style={{ color: 'var(--text)', opacity: 0.6 }} />
                    <span style={{ color: 'var(--text-bright)', fontSize: '14px', fontWeight: '500' }}>{item.name}</span>
                  </div>
                  <Badge variant={item.variant}>{item.status}</Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <ShieldCheck size={20} style={{ color: 'var(--accent)' }} />
              <h3 style={{ color: 'var(--text-bright)', fontSize: '18px', fontWeight: '600' }}>Security Log</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { event: 'DDoS Protection', time: '12m ago', level: 'info' },
                { event: 'SuperAdmin Login', time: '45m ago', level: 'warning' },
                { event: 'Automated Backup', time: '2h ago', level: 'success' },
              ].map((event, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ marginTop: '4px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: event.level === 'warning' ? 'var(--warning)' : event.level === 'success' ? 'var(--success)' : 'var(--accent)' }}></div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: 'var(--text-bright)', fontSize: '13px', fontWeight: '600' }}>{event.event}</div>
                    <div style={{ color: 'var(--text)', fontSize: '11px' }}>{event.time}</div>
                  </div>
                  <Button variant="ghost" size="small" onClick={() => notification.info(`View log details for ${event.event}`)}>
                    <ExternalLink size={14} />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" fullWidth size="small" style={{ marginTop: '20px' }} onClick={() => notification.info('View All Logs')}>
              View All Security Logs
            </Button>
          </div>

          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <Palette size={20} style={{ color: 'var(--accent)' }} />
              <h3 style={{ color: 'var(--text-bright)', fontSize: '18px', fontWeight: '600' }}>Appearance</h3>
            </div>
            <ThemeSelector />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
