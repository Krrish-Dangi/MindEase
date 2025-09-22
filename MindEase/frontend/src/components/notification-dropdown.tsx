import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Bell, Heart, Calendar, MessageSquare, CheckCircle, Clock, Star, X } from 'lucide-react';
import { SoundEffects } from './sound-effects';

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

interface NotificationDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function NotificationDropdown({ isOpen, onToggle, onClose }: NotificationDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Mock notifications with better variety
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

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  // Close dropdown on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

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

  const handleToggle = () => {
    SoundEffects.playNotification();
    onToggle();
  };

  const removeNotification = (notificationId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    SoundEffects.playClick();
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Button */}
      <Button 
        ref={buttonRef}
        variant="ghost" 
        size="sm" 
        className="relative rounded-xl hover:bg-gray-700/50 text-gray-400 hover:text-gray-300 transition-all duration-300 p-2"
        onClick={handleToggle}
        aria-label="Notifications"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-xs text-white flex items-center justify-center bg-red-500 border-2 border-gray-800 animate-pulse font-medium">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>

      {/* Dropdown Panel - MAXIMUM Z-INDEX TO APPEAR ABOVE ALL ELEMENTS */}
      {isOpen && (
        <>
          {/* Full-screen backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-30 z-[9998]" 
            onClick={onClose}
          />
          
          {/* Notification Panel */}
          <div 
            className="fixed right-4 top-20 w-80 max-w-[calc(100vw-1rem)] border rounded-2xl shadow-2xl backdrop-blur-lg overflow-hidden transform transition-all duration-200 scale-100 opacity-100"
            style={{
              background: 'rgba(30, 30, 30, 0.98)',
              backdropFilter: 'blur(20px)',
              borderColor: 'rgba(133, 130, 157, 0.4)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6), 0 0 80px rgba(30, 63, 145, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              zIndex: 9999
            }}
          >
            {/* Header */}
            <div className="p-4 border-b" style={{ borderColor: 'rgba(133, 130, 157, 0.3)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4 text-blue-400" />
                  <h3 className="font-semibold text-white text-sm">
                    Notifications
                  </h3>
                  <span className="text-yellow-400 text-sm">✧</span>
                </div>
                <div className="flex items-center space-x-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-xs text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 rounded-lg px-2 py-1 h-auto"
                    >
                      Mark all read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-300 hover:bg-gray-700/50 rounded-lg p-1 h-auto"
                    aria-label="Close notifications"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All caught up! ✨'}
              </p>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
              {notifications.length > 0 ? (
                <div className="p-1">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification.id)}
                      className={`
                        relative p-3 rounded-xl cursor-pointer transition-all duration-300 mb-1 border group hover:scale-[1.01]
                        ${!notification.isRead 
                          ? 'bg-blue-900/20 border-blue-600/30 hover:bg-blue-800/30' 
                          : 'bg-gray-800/10 border-gray-600/20 hover:bg-gray-700/20'
                        }
                      `}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 p-1.5 rounded-lg ${notification.color} bg-current/10 mt-0.5`}>
                          <notification.icon className={`h-3 w-3 ${notification.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className={`font-medium text-xs leading-tight ${!notification.isRead ? 'text-white' : 'text-gray-300'}`}>
                              {notification.title}
                              {!notification.isRead && (
                                <span className="ml-1 inline-block w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                              )}
                            </h4>
                            <button
                              onClick={(e) => removeNotification(notification.id, e)}
                              className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-gray-300 transition-opacity p-0.5 rounded"
                              aria-label="Remove notification"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="text-xs text-gray-300 mt-1 leading-relaxed line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                            <Clock className="h-2.5 w-2.5" />
                            <span>{notification.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <CheckCircle className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">No notifications</p>
                  <p className="text-xs text-gray-500 mt-1">You're all caught up! ✦</p>
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t" style={{ borderColor: 'rgba(133, 130, 157, 0.3)', background: 'rgba(0, 0, 0, 0.1)' }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg py-2 h-auto"
                  onClick={() => {
                    SoundEffects.playClick();
                    onClose();
                  }}
                >
                  View all notifications
                  <span className="ml-2 text-yellow-400">✧</span>
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}