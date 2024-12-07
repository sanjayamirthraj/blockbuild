import { ChevronDown, Ellipsis, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

type ScenarioResult = {
  description: string
  type: 'profit' | 'demand'
}

const scenarioResults: ScenarioResult[] = [
  {
    type: 'profit',
    description: 'The best found configuration based on profit is characterized by 11 zones (max) with charging stations and 48 total number of poles.'
  },
  {
    type: 'demand',
    description: 'The best found configuration based on satisfied demand is characterized by 11 zones (max) with charging stations and 48 total number of poles.'
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    }
  }
}

const item = {
  hidden: { 
    opacity: 0, 
    y: -20,
    x: 0,
    scale: 1
  },
  show: { 
    opacity: 1, 
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: { 
    opacity: 0,
    y: -10,
    scale: 1,
    transition: {
      duration: 0.2
    }
  }
}

export function ScenarioResults() {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="space-y-4 rounded-lg p-4">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center w-full text-xl font-semibold text-[#DCFF7F]"
      >
        <Sparkles className="mr-2 h-5 w-5" />
        Best Scenario Results
        <motion.div 
          className="ml-auto"
          animate={{ rotate: isExpanded ? 0 : 180 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </button>
      
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div 
            className="space-y-2"
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {scenarioResults.map((result) => (
              <motion.div 
                key={result.type}
                variants={item}
                className="flex items-center justify-between rounded-lg border-[0.5px] border-[#C8E972]/30 bg-[#C9FF3B]/[0.02] p-4"
                style={{
                  originX: 0
                }}
              >
                <p className="text-sm text-[#C9FF3B]">
                  {result.description}
                </p>
                <button className="text-gray-400 hover:text-white">
                  <Ellipsis className="h-5 w-5 text-[#DCFF7F]" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}