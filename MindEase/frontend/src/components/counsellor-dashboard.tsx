import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { 
  Calendar, 
  Clock, 
  Users, 
  Star,
  TrendingUp,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Activity
} from 'lucide-react';
import { useAuth } from '../contexts/auth-context';
import { useTheme } from '../contexts/theme-context';
import { SoundEffects } from './sound-effects';
import { BookingSystem } from './booking-system';


interface Appointment {
  id: string;
  studentName: string;
  date: string;
  time: string;
  type: 'video' | 'chat' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled';
  reason: string;
}

interface AvailabilitySlot {
  day: string;
  timeSlots: string[];
  enabled: boolean;
}

export function CounsellorDashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [isOnline, setIsOnline] = useState(true);
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [weeklyStats, setWeeklyStats] = useState({
    totalSessions: 0,
    completedSessions: 0,
    avgRating: 0,
    studentsHelped: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    fetchCounsellorData();
  }, []);

  const fetchCounsellorData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch today's appointments
      const appointmentsRes = await fetch(`http://localhost:5000/api/counsellors/appointments/today/${user?.id}`);
      if (appointmentsRes.ok) {
        const appointments = await appointmentsRes.json();
        setTodayAppointments(appointments);
      }
      
      // Fetch weekly stats
      const statsRes = await fetch(`http://localhost:5000/api/counsellors/stats/${user?.id}`);
      if (statsRes.ok) {
        const stats = await statsRes.json();
        setWeeklyStats(stats);
      }
      
      // Fetch current status
      const statusRes = await fetch(`http://localhost:5000/api/counsellors/status/${user?.id}`);
      if (statusRes.ok) {
        const status = await statusRes.json();
        setIsOnline(status.isOnline);
      }
      
    } catch (error) {
      console.error('Error fetching counsellor data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateAvailabilityStatus = async (online: boolean) => {
    try {
      const response = await fetch(`http://localhost:5000/api/counsellors/status/${user?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isOnline: online })
      });
      
      if (response.ok) {
        setIsOnline(online);
        SoundEffects.playSuccess();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getUserName = () => {
    return user?.firstName || 'Counsellor';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300';
      case 'completed': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return '📹';
      case 'chat': return '💬';
      case 'in-person': return '🏢';
      default: return '📅';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96 relative mindease-subtle-stars">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 relative mindease-subtle-stars">
      {/* Welcome Header */}
      <div className="relative overflow-hidden border p-8 rounded-3xl shadow-2xl backdrop-blur-xl mindease-theme-transition" style={{
        background: theme === 'light'
          ? 'linear-gradient(135deg, rgba(255, 251, 245, 0.9) 0%, rgba(254, 215, 170, 0.8) 50%, rgba(253, 230, 138, 0.7) 100%)'
          : 'linear-gradient(135deg, rgba(30, 63, 145, 0.15) 0%, rgba(66, 92, 169, 0.12) 50%, rgba(213, 166, 114, 0.08) 100%)',
        borderColor: theme === 'light'
          ? 'rgba(254, 215, 170, 0.6)'
          : 'rgba(133, 130, 157, 0.4)',
        boxShadow: theme === 'light'
          ? '0 20px 40px rgba(234, 88, 12, 0.15), 0 0 80px rgba(249, 115, 22, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
          : '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 80px rgba(30, 63, 145, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-4xl font-bold mb-2 mindease-theme-transition ${
              theme === 'light' ? 'text-orange-900' : 'text-white'
            }`}>
              Welcome back, Dr. {getUserName()}! 👋
            </h2>
            <p className={`text-lg mindease-theme-transition ${
              theme === 'light' ? 'text-orange-700' : 'text-gray-300'
            }`}>
              Ready to make a difference in students' lives today?
            </p>
          </div>
          
          {/* Online/Offline Toggle */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                Status
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`text-sm ${isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                  {isOnline ? 'Available' : 'Offline'}
                </span>
                <Switch
                  checked={isOnline}
                  onCheckedChange={updateAvailabilityStatus}
                  className="data-[state=checked]:bg-green-500"
                />
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'} animate-pulse`} />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 relative z-10">
        <Card className="border-0 rounded-3xl shadow-lg backdrop-blur-lg" style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(133, 130, 157, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Today's Sessions</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{todayAppointments.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 rounded-3xl shadow-lg backdrop-blur-lg" style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(133, 130, 157, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">This Week</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{weeklyStats.completedSessions}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 rounded-3xl shadow-lg backdrop-blur-lg" style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(133, 130, 157, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{weeklyStats.avgRating.toFixed(1)}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500 fill-current" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 rounded-3xl shadow-lg backdrop-blur-lg" style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(133, 130, 157, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Students Helped</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{weeklyStats.studentsHelped}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Appointments */}
      <Card className="border-0 rounded-3xl shadow-lg backdrop-blur-lg" style={{
        background: 'rgba(255, 255, 255, 0.08)',
        border: '1px solid rgba(133, 130, 157, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Clock className="h-5 w-5 mr-3 text-blue-500" />
            <span className="text-gray-900 dark:text-white">Today's Schedule</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {todayAppointments.length > 0 ? (
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div key={appointment.id} className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{getTypeIcon(appointment.type)}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{appointment.studentName}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.reason}</p>
                        <p className="text-xs text-gray-500">{appointment.time}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No appointments scheduled for today</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Enjoy your free time! ✨</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 relative z-10">
        <Card className="border-0 hover:-translate-y-2 transition-all duration-500 cursor-pointer group rounded-3xl shadow-lg hover:shadow-xl backdrop-blur-lg" style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(133, 130, 157, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }} onClick={() => SoundEffects.playClick()}>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                  style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(37, 99, 235, 0.9) 100%)' }}>
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-medium mb-2 group-hover:scale-105 transition-transform duration-300 text-gray-900 dark:text-white">
              Set Availability ✧
            </h4>
            <p className="text-xs text-gray-700 dark:text-gray-300">Manage your schedule and time slots</p>
          </CardContent>
        </Card>

        <Card className="border-0 hover:-translate-y-2 transition-all duration-500 cursor-pointer group rounded-3xl shadow-lg hover:shadow-xl backdrop-blur-lg" style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(133, 130, 157, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }} onClick={() => SoundEffects.playClick()}>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                  style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.8) 0%, rgba(21, 128, 61, 0.9) 100%)' }}>
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-medium mb-2 group-hover:scale-105 transition-transform duration-300 text-gray-900 dark:text-white">
              Student Messages ✩
            </h4>
            <p className="text-xs text-gray-700 dark:text-gray-300">Check messages from your students</p>
          </CardContent>
        </Card>

        <Card className="border-0 hover:-translate-y-2 transition-all duration-500 cursor-pointer group rounded-3xl shadow-lg hover:shadow-xl backdrop-blur-lg" style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(133, 130, 157, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }} onClick={() => SoundEffects.playClick()}>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                  style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.8) 0%, rgba(109, 40, 217, 0.9) 100%)' }}>
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-medium mb-2 group-hover:scale-105 transition-transform duration-300 text-gray-900 dark:text-white">
              View Analytics ✪
            </h4>
            <p className="text-xs text-gray-700 dark:text-gray-300">Track your impact and session metrics</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 rounded-3xl shadow-lg backdrop-blur-lg" style={{
        background: 'rgba(255, 255, 255, 0.08)',
        border: '1px solid rgba(133, 130, 157, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Activity className="h-5 w-5 mr-3 text-green-500" />
            <span className="text-gray-900 dark:text-white">Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Session completed with Raj Kumar</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">2 hours ago • Anxiety Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">New appointment request from Priya Singh</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">4 hours ago • Academic Stress</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Availability updated for this week</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center py-6 relative z-10">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Thank you for making a difference in students' mental health journey ✦
        </p>
      </div>

      {/* Booking System Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 bg-gray-950/90 border border-gray-800 shadow-2xl">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors" onClick={() => setIsBookingModalOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <BookingSystem />
          </div>
        </div>
      )}
    </div>
  );
}