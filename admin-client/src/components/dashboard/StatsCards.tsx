import React, { useEffect, useState } from 'react';
import { Users, Calendar, ClipboardList } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from 'axios';

const StatsCards = () => {
  const [stats, setStats] = useState([
    { title: "Total Users", value: "Loading...", icon: Users, color: "bg-blue-100 text-blue-700" },
    { title: "Total Tickets", value: "Loading...", icon: ClipboardList, color: "bg-amber-100 text-amber-700" },
    { title: "Pending Bookings", value: "Loading...", icon: Calendar, color: "bg-green-100 text-green-700" },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, ticketsRes, bookingsRes] = await Promise.all([
          axios.get("http://localhost:3000/api/users"),              // Get all users
          axios.get("http://localhost:3000/api/tickets"),            // Get all tickets
          axios.get("http://localhost:3000/api/booking"),            
        ]);

        const totalUsers = usersRes.data.length;
        const pendingTickets = ticketsRes.data.length;
        const pendingBookings = bookingsRes.data.filter((b: any) => b.status === "pending").length;

        setStats([
          {
            title: "Total Users",
            value: totalUsers.toString(),
            icon: Users,
            color: "bg-blue-100 text-blue-700",
          },
          // {
          //   title: "Total Tickets",
          //   value: pendingTickets.toString(),
          //   icon: ClipboardList,
          //   color: "bg-amber-100 text-amber-700",
          // },
          {
            title: "Pending Bookings",
            value: pendingBookings.toString(),
            icon: Calendar,
            color: "bg-green-100 text-green-700",
          },
        ]);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {stats.map((stat, index) => (
        <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-full ${stat.color}`}>
              <stat.icon size={18} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
