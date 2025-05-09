
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, File, FileText, Search } from "lucide-react";

const resources = [
  {
    id: "1",
    title: "Database Design Principles",
    course: "CSC201",
    type: "notes",
    date: "Apr 25, 2023",
    size: "1.2 MB",
  },
  {
    id: "2",
    title: "Introduction to SQL",
    course: "CSC201",
    type: "slides",
    date: "Apr 20, 2023",
    size: "3.5 MB",
  },
  {
    id: "3",
    title: "Lecture 5: Query Optimization",
    course: "CSC201",
    type: "recording",
    date: "Apr 18, 2023",
    size: "45.8 MB",
  },
  {
    id: "4",
    title: "Vectors and Matrices",
    course: "MAT202",
    type: "notes",
    date: "Apr 15, 2023",
    size: "2.1 MB",
  },
  {
    id: "5",
    title: "Quantum Physics Introduction",
    course: "PHY101",
    type: "slides",
    date: "Apr 10, 2023",
    size: "4.7 MB",
  },
];

export function Resources() {
  return (
    <div className="flex h-screen bg-background">
      <Navigation />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Resources</h2>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search resources..."
                  className="w-[250px] pl-8"
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="w-1/4">
                <Card>
                  <CardHeader>
                    <CardTitle>Filter</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Course</h3>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <input type="checkbox" id="csc201" className="mr-2" />
                            <label htmlFor="csc201" className="text-sm">CSC201</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="mat202" className="mr-2" />
                            <label htmlFor="mat202" className="text-sm">MAT202</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="phy101" className="mr-2" />
                            <label htmlFor="phy101" className="text-sm">PHY101</label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Resource Type</h3>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <input type="checkbox" id="notes" className="mr-2" />
                            <label htmlFor="notes" className="text-sm">Notes</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="slides" className="mr-2" />
                            <label htmlFor="slides" className="text-sm">Slides</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="recordings" className="mr-2" />
                            <label htmlFor="recordings" className="text-sm">Recordings</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="w-3/4">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {resources.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                        >
                          <div className="flex items-center">
                            <div className="mr-3">
                              {resource.type === "notes" && <FileText className="text-blue-500 h-8 w-8" />}
                              {resource.type === "slides" && <File className="text-green-500 h-8 w-8" />}
                              {resource.type === "recording" && <File className="text-purple-500 h-8 w-8" />}
                            </div>
                            <div>
                              <h3 className="font-medium">{resource.title}</h3>
                              <div className="flex text-xs text-muted-foreground mt-1 space-x-2">
                                <span>{resource.course}</span>
                                <span>•</span>
                                <span>{resource.type}</span>
                                <span>•</span>
                                <span>{resource.date}</span>
                                <span>•</span>
                                <span>{resource.size}</span>
                              </div>
                            </div>
                          </div>
                          <button className="p-2 hover:bg-muted rounded-full">
                            <Download className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Resources;
