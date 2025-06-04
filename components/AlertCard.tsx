
import React from 'react';
import type { Alert } from '../types';
import { AlertTriangleIcon, CheckCircleIcon, InfoIcon, XCircleIcon } from './icons';

interface AlertCardProps {
  alert: Alert;
  onSelect: (alert: Alert) => void;
  isSelected: boolean;
}

const SeverityIcon: React.FC<{ severity: Alert['severity'] }> = ({ severity }) => {
  switch (severity) {
    case 'Critical':
      return <AlertTriangleIcon className="w-6 h-6 text-red-500" />;
    case 'High':
      return <AlertTriangleIcon className="w-6 h-6 text-orange-500" />;
    case 'Medium':
      return <InfoIcon className="w-6 h-6 text-yellow-500" />;
    case 'Low':
      return <InfoIcon className="w-6 h-6 text-blue-500" />;
    default:
      return <InfoIcon className="w-6 h-6 text-gray-500" />;
  }
};

const getSeverityColor = (severity: Alert['severity']): string => {
  switch (severity) {
    case 'Critical': return 'border-red-500';
    case 'High': return 'border-orange-500';
    case 'Medium': return 'border-yellow-500';
    case 'Low': return 'border-blue-500';
    default: return 'border-slate-600';
  }
};

export const AlertCard: React.FC<AlertCardProps> = ({ alert, onSelect, isSelected }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const formattedTimestamp = new Date(alert.timestamp).toLocaleString();

  return (
    <div 
      className={`bg-slate-800 rounded-lg shadow-lg overflow-hidden transition-all duration-200 ease-in-out
                  border-l-4 ${getSeverityColor(alert.severity)} ${isSelected ? 'ring-2 ring-blue-500 shadow-blue-500/30' : 'hover:shadow-xl'}`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <SeverityIcon severity={alert.severity} />
            <h3 className="ml-3 text-lg font-semibold text-slate-100">{alert.title}</h3>
          </div>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            alert.severity === 'Critical' ? 'bg-red-500 text-white' :
            alert.severity === 'High' ? 'bg-orange-500 text-white' :
            alert.severity === 'Medium' ? 'bg-yellow-500 text-slate-800' :
            'bg-blue-500 text-white'
          }`}>
            {alert.severity}
          </span>
        </div>
        <p className="mt-2 text-sm text-slate-300 line-clamp-2">{alert.description}</p>
        <p className="mt-2 text-xs text-slate-400">
          <span className="font-medium">Source:</span> {alert.source} | <span className="font-medium">Time:</span> {formattedTimestamp}
        </p>

        {alert.details && Object.keys(alert.details).length > 0 && (
          <div className="mt-3">
            <button onClick={() => setIsExpanded(!isExpanded)} className="text-xs text-blue-400 hover:text-blue-300">
              {isExpanded ? 'Hide Details' : 'Show Details'}
            </button>
            {isExpanded && (
              <div className="mt-2 space-y-1 text-xs text-slate-300 bg-slate-700/50 p-3 rounded">
                {Object.entries(alert.details).map(([key, value]) => (
                  <div key={key}><strong className="text-slate-200">{key}:</strong> {value}</div>
                ))}
              </div>
            )}
          </div>
        )}
        
        <button
          onClick={() => onSelect(alert)}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {isSelected ? 'Selected - Analyze' : 'Analyze with AI'}
        </button>
      </div>
    </div>
  );
};
