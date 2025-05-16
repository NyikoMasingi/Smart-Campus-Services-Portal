
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Cpu, 
  BookOpen, 
  HelpCircle, 
  Bell, 
  MenuSquare,
  X,
  UserCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const MainLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { toast } = useToast();
  
  const showNotificationToast = () => {
    toast({
      title: "New Notification",
      description: "Temperature in Library has exceeded threshold (31°C)",
      variant: "default",
    });
  };

  const navigationItems = [
    { name: 'Dashboard', to: '/', icon: LayoutDashboard },
    { name: 'Devices', to: '/devices', icon: Cpu },
    { name: 'Learning', to: '/learning', icon: BookOpen },
    { name: 'Help', to: '/help', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-campus-gray">
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-campus-blue">Smart Campus Portal</h1>
            </div>
            <nav className="mt-8 flex-1 px-2 space-y-1">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) => cn(
                    isActive ? 'bg-campus-blue text-white' : 'text-gray-600 hover:bg-gray-100',
                    'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                  )}
                >
                  <item.icon className="mr-3 flex-shrink-0 h-6 w-6" />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div>
                <UserCircle className="inline-block h-8 w-8 rounded-full text-gray-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Admin User</p>
                <p className="text-xs font-medium text-gray-500">admin@smartcampus.edu</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 p-2">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-campus-blue">Smart Campus Portal</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <MenuSquare />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-20 bg-black bg-opacity-25 flex">
          <div className="relative w-full max-w-xs bg-white pt-16">
            <nav className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => cn(
                    isActive ? 'bg-campus-blue text-white' : 'text-gray-600 hover:bg-gray-100',
                    'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                  )}
                >
                  <item.icon className="mr-3 flex-shrink-0 h-6 w-6" />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 w-14" onClick={() => setMobileMenuOpen(false)}></div>
        </div>
      )}

      {/* Main content */}
      <div className="md:pl-64 flex flex-col">
        <div className="sticky top-0 z-10 md:hidden h-16" />
        <div className="sticky top-0 z-10 flex-shrink-0 flex bg-white border-b border-gray-200 hidden md:flex">
          <div className="flex-1 px-4 flex justify-end">
            <div className="ml-4 flex items-center md:ml-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={showNotificationToast}
                className="relative p-1 text-gray-500 hover:text-campus-blue"
              >
                <span className="absolute h-3 w-3 top-0 right-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <Bell className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="pt-6 pb-12 px-4 sm:px-6 md:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
