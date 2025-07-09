// User type definitions for the backend
export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
  userType?: 'freelancer' | 'client';
  walletAddress?: string;
  walletConnectedAt?: Date;
} 