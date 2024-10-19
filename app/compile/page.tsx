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

    return (
        <div className="flex flex-col min-h-screen text-white">
            <Navbar />
            <Sidebar />

            <div className="flex-grow flex w-full px-32 py-16">
                <main className="flex-grow flex">
                    <section className="w-1/2 p-4">
                        <Button>
                            <Link href="/">Go Back</Link>
                        </Button>
                        
                        <h2 className="text-2xl mb-4">Flow Graph</h2>
                        
                        <FlowGraph nodes={nodes} edges={edges} flowSummary={flowSummary} />
                    </section>

                    <section className="w-1/2 p-4">
                        <ContractDeployment />
                        <ContractCode />
                    </section>
                </main>
            </div>
        </div>
    );
};

export default CompilePage;
