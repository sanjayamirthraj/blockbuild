import React from 'react';

interface CodeBlockProps {
  text: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ text }) => {
  return (
    <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
      <code className="font-mono">{text}</code>
    </pre>
  );
};

export default CodeBlock;
