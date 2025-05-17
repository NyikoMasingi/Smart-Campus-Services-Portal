
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  MapPin, 
  User, 
  Clock, 
  Check, 
  Trash2,
  Edit
} from 'lucide-react';
import { useTickets } from '@/services/ticketService';
import StatusBadge from '@/components/StatusBadge';
import PriorityBadge from '@/components/PriorityBadge';
import NotesSection from '@/components/NotesSection';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';

const TicketDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTicketById, updateTicket, addNote } = useTickets();
  const { toast } = useToast();
  
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
        <p className="text-muted-foreground">The ticket you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/tickets">View All Tickets</Link>
        </Button>
      </div>
    );
  }

  const handleStatusChange = (newStatus: 'pending' | 'in-progress' | 'resolved' | 'cancelled') => {
    updateTicket(ticket.id, { status: newStatus });
    toast({
      title: "Status updated",
      description: `Ticket status changed to ${newStatus === 'in-progress' ? 'In Progress' : newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
    });
  };

  const handleAddNote = (noteText: string) => {
    addNote(ticket.id, noteText, "Support Staff"); // In a real app, we'd get the user's name from auth
    toast({
      title: "Note added",
      description: "Your note has been added successfully",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'PPpp');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
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
          <h1 className="text-3xl font-bold tracking-tight">Ticket {ticket.id}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to={`/tickets/${ticket.id}/edit`}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          {/* Ticket Details */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex gap-2 mb-2">
                    <StatusBadge status={ticket.status} />
                    <PriorityBadge priority={ticket.priority} />
                  </div>
                  <CardTitle className="text-xl">{ticket.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{ticket.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium text-sm">Location</h4>
                    <p className="text-sm text-muted-foreground">{ticket.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium text-sm">Reported By</h4>
                    <p className="text-sm text-muted-foreground">{ticket.reportedBy}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium text-sm">Created</h4>
                    <p className="text-sm text-muted-foreground">{formatDate(ticket.createdAt)}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium text-sm">Last Updated</h4>
                    <p className="text-sm text-muted-foreground">{formatDate(ticket.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <NotesSection 
            notes={ticket.notes} 
            onAddNote={handleAddNote} 
          />
        </div>

        {/* Actions Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Update Status</h4>
                <div className="grid grid-cols-1 gap-2">
                  <Button 
                    variant={ticket.status === 'pending' ? 'default' : 'outline'}
                    className="justify-start"
                    onClick={() => handleStatusChange('pending')}
                    disabled={ticket.status === 'pending'}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Pending
                  </Button>
                  <Button 
                    variant={ticket.status === 'in-progress' ? 'default' : 'outline'}
                    className="justify-start"
                    onClick={() => handleStatusChange('in-progress')}
                    disabled={ticket.status === 'in-progress'}
                  >
                    <User className="w-4 h-4 mr-2" />
                    In Progress
                  </Button>
                  <Button 
                    variant={ticket.status === 'resolved' ? 'default' : 'outline'}
                    className="justify-start"
                    onClick={() => handleStatusChange('resolved')}
                    disabled={ticket.status === 'resolved'}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Resolved
                  </Button>
                  <Button 
                    variant={ticket.status === 'cancelled' ? 'destructive' : 'outline'}
                    className="justify-start"
                    onClick={() => handleStatusChange('cancelled')}
                    disabled={ticket.status === 'cancelled'}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Cancelled
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Assignment</h4>
                <div className="text-sm">
                  {ticket.assignedTo ? (
                    <>
                      <p className="font-medium">Assigned to:</p>
                      <p className="text-muted-foreground">{ticket.assignedTo}</p>
                    </>
                  ) : (
                    <p className="text-muted-foreground">Not assigned</p>
                  )}
                </div>
                <Button variant="outline" asChild className="w-full">
                  <Link to={`/tickets/${ticket.id}/edit`}>
                    Change Assignment
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
