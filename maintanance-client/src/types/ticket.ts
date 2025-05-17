
export type TicketStatus = 'pending' | 'in-progress' | 'resolved' | 'cancelled';
export type TicketPriority = 'low' | 'medium' | 'high';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  location: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
  assignedTo: string;
  reportedBy: string;
  notes: Note[];
}

export interface Note {
  id: string;
  text: string;
  createdBy: string;
  createdAt: string;
}

export type StaffMember = {
  id: string;
  name: string;
  role: string;
  department: string;
}

export type Location = {
  id: string;
  name: string;
  building: string;
  floor: string;
  roomNumber: string;
}
