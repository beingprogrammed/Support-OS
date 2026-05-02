import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import TicketCard from '../../components/ticket/TicketCard';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const TicketQueue = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tickets = [
    { id: 'TC-1024', subject: 'Server connection issues in EMEA', customer: { name: 'Sarah Connor' }, status: 'Open', priority: 'High', lastUpdate: '12m ago', messageCount: 4, attachmentCount: 1 },
    { id: 'TC-1025', subject: 'Password reset not working', customer: { name: 'John Smith' }, status: 'Pending', priority: 'Medium', lastUpdate: '45m ago', messageCount: 2, attachmentCount: 0 },
    { id: 'TC-1026', subject: 'New feature request: API access', customer: { name: 'Maria Garcia' }, status: 'Open', priority: 'Low', lastUpdate: '1h ago', messageCount: 1, attachmentCount: 0 },
    { id: 'TC-1027', subject: 'Billing error on invoice #992', customer: { name: 'Kyle Reese' }, status: 'Open', priority: 'Urgent', lastUpdate: '2h ago', messageCount: 8, attachmentCount: 2 },
    { id: 'TC-1028', subject: 'Account deactivation request', customer: { name: 'Sarah Connor' }, status: 'Resolved', priority: 'Medium', lastUpdate: '1d ago', messageCount: 5, attachmentCount: 0 },
  ];

  const filteredTickets = tickets.filter(t => {
    const matchesStatus = statusFilter === 'all' || t.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesPriority = priorityFilter === 'all' || t.priority.toLowerCase() === priorityFilter.toLowerCase();
    const matchesSearch = t.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesSearch;
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
    marginBottom: '8px',
  };

  const filterBarStyle = {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
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
  });

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-bright)', marginBottom: '4px' }}>Ticket Queue</h2>
          <p style={{ color: 'var(--text)', fontSize: '14px' }}>Manage and respond to incoming support requests.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="outline" icon={ArrowUpDown}>Sort</Button>
          <Button variant="primary">New Ticket</Button>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ flexGrow: 1 }}>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text)' }} />
              <input 
                placeholder="Search by ID, subject, or customer..." 
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)' }}>Priority:</span>
            <select 
              value={priorityFilter} 
              onChange={(e) => setPriorityFilter(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg)',
                color: 'var(--text-bright)',
                fontSize: '13px',
                outline: 'none'
              }}
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <div style={filterBarStyle}>
          {['All', 'Open', 'Pending', 'Resolved'].map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f.toLowerCase())}
              style={activeTabStyle(statusFilter === f.toLowerCase())}
            >
              {f}
            </button>
          ))}
          <div style={{ marginLeft: 'auto', fontSize: '13px', color: 'var(--text)' }}>
            Showing <strong>{filteredTickets.length}</strong> tickets
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <TicketCard 
              key={ticket.id} 
              ticket={ticket} 
              onClick={() => navigate(`/agent/ticket/${ticket.id}`)} 
            />
          ))
        ) : (
          <div style={{ padding: '64px', textAlign: 'center' }}>
            <div style={{ marginBottom: '16px', color: 'var(--text)', opacity: 0.5 }}>
              <Filter size={48} style={{ margin: '0 auto' }} />
            </div>
            <h3 style={{ color: 'var(--text-bright)', fontSize: '18px', fontWeight: '700' }}>No tickets found</h3>
            <p style={{ color: 'var(--text)', fontSize: '14px', marginTop: '8px' }}>Try adjusting your filters or search query.</p>
            <Button variant="ghost" style={{ marginTop: '20px' }} onClick={() => { setStatusFilter('all'); setPriorityFilter('all'); setSearchQuery(''); }}>
              Reset All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketQueue;
