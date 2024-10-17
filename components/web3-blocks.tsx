"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Wallet, ArrowRightLeft, Repeat, MessageSquare, DollarSign, Power, Trash2, Pen, ChevronRight, ChevronLeft } from 'lucide-react'
import { motion, AnimatePresence, Reorder } from "framer-motion"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

// Define the block types with Web3/crypto content, colors, and icons
const blockTypes = [
  { id: 'start', content: 'Connect Wallet', color: 'bg-[#322131]', borderColor: 'border-[#663B6A]', icon: Wallet },
  { id: 'swap', content: 'Swap Tokens', color: 'bg-[#142321]', borderColor: 'border-[#245C3D]', icon: ArrowRightLeft },
  { id: 'liquidity', content: 'Add Liquidity', color: 'bg-[#17273E]', borderColor: 'border-[#2F5B87]', icon: Repeat },
  { id: 'governance', content: 'Vote on Proposal', color: 'bg-[#21173E]', borderColor: 'border-[#35285B]', icon: MessageSquare },
  { id: 'stake', content: 'Stake Tokens', color: 'bg-[#322131]', borderColor: 'border-[#663B6A]', icon: DollarSign },
  { id: 'end', content: 'Disconnect', color: 'bg-[#142321]', borderColor: 'border-[#245C3D]', icon: Power },
]

// Add this at the top of the file, after the blockTypes definition
const groupedBlocks = {
  "Wallet Actions": blockTypes.filter(block => ['start', 'end'].includes(block.id)),
  "Token Actions": blockTypes.filter(block => ['swap', 'stake'].includes(block.id)),
  "Liquidity": blockTypes.filter(block => block.id === 'liquidity'),
  "Governance": blockTypes.filter(block => block.id === 'governance'),
}

export default function Web3BlocksComponent() {
  const [placedBlocks, setPlacedBlocks] = useState([])
  const [showFinishButton, setShowFinishButton] = useState(false)
  const [isOpen, setIsOpen] = useState(true)

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
    <div className="flex h-screen bg-[#141313] pt-8">
      <div className="relative translate-y-[1px]">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute left-2 top-2 z-10 bg-[#1F1F1F] border-[#2A2A2A] text-white"
        >
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
        <motion.div
          initial={false}
          animate={{ width: isOpen ? "20rem" : "0rem" }}
          transition={{ duration: 0.3 }}
          className="bg-[#141313] border-r border-[#2A2A2A] overflow-hidden h-full"
        >
          <div className="p-6 w-80 pt-12">
            <h2 className="text-2xl font mb-4 text-white">dApp Actions</h2>
            <div className="flex flex-col gap-6">
              {Object.entries(groupedBlocks).map(([category, blocks]) => (
                <div key={category}>
                  <h3 className="text-xs mb-2 text-white/80" style={{ color: blocks[0].color.replace('bg-', '') }}>
                    {category}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {blocks.map((block) => (
                      <button
                        key={block.id}
                        onClick={() => addBlock(block)}
                        className={`${block.color} text-white p-3 rounded-lg shadow-md cursor-pointer select-none
                                    flex items-center justify-between border-2 ${block.borderColor} hover:border-[#FB118E] transition-colors`}
                      >
                        <span>{block.content}</span>
                        <block.icon className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="flex-1 flex flex-col ml-8"
        animate={{ marginLeft: isOpen ? "1rem" : "2rem" }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mt-4 mb-4">
          <h2 className="text-2xl font-bold text-white">Transaction Flow</h2>
          {showFinishButton && (
            <Button onClick={handleFinish} className="bg-[#322131] hover:bg-[#21173E] text-white">
              Execute Flow
            </Button>
          )}
        </div>
        <div className="flex-1 bg-[#1F1F1F] rounded-lg shadow-inner p-4 min-h-[200px] overflow-y-auto border-2 border-[#2A2A2A]">
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
                                  flex items-center justify-between border-2 ${block.borderColor} hover:border-[#FB118E] transition-colors w-full`}
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
      </motion.div>

      <motion.div
        className="w-64 ml-8"
        animate={{ width: isOpen ? "16rem" : "20rem" }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl mt-4 mb-4 text-white">Flow Summary</h2>
        <div className="bg-[#1F1F1F] rounded-lg shadow-md p-4 border-2 border-[#2A2A2A]">
          {placedBlocks.map((block, index) => (
            <div key={block.uniqueId} className="mb-2 flex items-center">
              <span className="mr-2 text-[#FB118E]">{index + 1}.</span>
              <block.icon className="w-4 h-4 mr-2 text-[#FB118E]" />
              <span className="text-white">{block.content}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
