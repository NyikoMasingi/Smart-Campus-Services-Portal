
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Schedule() {
  return (
    <div className="flex h-screen bg-background">
      <Navigation />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Schedule</h2>
              <Tabs defaultValue="day">
                <TabsList>
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Lecture - Blue */}
                  <div className="p-3 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30 rounded-sm">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">CSC201: Database Systems</h3>
                        <p className="text-sm text-muted-foreground mt-1">Room 305B</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">10:30 AM - 12:00 PM</p>
                        <p className="text-sm text-muted-foreground mt-1">Dr. J. Smith</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Practical - Yellow */}
                  <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30 rounded-sm">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">CSC201: Database Systems (Practical)</h3>
                        <p className="text-sm text-muted-foreground mt-1">Computer Lab 2</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">1:30 PM - 3:00 PM</p>
                        <p className="text-sm text-muted-foreground mt-1">Mr. A. Johnson</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Lecture - Blue */}
                  <div className="p-3 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30 rounded-sm">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">MAT202: Advanced Calculus</h3>
                        <p className="text-sm text-muted-foreground mt-1">Room 401</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">3:30 PM - 5:00 PM</p>
                        <p className="text-sm text-muted-foreground mt-1">Prof. L. Williams</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Exam - Red */}
                  <div className="p-3 border-l-4 border-red-500 bg-red-50 dark:bg-red-950/30 rounded-sm">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">PHY101: Mid-term Exam</h3>
                        <p className="text-sm text-muted-foreground mt-1">Examination Hall 1</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">May 2, 9:00 AM - 11:00 AM</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Assignment Deadline */}
                  <div className="p-3 border-l-4 border-gray-500 bg-gray-50 dark:bg-gray-800/30 rounded-sm">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">CSC304: Assignment Deadline</h3>
                        <p className="text-sm text-muted-foreground mt-1">Submit online via portal</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">May 3, 11:59 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Schedule;
