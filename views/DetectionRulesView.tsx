
import React from 'react';
import { EyeIcon } from '../components/icons';
import { CodeSnippetDisplay } from '../components/CodeSnippetDisplay';
import type { CodeExample } from '../types';

interface DetectionRulesViewProps {
  detectionRules: CodeExample[];
}

export const DetectionRulesView: React.FC<DetectionRulesViewProps> = ({ detectionRules }) => {
  return (
    <div className="p-2 sm:p-4 md:p-6">
      <div className="flex items-center mb-6">
        <EyeIcon className="w-10 h-10 mr-3 text-blue-400" />
        <h2 className="text-3xl font-semibold text-slate-100">Detection Rules (Simulated)</h2>
      </div>
      <p className="text-slate-300 mb-8">
        This section showcases example detection rules. For Azure Sentinel, these are written in Kusto Query Language (KQL). 
        For ELK, they would typically be in Elasticsearch DSL or configured via Kibana's UI.
        These rules are designed to identify suspicious activities based on ingested logs. Exported KQL/DSL rule definitions are key project deliverables.
      </p>

      <div className="space-y-8">
        {detectionRules.map(example => (
          <CodeSnippetDisplay key={example.id} example={example} />
        ))}
      </div>
      
      <div className="mt-10 p-6 bg-slate-800 rounded-lg shadow-xl">
        <h3 className="text-2xl font-semibold text-slate-100 mb-4">Rule Simulation Notes</h3>
        <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>The KQL queries provided are for Azure Sentinel. An ELK DSL example is also included for completeness.</li>
            <li>Key detection scenarios include:
                <ul className="list-disc list-inside ml-6">
                    <li>Spikes in HTTP 4xx/5xx errors from microservices.</li>
                    <li>Unexpected privilege escalations or anomalous login attempts.</li>
                    <li>Large data pulls from storage (e.g., Azure Blob Storage).</li>
                    <li>Creation of sensitive Azure resources like Virtual Machines.</li>
                </ul>
            </li>
            <li>In a real SIEM, these rules would be configured as Analytics Rules (Sentinel) or Watchers/Alerts (ELK) to generate alerts when conditions are met.</li>
            <li>Tuning thresholds and rule logic is a continuous process to minimize false positives and negatives, as detailed in the Runbook.</li>
        </ul>
      </div>
    </div>
  );
};
