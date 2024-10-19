'use client'

import { WagmiProvider } from "wagmi";
import { config } from '../lib/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
    getDefaultConfig,
    RainbowKitProvider,
  } from '@rainbow-me/rainbowkit';

const queryClient = new QueryClient()

export function Providers({ children,
}: Readonly<{
  children: React.ReactNode;
}> ) {
    return <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>{children}</RainbowKitProvider>
        </QueryClientProvider>
    </WagmiProvider>
}