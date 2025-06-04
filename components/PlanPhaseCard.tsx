
import React from 'react';
import type { PlanPhase } from '../types';
import { SetupIcon, IngestionIcon, DetectionIcon, ResponseIcon, CiCdIcon, DocsIcon, ChevronDownIcon, ChevronUpIcon, CheckCircleIcon, ClockIcon, ExclamationCircleIcon, AcademicCapIcon } from './icons'; 

interface PlanPhaseCardProps {
  phase: PlanPhase;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const PhaseIcon: React.FC<{ iconName: PlanPhase['iconName'], className?: string }> = ({ iconName, className }) => {
  const icons: Record<PlanPhase['iconName'], React.FC<React.SVGProps<SVGSVGElement>>> = {
    SetupIcon: SetupIcon,
    IngestionIcon: IngestionIcon,
    DetectionIcon: DetectionIcon,
    ResponseIcon: ResponseIcon,
    CiCdIcon: CiCdIcon,
    DocsIcon: DocsIcon,
  };
  const IconComponent = icons[iconName] || ExclamationCircleIcon; // Fallback icon
  return <IconComponent className={className || "w-8 h-8"} />;
};

const StatusIndicator: React.FC<{ status: PlanPhase['status'] }> = ({ status }) => {
  switch (status) {
    case 'Completed':
      return <span className="flex items-center text-xs font-medium text-green-400"><CheckCircleIcon className="w-4 h-4 mr-1" /> Completed</span>;
    case 'In Progress':
      return <span className="flex items-center text-xs font-medium text-yellow-400"><ClockIcon className="w-4 h-4 mr-1" /> In Progress</span>;
    case 'Pending':
      return <span className="flex items-center text-xs font-medium text-orange-400"><ExclamationCircleIcon className="w-4 h-4 mr-1" /> Pending</span>;
    case 'Conceptual':
      return <span className="flex items-center text-xs font-medium text-sky-400"><AcademicCapIcon className="w-4 h-4 mr-1" /> Conceptual</span>;
    default:
      return null;
  }
};


export const PlanPhaseCard: React.FC<PlanPhaseCardProps> = ({ phase, isExpanded, onToggleExpand }) => {
  return (
    <div className="bg-slate-800 rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl">
      <button 
        onClick={onToggleExpand}
        className="w-full p-5 text-left focus:outline-none"
        aria-expanded={isExpanded}
        aria-controls={`phase-details-${phase.id}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <PhaseIcon iconName={phase.iconName} className="w-10 h-10 text-blue-400 mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-slate-100">{phase.title}</h3>
              <StatusIndicator status={phase.status} />
            </div>
          </div>
          {isExpanded ? <ChevronUpIcon className="w-6 h-6 text-slate-400" /> : <ChevronDownIcon className="w-6 h-6 text-slate-400" />}
        </div>
        <p className="mt-3 text-sm text-slate-300 line-clamp-2 group-hover:line-clamp-none">{phase.description}</p>
      </button>
      
      {isExpanded && (
        <div id={`phase-details-${phase.id}`} className="px-5 pb-5 pt-2 border-t border-slate-700">
          <h4 className="text-md font-semibold text-slate-200 mt-3 mb-2">Key Actions:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
            {phase.keyActions.map((action, index) => (
              <li key={index}>{action}</li>
            ))}
          </ul>

          {phase.details && (
            <>
              <h4 className="text-md font-semibold text-slate-200 mt-4 mb-2">Details:</h4>
              <p className="text-sm text-slate-300">{phase.details}</p>
            </>
          )}

          {phase.deliverables && phase.deliverables.length > 0 && (
             <>
              <h4 className="text-md font-semibold text-slate-200 mt-4 mb-2">Deliverables (Simulated):</h4>
               <div className="flex flex-wrap gap-2">
                {phase.deliverables.map((deliverable, index) => (
                  <span key={index} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                    {deliverable}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
