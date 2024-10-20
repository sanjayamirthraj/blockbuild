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
                        
                        <div className="flex flex-row ml-5 mt-10 mb-4">
                            <ConnectButton />
                        </div>
                        
                        <Link href="/" className="flex flex-row ml-4">
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
                            <div className="mt-4 ml-4">
                                <h3 className="text-lg font-normal mb-2">Compilation Result:</h3>
                                <div className="bg-[#1F1F1F] border-[1px] border-white/10 p-4 overflow-x-auto">
                                    <div className="text-sm font-mono text-white/80 whitespace-pre-wrap">
                                        {JSON.stringify(apiResponse, null, 2)}
                                    </div>
                                </div>
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
                      
                        const result = await deployContract(config, {
                            abi: apiResponse?.abi,
                            bytecode: apiResponse?.bytecode as `0x${string}` ,
                            args: [args],
                        });

                        setHash(result as `0x${string}`);
                    }}
                >
                    <BlocksIcon className="w-4 h-4 mr-2" />
                    Deploy Contract
                </Button>
            </div>

            {/* New div to display hash information */}
            {hash && (
                <div className="fixed bottom-16 right-4 bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold mb-2">Contract Deployed</h3>
                    <p className="text-sm">Transaction Hash:</p>
                    <p className="text-xs font-mono break-all">{hash}</p>
                </div>
            )}
        </div>
    );
};

export default CompilePage;
