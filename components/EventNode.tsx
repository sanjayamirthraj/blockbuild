import React, { useState, useCallback } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Fan, ChevronLeft, ChevronRight, Equal, Pencil  } from 'lucide-react'

const currencies = ['ETH', 'USDT', 'BTC', 'DAI', 'LINK']

const EventNode: React.FC<NodeProps> = ({ data, isConnectable }) => {
    const [fromCurrency, setFromCurrency] = useState(currencies[0])
    const [toCurrency, setToCurrency] = useState(currencies[1])
    const [comparisonType, setComparisonType] = useState('')

    const onFromCurrencyChange = useCallback((value: string) => {
        setFromCurrency(value)
    }, [])

    const onToCurrencyChange = useCallback((value: string) => {
        setToCurrency(value)
    }, [])

    const onComparisonTypeChange = useCallback((value: string) => {
        setComparisonType(value)
    }, [])

    return (
        <div className="bg-[#4A0505] text-white p-4 rounded-lg shadow-md border-[1px] border-[#791919] hover:border-[#BC2F2F] transition-colors w-[250px]">
            <div className="flex items-center justify-between mb-4">
                <span>On Event</span>
                <Fan className="w-4 h-4" />
            </div>
            <div className="flex flex-col space-y-2" onClick={(e) => e.stopPropagation()}>
                <Select onValueChange={onFromCurrencyChange} value={fromCurrency}>
                    <SelectTrigger className="w-full bg-[#5A0606] border-[1px] border-[#791919]">
                        <SelectValue placeholder="From" />
                    </SelectTrigger>
                    <SelectContent>
                        {currencies.map((currency) => (
                            <SelectItem key={currency} value={currency}>
                                {currency}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                
                <Select onValueChange={onComparisonTypeChange} value={comparisonType}>
                    <SelectTrigger className="w-full bg-[#5A0606] border-[1px] border-[#791919]">
                        <SelectValue placeholder="Select comparison" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="lessThan" className='flex flex-row items-center'> Less Than</SelectItem>
                        <SelectItem value="greaterThan" className='flex flex-row items-center'> Greater Than</SelectItem>
                        <SelectItem value="equalTo" className='flex flex-row items-center'> Equal To</SelectItem>
                        <SelectItem value="custom" className='flex flex-row items-center'>Custom</SelectItem>
                    </SelectContent>
                </Select>
                
                <Select onValueChange={onToCurrencyChange} value={toCurrency}>
                    <SelectTrigger className="w-full bg-[#5A0606] border-[1px] border-[#791919]">
                        <SelectValue placeholder="To" />
                    </SelectTrigger>
                    <SelectContent>
                        {currencies.map((currency) => (
                            <SelectItem key={currency} value={currency}>
                                {currency}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
            <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
        </div>
    )
}

export default EventNode
