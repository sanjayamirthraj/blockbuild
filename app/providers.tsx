'use client'
import { WagmiProvider } from "wagmi";
import { config } from '../lib/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export function Providers({ children,
}: Readonly<{
  children: React.ReactNode;
}> ) {
    return <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </WagmiProvider>
}