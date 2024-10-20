import { NextResponse, NextRequest } from "next/server";
const { Web3 } = require("web3");
import { Config, deployContract } from '@wagmi/core'
import { config } from '../../../lib/wagmi'
import { HttpTransport } from "viem";
import { rootstockTestnet } from 'wagmi/chains'
import { metaMask } from "wagmi/connectors";


async function DeployContractToRootstock(contractABI: any, contractBytecode: string, args: any) {
    const result = await deployContract(config, {
        abi: [
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_gumballinitial",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_gumballadd",
                        "type": "uint256"
                    }
                ],
                "name": "addFreshGumballs",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getGumball",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getNumberOfGumballs",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ],
        bytecode: "0x608060405234801561001057600080fd5b5060405161039b38038061039b8339818101604052810190610032919061007a565b80600081905550506100a7565b600080fd5b6000819050919050565b61005781610044565b811461006257600080fd5b50565b6000815190506100748161004e565b92915050565b6000602082840312156100905761008f61003f565b5b600061009e84828501610065565b91505092915050565b6102e5806100b66000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80632e111e231461004657806375738a4414610062578063d05254de1461006c575b600080fd5b610060600480360381019061005b9190610144565b61008a565b005b61006a6100a5565b005b610074610100565b6040516100819190610180565b60405180910390f35b8060008082825461009b91906101ca565b9250508190555050565b60008054116100e9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100e09061025b565b60405180910390fd5b60016000546100f8919061027b565b600081905550565b60008054905090565b600080fd5b6000819050919050565b6101218161010e565b811461012c57600080fd5b50565b60008135905061013e81610118565b92915050565b60006020828403121561015a57610159610109565b5b60006101688482850161012f565b91505092915050565b61017a8161010e565b82525050565b60006020820190506101956000830184610171565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006101d58261010e565b91506101e08361010e565b92508282019050808211156101f8576101f761019b565b5b92915050565b600082825260208201905092915050565b7f536f72727920746865726520617265206e6f2067756d62616c6c730000000000600082015250565b6000610245601b836101fe565b91506102508261020f565b602082019050919050565b6000602082019050818103600083015261027481610238565b9050919050565b60006102868261010e565b91506102918361010e565b92508282039050818111156102a9576102a861019b565b5b9291505056fea2646970667358221220f311e9516bde591192b1a132e0b06cfe73e3d6d600e73c01bb5060566242aea464736f6c63430008180033",
        args: [BigInt(10)],
    })
    return result
}

export async function POST(req: NextRequest, res: NextResponse) {
    const { contractABI, contractBytecode, deploymentNetwork, args } = await req.json();

    const contractABITest = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_gumballinitial",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_gumballadd",
                    "type": "uint256"
                }
            ],
            "name": "addFreshGumballs",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getGumball",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getNumberOfGumballs",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    const contractBytecodeTest = "0x608060405234801561001057600080fd5b5060405161039b38038061039b8339818101604052810190610032919061007a565b80600081905550506100a7565b600080fd5b6000819050919050565b61005781610044565b811461006257600080fd5b50565b6000815190506100748161004e565b92915050565b6000602082840312156100905761008f61003f565b5b600061009e84828501610065565b91505092915050565b6102e5806100b66000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80632e111e231461004657806375738a4414610062578063d05254de1461006c575b600080fd5b610060600480360381019061005b9190610144565b61008a565b005b61006a6100a5565b005b610074610100565b6040516100819190610180565b60405180910390f35b8060008082825461009b91906101ca565b9250508190555050565b60008054116100e9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100e09061025b565b60405180910390fd5b60016000546100f8919061027b565b600081905550565b60008054905090565b600080fd5b6000819050919050565b6101218161010e565b811461012c57600080fd5b50565b60008135905061013e81610118565b92915050565b60006020828403121561015a57610159610109565b5b60006101688482850161012f565b91505092915050565b61017a8161010e565b82525050565b60006020820190506101956000830184610171565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006101d58261010e565b91506101e08361010e565b92508282019050808211156101f8576101f761019b565b5b92915050565b600082825260208201905092915050565b7f536f72727920746865726520617265206e6f2067756d62616c6c730000000000600082015250565b6000610245601b836101fe565b91506102508261020f565b602082019050919050565b6000602082019050818103600083015261027481610238565b9050919050565b60006102868261010e565b91506102918361010e565b92508282039050818111156102a9576102a861019b565b5b9291505056fea2646970667358221220f311e9516bde591192b1a132e0b06cfe73e3d6d600e73c01bb5060566242aea464736f6c63430008180033";
    const network = "sepolia";

    try {
        const contractData = await DeployContractToRootstock(contractABITest, contractBytecodeTest, args);
        return new NextResponse(JSON.stringify({ message: "Contract deployed", data: contractData }), { status: 200 });
    } catch (error) {
        console.error(`Error deploying contract: ${error}`);
        return new NextResponse(JSON.stringify({ message: "Error deploying contract" }), { status: 500 });
    }
}

function getConnectorClient(config: Config<readonly [{
    blockExplorers: { readonly default: { readonly name: "RSK Explorer"; readonly url: "https://explorer.testnet.rootstock.io"; }; }; contracts?: import("viem").Prettify<{ [key: string]: import("viem").ChainContract | { [sourceId: number]: import("viem").ChainContract | undefined; } | undefined; } & {
        ensRegistry?: import("viem").ChainContract | undefined; ensUniversalResolver?: import("viem").ChainContract | undefined; multicall3?: import("viem").ChainContract | undefined; universalSignatureVerifier?: import("viem" // const { deployContract } = useDeployContract()
        ).ChainContract | undefined;
    }> | undefined; id: 31; name: "Rootstock Testnet"; nativeCurrency: { readonly decimals: 18; readonly name: "Rootstock Bitcoin"; readonly symbol: "tRBTC"; }; rpcUrls: { readonly default: { readonly http: readonly ["https://public-node.testnet.rsk.co"]; }; }; sourceId?: number | undefined; testnet: true; custom?: Record<string, unknown> | undefined; fees?: import("viem").ChainFees<undefined> | undefined; formatters?: undefined; serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined; readonly network: "rootstock";
}, { blockExplorers: { readonly default: { readonly name: "Etherscan"; readonly url: "https://sepolia.etherscan.io"; readonly apiUrl: "https://api-sepolia.etherscan.io/api"; }; }; contracts: { readonly multicall3: { readonly address: "0xca11bde05977b3631167028862be2a173976ca11"; readonly blockCreated: 751532; }; readonly ensRegistry: { readonly address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"; }; readonly ensUniversalResolver: { readonly address: "0xc8Af999e38273D658BE1b921b88A9Ddf005769cC"; readonly blockCreated: 5317080; }; }; id: 11155111; name: "Sepolia"; nativeCurrency: { readonly name: "Sepolia Ether"; readonly symbol: "ETH"; readonly decimals: 18; }; rpcUrls: { readonly default: { readonly http: readonly ["https://rpc2.sepolia.org"]; }; }; sourceId?: number | undefined; testnet: true; custom?: Record<string, unknown> | undefined; fees?: import("viem").ChainFees<undefined> | undefined; formatters?: undefined; serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined; }], { 31: HttpTransport; 11155111: HttpTransport; }>, arg1: { account: any; chainId: any; connector: any; }) {
    throw new Error("Function not implemented.");
}

