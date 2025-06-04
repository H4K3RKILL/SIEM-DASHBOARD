
import React from 'react';
import { DELIVERABLES_CHECKLIST } from '../constants';
import type { ViewType, DeliverableItem } from '../types';
import { ClipboardCheckIcon, ArrowRightIcon } from '../components/icons';

interface DeliverablesViewProps {
  onNavigate: (view: ViewType) => void;
}

export const DeliverablesView: React.FC<DeliverablesViewProps> = ({ onNavigate }) => {
  return (
    <div className="p-2 sm:p-4 md:p-6">
      <div className="flex items-center mb-6">
        <ClipboardCheckIcon className="w-10 h-10 mr-3 text-green-400" />
        <h2 className="text-3xl font-semibold text-slate-100">Project Deliverables Checklist</h2>
      </div>
      <p className="text-slate-300 mb-8">
        This section outlines the key deliverables for the Automated SIEM & Incident Response Pipeline project, as specified in the practical assessment PDF. 
        Each item links to the corresponding simulated or showcased component within this application.
      </p>

      <div className="space-y-6">
        {DELIVERABLES_CHECKLIST.map((item: DeliverableItem) => (
          <div key={item.id} className="bg-slate-800 rounded-lg shadow-xl p-6">
            <h3 className="text-xl font-semibold text-sky-400">{item.title}</h3>
            <p className="text-xs text-slate-400 mb-2">PDF Reference: {item.pdfReference}</p>
            <p className="text-sm text-slate-300 mb-4">{item.description}</p>
            <button
              onClick={() => onNavigate(item.appLink)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-slate-900"
            >
              {item.appLinkText}
              <ArrowRightIcon className="ml-2 w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
       <div className="mt-10 p-6 bg-slate-800 rounded-lg shadow-xl">
        <h3 className="text-2xl font-semibold text-slate-100 mb-4">Note on Deliverables</h3>
        <p className="text-sm text-slate-300">
            The links above navigate to sections within this application where each deliverable is conceptually demonstrated or simulated.
            For example, "IaC Examples" under "Code Artifacts" showcases Terraform and Docker Compose snippets. "Detection Rules" shows KQL/DSL examples.
            The "SIEM Dashboard" view simulates the required dashboard visualizations.
            The "Runbook" and "Response Playbooks" views contain the respective documentation and script examples.
            The "CI/CD Snippet" is also located under "Code Artifacts".
        </p>
      </div>
    </div>
  );
};

// Add ArrowRightIcon if not already in icons.tsx
// For simplicity, it's assumed to be available or can be added to components/icons.tsx:
// export const ArrowRightIcon: React.FC<IconProps> = (props) => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
//   </svg>
// );
// I will add it to icons.tsx
