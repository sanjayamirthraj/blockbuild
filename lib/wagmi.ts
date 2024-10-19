import { http, createConfig } from 'wagmi'
import { rootstockTestnet } from 'wagmi/chains'
import { metaMask } from "wagmi/connectors";


export const config = createConfig({
    chains: [rootstockTestnet],
    connectors: [metaMask()],
    transports: {
        [rootstockTestnet.id]: http()
    },
})