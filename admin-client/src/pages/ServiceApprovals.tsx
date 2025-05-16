
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Search, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Request {
  id: string;
  type: 'room' | 'maintenance';
  title: string;
  requester: string;
  department: string;
  dateSubmitted: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'approved' | 'rejected';
}

const ServiceApprovals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  const [requests, setRequests] = useState<Request[]>([
    {
      id: "REQ-001",
      type: "room",
      title: "Conference Room A Booking",
      requester: "John Smith",
      department: "Administration",
      dateSubmitted: "2023-05-15",
      priority: "medium",
      status: "pending"
    },
    {
      id: "REQ-002",
      type: "maintenance",
      title: "Projector Repair - Room 205",
      requester: "Sarah Johnson",
      department: "Faculty",
      dateSubmitted: "2023-05-14",
      priority: "high",
      status: "pending"
    },
    {
      id: "REQ-003",
      type: "room",
      title: "Auditorium Booking for Seminar",
      requester: "David Wilson",
      department: "Science",
      dateSubmitted: "2023-05-13",
      priority: "high",
      status: "approved"
    },
    {
      id: "REQ-004",
      type: "maintenance",
      title: "AC Repair - Computer Lab",
      requester: "Emily Davis",
      department: "IT",
      dateSubmitted: "2023-05-12",
      priority: "medium",
      status: "pending"
    },
    {
      id: "REQ-005",
      type: "room",
      title: "Study Room Booking",
      requester: "Michael Brown",
      department: "Student Affairs",
      dateSubmitted: "2023-05-11",
      priority: "low",
      status: "rejected"
    },
  ]);

  const approveRequest = (id: string) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: 'approved' } : request
    ));
    
    toast({
      title: "Request Approved",
      description: `Request ${id} has been approved successfully.`,
    });
  };
  
  const rejectRequest = (id: string) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: 'rejected' } : request
    ));
    
    toast({
      title: "Request Rejected",
      description: `Request ${id} has been rejected.`,
      variant: "destructive",
    });
  };

  const filteredRequests = requests.filter(request => 
    request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.requester.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingRequests = filteredRequests.filter(r => r.status === 'pending');
  const approvedRequests = filteredRequests.filter(r => r.status === 'approved');
  const rejectedRequests = filteredRequests.filter(r => r.status === 'rejected');

  const RequestTable = ({ data }: { data: Request[] }) => (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Request</TableHead>
            <TableHead>Requester</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map(request => (
              <TableRow key={request.id}>
                <TableCell className="font-mono">{request.id}</TableCell>
                <TableCell className="font-medium">
                  {request.title}
                  <Badge className="ml-2" variant="outline">
                    {request.type === 'room' ? 'Room' : 'Maintenance'}
                  </Badge>
                </TableCell>
                <TableCell>{request.requester}</TableCell>
                <TableCell>{request.department}</TableCell>
                <TableCell>{request.dateSubmitted}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={
                      request.priority === 'high' ? 'border-red-500 text-red-500' :
                      request.priority === 'medium' ? 'border-yellow-500 text-yellow-500' :
                      'border-green-500 text-green-500'
                    }
                  >
                    {request.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      request.status === 'pending' ? 'outline' :
                      request.status === 'approved' ? 'default' : 'secondary'
                    }
                    className={
                      request.status === 'rejected' ? 'bg-red-100 text-red-800 hover:bg-red-100' : ''
                    }
                  >
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {request.status === 'pending' && (
                    <>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => approveRequest(request.id)}
                        className="text-green-600"
                      >
                        <CheckCircle size={18} className="mr-1" />
                        Approve
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => rejectRequest(request.id)}
                        className="text-red-600"
                      >
                        <XCircle size={18} className="mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                  {request.status !== 'pending' && (
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                No requests found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar size={28} className="text-campus-blue" />
          <h1 className="text-2xl font-bold text-campus-blue">Service Approvals</h1>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6 max-w-md">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="room">Room booking</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">
            Pending
            {pendingRequests.length > 0 && (
              <Badge variant="outline" className="ml-2 bg-amber-50">
                {pendingRequests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved
            {approvedRequests.length > 0 && (
              <Badge variant="outline" className="ml-2">
                {approvedRequests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected
            {rejectedRequests.length > 0 && (
              <Badge variant="outline" className="ml-2">
                {rejectedRequests.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <RequestTable data={pendingRequests} />
        </TabsContent>
        
        <TabsContent value="approved" className="mt-6">
          <RequestTable data={approvedRequests} />
        </TabsContent>
        
        <TabsContent value="rejected" className="mt-6">
          <RequestTable data={rejectedRequests} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServiceApprovals;
