import { NextResponse, NextRequest } from "next/server";
import fs from 'fs';
import path from 'path';
import { ContractFactory, ethers } from 'ethers';
var solc = require('solc');

export async function POST(req: NextRequest) {

    const { contractName, filePath } = await req.json();
    try {
        const filePath = 'test.sol'
        const source = fs.readFileSync(filePath, 'utf8');
        const contractName = path.basename(filePath).split('.')[0];
        const input = {
            language: 'Solidity',
            sources: {
                'test.sol': {
                    content: source,
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
        const bytecode = output.contracts[filePath][contractName].evm.bytecode.object;
        console.log(bytecode);
        const abi = output.contracts[filePath][contractName].abi;
        console.log(abi);
        return new NextResponse(JSON.stringify({ message: "Contract compiled successfully" }));
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ error: "Contract deployment failed" }), { status: 500 });
    }
}
