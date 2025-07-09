import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface UserProfile {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  bio?: string;
  skills?: string[];
  organization?: string;
  role?: string;
  location?: string;
  phone?: string;
  username?: string;
  experience?: string;
  domain?: string;
  hourlyRate?: string;
  available?: boolean;
  workingDays?: string[];
  github?: string;
  linkedin?: string;
  website?: string;
  totalEarned?: number;
  projectsDone?: number;
  averageRating?: number | null;
  workHistory?: Array<{
    id: string | number;
    title: string;
    organization: string;
    payment: string;
    rating: number;
    date: string;
  }>;
  portfolio?: Array<{
    id: string;
    title: string;
    description: string;
    tech: string[];
    tags: string[];
    link: string;
    demo: string;
    github: string;
    year: string;
    image: string;
  }>;
  userType?: 'freelancer' | 'client';
  walletAddress?: string;
}

export const useUser = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  // Load user profile when user changes
  useEffect(() => {
    if (user && isAuthenticated) {
      setProfileLoading(true);
      // This will be implemented to call backend API
      console.log('Frontend useUser: Loading user profile from backend');
      
      // Mock profile for now
      const mockProfile: UserProfile = {
        id: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        userType: 'freelancer',
      };
      
      setProfile(mockProfile);
      setProfileLoading(false);
    } else {
      setProfile(null);
    }
  }, [user, isAuthenticated]);

  // Create or update user profile
  const createUserProfile = async (additionalData?: Partial<UserProfile>) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      setProfileLoading(true);
      // This will be implemented to call backend API
      console.log('Frontend createUserProfile: Will call backend API');
      
      // Mock success for now
      const mockProfile: UserProfile = {
        id: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        ...additionalData,
      };
      setProfile(mockProfile);
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    } finally {
      setProfileLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      setProfileLoading(true);
      // This will be implemented to call backend API
      console.log('Frontend updateUserProfile: Will call backend API');
      
      // Mock success for now
      if (profile) {
        setProfile({ ...profile, ...data });
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    } finally {
      setProfileLoading(false);
    }
  };

  // Upload profile picture
  const uploadProfilePicture = async () => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      setProfileLoading(true);
      // This will be implemented to call backend API
      console.log('Frontend uploadProfilePicture: Will call backend API');
      
      // Mock success for now
      const mockUrl = 'https://example.com/mock-profile-picture.jpg';
      if (profile) {
        setProfile({ ...profile, photoURL: mockUrl });
      }
      return mockUrl;
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      throw error;
    } finally {
      setProfileLoading(false);
    }
  };

  return {
    user,
    profile,
    loading: loading || profileLoading,
    isAuthenticated,
    createUserProfile,
    updateUserProfile,
    uploadProfilePicture,
  };
}; 