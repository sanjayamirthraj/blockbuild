import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import '@rainbow-me/rainbowkit/styles.css'
import { createConnector } from '@wagmi/core'

const ContractDeployment: React.FC<{ hash: `0x${string}` }> = ({ hash }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [contractCode, setContractCode] = useState<string>('');
  const contractAddress = "Click deploy to get your contract address";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setIsCopied(true);
      let count = 0;
      const interval = setInterval(() => {
        if (count >= 50) {
          clearInterval(interval);
          setIsCopied(false);
        }
        count++;
      }, 40); // 50 times in 2 seconds = 40ms interval
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  useEffect(() => {
    const fetchContractCode = async () => {
      try {
        const response = await fetch('/get-contract');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { contractCode } = await response.json();
        setContractCode(contractCode);
      } catch (error) {
        console.error('Error fetching contract code:', error);
      }
    };

    const intervalId = setInterval(fetchContractCode, 2000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="-mt-4 bg-[#141313] border-l-[1px] border-[#555555] p-8 py-12 h-screen space-y-10">
      
      
      <div>
        <h2 className="text-lg mb-2">Your Automated Contract is Successfully Deployed at:</h2>
        <div className="flex flex-row space-x-3 items-center">
          <Input
            value={contractAddress}
            readOnly
            className="bg-[#141313] border-[#555555]/30 text-white rounded-none w-96"
          />
          <Button
            onClick={copyToClipboard}
            className="flex ml-2 bg-[#141313] border border-[#555555]/30 hover:bg-[#1F1F1F]"
            size="icon"
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          {isCopied && (
            <p className="text-sm text-green-500">Copied to clipboard!</p>
          )}
        </div>
      </div>

      <div className='w-full'>
      <h2 className="text-lg mb-2">Your Contract Code</h2>
        <div className='text-[#B2B2B2] text-sm font-mono w-full bg-[#202020] border-[1px] border-[#3C3C3C] p-6 whitespace-pre-wrap'>
          {contractCode || '// Loading contract code...'}
        </div>
      </div>
    </div>
  );
};

export default ContractDeployment;
