'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import FlowGraph from '@/app/compile/FlowGraph';
import ContractDeployment from './ContractDeployement';
import ContractCode from './ContractCode';
import { Button } from '@/components/ui/button';
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { ArrowLeft, Blocks as BlocksIcon } from 'lucide-react';

//todo
// make the contract page actaully work better
// make custom node with editable parameters
// make the flow graph more interactive

const CompilePage: React.FC = () => {
    const searchParams = useSearchParams();
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [flowSummary, setFlowSummary] = useState([]);

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

    const handleCompile = () => {
        const flowSummaryJSON = {
            nodes: nodes,
            edges: edges,
            summary: flowSummary
        };
        console.log('Flow Summary JSON:', JSON.stringify(flowSummaryJSON, null, 2));
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
                            <FlowGraph nodes={nodes} edges={edges} flowSummary={flowSummary} />
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
                            onClick={handleCompile}
                        >
                            <BlocksIcon className="w-4 h-4 mr-1 translate-x-1 group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
                            Compile
                        </Button>
                    </section>

                    <section className="w-1/2 p-4">
                        <ContractDeployment />
                    </section>
                </main>
            </div>
        </div>
    );
};

export default CompilePage;
