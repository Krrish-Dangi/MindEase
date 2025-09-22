import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserType = 'student' | 'counsellor';

export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  college?: string;
  year?: string;
  license?: string;
  specialization?: string;
  avatar?: string;
  isGuest?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  login: (user: User) => void;
  loginAsGuest: () => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
    // Navigate to dashboard after login
    window.history.pushState({}, '', '/dashboard');
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'dashboard' } }));
  };

  const loginAsGuest = () => {
    const guestUser: User = {
      id: 'guest',
      email: 'guest@mindease.com',
      username: 'guest',
      firstName: 'Guest',
      lastName: 'User',
      userType: 'student',
      isGuest: true
    };
    setUser(guestUser);
    // Navigate to dashboard after guest login
    window.history.pushState({}, '', '/dashboard');
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'dashboard' } }));
  };

  const logout = () => {
    setUser(null);
    // Navigate to home after logout
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'home' } }));
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const isAuthenticated = user !== null;
  const isGuest = user?.isGuest || false;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isGuest, login, loginAsGuest, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}