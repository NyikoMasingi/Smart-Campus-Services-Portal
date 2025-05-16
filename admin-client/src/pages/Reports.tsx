
import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  Calendar, 
  Users, 
  Activity, 
  BarChart 
} from 'lucide-react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Reports = () => {
  const { toast } = useToast();
  const [selectedReport, setSelectedReport] = useState("");
  const [dateRange, setDateRange] = useState("last-30");
  const [format, setFormat] = useState("pdf");
  
  const reportTypes = [
    { 
      id: "user-activity", 
      name: "User Activity", 
      description: "User login and system usage statistics", 
      icon: Users,
      preview: "https://placehold.co/600x400/e6f7ff/0a85ff?text=User+Activity+Report+Preview"
    },
    { 
      id: "device-usage", 
      name: "Device Usage", 
      description: "IoT device usage and status report", 
      icon: Activity,
      preview: "https://placehold.co/600x400/e6f7ff/0a85ff?text=Device+Usage+Report+Preview"
    },
    { 
      id: "energy-consumption", 
      name: "Energy Consumption", 
      description: "Campus-wide energy usage analytics", 
      icon: BarChart,
      preview: "https://placehold.co/600x400/e6f7ff/0a85ff?text=Energy+Consumption+Report+Preview"
    },
    { 
      id: "service-requests", 
      name: "Service Requests", 
      description: "Summary of maintenance and service tickets", 
      icon: FileSpreadsheet,
      preview: "https://placehold.co/600x400/e6f7ff/0a85ff?text=Service+Requests+Report+Preview"
    }
  ];

  const generateReport = () => {
    if (!selectedReport) {
      toast({
        title: "Error",
        description: "Please select a report type",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Report Generation Started",
      description: `Your ${reportTypes.find(r => r.id === selectedReport)?.name} report is being generated.`,
    });
    
    // Simulate report generation
    setTimeout(() => {
      toast({
        title: "Report Ready",
        description: `Your report is ready to download in ${format.toUpperCase()} format.`,
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileSpreadsheet size={28} className="text-campus-blue" />
          <h1 className="text-2xl font-bold text-campus-blue">Report Generation</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Options</CardTitle>
              <CardDescription>
                Configure and generate campus reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <Select value={selectedReport} onValueChange={setSelectedReport}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map(report => (
                      <SelectItem key={report.id} value={report.id}>
                        <div className="flex items-center gap-2">
                          <report.icon size={16} />
                          <span>{report.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Time Period</label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-7">Last 7 days</SelectItem>
                    <SelectItem value="last-30">Last 30 days</SelectItem>
                    <SelectItem value="last-90">Last quarter</SelectItem>
                    <SelectItem value="year-to-date">Year to date</SelectItem>
                    <SelectItem value="custom">Custom range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Format</label>
                <Tabs defaultValue="pdf" value={format} onValueChange={setFormat}>
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="pdf">PDF</TabsTrigger>
                    <TabsTrigger value="excel">Excel</TabsTrigger>
                    <TabsTrigger value="csv">CSV</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={generateReport} 
                className="w-full bg-campus-blue hover:bg-opacity-90"
              >
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>
                Manage automated report delivery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 border border-dashed rounded-md">
                <Calendar className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  No scheduled reports configured
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Schedule New Report
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Report Preview</CardTitle>
              <CardDescription>
                {selectedReport 
                  ? reportTypes.find(r => r.id === selectedReport)?.description 
                  : "Select a report type to preview"}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center p-6 h-[400px]">
              {selectedReport ? (
                <div className="relative w-full h-full">
                  <img 
                    src={reportTypes.find(r => r.id === selectedReport)?.preview}
                    alt="Report preview" 
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <FileSpreadsheet className="mx-auto h-16 w-16 text-muted-foreground opacity-50" />
                  <p className="mt-4 text-lg text-muted-foreground">
                    Select a report type to see preview
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" disabled={!selectedReport}>
                <Download className="mr-2 h-4 w-4" />
                Download Preview
              </Button>
              <div className="text-sm text-muted-foreground">
                {selectedReport && 'Sample data shown for demonstration purposes'}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;
