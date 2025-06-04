
import React from 'react';
import type { CodeExample } from '../types';
import { CommandLineIcon, DocumentDuplicateIcon, CheckCircleIcon } from './icons';

interface CodeSnippetDisplayProps {
  example: CodeExample;
}

export const CodeSnippetDisplay: React.FC<CodeSnippetDisplayProps> = ({ example }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(example.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden mb-6">
      <div className="p-4 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-blue-400 flex items-center">
          <CommandLineIcon className="w-5 h-5 mr-2" /> 
          {example.title}
        </h3>
        {example.description && <p className="text-sm text-slate-300 mt-1">{example.description}</p>}
      </div>
      <div className="relative bg-slate-900 p-4 text-sm">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600 text-slate-300 px-2 py-1 rounded text-xs flex items-center"
          aria-label="Copy code to clipboard"
        >
          {copied ? <CheckCircleIcon className="w-4 h-4 mr-1 text-green-400" /> : <DocumentDuplicateIcon className="w-4 h-4 mr-1" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <pre className="overflow-x-auto whitespace-pre-wrap text-slate-300">
          <code>{example.code}</code>
        </pre>
        <p className="text-xs text-slate-500 mt-2">Language: {example.language}</p>
      </div>
    </div>
  );
};
