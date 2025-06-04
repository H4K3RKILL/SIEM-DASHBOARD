
import React from 'react';
import type { CodeExample } from '../types';
import { CodeSnippetDisplay } from '../components/CodeSnippetDisplay';
import { ServerStackIcon, CiCdIcon } from '../components/icons';

interface CodeArtifactsViewProps {
  iacExamples: CodeExample[];
  cicdExamples: CodeExample[];
}

export const CodeArtifactsView: React.FC<CodeArtifactsViewProps> = ({ iacExamples, cicdExamples }) => {
  return (
    <div className="p-2 sm:p-4 md:p-6 space-y-8">
      <div>
        <h2 className="text-3xl font-semibold text-slate-100 mb-2 flex items-center">
          <ServerStackIcon className="w-8 h-8 mr-3 text-teal-400" />
          Infrastructure as Code (IaC) Examples
        </h2>
        <p className="text-slate-300 mb-6">
          Illustrative snippets for setting up the SIEM environment using Terraform for Azure Sentinel and Docker Compose/Fluent Bit for a local ELK stack.
        </p>
        {iacExamples.map(example => (
          <CodeSnippetDisplay key={example.id} example={example} />
        ))}
      </div>

      <div>
        <h2 className="text-3xl font-semibold text-slate-100 mb-2 flex items-center">
          <CiCdIcon className="w-8 h-8 mr-3 text-indigo-400" />
          CI/CD Integration Examples
        </h2>
        <p className="text-slate-300 mb-6">
          Example of integrating a simulated SIEM check into a CI/CD pipeline using GitHub Actions.
        </p>
        {cicdExamples.map(example => (
          <CodeSnippetDisplay key={example.id} example={example} />
        ))}
      </div>
    </div>
  );
};
