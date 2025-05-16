
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { devices, Device } from '@/data/mockData';
import { 
  Lightbulb, 
  ThermometerIcon, 
  Radar,
  Wind,
  Search,
  Filter,
  Battery,
  Clock
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const DeviceCard: React.FC<{device: Device}> = ({ device }) => {
  const [isOn, setIsOn] = useState(device.value === true);
  const [currentValue, setCurrentValue] = useState(device.value);
  const { toast } = useToast();

  const handleToggleChange = (checked: boolean) => {
    setIsOn(checked);
    setCurrentValue(checked);
    
    toast({
      title: `${device.name} turned ${checked ? 'ON' : 'OFF'}`,
      description: `Successfully updated device status`,
    });
  };

  const getDeviceIcon = () => {
    switch (device.type) {
      case 'light':
        return <Lightbulb className={`h-6 w-6 ${isOn ? 'text-yellow-400' : 'text-gray-400'}`} />;
      case 'temperature':
        return <ThermometerIcon className="h-6 w-6 text-campus-teal" />;
      case 'motion':
        return <Radar className="h-6 w-6 text-campus-blue" />;
      case 'air-quality':
        return <Wind className="h-6 w-6 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (device.status) {
      case 'online': return 'bg-green-100 text-green-800 border-green-200';
      case 'offline': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'maintenance': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBatteryColor = () => {
    if (!device.batteryLevel) return 'text-gray-400';
    if (device.batteryLevel > 70) return 'text-green-500';
    if (device.batteryLevel > 30) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <Card className="device-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {getDeviceIcon()}
            <CardTitle className="text-base">{device.name}</CardTitle>
          </div>
          <Badge className={getStatusColor()}>
            {device.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-3">
          <p className="text-sm text-gray-500">{device.location}</p>
          
          <div className="flex items-center justify-between">
            {device.type === 'light' ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Power:</span>
                <Switch 
                  checked={isOn} 
                  onCheckedChange={handleToggleChange}
                  disabled={device.status !== 'online'}
                />
              </div>
            ) : (
              <div>
                <span className="text-sm font-medium">Value: </span>
                <span className={`text-lg font-semibold ${device.status === 'online' ? 'sensor-active' : ''}`}>
                  {typeof currentValue === 'boolean' 
                    ? (currentValue ? 'Active' : 'Inactive') 
                    : `${currentValue}${device.unit || ''}`}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Battery className={`h-4 w-4 ${getBatteryColor()}`} />
              <span>{device.batteryLevel || 'N/A'}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{new Date(device.lastUpdate).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Devices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          device.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return device.type === activeTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-campus-slate">Devices</h1>
      
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search devices or locations..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Devices</TabsTrigger>
          <TabsTrigger value="light">Lighting</TabsTrigger>
          <TabsTrigger value="temperature">Temperature</TabsTrigger>
          <TabsTrigger value="motion">Motion</TabsTrigger>
          <TabsTrigger value="air-quality">Air Quality</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="m-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDevices.length > 0 ? (
              filteredDevices.map(device => (
                <DeviceCard key={device.id} device={device} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No devices found matching your criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Devices;
