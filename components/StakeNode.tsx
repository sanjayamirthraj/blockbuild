import React, { useState, useCallback } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Landmark, Plus } from 'lucide-react'

const tokens = ['ETH', 'USDT', 'BTC', 'DAI', 'LINK']

const StakeNode: React.FC<NodeProps> = ({ data, isConnectable }) => {
    const [selectedToken, setSelectedToken] = useState(tokens[0])
    const [amount, setAmount] = useState('')

    const onTokenChange = useCallback((value: string) => {
        setSelectedToken(value)
    }, [])

    const onAmountChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value)
    }, [])

    return (
        <div className="bg-[#322131] text-white p-4 rounded-lg shadow-md border-[1px] border-[#663B6A] hover:border-[#FB6A9E] transition-colors w-[250px]">
            <div className="flex items-center justify-between mb-4">
                <span>Stake Tokens</span>
                <Landmark className="w-4 h-4" />
            </div>
            <div className="flex flex-col space-y-2" onClick={(e) => e.stopPropagation()}>
                <Select onValueChange={onTokenChange} value={selectedToken}>
                    <SelectTrigger className="w-full bg-[#251A2A] border-[1px] border-[#663B6A]">
                        <SelectValue placeholder="Select Token" />
                    </SelectTrigger>
                    <SelectContent>
                        {tokens.map((token) => (
                            <SelectItem key={token} value={token}>
                                {token}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <div className="flex items-center space-x-2">
                    <Input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={onAmountChange}
                        className="bg-[#251A2A] border-[1px] border-[#663B6A]"
                    />
                    <Plus className="w-4 h-4 cursor-pointer hover:text-[#FB6A9E]" />
                </div>
            </div>
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
            <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
        </div>
    )
}

export default StakeNode