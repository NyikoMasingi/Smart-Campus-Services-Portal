
import React from 'react';
import { 
  Users, 
  Smartphone, 
  Calendar, 
  ShieldCheck, 
  Bell
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StatsCards = () => {
  const stats = [
    {
      title: "Total Users",
      value: "2,856",
      icon: Users,
      color: "bg-blue-100 text-blue-700",
      change: "+12%"
    },
    {
      title: "Active Devices",
      value: "143",
      icon: Smartphone,
      color: "bg-teal-100 text-teal-700",
      change: "+5%"
    },
    {
      title: "Pending Approvals",
      value: "24",
      icon: Calendar,
      color: "bg-amber-100 text-amber-700",
      change: "-3%"
    },
    {
      title: "System Alerts",
      value: "7",
      icon: Bell,
      color: "bg-red-100 text-red-700",
      change: "+2"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
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
            <p className={`text-xs mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
