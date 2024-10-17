"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Wallet, ArrowRightLeft, Repeat, MessageSquare, DollarSign, Power, Trash2, Pen } from 'lucide-react'
import { motion, Reorder } from "framer-motion"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

// Define the block types with Web3/crypto content, colors, and icons
const blockTypes = [
  { id: 'start', content: 'Connect Wallet', color: 'bg-[#FF007A]', icon: Wallet },
  { id: 'swap', content: 'Swap Tokens', color: 'bg-[#FB118E]', icon: ArrowRightLeft },
  { id: 'liquidity', content: 'Add Liquidity', color: 'bg-[#C32DA7]', icon: Repeat },
  { id: 'governance', content: 'Vote on Proposal', color: 'bg-[#7A1FB7]', icon: MessageSquare },
  { id: 'stake', content: 'Stake Tokens', color: 'bg-[#9E1FB7]', icon: DollarSign },
  { id: 'end', content: 'Disconnect', color: 'bg-[#2172E5]', icon: Power },
]

export default function Web3BlocksComponent() {
  const [placedBlocks, setPlacedBlocks] = useState([])
  const [showFinishButton, setShowFinishButton] = useState(false)

  const addBlock = (block) => {
    setPlacedBlocks(prevBlocks => [...prevBlocks, { ...block, uniqueId: Date.now().toString() }])
  }

  const removeBlock = (uniqueId) => {
    setPlacedBlocks(prevBlocks => prevBlocks.filter(block => block.uniqueId !== uniqueId))
  }

  useEffect(() => {
    const hasStart = placedBlocks.some(block => block.id === 'start')
    const hasEnd = placedBlocks.some(block => block.id === 'end')
    setShowFinishButton(hasStart && hasEnd)
  }, [placedBlocks])

  const handleFinish = () => {
    console.log("Finished! Transaction flow:", placedBlocks)
    // Add your logic here for what should happen when the Finish button is clicked
  }

  const handleDelete = (uniqueId) => {
    removeBlock(uniqueId)
  }

  const handleCustomize = (uniqueId) => {
    // Add your customize logic here
    console.log("Customize block:", uniqueId)
  }

  return (
    <div className="flex h-screen bg-[#F5F6FC] p-8">
      <div className="w-64 mr-8">
        <h2 className="text-2xl font-bold mb-4 text-[#0D111C]">DApp Actions</h2>
        <div className="flex flex-col gap-4">
          {blockTypes.map((block) => (
            <button
              key={block.id}
              onClick={() => addBlock(block)}
              className={`${block.color} text-white p-4 rounded-lg shadow-md cursor-pointer select-none
                          flex items-center justify-between border-2 border-white hover:border-[#FB118E] transition-colors`}
            >
              <span>{block.content}</span>
              <block.icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#0D111C]">Transaction Flow</h2>
          {showFinishButton && (
            <Button onClick={handleFinish} className="bg-[#FF007A] hover:bg-[#FB118E] text-white">
              Execute Flow
            </Button>
          )}
        </div>
        <div className="flex-1 bg-white rounded-lg shadow-inner p-4 min-h-[200px] overflow-y-auto border-2 border-[#E8ECFB]">
          <Reorder.Group axis="y" values={placedBlocks} onReorder={setPlacedBlocks} className="flex flex-col gap-2">
            {placedBlocks.map((block) => (
              <Reorder.Item key={block.uniqueId} value={block} className="list-none">
                <ContextMenu>
                  <ContextMenuTrigger>
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`${block.color} text-white p-4 rounded-lg shadow-md cursor-move select-none
                                  flex items-center justify-between border-2 border-white hover:border-[#FB118E] transition-colors w-full`}
                    >
                      <span>{block.content}</span>
                      <block.icon className="w-5 h-5" />
                    </motion.div>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem onClick={() => handleCustomize(block.uniqueId)}>
                      <Pen className="mr-2 h-4 w-4" />
                      <span>Customize</span>
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => handleDelete(block.uniqueId)} className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      </div>

      <div className="w-64 ml-8">
        <h2 className="text-2xl font-bold mb-4 text-[#0D111C]">Flow Summary</h2>
        <div className="bg-white rounded-lg shadow-md p-4 border-2 border-[#E8ECFB]">
          {placedBlocks.map((block, index) => (
            <div key={block.uniqueId} className="mb-2 flex items-center">
              <span className="mr-2 text-[#7A1FB7]">{index + 1}.</span>
              <block.icon className="w-4 h-4 mr-2 text-[#7A1FB7]" />
              <span className="text-[#0D111C]">{block.content}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
