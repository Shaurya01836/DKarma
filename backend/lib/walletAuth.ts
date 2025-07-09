import { auth } from './firebase';
import { signInWithCustomToken } from 'firebase/auth';

export class WalletAuthService {
  private static readonly BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

  static getSignMessage(address: string): string {
    const timestamp = Date.now();
    return `Sign this message to authenticate with DKarma\n\nAddress: ${address}\nTimestamp: ${timestamp}\n\nThis signature will be used to authenticate your wallet with our service.`;
  }

  static async authenticateWithWallet(
    address: string,
    signature: string,
    message: string
  ): Promise<{ success: boolean; user?: any; error?: string }> {
    try {
      const response = await fetch(`${this.BACKEND_URL}/auth/wallet`, {
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

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Authentication failed',
        };
      }

      if (data.customToken) {
        // Sign in with Firebase using the custom token
        const userCredential = await signInWithCustomToken(auth, data.customToken);
        
        return {
          success: true,
          user: userCredential.user,
        };
      }

      return {
        success: false,
        error: 'No custom token received',
      };
    } catch (error) {
      console.error('Wallet authentication error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Authentication failed',
      };
    }
  }

  static async linkWalletToUser(
    userId: string,
    address: string,
    signature: string,
    message: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${this.BACKEND_URL}/auth/link-wallet`, {
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

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Wallet linking failed',
        };
      }

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

  static async verifySignature(
    address: string,
    signature: string,
    message: string
  ): Promise<boolean> {
    try {
      const response = await fetch(`${this.BACKEND_URL}/auth/verify-signature`, {
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

      const data = await response.json();
      return data.valid === true;
    } catch (error) {
      console.error('Signature verification error:', error);
      return false;
    }
  }
} 