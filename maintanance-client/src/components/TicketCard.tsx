
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket } from '@/types/ticket';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface TicketCardProps {
  ticket: Ticket;
}

const TicketCard = ({ ticket }: TicketCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMM dd, yyyy • h:mm a');
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{ticket.title}</CardTitle>
          <div className="flex gap-2">
            <PriorityBadge priority={ticket.priority} />
          </div>
        </div>
        <div className="text-sm text-muted-foreground flex items-center gap-1">
          <span>{ticket.id}</span>
          <span className="mx-1">•</span>
          <StatusBadge status={ticket.status} />
        </div>
      </CardHeader>
      <CardContent className="pt-2 pb-4">
        <div className="mb-4 text-sm line-clamp-2">
          {ticket.description}
        </div>
        <div className="space-y-2">
          <div className="flex items-center text-xs text-muted-foreground">
            <MapPin className="w-3 h-3 mr-1" />
            {ticket.location}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="w-3 h-3 mr-1" />
            {formatDate(ticket.updatedAt)}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <User className="w-3 h-3 mr-1" />
            {ticket.assignedTo || 'Unassigned'}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild className="w-full" variant="outline">
          <Link to={`/tickets/${ticket.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TicketCard;
