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
  userTypeLoaded: boolean;
}

const UserTypeContext = createContext<UserTypeContextType | undefined>(undefined);

export function UserTypeProvider({ children }: { children: React.ReactNode }) {
  const [userType, setUserType] = useState<UserType>(null);
  const [userTypeLoaded, setUserTypeLoaded] = useState(false);
  const [isUserTypeModalOpen, setIsUserTypeModalOpen] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const savedUserType = localStorage.getItem('userType');
      if (savedUserType === 'freelancer' || savedUserType === 'client') {
        setUserType(savedUserType);
      } else {
        setUserType(null);
      }
      setUserTypeLoaded(true);
    } else {
      setUserTypeLoaded(true);
    }
  }, [user]);

  useEffect(() => {
    if (userType) {
      localStorage.setItem('userType', userType);
    }
  }, [userType]);

  const value = {
    userType,
    setUserType,
    userTypeLoaded,
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