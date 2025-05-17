
import React, { useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { TicketStatus } from '@/types/ticket';

interface TicketFiltersProps {
  onFilterChange: (filters: { status?: TicketStatus; location?: string; assignedTo?: string }) => void;
}

const TicketFilters = ({ onFilterChange }: TicketFiltersProps) => {
  const [status, setStatus] = useState<TicketStatus | undefined>(undefined);
  const [location, setLocation] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleStatusChange = (value: string) => {
    const newStatus = value === 'all' ? undefined : value as TicketStatus;
    setStatus(newStatus);
    onFilterChange({ status: newStatus, location, assignedTo });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    onFilterChange({ status, location: e.target.value, assignedTo });
  };

  const handleAssignedToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssignedTo(e.target.value);
    onFilterChange({ status, location, assignedTo: e.target.value });
  };

  const clearFilters = () => {
    setStatus(undefined);
    setLocation('');
    setAssignedTo('');
    onFilterChange({});
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="font-medium">Filters</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm">Status</label>
          <Select value={status || 'all'} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm">Location</label>
          <Input 
            placeholder="Filter by location" 
            value={location}
            onChange={handleLocationChange}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm">Assigned To</label>
          <Input 
            placeholder="Filter by staff member" 
            value={assignedTo}
            onChange={handleAssignedToChange}
          />
        </div>
      </div>
      
      {(status !== undefined || location || assignedTo) && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="flex items-center">
          <X className="mr-1 h-4 w-4" />
          Clear Filters
        </Button>
      )}
    </div>
  );
};

export default TicketFilters;
