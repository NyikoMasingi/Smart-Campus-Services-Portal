
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, PieChart, LineChart, XAxis, YAxis, Tooltip, Bar, Pie, Line, Cell, ResponsiveContainer, Legend } from 'recharts';
import { useTickets } from '@/services/ticketService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Reports = () => {
  const { getTickets } = useTickets();
  const allTickets = getTickets();

  // Status data
  const statusData = [
    { name: 'Pending', value: getTickets({ status: 'pending' }).length },
    { name: 'In Progress', value: getTickets({ status: 'in-progress' }).length },
    { name: 'Resolved', value: getTickets({ status: 'resolved' }).length },
    { name: 'Cancelled', value: getTickets({ status: 'cancelled' }).length },
  ];

  // Priority data
  const priorityData = [
    { name: 'Low', value: allTickets.filter(t => t.priority === 'low').length },
    { name: 'Medium', value: allTickets.filter(t => t.priority === 'medium').length },
    { name: 'High', value: allTickets.filter(t => t.priority === 'high').length },
  ];

  // Generate random trend data for the past 14 days
  const today = new Date();
  const trendData = [];
  for (let i = 13; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    trendData.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      'New': Math.floor(Math.random() * 5),
      'Resolved': Math.floor(Math.random() * 4),
    });
  }

  // Resolution time data
  const resolutionData = [
    { name: '<4h', value: Math.floor(Math.random() * 10) + 5 },
    { name: '4-8h', value: Math.floor(Math.random() * 15) + 10 },
    { name: '8-24h', value: Math.floor(Math.random() * 8) + 3 },
    { name: '1-3d', value: Math.floor(Math.random() * 6) + 2 },
    { name: '>3d', value: Math.floor(Math.random() * 3) + 1 },
  ];

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const PRIORITY_COLORS = ['#4299E1', '#F6AD55', '#F56565'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">Analytics and statistics for maintenance tickets.</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tickets by Status</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tickets by Priority</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={priorityData}>
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" name="Count">
                      {priorityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PRIORITY_COLORS[index % PRIORITY_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Trends (Last 14 Days)</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={trendData}>
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="New" stroke="#0088FE" strokeWidth={2} />
                  <Line type="monotone" dataKey="Resolved" stroke="#00C49F" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Resolution Time</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={resolutionData}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Tickets" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
