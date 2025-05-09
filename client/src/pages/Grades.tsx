
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const courseGrades = [
  {
    id: "CSC101",
    name: "Introduction to Computer Science",
    mark: 86,
    grade: "A",
    credits: 3,
  },
  {
    id: "MAT202",
    name: "Advanced Calculus",
    mark: 74,
    grade: "B",
    credits: 4,
  },
  {
    id: "PHY101",
    name: "Physics for Engineers",
    mark: 92,
    grade: "A+",
    credits: 4,
  },
  {
    id: "ENG205",
    name: "Technical Communication",
    mark: 78,
    grade: "B+",
    credits: 2,
  },
  {
    id: "CSC304",
    name: "Data Structures and Algorithms",
    mark: 81,
    grade: "A-",
    credits: 3,
  },
];

export function Grades() {
  return (
    <div className="flex h-screen bg-background">
      <Navigation />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Grades</h2>
              <div className="flex items-center gap-2">
                <select className="border rounded p-1 text-sm">
                  <option>Current Semester</option>
                  <option>Previous Semester</option>
                  <option>All Semesters</option>
                </select>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Semester Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Semester GPA</span>
                    <span className="font-medium">3.7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Credits Attempted</span>
                    <span className="font-medium">16</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Credits Completed</span>
                    <span className="font-medium">16</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Course Grades</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course Code</TableHead>
                      <TableHead>Course Name</TableHead>
                      <TableHead>Mark</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Credits</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courseGrades.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.id}</TableCell>
                        <TableCell>{course.name}</TableCell>
                        <TableCell>{course.mark}%</TableCell>
                        <TableCell>{course.grade}</TableCell>
                        <TableCell>{course.credits}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Grades;
