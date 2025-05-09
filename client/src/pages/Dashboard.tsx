
import { Header } from "@/components/Header";
import { DashboardOverview } from "@/components/DashboardOverview";
import { QuickActions } from "@/components/QuickActions";
import { RecentNotifications } from "@/components/RecentNotifications";
import { StudentStats } from "@/components/StudentStats";
import { Toaster } from "@/components/ui/toaster";

export function Dashboard() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <DashboardOverview />
          <StudentStats />
          <div className="grid gap-6 md:grid-cols-2">
            <RecentNotifications />
            <QuickActions />
          </div>
        </div>
      </main>
      <Toaster />
    </div>
  );
}

export default Dashboard;
