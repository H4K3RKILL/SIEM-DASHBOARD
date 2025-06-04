
import React, { useState, useCallback } from 'react';
import { DashboardLayout } from './components/DashboardLayout';
import { PlanPhaseCard } from './components/PlanPhaseCard';
import { AlertCard } from './components/AlertCard';
import { GeminiInsight } from './components/GeminiInsight';
// MockErrorChart will be part of new DashboardView
import { LogViewer } from './components/LogViewer';
import { PLAN_PHASES, MOCK_ALERTS, MOCK_LOGS, RUNBOOK_CONTENT, IAC_EXAMPLES, CICD_EXAMPLES, PLAYBOOK_EXAMPLES, DETECTION_RULES_EXAMPLES } from './constants';
import type { PlanPhase, Alert, ViewType } from './types';
import { AiIcon, AlertIcon, HomeIcon, ListIcon, BookOpenIcon, PlayIcon, EyeIcon, CodeBracketSquareIcon, CommandLineIcon, ChartPieIcon, CogIcon, ServerStackIcon, FileCodeIcon, ClipboardCheckIcon } from './components/icons';

// New View Components
import { DashboardView } from './views/DashboardView';
import { CodeArtifactsView } from './views/CodeArtifactsView';
import { RunbookView } from './views/RunbookView';
import { PlaybooksView } from './views/PlaybooksView'; // Enhanced Playbooks View
import { DetectionRulesView } from './views/DetectionRulesView'; // Existing Rules View (wrapper)
import { DeliverablesView } from './views/DeliverablesView';


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('overview');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [geminiResponse, setGeminiResponse] = useState<string | null>(null);
  const [isGeminiLoading, setIsGeminiLoading] = useState<boolean>(false);
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  const handleNavClick = (view: ViewType) => {
    setCurrentView(view);
    setSelectedAlert(null);
    setGeminiResponse(null);
  };

  const handleAlertSelect = useCallback((alert: Alert) => {
    setSelectedAlert(alert);
    setGeminiResponse(null); 
    const geminiSection = document.getElementById('gemini-insight-section');
    if (geminiSection) {
      geminiSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const togglePhaseExpansion = (phaseId: string) => {
    setExpandedPhase(prev => (prev === phaseId ? null : phaseId));
  };
  
  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return (
          <div className="space-y-6 p-2 sm:p-4 md:p-6">
            <h2 className="text-3xl font-semibold text-slate-100 mb-6">Project Phases &amp; Plan</h2>
            <p className="text-slate-300 mb-6">Following the consolidated plan to build an automated, cloud-native SIEM & Incident Response pipeline. Click on each phase to see details and conceptual deliverables.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PLAN_PHASES.map((phase) => (
                <PlanPhaseCard 
                  key={phase.id} 
                  phase={phase} 
                  isExpanded={expandedPhase === phase.id}
                  onToggleExpand={() => togglePhaseExpansion(phase.id)}
                />
              ))}
            </div>
          </div>
        );
      case 'dashboard':
        return <DashboardView />;
      case 'alerts':
        return (
          <div className="space-y-6 p-2 sm:p-4 md:p-6">
            <h2 className="text-3xl font-semibold text-slate-100 mb-6">Security Alerts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_ALERTS.map((alert) => (
                <AlertCard key={alert.id} alert={alert} onSelect={handleAlertSelect} isSelected={selectedAlert?.id === alert.id} />
              ))}
            </div>
            {selectedAlert && (
              <div id="gemini-insight-section" className="mt-8 p-6 bg-slate-800 rounded-lg shadow-xl">
                 <h3 className="text-2xl font-semibold text-slate-100 mb-4 flex items-center">
                    <AiIcon className="w-6 h-6 mr-2 text-purple-400" />
                    AI Powered Insight
                </h3>
                <GeminiInsight 
                  alert={selectedAlert} 
                  response={geminiResponse} 
                  setResponse={setGeminiResponse}
                  isLoading={isGeminiLoading}
                  setIsLoading={setIsGeminiLoading} 
                />
              </div>
            )}
          </div>
        );
      case 'logs':
        return (
           <div className="p-2 sm:p-4 md:p-6">
             <h2 className="text-3xl font-semibold text-slate-100 mb-6">Mock Log Viewer</h2>
             <LogViewer logs={MOCK_LOGS} />
           </div>
        );
      case 'rules':
        return <DetectionRulesView detectionRules={DETECTION_RULES_EXAMPLES} />;
       case 'playbooks':
        return <PlaybooksView playbookExamples={PLAYBOOK_EXAMPLES} />;
       case 'artifacts':
        return <CodeArtifactsView iacExamples={IAC_EXAMPLES} cicdExamples={CICD_EXAMPLES} />;
      case 'runbook':
        return <RunbookView runbookContent={RUNBOOK_CONTENT} />;
      case 'deliverables':
        return <DeliverablesView onNavigate={handleNavClick} />;
      default:
        return <div className="p-6 text-slate-100">Select a view from the sidebar.</div>;
    }
  };

  const navItems = [
    { id: 'overview', label: 'Project Phases', icon: HomeIcon },
    { id: 'dashboard', label: 'SIEM Dashboard', icon: ChartPieIcon },
    { id: 'alerts', label: 'Alerts', icon: AlertIcon },
    { id: 'logs', label: 'Log Viewer', icon: ListIcon },
    { id: 'rules', label: 'Detection Rules', icon: EyeIcon },
    { id: 'playbooks', label: 'Response Playbooks', icon: PlayIcon },
    { id: 'artifacts', label: 'Code Artifacts', icon: FileCodeIcon },
    { id: 'runbook', label: 'Runbook', icon: BookOpenIcon },
    { id: 'deliverables', label: 'Deliverables', icon: ClipboardCheckIcon },
  ] as const;

  return (
    <DashboardLayout navItems={navItems} currentView={currentView} onNavClick={handleNavClick}>
      {renderView()}
    </DashboardLayout>
  );
};

export default App;
