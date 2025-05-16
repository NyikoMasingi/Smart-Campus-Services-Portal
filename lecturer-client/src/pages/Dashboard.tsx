
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { devices, temperatureData, energyUsageData } from '@/data/mockData';
import { 
  Lightbulb, 
  ThermometerIcon, 
  Activity,
  AlertTriangle,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [onlineDevices, setOnlineDevices] = useState(0);
  const [offlineDevices, setOfflineDevices] = useState(0);
  const [temperatureValue, setTemperatureValue] = useState(24.5);
  const [alertCount, setAlertCount] = useState(1);

  useEffect(() => {
    // Calculate online/offline devices
    const online = devices.filter(device => device.status === 'online').length;
    const offline = devices.filter(device => device.status !== 'online').length;
    setOnlineDevices(online);
    setOfflineDevices(offline);

    // Simulate temperature fluctuation
    const tempInterval = setInterval(() => {
      setTemperatureValue(prev => {
        const newTemp = prev + (Math.random() * 0.4 - 0.2);
        return parseFloat(newTemp.toFixed(1));
      });
    }, 5000);

    return () => clearInterval(tempInterval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-campus-slate">Dashboard</h1>
        <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</span>
      </div>
      
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Online Devices</CardTitle>
            <Lightbulb className="h-4 w-4 text-campus-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{onlineDevices}</div>
            <p className="text-xs text-muted-foreground">
              out of {devices.length} total devices
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Offline Devices</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{offlineDevices}</div>
            <p className="text-xs text-muted-foreground">
              {offlineDevices === 0 ? "All devices operational" : "Needs attention"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Temperature</CardTitle>
            <ThermometerIcon className="h-4 w-4 text-campus-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{temperatureValue}°C</div>
            <p className="text-xs text-muted-foreground">
              Library Main Hall
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <Activity className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alertCount}</div>
            <p className="text-xs text-muted-foreground">
              {alertCount === 0 ? "No issues detected" : "Requires attention"}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Temperature Trend (Library)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={temperatureData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis domain={[20, 30]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Temperature (°C)"
                  stroke="#0078d4" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Energy Usage by Location</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={energyUsageData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="library" name="Library" fill="#0078d4" />
                <Bar dataKey="dormA" name="Dorm A" fill="#00b294" />
                <Bar dataKey="cafeteria" name="Cafeteria" fill="#ffc83d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Alerts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Alerts</CardTitle>
          <Button variant="ghost" size="sm" className="gap-1">
            <span>View All</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Temperature Threshold Exceeded</p>
                  <p className="text-sm text-gray-600">Library temperature reached 31°C (05/15/25, 10:15 AM)</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-red-100">High</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-100">
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 p-2 rounded-full">
                  <BarChart3 className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Energy Usage Spike</p>
                  <p className="text-sm text-gray-600">Dorm A consumption increased by 15% (05/14/25, 8:30 PM)</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-amber-100">Medium</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
