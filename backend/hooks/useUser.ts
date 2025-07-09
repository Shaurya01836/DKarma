import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { UserService, UserProfile } from '@/services/userService';

export const useUser = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  // Load user profile when user changes
  useEffect(() => {
    if (user && isAuthenticated) {
      setProfileLoading(true);
      UserService.getUserProfile(user.uid)
        .then((userProfile) => {
          setProfile(userProfile);
        })
        .catch((error) => {
          console.error('Error loading user profile:', error);
        })
        .finally(() => {
          setProfileLoading(false);
        });
    } else {
      setProfile(null);
    }
  }, [user, isAuthenticated]);

  // Create or update user profile
  const createUserProfile = async (additionalData?: Partial<UserProfile>) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      setProfileLoading(true);
      await UserService.createUserProfile(user, additionalData);
      // Reload profile
      const updatedProfile = await UserService.getUserProfile(user.uid);
      setProfile(updatedProfile);
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
      await UserService.updateUserProfile(user.uid, data);
      // Reload profile
      const updatedProfile = await UserService.getUserProfile(user.uid);
      setProfile(updatedProfile);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    } finally {
      setProfileLoading(false);
    }
  };

  // Upload profile picture
  const uploadProfilePicture = async (file: File) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      setProfileLoading(true);
      const photoURL = await UserService.uploadProfilePicture(user.uid, file);
      // Reload profile
      const updatedProfile = await UserService.getUserProfile(user.uid);
      setProfile(updatedProfile);
      return photoURL;
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