
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import TicketsList from "./pages/TicketsList";
import TicketDetails from "./pages/TicketDetails";
import NewTicket from "./pages/NewTicket";
import EditTicket from "./pages/EditTicket";
import StaffList from "./pages/StaffList";
import LocationsList from "./pages/LocationsList";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="tickets" element={<TicketsList />} />
            <Route path="tickets/new" element={<NewTicket />} />
            <Route path="tickets/:id" element={<TicketDetails />} />
            <Route path="tickets/:id/edit" element={<EditTicket />} />
            <Route path="staff" element={<StaffList />} />
            <Route path="locations" element={<LocationsList />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
