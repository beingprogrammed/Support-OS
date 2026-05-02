import React from 'react';
import { Server, Activity, Users, Globe, Database, Cpu, HardDrive, TrendingUp, Filter, Download, MoreHorizontal } from 'lucide-react';
import Button from '../../components/common/Button';
import useNotification from '../../hooks/useNotification';

const PlatformAnalytics = () => {
  const notification = useNotification();
  const stats = [
    { label: 'Total Tenants', value: '1,248', change: '+12%', icon: Globe, color: 'var(--accent)' },
    { label: 'Active Sessions', value: '45.2k', change: '+5%', icon: Users, color: '#3b82f6' },
    { label: 'Database Load', value: '24%', change: '-2%', icon: Database, color: '#10b981' },
    { label: 'Server Health', value: '99.9%', change: 'Stable', icon: Server, color: '#f59e0b' },
  ];

  const chartBarStyle = (height) => ({
    flex: 1,
    height: `${height}%`,
    background: 'linear-gradient(to top, var(--accent-muted), var(--accent))',
    borderRadius: '4px 4px 0 0',
    opacity: 0.8,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ color: 'var(--text-bright)', fontSize: '24px', fontWeight: '700' }}>Platform Analytics</h1>
          <p style={{ color: 'var(--text)', fontSize: '14px' }}>Global metrics across all tenants and infrastructure.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
           <Button variant="outline" icon={Download} onClick={() => notification.info('Exporting report...')}>Export Report</Button>
           <Button variant="outline" icon={Filter} onClick={() => notification.info('Filter clicked')}>Custom Range</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        {stats.map((stat, i) => (
          <div key={i} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: `${stat.color}15`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <stat.icon size={24} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: stat.change.includes('+') ? 'var(--success)' : stat.change.includes('-') ? 'var(--error)' : 'var(--text)', fontWeight: '600' }}>
                <TrendingUp size={14} /> {stat.change}
              </div>
            </div>
            <div>
               <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-bright)', marginBottom: '4px' }}>{stat.value}</div>
               <div style={{ fontSize: '14px', color: 'var(--text)', fontWeight: '500' }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
             <h3 style={{ color: 'var(--text-bright)', fontSize: '18px', fontWeight: '600' }}>Request Traffic</h3>
             <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text)' }}>
                   <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)' }}></div> API Calls
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text)' }}>
                   <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-muted)' }}></div> Webhooks
                </div>
             </div>
          </div>
          <div style={{ height: '250px', display: 'flex', alignItems: 'flex-end', gap: '12px', padding: '0 10px' }}>
              {[35, 45, 60, 40, 75, 55, 90, 65, 80, 50, 85, 95, 70, 60, 75, 55, 40, 85, 65, 90].map((h, i) => (
                <div key={i} style={chartBarStyle(h)}></div>
              ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', color: 'var(--text)', fontSize: '12px' }}>
             <span>00:00</span>
             <span>06:00</span>
             <span>12:00</span>
             <span>18:00</span>
             <span>23:59</span>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ color: 'var(--text-bright)', marginBottom: '24px', fontSize: '18px', fontWeight: '600' }}>Infrastructure Health</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { label: 'CPU Cluster Load', value: 42, icon: Cpu, color: '#8b5cf6' },
              { label: 'Memory Allocation', value: 68, icon: Activity, color: '#3b82f6' },
              { label: 'Media Storage', value: 31, icon: HardDrive, color: '#f59e0b' },
              { label: 'Network Latency', value: 12, icon: Globe, color: '#10b981' },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--text-bright)', fontSize: '14px', fontWeight: '500' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><item.icon size={16} style={{ color: item.color }} /> {item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div style={{ height: '8px', backgroundColor: 'var(--bg)', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <div style={{ width: `${item.value}%`, height: '100%', backgroundColor: item.color, borderRadius: '4px' }}></div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" fullWidth size="small" style={{ marginTop: '24px' }} onClick={() => notification.info('View detailed health logs')}>
             Detailed Infrastructure Logs
          </Button>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ color: 'var(--text-bright)', marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>Tenant Load Distribution</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { name: 'Stark Industries', load: '18.4%', status: 'high' },
              { name: 'Acme Corp', load: '12.1%', status: 'normal' },
              { name: 'Wayne Ent', load: '9.2%', status: 'normal' },
              { name: 'Oscorp', load: '7.5%', status: 'normal' },
              { name: 'Umbrella Corp', load: '15.8%', status: 'high' },
            ].map((tenant, i) => (
              <div key={i} style={{ padding: '16px', backgroundColor: 'var(--bg)', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                   <div style={{ color: 'var(--text-bright)', fontSize: '14px', fontWeight: '600' }}>{tenant.name}</div>
                   <div style={{ color: 'var(--text)', fontSize: '12px' }}>Distribution: {tenant.load}</div>
                </div>
                <Button variant="ghost" size="small" icon={MoreHorizontal} onClick={() => notification.info(`Settings for ${tenant.name}`)} />
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default PlatformAnalytics;
