import { NextResponse, NextRequest } from "next/server";
import OpenAI from "openai";
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
    apiKey: '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',
});

export async function POST(req: NextRequest, res: NextResponse) {
    const { message, name } = await req.json();
    try {
        const message = "methods: [methods with name 'swap' and parameters: [parameter with name 'coinA' and type 'address', parameter with name 'coinB' and type 'address']], structs: []";
        const options = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer sid-sk-rY7kT9_Mj1ELODrHNZ4d3111yuVnjlUl-GgjeVmVRMay',
                'Content-Type': 'application/json'
            },
            body: `{"query":"You are a helpful coding AI assistant that has access to a highly advanced search engine that helps you find documents that contain information about the user. Your answers are concise, informative, and use the context provided by the document search. Develop a solidity code for a smart contract that is secure and efficient. The following is an object that lists all the methods and their parameters. Only return the smart contract code. Do not make placeholder comments. Implement all methods. Do not have comments in the code. Do not return anything else. This is the spec:${message},","limit":1}`

        };
        fetch('https://top-tier-wasserstein-distance.sid.ai/query', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));


        const formattedCode = await generateAndFormatSolidityCode(message);
        // console.log(formattedCode);
        fs.writeFileSync(`test.sol`, formattedCode);
        return new NextResponse(JSON.stringify({ message: "Solidity file created successfully" }));
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "send-to-rag is not working" }), { status: 500 });
    }
}

async function generateAndFormatSolidityCode(message: string): Promise<string> {
    const code = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { "role": "user", "content": "Develop a solidity code for a smart contract that is secure and efficient. The following is a json object that lists all the methods and their paramters. Only return the smart contract code. Do not make placeholder comments. Do not return anything else. This is the json object: " + message }
        ]
    });
    return formatSolidityCode(code.choices[0].message.content as string);
}


function formatSolidityCode(code: string): string {
    return code
        .replace(/^```solidity\n/, '')
        .replace(/\n```$/, '');
}