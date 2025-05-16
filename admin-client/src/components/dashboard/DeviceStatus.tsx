
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const DeviceStatus = () => {
  const devices = [
    {
      name: "Smart Lighting System",
      location: "Main Campus",
      status: "online",
      battery: 92,
    },
    {
      name: "HVAC Controller",
      location: "Science Building",
      status: "warning",
      battery: 45,
    },
    {
      name: "Access Control System",
      location: "Administration",
      status: "online",
      battery: 78,
    },
    {
      name: "Environmental Sensors",
      location: "Library",
      status: "offline",
      battery: 12,
    },
  ];

  return (
    <Card className="animate-fade-in" style={{ animationDelay: '600ms' }}>
      <CardHeader>
        <CardTitle>Device Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {devices.map((device, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{device.name}</p>
                  <p className="text-xs text-muted-foreground">{device.location}</p>
                </div>
                <Badge 
                  variant={device.status === 'online' ? 'default' : 
                         device.status === 'warning' ? 'outline' : 'destructive'}
                >
                  {device.status}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={device.battery} className="h-2" />
                <span className="text-xs font-medium">{device.battery}%</span>
              </div>
              {index < devices.length - 1 && <div className="border-t border-gray-100 pt-2"></div>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceStatus;
