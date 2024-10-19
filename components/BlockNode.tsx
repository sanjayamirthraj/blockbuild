import React from 'react'
import { Handle, Position } from 'reactflow'

const BlockNode = ({ data, isConnectable }) => {
  return (
    <div className="bg-[#142321] text-white p-4 rounded-lg shadow-md border-[1px] border-[#245C3D] hover:border-[#6AFB8E] transition-colors w-[250px]">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  )
}

export default BlockNode