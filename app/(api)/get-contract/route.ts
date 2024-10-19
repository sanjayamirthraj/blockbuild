import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'test.sol');
        const contractCode = await fs.readFile(filePath, 'utf8');
        return NextResponse.json({ contractCode });
    } catch (error) {
        console.error('Error reading contract file:', error);
        return NextResponse.json({ error: 'Failed to read contract file' }, { status: 500 });
    }
}
