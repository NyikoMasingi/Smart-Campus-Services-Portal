
import React from 'react';
import { Menu, Bell, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const { toast } = useToast();
  
  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 3 unread notifications.",
    });
  };

  return (
    <header className="bg-white border-b h-16 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-bold text-campus-blue hidden sm:block">Admin Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button 
          onClick={handleNotificationClick}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <Bell size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Settings size={20} />
        </button>
        <div className="hidden md:flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-campus-blue text-white flex items-center justify-center font-bold">
            A
          </div>
          <span className="text-sm font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
