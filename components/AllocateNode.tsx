import React, { useState } from 'react'
import { Handle, Position } from 'reactflow'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { HandCoins } from 'lucide-react'

const AllocateNode = ({ data, isConnectable }) => {
    const [allocationType, setAllocationType] = useState('')
    const [amount, setAmount] = useState('')

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setAmount(value)
        }
    }

    return (
        <div className="bg-[#21173E] text-white p-4 rounded-lg shadow-md border-[1px] border-[#35285B] hover:border-[#4a397e] transition-colors w-[300px]">
            <div className="flex items-center justify-between mb-4">
                <span>Allocate Tokens</span>
                <HandCoins className="w-4 h-4" />
            </div>
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
            <div className="mb-4">{data.label}</div>
            <Select onValueChange={setAllocationType}>
                <SelectTrigger className="w-full mb-2 bg-[#291D4A] border-[1px] border-[#35285B] hover:border-[#4a397e] transition-colors">
                    <SelectValue placeholder="Select allocation type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                </SelectContent>
            </Select>
            <Input 
                type="text" 
                placeholder={allocationType === 'percentage' ? "Enter percentage" : "Enter amount"}
                value={amount}
                onChange={handleAmountChange}
                className="w-full mb-2 bg-[#291D4A] border-[1px] border-[#35285B]" 
            />
            <Input type="text" placeholder="Enter wallet address ie. 0x12435" className="w-full mb-2 bg-[#291D4A] border-[1px] border-[#35285B]" />
            <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
        </div>
    )
}

export default AllocateNode
