import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { 
  Clock, 
  Calendar, 
  Plus,
  Trash2,
  Save,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../contexts/auth-context';
import { useTheme } from '../contexts/theme-context';
import { SoundEffects } from './sound-effects';

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  enabled: boolean;
}

interface DaySchedule {
  day: string;
  dayName: string;
  enabled: boolean;
  timeSlots: TimeSlot[];
}

export function AvailabilityManagement() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const daysOfWeek = [
    { day: 'monday', name: 'Monday' },
    { day: 'tuesday', name: 'Tuesday' },
    { day: 'wednesday', name: 'Wednesday' },
    { day: 'thursday', name: 'Thursday' },
    { day: 'friday', name: 'Friday' },
    { day: 'saturday', name: 'Saturday' },
    { day: 'sunday', name: 'Sunday' }
  ];

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/api/counsellor/availability/${user?.id}`);
      if (response.ok) {
        const data = await response.json();
        setSchedule(data);
      } else {
        // Initialize with default schedule if none exists
        initializeDefaultSchedule();
      }
    } catch (error) {
      console.error('Error fetching availability:', error);
      initializeDefaultSchedule();
    } finally {
      setIsLoading(false);
    }
  };

  const initializeDefaultSchedule = () => {
    const defaultSchedule = daysOfWeek.map(day => ({
      day: day.day,
      dayName: day.name,
      enabled: false,
      timeSlots: []
    }));
    setSchedule(defaultSchedule);
  };

  const toggleDayEnabled = (dayIndex: number) => {
    SoundEffects.playClick();
    const newSchedule = [...schedule];
    newSchedule[dayIndex].enabled = !newSchedule[dayIndex].enabled;
    setSchedule(newSchedule);
  };

  const addTimeSlot = (dayIndex: number) => {
    SoundEffects.playClick();
    const newSchedule = [...schedule];
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      startTime: '09:00',
      endTime: '10:00',
      enabled: true
    };
    newSchedule[dayIndex].timeSlots.push(newSlot);
    setSchedule(newSchedule);
  };

  const removeTimeSlot = (dayIndex: number, slotId: string) => {
    SoundEffects.playClick();
    const newSchedule = [...schedule];
    newSchedule[dayIndex].timeSlots = newSchedule[dayIndex].timeSlots.filter(slot => slot.id !== slotId);
    setSchedule(newSchedule);
  };

  const updateTimeSlot = (dayIndex: number, slotId: string, field: 'startTime' | 'endTime' | 'enabled', value: string | boolean) => {
    const newSchedule = [...schedule];
    const slotIndex = newSchedule[dayIndex].timeSlots.findIndex(slot => slot.id === slotId);
    if (slotIndex !== -1) {
      newSchedule[dayIndex].timeSlots[slotIndex] = {
        ...newSchedule[dayIndex].timeSlots[slotIndex],
        [field]: value
      };
      setSchedule(newSchedule);
    }
  };

  const saveAvailability = async () => {
    try {
      setIsSaving(true);
      SoundEffects.playClick();
      
      const response = await fetch(`http://localhost:5000/api/counsellor/availability/${user?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ schedule })
      });

      if (response.ok) {
        SoundEffects.playSuccess();
        alert('✅ Availability updated successfully!');
      } else {
        throw new Error('Failed to save availability');
      }
    } catch (error) {
      console.error('Error saving availability:', error);
      alert('❌ Failed to save availability. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96 relative mindease-subtle-stars">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading availability...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 relative mindease-subtle-stars">
      {/* Header */}
      <div className="border p-6 rounded-3xl shadow-lg backdrop-blur-lg relative z-10" style={{
        background: 'rgba(255, 255, 255, 0.08)',
        borderColor: 'rgba(133, 130, 157, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'var(--mindease-gradient-primary)' }}>
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Set Your Availability ✨</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Manage your weekly schedule and time slots</p>
            </div>
          </div>
          <Button
            onClick={saveAvailability}
            disabled={isSaving}
            className="mindease-button text-white hover:scale-105 transition-all duration-300"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="space-y-6 relative z-10">
        {schedule.map((day, dayIndex) => (
          <Card key={day.day} className="border-0 rounded-3xl shadow-lg backdrop-blur-lg" style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(133, 130, 157, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="h-5 w-5 mr-3 text-blue-500" />
                  <span className="text-gray-900 dark:text-white">{day.dayName}</span>
                </CardTitle>
                <div className="flex items-center space-x-3">
                  <span className={`text-sm ${day.enabled ? 'text-green-600' : 'text-gray-500'}`}>
                    {day.enabled ? 'Available' : 'Not Available'}
                  </span>
                  <Switch
                    checked={day.enabled}
                    onCheckedChange={() => toggleDayEnabled(dayIndex)}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>
              </div>
            </CardHeader>
            
            {day.enabled && (
              <CardContent>
                <div className="space-y-4">
                  {day.timeSlots.map((slot) => (
                    <div key={slot.id} className="flex items-center space-x-4 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/30 dark:bg-gray-800/30">
                      <input
                        type="time"
                        value={slot.startTime}
                        onChange={(e) => updateTimeSlot(dayIndex, slot.id, 'startTime', e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="time"
                        value={slot.endTime}
                        onChange={(e) => updateTimeSlot(dayIndex, slot.id, 'endTime', e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                      <Switch
                        checked={slot.enabled}
                        onCheckedChange={(checked) => updateTimeSlot(dayIndex, slot.id, 'enabled', checked)}
                        className="data-[state=checked]:bg-green-500"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeTimeSlot(dayIndex, slot.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button
                    variant="outline"
                    onClick={() => addTimeSlot(dayIndex)}
                    className="w-full border-dashed border-2 border-gray-300 dark:border-gray-600 hover:border-blue-400 text-gray-600 dark:text-gray-400 hover:text-blue-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Time Slot
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="border-0 rounded-3xl shadow-lg backdrop-blur-lg" style={{
        background: 'rgba(255, 255, 255, 0.08)',
        border: '1px solid rgba(133, 130, 157, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}>
        <CardHeader>
          <CardTitle className="text-lg text-gray-900 dark:text-white">Quick Setup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={() => {
                // Set weekdays 9-5
                const newSchedule = [...schedule];
                newSchedule.slice(0, 5).forEach((day, index) => {
                  newSchedule[index].enabled = true;
                  newSchedule[index].timeSlots = [
                    { id: Date.now().toString() + index, startTime: '09:00', endTime: '17:00', enabled: true }
                  ];
                });
                setSchedule(newSchedule);
                SoundEffects.playClick();
              }}
              className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Weekdays 9-5
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                // Set all days morning slots
                const newSchedule = schedule.map((day, index) => ({
                  ...day,
                  enabled: true,
                  timeSlots: [
                    { id: Date.now().toString() + index, startTime: '10:00', endTime: '12:00', enabled: true }
                  ]
                }));
                setSchedule(newSchedule);
                SoundEffects.playClick();
              }}
              className="hover:bg-green-50 dark:hover:bg-green-900/20"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Morning Slots
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                // Clear all
                initializeDefaultSchedule();
                SoundEffects.playClick();
              }}
              className="hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}