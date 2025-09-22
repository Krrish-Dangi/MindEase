import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  Brain, 
  CalendarCheck, 
  Users, 
  GraduationCap,
  TrendingUp,
  Heart,
  Zap,
  Award,
  Bell
} from 'lucide-react';
import { useAuth } from '../contexts/auth-context';
import { useLanguage } from '../contexts/language-context';
import { useTheme } from '../contexts/theme-context';
import { MoodRating } from './mood-rating';
import { SoundEffects } from './sound-effects';

// Assuming you have a BookingSystem component to import
import { BookingSystem } from './booking-system';

export function DashboardHome() {
  const { user, isGuest } = useAuth();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  
  // New state to manage the booking modal visibility
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const quickActions = [
    {
      icon: Brain,
      title: t('dashboard.actions.aiChat'),
      description: 'Get instant support and coping strategies',
      gradient: 'linear-gradient(135deg, rgba(147, 197, 253, 0.8) 0%, rgba(59, 130, 246, 0.9) 50%, rgba(37, 99, 235, 0.8) 100%)',
      symbol: '✦',
      onClick: () => {
        SoundEffects.playClick();
        console.log('AI Chat clicked');
      },
    },
    {
      icon: CalendarCheck,
      title: t('dashboard.actions.bookSession'),
      description: isGuest ? 'Sign up to book counsellor sessions' : 'Schedule with a verified counsellor',
      gradient: 'linear-gradient(135deg, rgba(134, 239, 172, 0.8) 0%, rgba(34, 197, 94, 0.9) 50%, rgba(21, 128, 61, 0.8) 100%)',
      symbol: '✧',
      onClick: () => {
        SoundEffects.playClick();
        // The Fix: Open the booking modal
        setIsBookingModalOpen(true); 
      },
    },
    {
      icon: Users,
      title: t('dashboard.actions.peerForum'),
      description: 'Connect with fellow students',
      gradient: 'linear-gradient(135deg, rgba(196, 181, 253, 0.8) 0%, rgba(139, 92, 246, 0.9) 50%, rgba(109, 40, 217, 0.8) 100%)',
      symbol: '✩',
      onClick: () => {
        SoundEffects.playClick();
        console.log('Peer Forum clicked');
      },
    },
    {
      icon: GraduationCap,
      title: t('dashboard.actions.resources'),
      description: 'Access wellness guides and tools',
      gradient: 'linear-gradient(135deg, rgba(153, 246, 228, 0.8) 0%, rgba(20, 184, 166, 0.9) 50%, rgba(15, 118, 110, 0.8) 100%)',
      symbol: '✪',
      onClick: () => {
        SoundEffects.playClick();
        console.log('Resources clicked');
      },
    }
  ];

  const getUserName = () => {
    if (isGuest) return 'there';
    return user?.firstName || 'there';
  };

  const getWelcomeMessage = () => {
    if (isGuest) {
      return t('dashboard.welcomeAnonymous');
    }
    return t('dashboard.welcome').replace('{name}', getUserName());
  };

  // Mock data for charts and stats
  const moodData = [3, 4, 2, 3, 4, 3, 4]; // Last 7 days
  const stressScore = 6; // Out of 10
  const checkinsThisWeek = 5;
  const wellnessStreak = 3;

  const handleMoodSelect = (mood: number) => {
    SoundEffects.playSuccess();
    setSelectedMood(mood);
  };

  const handleTryBreathing = () => {
    SoundEffects.playBreathing();
  };

  return (
    <div className="space-y-8 relative">

      {/* Guest Welcome Banner */}
      {isGuest && (
        <div className="relative overflow-hidden border p-8 rounded-3xl shadow-2xl backdrop-blur-xl mb-8 mindease-theme-transition" style={{
          background: 'linear-gradient(135deg, rgba(248, 29, 103, 0.1) 0%, rgba(66, 92, 169, 0.08) 50%, rgba(213, 166, 114, 0.06) 100%)',
          borderColor: 'rgba(248, 29, 103, 0.3)',
          boxShadow: '0 20px 40px rgba(248, 29, 103, 0.1), 0 0 80px rgba(248, 29, 103, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}>
          {/* Animated background elements */}
          <div className="absolute top-2 right-2 w-16 h-16 rounded-full opacity-20 animate-bounce" style={{
            background: 'radial-gradient(circle, rgba(248, 29, 103, 0.6) 0%, transparent 70%)',
            animationDelay: '1s'
          }}></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div>
              <h3 className={`text-2xl font-bold mb-3 mindease-theme-transition ${
                theme === 'light'
                  ? 'text-orange-800'
                  : 'text-white'
              }`}>
                ✦ Welcome to MindEase Guest Mode!
              </h3>
              <p className={`text-sm mb-4 leading-relaxed mindease-theme-transition ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                You're exploring MindEase anonymously. Create an account to unlock all features and save your progress.
              </p>
              <Button 
                className="px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(248, 29, 103, 0.8) 0%, rgba(66, 92, 169, 0.9) 100%)',
                  color: 'white'
                }}
                onClick={() => SoundEffects.playClick()}
              >
                Sign Up for Full Access ✦
              </Button>
            </div>
            <div className="text-6xl opacity-30 animate-pulse">✧</div>
          </div>
        </div>
      )}

      {/* Dynamic Header with Floating Elements */}
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
        {/* Floating gradient orbs */}
        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20 animate-pulse" style={{
          background: theme === 'light'
            ? 'radial-gradient(circle, rgba(234, 88, 12, 0.6) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(213, 166, 114, 0.8) 0%, transparent 70%)'
        }}></div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full opacity-15 animate-pulse" style={{
          background: theme === 'light'
            ? 'radial-gradient(circle, rgba(249, 115, 22, 0.5) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(147, 197, 253, 0.6) 0%, transparent 70%)',
          animationDelay: '2s'
        }}></div>
        
        <h2 className={`text-4xl font-bold mb-6 relative z-10 mindease-theme-transition ${
          theme === 'light' ? 'text-orange-900' : 'text-white'
        }`}>
          {getWelcomeMessage()}
        </h2>
        
        {/* Enhanced Mood Tracker with Better Visual Appeal */}
        <div className="relative z-10">
          <MoodRating 
            onMoodSelect={handleMoodSelect}
            selectedMood={selectedMood}
          />
        </div>
      </div>

      {/* Wellness Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6 relative z-10">
        {/* Mood Trends */}
        <Card className="border-0 group rounded-3xl shadow-lg backdrop-blur-lg" style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(133, 130, 157, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center mr-3" style={{ background: 'var(--mindease-gradient-primary)' }}>
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-gray-900 dark:text-white">{t('dashboard.wellness.moodTrends')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300">This week</span>
                <Badge className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700">Improving ✧</Badge>
              </div>
              <div className="h-16 flex items-end justify-between space-x-2">
                {moodData.map((mood, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-lg transition-all duration-300 hover:opacity-80"
                    style={{
                      height: `${(mood / 5) * 100}%`,
                      background: 'var(--mindease-gradient-primary)',
                      minHeight: '12px'
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                <span>Mon</span>
                <span>Sun</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stress Score */}
        <Card className="border-0 group rounded-3xl shadow-lg backdrop-blur-lg" style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(133, 130, 157, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center mr-3" style={{ background: 'linear-gradient(135deg, var(--mindease-secondary), var(--mindease-tertiary))' }}>
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-gray-900 dark:text-white">{t('dashboard.wellness.stressScore')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 dark:text-white">{stressScore}/10</div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Moderate stress level</p>
              </div>
              <Progress value={stressScore * 10} className="h-3" />
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Lower than last week (-1.2) ✦
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Daily Tip */}
        <Card className="border-0 group rounded-3xl shadow-lg backdrop-blur-lg" style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(133, 130, 157, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center mr-3" style={{ background: 'var(--mindease-gradient-warm)' }}>
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-gray-900 dark:text-white">{t('dashboard.wellness.dailyTip')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {t('dashboard.wellness.tip')}
              </p>
              <Button 
                className="mindease-button text-white hover:scale-105 transition-all duration-300"
                onClick={handleTryBreathing}
              >
                Try it now ✧
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="relative z-10">
        <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">{t('dashboard.actions.title')}</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Card 
              key={index}
              className="border-0 hover:-translate-y-2 transition-all duration-500 cursor-pointer group rounded-3xl shadow-lg hover:shadow-xl backdrop-blur-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(133, 130, 157, 0.3)',
                animationDelay: `${index * 0.2}s`,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
              onClick={action.onClick}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                      style={{ background: action.gradient }}>
                  <action.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-medium mb-2 group-hover:scale-105 transition-transform duration-300 text-gray-900 dark:text-white">
                  {action.title} <span className="text-yellow-500">{action.symbol}</span>
                </h4>
                <p className="text-xs text-gray-700 dark:text-gray-300">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Progress & Insights */}
      <div className="grid md:grid-cols-2 gap-6 relative z-10">
        {/* Progress */}
        <Card className="border-0 rounded-3xl shadow-lg backdrop-blur-lg" style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(133, 130, 157, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center mr-3" style={{ background: 'var(--mindease-gradient-primary)' }}>
                <Award className="h-5 w-5 text-white" />
              </div>
              <span className="text-gray-900 dark:text-white">{t('dashboard.progress.title')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('dashboard.progress.checkins')}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{checkinsThisWeek}/7</p>
              </div>
              <div className="text-right">
                <Progress value={(checkinsThisWeek / 7) * 100} className="w-24 h-3" />
              </div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-2xl">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">✦</span>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{t('dashboard.progress.streak')}</p>
                  <p className="text-xs text-gray-700 dark:text-gray-300">{wellnessStreak} days strong! ✧</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-0 rounded-3xl shadow-lg backdrop-blur-lg" style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(133, 130, 157, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center mr-3" style={{ background: 'linear-gradient(135deg, var(--mindease-secondary), var(--mindease-tertiary))' }}>
                <Bell className="h-5 w-5 text-white" />
              </div>
              <span className="text-gray-900 dark:text-white">{t('dashboard.notifications.title')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border-l-4 rounded-r-2xl bg-blue-50 dark:bg-blue-900/20 border-blue-400 dark:border-blue-600">
              <p className="text-sm text-gray-900 dark:text-white">{t('dashboard.notifications.workshop')} ✧</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">2 hours ago</p>
            </div>
            
            <div className="p-4 border-l-4 rounded-r-2xl bg-green-50 dark:bg-green-900/20 border-green-400 dark:border-green-600">
              <p className="text-sm text-gray-900 dark:text-white">New peer support group starting Monday ✩</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">1 day ago</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="text-center py-6 relative z-10">
        <p className="text-xs text-gray-600 dark:text-gray-400">{t('dashboard.notifications.confidential')} ✦</p>
      </div>
      
      {/* Booking System Modal */}
      {isBookingModalOpen && (
        <BookingSystem />
      )}
    </div>
  );
}