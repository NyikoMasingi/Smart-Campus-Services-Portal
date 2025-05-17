
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useTickets } from '@/services/ticketService';
import TicketCard from '@/components/TicketCard';
import TicketFilters from '@/components/TicketFilters';
import { TicketStatus } from '@/types/ticket';

const TicketsList = () => {
  const { getTickets } = useTickets();
  const [filters, setFilters] = useState<{
    status?: TicketStatus;
    location?: string;
    assignedTo?: string;
  }>({});
  
  const tickets = getTickets(filters);

  const handleFilterChange = (newFilters: {
    status?: TicketStatus;
    location?: string;
    assignedTo?: string;
  }) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tickets</h1>
          <p className="text-muted-foreground">Manage all maintenance requests.</p>
        </div>
        <Button asChild>
          <Link to="/tickets/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Ticket
          </Link>
        </Button>
      </div>

      <TicketFilters onFilterChange={handleFilterChange} />

      {tickets.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="font-semibold text-lg mb-2">No tickets found</h3>
          <p className="text-muted-foreground mb-4">
            {Object.keys(filters).length > 0 
              ? "Try adjusting your filters to find what you're looking for."
              : "There are no tickets in the system yet."}
          </p>
          {Object.keys(filters).length === 0 && (
            <Button asChild>
              <Link to="/tickets/new">Create your first ticket</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default TicketsList;
