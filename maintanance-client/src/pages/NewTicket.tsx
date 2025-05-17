
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import TicketForm from '@/components/TicketForm';
import { useTickets } from '@/services/ticketService';
import { Ticket } from '@/types/ticket';
import { useToast } from '@/components/ui/use-toast';

const NewTicket = () => {
  const navigate = useNavigate();
  const { createTicket } = useTickets();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (ticketData: Partial<Ticket>) => {
    setIsSubmitting(true);
    try {
      // Assuming createTicket expects a ticket without id, createdAt, updatedAt, and notes
      const { id, createdAt, updatedAt, notes, ...rest } = ticketData as Ticket;
      const newTicket = createTicket(rest);
      
      toast({
        title: "Ticket created",
        description: `Ticket ${newTicket.id} has been created successfully.`
      });
      
      // Navigate to the new ticket details
      navigate(`/tickets/${newTicket.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem creating the ticket.",
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
        <h1 className="text-3xl font-bold tracking-tight">New Ticket</h1>
      </div>
      
      <TicketForm onSubmit={handleSubmit} isLoading={isSubmitting} />
    </div>
  );
};

export default NewTicket;
