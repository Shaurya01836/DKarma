'use client';

import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { useWalletAuth } from '@/hooks/useWalletAuth';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, User, Link, LogOut, AlertCircle } from 'lucide-react';

interface AdvancedWalletConnectProps {
  onSuccess?: () => void;
  className?: string;
}

export const AdvancedWalletConnect: React.FC<AdvancedWalletConnectProps> = ({
  onSuccess,
  className = '',
}) => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { authenticateWithWallet, linkWalletToUser, isAuthenticating, error } = useWalletAuth();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAuthenticate = async () => {
    setIsProcessing(true);
    try {
      const success = await authenticateWithWallet();
      if (success && onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Authentication failed:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLinkWallet = async () => {
    setIsProcessing(true);
    try {
      const success = await linkWalletToUser();
      if (success && onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Wallet linking failed:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  if (!isConnected) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Connect Your Wallet
          </CardTitle>
          <CardDescription>
            Connect your wallet to access DKarma features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ConnectButton />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Wallet Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Connected
          </CardTitle>
          <CardDescription>
            Address: {address?.slice(0, 6)}...{address?.slice(-4)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-600 font-medium">
              ✓ Wallet Connected
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDisconnect}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Disconnect
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Authentication Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Authentication
          </CardTitle>
          <CardDescription>
            Sign in with your wallet to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleAuthenticate}
            disabled={isAuthenticating || isProcessing}
            className="w-full flex items-center justify-center gap-2"
          >
            <Wallet className="h-4 w-4" />
            {isAuthenticating || isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              <span>Sign in with Wallet</span>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Link Wallet Section (if user is logged in) */}
      {user && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5" />
              Link Wallet to Account
            </CardTitle>
            <CardDescription>
              Link this wallet to your existing account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleLinkWallet}
              disabled={isAuthenticating || isProcessing}
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <Link className="h-4 w-4" />
              {isAuthenticating || isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                  <span>Linking...</span>
                </div>
              ) : (
                <span>Link Wallet</span>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}; 