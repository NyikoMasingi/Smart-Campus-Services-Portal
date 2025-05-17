import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Search, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Request {
  _id: string;
  type: 'room' | 'maintenance';
  purpose: string;
  requesterName: string;
  buildingName: string;
  dateSubmitted: string;
  startTime: string;
  endTime: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'approved' | 'rejected';
}

const ServiceApprovals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
const [isModalOpen, setIsModalOpen] = useState(false);

const openModal = (request: Request) => {
  setSelectedRequest(request);
  setIsModalOpen(true);
};

const closeModal = () => {
  setSelectedRequest(null);
  setIsModalOpen(false);
};

  // Fetch requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/booking');
        const data = response.data.map((item: any) => ({
          _id: item._id,
          type: 'room',
          purpose: item.purpose,
          requesterName: item.requesterName,
          buildingName: item.buildingName,
          dateSubmitted: new Date(item.createdAt).toLocaleDateString(),
          startTime: new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          endTime: new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          priority:
            item.status === 'approved' ? 'high' :
            item.status === 'pending' ? 'medium' : 'low',
          status: item.status
        }));
        setRequests(data);
      } catch (err) {
        setError("Failed to fetch requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const approveRequest = async (id: string) => {
    try {
      await axios.patch(`http://localhost:3000/api/booking/${id}/status`, { status: 'approved' });
      setRequests(prev =>
        prev.map(r => r._id === id ? { ...r, status: 'approved', priority: 'high' } : r)
      );
      toast({
        title: "Request Approved",
        description: `Request has been approved successfully.`,
      });
    } catch {
      toast({
        title: "Error",
        description: "There was an error approving the request.",
        variant: "destructive",
      });
    }
  };

  const rejectRequest = async (id: string) => {
    try {
      await axios.patch(`http://localhost:3000/api/booking/${id}/status`, { status: 'rejected' });
      setRequests(prev =>
        prev.map(r => r._id === id ? { ...r, status: 'rejected', priority: 'low' } : r)
      );
      toast({
        title: "Request Rejected",
        description: `Request has been rejected.`,
        variant: "destructive",
      });
    } catch {
      toast({
        title: "Error",
        description: "There was an error rejecting the request.",
        variant: "destructive",
      });
    }
  };

  const filteredRequests = requests.filter((request) =>
    request.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.buildingName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingRequests = filteredRequests.filter((r) => r.status === 'pending');
  const approvedRequests = filteredRequests.filter((r) => r.status === 'approved');
  const rejectedRequests = filteredRequests.filter((r) => r.status === 'rejected');

  const RequestTable = ({ data }: { data: Request[] }) => (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Purpose</TableHead>
            <TableHead>Requester</TableHead>
            <TableHead>Building</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>End</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((request) => (
              <TableRow key={request._id}>
                <TableCell className="font-medium">
                  {request.purpose}
                  <Badge className="ml-2" variant="outline">
                    {request.type === 'room' ? 'Room' : 'Maintenance'}
                  </Badge>
                </TableCell>
                <TableCell>{request.requesterName}</TableCell>
                <TableCell>{request.buildingName}</TableCell>
                <TableCell>{request.startTime}</TableCell>
                <TableCell>{request.endTime}</TableCell>
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
                    className={request.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                  >
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {request.status === 'pending' ? (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => approveRequest(request._id)}
                        className="text-green-600"
                      >
                        <CheckCircle size={18} className="mr-1" />
                        Approve
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => rejectRequest(request._id)}
                        className="text-red-600"
                      >
                        <XCircle size={18} className="mr-1" />
                        Reject
                      </Button>
                    </>
                  ) : (
                    <Button variant="ghost" size="sm" onClick={() => openModal(request)}>
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
      {isModalOpen && selectedRequest && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
      <h2 className="text-xl font-bold text-campus-blue">Request Details</h2>
      <div>
        <strong>Purpose:</strong> {selectedRequest.purpose}
      </div>
      <div>
        <strong>Requester:</strong> {selectedRequest.requesterName}
      </div>
      <div>
        <strong>Building:</strong> {selectedRequest.buildingName}
      </div>
      <div>
        <strong>Date Submitted:</strong> {selectedRequest.dateSubmitted}
      </div>
      <div>
        <strong>Start Time:</strong> {selectedRequest.startTime}
      </div>
      <div>
        <strong>End Time:</strong> {selectedRequest.endTime}
      </div>
      <div>
        <strong>Status:</strong>{" "}
        <Badge variant="outline">{selectedRequest.status}</Badge>
      </div>
      <div className="text-right">
        <Button variant="outline" onClick={closeModal}>
          Close
        </Button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ServiceApprovals;
