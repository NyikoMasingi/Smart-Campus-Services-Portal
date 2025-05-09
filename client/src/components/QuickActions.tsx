
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function QuickActions() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleViewSchedule = () => {
    navigate("/schedule");
    toast({
      title: "Schedule",
      description: "Navigating to your class schedule",
    });
  };

  const handleSubmitAssignment = () => {
    navigate("/resources");
    toast({
      title: "Submit Assignment",
      description: "Assignment submission page opened",
    });
  };

  const handleSearchResources = () => {
    navigate("/resources");
    toast({
      title: "Resources",
      description: "Searching through available resources",
    });
  };

  const handleUpdateProfile = () => {
    navigate("/profile");
    toast({
      title: "Profile",
      description: "Update your profile information",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="flex flex-col h-auto py-4 gap-2 transition-colors hover:bg-blue-50 hover:border-blue-200"
            onClick={handleViewSchedule}
          >
            <Calendar className="h-5 w-5" />
            <span>View Schedule</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col h-auto py-4 gap-2 transition-colors hover:bg-blue-50 hover:border-blue-200"
            onClick={handleSubmitAssignment}
          >
            <FileText className="h-5 w-5" />
            <span>Submit Assignment</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col h-auto py-4 gap-2 transition-colors hover:bg-blue-50 hover:border-blue-200"
            onClick={handleSearchResources}
          >
            <Search className="h-5 w-5" />
            <span>Search Resources</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col h-auto py-4 gap-2 transition-colors hover:bg-blue-50 hover:border-blue-200"
            onClick={handleUpdateProfile}
          >
            <User className="h-5 w-5" />
            <span>Update Profile</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
