import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, sepolia } from 'wagmi/chains';
import { eduChain } from './eduChain';

export const config = getDefaultConfig({
  appName: 'DKarma',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'your-project-id',
  chains: [mainnet, polygon, sepolia, eduChain],
  ssr: true,
}); 