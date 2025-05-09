
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Notification = {
  id: string;
  title: string;
  description: string;
  date: string;
  isNew: boolean;
  link?: string;
};

const notifications: Notification[] = [
  {
    id: "1",
    title: "Assignment Graded",
    description: "Your CSC304 assignment has been graded. You scored 85%.",
    date: "Today, 9:30 AM",
    isNew: true,
    link: "/grades"
  },
  {
    id: "2",
    title: "Room Change Notice",
    description: "MAT202 lecture will be held in Room 401 instead of Room 303.",
    date: "Yesterday, 2:15 PM",
    isNew: true,
    link: "/schedule"
  },
  {
    id: "3",
    title: "New Resource Available",
    description: "New lecture notes for PHY101 have been uploaded.",
    date: "Apr 27, 11:45 AM",
    isNew: false,
    link: "/resources"
  },
];

export function RecentNotifications() {
  const { toast } = useToast();
  const [notifs, setNotifs] = useState<Notification[]>(notifications);
  const navigate = useNavigate();

  const handleNotificationClick = (notification: Notification) => {
    // Mark notification as read
    if (notification.isNew) {
      setNotifs(prevNotifs => 
        prevNotifs.map(n => 
          n.id === notification.id ? { ...n, isNew: false } : n
        )
      );
    }
    
    // Navigate to the linked page if available
    if (notification.link) {
      navigate(notification.link);
    }
    
    // Show toast confirmation
    toast({
      title: "Notification viewed",
      description: notification.title,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Notifications</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {notifs.map((notification) => (
            <div 
              key={notification.id} 
              className="p-4 hover:bg-muted/50 cursor-pointer relative transition-colors"
              onClick={() => handleNotificationClick(notification)}
            >
              {notification.isNew && (
                <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-blue-500" />
              )}
              <h3 className="font-medium">{notification.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {notification.description}
              </p>
              <p className="text-xs text-muted-foreground mt-2">{notification.date}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
