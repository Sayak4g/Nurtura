
import { useState } from 'react';
import { Bell, Plus, Trash2, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

type Reminder = {
  id: string;
  name: string;
  time: string;
  days: string[];
};

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Medical = () => {
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const saved = localStorage.getItem('medicalReminders');
    return saved ? JSON.parse(saved) : [];
  });
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const { toast } = useToast();

  const addReminder = () => {
    if (!name || !time || selectedDays.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields and select at least one day.",
        variant: "destructive",
      });
      return;
    }

    const newReminder: Reminder = {
      id: Date.now().toString(),
      name,
      time,
      days: selectedDays,
    };

    const updatedReminders = [...reminders, newReminder];
    setReminders(updatedReminders);
    localStorage.setItem('medicalReminders', JSON.stringify(updatedReminders));

    // Reset form
    setName('');
    setTime('');
    setSelectedDays([]);

    toast({
      title: "Reminder added",
      description: "Your medical reminder has been scheduled.",
    });
  };

  const deleteReminder = (id: string) => {
    const updatedReminders = reminders.filter(reminder => reminder.id !== id);
    setReminders(updatedReminders);
    localStorage.setItem('medicalReminders', JSON.stringify(updatedReminders));
    
    toast({
      title: "Reminder deleted",
      description: "Your medical reminder has been removed.",
    });
  };

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-primary mb-6">Medical Reminders</h1>
      
      <div className="bg-card rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Reminder</h2>
        
        <div className="grid gap-4 mb-4">
          <div>
            <Label htmlFor="reminder-name">Medication Name</Label>
            <Input 
              id="reminder-name" 
              placeholder="Enter medication name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="reminder-time">Time</Label>
            <Input 
              id="reminder-time" 
              type="time" 
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          
          <div>
            <Label>Days</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {daysOfWeek.map(day => (
                <Button
                  key={day}
                  type="button"
                  variant={selectedDays.includes(day) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleDay(day)}
                  className="transition-all"
                >
                  {day}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <Button onClick={addReminder} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Reminder
        </Button>
      </div>
      
      <div className="bg-card rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your Reminders</h2>
        
        {reminders.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medication</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reminders.map((reminder) => (
                <TableRow key={reminder.id} className="hover:bg-muted/20 transition-colors">
                  <TableCell className="font-medium">{reminder.name}</TableCell>
                  <TableCell>
                    <span className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      {reminder.time}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {reminder.days.map(day => (
                        <span key={day} className="text-xs bg-secondary px-1.5 py-0.5 rounded-md">
                          {day}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => deleteReminder(reminder.id)}
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="mx-auto h-12 w-12 mb-3 opacity-20" />
            <p>No reminders added yet.</p>
            <p className="text-sm">Add your first medication reminder above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Medical;
