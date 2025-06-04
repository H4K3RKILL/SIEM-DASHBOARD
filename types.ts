
export interface PlanPhase {
  id: string;
  title: string;
  description: string;
  keyActions: string[];
  status: 'Completed' | 'In Progress' | 'Pending' | 'Conceptual';
  iconName: IconName; 
  details?: string;
  deliverables?: string[];
}

export interface Alert {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
  timestamp: string;
  source: string;
  details?: Record<string, string>;
  ruleId?: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  message: string;
  source?: string;
}

export type ViewType = 'overview' | 'dashboard' | 'alerts' | 'logs' | 'rules' | 'playbooks' | 'artifacts' | 'runbook' | 'deliverables';

export type IconName = 
  'SetupIcon' | 
  'IngestionIcon' | 
  'DetectionIcon' | 
  'ResponseIcon' | 
  'CiCdIcon' | 
  'DocsIcon';

// Props for SVG icons
export interface IconProps {
  className?: string;
}

export interface CodeExample {
  id: string;
  title: string;
  language: string;
  code: string;
  description?: string;
}

export interface RunbookSection {
  id: string;
  title: string;
  content: string; // Markdown-like string
}

export interface DeliverableItem {
  id: string;
  title: string;
  description: string;
  pdfReference: string; // e.g., "Page 2, Item 1"
  appLink: ViewType; // ViewType to navigate to
  appLinkText: string; // Text for the navigation button
}
