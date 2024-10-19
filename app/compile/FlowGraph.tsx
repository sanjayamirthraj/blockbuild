'use client';

import React from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';

interface FlowGraphProps {
  nodes: any[];
  edges: any[];
  flowSummary: any[];
}

const FlowGraph: React.FC<FlowGraphProps> = ({ nodes, edges, flowSummary }) => {
  return (
    <div className="flex flex-col h-full">
      <div style={{ height: '500px', width: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
      <div className="mt-4">
        <h3 className="text-xl mb-2">Flow Summary</h3>
        <ul className="list-disc pl-5">
          {flowSummary.map((item, index) => (
            <li key={index} className="mb-1">{item.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FlowGraph;
