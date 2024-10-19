"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Wallet, ArrowRightLeft, Repeat, MessageSquare, DollarSign, Power, ChevronRight, ChevronLeft, Plus, Info, Code, ArrowRight } from 'lucide-react'
import { motion } from "framer-motion"
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/credeza"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Handle,
  useStore,
  NodeToolbar,
  Position,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { toast } from 'sonner'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Trash2 } from 'lucide-react'

const blockTypes = [
  { id: 'start', content: 'Connect Wallet', color: 'bg-[#451805]', borderColor: 'border-[#8A5035]', hoverBorderColor: 'hover:border-[#BE5B2A]', icon: Wallet },
  { id: 'swap', content: 'Swap Tokens', color: 'bg-[#142321]', borderColor: 'border-[#245C3D]', hoverBorderColor: 'hover:border-[#6AFB8E]', icon: ArrowRightLeft },
  { id: 'liquidity', content: 'Add Liquidity', color: 'bg-[#17273E]', borderColor: 'border-[#2F5B87]', hoverBorderColor: 'hover:border-[#87C6E0]', icon: Repeat },
  { id: 'governance', content: 'Vote on Proposal', color: 'bg-[#21173E]', borderColor: 'border-[#35285B]', hoverBorderColor: 'hover:border-[#A57BBE]', icon: MessageSquare },
  { id: 'stake', content: 'Stake Tokens', color: 'bg-[#322131]', borderColor: 'border-[#663B6A]', hoverBorderColor: 'hover:border-[#FB6A9E]', icon: DollarSign },
  { id: 'allocate', content: 'Allocate Tokens', color: 'bg-[#21173E]', borderColor: 'border-[#35285B]', hoverBorderColor: 'hover:border-[#A57BBE]', icon: DollarSign },
  { id: 'end', content: 'Disconnect', color: 'bg-[#4A0505]', borderColor: 'border-[#791919]', hoverBorderColor: 'hover:border-[#BC2F2F]', icon: Power },
]

const groupedBlocks = {
  "Trigger Actions": blockTypes.filter(block => ['start', 'end'].includes(block.id)),
  "Token Actions": blockTypes.filter(block => ['swap', 'stake', 'allocate'].includes(block.id)),
  "Liquidity": blockTypes.filter(block => block.id === 'liquidity'),
  "Governance": blockTypes.filter(block => block.id === 'governance'),
}

// Define the form schema
const formSchema = z.object({
  blockName: z.string().min(1, "Block name is required"),
  solidityCode: z.string().min(1, "Solidity code is required"),
})

export default function Web3BlocksComponent() {
  const [showFinishButton, setShowFinishButton] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [isCredenzaOpen, setIsCredenzaOpen] = useState(false)
  const [tutorialMode, setTutorialMode] = useState(false)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [flowSummary, setFlowSummary] = useState([])

  // Initialize the form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      blockName: "",
      solidityCode: "",
    },
  })

  const handleDeleteNode = (nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId))
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId))
    setFlowSummary((prevSummary) => prevSummary.filter((item) => item.fromId !== nodeId && item.toId !== nodeId))
  }

  const handleAddNode = (sourceNodeId, block) => {
    const newNodeId = Date.now().toString()
    const sourceNode = nodes.find(node => node.id === sourceNodeId)
    const newNode = {
      id: newNodeId,
      type: 'blockNode',
      position: { x: sourceNode.position.x, y: sourceNode.position.y + 150 },
      data: {
        ...block,
        onNodeClick: handleNodeClick,
        uniqueId: newNodeId,
        handleDeleteNode,
        handleAddNode,
      },
    }
    setNodes((nds) => [...nds, newNode])

    const newEdge = { id: `edge-${sourceNodeId}-${newNodeId}`, source: sourceNodeId, target: newNodeId, type: 'step' }
    setEdges((eds) => [...eds, newEdge])

    updateFlowSummary(sourceNodeId, newNodeId)
  }

  const addBlock = (block) => {
    const newNodeId = Date.now().toString()
    const newNode = {
      id: newNodeId,
      type: 'blockNode',
      position: { x: 100, y: 100 + nodes.length * 100 },
      data: {
        ...block,
        onNodeClick: handleNodeClick,
        uniqueId: newNodeId,
        handleDeleteNode,
        handleAddNode,
      },
    }
    setNodes((nds) => [...nds, newNode])
  }

  useEffect(() => {
    const hasStart = nodes.some(node => node.data.id === 'start')
    const hasEnd = nodes.some(node => node.data.id === 'end')
    setShowFinishButton(hasStart && hasEnd)
  }, [nodes])

  const handleFinish = () => {
    console.log("Finished! Transaction flow:", flowSummary)
    // Add your logic here for what should happen when the Finish button is clicked
  }

  const handleClear = () => {
    setNodes([])
    setEdges([])
    setFlowSummary([])
    toast.success('Blocks cleared')
  }

  const handleAddCustomBlock = () => {
    setIsCredenzaOpen(true)
  }

  const onSubmit = (values) => {
    const newCustomBlock = {
      id: 'custom',
      content: values.blockName,
      color: 'bg-[#3C3C3C]',
      borderColor: 'border-[#6C6C6C]',
      hoverBorderColor: 'hover:border-[#9C9C9C]',
      icon: Code,
      code: values.solidityCode,
    }

    addBlock(newCustomBlock)
    setIsCredenzaOpen(false)
    form.reset()
    toast.success('Custom block added!')
  }

  const handleNodeClick = (nodeId) => {
    // Handle node click if needed
    console.log("Node clicked:", nodeId)
  }

  // Handle edge creation
  const handleConnect = (params) => {
    setEdges((eds) => addEdge({ ...params, type: 'step' }, eds))
    updateFlowSummary(params.source, params.target)
  }

  const updateFlowSummary = (sourceId, targetId) => {
    const sourceNode = nodes.find((node) => node.id === sourceId)
    const targetNode = nodes.find((node) => node.id === targetId)

    setFlowSummary((prevSummary) => {
      // Check if the connection already exists
      const exists = prevSummary.some(
        (item) => item.fromId === sourceId && item.toId === targetId
      )
      if (!exists) {
        return [
          ...prevSummary,
          {
            from: sourceNode.data.content,
            to: targetNode.data.content,
            fromId: sourceId,
            toId: targetId,
          },
        ]
      } else {
        return prevSummary
      }
    })
  }

  // Custom node component for blocks
  const BlockNode = ({ data, isDragging, id }) => {
    const edges = useStore((state) => state.edges)
    const hasOutgoingEdges = edges.some(edge => edge.source === id)

    return (
      <div
        className={`${data.color} text-white p-6 rounded-lg shadow-md cursor-pointer select-none
                    flex items-center justify-between border-[1px] ${data.borderColor} ${data.hoverBorderColor} transition-colors w-[200px] ${
          isDragging ? 'opacity-70' : ''
        } relative group`}
      >
        <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
        <span>{data.content}</span>
        <data.icon className="w-4 h-4" />
        <Handle type="source" position={Position.Bottom} style={{ background: '#555' }} />

        {/* Delete button */}
        <Button
          variant="destructive"
          size="sm"
          onClick={() => data.handleDeleteNode(id)}
          className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10"
        >
          <Trash2 className="w-4 h-4" />
        </Button>

        {/* Hover actions for adding new blocks */}
        {!hasOutgoingEdges && (
          <div className="absolute top-full mt-2 left-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {blockTypes.map((block) => (
                  <DropdownMenuItem
                    key={block.id}
                    onSelect={() => data.handleAddNode(id, block)}
                  >
                    {block.content}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    )
  }

  const nodeTypes = {
    blockNode: BlockNode,
  }

  return (
    <div className="flex h-screen bg-[#141313] pt-8 selectable-none">
      <div className="relative translate-y-[1px]">

        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute left-4 top-4 z-10 bg-[#1F1F1F] border-[#2A2A2A] text-white"
        >
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>

        <div className="absolute right-4 top-4 w-10 h-10 flex items-center justify-center cursor-pointer group">
          <Info className="size-8 text-white/60 group-hover:shadow-lg transition-shadow duration-300" />
          <div className="absolute hidden group-hover:block bg-gray-800 text-white/60 text-xs rounded-md p-2 -top-10 right-0">
            Information about the blocks
          </div>
        </div>

        {/* tab bar */}
        <motion.div
          initial={false}
          animate={{ width: isOpen ? "18.4rem" : "0rem" }}
          transition={{ duration: 0.3 }}
          className="bg-[#141313] border-r border-[#555555] overflow-hidden h-full"
        >
          <div className="p-6 w-72 pt-12 selectable-none cursor-default">
            <h2 className="text-2xl font mt-4 mb-4 text-white">DeFi Blocks</h2>
            <div className="flex flex-col gap-6">
              {Object.entries(groupedBlocks).map(([category, blocks]) => (
                <div key={category}>
                  <h3 className="text-xs mb-2 text-white/80" style={{ color: blocks[0].color.replace('bg-', '') }}>
                    {category}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {blocks.map((block) => (
                      <div
                        key={block.id + block.content}
                        onClick={() => addBlock(block)}
                        className={`${block.color} text-white p-3 rounded-lg shadow-md cursor-pointer select-none
                                    flex items-center justify-between border-[1px] ${block.borderColor} ${block.hoverBorderColor} transition-colors`}
                      >
                        <span>{block.content}</span>
                        <block.icon className="w-5 h-5" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Custom Block button */}
              <div className="mt-16 w-full">
                <Button
                  onClick={handleAddCustomBlock}
                  className="bg-white text-black w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Custom Block
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      <motion.div
        className="flex-1 max-w-[52rem] flex flex-col ml-8"
        animate={{ marginLeft: isOpen ? "1rem" : "2rem" }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mt-4 mb-4">
          <div className="flex items-center gap-4 ml-8">
            <h2 className="text-2xl text-white mt-1">Project Name</h2>
            <div className="ml-7 mt-2 flex items-center space-x-2 justify-center">
              <Switch
                id="tutorial-mode"
                checked={tutorialMode}
                onCheckedChange={setTutorialMode}
              />
              <Label htmlFor="tutorial-mode" className="text-white">Toggle Hover</Label>
            </div>
          </div>
          {showFinishButton && (

            <div className="flex gap-2">
              <Button onClick={handleClear} className=" px-6 hover:bg-[#323232] text-white">
                Clear
              </Button>
              <Button onClick={handleFinish} className="bg-[#322131] hover:bg-[#21173E] text-white">
                Compile
              </Button>
            </div>
          )}
        </div>

        {/* Canvas */}
        <div id="block-canvas" className="flex-1 rounded-lg shadow-inner p-4 min-h-[200px] overflow-hidden bg-transparent">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={handleConnect}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={{ type: 'step' }} // Set edge type to 'step' for square lines
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      </motion.div>

      <motion.div
        className="ml-8 px-8 pt-2 bg-[#141313] border-t-[1px] border-l-[1px] border-[#555555] z-10 relative right-0 h-screen"
        animate={{ width: isOpen ? "30rem" : "40rem" }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl mt-4 mb-4 text-white">Flow Summary</h2>
        <div className="bg-[#1F1F1F] rounded-lg shadow-md p-4 border-2 border-[#2A2A2A]">
          {flowSummary.map((item, index) => (
            <div key={index} className="mb-2 flex items-center">
              <span className="mr-2 text-[#FB118E]">{index + 1}.</span>
              <span className="text-white">
                {item.from} &rarr; {item.to}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* modal add blocks */}
      <Credenza open={isCredenzaOpen} onOpenChange={setIsCredenzaOpen}>
        <CredenzaContent className='border-white/10'>
          <CredenzaHeader>
            <CredenzaTitle className="text-white">Add a Custom Block</CredenzaTitle>
            <CredenzaDescription className="text-white/80">
              Enter your Solidity code below to create a custom block.
            </CredenzaDescription>
          </CredenzaHeader>
          <CredenzaBody>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="blockName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Block Name</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          className="w-full p-2 rounded bg-[#1F1F1F] text-white border border-[#2A2A2A] focus:border-[#4A4A4A]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="solidityCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Solidity Code</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter your Solidity code here..."
                          className="font-mono h-40 bg-[#1F1F1F] text-white border-[#2A2A2A] focus:border-[#4A4A4A]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-2">
                  <CredenzaClose asChild>
                    <Button variant="secondary" type="button">Cancel</Button>
                  </CredenzaClose>
                  <Button type="submit">Create Block</Button>
                </div>
              </form>
            </Form>
          </CredenzaBody>
        </CredenzaContent>
      </Credenza>
    </div>
  )
}
