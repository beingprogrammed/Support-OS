import React, { createContext, useContext, useState, useCallback } from 'react';

const TicketContext = createContext(null);

const initialTickets = [
    {
        id: 'TC-1024',
        subject: 'Unable to access dashboard',
        status: 'Open',
        priority: 'High',
        updatedAt: '12 mins ago',
        category: 'Technical Support',
        description: '',
        agent: { name: 'Sarah Wilson' },
    },
    {
        id: 'TC-1025',
        subject: 'Billing inquiry - invoice #882',
        status: 'Pending',
        priority: 'Medium',
        updatedAt: '2 hours ago',
        category: 'Billing',
        description: '',
        agent: { name: 'Sarah Wilson' },
    },
    {
        id: 'TC-1026',
        subject: 'Feature request: Dark mode export',
        status: 'Resolved',
        priority: 'Low',
        updatedAt: '1 day ago',
        category: 'Feature Request',
        description: '',
        agent: null,
    },
];

let nextTicketNumber = 1027;

const categoryMap = {
    technical: 'Technical Support',
    billing: 'Billing',
    account: 'Account Access',
    feature: 'Feature Request',
};

export const TicketProvider = ({ children }) => {
    const [tickets, setTickets] = useState(initialTickets);

    const addTicket = useCallback((formData) => {
        const newTicket = {
            id: `TC-${nextTicketNumber++}`,
            subject: formData.subject,
            status: 'Open',
            priority: formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1),
            updatedAt: 'Just now',
            category: categoryMap[formData.category] || formData.category,
            description: formData.description,
            agent: null,
        };
        setTickets(prev => [newTicket, ...prev]);
        return newTicket;
    }, []);

    const updateTicketStatus = useCallback((ticketId, newStatus) => {
        setTickets(prev =>
            prev.map(t => t.id === ticketId ? { ...t, status: newStatus } : t)
        );
    }, []);

    return (
        <TicketContext.Provider value={{ tickets, addTicket, updateTicketStatus }}>
            {children}
        </TicketContext.Provider>
    );
};

export const useTicketContext = () => {
    const context = useContext(TicketContext);
    if (!context) {
        throw new Error('useTicketContext must be used within a TicketProvider');
    }
    return context;
};

export default TicketContext;
