
import { Home, BookOpen, Calendar, FileText, Settings, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { TutLogo } from "./TutLogo";

type NavItem = {
  title: string;
  icon: React.ElementType;
  href: string;
};

const navItems: NavItem[] = [
  { title: "Dashboard", icon: Home, href: "/" },
  { title: "Grades", icon: BookOpen, href: "/grades" },
  { title: "Schedule", icon: Calendar, href: "/schedule" },
  { title: "Resources", icon: FileText, href: "/resources" },
  { title: "Profile", icon: User, href: "/profile" },
  { title: "Settings", icon: Settings, href: "/settings" },
];

export function Navigation() {
  return (
    <div className="w-64 bg-sidebar border-r border-border h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <TutLogo className="justify-center" />
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full",
                    window.location.pathname === item.href
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-border">
        <button className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full text-sidebar-foreground">
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
