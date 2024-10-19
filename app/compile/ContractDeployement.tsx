import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContractDeployment: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);
  const contractAddress = "0x8353743c8Acc3E414FbC4E132F6A511D1A3dD74b";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="-mt-4 bg-[#141313] border-l-[1px] border-[#555555] p-8 py-12 h-screen">
      <h2 className="text-xl mb-2">Your Automated Contract is Successfully Deployed at:</h2>
      <div className="flex flex-row space-x-3 items-center">
        <Input 
          value={contractAddress}
          readOnly 
          className="bg-[#141313] border-[#555555]/30 text-white rounded-none w-96"
        />
        <Button
          onClick={copyToClipboard}
          className="flexml-2 bg-[#141313] border border-[#555555]/30 hover:bg-[#1F1F1F]"
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
  );
};

export default ContractDeployment;
