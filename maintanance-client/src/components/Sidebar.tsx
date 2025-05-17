
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Home,
  Ticket,
  Users,
  Settings,
  Building,
  BarChart,
  PlusCircle,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const location = useLocation();
  
  const isActiveRoute = (path: string) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    if (path !== '/' && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  return (
    <aside className="flex flex-col w-64 bg-sidebar border-r border-sidebar-border overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground mr-2">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-semibold text-sidebar-foreground">Campus Service</h1>
            <p className="text-xs text-muted-foreground">Maintenance Portal</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <Link to="/" className={cn(
          "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
          isActiveRoute('/')
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
        )}>
          <Home className="w-4 h-4 mr-2" />
          Dashboard
        </Link>
        
        <Link to="/tickets" className={cn(
          "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
          isActiveRoute('/tickets')
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
        )}>
          <Ticket className="w-4 h-4 mr-2" />
          Tickets
        </Link>
        
        <Link to="/staff" className={cn(
          "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
          isActiveRoute('/staff')
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
        )}>
          <Users className="w-4 h-4 mr-2" />
          Staff
        </Link>
        
        <Link to="/locations" className={cn(
          "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
          isActiveRoute('/locations')
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
        )}>
          <Building className="w-4 h-4 mr-2" />
          Locations
        </Link>
        
        <Link to="/reports" className={cn(
          "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
          isActiveRoute('/reports')
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
        )}>
          <BarChart className="w-4 h-4 mr-2" />
          Reports
        </Link>
        
        <Link to="/settings" className={cn(
          "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
          isActiveRoute('/settings')
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
        )}>
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Link>
      </nav>

      <div className="p-4 space-y-3 border-t border-sidebar-border">
        <Link to="/tickets/new">
          <Button className="w-full flex items-center" variant="default">
            <PlusCircle className="w-4 h-4 mr-2" />
            New Ticket
          </Button>
        </Link>
        
        <Button className="w-full flex items-center" variant="outline">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
