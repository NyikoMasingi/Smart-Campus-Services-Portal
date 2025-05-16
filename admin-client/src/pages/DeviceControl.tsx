
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Lightbulb, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Device {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  type: 'lighting' | 'hvac' | 'access';
  value?: number; // For brightness, temperature
  isOn: boolean;
}

const DeviceControl = () => {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: "light-1",
      name: "Main Hall Lights",
      location: "Administration Building",
      status: "online",
      type: "lighting",
      value: 80,
      isOn: true
    },
    {
      id: "light-2",
      name: "Library Ambient Lighting",
      location: "Library",
      status: "online",
      type: "lighting",
      value: 60,
      isOn: true
    },
    {
      id: "hvac-1",
      name: "Science Lab HVAC",
      location: "Science Building",
      status: "offline",
      type: "hvac",
      value: 72,
      isOn: false
    },
    {
      id: "hvac-2",
      name: "Lecture Hall Climate Control",
      location: "Main Building",
      status: "online",
      type: "hvac",
      value: 68,
      isOn: true
    },
    {
      id: "access-1",
      name: "Main Entrance Access Control",
      location: "Campus Entry",
      status: "online",
      type: "access",
      isOn: true
    },
    {
      id: "access-2",
      name: "Computer Lab Door",
      location: "Technology Building",
      status: "online",
      type: "access",
      isOn: false
    },
  ]);

  const { toast } = useToast();

  const toggleDevice = (id: string) => {
    setDevices(devices.map(device => {
      if (device.id === id) {
        const newState = !device.isOn;
        toast({
          title: `${device.name} turned ${newState ? 'on' : 'off'}`,
          description: `Successfully updated ${device.name}`,
        });
        return { ...device, isOn: newState };
      }
      return device;
    }));
  };

  const updateDeviceValue = (id: string, newValue: number) => {
    setDevices(devices.map(device => {
      if (device.id === id) {
        toast({
          title: `${device.name} updated`,
          description: `Value set to ${newValue}${device.type === 'lighting' ? '%' : '°F'}`,
        });
        return { ...device, value: newValue };
      }
      return device;
    }));
  };

  const renderDeviceCard = (device: Device) => (
    <Card key={device.id} className={`${device.status === 'offline' ? 'opacity-60' : ''} transform transition-all hover:-translate-y-1 hover:shadow-md`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{device.name}</CardTitle>
            <CardDescription>{device.location}</CardDescription>
          </div>
          <Badge
            variant={device.status === 'online' ? 'default' : 'secondary'}
          >
            {device.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Power</span>
            <Switch 
              checked={device.isOn} 
              onCheckedChange={() => toggleDevice(device.id)} 
              disabled={device.status === 'offline'}
            />
          </div>
          
          {device.type === 'lighting' && device.value !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Brightness</span>
                <span className="text-sm font-medium">{device.value}%</span>
              </div>
              <Slider
                value={[device.value]}
                min={1}
                max={100}
                step={1}
                disabled={!device.isOn || device.status === 'offline'}
                onValueChange={(value) => updateDeviceValue(device.id, value[0])}
              />
            </div>
          )}
          
          {device.type === 'hvac' && device.value !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Temperature</span>
                <span className="text-sm font-medium">{device.value}°F</span>
              </div>
              <Slider
                value={[device.value]}
                min={60}
                max={85}
                step={1}
                disabled={!device.isOn || device.status === 'offline'}
                onValueChange={(value) => updateDeviceValue(device.id, value[0])}
              />
            </div>
          )}
          
          {device.type === 'access' && (
            <div className="text-center pt-2">
              <Button 
                disabled={!device.isOn || device.status === 'offline'} 
                variant={device.isOn ? "default" : "outline"}
                className="w-full"
              >
                {device.isOn ? "Locked" : "Unlocked"}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="ghost" size="sm">
          Configure
        </Button>
      </CardFooter>
    </Card>
  );

  const lightingDevices = devices.filter(device => device.type === 'lighting');
  const hvacDevices = devices.filter(device => device.type === 'hvac');
  const accessDevices = devices.filter(device => device.type === 'access');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Monitor size={28} className="text-campus-blue" />
          <h1 className="text-2xl font-bold text-campus-blue">Device Control</h1>
        </div>
        <Button 
          className="bg-campus-teal hover:bg-opacity-90" 
          onClick={() => {
            toast({
              title: "All devices refreshed",
              description: "Device statuses updated successfully",
            });
          }}
        >
          Refresh All
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Devices</TabsTrigger>
          <TabsTrigger value="lighting">Lighting</TabsTrigger>
          <TabsTrigger value="hvac">HVAC</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.map(renderDeviceCard)}
          </div>
        </TabsContent>
        
        <TabsContent value="lighting" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lightingDevices.map(renderDeviceCard)}
          </div>
        </TabsContent>
        
        <TabsContent value="hvac" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hvacDevices.map(renderDeviceCard)}
          </div>
        </TabsContent>
        
        <TabsContent value="access" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accessDevices.map(renderDeviceCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeviceControl;
