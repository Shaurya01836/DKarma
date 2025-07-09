import { FirestoreService } from '@/lib/db';
import { StorageService } from '@/lib/storage';
import { User } from 'firebase/auth';

export interface UserProfile {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
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
  totalEarned?: number;
  projectsDone?: number;
  averageRating?: number;
  workHistory?: Array<{
    id: string | number;
    title: string;
    organization: string;
    payment: string;
    rating: number;
    date: string;
  }>;
  portfolio?: Array<{
    id: string | number;
    title: string;
    description: string;
    tags: string[];
    link: string;
  }>;
  github?: string;
  linkedin?: string;
  website?: string;
  deleted?: boolean;
  userType?: 'freelancer' | 'client';
  // Wallet authentication fields
  walletAddress?: string;
  walletConnectedAt?: Date;
}

export class UserService {
  private static COLLECTION_NAME = 'users';

  // Create or update user profile
  static async createUserProfile(user: User, additionalData?: Partial<UserProfile>): Promise<string> {
    try {
      const userData: Partial<UserProfile> = {
        email: user.email || '',
        displayName: user.displayName || additionalData?.displayName,
        bio: additionalData?.bio,
        skills: additionalData?.skills || [],
        organization: additionalData?.organization,
        role: additionalData?.role,
        location: additionalData?.location,
        phone: additionalData?.phone,
        username: additionalData?.username,
        experience: additionalData?.experience,
        domain: additionalData?.domain,
        hourlyRate: additionalData?.hourlyRate,
        available: additionalData?.available,
        workingDays: additionalData?.workingDays,
        walletAddress: additionalData?.walletAddress,
      };
      const photoURL = user.photoURL || additionalData?.photoURL;
      if (photoURL) {
        userData.photoURL = photoURL;
      }

      // Check if user profile already exists
      const existingProfile = await this.getUserProfile(user.uid);
      
      if (existingProfile) {
        // Update existing profile
        await this.updateUserProfile(user.uid, {
          ...userData,
          updatedAt: new Date(),
        });
        return user.uid;
      } else {
        // Create new profile
        const profileData = {
          ...userData,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        await FirestoreService.updateDocument(this.COLLECTION_NAME, user.uid, profileData);
        return user.uid;
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  }

  // Get user profile
  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      return await FirestoreService.getDocument<UserProfile>(this.COLLECTION_NAME, userId);
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  }

  // Update user profile
  static async updateUserProfile(userId: string, data: Partial<UserProfile>): Promise<void> {
    try {
      await FirestoreService.updateDocument(this.COLLECTION_NAME, userId, {
        ...data,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  // Link wallet to user
  static async linkWalletToUser(userId: string, walletAddress: string): Promise<void> {
    try {
      await this.updateUserProfile(userId, {
        walletAddress,
        walletConnectedAt: new Date(),
      });
    } catch (error) {
      console.error('Error linking wallet to user:', error);
      throw error;
    }
  }

  // Get user by wallet address
  static async getUserByWalletAddress(walletAddress: string): Promise<UserProfile | null> {
    try {
      const users = await FirestoreService.queryDocuments<UserProfile>(
        this.COLLECTION_NAME,
        [{ field: 'walletAddress', operator: '==', value: walletAddress }]
      );
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      console.error('Error getting user by wallet address:', error);
      throw error;
    }
  }

  // Upload profile picture
  static async uploadProfilePicture(userId: string, file: File): Promise<string> {
    try {
      const { url } = await StorageService.uploadProfilePicture(file, userId);
      
      // Update user profile with new photo URL
      await this.updateUserProfile(userId, { photoURL: url });
      
      return url;
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      throw error;
    }
  }

  // Get all users
  static async getAllUsers(): Promise<UserProfile[]> {
    try {
      return await FirestoreService.getDocuments<UserProfile>(this.COLLECTION_NAME);
    } catch (error) {
      console.error('Error getting all users:', error);
      throw error;
    }
  }

  // Search users by skills
  static async searchUsersBySkills(skills: string[]): Promise<UserProfile[]> {
    try {
      // Note: This is a simplified search. For production, consider using Algolia or similar
      const allUsers = await this.getAllUsers();
      return allUsers.filter(user => 
        user.skills?.some(skill => 
          skills.some(searchSkill => 
            skill.toLowerCase().includes(searchSkill.toLowerCase())
          )
        )
      );
    } catch (error) {
      console.error('Error searching users by skills:', error);
      throw error;
    }
  }

  // Get users by organization
  static async getUsersByOrganization(organization: string): Promise<UserProfile[]> {
    try {
      return await FirestoreService.queryDocuments<UserProfile>(
        this.COLLECTION_NAME,
        [{ field: 'organization', operator: '==', value: organization }]
      );
    } catch (error) {
      console.error('Error getting users by organization:', error);
      throw error;
    }
  }

  // Delete user profile
  static async deleteUserProfile(userId: string): Promise<void> {
    try {
      await this.updateUserProfile(userId, { deleted: true });
    } catch (error) {
      console.error('Error deleting user profile:', error);
      throw error;
    }
  }

  // Get user statistics
  static async getUserStats(userId: string): Promise<{
    totalEarned: number;
    projectsDone: number;
    averageRating: number;
  }> {
    try {
      const profile = await this.getUserProfile(userId);
      if (!profile) {
        throw new Error('User profile not found');
      }
      
      return {
        totalEarned: profile.totalEarned || 0,
        projectsDone: profile.projectsDone || 0,
        averageRating: profile.averageRating || 0,
      };
    } catch (error) {
      console.error('Error getting user stats:', error);
      throw error;
    }
  }

  // Update user statistics
  static async updateUserStats(
    userId: string,
    stats: {
      totalEarned?: number;
      projectsDone?: number;
      averageRating?: number;
    }
  ): Promise<void> {
    try {
      await this.updateUserProfile(userId, stats);
    } catch (error) {
      console.error('Error updating user stats:', error);
      throw error;
    }
  }

  // Real-time listener for user profile changes
  static onUserProfileChange(userId: string, callback: (profile: UserProfile | null) => void) {
    return FirestoreService.onDocumentSnapshot<UserProfile>(this.COLLECTION_NAME, userId, callback);
  }
} 