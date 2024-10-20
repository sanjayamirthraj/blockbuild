import { http, createConfig } from 'wagmi'
import { rootstockTestnet } from 'wagmi/chains'
import { metaMask } from "wagmi/connectors";
import { type Chain } from 'viem'

// export const xrplEvmSidechainDevnet = {
//     id: 1440002,
//     name: 'XRPL EVM Sidechain Devnet',
//     nativeCurrency: { name: 'XRP', symbol: 'XRP', decimals: 6 },
//     rpcUrls: {
//         default: { http: ['https://rpc-evm-sidechain.xrpl.org'] },
//     },
//     blockExplorers: {
//         default: { name: 'XRPL EVM Explorer', url: 'https://explorer.xrplevm.org' },
//     },
//     contracts: {
//     },
// } as const satisfies Chain

export const config = createConfig({
    chains: [rootstockTestnet],
    connectors: [metaMask()],
    transports: {
        [rootstockTestnet.id]: http(),
    },
})

