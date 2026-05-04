import React, { useState, useEffect, useRef } from 'react';
import { UserPlus, Search, MoreHorizontal, Shield, Mail, Filter, Download } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import Modal from '../../components/common/Modal';
import useNotification from '../../hooks/useNotification';

const AgentManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeMenu, setActiveMenu] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAgent, setNewAgent] = useState({ name: '', email: '', role: 'Support Agent' });
  const menuRef = useRef(null);
  const notification = useNotification();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initialAgents = [
    { id: 1, name: 'Alice Johnson', email: 'alice@supportos.com', role: 'Senior Agent', status: 'Active', performance: 94 },
    { id: 2, name: 'Bob Wilson', email: 'bob@supportos.com', role: 'Support Agent', status: 'Active', performance: 88 },
    { id: 3, name: 'Charlie Davis', email: 'charlie@supportos.com', role: 'Support Agent', status: 'Inactive', performance: 72 },
    { id: 4, name: 'Diana Prince', email: 'diana@supportos.com', role: 'Support Agent', status: 'Active', performance: 91 },
    { id: 5, name: 'Ethan Hunt', email: 'ethan@supportos.com', role: 'Senior Agent', status: 'Active', performance: 96 },
  ];

  const [agents, setAgents] = useState(initialAgents);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          agent.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || agent.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleAddAgent = () => {
    if (!newAgent.name || !newAgent.email) {
      notification.error('Please fill in all required fields.');
      return;
    }
    const agentToAdd = {
      id: agents.length + 1,
      ...newAgent,
      status: 'Active',
      performance: 0
    };
    setAgents([agentToAdd, ...agents]);
    setIsAddModalOpen(false);
    setNewAgent({ name: '', email: '', role: 'Support Agent' });
    notification.success(`Agent ${newAgent.name} has been added.`);
  };

  const handleToggleStatus = (id) => {
    setAgents(agents.map(a => 
      a.id === id ? { ...a, status: a.status === 'Active' ? 'Inactive' : 'Active' } : a
    ));
    notification.info('Agent status updated.');
    setActiveMenu(null);
  };

  const handleDeleteAgent = (id) => {
    setAgents(agents.filter(a => a.id !== id));
    notification.success('Agent removed from team.');
    setActiveMenu(null);
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const controlsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  };

  const tableCardStyle = {
    overflow: 'hidden',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  };

  const thStyle = {
    padding: '16px 24px',
    borderBottom: '1px solid var(--border)',
    color: 'var(--text)',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const tdStyle = {
    padding: '16px 24px',
    borderBottom: '1px solid var(--border)',
    verticalAlign: 'middle',
  };

  const perfBarStyle = () => ({
    height: '6px',
    width: '100px',
    backgroundColor: 'var(--bg)',
    borderRadius: '3px',
    position: 'relative',
    overflow: 'hidden',
  });

  const perfBarInnerStyle = (val) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: `${val}%`,
    backgroundColor: val > 90 ? 'var(--success)' : val > 80 ? 'var(--accent)' : 'var(--warning)',
    borderRadius: '3px',
  });

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={{ color: 'var(--text-bright)', fontSize: '24px', fontWeight: '700' }}>Agent Management</h1>
          <p style={{ color: 'var(--text)', fontSize: '14px' }}>Manage and monitor your support team's performance.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="outline" icon={Download} onClick={() => notification.info('Exporting agent data...')}>Export</Button>
          <Button variant="primary" icon={UserPlus} onClick={() => setIsAddModalOpen(true)}>Add Agent</Button>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={controlsStyle}>
          <div style={{ flex: 1, maxWidth: '400px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text)' }} />
              <input 
                placeholder="Search agents by name or email..." 
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
            {['All', 'Active', 'Inactive'].map((f) => (
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

      <div className="glass-card" style={tableCardStyle}>
        {filteredAgents.length > 0 ? (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Agent</th>
                <th style={thStyle}>Role</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Performance</th>
                <th style={thStyle}></th>
              </tr>
            </thead>
            <tbody>
              {filteredAgents.map((agent) => (
                <tr 
                  key={agent.id} 
                  style={{ transition: 'background-color 0.2s', cursor: 'pointer' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-hover)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  onClick={() => console.log('View agent details', agent.name)}
                >
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Avatar name={agent.name} size="medium" />
                      <div>
                        <div style={{ color: 'var(--text-bright)', fontSize: '14px', fontWeight: '600' }}>{agent.name}</div>
                        <div style={{ color: 'var(--text)', fontSize: '12px' }}>{agent.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text)', fontSize: '14px' }}>
                      <Shield size={14} style={{ color: agent.role.includes('Senior') ? 'var(--accent)' : 'inherit' }} />
                      {agent.role}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <Badge variant={agent.status === 'Active' ? 'success' : 'secondary'}>
                      {agent.status}
                    </Badge>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={perfBarStyle()}>
                        <div style={perfBarInnerStyle(agent.performance)}></div>
                      </div>
                      <span style={{ fontSize: '13px', color: 'var(--text-bright)', fontWeight: '600' }}>{agent.performance}%</span>
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ position: 'relative' }}>
                      <button 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          setActiveMenu(activeMenu === agent.id ? null : agent.id);
                        }}
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          color: 'var(--text)', 
                          cursor: 'pointer',
                          padding: '8px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s',
                          backgroundColor: activeMenu === agent.id ? 'var(--surface-hover)' : 'transparent'
                        }} 
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {activeMenu === agent.id && (
                        <div 
                          ref={menuRef}
                          style={{
                            position: 'absolute',
                            right: '0',
                            top: '40px',
                            width: '180px',
                            backgroundColor: 'var(--surface)',
                            borderRadius: '12px',
                            boxShadow: 'var(--shadow-lg)',
                            border: '1px solid var(--border)',
                            zIndex: 10,
                            padding: '8px',
                            animation: 'fadeIn 0.2s ease-out'
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <style>{`
                            @keyframes fadeIn {
                              from { opacity: 0; transform: translateY(-10px); }
                              to { opacity: 1; transform: translateY(0); }
                            }
                          `}</style>
                          <button 
                            onClick={() => { console.log('Edit agent', agent.name); setActiveMenu(null); }}
                            style={{ width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: '8px', background: 'none', border: 'none', color: 'var(--text-bright)', fontSize: '13px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-hover)'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            Edit Details
                          </button>
                          <button 
                            onClick={() => handleToggleStatus(agent.id)}
                            style={{ width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: '8px', background: 'none', border: 'none', color: agent.status === 'Active' ? 'var(--error)' : 'var(--success)', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-hover)'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            {agent.status === 'Active' ? 'Deactivate Agent' : 'Activate Agent'}
                          </button>
                          <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '4px 0' }}></div>
                          <button 
                            onClick={() => handleDeleteAgent(agent.id)}
                            style={{ width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: '8px', background: 'none', border: 'none', color: 'var(--error)', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-hover)'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            Delete Agent
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: '64px', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--text-bright)', fontSize: '18px', fontWeight: '700' }}>No agents found</h3>
            <p style={{ color: 'var(--text)', fontSize: '14px', marginTop: '8px' }}>Try adjusting your search or status filter.</p>
          </div>
        )}
      </div>

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Add New Agent"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddAgent}>Add Agent</Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Input 
            label="Full Name" 
            placeholder="e.g. John Doe" 
            value={newAgent.name}
            onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
          />
          <Input 
            label="Email Address" 
            placeholder="e.g. john@supportos.com" 
            type="email"
            value={newAgent.email}
            onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
          />
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: 'var(--text-bright)', marginBottom: '8px' }}>Role</label>
            <select 
              value={newAgent.role}
              onChange={(e) => setNewAgent({ ...newAgent, role: e.target.value })}
              style={{ width: '100%', padding: '12px', borderRadius: '10px', backgroundColor: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-bright)', outline: 'none' }}
            >
              <option value="Support Agent">Support Agent</option>
              <option value="Senior Agent">Senior Agent</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AgentManagement;
