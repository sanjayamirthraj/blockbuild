'use client'
import { useState } from "react";
import Image from "next/image";
import Web3BlocksComponent from "../components/web3-blocks";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ContractCode from "../compile/ContractCode";

export default function Home() {
  const [contractCode, setContractCode] = useState<string | null>(null);

  const handleCreateContract = async () => {
    try {
      const response = await fetch('/deploy-contract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ /* your contract creation data */ }),
      });

      if (!response.ok) {
        throw new Error('Failed to create contract');
      }

      const data = await response.json();
      setContractCode(data.contractCode);
    } catch (error) {
      console.error('Error creating contract:', error);
    }
  };

  return (
    <div className="fixed w-full">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Navbar />
        <div className="pl-32 w-full pt-8">
          <Web3BlocksComponent />
          <button onClick={handleCreateContract} className="mt-4 p-2 bg-blue-500 text-white rounded">
            Create Contract
          </button>
          {contractCode && <ContractCode code={contractCode} />}
        </div>
        <Sidebar />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>Made by Sanjay and Oleg</p>
      </footer>
    </div>
  );
}
