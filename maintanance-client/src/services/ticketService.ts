
import { useState } from 'react';
import { Ticket, TicketStatus, Note } from '../types/ticket';

// Mock data for tickets
const initialTickets: Ticket[] = [
  {
    id: 'T-101',
    title: 'AC Not Working',
    description: 'The air conditioning unit is making unusual noises and not cooling properly.',
    location: 'Dorm-A Room 203',
    status: 'pending',
    priority: 'high',
    createdAt: '2025-05-10T08:30:00Z',
    updatedAt: '2025-05-10T08:30:00Z',
    assignedTo: '',
    reportedBy: 'John Student',
    notes: []
  },
  {
    id: 'T-102',
    title: 'Smart Board Offline',
    description: 'The smart board in Lab-3 is not turning on or connecting to the network.',
    location: 'Lab-3',
    status: 'in-progress',
    priority: 'high',
    createdAt: '2025-05-09T14:15:00Z',
    updatedAt: '2025-05-10T09:45:00Z',
    assignedTo: 'Mike Technician',
    reportedBy: 'Professor Smith',
    notes: [
      {
        id: 'N1',
        text: 'Checked power supply, waiting for replacement parts',
        createdBy: 'Mike Technician',
        createdAt: '2025-05-10T09:45:00Z'
      }
    ]
  },
  {
    id: 'T-103',
    title: 'Light Fixture Broken',
    description: 'The main light fixture in the conference room is flickering and needs replacement.',
    location: 'Admin Building - Conference Room A',
    status: 'resolved',
    priority: 'medium',
    createdAt: '2025-05-08T11:20:00Z',
    updatedAt: '2025-05-09T13:30:00Z',
    assignedTo: 'Sarah Electrician',
    reportedBy: 'Admin Staff',
    notes: [
      {
        id: 'N2',
        text: 'Ordered replacement parts',
        createdBy: 'Sarah Electrician',
        createdAt: '2025-05-08T15:45:00Z'
      },
      {
        id: 'N3',
        text: 'Replaced light fixture and tested functionality',
        createdBy: 'Sarah Electrician',
        createdAt: '2025-05-09T13:30:00Z'
      }
    ]
  },
  {
    id: 'T-104',
    title: 'Water Fountain Leaking',
    description: 'The water fountain on the first floor is leaking and creating a puddle.',
    location: 'Library - 1st Floor',
    status: 'in-progress',
    priority: 'medium',
    createdAt: '2025-05-10T10:00:00Z',
    updatedAt: '2025-05-10T11:30:00Z',
    assignedTo: 'Bob Plumber',
    reportedBy: 'Librarian',
    notes: [
      {
        id: 'N4',
        text: 'Initial assessment complete, needs new valve',
        createdBy: 'Bob Plumber',
        createdAt: '2025-05-10T11:30:00Z'
      }
    ]
  },
  {
    id: 'T-105',
    title: 'Door Lock Jammed',
    description: 'The electronic door lock to the computer lab is not working properly.',
    location: 'Science Building - Room 105',
    status: 'pending',
    priority: 'medium',
    createdAt: '2025-05-10T09:15:00Z',
    updatedAt: '2025-05-10T09:15:00Z',
    assignedTo: '',
    reportedBy: 'Professor Johnson',
    notes: []
  }
];

// Staff members mock data
export const staffMembers = [
  { id: 'S1', name: 'Mike Technician', role: 'IT Technician', department: 'IT' },
  { id: 'S2', name: 'Sarah Electrician', role: 'Electrician', department: 'Facilities' },
  { id: 'S3', name: 'Bob Plumber', role: 'Plumber', department: 'Facilities' },
  { id: 'S4', name: 'Jane Engineer', role: 'HVAC Engineer', department: 'Facilities' },
  { id: 'S5', name: 'Mark Security', role: 'Security Officer', department: 'Security' }
];

// Locations mock data
export const locations = [
  { id: 'L1', name: 'Dorm-A Room 203', building: 'Dorm-A', floor: '2', roomNumber: '203' },
  { id: 'L2', name: 'Lab-3', building: 'Science Building', floor: '1', roomNumber: '3' },
  { id: 'L3', name: 'Admin Building - Conference Room A', building: 'Admin Building', floor: '2', roomNumber: 'A' },
  { id: 'L4', name: 'Library - 1st Floor', building: 'Library', floor: '1', roomNumber: '' },
  { id: 'L5', name: 'Science Building - Room 105', building: 'Science Building', floor: '1', roomNumber: '105' }
];

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);

  const getTickets = (filters?: { status?: TicketStatus; location?: string; assignedTo?: string }) => {
    let filteredTickets = [...tickets];

    if (filters) {
      if (filters.status) {
        filteredTickets = filteredTickets.filter(ticket => ticket.status === filters.status);
      }
      
      if (filters.location) {
        filteredTickets = filteredTickets.filter(ticket => 
          ticket.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
      
      if (filters.assignedTo) {
        filteredTickets = filteredTickets.filter(ticket => 
          ticket.assignedTo.toLowerCase().includes(filters.assignedTo!.toLowerCase())
        );
      }
    }

    return filteredTickets;
  };

  const getTicketById = (id: string) => {
    return tickets.find(ticket => ticket.id === id);
  };

  const updateTicket = (id: string, updates: Partial<Ticket>) => {
    setTickets(prevTickets => 
      prevTickets.map(ticket => 
        ticket.id === id 
          ? { 
              ...ticket, 
              ...updates, 
              updatedAt: new Date().toISOString() 
            } 
          : ticket
      )
    );
  };

  const addNote = (ticketId: string, noteText: string, createdBy: string) => {
    const newNote: Note = {
      id: `N${Math.floor(Math.random() * 10000)}`,
      text: noteText,
      createdBy,
      createdAt: new Date().toISOString()
    };

    setTickets(prevTickets => 
      prevTickets.map(ticket => 
        ticket.id === ticketId 
          ? { 
              ...ticket, 
              notes: [...ticket.notes, newNote],
              updatedAt: new Date().toISOString() 
            } 
          : ticket
      )
    );
  };

  const createTicket = (newTicket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'notes'>) => {
    const ticketToAdd: Ticket = {
      ...newTicket,
      id: `T-${Math.floor(Math.random() * 10000)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: []
    };

    setTickets(prevTickets => [...prevTickets, ticketToAdd]);
    return ticketToAdd;
  };

  return {
    tickets,
    getTickets,
    getTicketById,
    updateTicket,
    addNote,
    createTicket
  };
};
