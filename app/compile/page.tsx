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
    return (
        <div className="flex flex-col min-h-screen text-white">
            <Navbar />
            <Sidebar />

            <div className="flex-grow flex w-full px-32 py-16">

                <main className="flex-grow flex">
                    <section className="w-1/2 p-4">
                        <h2 className="text-2xl mb-4">Flow Graph</h2>
                        <FlowGraph />
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
