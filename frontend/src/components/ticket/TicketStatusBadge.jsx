import React from 'react';
import Badge from '../common/Badge';

const TicketStatusBadge = ({ status }) => {
  const getVariant = (s) => {
    switch (s?.toLowerCase()) {
      case 'open': return 'primary';
      case 'pending': return 'warning';
      case 'resolved': return 'success';
      case 'closed': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <Badge variant={getVariant(status)}>
      {status?.toUpperCase() || 'UNKNOWN'}
    </Badge>
  );
};

export default TicketStatusBadge;
