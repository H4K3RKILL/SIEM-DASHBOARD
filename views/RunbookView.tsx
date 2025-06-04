
import React from 'react';
import type { RunbookSection } from '../types';
import { BookOpenIcon } from '../components/icons';

interface RunbookViewProps {
  runbookContent: RunbookSection[];
}

// Basic markdown-to-HTML (very simplified, focused on headers, paragraphs, lists, code blocks)
const formatMarkdown = (text: string): React.ReactNode[] => {
  const lines = text.split('\\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockContent = '';
  let listType: 'ul' | 'ol' | null = null;
  let listItems: React.ReactNode[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      if (listType === 'ul') {
        elements.push(<ul key={`list-${elements.length}`} className="list-disc list-inside ml-4 my-2 space-y-1 text-slate-300">{listItems}</ul>);
      } else if (listType === 'ol') {
         elements.push(<ol key={`list-${elements.length}`} className="list-decimal list-inside ml-4 my-2 space-y-1 text-slate-300">{listItems}</ol>);
      }
      listItems = [];
      listType = null;
    }
  };

  lines.forEach((line, index) => {
    if (line.trim().startsWith('~~~') || line.trim().startsWith('\`\`\`')) { // Simplified code block toggle
      flushList();
      if (inCodeBlock) {
        elements.push(<pre key={`code-${index}`} className="bg-slate-900 p-3 my-2 rounded text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap">{codeBlockContent.trim()}</pre>);
        codeBlockContent = '';
      }
      inCodeBlock = !inCodeBlock;
      return;
    }

    if (inCodeBlock) {
      codeBlockContent += line + '\\n';
      return;
    }
    
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('### ')) {
      flushList();
      elements.push(<h3 key={`h3-${index}`} className="text-xl font-semibold mt-4 mb-2 text-sky-300">{trimmedLine.substring(4)}</h3>);
    } else if (trimmedLine.startsWith('## ')) {
      flushList();
      elements.push(<h2 key={`h2-${index}`} className="text-2xl font-semibold mt-5 mb-3 text-sky-400">{trimmedLine.substring(3)}</h2>);
    } else if (trimmedLine.startsWith('# ')) {
      flushList();
      elements.push(<h1 key={`h1-${index}`} className="text-3xl font-semibold mt-6 mb-4 text-sky-500">{trimmedLine.substring(2)}</h1>);
    } else if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
      if (listType !== 'ul') flushList();
      listType = 'ul';
      listItems.push(<li key={`li-${index}`}>{trimmedLine.substring(2)}</li>);
    } else if (trimmedLine.match(/^\\d+\\.\\s/)) {
      if (listType !== 'ol') flushList();
      listType = 'ol';
      listItems.push(<li key={`li-${index}`}>{trimmedLine.substring(trimmedLine.indexOf(' ') + 1)}</li>);
    } else if (trimmedLine === '') {
      flushList();
      elements.push(<br key={`br-${index}`} />);
    } else {
      flushList();
      elements.push(<p key={`p-${index}`} className="my-2 text-slate-300 leading-relaxed">{trimmedLine}</p>);
    }
  });

  flushList(); // Ensure any pending list is flushed at the end
  if (inCodeBlock && codeBlockContent) { // Ensure pending code block is flushed
     elements.push(<pre key="code-final" className="bg-slate-900 p-3 my-2 rounded text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap">{codeBlockContent.trim()}</pre>);
  }

  return elements;
};


export const RunbookView: React.FC<RunbookViewProps> = ({ runbookContent }) => {
  return (
    <div className="p-2 sm:p-4 md:p-6">
      <div className="flex items-center mb-6">
        <BookOpenIcon className="w-10 h-10 mr-3 text-orange-400" />
        <h2 className="text-3xl font-semibold text-slate-100">SIEM Runbook</h2>
      </div>
      
      <p className="text-slate-300 mb-8">
        This runbook provides guidelines for onboarding new microservices, responding to high-severity incidents, and tuning detection rules.
        It's a critical piece of documentation for maintaining an effective SIEM and IR pipeline.
      </p>

      {runbookContent.map(section => (
        <section key={section.id} className="mb-10 p-6 bg-slate-800 rounded-lg shadow-xl">
          <h3 className="text-2xl font-semibold text-slate-100 border-b border-slate-700 pb-2 mb-4">{section.title}</h3>
          <div className="prose prose-sm prose-invert max-w-none">
            {formatMarkdown(section.content)}
          </div>
        </section>
      ))}
    </div>
  );
};
