'use client';

import React from 'react';
import { AdvancedWalletConnect } from '@/components/auth/AdvancedWalletConnect';
import { WalletConnectButton } from '@/components/auth/WalletConnectButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function WalletDemoPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Wallet Connection Demo</h1>
          <p className="text-lg text-gray-600">
            Test different wallet connection modes and features
          </p>
        </div>

        <Tabs defaultValue="advanced" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="advanced">Advanced Component</TabsTrigger>
            <TabsTrigger value="simple">Simple Component</TabsTrigger>
          </TabsList>

          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Wallet Connect</CardTitle>
                <CardDescription>
                  Full-featured wallet connection with multiple modes and states
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdvancedWalletConnect />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="simple" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Connect Mode</CardTitle>
                  <CardDescription>
                    Simple wallet connection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <WalletConnectButton />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Authenticate Mode</CardTitle>
                  <CardDescription>
                    Sign in with wallet
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <WalletConnectButton />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Link Mode</CardTitle>
                  <CardDescription>
                    Link wallet to account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <WalletConnectButton />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Features Included</CardTitle>
            <CardDescription>
              What&apos;s implemented in this wallet connection system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Rainbow Kit Integration</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Multi-wallet support (MetaMask, WalletConnect, etc.)</li>
                  <li>• Chain switching</li>
                  <li>• Network detection</li>
                  <li>• Wallet connection status</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Authentication Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Message signing for authentication</li>
                  <li>• Firebase custom token generation</li>
                  <li>• Wallet linking to existing accounts</li>
                  <li>• Error handling and user feedback</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 