import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Star, MapPin, Video, MessageSquare, Loader2 } from 'lucide-react';

// --- Helper Components (to replace imports) ---
const Card = ({ className, style, children }: { className?: string; style?: React.CSSProperties; children: React.ReactNode }) => (
  <div className={className} style={style}>{children}</div>
);

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6">{children}</div>
);

const CardTitle = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
);

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 pt-0">{children}</div>
);

const Button = ({ className, variant, size, disabled, onClick, children, ...props }: { 
  className?: string; 
  variant?: 'default' | 'outline';
  size?: 'sm' | 'default';
  disabled?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variantClasses = variant === 'outline' 
    ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
    : "bg-primary text-primary-foreground hover:bg-primary/90";

  const sizeClasses = size === 'sm' ? "h-9 px-3" : "h-10 px-4 py-2";

  return (
    <button className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`} disabled={disabled} onClick={onClick} {...props}>
      {children}
    </button>
  );
};


const Badge = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
    {children}
  </div>
);

const Avatar = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>{children}</div>
);

const AvatarFallback = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <span className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`}>{children}</span>
);

// Mock SoundEffects object to prevent crashes
const SoundEffects = {
  playClick: () => {},
  playSuccess: () => {},
};

// --- Main Component ---

interface counsellor {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  experience: string;
  languages: string[];
  availability: 'available' | 'busy' | 'offline';
  location: string;
  sessionTypes: ('video' | 'chat' | 'in-person')[];
  nextSlot?: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

// Appointment interface ko backend ke naye response ke hisab se update kiya
interface Appointment {
  _id: string;
  counsellorId: {
    _id: {
      _id: string;
      name: string;
    };
    specialization: string;
  };
  date: string;
  time: string;
  reason: string;
  status: string;
}

export function BookingSystem() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedcounsellor, setSelectedcounsellor] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  
  const [counsellors, setcounsellors] = useState<counsellor[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  // Nayi state: booked appointments ke liye
  const [bookedAppointments, setBookedAppointments] = useState<Appointment[]>([]);
  
  const [isLoadingcounsellors, setIsLoadingcounsellors] = useState(true);
  const [isLoadingSlots, setIsLoadingSlots] = useState(true);
  // Nayi state: booked appointments loading ke liye
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchcounsellors = async () => {
      try {
        setIsLoadingcounsellors(true);
        const res = await fetch("http://localhost:5000/api/counsellors");
        if (!res.ok) throw new Error("Failed to fetch counsellors");
        const data = await res.json();
        setcounsellors(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        console.error("Fetch counsellors Error:", err);
      } finally {
        setIsLoadingcounsellors(false);
      }
    };
    fetchcounsellors();
  }, []);

  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        setIsLoadingSlots(true);
        const dateString = selectedDate.toISOString().split("T")[0];
        const res = await fetch(`http://localhost:5000/api/appointments/slots?date=${dateString}`);
        if (!res.ok) throw new Error("Failed to fetch time slots");
        const data = await res.json();
        setTimeSlots(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        console.error("Fetch Slots Error:", err);
      } finally {
        setIsLoadingSlots(false);
      }
    };
    fetchTimeSlots();
  }, [selectedDate]);

  // Naya useEffect: Student ki appointments fetch karne ke liye
  useEffect(() => {
    const fetchBookedAppointments = async () => {
      if (!loggedInUser.id) return;
      try {
        setIsLoadingAppointments(true);
        const res = await fetch(`http://localhost:5000/api/appointments/student/${loggedInUser.id}`);
        if (!res.ok) throw new Error("Failed to fetch booked appointments");
        const data = await res.json();
        setBookedAppointments(data);
      } catch (err: any) {
        console.error("Fetch booked appointments Error:", err);
      } finally {
        setIsLoadingAppointments(false);
      }
    };
    fetchBookedAppointments();
  }, [loggedInUser.id]);

  const handleDateSelect = (date: Date) => {
    SoundEffects.playClick();
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handlecounsellorSelect = (counsellorId: string) => {
    SoundEffects.playClick();
    setSelectedcounsellor(selectedcounsellor === counsellorId ? null : counsellorId);
  };

  const handleTimeSlotSelect = (time: string) => {
    SoundEffects.playClick();
    setSelectedTimeSlot(time);
  };

  const handleBookNow = async (counsellorId: string) => {
    SoundEffects.playSuccess();
    if (!loggedInUser.id) {
       alert("You must be logged in to book an appointment.");
       return;
    }
    if (!selectedTimeSlot) {
      alert("Please select a time slot first.");
      return;
    }
    
    try {
      const res = await fetch("http://localhost:5000/api/appointments/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: loggedInUser.id,
          counsellorId,
          date: selectedDate.toISOString().split("T")[0],
          time: selectedTimeSlot,
          mode: "video",
          language: "en",
          reason: "Exam stress",
          college: loggedInUser.college
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      alert("✅ Appointment booked successfully!");
      // Appointments list ko dobara fetch karein
      const bookedRes = await fetch(`http://localhost:5000/api/appointments/student/${loggedInUser.id}`);
      const updatedBooked = await bookedRes.json();
      setBookedAppointments(updatedBooked);
      
      // Slots list ko dobara fetch karein
      const dateString = selectedDate.toISOString().split("T")[0];
      const slotsRes = await fetch(`http://localhost:5000/api/appointments/slots?date=${dateString}`);
      const updatedSlots = await slotsRes.json();
      setTimeSlots(updatedSlots);
      
      setSelectedTimeSlot(null);
    } catch (err: any) {
      alert("❌ Booking failed: " + err.message);
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700';
      case 'busy': return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700';
      case 'offline': return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'chat': return <MessageSquare className="h-4 w-4" />;
      case 'in-person': return <MapPin className="h-4 w-4" />;
      default: return null;
    }
  };

  const generateCalendarDays = () => {
    const now = new Date();
    const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const dateUTC = new Date(Date.UTC(currentYear, currentMonth, i));
      const isToday = dateUTC.getTime() === today.getTime();
      const isSelected = date.toDateString() === selectedDate.toDateString();
      const isPast = dateUTC < today;
      days.push({ date, day: i, isToday, isSelected, isPast, isAvailable: !isPast });
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-8 relative mindease-subtle-stars">
      <div className="border p-6 rounded-3xl shadow-lg backdrop-blur-lg relative z-10" style={{ background: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(133, 130, 157, 0.3)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)' }}>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'var(--mindease-gradient-primary)' }}>
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Booking System ✨</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Schedule your session with verified counsellors</p>
          </div>
        </div>
      </div>
      
      {/* New section: Booked Appointments */}
      <div className="relative z-10">
        <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">My Booked Appointments ✦</h3>
        <Card className="border-0 rounded-3xl shadow-lg backdrop-blur-lg" style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(133, 130, 157, 0.3)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)' }}>
          <CardContent>
            {isLoadingAppointments ? (
              <div className="flex justify-center items-center h-24">
                <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
              </div>
            ) : bookedAppointments.length > 0 ? (
              <div className="space-y-4">
                {bookedAppointments.map((appointment) => (
                  <div key={appointment._id} className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/30 dark:bg-gray-800/30">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                          {appointment.counsellorId && typeof appointment.counsellorId === 'object' && appointment.counsellorId._id && typeof appointment.counsellorId._id === 'object' && appointment.counsellorId._id.name
                            ? appointment.counsellorId._id.name
                            : appointment.counsellorId && typeof appointment.counsellorId === 'object' && appointment.counsellorId.name
                            ? appointment.counsellorId.name
                            : typeof appointment.counsellorId === 'string'
                            ? appointment.counsellorId
                            : "Unknown Counsellor"}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {appointment.counsellorId && typeof appointment.counsellorId === 'object' && 'specialization' in appointment.counsellorId ? appointment.counsellorId.specialization : ""}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-2">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(appointment.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                        {appointment.status === 'scheduled' && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50 mt-2"
                            onClick={async () => {
                              try {
                                const res = await fetch(`http://localhost:5000/api/counsellors/appointments/${appointment._id}/status`, {
                                  method: 'PUT',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ status: 'cancelled' })
                                });
                                if (res.ok) {
                                  setBookedAppointments(prev => prev.map(a => a._id === appointment._id ? { ...a, status: 'cancelled' } : a));
                                  SoundEffects.playSuccess();
                                }
                              } catch (err) {
                                alert('Failed to cancel appointment');
                              }
                            }}
                          >
                            Cancel Appointment
                          </Button>
                        )}
                      </div>
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300">{appointment.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                <p>You have no appointments booked yet.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 relative z-10">
        <div className="lg:col-span-1">
          <Card className="border-0 rounded-3xl shadow-lg backdrop-blur-lg" style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(133, 130, 157, 0.3)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)' }}>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Calendar className="h-5 w-5 mr-3 text-blue-500" />
                <span className="text-gray-900 dark:text-white">Select Date</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">{selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
                </div>
                <div className="grid grid-cols-7 gap-2 text-xs">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (<div key={day} className="text-center text-gray-500 dark:text-gray-400 font-medium py-2">{day}</div>))}
                  {calendarDays.map((cal, index) => (<button key={index} onClick={() => cal.isAvailable && !cal.isPast && handleDateSelect(cal.date)} disabled={cal.isPast || !cal.isAvailable} className={`aspect-square rounded-lg text-sm transition-all duration-200 ${cal.isSelected ? 'mindease-button text-white scale-105' : cal.isToday ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-300' : cal.isPast || !cal.isAvailable ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>{cal.day}</button>))}
                </div>
              </div>
            </CardContent>
          </Card>
          {selectedDate && (
            <Card className="border-0 rounded-3xl shadow-lg backdrop-blur-lg mt-6" style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(133, 130, 157, 0.3)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)' }}>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Clock className="h-5 w-5 mr-3 text-green-500" />
                  <span className="text-gray-900 dark:text-white">Available Times</span>
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
              </CardHeader>
              <CardContent>
                {isLoadingSlots ? (<div className="flex justify-center items-center h-24"><Loader2 className="h-6 w-6 animate-spin text-blue-500" /></div>) : (
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.length > 0 ? timeSlots.map((slot, index) => (<Button key={index} variant={selectedTimeSlot === slot.time ? "default" : "outline"} size="sm" disabled={!slot.available} onClick={() => slot.available && handleTimeSlotSelect(slot.time)} className={`justify-center transition-all duration-300 ${selectedTimeSlot === slot.time ? 'mindease-button text-white' : slot.available ? 'hover:scale-105 border-gray-300 dark:border-gray-600 hover:border-blue-400' : 'opacity-50 cursor-not-allowed'}`}>{slot.time}</Button>)) : <p className='text-sm text-gray-500 col-span-2 text-center'>No slots available for this day.</p>}
                  </div>)}
              </CardContent>
            </Card>
          )}
        </div>
        <div className="lg:col-span-2">
          <Card className="border-0 rounded-3xl shadow-lg backdrop-blur-lg" style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(133, 130, 157, 0.3)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)' }}>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <User className="h-5 w-5 mr-3 text-purple-500" />
                <span className="text-gray-900 dark:text-white">Available counsellors</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
             {isLoadingcounsellors ? (<div className="flex justify-center items-center h-48"><Loader2 className="h-8 w-8 animate-spin text-purple-500" /></div>) : (
                <div className="space-y-6">
                {counsellors.map((counsellor) => (
                  <div key={counsellor.id} className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer hover:shadow-lg ${selectedcounsellor === counsellor.id ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-600' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`} onClick={() => handlecounsellorSelect(counsellor.id)}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarFallback className="text-sm font-medium mindease-gradient-primary text-white">{counsellor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{counsellor.name}</h3>
                            <Badge className={getAvailabilityColor(counsellor.availability)}>{counsellor.availability}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{counsellor.specialization}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-1"><Star className="h-4 w-4 text-yellow-400 fill-current" /><span>{counsellor.rating}</span></div>
                            <span>•</span><span>{counsellor.experience}</span><span>•</span><span>{counsellor.location}</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            {counsellor.sessionTypes.map((type, index) => (<div key={index} className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg">{getSessionTypeIcon(type)}<span className="text-xs capitalize text-gray-600 dark:text-gray-300">{type}</span></div>))}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {counsellor.languages.map((lang, index) => (<Badge key={index} variant="outline" className="text-xs border-gray-300 text-gray-600">{lang}</Badge>))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Next available:</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{counsellor.nextSlot}</p>
                        <Button className="mt-4 mindease-button text-white hover:scale-105 transition-all duration-300" onClick={(e) => { e.stopPropagation(); handleBookNow(counsellor.id); }} disabled={!selectedTimeSlot || !selectedcounsellor || selectedcounsellor !== counsellor.id || counsellor.availability === 'offline'}>Book Now ✨</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
             )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
