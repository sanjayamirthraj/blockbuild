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
                body: JSON.stringify({ contractName: "TokenSwap", name: outputs.contractName }),
            });
            const compilationResult = await resultofcompilation.json();
            setApiResponse(compilationResult.abi); // Store the API response in state

        // console.log(compilationResult);
    };

   
    return (
        <div className="flex flex-col min-h-screen text-white">
            <Navbar />
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
                        <ContractDeployment />
                    </section>
                </main>
            </div>
            <div className="fixed bottom-4 right-4">
                <Button
                    variant="default"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    // onClick={async () => {
                    //     try {
                    //         const response = await fetch('/deploy-contract', {
                    //             method: 'POST',
                    //             headers: {
                    //                 'Content-Type': 'application/json',
                    //             },
                    //             body: JSON.stringify({ abi: apiResponse.abi, bytecode: apiResponse.bytecode, args: [] }),
                    //         });
                    //         const result = await response.json();
                    //         console.log('Compilation result:', result);
                    //         // Handle the result as needed, e.g., show a success message
                    //         setApiResponse(result.abi); // Reset the API response state
                    //     } catch (error) {
                    //         console.error('Error compiling contract:', error);
                    //         // Handle the error, e.g., show an error message
                    //     }
                       
                    // }}
                >
                    <BlocksIcon className="w-4 h-4 mr-2" />
                    Deploy Contract
                </Button>
            </div>
        </div>
    );
};

export default CompilePage;
