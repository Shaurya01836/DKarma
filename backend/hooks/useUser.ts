import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // adjust this path to your Firebase config
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

  // Load user profile from Firestore
  useEffect(() => {
    const fetchProfile = async () => {
      if (user && isAuthenticated) {
        setProfileLoading(true);
        try {
          const userRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            setProfile({ id: user.uid, email: user.email || '', ...docSnap.data() } as UserProfile);
          } else {
            // User doc not found – use default fallback
            const fallbackProfile: UserProfile = {
              id: user.uid,
              email: user.email || '',
              displayName: user.displayName || '',
              photoURL: user.photoURL || '',
              userType: 'freelancer',
            };
            setProfile(fallbackProfile);
          }
        } catch (err) {
          console.error('Error fetching profile:', err);
        } finally {
          setProfileLoading(false);
        }
      } else {
        setProfile(null);
      }
    };

    fetchProfile();
  }, [user, isAuthenticated]);

  // Create or update Firestore profile
  const createUserProfile = async (additionalData?: Partial<UserProfile>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      setProfileLoading(true);
      const userRef = doc(db, 'users', user.uid);
      const newProfile: UserProfile = {
        id: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        userType: 'freelancer',
        ...additionalData,
      };
      await setDoc(userRef, newProfile, { merge: true });
      setProfile(newProfile);
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    } finally {
      setProfileLoading(false);
    }
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      setProfileLoading(true);
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, data);
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

  const uploadProfilePicture = async (url: string) => {
    if (!user) throw new Error('User not authenticated');
    try {
      setProfileLoading(true);
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { photoURL: url });
      if (profile) {
        setProfile({ ...profile, photoURL: url });
      }
      return url;
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
