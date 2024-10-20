import { NextResponse, NextRequest } from "next/server";
import fs from 'fs';
import path from 'path';
import { ContractFactory, ethers } from 'ethers';
var solc = require('solc');

export async function POST(req: NextRequest) {

    const { contractName, filePath } = await req.json();
    try {
        const filePath = 'test.mov'
        const source = fs.readFileSync(filePath, 'utf8');
        const input = {
            language: 'Solidity',
            sources: {
                'test.mov': {
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
        console.log("checking contractName", contractName)

        return new NextResponse(JSON.stringify({ bytecode: bytecode, abi: abi }));
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ error: "Contract deployment failed" }), { status: 500 });
    }
}
