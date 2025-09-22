import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { 
  Settings, 
  Bell, 
  User, 
  Shield, 
  Palette, 
  Globe, 
  Volume2, 
  Moon, 
  Lock, 
  HelpCircle,
  Heart, 
  Calendar, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  Star, 
  X,
  ChevronRight
} from 'lucide-react';
import { SoundEffects } from './sound-effects';
import { useTheme } from '../contexts/theme-context';

interface Notification {
  id: string;
  type: 'wellness' | 'appointment' | 'forum' | 'system';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export function SettingsPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'notifications' | 'settings'>('notifications');
  
  // Mock notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'wellness',
      title: 'Daily Wellness Check ✨',
      message: 'How are you feeling today? Take a moment to check in with yourself.',
      time: '5 minutes ago',
      isRead: false,
      icon: Heart,
      color: 'text-pink-400'
    },
    {
      id: '2', 
      type: 'appointment',
      title: 'Session Reminder 📅',
      message: 'Your counseling session with Dr. Priya Sharma starts in 30 minutes.',
      time: '25 minutes ago',
      isRead: false,
      icon: Calendar,
      color: 'text-blue-400'
    },
    {
      id: '3',
      type: 'forum',
      title: 'New Support Group 💬',
      message: 'Join our "Exam Stress Management" group starting Monday.',
      time: '2 hours ago',
      isRead: true,
      icon: MessageSquare,
      color: 'text-green-400'
    },
    {
      id: '4',
      type: 'system',
      title: 'Progress Milestone 🎉',
      message: 'You\'ve completed 7 consecutive days of mood tracking!',
      time: '1 day ago',
      isRead: false,
      icon: Star,
      color: 'text-yellow-400'
    }
  ]);

  const settingsItems = [
    {
      id: 'profile',
      label: 'Profile Settings',
      icon: User,
      description: 'Manage your personal information',
      color: 'text-blue-400'
    },
    {
      id: 'privacy',
      label: 'Privacy & Security',
      icon: Shield,
      description: 'Control your privacy settings',
      color: 'text-green-400'
    },
    {
      id: 'notif-prefs',
      label: 'Notification Preferences',
      icon: Bell,
      description: 'Customize notification settings',
      color: 'text-yellow-400'
    },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: Palette,
      description: 'Theme and display options',
      color: 'text-purple-400'
    },
    {
      id: 'language',
      label: 'Language',
      icon: Globe,
      description: 'Change language preferences',
      color: 'text-cyan-400'
    },
    {
      id: 'sounds',
      label: 'Sounds & Audio',
      icon: Volume2,
      description: 'Audio feedback settings',
      color: 'text-pink-400'
    },
    {
      id: 'accessibility',
      label: 'Accessibility',
      icon: Moon,
      description: 'Accessibility options',
      color: 'text-indigo-400'
    },
    {
      id: 'account',
      label: 'Account Settings',
      icon: Lock,
      description: 'Manage account and security',
      color: 'text-red-400'
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: HelpCircle,
      description: 'Get help and contact support',
      color: 'text-orange-400'
    }
  ];

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleNotificationClick = (notificationId: string) => {
    SoundEffects.playClick();
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    SoundEffects.playClick();
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const removeNotification = (notificationId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    SoundEffects.playClick();
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleSettingClick = (settingId: string) => {
    SoundEffects.playClick();
    console.log(`Settings: ${settingId} clicked`);
    // Implement actual settings functionality here
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className={`text-4xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Settings & Notifications</h1>
        <p className={`text-lg ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Manage your MindEase experience</p>
      </div>

      {/* Tab Navigation */}
      <Card className="p-1 mindease-card" style={{
        background: theme === 'light' 
          ? 'rgba(255, 251, 245, 0.95)' 
          : 'rgba(30, 30, 30, 0.95)',
        borderColor: theme === 'light'
          ? 'rgba(254, 215, 170, 0.5)'
          : 'rgba(133, 130, 157, 0.4)'
      }}>
        <div className="flex rounded-xl overflow-hidden">
          <Button
            variant={activeTab === 'notifications' ? 'default' : 'ghost'}
            className={`flex-1 py-3 px-6 rounded-xl transition-all duration-300 ${
              activeTab === 'notifications' 
                ? 'mindease-button text-white' 
                : theme === 'light'
                  ? 'text-gray-700 hover:text-gray-900 hover:bg-orange-100'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/30'
            }`}
            onClick={() => {
              SoundEffects.playClick();
              setActiveTab('notifications');
            }}
          >
            <Bell className="h-4 w-4 mr-2" />
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </Button>
          <Button
            variant={activeTab === 'settings' ? 'default' : 'ghost'}
            className={`flex-1 py-3 px-6 rounded-xl transition-all duration-300 ${
              activeTab === 'settings' 
                ? 'mindease-button text-white' 
                : theme === 'light'
                  ? 'text-gray-700 hover:text-gray-900 hover:bg-orange-100'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/30'
            }`}
            onClick={() => {
              SoundEffects.playClick();
              setActiveTab('settings');
            }}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </Card>

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <Card className="mindease-card" style={{
          background: theme === 'light'
            ? 'rgba(255, 251, 245, 0.95)'
            : 'rgba(30, 30, 30, 0.95)',
          borderColor: theme === 'light'
            ? 'rgba(254, 215, 170, 0.5)'
            : 'rgba(133, 130, 157, 0.4)'
        }}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-blue-400" />
                <h2 className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Your Notifications</h2>
                <span className="text-yellow-400">✧</span>
              </div>
              {unreadCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllAsRead}
                  className={`text-blue-400 border-blue-400/30 ${
                    theme === 'light' ? 'hover:bg-blue-50' : 'hover:bg-blue-900/20'
                  }`}
                >
                  Mark all as read
                </Button>
              )}
            </div>

            <p className={`mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All caught up! ✨'}
            </p>

            {notifications.length > 0 ? (
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                    className={`
                      p-4 rounded-xl cursor-pointer transition-all duration-300 border group hover:scale-[1.01]
                      ${!notification.isRead 
                        ? theme === 'light'
                          ? 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                          : 'bg-blue-900/20 border-blue-600/30 hover:bg-blue-800/30' 
                        : theme === 'light'
                          ? 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                          : 'bg-gray-800/10 border-gray-600/20 hover:bg-gray-700/20'
                      }
                    `}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 p-2 rounded-lg ${notification.color} bg-current/10 mt-1`}>
                        <notification.icon className={`h-4 w-4 ${notification.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h3 className={`font-medium text-sm leading-tight ${
                            !notification.isRead 
                              ? theme === 'light' ? 'text-gray-900' : 'text-white'
                              : theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                          }`}>
                            {notification.title}
                            {!notification.isRead && (
                              <span className="ml-2 inline-block w-2 h-2 bg-blue-400 rounded-full"></span>
                            )}
                          </h3>
                          <button
                            onClick={(e) => removeNotification(notification.id, e)}
                            className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded ${
                              theme === 'light' 
                                ? 'text-gray-500 hover:text-gray-700' 
                                : 'text-gray-500 hover:text-gray-300'
                            }`}
                            aria-label="Remove notification"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <p className={`text-sm mt-2 leading-relaxed ${
                          theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                        }`}>
                          {notification.message}
                        </p>
                        <div className={`flex items-center space-x-2 text-xs mt-2 ${
                          theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          <Clock className="h-3 w-3" />
                          <span>{notification.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <CheckCircle className={`h-16 w-16 mx-auto mb-4 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
                <h3 className={`text-lg font-medium mb-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>No notifications</h3>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>You're all caught up! ✦</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <Card className="mindease-card" style={{
          background: theme === 'light'
            ? 'rgba(255, 251, 245, 0.95)'
            : 'rgba(30, 30, 30, 0.95)',
          borderColor: theme === 'light'
            ? 'rgba(254, 215, 170, 0.5)'
            : 'rgba(133, 130, 157, 0.4)'
        }}>
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Settings className="h-5 w-5 text-blue-400" />
              <h2 className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Application Settings</h2>
              <span className="text-yellow-400">✦</span>
            </div>

            <p className={`mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              Customize your MindEase experience ✧
            </p>

            <div className="grid gap-3">
              {settingsItems.map((setting) => (
                <button
                  key={setting.id}
                  onClick={() => handleSettingClick(setting.id)}
                  className={`w-full p-4 rounded-xl cursor-pointer transition-all duration-300 border group hover:scale-[1.01] text-left ${
                    theme === 'light'
                      ? 'hover:bg-orange-50 border-orange-200 hover:border-orange-300'
                      : 'hover:bg-gray-800/30 border-gray-600/20 hover:border-gray-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`flex-shrink-0 p-2 rounded-lg ${setting.color} bg-current/10`}>
                        <setting.icon className={`h-4 w-4 ${setting.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-medium text-sm leading-tight ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                          {setting.label}
                        </h3>
                        <p className={`text-sm mt-1 leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                          {setting.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={`h-4 w-4 transition-colors ${
                      theme === 'light' 
                        ? 'text-gray-400 group-hover:text-gray-600' 
                        : 'text-gray-500 group-hover:text-gray-300'
                    }`} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}