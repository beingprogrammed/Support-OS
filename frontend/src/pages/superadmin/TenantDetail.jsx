import React from 'react';
import { Building2, Mail, Globe, Calendar, CreditCard, Shield, MapPin, ExternalLink, Database, Users, ArrowLeft, MoreHorizontal, AlertTriangle } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import useNotification from '../../hooks/useNotification';

const TenantDetail = () => {
  const notification = useNotification();
  const tenant = {
    name: 'Acme Corp',
    domain: 'acme.supportos.com',
    plan: 'Enterprise',
    status: 'active',
    joined: 'Jan 12, 2024',
    email: 'billing@acmecorp.com',
    address: '123 Innovation Drive, San Francisco, CA',
    usage: {
      tickets: 4520,
      agents: 45,
      storage: '12.4 GB',
      uptime: '99.98%'
    }
  };

  const handleBack = () => {
    notification.info('Navigating back to Tenant List');
  };

  const handleEdit = () => {
    notification.info('Edit Tenant modal opened');
  };

  const handleSuspend = () => {
    if (window.confirm(`Are you sure you want to suspend ${tenant.name}?`)) {
      notification.success('Tenant suspended');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button variant="ghost" icon={ArrowLeft} onClick={handleBack}>
          Back to Tenants
        </Button>
        <div style={{ display: 'flex', gap: '8px' }}>
           <Button variant="outline" icon={AlertTriangle} onClick={handleSuspend}>Suspend Tenant</Button>
           <Button variant="primary" onClick={handleEdit}>Edit Details</Button>
           <Button variant="outline" icon={MoreHorizontal} onClick={() => notification.info('More actions')} />
        </div>
      </div>

      <div className="glass-card" style={{ padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '20px', backgroundColor: 'var(--accent-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
            <Building2 size={40} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
               <h1 style={{ color: 'var(--text-bright)', fontSize: '28px', fontWeight: '700' }}>{tenant.name}</h1>
               <Badge variant="success">ACTIVE</Badge>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text)', fontSize: '15px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Globe size={16} /> {tenant.domain}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={16} /> San Francisco, CA</span>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
           <div style={{ color: 'var(--text)', fontSize: '14px', marginBottom: '4px' }}>Member Since</div>
           <div style={{ color: 'var(--text-bright)', fontSize: '18px', fontWeight: '600' }}>{tenant.joined}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {[
          { label: 'Total Tickets', value: tenant.usage.tickets.toLocaleString(), icon: Shield, color: 'var(--accent)' },
          { label: 'Active Agents', value: tenant.usage.agents, icon: Users, color: '#3b82f6' },
          { label: 'Storage Used', value: tenant.usage.storage, icon: Database, color: '#f59e0b' },
          { label: 'Service Uptime', value: tenant.usage.uptime, icon: Globe, color: '#10b981' },
        ].map((stat, i) => (
          <div key={i} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: `${stat.color}15`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <stat.icon size={20} />
            </div>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--text)', fontWeight: '500' }}>{stat.label}</div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-bright)' }}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ color: 'var(--text-bright)', marginBottom: '24px', fontSize: '18px', fontWeight: '600' }}>Subscription & Billing</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Plan Level', value: tenant.plan, icon: CreditCard },
              { label: 'Billing Email', value: tenant.email, icon: Mail },
              { label: 'Next Invoice', value: 'Feb 12, 2024', icon: Calendar },
              { label: 'Payment Method', value: 'Visa ending in 4242', icon: CreditCard },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: 'var(--bg)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text)', fontSize: '14px', fontWeight: '500' }}>
                  <item.icon size={18} style={{ color: 'var(--accent)' }} /> {item.label}
                </span>
                <span style={{ color: 'var(--text-bright)', fontSize: '14px', fontWeight: '600' }}>{item.value}</span>
              </div>
            ))}
          </div>
          <Button variant="outline" fullWidth style={{ marginTop: '20px' }} onClick={() => notification.info('View all invoices')}>Manage Subscription</Button>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ color: 'var(--text-bright)', fontSize: '18px', fontWeight: '600' }}>Recent Activity</h3>
            <Button variant="ghost" size="small" icon={ExternalLink} onClick={() => notification.info('View full audit log')}>Full Log</Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { event: 'Plan upgraded to Enterprise', time: '2 days ago', type: 'success' },
              { event: 'New admin added (Sarah J.)', time: '1 week ago', type: 'info' },
              { event: 'Security policy updated', time: '2 weeks ago', type: 'warning' },
              { event: 'Billing period renewed', time: '1 month ago', type: 'info' },
              { event: 'Domain verification success', time: '1 month ago', type: 'success' },
            ].map((log, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px' }}>
                <div style={{ marginTop: '4px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: log.type === 'success' ? 'var(--success)' : log.type === 'warning' ? 'var(--warning)' : 'var(--accent)' }}></div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'var(--text-bright)', fontSize: '14px', fontWeight: '500' }}>{log.event}</div>
                  <div style={{ color: 'var(--text)', fontSize: '12px' }}>{log.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantDetail;
