import { signInWithCustomToken } from 'firebase/auth';
import { auth } from './firebase';
import { UserService } from '@/services/userService';

export interface WalletAuthResponse {
  success: boolean;
  error?: string;
  user?: any;
}

export class WalletAuthService {
  private static API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  /**
   * Get the message to sign for authentication
   */
  static getSignMessage(address: string): string {
    const timestamp = Date.now();
    return `Sign in to DKarma\n\nWallet: ${address}\nTimestamp: ${timestamp}\n\nThis signature will be used to authenticate you with DKarma.`;
  }

  /**
   * Sign message with wallet and authenticate with Firebase
   */
  static async authenticateWithWallet(
    address: string,
    signature: string,
    message: string
  ): Promise<WalletAuthResponse> {
    try {
      // Send signature to backend for verification
      const response = await fetch(`${this.API_URL}/api/auth/wallet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
          signature,
          message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Authentication failed');
      }

      const { customToken } = await response.json();

      // Sign in with Firebase custom token
      const userCredential = await signInWithCustomToken(auth, customToken);
      
      // Ensure user profile exists in Firestore
      if (userCredential.user) {
        try {
          const profile = await UserService.getUserProfile(userCredential.user.uid);
          if (!profile) {
            await UserService.createUserProfile(userCredential.user, {
              displayName: `Wallet User (${address.slice(0, 6)}...${address.slice(-4)})`,
              email: `${address}@wallet.local`,
              walletAddress: address,
            });
            console.log('Wallet user profile created in Firestore');
          } else {
            // Update existing profile with wallet address
            await UserService.updateUserProfile(userCredential.user.uid, {
              walletAddress: address,
            });
            console.log('Wallet address updated in existing profile');
          }
        } catch (err) {
          console.error('Error managing user profile for wallet auth:', err);
        }
      }

      return {
        success: true,
        user: userCredential.user,
      };
    } catch (error) {
      console.error('Wallet authentication error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Authentication failed',
      };
    }
  }

  /**
   * Link wallet to existing Firebase user
   */
  static async linkWalletToUser(
    userId: string,
    address: string,
    signature: string,
    message: string
  ): Promise<WalletAuthResponse> {
    try {
      // Send signature to backend for verification
      const response = await fetch(`${this.API_URL}/api/auth/link-wallet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          address,
          signature,
          message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Wallet linking failed');
      }

      // Update user profile with wallet address
      await UserService.updateUserProfile(userId, {
        walletAddress: address,
      });

      return {
        success: true,
      };
    } catch (error) {
      console.error('Wallet linking error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Wallet linking failed',
      };
    }
  }
} 