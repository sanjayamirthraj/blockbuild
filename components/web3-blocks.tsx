"use client"

// React and Next.js imports
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'

// UI components and utilities
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"


// Third-party libraries
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import {
  Wallet,
  ArrowRightLeft,
  Repeat,
  MessageSquare,
  DollarSign,
  Power,
  ChevronRight,
  ChevronLeft,
  Plus,
  Info,
  Code,
  Landmark,
  Droplets,
  HandCoins,
  Fan,
  Sprout,
  Tractor,
  BarChart3,
  Clock,
  Package,
  TrendingDown,
  TrendingUp,
  PiggyBank,
  Coins,
  Banknote,
  Users,
  Zap,
  Briefcase,
  LockKeyhole,
  Gift,
  History,
  ChartLine,
  Plane,
  Flag,
} from 'lucide-react'
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
  reconnectEdge,
  getOutgoers,
  useReactFlow,
  ReactFlowProvider,
  BaseEdge,
  NodeProps,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { toast } from 'sonner'
import CustomBlockModal from './CustomBlockModal'
import SwapNode from './SwapNode'
import StakeNode from './StakeNode'
import LiquidityNode from './LiquidityNode'
import AllocateNode from './AllocateNode'
import EventNode from './EventNode'

// Define the different block types with their properties
const blockTypes = [
  // Trigger Actions
  { id: 'start', content: 'Upon Initialise', color: 'bg-[#451805]', borderColor: 'border-[#8A5035]', hoverBorderColor: 'hover:border-[#BE5B2A]', icon: Flag },
  { id: 'end', content: 'Disconnect', color: 'bg-[#451805]', borderColor: 'border-[#8A5035]', hoverBorderColor: 'hover:border-[#BE5B2A]', icon: Power },

  // Token Actions
  { id: 'swap', content: 'Swap Tokens', color: 'bg-[#142321]', borderColor: 'border-[#245C3D]', hoverBorderColor: 'hover:border-[#6AFB8E]', icon: ArrowRightLeft },
  { id: 'stake', content: 'Stake Tokens', color: 'bg-[#142321]', borderColor: 'border-[#245C3D]', hoverBorderColor: 'hover:border-[#6AFB8E]', icon: Landmark },
  { id: 'allocate', content: 'Allocate Tokens', color: 'bg-[#142321]', borderColor: 'border-[#245C3D]', hoverBorderColor: 'hover:border-[#6AFB8E]', icon: HandCoins },
  { id: 'startYieldFarming', content: 'Start Yield Farming', color: 'bg-[#142321]', borderColor: 'border-[#245C3D]', hoverBorderColor: 'hover:border-[#6AFB8E]', icon: Sprout },
  { id: 'stopYieldFarming', content: 'Stop Yield Farming', color: 'bg-[#142321]', borderColor: 'border-[#245C3D]', hoverBorderColor: 'hover:border-[#6AFB8E]', icon: Tractor },
  { id: 'lendTokens', content: 'Lend Tokens', color: 'bg-[#142321]', borderColor: 'border-[#245C3D]', hoverBorderColor: 'hover:border-[#6AFB8E]', icon: PiggyBank },
  { id: 'borrowTokens', content: 'Borrow Tokens', color: 'bg-[#142321]', borderColor: 'border-[#245C3D]', hoverBorderColor: 'hover:border-[#6AFB8E]', icon: Coins },
  { id: 'repayLoan', content: 'Repay Loan', color: 'bg-[#142321]', borderColor: 'border-[#245C3D]', hoverBorderColor: 'hover:border-[#6AFB8E]', icon: Banknote },
  { id: 'claimTokens', content: 'Claim Tokens', color: 'bg-[#142321]', borderColor: 'border-[#245C3D]', hoverBorderColor: 'hover:border-[#6AFB8E]', icon: Gift },

  // Liquidity
  { id: 'liquidity', content: 'Add Liquidity', color: 'bg-[#17273E]', borderColor: 'border-[#2F5B87]', hoverBorderColor: 'hover:border-[#87C6E0]', icon: Droplets },
  { id: 'createStakingPool', content: 'Create Staking Pool', color: 'bg-[#17273E]', borderColor: 'border-[#2F5B87]', hoverBorderColor: 'hover:border-[#87C6E0]', icon: Users },

  // Portfolio Management
  { id: 'rebalancePortfolio', content: 'Rebalance Portfolio', color: 'bg-[#2F1E3A]', borderColor: 'border-[#472A56]', hoverBorderColor: 'hover:border-[#663E7D]', icon: BarChart3 },
  { id: 'setRebalanceFrequency', content: 'Set Rebalance Frequency', color: 'bg-[#2F1E3A]', borderColor: 'border-[#472A56]', hoverBorderColor: 'hover:border-[#663E7D]', icon: Clock },
  { id: 'createCustomIndex', content: 'Create Custom Index', color: 'bg-[#2F1E3A]', borderColor: 'border-[#472A56]', hoverBorderColor: 'hover:border-[#663E7D]', icon: Package },
  { id: 'setStopLoss', content: 'Set Stop Loss', color: 'bg-[#2F1E3A]', borderColor: 'border-[#472A56]', hoverBorderColor: 'hover:border-[#663E7D]', icon: TrendingDown },
  { id: 'setTakeProfit', content: 'Set Take Profit', color: 'bg-[#2F1E3A]', borderColor: 'border-[#472A56]', hoverBorderColor: 'hover:border-[#663E7D]', icon: TrendingUp },
  { id: 'setStrategy', content: 'Set Strategy', color: 'bg-[#2F1E3A]', borderColor: 'border-[#472A56]', hoverBorderColor: 'hover:border-[#663E7D]', icon: Briefcase },

  // Governance
  { id: 'governance', content: 'Vote on Proposal', color: 'bg-[#21173E]', borderColor: 'border-[#35285B]', hoverBorderColor: 'hover:border-[#A57BBE]', icon: MessageSquare },
  { id: 'createVesting', content: 'Create Vesting', color: 'bg-[#21173E]', borderColor: 'border-[#35285B]', hoverBorderColor: 'hover:border-[#A57BBE]', icon: LockKeyhole },

  // Events
  { id: 'event', content: 'On Event Outcome', color: 'bg-[#4A0505]', borderColor: 'border-[#791919]', hoverBorderColor: 'hover:border-[#BC2F2F]', icon: Fan },
  { id: 'executeFlashLoan', content: 'Execute Flash Loan', color: 'bg-[#4A0505]', borderColor: 'border-[#791919]', hoverBorderColor: 'hover:border-[#BC2F2F]', icon: Zap },
  { id: 'initiateAirdrop', content: 'Initiate Airdrop', color: 'bg-[#4A0505]', borderColor: 'border-[#791919]', hoverBorderColor: 'hover:border-[#BC2F2F]', icon: Plane },

  // Analytics
  { id: 'getTransactionHistory', content: 'Get Transaction History', color: 'bg-[#1E3A3A]', borderColor: 'border-[#2A5656]', hoverBorderColor: 'hover:border-[#3E7D7D]', icon: History },
  { id: 'getPortfolioAnalytics', content: 'Get Portfolio Analytics', color: 'bg-[#1E3A3A]', borderColor: 'border-[#2A5656]', hoverBorderColor: 'hover:border-[#3E7D7D]', icon: ChartLine },
]

// Group blocks into categories for the sidebar
const groupedBlocks = {
  "Trigger Actions": blockTypes.filter(block => ['start', 'end', 'disconnect', 'initialise'].includes(block.id)),
  "Token Actions": blockTypes.filter(block => ['swap', 'stake', 'allocate', 'startYieldFarming', 'stopYieldFarming', 'lendTokens', 'borrowTokens', 'repayLoan', 'claimTokens'].includes(block.id)),
  "Liquidity": blockTypes.filter(block => ['liquidity', 'createStakingPool'].includes(block.id)),
  "Portfolio Management": blockTypes.filter(block => ['rebalancePortfolio', 'setRebalanceFrequency', 'createCustomIndex', 'setStopLoss', 'setTakeProfit', 'setStrategy'].includes(block.id)),
  "Governance": blockTypes.filter(block => ['governance', 'createVesting'].includes(block.id)),
  "Events": blockTypes.filter(block => ['event', 'executeFlashLoan', 'initiateAirdrop'].includes(block.id)),
  "Analytics": blockTypes.filter(block => ['getTransactionHistory', 'getPortfolioAnalytics'].includes(block.id)),
  "Custom": blockTypes.filter(block => ['custom'].includes(block.id)),
}

// Form validation schema using Zod
const formSchema = z.object({
  blockName: z.string().min(1, "Block name is required"),
  solidityCode: z.string().min(1, "Solidity code is required"),
})

// Define BlockNode component outside of Web3BlocksComponent
const BlockNode = ({ data, isDragging, id }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const isSelected = id === selectedNode;
  if (data.id === 'swap') {
    return <SwapNode data={data} isConnectable={true} id={''} selected={false} type={''} zIndex={0} xPos={0} yPos={0} dragging={false} />;
  }
  if (data.id === 'stake') {
    return <StakeNode data={data} isConnectable={true} type={''} id={''} selected={false} zIndex={0} xPos={0} yPos={0} dragging={false} />;
  }
  if (data.id === 'liquidity') {
    return <LiquidityNode data={data} isConnectable={true} id={''} selected={false} type={''} zIndex={0} xPos={0} yPos={0} dragging={false} />;
  }
  if (data.id === 'allocate') {
    return <AllocateNode data={data} isConnectable={true} selected={false} type={''} zIndex={0} xPos={0} yPos={0} dragging={false} />;
  }
  if (data.id === 'event') {
    return <EventNode data={data} isConnectable={true} id={''} selected={false} type={''} zIndex={0} xPos={0} yPos={0} dragging={false} />;
  }
  return (
    <div
      className={`${data.color} text-white p-6 rounded-lg shadow-md cursor-pointer select-none
                flex items-center justify-between border-[1px] transition-colors w-[200px] ${isDragging ? 'opacity-70' : ''}
                ${isSelected ? 'border-white shadow-glow' : data.borderColor} ${isSelected ? '' : data.hoverBorderColor} relative`}
    >
      {id !== 'start' && <Handle type="target" position={Position.Top} style={{ background: '#555' }} />}
      <span>{data.content}</span>
      <data.icon className="w-4 h-4" />
      <Handle type="source" position={Position.Bottom} style={{ background: '#555' }} />
    </div>
  );
};

// Define nodeTypes outside of the component
const nodeTypes = {
  blockNode: BlockNode,
  swapNode: SwapNode,
  stakeNode: StakeNode,
  liquidityNode: LiquidityNode,
  eventNode: EventNode,
}

// Main component for the DeFi Blocks builder
function Web3BlocksComponent() {
  // State variables
  const [showFinishButton, setShowFinishButton] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [isCredenzaOpen, setIsCredenzaOpen] = useState(false)
  const [tutorialMode, setTutorialMode] = useState(false)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [flowSummary, setFlowSummary] = useState([])
  const router = useRouter()
  const [showClearButton, setShowClearButton] = useState(false)
  const edgeReconnectSuccessful = useRef(true)
  const [selectedNode, setSelectedNode] = useState(null)

  // Initialize the form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      blockName: "",
      solidityCode: "",
    },
  })

  // Function to delete a node and its associated edges
  const handleDeleteNode = (nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId))
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId))
    setFlowSummary((prevSummary) => prevSummary.filter((item) => item.id !== nodeId))
    toast.success('Block deleted')
  }

  // Function to add a new node connected to a source node
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
    toast.success(`${block.content} block added`)
  }

  // Function to add a block to the canvas
  const addBlock = (block) => {
    const newNodeId = Date.now().toString()
    const newNode = {
      id: newNodeId,
      type: block.id === 'stake' ? 'stakeNode' : 
            block.id === 'swap' ? 'swapNode' :
            block.id === 'liquidity' ? 'liquidityNode' :
            block.id === 'event' ? 'eventNode' : 'blockNode',
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
    toast.success(`${block.content} block added`)
  }

  // Effect to check if 'start' and 'end' nodes are present
  useEffect(() => {
    const hasStart = nodes.some(node => node.data.id === 'start')
    const hasEnd = nodes.some(node => node.data.id === 'end')
    setShowFinishButton(hasStart && hasEnd)
    setShowClearButton(nodes.length > 0)
  }, [nodes])

  // Function to handle the 'Finish' button click
  const handleFinish = () => {
    console.log("Finished! Transaction flow:", flowSummary)
    // Add your logic here for what should happen when the Finish button is clicked
  }

  // Function to clear the canvas
  const handleClear = () => {
    setNodes([])
    setEdges([])
    setFlowSummary([])
    toast.success('Blocks cleared')
  }

  // Function to open the modal for adding a custom block
  const handleAddCustomBlock = () => {
    setIsCredenzaOpen(true)
  }

  // Form submission handler for adding a custom block
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

  // Function to handle node click (currently logs the node ID)
  const handleNodeClick = useCallback((event, node) => {
    setSelectedNode(node.id)
  }, [])

  // Function to update the flow summary based on the connected nodes
  const updateFlowSummary = (sourceId, targetId) => {
    const sourceNode = nodes.find((node) => node.id === sourceId)
    const targetNode = nodes.find((node) => node.id === targetId)

    setFlowSummary((prevSummary) => {
      const newItem = {
        content: targetNode.data.content,
        id: targetId,
      }

      // If the summary is empty, add the source node first
      if (prevSummary.length === 0) {
        return [
          { content: sourceNode.data.content, id: sourceId },
          newItem,
        ]
      }

      // Check if the target node already exists in the summary
      const existingIndex = prevSummary.findIndex(item => item.id === targetId)
      if (existingIndex !== -1) {
        // If it exists, remove it and all subsequent items
        return [...prevSummary.slice(0, existingIndex), newItem]
      } else {
        // If it doesn't exist, add it to the end
        return [...prevSummary, newItem]
      }
    })
  }

  const { getNodes, getEdges } = useReactFlow();

  const isValidConnection = useCallback(
    (connection) => {
      const nodes = getNodes();
      const edges = getEdges();
      const target = nodes.find((node) => node.id === connection.target);
      const hasCycle = (node, visited = new Set()) => {
        if (visited.has(node.id)) return false;

        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };

      if (target.id === connection.source) return false;
      return !hasCycle(target);
    },
    [getNodes, getEdges]
  );

  const onConnect = useCallback(
    (params) => {
      if (isValidConnection(params)) {
        setEdges((els) => addEdge(params, els));
        updateFlowSummary(params.source, params.target);
      } else {
        toast.error('Invalid connection: This would create a cycle');
      }
    },
    [isValidConnection, updateFlowSummary]
  );

  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect = useCallback((oldEdge, newConnection) => {
    edgeReconnectSuccessful.current = true;
    setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
    updateFlowSummary(newConnection.source, newConnection.target);
  }, [updateFlowSummary]);

  const onReconnectEnd = useCallback((_, edge) => {
    if (!edgeReconnectSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      // Remove the connection from the flow summary
      setFlowSummary((prevSummary) => {
        const sourceIndex = prevSummary.findIndex(item => item.id === edge.source);
        const targetIndex = prevSummary.findIndex(item => item.id === edge.target);
        if (sourceIndex !== -1 && targetIndex !== -1) {
          return prevSummary.slice(0, targetIndex);
        }
        return prevSummary;
      });
    }

    edgeReconnectSuccessful.current = true;
  }, []);

  // Custom edge styles
  const edgeStyles = {
    default: {
      stroke: '#555',
      strokeWidth: 2,
      transition: 'stroke 0.3s, stroke-width 0.3s',
    },
    selected: {
      stroke: '#FE007A',
      strokeWidth: 3,
    },
  }

  // Edge update function
  const edgeUpdateHandler = useCallback((oldEdge, newConnection) => {
    return { ...oldEdge, ...newConnection }
  }, [])

  return (
    <div className="flex h-screen bg-[#141313] pt-8 selectable-none">
      {/* Sidebar */}
      <div className="relative translate-y-[1px] h-full">
        {/* Toggle sidebar button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute left-4 top-4 z-10 bg-[#1F1F1F] border-[#2A2A2A] text-white"
        >
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>

        {/* Info icon */}
        <div className="absolute right-4 top-4 w-10 h-10 flex items-center justify-center cursor-pointer group">
          <Info className="size-8 text-white/60 group-hover:shadow-lg transition-shadow duration-300" />
          <div className="absolute hidden group-hover:block bg-gray-800 text-white/60 text-xs rounded-md p-2 -top-10 right-0">
            Information about the blocks
          </div>
        </div>

        {/* Sidebar content */}
        <motion.div
          initial={false}
          animate={{ width: isOpen ? "18.4rem" : "0rem" }}
          transition={{ duration: 0.3 }}
          className="bg-[#141313] border-r border-[#555555] overflow-hidden h-full flex flex-col"
        >
          <div className="p-6 w-72 pt-12 selectable-none cursor-default overflow-y-auto flex-grow">
            <h2 className="text-2xl font mt-4 mb-4 text-white">DeFi Blocks</h2>
            <div className="flex flex-col gap-6">
              {Object.entries(groupedBlocks).map(([category, blocks]) => (
                <div key={category}>
                  <h3 className="text-xs mb-2 text-white/80" style={{ color: blocks.length > 0 ? blocks[0].color.replace('bg-', '') : 'white' }}>
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
            </div>
          </div>

          {/* Custom Block button */}
          <div className="pb-12 p-6 w-72">
            <Button
              onClick={handleAddCustomBlock}
              className="bg-white text-black w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Custom Block
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Main canvas area */}
      <motion.div
        className="flex-1 max-w-[52rem] flex flex-col ml-8"
        animate={{ marginLeft: isOpen ? "1rem" : "2rem" }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
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
          <div className="flex gap-2">
            {showClearButton && (
              <Button onClick={handleClear} className="px-6 bg-[#252525] hover:bg-[#323232] text-white">
                Clear
              </Button>
            )}
            {showFinishButton && (
              <Button
                onClick={() => {
                  const encodedNodes = encodeURIComponent(JSON.stringify(nodes));
                  const encodedEdges = encodeURIComponent(JSON.stringify(edges));
                  const encodedFlowSummary = encodeURIComponent(JSON.stringify(flowSummary));
                  router.push(`/compile?nodes=${encodedNodes}&edges=${encodedEdges}&flowSummary=${encodedFlowSummary}`);
                }}
                className="bg-[#322131] hover:bg-[#21173E] text-white"
              >
                Compile
              </Button>
            )}
          </div>
        </div>

        {/* Canvas */}
        <div id="block-canvas" className="flex-1 rounded-lg shadow-inner p-4 min-h-[200px] overflow-hidden bg-transparent">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onReconnect={onReconnect}
            onReconnectStart={onReconnectStart}
            onReconnectEnd={onReconnectEnd}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={{ type: 'step' }}
            snapToGrid={true}
            snapGrid={[15, 15]}
            isValidConnection={isValidConnection}
            onNodeClick={handleNodeClick}
            edgeUpdaterRadius={10}
            onEdgeUpdate={edgeUpdateHandler}
          >
            <Background />
            <Controls />
            <MiniMap
              className='bg-black rounded-lg'
              nodeColor={(node) => '#FE007A'}
              nodeStrokeColor="transparent"
              nodeStrokeWidth={3}
              maskColor="rgba(28, 26, 26, 0.8)"
              maskStrokeColor="white"
              position="bottom-right"
              ariaLabel="React Flow mini map"
              pannable
              zoomable
            />
            {edges.map((edge) => (
              <BaseEdge
                key={edge.id}
                id={edge.id}
                source={edge.source}
                target={edge.target}
                style={
                  selectedNode && (edge.source === selectedNode || edge.target === selectedNode)
                    ? edgeStyles.selected
                    : edgeStyles.default
                }
              />
            ))}
          </ReactFlow>
        </div>
      </motion.div>

      {/* Flow summary on the right */}
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
              <span className="text-white">{item.content}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Modal for adding custom blocks */}
      <CustomBlockModal
        isOpen={isCredenzaOpen}
        onOpenChange={setIsCredenzaOpen}
        onSubmit={onSubmit}
      />
    </div>
  )
}

// Wrap the main component with ReactFlowProvider
const Web3BlocksComponentWrapper = () => (
  <ReactFlowProvider>
    <Web3BlocksComponent />
  </ReactFlowProvider>
)

export default Web3BlocksComponentWrapper
