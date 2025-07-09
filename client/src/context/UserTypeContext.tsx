"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

type UserType = 'freelancer' | 'client' | null;

interface UserTypeContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
  isUserTypeModalOpen: boolean;
  setIsUserTypeModalOpen: (open: boolean) => void;
  mode: 'login' | 'register';
  setMode: (mode: 'login' | 'register') => void;
}

const UserTypeContext = createContext<UserTypeContextType | undefined>(undefined);

export function UserTypeProvider({ children }: { children: React.ReactNode }) {
  const [userType, setUserType] = useState<UserType>(null);
  const [isUserTypeModalOpen, setIsUserTypeModalOpen] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const { user } = useAuth();

  // Load user type from localStorage on mount
  useEffect(() => {
    if (user) {
      const savedUserType = localStorage.getItem('userType') as UserType;
      if (savedUserType) {
        setUserType(savedUserType);
      } else {
        // If user is logged in but no user type is set, show the modal
        setIsUserTypeModalOpen(true);
      }
    }
  }, [user]);

  // Save user type to localStorage when it changes
  useEffect(() => {
    if (userType) {
      localStorage.setItem('userType', userType);
    }
  }, [userType]);

  const value = {
    userType,
    setUserType,
    isUserTypeModalOpen,
    setIsUserTypeModalOpen,
    mode,
    setMode,
  };

  return (
    <UserTypeContext.Provider value={value}>
      {children}
    </UserTypeContext.Provider>
  );
}

export function useUserType() {
  const context = useContext(UserTypeContext);
  if (context === undefined) {
    throw new Error('useUserType must be used within a UserTypeProvider');
  }
  return context;
} 