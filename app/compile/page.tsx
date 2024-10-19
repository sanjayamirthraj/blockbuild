'use client';

import React from 'react';
import FlowGraph from '@/app/compile/FlowGraph';
import ContractDeployment from './ContractDeployement';
import ContractCode from './ContractCode';
import { Button } from '@/components/ui/button';

const CompilePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="p-4">
        <Button variant="outline" onClick={() => { /* Handle go back */ }}>
          ← Go Back
        </Button>
      </header>
      
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
      
      <footer className="p-4 flex justify-end">
        <Button onClick={() => { /* Handle finish */ }}>
          Finish
        </Button>
      </footer>
    </div>
  );
};

export default CompilePage;