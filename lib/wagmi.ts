import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, rootstockTestnet } from 'wagmi/chains'

export const config = createConfig({
    chains: [sepolia, rootstockTestnet],
    transports: {
        [sepolia.id]: http(),
        [rootstockTestnet.id]: http(),
    },
})