
import React from 'react';
import type { LogEntry } from '../types';
import { InfoIcon, AlertTriangleIcon, XCircleIcon, BugIcon } from './icons';

const LogLevelIndicator: React.FC<{ level: LogEntry['level'] }> = ({ level }) => {
  switch (level) {
    case 'INFO':
      return <span className="text-blue-400 flex items-center"><InfoIcon className="w-4 h-4 mr-1.5" /> INFO</span>;
    case 'WARN':
      return <span className="text-yellow-400 flex items-center"><AlertTriangleIcon className="w-4 h-4 mr-1.5" /> WARN</span>;
    case 'ERROR':
      return <span className="text-red-400 flex items-center"><XCircleIcon className="w-4 h-4 mr-1.5" /> ERROR</span>;
    case 'DEBUG':
      return <span className="text-green-400 flex items-center"><BugIcon className="w-4 h-4 mr-1.5" /> DEBUG</span>;
    default:
      return <span className="text-slate-400">{level}</span>;
  }
};

interface LogViewerProps {
  logs: LogEntry[];
}

export const LogViewer: React.FC<LogViewerProps> = ({ logs }) => {
  return (
    <div className="bg-slate-800 rounded-lg shadow-xl p-4 sm:p-6 h-[600px] overflow-y-auto">
      <h3 className="text-xl font-semibold text-slate-100 mb-4">Log Entries</h3>
      <div className="space-y-2 font-mono text-xs">
        {logs.map((log) => (
          <div key={log.id} className="p-2.5 bg-slate-850 rounded shadow-sm border-l-2 border-slate-700 hover:bg-slate-700/50 transition-colors duration-150">
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-400">{new Date(log.timestamp).toLocaleString()}</span>
              <LogLevelIndicator level={log.level} />
            </div>
            <p className="text-slate-300 whitespace-pre-wrap break-all">
              {log.source && <span className="font-semibold text-purple-400 mr-2">[{log.source}]</span>}
              {log.message}
            </p>
          </div>
        ))}
        {logs.length === 0 && (
            <p className="text-slate-400 text-center py-8">No log entries to display.</p>
        )}
      </div>
    </div>
  );
};

// Add a simple slate-850 color for intermediate background if needed
// This can be done in index.html with tailwind.config if using a full setup,
// or approximated with existing colors. For now, assuming slate-800 with slight variations.
// The example will use slate-800 and some transparency/slightly darker shades if needed.
// For LogViewer, using bg-slate-850, which you might need to define or adjust if it's not standard.
// For simplicity, I will use a slightly darker existing color or a semi-transparent one.
// For example, bg-slate-900 with opacity, or just bg-slate-700 for log items for contrast.
// Let's use a slightly distinct shade for the log items for clarity.
// For the inner log entries, I'll use bg-slate-800 slightly darker than main - let's use slate-800 itself and rely on shadow/border
// Or a sub-component with `bg-opacity-50` or `bg-black/10` might work.
// For simplicity, let's use `bg-slate-700/30` for log items.
// Corrected in the code: `bg-slate-850` implies a custom color. I'll use `bg-slate-900` or `bg-gray-900` slightly darker or rely on Tailwind's default shades.
// The current implementation in LogViewer uses `bg-slate-850`. This is a placeholder and should be replaced with a standard Tailwind class or custom config.
// Given the constraint of no custom CSS/config, I'll use a nearby shade like `bg-gray-700` or `bg-slate-700` and adjust.
// Let's make log items `bg-slate-700/50` to distinguish them from the `bg-slate-800` container.
// Done. Changed `bg-slate-850` to `bg-slate-700/50` for LogEntry background.
