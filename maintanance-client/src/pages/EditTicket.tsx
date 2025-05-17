
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import TicketForm from '@/components/TicketForm';
import { useTickets } from '@/services/ticketService';
import { Ticket } from '@/types/ticket';
import { useToast } from '@/components/ui/use-toast';

const EditTicket = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTicketById, updateTicket } = useTickets();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const ticket = getTicketById(id || '');

  if (!ticket) {
    return (
      <div className="space-y-4">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Ticket not found</h1>
        </div>
        <p className="text-muted-foreground">The ticket you're trying to edit doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/tickets')}>View All Tickets</Button>
      </div>
    );
  }

  const handleSubmit = (ticketData: Partial<Ticket>) => {
    setIsSubmitting(true);
    try {
      updateTicket(ticket.id, ticketData);
      
      toast({
        title: "Ticket updated",
        description: `Ticket ${ticket.id} has been updated successfully.`
      });
      
      // Navigate back to ticket details
      navigate(`/tickets/${ticket.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem updating the ticket.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Ticket {ticket.id}</h1>
      </div>
      
      <TicketForm
        initialData={ticket}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default EditTicket;
