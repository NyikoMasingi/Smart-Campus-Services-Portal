
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Sample data for the charts
const gradeDistribution = [
  { name: "A", value: 4, color: "#9b87f5" },
  { name: "B", value: 7, color: "#a897f7" },
  { name: "C", value: 3, color: "#b6a8f9" },
  { name: "D", value: 1, color: "#c4b9fb" },
  { name: "F", value: 0, color: "#d2cafd" },
];

const attendanceData = [
  { month: "Sep", percentage: 95 },
  { month: "Oct", percentage: 90 },
  { month: "Nov", percentage: 93 },
  { month: "Dec", percentage: 87 },
  { month: "Jan", percentage: 92 },
  { month: "Feb", percentage: 94 },
];

const assignmentScores = [
  { name: "CSC201", completed: 8, total: 10, score: 85 },
  { name: "MAT102", completed: 6, total: 8, score: 92 },
  { name: "ENG105", completed: 9, total: 12, score: 78 },
  { name: "PHY101", completed: 7, total: 9, score: 88 },
  { name: "HIS103", completed: 5, total: 7, score: 90 },
];

export function StudentStats() {
  const COLORS = ["#9b87f5", "#a897f7", "#b6a8f9", "#c4b9fb", "#d2cafd"];
  
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Grade Distribution</CardTitle>
          <CardDescription>Breakdown of your grades across courses</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <ChartContainer
            config={{
              grades: {
                label: "Grades",
                theme: {
                  light: "#9b87f5",
                  dark: "#9b87f5",
                },
              },
            }}
            className="aspect-[4/3]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={(entry) => entry.name}
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Trend</CardTitle>
          <CardDescription>Your monthly attendance percentage</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <ChartContainer
            config={{
              attendance: {
                label: "Attendance",
                theme: {
                  light: "#9b87f5",
                  dark: "#9b87f5",
                },
              },
            }}
            className="aspect-[4/3]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={attendanceData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="percentage"
                  stroke="#9b87f5"
                  activeDot={{ r: 8 }}
                  name="attendance"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Assignment Performance</CardTitle>
          <CardDescription>Progress and scores for each course</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <ChartContainer
            config={{
              completed: {
                label: "Completed",
                theme: {
                  light: "#9b87f5",
                  dark: "#9b87f5",
                },
              },
              score: {
                label: "Score",
                theme: {
                  light: "#7e69ab",
                  dark: "#7e69ab",
                },
              },
            }}
            className="aspect-[16/9]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={assignmentScores}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#9b87f5" />
                <YAxis yAxisId="right" orientation="right" stroke="#7e69ab" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar yAxisId="left" dataKey="completed" name="completed" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="score" name="score" fill="#7e69ab" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
