import { useAccount, useSignMessage } from 'wagmi';
import { useEffect, useState } from 'react';

export const useWalletAuth = () => {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSigning, setIsSigning] = useState(false);

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
      const message = `Welcome to DKarma!\n\nWallet: ${address}`;
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

  return {
    address,
    isConnected,
    error,
    isSigning,
    signWallet,
  };
};
