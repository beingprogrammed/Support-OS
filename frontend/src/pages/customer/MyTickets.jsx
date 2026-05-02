import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, ChevronRight, Clock, Tag } from 'lucide-react';
import TicketStatusBadge from '../../components/ticket/TicketStatusBadge';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import useNotification from '../../hooks/useNotification';

const MyTickets = () => {
  const navigate = useNavigate();
  const notification = useNotification();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const tickets = [
    {
      id: 'TC-1024',
      subject: 'Unable to access dashboard',
      status: 'Open',
      priority: 'High',
      updatedAt: '12 mins ago',
      category: 'Technical Support',
      agent: { name: 'Sarah Wilson' }
    },
    {
      id: 'TC-1025',
      subject: 'Billing inquiry - invoice #882',
      status: 'Pending',
      priority: 'Medium',
      updatedAt: '2 hours ago',
      category: 'Billing',
      agent: { name: 'Sarah Wilson' }
    },
    {
      id: 'TC-1026',
      subject: 'Feature request: Dark mode export',
      status: 'Resolved',
      priority: 'Low',
      updatedAt: '1 day ago',
      category: 'Feature Request',
      agent: null
    }
  ];

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

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
    outline: 'none'
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-bright)', marginBottom: '4px' }}>My Tickets</h2>
          <p style={{ color: 'var(--text)', fontSize: '15px' }}>Track the status of your active support requests.</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={() => navigate('/customer/new-ticket')}>
          New Ticket
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ flexGrow: 1, position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text)' }} />
            <input
              type="text"
              placeholder="Search tickets..."
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
          <div style={{ display: 'flex', gap: '8px' }}>
            {['All', 'Open', 'Pending', 'Resolved'].map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f.toLowerCase())}
                style={activeTabStyle(statusFilter === f.toLowerCase())}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tickets Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '24px' }}>
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <div 
              key={ticket.id} 
              className="glass-card" 
              style={{ padding: '24px', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
              onClick={() => {
                notification.info(`Opening ticket ${ticket.id}`);
                navigate('/customer/chat');
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--accent)' }}>{ticket.id}</span>
                  <TicketStatusBadge status={ticket.status} />
                </div>
                <Badge variant={ticket.priority === 'High' ? 'error' : 'outline'}>{ticket.priority}</Badge>
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-bright)', marginBottom: '12px' }}>{ticket.subject}</h3>
              
              <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text)' }}>
                  <Tag size={14} /> {ticket.category}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text)' }}>
                  <Clock size={14} /> {ticket.updatedAt}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {ticket.agent ? (
                    <>
                      <Avatar name={ticket.agent.name} size="small" />
                      <span style={{ fontSize: '13px', color: 'var(--text)' }}>Assigned to <span style={{ color: 'var(--text-bright)', fontWeight: '600' }}>{ticket.agent.name}</span></span>
                    </>
                  ) : (
                    <span style={{ fontSize: '13px', color: 'var(--text)', fontStyle: 'italic' }}>Awaiting assignment</span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent)', fontWeight: '700', fontSize: '14px' }}>
                  View <ChevronRight size={16} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', padding: '64px', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--text-bright)', fontSize: '18px', fontWeight: '700' }}>No tickets found</h3>
            <p style={{ color: 'var(--text)', fontSize: '14px', marginTop: '8px' }}>Adjust your filters or start a new ticket.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;
