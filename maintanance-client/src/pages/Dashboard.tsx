
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatsCard from '@/components/StatsCard';
import { Ticket as TicketIcon, CheckCircle, AlertCircle, Clock, User } from 'lucide-react';
import { useTickets } from '@/services/ticketService';
import { Ticket } from '@/types/ticket';
import TicketCard from '@/components/TicketCard';
import { BarChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { getTickets } = useTickets();
  const allTickets = getTickets();
  
  // Calculate statistics
  const pendingCount = getTickets({ status: 'pending' }).length;
  const inProgressCount = getTickets({ status: 'in-progress' }).length;
  const resolvedCount = getTickets({ status: 'resolved' }).length;
  const highPriorityCount = allTickets.filter(t => t.priority === 'high').length;
  
  // Recent tickets
  const recentTickets = [...allTickets]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);
  
  // Chart data
  const statusData = [
    { name: 'Pending', value: pendingCount },
    { name: 'In Progress', value: inProgressCount },
    { name: 'Resolved', value: resolvedCount }
  ];

  // Get last 5 days for location data
  const today = new Date();
  const locationData = [];
  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    locationData.unshift({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      'Dorm-A': Math.floor(Math.random() * 5),
      'Lab': Math.floor(Math.random() * 4),
      'Admin': Math.floor(Math.random() * 3),
      'Library': Math.floor(Math.random() * 2),
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the Smart Campus Service Portal.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Tickets" 
          value={allTickets.length} 
          icon={<TicketIcon className="w-5 h-5 text-primary" />} 
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard 
          title="Pending" 
          value={pendingCount} 
          icon={<Clock className="w-5 h-5 text-amber-500" />}
        />
        <StatsCard 
          title="In Progress" 
          value={inProgressCount} 
          icon={<User className="w-5 h-5 text-blue-500" />}
        />
        <StatsCard 
          title="Resolved" 
          value={resolvedCount} 
          icon={<CheckCircle className="w-5 h-5 text-green-500" />}
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tickets by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={statusData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tickets by Location (Last 5 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={locationData}>
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="Dorm-A" stackId="a" fill="#4338ca" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Lab" stackId="a" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Admin" stackId="a" fill="#93c5fd" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Library" stackId="a" fill="#bfdbfe" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tickets */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Tickets</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {recentTickets.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </div>

      {/* High Priority Tickets */}
      {highPriorityCount > 0 && (
        <Card className="border-red-200 bg-red-50/50">
          <CardHeader className="pb-3">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <CardTitle className="text-red-700">Attention Needed</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-600">
              There {highPriorityCount === 1 ? 'is' : 'are'} <strong>{highPriorityCount}</strong> high priority ticket{highPriorityCount !== 1 && 's'} that require{highPriorityCount === 1 ? 's' : ''} immediate attention.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
