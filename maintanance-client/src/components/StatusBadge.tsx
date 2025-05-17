
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { TicketStatus } from '@/types/ticket';

interface StatusBadgeProps {
  status: TicketStatus;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusClass = () => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'in-progress':
        return 'status-in-progress';
      case 'resolved':
        return 'status-resolved';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'in-progress':
        return 'In Progress';
      case 'resolved':
        return 'Resolved';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <Badge className={cn(getStatusClass(), 'font-medium', className)}>
      {getStatusLabel()}
    </Badge>
  );
};

export default StatusBadge;
