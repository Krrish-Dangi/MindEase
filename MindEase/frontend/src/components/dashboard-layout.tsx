import { useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  Home,
  Brain,
  Users,
  GraduationCap,
  LogOut,
  Menu,
  Settings,
  Globe,
  Phone,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Sun,
  Moon,
  Clock,
  BookOpen,
  Thermometer
} from 'lucide-react';
import { useAuth } from '../contexts/auth-context';
import { useLanguage } from '../contexts/language-context';
import { useTheme } from '../contexts/theme-context';
import { SoundEffects } from './sound-effects';
import { useNavigate } from "react-router-dom";




interface SidebarItem {
  id: string;
  label: string;
  icon: any;
  symbol: string;
  color?: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

export function DashboardLayout({ children, currentPage = 'dashboard' }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Inside the DashboardLayout component function
const { user, logout, isGuest } = useAuth();
const { t, currentLanguage, setLanguage } = useLanguage();
const { theme, toggleTheme } = useTheme();
const navigate = useNavigate();

// Define a list of sidebar items for students
const studentSidebarItems: SidebarItem[] = [
  { id: 'dashboard', label: t('dashboard.sidebar.dashboard'), icon: Home, symbol: '✦' },
  { id: 'medical-analysis', label: 'Medical Analysis', icon: Thermometer, symbol: '🩺' },
  { id: 'history-analysis', label: 'History Analysis', icon: BookOpen, symbol: '📋' },
  { id: 'booking', label: 'Booking System', icon: Calendar, symbol: '✨' },
  { id: 'ai', label: t('dashboard.sidebar.ai'), icon: Brain, symbol: '✧' },
  { id: 'p2p', label: 'Peer Support', icon: Users, symbol: '◎' },
  { id: 'resources', label: 'Resource Hub', icon: GraduationCap, symbol: '⚡︎' },
  { id: 'settings', label: 'Settings', icon: Settings, symbol: '⚙︎' },
];

// Define a list of sidebar items for counsellors
const counsellorSidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, symbol: '✦' },
  { id: 'appointments', label: 'My Appointments', icon: Calendar, symbol: '✨' },
  { id: 'availability', label: 'Manage Availability', icon: Clock, symbol: '✧' },
  { id: 'students', label: 'Student Resources', icon: BookOpen, symbol: '◎' },
  { id: 'settings', label: 'Settings', icon: Settings, symbol: '⚙︎' },
];

// Conditionally choose which array to use
const sidebarItems = user?.userType === 'counsellor' ? counsellorSidebarItems : studentSidebarItems;

  const languages = [
    { code: 'en', name: 'English', flag: '✦' },
    { code: 'hi', name: 'हिंदी', flag: '✧' },
    { code: 'ks', name: 'کٲشُر', flag: '✩' }
  ];


const getUserDisplayName = () => {
  if (isGuest || !user) return 'Guest User';
  return `${user.firstName} ${user.lastName}`.trim() || user.username || 'User';
};

const getUserUsername = () => {
  if (isGuest || !user) return 'guest';
  return user.username ?? 'user';
};

const getUserInitials = () => {
  if (isGuest || !user) return 'GU';
  return (user.firstName?.[0] ?? user.username?.[0] ?? 'G') +
         (user.lastName?.[0] ?? user.username?.[1] ?? 'U');
};


  const handleLanguageToggle = () => {
    SoundEffects.playClick();
    const currentIndex = languages.findIndex(l => l.code === currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex].code as any);
  };

  const handleThemeToggle = () => {
    SoundEffects.playClick();
    toggleTheme();
  };

  const handleLogout = () => {
    SoundEffects.playClick();
    // Navigate to home and logout
    window.history.pushState({}, '', '/');
    logout();
  };

  const navigateToPage = (pageId: string) => {
    SoundEffects.playClick();
    // Map page IDs to URL paths
    const pageRoutes: { [key: string]: string } = {
      'dashboard': '/dashboard',
      'medical-analysis': '/medical-analysis',
      'history-analysis': '/history-analysis',
      'ai': '/ai-support',
      'booking': '/booking',
      'p2p': '/peer-forum',
      'resources': '/resource-hub',
      'settings': '/settings'
    };
    const route = pageRoutes[pageId] || '/dashboard';
    window.history.pushState({}, '', route);
    // Trigger a custom event to handle navigation
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page: pageId } }));
  };

  return (
    <div className="flex h-screen relative overflow-hidden mindease-theme-transition" style={{ 
      background: theme === 'light' 
        ? 'linear-gradient(135deg, #fef7ed 0%, #fed7aa 25%, #fbbf24 50%, #f97316 75%, #ea580c 100%)' 
        : 'linear-gradient(135deg, #0f1419 0%, #1a1b2e 25%, #16213e 50%, #1e3f91 100%)'
    }}>
      {/* Enhanced Dashboard Star Background with Better Vibrancy */}
      <div className="mindease-dashboard-stars"></div>
      
      {/* Multi-layered Animated Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Primary Gradient Flow */}
        <div className="absolute inset-0 opacity-25">
          <div className="mindease-gradient-flow"></div>
        </div>
        
        {/* Secondary Gradient Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className={`w-full h-full ${
            theme === 'light' 
              ? 'bg-gradient-to-br from-orange-400/20 via-transparent to-yellow-300/15' 
              : 'bg-gradient-to-br from-blue-600/20 via-transparent to-yellow-400/15'
          } animate-pulse`}></div>
        </div>
        
        {/* Enhanced Floating Particles with MindEase Colors */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
                background: theme === 'light'
                  ? (i % 4 === 0 ? 'rgba(234, 88, 12, 0.4)' : i % 4 === 1 ? 'rgba(249, 115, 22, 0.3)' : i % 4 === 2 ? 'rgba(251, 191, 36, 0.4)' : 'rgba(220, 38, 38, 0.3)')
                  : (i % 4 === 0 ? 'rgba(213, 166, 114, 0.6)' : i % 4 === 1 ? 'rgba(66, 92, 169, 0.5)' : i % 4 === 2 ? 'rgba(147, 197, 253, 0.4)' : 'rgba(255, 255, 255, 0.3)'),
                opacity: 0.3,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${8 + Math.random() * 15}s`,
                filter: 'blur(0.5px)',
                boxShadow: `0 0 ${3 + Math.random() * 6}px currentColor`
              }}
            />
          ))}
        </div>
        
        {/* Constellation Lines Effect */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000">
          <defs>
            <linearGradient id="constellationGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={theme === 'light' ? 'rgba(234, 88, 12, 0.4)' : 'rgba(213, 166, 114, 0.4)'} />
              <stop offset="50%" stopColor={theme === 'light' ? 'rgba(249, 115, 22, 0.3)' : 'rgba(66, 92, 169, 0.3)'} />
              <stop offset="100%" stopColor={theme === 'light' ? 'rgba(251, 191, 36, 0.2)' : 'rgba(147, 197, 253, 0.2)'} />
            </linearGradient>
          </defs>
          <path d="M200,300 L400,200 L600,350 L800,250" stroke="url(#constellationGrad)" strokeWidth="1" fill="none" opacity="0.3" />
          <path d="M150,600 L350,500 L550,650 L750,550" stroke="url(#constellationGrad)" strokeWidth="1" fill="none" opacity="0.2" />
        </svg>
        
        {/* Enhanced Wave Animation */}
        <div className="absolute inset-0 opacity-15">
          <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
            <defs>
              <linearGradient id="enhancedWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                {theme === 'light' ? (
                  <>
                    <stop offset="0%" stopColor="rgba(234, 88, 12, 0.15)" />
                    <stop offset="35%" stopColor="rgba(249, 115, 22, 0.12)" />
                    <stop offset="70%" stopColor="rgba(251, 191, 36, 0.08)" />
                    <stop offset="100%" stopColor="rgba(253, 230, 138, 0.1)" />
                  </>
                ) : (
                  <>
                    <stop offset="0%" stopColor="rgba(30, 63, 145, 0.15)" />
                    <stop offset="35%" stopColor="rgba(66, 92, 169, 0.12)" />
                    <stop offset="70%" stopColor="rgba(213, 166, 114, 0.08)" />
                    <stop offset="100%" stopColor="rgba(147, 197, 253, 0.1)" />
                  </>
                )}
              </linearGradient>
            </defs>
            <path 
              d="M0,100 Q100,50 200,100 T400,100 L400,400 L0,400 Z" 
              fill="url(#enhancedWaveGrad)"
              className="mindease-wave-flow"
            />
          </svg>
        </div>
      </div>
      
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-30 h-full backdrop-blur-xl border-r transition-all duration-300 shadow-2xl`}
        style={{
          background: theme === 'light'
            ? 'rgba(255,255,255,0.25)'
            : 'rgba(30,63,145,0.12)',
          borderColor: theme === 'light'
            ? 'rgba(254,215,170,0.25)'
            : 'rgba(133,130,157,0.18)',
          boxShadow: theme === 'light'
            ? '0 8px 32px rgba(234,88,12,0.08), 0 0 20px rgba(249,115,22,0.08), inset 0 1px 0 rgba(255,255,255,0.18)'
            : '0 8px 32px rgba(30,63,145,0.12), 0 0 20px rgba(213,166,114,0.08), inset 0 1px 0 rgba(255,255,255,0.08)'
        }}>
        {/* Sidebar Header */}
        <div className={`flex items-center justify-between p-4 border-b ${theme === 'light' ? 'border-orange-200' : 'border-gray-700'}`}>
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-2xl mindease-gradient-primary shadow-lg"></div>
              <span className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>MindEase</span>
            </div>
          )}
          <Button
            onClick={() => {
              SoundEffects.playClick();
              setSidebarCollapsed(!sidebarCollapsed);
            }}
            className={`hidden lg:flex p-2 rounded-xl ${
              theme === 'light' 
                ? 'hover:bg-orange-100 text-gray-600' 
                : 'hover:bg-gray-700 text-gray-400'
            }`}
          >
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* User Profile */}
        <div className={`p-4 border-b ${theme === 'light' ? 'border-orange-200' : 'border-gray-700'}`}>
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="text-sm font-medium mindease-gradient-primary text-white">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            {!sidebarCollapsed && (
              <div>
                <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
  Hi {getUserDisplayName()}
</p>

                <p className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>@{getUserUsername()}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-3">
            {sidebarItems.map((item) => (
              <Button
                key={item.id}
                className={`w-full justify-start ${sidebarCollapsed ? 'px-3' : 'px-4'} py-3 h-auto rounded-xl transition-all duration-300 ${
                  currentPage === item.id 
                    ? 'mindease-button text-white' 
                    : theme === 'light'
                      ? 'bg-white/20 backdrop-blur-md text-gray-700 hover:bg-orange-100'
                      : 'bg-[#1e3f91]/20 backdrop-blur-md text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => navigateToPage(item.id)}
              >
                <item.icon className={`h-5 w-5 ${sidebarCollapsed ? '' : 'mr-3'}`} />
                {!sidebarCollapsed && (
                  <span className="text-sm flex-1 text-left">{item.label}</span>
                )}
                {!sidebarCollapsed && (
                  <span className="text-lg text-yellow-500">{item.symbol}</span>
                )}
              </Button>
            ))}
          </div>
        </nav>

        {/* Logout */}
  <div className={`pt-2 pb-4 px-4 border-t ${theme === 'light' ? 'border-orange-200' : 'border-gray-700'}`} style={{marginBottom: '12px'}}>
          <Button
            onClick={handleLogout}
            className={`w-full justify-start ${sidebarCollapsed ? 'px-3' : 'px-4'} py-3 h-auto rounded-xl hover:bg-red-200/40 transition-all duration-300 text-red-300`}
          >
            <LogOut className={`h-5 w-5 ${sidebarCollapsed ? '' : 'mr-3'}`} />
            {!sidebarCollapsed && <span className="text-sm">{t('dashboard.sidebar.logout')}</span>}
          </Button>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="backdrop-blur-xl border-b px-6 py-4 shadow-2xl mindease-theme-transition" style={{
          background: theme === 'light'
            ? 'rgba(255,255,255,0.25)'
            : 'rgba(30,63,145,0.12)',
          borderColor: theme === 'light'
            ? 'rgba(254,215,170,0.25)'
            : 'rgba(133,130,157,0.18)',
          boxShadow: theme === 'light'
            ? '0 8px 32px rgba(234,88,12,0.08), 0 0 20px rgba(249,115,22,0.08), inset 0 1px 0 rgba(255,255,255,0.18)'
            : '0 8px 32px rgba(30,63,145,0.12), 0 0 20px rgba(213,166,114,0.08), inset 0 1px 0 rgba(255,255,255,0.08)'
        }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => {
                  SoundEffects.playClick();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className={`lg:hidden rounded-xl ${
                  theme === 'light'
                    ? 'bg-white/20 backdrop-blur-md text-gray-600 hover:bg-orange-100'
                    : 'bg-[#1e3f91]/20 backdrop-blur-md text-gray-400 hover:bg-gray-700'
                }`}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className={`text-2xl font-bold ${theme === 'light' ? 'text-black' : 'text-white'}`}>{t('dashboard.title')}</h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <Button
                onClick={handleThemeToggle}
                className={`rounded-xl p-2 ${
                  theme === 'light'
                    ? 'bg-white/20 backdrop-blur-md text-gray-600 hover:bg-orange-100'
                    : 'bg-[#1e3f91]/20 backdrop-blur-md text-gray-400 hover:bg-gray-700'
                }`}
                title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                {theme === 'light' ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>
              
              {/* Language Toggle */}
              <Button 
                className={`flex items-center space-x-2 rounded-xl ${
                  theme === 'light'
                    ? 'bg-white/20 backdrop-blur-md text-gray-600 hover:bg-orange-100'
                    : 'bg-[#1e3f91]/20 backdrop-blur-md text-gray-400 hover:bg-gray-700'
                }`}
                onClick={handleLanguageToggle}
              >
                <Globe className="h-4 w-4" />
                <span className="text-lg">{languages.find(l => l.code === currentLanguage)?.flag}</span>
              </Button>

              {/* Profile */}
              <Avatar className="h-10 w-10 cursor-pointer">
                <AvatarFallback className="text-xs font-medium mindease-gradient-primary text-white">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>

              {/* Emergency Button */}
              <Button 
                className={`rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 px-4 hover:scale-105 ${
                  theme === 'light' ? 'text-white' : 'text-white'
                }`}
                style={{ background: 'var(--mindease-gradient-warm)' }}
                onClick={() => SoundEffects.playClick()}
              >
                <Phone className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{t('dashboard.emergency')}</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8 relative mindease-subtle-stars mindease-theme-transition" style={{
          background: theme === 'light'
            ? 'linear-gradient(135deg, rgba(255, 251, 245, 0.8) 0%, rgba(254, 215, 170, 0.9) 50%, rgba(253, 230, 138, 0.3) 100%)'
            : 'linear-gradient(135deg, rgba(26, 27, 46, 0.8) 0%, rgba(22, 33, 62, 0.9) 50%, rgba(30, 63, 145, 0.3) 100%)'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}