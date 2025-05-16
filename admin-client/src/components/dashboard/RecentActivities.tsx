
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RecentActivities = () => {
  const activities = [
    { 
      user: "John Smith", 
      action: "approved access request", 
      target: "Library Building", 
      time: "10 minutes ago",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      icon: "✓"
    },
    { 
      user: "Sarah Johnson", 
      action: "updated device settings", 
      target: "HVAC System - Science Building", 
      time: "25 minutes ago",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      icon: "⚙"
    },
    { 
      user: "Mohammed Ali", 
      action: "created new user account", 
      target: "Dr. Rebecca Lee", 
      time: "1 hour ago",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      icon: "+"
    },
    { 
      user: "Emily Chen", 
      action: "scheduled maintenance", 
      target: "Smart Lighting - Dorm A", 
      time: "2 hours ago",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      icon: "🔧"
    },
  ];

  return (
    <Card className="animate-fade-in" style={{ animationDelay: '500ms' }}>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-9 h-9 rounded-full ${activity.iconBg} ${activity.iconColor} flex items-center justify-center text-lg`}>
                {activity.icon}
              </div>
              <div className="flex flex-col">
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span>
                  {" "}{activity.action}{" "}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
