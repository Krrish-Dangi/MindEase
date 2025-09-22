import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Calendar, 
  Clock, 
  User, 
  Video,
  MessageSquare,
  MapPin,
  Phone,
  Mail,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../contexts/auth-context';
import { useTheme } from '../contexts/theme-context';
import { SoundEffects } from './sound-effects';

interface Student {
  id: string;
  name: string;
  email: string;
  college: string;
  year: string;
}

interface Appointment {
  id: string;
  student: Student;
  date: string;
  time: string;
  type: 'video' | 'chat' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  reason: string;
  notes?: string;
  sessionDuration: number;
}

export function CounsellorAppointments() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'today' | 'upcoming' | 'completed'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, [user]); // user dependency add kiya hai taaki user login hone par appointments fetch ho

  const fetchAppointments = async () => {
    // Check karein ki user logged in hai ya nahi
    if (!user?.id) {
        setIsLoading(false);
        return;
    }

    try {
      setIsLoading(true);
      // Yahan URL ko `counsellors/appointments` se `counsellors/appointments` mein badal diya hai
      const response = await fetch(`http://localhost:5000/api/counsellors/appointments/${user.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateAppointmentStatus = async (appointmentId: string, status: string) => {
    try {
      SoundEffects.playClick();
      // Yahan bhi URL ko `counsellor/appointments` se `counsellors/appointments` mein badal diya hai
      const response = await fetch(`http://localhost:5000/api/counsellors/appointments/${appointmentId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        // Update local state
        setAppointments(prev => 
          prev.map(apt => 
            apt.id === appointmentId 
              ? { ...apt, status: status as any }
              : apt
          )
        );
        SoundEffects.playSuccess();
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300';
      case 'completed': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300';
      case 'no-show': return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'chat': return <MessageSquare className="h-4 w-4" />;
      case 'in-person': return <MapPin className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'no-show': return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default: return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    const today = new Date().toISOString().split('T')[0];
    const aptDate = apt.date;
    
    switch (selectedFilter) {
      case 'today': return aptDate === today;
      case 'upcoming': return aptDate >= today && apt.status === 'scheduled';
      case 'completed': return apt.status === 'completed';
      default: return true;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96 relative mindease-subtle-stars">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading appointments...</p>
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
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'var(--mindease-gradient-primary)' }}>
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">My Appointments ✨</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Manage your student sessions</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-4 relative z-10">
        {[
          { id: 'all', label: 'All', count: appointments.length },
          { id: 'today', label: 'Today', count: appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length },
          { id: 'upcoming', label: 'Upcoming', count: appointments.filter(a => a.date >= new Date().toISOString().split('T')[0] && a.status === 'scheduled').length },
          { id: 'completed', label: 'Completed', count: appointments.filter(a => a.status === 'completed').length }
        ].map((filter) => (
          <Button
            key={filter.id}
            variant={selectedFilter === filter.id ? "default" : "outline"}
            onClick={() => {
              setSelectedFilter(filter.id as any);
              SoundEffects.playClick();
            }}
            className={`${
              selectedFilter === filter.id 
                ? 'mindease-button text-white' 
                : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
            } transition-all duration-300`}
          >
            {filter.label} ({filter.count})
          </Button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="space-y-4 relative z-10">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <Card key={appointment.id} className="border-0 rounded-3xl shadow-lg backdrop-blur-lg hover:shadow-xl transition-all duration-300" style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(133, 130, 157, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="text-sm font-medium bg-blue-500 text-white">
                        {appointment.student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                          {appointment.student.name}
                        </h3>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(appointment.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(appointment.type)}
                          <span className="capitalize">{appointment.type}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>{appointment.student.college}</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg mb-4">
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Reason for session:</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{appointment.reason}</p>
                      </div>
                      
                      {appointment.notes && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                          <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Session Notes:</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{appointment.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    {getStatusIcon(appointment.status)}
                    
                    {appointment.status === 'scheduled' && (
                      <div className="flex flex-col space-y-2">
                        <Button
                          size="sm"
                          onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Complete
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateAppointmentStatus(appointment.id, 'no-show')}
                          className="border-orange-300 text-orange-600 hover:bg-orange-50"
                        >
                          <AlertCircle className="h-4 w-4 mr-1" />
                          No Show
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Cancel Appointment
                        </Button>
                      </div>
                    )}
                    
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" variant="outline" className="hover:bg-blue-50">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="hover:bg-blue-50">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="hover:bg-blue-50">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="border-0 rounded-3xl shadow-lg backdrop-blur-lg" style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(133, 130, 157, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}>
            <CardContent className="p-12 text-center">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No appointments found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedFilter === 'all' 
                  ? "You don't have any appointments yet."
                  : `No ${selectedFilter} appointments found.`
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
