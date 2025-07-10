'use client';

import React, { useState } from 'react';
import { useWalletAuth } from '@/hooks/useWalletAuth';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface WalletConnectButtonProps {
  mode?: 'connect' | 'authenticate' | 'link';
  onSuccess?: () => void;
  className?: string;
}

export const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({
  mode = 'authenticate',
  onSuccess,
  className = '',
}) => {
  const { authenticateWithWallet, linkWalletToUser, isAuthenticating, error, isConnected } = useWalletAuth();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleWalletAction = async () => {
    setIsProcessing(true);
    try {
      let success = false;
      if (mode === 'link' && user) {
        success = await linkWalletToUser();
      } else if (mode === 'authenticate') {
        success = await authenticateWithWallet();
      }
      if (success && onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Wallet action failed:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (mode === 'connect') {
    return (
      <div className={className}>
        <ConnectButton />
      </div>
    );
  }

  return (
    <div className={className}>
      {!isConnected ? (
        <ConnectButton />
      ) : (
        <div className="space-y-4">
          <Button
            onClick={handleWalletAction}
            disabled={isAuthenticating || isProcessing}
            className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold py-2 rounded-lg transition"
          >
            <Wallet size={20} />
            {isAuthenticating || isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>
                  {mode === 'link' ? 'Linking Wallet...' : 'Signing in...'}
                </span>
              </div>
            ) : (
              <span>
                {mode === 'link' ? 'Link Wallet' : 'Sign in with Wallet'}
              </span>
            )}
          </Button>
          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 