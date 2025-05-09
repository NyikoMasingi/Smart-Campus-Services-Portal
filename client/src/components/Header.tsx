
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TutLogo } from "./TutLogo";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { Home, BookOpen, Calendar, FileText, User, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 2 unread notifications",
    });
  };
  
  const handleSignOut = () => {
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
    // In a real app, this would handle actual sign out logic
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <header className="border-b border-border h-16 flex items-center px-6 sticky top-0 z-10 bg-blue-600 text-white">
      <div className="flex items-center flex-1">
        <TutLogo className="mr-6" />
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={cn(
                  navigationMenuTriggerStyle(),
                  window.location.pathname === "/" ? "bg-blue-700" : "",
                  "hover:bg-blue-700 text-white bg-transparent"
                )}>
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/grades">
                <NavigationMenuLink className={cn(
                  navigationMenuTriggerStyle(),
                  window.location.pathname === "/grades" ? "bg-blue-700" : "",
                  "hover:bg-blue-700 text-white bg-transparent"
                )}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Grades
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/schedule">
                <NavigationMenuLink className={cn(
                  navigationMenuTriggerStyle(),
                  window.location.pathname === "/schedule" ? "bg-blue-700" : "",
                  "hover:bg-blue-700 text-white bg-transparent"
                )}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/resources">
                <NavigationMenuLink className={cn(
                  navigationMenuTriggerStyle(),
                  window.location.pathname === "/resources" ? "bg-blue-700" : "",
                  "hover:bg-blue-700 text-white bg-transparent"
                )}>
                  <FileText className="w-4 h-4 mr-2" />
                  Resources
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          aria-label="Notifications" 
          className="text-white hover:bg-blue-700"
          onClick={handleNotificationClick}
        >
          <Bell className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:bg-blue-700" aria-label="Profile menu">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder.svg" alt="Avatar" />
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Student Name</p>
                <p className="text-xs text-muted-foreground">ST12345678</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
