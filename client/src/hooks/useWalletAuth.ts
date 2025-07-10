import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useAccount, useSignMessage } from 'wagmi';
import { WalletAuthService } from '@/lib/walletAuth';

export const useWalletAuth = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { user } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const authenticateWithWallet = async (): Promise<boolean> => {
    if (!mounted) {
      setError('Component not mounted yet');
      return false;
    }

    if (!address || !isConnected) {
      setError('Please connect your wallet first');
      return false;
    }

    if (!signMessageAsync) {
      setError('Wallet signing not available');
      return false;
    }

    setIsAuthenticating(true);
    setError(null);

    try {
      // Get the message to sign
      const message = WalletAuthService.getSignMessage(address);
      
      // Sign the message
      const signature = await signMessageAsync({ message });
      
      // Authenticate with Firebase
      const result = await WalletAuthService.authenticateWithWallet(
        address,
        signature,
        message
      );

      if (result.success) {
        console.log('🔥 JWT Token received:', result.user?.uid);
        console.log('🔗 Wallet Address:', address);
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

  const linkWalletToUser = async (): Promise<boolean> => {
    if (!mounted) {
      setError('Component not mounted yet');
      return false;
    }

    if (!address || !isConnected || !user) {
      setError('Please connect your wallet and ensure you are logged in');
      return false;
    }

    if (!signMessageAsync) {
      setError('Wallet signing not available');
      return false;
    }

    setIsAuthenticating(true);
    setError(null);

    try {
      // Get the message to sign
      const message = WalletAuthService.getSignMessage(address);
      
      // Sign the message
      const signature = await signMessageAsync({ message });
      
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
    address,
    isConnected,
  };
}; 