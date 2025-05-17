
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { TicketPriority } from '@/types/ticket';

interface PriorityBadgeProps {
  priority: TicketPriority;
  className?: string;
}

const PriorityBadge = ({ priority, className }: PriorityBadgeProps) => {
  const getPriorityClass = () => {
    switch (priority) {
      case 'low':
        return 'priority-low';
      case 'medium':
        return 'priority-medium';
      case 'high':
        return 'priority-high';
      default:
        return '';
    }
  };

  const getPriorityLabel = () => {
    switch (priority) {
      case 'low':
        return 'Low';
      case 'medium':
        return 'Medium';
      case 'high':
        return 'High';
      default:
        return priority;
    }
  };

  return (
    <Badge variant="outline" className={cn(getPriorityClass(), 'font-medium', className)}>
      {getPriorityLabel()}
    </Badge>
  );
};

export default PriorityBadge;
