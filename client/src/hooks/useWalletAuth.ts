import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useUserType } from '@/context/UserTypeContext';
import { WalletAuthService } from '@/lib/walletAuth';

export const useWalletAuth = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const { setUserType } = useUserType();

  const authenticateWithWallet = async (address: string, signature: string, message: string): Promise<boolean> => {
    setIsAuthenticating(true);
    setError(null);

    try {
      // Authenticate with Firebase
      const result = await WalletAuthService.authenticateWithWallet(
        address,
        signature,
        message
      );

      if (result.success) {
        // Log the JWT token for debugging
        console.log('🔥 JWT Token received:', result.user?.uid);
        console.log('🔗 Wallet Address:', address);
        
        // Check if user has a role, if not, they'll be redirected to choose role
        // This integrates with your existing role selection flow
        return true;
      } else {
        setError(result.error || 'Authentication failed');
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
      setError(errorMessage);
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const linkWalletToUser = async (address: string, signature: string, message: string): Promise<boolean> => {
    if (!user) {
      setError('Please ensure you are logged in');
      return false;
    }

    setIsAuthenticating(true);
    setError(null);

    try {
      // Link wallet to existing user
      const result = await WalletAuthService.linkWalletToUser(
        user.uid,
        address,
        signature,
        message
      );

      if (result.success) {
        console.log('✅ Wallet linked successfully');
        return true;
      } else {
        setError(result.error || 'Wallet linking failed');
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Wallet linking failed';
      setError(errorMessage);
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  };

  return {
    authenticateWithWallet,
    linkWalletToUser,
    isAuthenticating,
    error,
  };
}; 