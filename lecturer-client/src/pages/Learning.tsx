import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { lectureContent } from '@/data/mockData';
import { 
  PlayCircle, 
  FileText, 
  Download, 
  Clock,
  ListChecks,
  ChevronRight,
  Code,
  TerminalSquare,
  CalendarClock,
  BookOpen
} from 'lucide-react';
import LecturerSchedule from '@/components/learning/LecturerSchedule';
import LabBookingForm from '@/components/learning/LabBookingForm';

const LectureCard: React.FC<{lecture: any}> = ({ lecture }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{lecture.title}</CardTitle>
          <Badge variant="outline" className="bg-campus-blue text-white">
            {lecture.slides} slides
          </Badge>
        </div>
        <CardDescription>{lecture.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{lecture.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <FileText className="h-4 w-4" />
            <span>Updated: {lecture.lastUpdated}</span>
          </div>
        </div>
        
        <div className="mb-2 text-sm font-medium text-gray-700">Topics:</div>
        <div className="flex flex-wrap gap-2">
          {lecture.topics.map((topic: string, index: number) => (
            <Badge key={index} variant="secondary" className="font-normal">
              {topic}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-4 border-t">
        <Button className="flex-1 gap-2">
          <PlayCircle className="h-4 w-4" />
          <span>Start</span>
        </Button>
        <Button variant="outline" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const Learning = () => {
  const [userRole, setUserRole] = useState<'student' | 'lecturer'>('student');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-campus-slate">Learning Center</h1>
        <div className="flex items-center gap-2">
          <Button 
            variant={userRole === 'student' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setUserRole('student')}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Student View
          </Button>
          <Button 
            variant={userRole === 'lecturer' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setUserRole('lecturer')}
          >
            <CalendarClock className="h-4 w-4 mr-2" />
            Lecturer View
          </Button>
        </div>
      </div>
      
      {userRole === 'lecturer' ? (
        <Tabs defaultValue="schedule">
          <TabsList className="mb-4">
            <TabsTrigger value="schedule">Teaching Schedule</TabsTrigger>
            <TabsTrigger value="lab-booking">Book Lab</TabsTrigger>
            <TabsTrigger value="lectures">My Lectures</TabsTrigger>
          </TabsList>
          
          <TabsContent value="schedule" className="space-y-6">
            <Alert>
              <CalendarClock className="h-4 w-4" />
              <AlertTitle>Teaching Mode</AlertTitle>
              <AlertDescription>
                View your upcoming teaching schedule and class details.
              </AlertDescription>
            </Alert>
            <LecturerSchedule />
          </TabsContent>
          
          <TabsContent value="lab-booking" className="space-y-6">
            <Alert>
              <BookOpen className="h-4 w-4" />
              <AlertTitle>Lab Booking</AlertTitle>
              <AlertDescription>
                Reserve lab space for your classes or special sessions.
              </AlertDescription>
            </Alert>
            <LabBookingForm />
          </TabsContent>
          
          <TabsContent value="lectures" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lectureContent.map(lecture => (
                <LectureCard key={lecture.id} lecture={lecture} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <Tabs defaultValue="lectures">
          <TabsList className="mb-4">
            <TabsTrigger value="lectures">Lectures</TabsTrigger>
            <TabsTrigger value="labs">Labs</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lectures" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lectureContent.map(lecture => (
                <LectureCard key={lecture.id} lecture={lecture} />
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Featured Lecture: IoT Fundamentals for Smart Campus</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <PlayCircle className="h-12 w-12 text-campus-blue mx-auto mb-2 opacity-70" />
                    <p className="text-gray-600">Lecture Preview</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Lecture Outline</h3>
                  <ol className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="bg-campus-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</div>
                      <span>Introduction (5 mins) - What is a Smart Campus?</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="bg-campus-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</div>
                      <span>Core Concepts (15 mins) - IoT device types and data flow</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="bg-campus-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</div>
                      <span>Hands-on Demo (20 mins) - Controlling smart lights via portal</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="bg-campus-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</div>
                      <span>Q&A (10 mins) - Open discussion and questions</span>
                    </li>
                  </ol>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Download Materials</Button>
                <Button className="gap-1">
                  <span>Start Learning</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="labs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lab 1: Device Configuration</CardTitle>
                  <CardDescription>Configure and connect your first IoT device</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <ListChecks className="h-5 w-5 text-campus-blue" />
                    <span className="text-sm font-medium">Exercises: 4</span>
                    <span className="text-sm text-gray-500">|</span>
                    <Clock className="h-5 w-5 text-campus-blue" />
                    <span className="text-sm font-medium">Duration: 45 mins</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <Code className="h-5 w-5 text-campus-blue mb-2" />
                    <p className="text-sm font-mono">
                      # Example: Configure device <br />
                      Invoke-RestMethod -Uri "https://campus-api/lights" -Method Post
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Start Lab</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Lab 2: Data Collection & Analysis</CardTitle>
                  <CardDescription>Learn to collect and analyze IoT sensor data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <ListChecks className="h-5 w-5 text-campus-blue" />
                    <span className="text-sm font-medium">Exercises: 3</span>
                    <span className="text-sm text-gray-500">|</span>
                    <Clock className="h-5 w-5 text-campus-blue" />
                    <span className="text-sm font-medium">Duration: 60 mins</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    <TerminalSquare className="h-5 w-5 text-campus-blue mb-2" />
                    <p className="text-sm font-mono">
                      # Example: Process data <br />
                      import random <br />
                      temperature = random.randint(18, 32)
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Start Lab</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-campus-blue" />
                    <span>Smart Campus API Documentation</span>
                  </div>
                  <Download className="h-4 w-4 text-gray-500" />
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-campus-blue" />
                    <span>Device Specification Guide</span>
                  </div>
                  <Download className="h-4 w-4 text-gray-500" />
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-campus-blue" />
                    <span>Campus IoT Security Guidelines</span>
                  </div>
                  <Download className="h-4 w-4 text-gray-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Video Tutorials</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <PlayCircle className="h-5 w-5 text-campus-blue" />
                    <span>Getting Started with IoT Devices</span>
                  </div>
                  <span className="text-sm text-gray-500">12:45</span>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <PlayCircle className="h-5 w-5 text-campus-blue" />
                    <span>Troubleshooting Common Issues</span>
                  </div>
                  <span className="text-sm text-gray-500">08:32</span>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <PlayCircle className="h-5 w-5 text-campus-blue" />
                    <span>Advanced Data Analysis Techniques</span>
                  </div>
                  <span className="text-sm text-gray-500">15:20</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Learning;
