import { useAccount, useSignMessage } from 'wagmi';
import { useEffect, useState } from 'react';
import { WalletAuthService } from '@/lib/walletAuth';
import { useAuth } from '@/context/AuthContext';

export const useWalletAuth = () => {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { user } = useAuth();

  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSigning, setIsSigning] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const signWallet = async (): Promise<{ address: string; signature: string } | null> => {
    if (!mounted || !isConnected || !address || !signMessageAsync) {
      setError('Wallet not ready');
      return null;
    }

    try {
      setIsSigning(true);
      const message = WalletAuthService.getSignMessage(address);
      const signature = await signMessageAsync({ message });
      return { address, signature };
    } catch (err) {
      console.error('Signature error:', err);
      setError('Signature failed');
      return null;
    } finally {
      setIsSigning(false);
    }
  };

  const authenticateWithWallet = async () => {
    setError(null);
    setIsAuthenticating(true);
    try {
      if (!address || !signMessageAsync) throw new Error('Wallet not ready');
      const message = WalletAuthService.getSignMessage(address);
      const signature = await signMessageAsync({ message });
      const result = await WalletAuthService.authenticateWithWallet(address, signature, message);
      if (!result.success) throw new Error(result.error || 'Authentication failed');
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const linkWalletToUser = async () => {
    setError(null);
    setIsAuthenticating(true);
    try {
      if (!user || !address || !signMessageAsync) throw new Error('User or wallet not ready');
      const message = WalletAuthService.getSignMessage(address);
      const signature = await signMessageAsync({ message });
      const result = await WalletAuthService.linkWalletToUser(user.uid, address, signature, message);
      if (!result.success) throw new Error(result.error || 'Wallet linking failed');
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wallet linking failed');
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  };

  return {
    address,
    isConnected,
    error,
    isSigning,
    signWallet,
    authenticateWithWallet,
    linkWalletToUser,
    isAuthenticating,
  };
};
