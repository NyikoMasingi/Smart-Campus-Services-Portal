
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: 'Jan', electricity: 400, water: 240, gas: 180 },
  { name: 'Feb', electricity: 300, water: 230, gas: 170 },
  { name: 'Mar', electricity: 200, water: 220, gas: 230 },
  { name: 'Apr', electricity: 278, water: 250, gas: 190 },
  { name: 'May', electricity: 189, water: 230, gas: 160 },
  { name: 'Jun', electricity: 239, water: 290, gas: 170 },
  { name: 'Jul', electricity: 349, water: 340, gas: 210 },
  { name: 'Aug', electricity: 329, water: 310, gas: 190 },
  { name: 'Sep', electricity: 249, water: 280, gas: 170 },
  { name: 'Oct', electricity: 319, water: 270, gas: 180 },
  { name: 'Nov', electricity: 329, water: 290, gas: 190 },
  { name: 'Dec', electricity: 379, water: 310, gas: 220 },
];

const UsageChart = () => {
  return (
    <Card className="col-span-1 md:col-span-2 animate-fade-in" style={{ animationDelay: '400ms' }}>
      <CardHeader>
        <CardTitle>Campus Resource Utilization</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Area type="monotone" dataKey="electricity" stackId="1" stroke="#1a365d" fill="#1a365d" fillOpacity={0.6} />
            <Area type="monotone" dataKey="water" stackId="1" stroke="#2c7a7b" fill="#2c7a7b" fillOpacity={0.6} />
            <Area type="monotone" dataKey="gas" stackId="1" stroke="#d69e2e" fill="#d69e2e" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default UsageChart;
