import React, { useState } from 'react';
import { Building2, Plus, Search, ExternalLink, ShieldCheck, Users, Filter, MoreVertical, Globe, Shield, CreditCard, Mail } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import useNotification from '../../hooks/useNotification';

const TenantList = () => {
  const notification = useNotification();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newTenant, setNewTenant] = useState({
    name: '',
    domain: '',
    plan: 'Pro',
    adminEmail: '',
  });

  const tenants = [
    { id: 1, name: 'Acme Corp', domain: 'acme.supportos.com', plan: 'Enterprise', status: 'active', agents: 45, users: 1200, logo: 'AC' },
    { id: 2, name: 'Stark Industries', domain: 'stark.supportos.com', plan: 'Enterprise', status: 'active', agents: 120, users: 5000, logo: 'SI' },
    { id: 3, name: 'Wayne Ent', domain: 'wayne.supportos.com', plan: 'Pro', status: 'active', agents: 12, users: 800, logo: 'WE' },
    { id: 4, name: 'Globex', domain: 'globex.supportos.com', plan: 'Free', status: 'suspended', agents: 2, users: 15, logo: 'GX' },
    { id: 5, name: 'Oscorp', domain: 'oscorp.supportos.com', plan: 'Pro', status: 'active', agents: 25, users: 2100, logo: 'OS' },
    { id: 6, name: 'Umbrella Corp', domain: 'umbrella.supportos.com', plan: 'Enterprise', status: 'active', agents: 88, users: 4200, logo: 'UC' },
  ];

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tenant.domain.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tenant.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleCreateTenant = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCreateModalOpen(false);
      notification.success(`${newTenant.name} has been created successfully!`);
      setNewTenant({ name: '', domain: '', plan: 'Pro', adminEmail: '' });
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ color: 'var(--text-bright)', fontSize: '24px', fontWeight: '700' }}>Tenant Management</h1>
          <p style={{ color: 'var(--text)', fontSize: '14px' }}>Manage all companies and instances on the platform.</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={() => setIsCreateModalOpen(true)}>
          Create New Tenant
        </Button>
      </div>

      <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text)' }} />
              <input 
                placeholder="Search by tenant name, domain or ID..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 44px',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg)',
                  color: 'var(--text-bright)',
                  outline: 'none',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['All', 'Active', 'Suspended'].map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f.toLowerCase())}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: statusFilter === f.toLowerCase() ? 'var(--accent)' : 'transparent',
                  color: statusFilter === f.toLowerCase() ? 'white' : 'var(--text)',
                  border: 'none',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ overflow: 'hidden' }}>
        {filteredTenants.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg)' }}>
                  <th style={{ padding: '16px', color: 'var(--text)', fontWeight: '600', fontSize: '13px' }}>TENANT</th>
                  <th style={{ padding: '16px', color: 'var(--text)', fontWeight: '600', fontSize: '13px' }}>PLAN</th>
                  <th style={{ padding: '16px', color: 'var(--text)', fontWeight: '600', fontSize: '13px' }}>STATUS</th>
                  <th style={{ padding: '16px', color: 'var(--text)', fontWeight: '600', fontSize: '13px' }}>USAGE</th>
                  <th style={{ padding: '16px', color: 'var(--text)', fontWeight: '600', fontSize: '13px' }}>DOMAIN</th>
                  <th style={{ padding: '16px', textAlign: 'right' }}></th>
                </tr>
              </thead>
              <tbody>
                {filteredTenants.map(tenant => (
                  <tr key={tenant.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--accent-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontWeight: '700' }}>
                          {tenant.logo}
                        </div>
                        <div>
                          <div style={{ color: 'var(--text-bright)', fontWeight: '600', fontSize: '14px' }}>{tenant.name}</div>
                          <div style={{ color: 'var(--text)', fontSize: '12px' }}>ID: T-{tenant.id}00{tenant.id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <Badge variant={tenant.plan === 'Enterprise' ? 'primary' : 'outline'}>{tenant.plan}</Badge>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <Badge variant={tenant.status === 'active' ? 'success' : 'error'}>
                        {tenant.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--text-bright)' }}>
                            <Users size={14} style={{ color: 'var(--text)' }} /> {tenant.agents} Agents
                         </div>
                         <div style={{ fontSize: '12px', color: 'var(--text)' }}>
                            {tenant.users.toLocaleString()} End Users
                         </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text)', fontSize: '13px' }}>
                         <Globe size={14} />
                         {tenant.domain}
                      </div>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                        <Button variant="ghost" size="small" icon={ExternalLink} onClick={() => notification.info(`Managing ${tenant.name}`)} />
                        <Button variant="ghost" size="small" icon={ShieldCheck} onClick={() => notification.info(`Security for ${tenant.name}`)} />
                        <Button variant="ghost" size="small" icon={MoreVertical} onClick={() => notification.info(`Options for ${tenant.name}`)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ padding: '64px', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--text-bright)', fontSize: '18px', fontWeight: '700' }}>No tenants found</h3>
            <p style={{ color: 'var(--text)', fontSize: '14px', marginTop: '8px' }}>Try adjusting your search or status filter.</p>
          </div>
        )}
        <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', backgroundColor: 'var(--bg)' }}>
           <span style={{ fontSize: '13px', color: 'var(--text)' }}>Showing {filteredTenants.length} of {tenants.length} tenants</span>
           <div style={{ display: 'flex', gap: '8px' }}>
              <Button variant="outline" size="small" disabled>Previous</Button>
              <Button variant="outline" size="small" onClick={() => notification.info('Next page')}>Next</Button>
           </div>
        </div>
      </div>

      {/* Create Tenant Modal */}
      <Modal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        title="Create New Tenant"
        footer={(
          <>
            <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
            <Button variant="primary" loading={isSubmitting} onClick={handleCreateTenant}>Create Workspace</Button>
          </>
        )}
      >
        <form onSubmit={handleCreateTenant} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Input 
            label="Company Name" 
            placeholder="e.g. Stark Industries" 
            value={newTenant.name}
            onChange={e => setNewTenant({...newTenant, name: e.target.value})}
            icon={Building2}
            required
          />
          <Input 
            label="Workspace Domain" 
            placeholder="stark.supportos.com" 
            value={newTenant.domain}
            onChange={e => setNewTenant({...newTenant, domain: e.target.value})}
            icon={Globe}
            required
          />
          <Input 
            label="Admin Email" 
            type="email"
            placeholder="admin@company.com" 
            value={newTenant.adminEmail}
            onChange={e => setNewTenant({...newTenant, adminEmail: e.target.value})}
            icon={Mail}
            required
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-bright)', paddingLeft: '4px' }}>Subscription Plan</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {['Pro', 'Enterprise'].map(p => (
                <div 
                  key={p}
                  onClick={() => setNewTenant({...newTenant, plan: p})}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    border: `2px solid ${newTenant.plan === p ? 'var(--accent)' : 'var(--border)'}`,
                    backgroundColor: newTenant.plan === p ? 'var(--accent-muted)' : 'var(--surface)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px', color: newTenant.plan === p ? 'var(--accent)' : 'var(--text)' }}>
                    {p === 'Pro' ? <CreditCard size={20} /> : <Shield size={20} />}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: newTenant.plan === p ? 'var(--accent)' : 'var(--text-bright)' }}>{p}</div>
                </div>
              ))}
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TenantList;
