import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { 
  Settings, 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  Volume2, 
  Moon, 
  Lock, 
  HelpCircle,
  LogOut,
  X,
  ChevronRight
} from 'lucide-react';
import { SoundEffects } from './sound-effects';

interface SettingsDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function SettingsDropdown({ isOpen, onToggle, onClose }: SettingsDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  const handleToggle = () => {
    SoundEffects.playClick();
    onToggle();
  };

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
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      description: 'Customize notification preferences',
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

  const handleSettingClick = (settingId: string) => {
    SoundEffects.playClick();
    console.log(`Settings: ${settingId} clicked`);
    // You can implement actual settings functionality here
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Settings Button */}
      <Button 
        ref={buttonRef}
        variant="ghost" 
        size="sm" 
        className="relative rounded-xl hover:bg-gray-700/50 text-gray-400 hover:text-gray-300 transition-all duration-300 p-2"
        onClick={handleToggle}
        aria-label="Settings"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Settings className="h-4 w-4" />
      </Button>

      {/* Dropdown Panel with Maximum Z-Index */}
      {isOpen && (
        <>
          {/* Full-screen backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-30 z-[9998]" 
            onClick={onClose}
          />
          
          {/* Settings Panel */}
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
                  <Settings className="h-4 w-4 text-blue-400" />
                  <h3 className="font-semibold text-white text-sm">
                    Settings
                  </h3>
                  <span className="text-yellow-400 text-sm">✦</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-300 hover:bg-gray-700/50 rounded-lg p-1 h-auto"
                  aria-label="Close settings"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Customize your MindEase experience ✧
              </p>
            </div>

            {/* Settings List */}
            <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
              <div className="p-1">
                {settingsItems.map((setting) => (
                  <button
                    key={setting.id}
                    onClick={() => handleSettingClick(setting.id)}
                    className="w-full p-3 rounded-xl cursor-pointer transition-all duration-300 mb-1 border group hover:scale-[1.01] hover:bg-gray-800/30 border-gray-600/20 hover:border-gray-500/30 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`flex-shrink-0 p-1.5 rounded-lg ${setting.color} bg-current/10`}>
                          <setting.icon className={`h-3 w-3 ${setting.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-xs leading-tight text-white">
                            {setting.label}
                          </h4>
                          <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">
                            {setting.description}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-3 w-3 text-gray-500 group-hover:text-gray-300 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 border-t" style={{ borderColor: 'rgba(133, 130, 157, 0.3)', background: 'rgba(0, 0, 0, 0.1)' }}>
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg py-2 h-auto"
                onClick={() => {
                  SoundEffects.playClick();
                  console.log('Sign out clicked');
                  onClose();
                }}
              >
                <LogOut className="h-3 w-3 mr-2" />
                Sign Out
                <span className="ml-2 text-yellow-400">✧</span>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}