import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, rootstockTestnet } from 'wagmi/chains'

export const config = createConfig({
    chains: [mainnet, sepolia, rootstockTestnet],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
        [rootstockTestnet.id]: http(),
    },
})