import React from 'react';
import { Input } from '@/components/ui/input';

const ContractDeployment: React.FC = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl mb-2">Your Automated Contract is Successfully Deployed at:</h2>
      <Input 
        value="0x8353743c8Acc3E414FbC4E132F6A511D1A3dD74b" 
        readOnly 
      />
    </div>
  );
};

export default ContractDeployment;