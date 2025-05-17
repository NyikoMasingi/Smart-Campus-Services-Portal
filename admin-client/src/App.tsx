// App.tsx
import { Toaster as AppToaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/protectedRoute";

import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import DeviceControl from "./pages/DeviceControl";
import ServiceApprovals from "./pages/ServiceApprovals";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/clerk-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppToaster />
      <SonnerToaster />

      {/* Global Auth Header */}
      <header className="w-full flex justify-end items-center p-4 border-b">
        
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      <BrowserRouter>
        <Routes>
          {/* Public login route */}
          <Route path="/" element={<Login />} />

          {/* Protected routes */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/devices" element={<DeviceControl />} />
            <Route path="/approvals" element={<ServiceApprovals />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
