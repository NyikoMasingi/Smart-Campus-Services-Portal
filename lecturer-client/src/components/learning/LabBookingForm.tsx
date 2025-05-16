
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, Clock, Users } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from "@/components/ui/use-toast";

interface Lab {
  id: string;
  name: string;
  capacity: number;
  equipment: string[];
}

// Mock labs data
const availableLabs: Lab[] = [
  { id: 'lab-a', name: 'Computer Lab A', capacity: 30, equipment: ['Desktop Computers', 'Projector', 'Interactive Whiteboard'] },
  { id: 'lab-b', name: 'IoT Lab', capacity: 24, equipment: ['Raspberry Pi Kits', 'Sensor Arrays', 'Smart Home Devices'] },
  { id: 'lab-c', name: 'Robotics Lab', capacity: 18, equipment: ['Robot Arms', '3D Printers', 'VR Equipment'] },
  { id: 'lab-d', name: 'Networking Lab', capacity: 22, equipment: ['Cisco Switches', 'Server Racks', 'Patch Panels'] },
];

const timeSlots = [
  '09:00 - 10:30', 
  '11:00 - 12:30', 
  '13:30 - 15:00', 
  '15:30 - 17:00'
];

const LabBookingForm: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedLab, setSelectedLab] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [studentCount, setStudentCount] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('');
  const [equipment, setEquipment] = useState<string>('');
  const { toast } = useToast();

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation checks
    if (!selectedDate || !selectedLab || !selectedTime || !studentCount || !purpose) {
      toast({
        title: "Incomplete Form",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Process the booking
    toast({
      title: "Lab Booking Successful",
      description: `${selectedLab} has been booked for ${format(selectedDate, 'MMMM d, yyyy')} at ${selectedTime}`,
    });
    
    // Reset form
    setSelectedDate(undefined);
    setSelectedLab('');
    setSelectedTime('');
    setStudentCount('');
    setPurpose('');
    setEquipment('');
  };

  // Get selected lab details
  const labDetails = availableLabs.find(lab => lab.id === selectedLab);

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle>Book a Lab</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleBookingSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'PPP') : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    disabled={(date) => 
                      date < new Date() ||
                      date.getDay() === 0 ||
                      date.getDay() === 6
                    }
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Time Slot</label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>{time}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Lab</label>
              <Select value={selectedLab} onValueChange={setSelectedLab}>
                <SelectTrigger>
                  <SelectValue placeholder="Select lab" />
                </SelectTrigger>
                <SelectContent>
                  {availableLabs.map((lab) => (
                    <SelectItem key={lab.id} value={lab.id}>
                      {lab.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Number of Students</label>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-gray-500" />
                <Input
                  type="number"
                  value={studentCount}
                  onChange={(e) => setStudentCount(e.target.value)}
                  placeholder="Enter student count"
                  min="1"
                  max={labDetails?.capacity || 30}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Purpose of Booking</label>
            <Textarea
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Describe the purpose of your lab session"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Equipment Needed (Optional)</label>
            <Textarea
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
              placeholder="List any specific equipment needs"
              rows={2}
            />
          </div>

          {labDetails && (
            <div className="p-3 bg-gray-50 rounded-md">
              <h4 className="font-medium text-sm mb-2">Lab Information</h4>
              <div className="text-sm space-y-1">
                <p>Capacity: {labDetails.capacity} students</p>
                <p>Available Equipment:</p>
                <ul className="list-disc pl-5">
                  {labDetails.equipment.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleBookingSubmit} className="w-full">Book Lab</Button>
      </CardFooter>
    </Card>
  );
};

export default LabBookingForm;
