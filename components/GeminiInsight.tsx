
import React, { useEffect, useCallback } from 'react';
import type { Alert } from '../types';
import { getAnalysisForAlert } from '../services/geminiService';
import { GEMINI_API_KEY_INFO, MOCK_GEMINI_UNAVAILABLE_MSG } from '../constants'; 
import { SparklesIcon } from './icons'; 

interface GeminiInsightProps {
  alert: Alert | null;
  response: string | null;
  setResponse: (response: string | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

// Basic markdown-to-HTML (very simplified)
const formatResponseText = (text: string): React.ReactNode => {
  // Split by newlines but preserve those within code blocks
  const blocks = text.split(/(\n```[\s\S]*?```\n|\n)/);

  return blocks.map((line, index) => {
    if (line.startsWith('\n```') && line.endsWith('```\n')) {
      const codeContent = line.substring(4, line.length - 4);
      return <pre key={index} className="bg-slate-900 p-3 my-2 rounded text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap">{codeContent}</pre>;
    }
    if (line === '\n') return <br key={index} />; // Handle explicit newlines between paragraphs

    // Process non-code block lines
    return line
    .split('\n') // Process individual lines if block contains multiple non-code lines
    .map((part, partIndex) => {
      let currentLine = part;
      // Headers
      if (currentLine.startsWith('### ')) return <h3 key={`${index}-${partIndex}`} className="text-lg font-semibold mt-3 mb-1 text-slate-200">{currentLine.substring(4)}</h3>;
      if (currentLine.startsWith('## ')) return <h2 key={`${index}-${partIndex}`} className="text-xl font-semibold mt-4 mb-2 text-slate-100">{currentLine.substring(3)}</h2>;
      if (currentLine.startsWith('# ')) return <h1 key={`${index}-${partIndex}`} className="text-2xl font-semibold mt-5 mb-3 text-slate-50">{currentLine.substring(2)}</h1>;
      
      // Bold text using **text**
      currentLine = currentLine.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-100 font-semibold">$1</strong>');
      // Italic text using *text*
      currentLine = currentLine.replace(/\*(.*?)\*/g, '<em>$1</em>');
      
      // List items (simple unordered)
      if (currentLine.trim().startsWith('* ') || currentLine.trim().startsWith('- ')) {
        // Ensure list items are not wrapped in <p> and are correctly spaced
        // This simple version might need more sophisticated handling for nested lists or mixed content.
        const content = currentLine.trim().substring(2);
        if (partIndex > 0 && (blocks[index].split('\n')[partIndex-1].trim().startsWith('* ') || blocks[index].split('\n')[partIndex-1].trim().startsWith('- '))) {
             // Continuation of a list item or something similar, just render its content
             return <li key={`${index}-${partIndex}`} className="ml-5 list-disc" dangerouslySetInnerHTML={{ __html: content }} />;
        }
         // Start of a list or a standalone list item
        return <ul key={`${index}-${partIndex}`} className="list-disc ml-5 my-1"><li dangerouslySetInnerHTML={{ __html: content }} /></ul>;
      }
      
      if (currentLine.trim() === '') return null; 

      // Default to paragraph for non-empty lines that are not headers or list items
      return <p key={`${index}-${partIndex}`} className="my-2 text-slate-300" dangerouslySetInnerHTML={{ __html: currentLine }} />;
    })
    .filter(Boolean);
  }).flat().filter(Boolean);
};


export const GeminiInsight: React.FC<GeminiInsightProps> = ({ alert, response, setResponse, isLoading, setIsLoading }) => {
  const apiKey = process.env.API_KEY; // Updated to use API_KEY

  const fetchAnalysis = useCallback(async (currentAlert: Alert) => {
    if (!apiKey) {
      setResponse(MOCK_GEMINI_UNAVAILABLE_MSG + '\n\n' + GEMINI_API_KEY_INFO);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const analysis = await getAnalysisForAlert(currentAlert.title, currentAlert.description);
      setResponse(analysis);
    } catch (error) {
      console.error("Error fetching Gemini analysis:", error);
      setResponse(`Error fetching analysis: ${error instanceof Error ? error.message : 'Unknown error'}. Check console for details.`);
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey, setIsLoading, setResponse]); 

  useEffect(() => {
    if (alert && !response && !isLoading) {
        // Automatic fetching on alert select can be enabled here if desired:
        // fetchAnalysis(alert);
        // For now, relies on explicit button click or initial load if alert is pre-selected.
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert, response, isLoading]); 

  if (!alert) {
    return (
      <div className="p-4 text-center text-slate-400">
        <SparklesIcon className="w-12 h-12 mx-auto mb-2 text-slate-500" />
        Select an alert to see AI-powered insights.
      </div>
    );
  }

  const handleAnalyzeClick = () => {
    if (alert) {
      fetchAnalysis(alert);
    }
  };

  return (
    <div className="bg-slate-800 p-3 sm:p-5 rounded-lg shadow-inner border border-slate-700">
      <h4 className="text-lg font-semibold text-slate-100 mb-1">
        AI Analysis for: <span className="text-blue-400">{alert.title}</span>
      </h4>
      
      {!response && !isLoading && (
         <button 
            onClick={handleAnalyzeClick}
            className="my-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            aria-label="Get AI Analysis for the selected alert"
          >
            <SparklesIcon className="w-5 h-5 mr-2" />
            Get AI Analysis
        </button>
      )}

      {isLoading && (
        <div className="flex items-center justify-center p-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          <p className="ml-3 text-slate-300">Generating insights with Gemini...</p>
        </div>
      )}
      {response && !isLoading && (
        <div className="mt-3 prose prose-sm prose-invert max-w-none text-slate-300">
          {formatResponseText(response)}
        </div>
      )}
      {!apiKey && !isLoading && !response && ( 
        <div className="mt-4 p-3 bg-slate-700 rounded text-sm text-slate-300">
          {GEMINI_API_KEY_INFO.split('\n').map((line, i) => <p key={i}>{line}</p>)}
        </div>
      )}
    </div>
  );
};
