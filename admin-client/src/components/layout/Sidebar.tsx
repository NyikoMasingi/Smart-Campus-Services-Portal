
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  Monitor, 
  Calendar, 
  Settings, 
  BarChart3,
  Menu,
  X,
  FileSpreadsheet
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isMobile, isOpen, toggleSidebar }: SidebarProps) => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: BarChart3 },
    { name: 'User Management', path: '/users', icon: Users },
    { name: 'Device Control', path: '/devices', icon: Monitor },
    { name: 'Service Approvals', path: '/approvals', icon: Calendar },
    { name: 'Reports', path: '/reports', icon: FileSpreadsheet },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  if (isMobile && !isOpen) return null;

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-50 bg-sidebar flex flex-col w-64 shadow-lg transition-all duration-300 ease-in-out",
      isMobile && isOpen && "animate-fade-in",
      isMobile && !isOpen && "hidden"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="bg-campus-teal text-white p-2 rounded">
            <BarChart3 size={24} />
          </div>
          <h1 className="text-xl font-bold text-white">Smart Campus</h1>
        </div>
        {isMobile && (
          <button onClick={toggleSidebar} className="text-white p-1 hover:bg-sidebar-border rounded">
            <X size={24} />
          </button>
        )}
      </div>
      <nav className="flex-1 pt-4 pb-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-border"
                  )
                }
                end={item.path === '/'}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-campus-light text-campus-blue flex items-center justify-center font-bold">
            A
          </div>
          <div>
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-gray-400">admin@smartcampus.edu</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
