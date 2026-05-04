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
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newTenant, setNewTenant] = useState({
    name: '',
    domain: '',
    plan: 'Pro',
    adminEmail: '',
  });

  const [editTenant, setEditTenant] = useState({
    name: '',
    domain: '',
    plan: 'Pro',
  });

  const [tenants, setTenants] = useState([
    { id: 1, name: 'Acme Corp', domain: 'acme.supportos.com', plan: 'Enterprise', status: 'active', agents: 45, users: 1200, logo: 'AC', mfa: true, sso: false },
    { id: 2, name: 'Stark Industries', domain: 'stark.supportos.com', plan: 'Enterprise', status: 'active', agents: 120, users: 5000, logo: 'SI', mfa: true, sso: true },
    { id: 3, name: 'Wayne Ent', domain: 'wayne.supportos.com', plan: 'Pro', status: 'active', agents: 12, users: 800, logo: 'WE', mfa: false, sso: false },
    { id: 4, name: 'Globex', domain: 'globex.supportos.com', plan: 'Free', status: 'suspended', agents: 2, users: 15, logo: 'GX', mfa: false, sso: false },
    { id: 5, name: 'Oscorp', domain: 'oscorp.supportos.com', plan: 'Pro', status: 'active', agents: 25, users: 2100, logo: 'OS', mfa: true, sso: false },
    { id: 6, name: 'Umbrella Corp', domain: 'umbrella.supportos.com', plan: 'Enterprise', status: 'active', agents: 88, users: 4200, logo: 'UC', mfa: true, sso: true },
  ]);

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tenant.domain.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tenant.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleCreateTenant = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newId = tenants.length > 0 ? Math.max(...tenants.map(t => t.id)) + 1 : 1;
      const logo = newTenant.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
      
      const tenantToAdd = {
        ...newTenant,
        id: newId,
        status: 'active',
        agents: 0,
        users: 0,
        logo: logo || '??',
        mfa: false,
        sso: false
      };

      setTenants(prev => [tenantToAdd, ...prev]);
      setIsSubmitting(false);
      setIsCreateModalOpen(false);
      notification.success(`${newTenant.name} has been created successfully!`);
      setNewTenant({ name: '', domain: '', plan: 'Pro', adminEmail: '' });
    }, 1500);
  };

  const handleUpdateTenant = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setTenants(prev => prev.map(t => 
        t.id === selectedTenant.id ? { ...t, ...editTenant, logo: editTenant.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) } : t
      ));
      setIsSubmitting(false);
      setIsManageModalOpen(false);
      notification.success(`${editTenant.name} has been updated successfully!`);
    }, 1000);
  };

  const handleSecurityAction = (setting) => {
    setTenants(prev => prev.map(t => 
      t.id === selectedTenant.id ? { ...t, [setting]: !t[setting] } : t
    ));
    notification.success(`${setting.toUpperCase()} updated for ${selectedTenant.name}`);
  };

  const handleStatusChange = (newStatus) => {
    setTenants(prev => prev.map(t => 
      t.id === selectedTenant.id ? { ...t, status: newStatus } : t
    ));
    setIsOptionsModalOpen(false);
    notification.success(`${selectedTenant.name} is now ${newStatus}`);
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
                        <Button variant="ghost" size="small" icon={ExternalLink} onClick={() => { setSelectedTenant(tenant); setEditTenant({ name: tenant.name, domain: tenant.domain, plan: tenant.plan }); setIsManageModalOpen(true); }} />
                        <Button variant="ghost" size="small" icon={ShieldCheck} onClick={() => { setSelectedTenant(tenant); setIsSecurityModalOpen(true); }} />
                        <Button variant="ghost" size="small" icon={MoreVertical} onClick={() => { setSelectedTenant(tenant); setIsOptionsModalOpen(true); }} />
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

      {/* Manage Tenant Modal */}
      <Modal 
        isOpen={isManageModalOpen} 
        onClose={() => setIsManageModalOpen(false)} 
        title={`Manage Workspace - ${selectedTenant?.name}`}
        footer={(
          <>
            <Button variant="ghost" onClick={() => setIsManageModalOpen(false)}>Cancel</Button>
            <Button variant="primary" loading={isSubmitting} onClick={handleUpdateTenant}>Save Changes</Button>
          </>
        )}
      >
        <form onSubmit={handleUpdateTenant} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Input 
            label="Company Name" 
            value={editTenant.name}
            onChange={e => setEditTenant({...editTenant, name: e.target.value})}
            icon={Building2}
            required
          />
          <Input 
            label="Workspace Domain" 
            value={editTenant.domain}
            onChange={e => setEditTenant({...editTenant, domain: e.target.value})}
            icon={Globe}
            required
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-bright)', paddingLeft: '4px' }}>Subscription Plan</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {['Pro', 'Enterprise'].map(p => (
                <div 
                  key={p}
                  onClick={() => setEditTenant({...editTenant, plan: p})}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    border: `2px solid ${editTenant.plan === p ? 'var(--accent)' : 'var(--border)'}`,
                    backgroundColor: editTenant.plan === p ? 'var(--accent-muted)' : 'var(--surface)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px', color: editTenant.plan === p ? 'var(--accent)' : 'var(--text)' }}>
                    {p === 'Pro' ? <CreditCard size={20} /> : <Shield size={20} />}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: editTenant.plan === p ? 'var(--accent)' : 'var(--text-bright)' }}>{p}</div>
                </div>
              ))}
            </div>
          </div>
        </form>
      </Modal>

      {/* Security Modal */}
      <Modal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
        title={`Security Settings - ${selectedTenant?.name}`}
        footer={<Button variant="primary" onClick={() => setIsSecurityModalOpen(false)}>Done</Button>}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '600', color: 'var(--text-bright)' }}>Multi-Factor Authentication (MFA)</div>
              <div style={{ fontSize: '13px', color: 'var(--text)' }}>Require all agents to use MFA</div>
            </div>
            <Button 
              variant={selectedTenant?.mfa ? "primary" : "outline"} 
              size="small" 
              onClick={() => handleSecurityAction('mfa')}
            >
              {selectedTenant?.mfa ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
          <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '600', color: 'var(--text-bright)' }}>Single Sign-On (SSO)</div>
              <div style={{ fontSize: '13px', color: 'var(--text)' }}>Enable SAML/OIDC authentication</div>
            </div>
            <Button 
              variant={selectedTenant?.sso ? "primary" : "outline"} 
              size="small" 
              onClick={() => handleSecurityAction('sso')}
            >
              {selectedTenant?.sso ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
          <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
            <div style={{ fontWeight: '600', color: 'var(--text-bright)', marginBottom: '8px' }}>Allowed IP Ranges</div>
            <div style={{ fontSize: '13px', color: 'var(--text)', marginBottom: '12px' }}>Restrict access to specific IP addresses.</div>
            <Input placeholder="e.g. 192.168.1.0/24" />
          </div>
        </div>
      </Modal>

      {/* Options Modal */}
      <Modal
        isOpen={isOptionsModalOpen}
        onClose={() => setIsOptionsModalOpen(false)}
        title={`More Options - ${selectedTenant?.name}`}
        footer={null}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            onClick={() => notification.info('Exporting data...')}
            style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--bg)', color: 'var(--text-bright)', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <ExternalLink size={18} /> Export Tenant Data
          </button>
          <button 
            onClick={() => handleStatusChange(selectedTenant?.status === 'active' ? 'suspended' : 'active')}
            style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--bg)', color: selectedTenant?.status === 'active' ? '#ef4444' : '#10b981', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <Shield size={18} /> {selectedTenant?.status === 'active' ? 'Suspend Tenant' : 'Activate Tenant'}
          </button>
          <button 
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this tenant? This action is irreversible.')) {
                notification.error(`Tenant ${selectedTenant?.name} deleted.`);
                setTenants(prev => prev.filter(t => t.id !== selectedTenant.id));
                setIsOptionsModalOpen(false);
              }
            }}
            style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #fee2e2', backgroundColor: '#fef2f2', color: '#ef4444', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <Plus size={18} style={{ transform: 'rotate(45deg)' }} /> Delete Tenant Permanentely
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TenantList;
