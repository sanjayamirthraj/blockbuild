'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import FlowGraph from '@/app/compile/FlowGraph';
import ContractDeployment from './ContractDeployement';
import { Button } from '@/components/ui/button';
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { ArrowLeft, Blocks as BlocksIcon } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { deployContract } from '@wagmi/core'
import { config } from '../../lib/wagmi'
import { type DeployContractReturnType } from '@wagmi/core'
    


//todo
// make the contract page actaully work better
// make the flow graph more interactive

const nodeTypes = {
    // Define your custom node types here
};

const edgeTypes = {
    // Define your custom edge types here
};

const CompilePage: React.FC = () => {
    const searchParams = useSearchParams();
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [flowSummary, setFlowSummary] = useState([]);
    const [apiResponse, setApiResponse] = useState(null); // Add state for API response
    const [bytecode, setBytecode] = useState(null);
    const [abi, setAbi] = useState(null);
    const [hash, setHash] = useState<`0x${string}` | null>(null);
    useEffect(() => {
        const nodesParam = searchParams.get('nodes');
        const edgesParam = searchParams.get('edges');
        const flowSummaryParam = searchParams.get('flowSummary');
        if (nodesParam && edgesParam && flowSummaryParam) {
            setNodes(JSON.parse(decodeURIComponent(nodesParam)));
            setEdges(JSON.parse(decodeURIComponent(edgesParam)));
            setFlowSummary(JSON.parse(decodeURIComponent(flowSummaryParam)));
        }
    }, [searchParams]);

    useEffect(() => {
        // This effect will run whenever the hash changes
        // You can add any additional logic here if needed
    }, [hash]);

    const handleCompile = async () => {
        const flowSummaryJSON = {
            nodes: nodes,
            edges: edges,
            summary: flowSummary
        };
        console.log('Flow Summary JSON:', JSON.stringify(flowSummaryJSON, null, 2));
        
        const bodyofthecall = JSON.stringify(flowSummaryJSON)
            .replace(/[{}"]/g, '')
            .replace(/:/g, ': ')
            .replace(/,/g, ', ');
       console.log(bodyofthecall)
      
      
      
       const response = await fetch('/send-to-rag', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: bodyofthecall,
                name: '',
            }),
        });
        const outputs = await response.json();

        const resultofcompilation = await fetch('/compile-contract', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify({ contractName: outputs.contractName, name: outputs.contractName.toString }),
            });
            const compilationResult = await resultofcompilation.json();
            setApiResponse(compilationResult.abi); 
            setBytecode(compilationResult.bytecode);
    };

   
    return (
        <div className="flex flex-col min-h-screen text-white">
            <Navbar />
            <div className="absolute top-20 right-4 hover:none">
                <ConnectButton />
            </div>
            <Sidebar />
          

            <div className="flex-grow flex w-full px-32 py-16">
                <main className="flex-grow flex">
                    <section className="w-1/2 p-4 py-12">
                        <div className="flex flex-col ml-5">
                            <h2 className="text-lg mb-4">Flow Graph</h2>
                            <FlowGraph 
                                nodes={nodes} 
                                edges={edges} 
                                flowSummary={flowSummary} 
                            
                            />
                        </div>
                        <Link href="/">
                            <Button variant="ghost" className="mb-4 group text-white/50 hover:text-white hover:bg-white/5">
                                <ArrowLeft className="w-4 h-4 mr-1 translate-x-1 group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
                                Back
                            </Button>
                        </Link>
                        <Button
                            variant="ghost"
                            className="ml-4 mb-4 group text-white/50 hover:text-white hover:bg-white/5"
                            onClick={() => handleCompile()}
                        >
                            <BlocksIcon className="w-4 h-4 mr-1 translate-x-1 group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
                            Compile
                        </Button>
                        {apiResponse && (
                            <div>
                                <h3 className="text-md font-semibold mb-2">Compilation Result:</h3>
                                <pre className="whitespace-pre-wrap overflow-x-auto text-left text-sm">
                                    {"abi: "+JSON.stringify(apiResponse, null, 2)}
                                </pre>
                            </div>
                        )}
                    </section>

                    <section className="w-1/2 p-4">
                        {hash ? (
                            <ContractDeployment hash={hash} />
                        ) : <ContractDeployment hash={`0x${"TX Hash will appear here"}`} />}
                    </section>
                </main>
            </div>
            <div className="fixed bottom-4 right-4">
                <Button
                    variant="default"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={async () => {
                        const examples = [
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
                        ]
                        const bytcodes = "0x608060405234801561001057600080fd5b5060405161039b38038061039b8339818101604052810190610032919061007a565b80600081905550506100a7565b600080fd5b6000819050919050565b61005781610044565b811461006257600080fd5b50565b6000815190506100748161004e565b92915050565b6000602082840312156100905761008f61003f565b5b600061009e84828501610065565b91505092915050565b6102e5806100b66000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80632e111e231461004657806375738a4414610062578063d05254de1461006c575b600080fd5b610060600480360381019061005b9190610144565b61008a565b005b61006a6100a5565b005b610074610100565b6040516100819190610180565b60405180910390f35b8060008082825461009b91906101ca565b9250508190555050565b60008054116100e9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100e09061025b565b60405180910390fd5b60016000546100f8919061027b565b600081905550565b60008054905090565b600080fd5b6000819050919050565b6101218161010e565b811461012c57600080fd5b50565b60008135905061013e81610118565b92915050565b60006020828403121561015a57610159610109565b5b60006101688482850161012f565b91505092915050565b61017a8161010e565b82525050565b60006020820190506101956000830184610171565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006101d58261010e565b91506101e08361010e565b92508282019050808211156101f8576101f761019b565b5b92915050565b600082825260208201905092915050565b7f536f72727920746865726520617265206e6f2067756d62616c6c730000000000600082015250565b6000610245601b836101fe565b91506102508261020f565b602082019050919050565b6000602082019050818103600083015261027481610238565b9050919050565b60006102868261010e565b91506102918361010e565b92508282039050818111156102a9576102a861019b565b5b9291505056fea2646970667358221220f311e9516bde591192b1a132e0b06cfe73e3d6d600e73c01bb5060566242aea464736f6c63430008180033"
                        const result = await deployContract(config, {
                                abi: examples,
                                bytecode: bytcodes,
                                args: [10], 
                        });
                        console.log(result)
                        setHash(result as `0x${string}`);
                    }}
                >
                    <BlocksIcon className="w-4 h-4 mr-2" />
                    Deploy Contract
                </Button>
            </div>
        </div>
    );
};

export default CompilePage;
