import React, { useState } from 'react';
import { UserPlus, Search, MoreHorizontal, Shield, Mail, Filter, Download } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';

const AgentManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const agents = [
    { id: 1, name: 'Alice Johnson', email: 'alice@supportos.com', role: 'Senior Agent', status: 'Active', performance: 94 },
    { id: 2, name: 'Bob Wilson', email: 'bob@supportos.com', role: 'Support Agent', status: 'Active', performance: 88 },
    { id: 3, name: 'Charlie Davis', email: 'charlie@supportos.com', role: 'Support Agent', status: 'Inactive', performance: 72 },
    { id: 4, name: 'Diana Prince', email: 'diana@supportos.com', role: 'Support Agent', status: 'Active', performance: 91 },
    { id: 5, name: 'Ethan Hunt', email: 'ethan@supportos.com', role: 'Senior Agent', status: 'Active', performance: 96 },
  ];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          agent.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || agent.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

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
          <Button variant="outline" icon={Download} onClick={() => console.log('Export agent list')}>Export</Button>
          <Button variant="primary" icon={UserPlus} onClick={() => console.log('Add new agent')}>Add Agent</Button>
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
                    <button 
                      onClick={(e) => { e.stopPropagation(); console.log('Agent options', agent.name); }}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: 'var(--text)', 
                        cursor: 'pointer',
                        padding: '8px',
                        borderRadius: '8px'
                      }} 
                    >
                      <MoreHorizontal size={18} />
                    </button>
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
    </div>
  );
};

export default AgentManagement;
