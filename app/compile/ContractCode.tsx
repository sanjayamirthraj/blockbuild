import React from 'react';

interface ContractCodeProps {
    code: string;
}

const ContractCode: React.FC<ContractCodeProps> = ({ code }) => {
    return (
        <div className="contract-code">
            <h2>Contract Code</h2>
            <pre>{code}</pre> {/* Display the contract code */}
        </div>
    );
};

export default ContractCode;
