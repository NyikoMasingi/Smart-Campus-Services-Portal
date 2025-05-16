
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Users, BookOpen } from 'lucide-react';
import { DayProps } from 'react-day-picker';

// Mock schedule data
const mockScheduleData = [
  {
    id: 1,
    title: 'IoT Fundamentals',
    date: new Date(2025, 4, 15),
    time: '10:00 - 11:30',
    location: 'Room 302',
    type: 'lecture',
    students: 42
  },
  {
    id: 2,
    title: 'Smart Campus Tech Workshop',
    date: new Date(2025, 4, 16),
    time: '14:00 - 16:00',
    location: 'Lab B',
    type: 'lab',
    students: 24
  },
  {
    id: 3,
    title: 'Data Analytics for IoT',
    date: new Date(2025, 4, 17),
    time: '11:00 - 12:30',
    location: 'Room 201',
    type: 'lecture',
    students: 38
  },
  {
    id: 4,
    title: 'Sensor Networks Advanced',
    date: new Date(2025, 4, 19),
    time: '09:00 - 11:00',
    location: 'Lab A',
    type: 'lab',
    students: 18
  }
];

const LecturerSchedule: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState(mockScheduleData);

  // Filter events for the selected date
  const selectedDateEvents = events.filter(event => 
    event.date.getDate() === date.getDate() &&
    event.date.getMonth() === date.getMonth() &&
    event.date.getFullYear() === date.getFullYear()
  );
  
  // Function to determine which dates have events (for highlighting in calendar)
  const isDayWithEvent = (day: Date) => {
    return events.some(event => 
      event.date.getDate() === day.getDate() &&
      event.date.getMonth() === day.getMonth() &&
      event.date.getFullYear() === day.getFullYear()
    );
  };
  
  // Custom day render function to show indicators for days with events
  // Update to accept DayProps instead of Date directly
  const renderDay = (props: DayProps) => {
    // The date is in props.date, not directly passed
    const day = props.date;
    const hasEvent = day ? isDayWithEvent(day) : false;
    
    return (
      <div className="relative flex h-8 w-8 items-center justify-center">
        {day ? day.getDate() : ''}
        {hasEvent && (
          <div className="absolute bottom-1 h-1 w-1 rounded-full bg-campus-blue"></div>
        )}
      </div>
    );
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle>Teaching Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="rounded-md border pointer-events-auto"
              components={{ Day: renderDay }}
            />
          </div>
          <div>
            <h3 className="font-medium mb-4">
              {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </h3>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map((event) => (
                  <div key={event.id} className="p-3 border rounded-md hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{event.title}</h4>
                      <Badge variant={event.type === 'lecture' ? 'default' : 'secondary'}>
                        {event.type}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{event.students} students</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                <BookOpen className="h-8 w-8 mb-2 opacity-50" />
                <p>No scheduled classes for this date</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LecturerSchedule;
