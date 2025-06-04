
import React from 'react';
import type { CodeExample } from '../types';
import { PlayIcon, CodeBracketSquareIcon } from '../components/icons';
import { CodeSnippetDisplay } from '../components/CodeSnippetDisplay';

interface PlaybooksViewProps {
  playbookExamples: CodeExample[];
}

export const PlaybooksView: React.FC<PlaybooksViewProps> = ({ playbookExamples }) => {
  return (
    <div className="p-2 sm:p-4 md:p-6">
      <div className="flex items-center mb-6">
        <PlayIcon className="w-10 h-10 mr-3 text-green-400" />
        <h2 className="text-3xl font-semibold text-slate-100">Automated Response Playbooks</h2>
      </div>
      <p className="text-slate-300 mb-8">
        This section outlines simulated automated response playbooks for Azure Sentinel (using Logic Apps) and ELK (using Python scripts).
        These playbooks are triggered by detection rules and perform actions like sending notifications and (simulated) blocking malicious IPs.
      </p>

      <div className="space-y-8">
        {playbookExamples.map(example => (
          <CodeSnippetDisplay key={example.id} example={example} />
        ))}
      </div>

      <div className="mt-10 p-6 bg-slate-800 rounded-lg shadow-xl">
        <h3 className="text-2xl font-semibold text-slate-100 mb-4">Playbook Simulation Notes</h3>
        <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>The provided code snippets are illustrative examples.</li>
            <li>For Azure Sentinel, a Logic App would be designed in the Azure portal, and its JSON definition can be exported. The trigger would be an "Azure Sentinel Alert".</li>
            <li>For ELK, a Python script would typically be invoked by a system like ElastAlert or a Watcher action based on an Elasticsearch query.</li>
            <li>Actions such as "blocking an IP" are simulated by printing a message or calling a mock HTTP endpoint. Real implementation would involve API calls to WAFs, NSGs, or firewalls.</li>
            <li>Slack integration is common for notifications and would use official Slack APIs or webhooks.</li>
        </ul>
      </div>
    </div>
  );
};
