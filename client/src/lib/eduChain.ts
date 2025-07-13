import type { Chain } from 'viem/chains';

export const eduChain: Chain = {
  id: 656476,
  name: 'EDU Chain Testnet',
  nativeCurrency: {
    name: 'EDU',
    symbol: 'EDU',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://rpc.open-campus-codex.gelato.digital'] },
    public: { http: ['https://rpc.open-campus-codex.gelato.digital'] },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://edu-chain-testnet.blockscout.com',
    },
  },
  testnet: true,
};
