import { NextResponse, NextRequest } from "next/server";
import fs from 'fs';
import path from 'path';
import { ethers } from 'ethers';

export async function POST(req: NextRequest) {
    const { contractName, providerUrl, privateKey } = await req.json();

    try {
        const filePath = path.join(process.cwd(), `${contractName}.sol`);

        const contractCode = fs.readFileSync(filePath, 'utf-8');
        const provider = new ethers.providers.JsonRpcProvider(providerUrl);
        const wallet = new ethers.Wallet(privateKey, provider);
        const compiledContract = await compileContract(contractCode);
        const factory = new ethers.ContractFactory(compiledContract.abi, compiledContract.bytecode, wallet);
        const contract = await factory.deploy();
        await contract.deployed();

        return new NextResponse(JSON.stringify({ message: "Contract deployed successfully", contractAddress: contract.address }));
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ error: "Contract deployment failed" }), { status: 500 });
    }
}

// Function to compile the Solidity contract
async function compileContract(contractCode: string) {
    const solc = require('solc'); // Ensure you have solc installed
    const input = {
        language: 'Solidity',
        sources: {
            'Contract.sol': {
                content: contractCode,
            },
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*'],
                },
            },
        },
    };

    const output = JSON.parse(solc.compile(JSON.stringify(input)));
    const contractName = Object.keys(output.contracts['Contract.sol'])[0];
    return output.contracts['Contract.sol'][contractName];
}

