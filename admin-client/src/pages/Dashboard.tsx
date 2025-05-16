
import React from 'react';
import StatsCards from '@/components/dashboard/StatsCards';
import UsageChart from '@/components/dashboard/UsageChart';
import RecentActivities from '@/components/dashboard/RecentActivities';
import DeviceStatus from '@/components/dashboard/DeviceStatus';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-campus-blue">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>
      
      <StatsCards />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <UsageChart />
        <div className="space-y-5">
          <RecentActivities />
          <DeviceStatus />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
