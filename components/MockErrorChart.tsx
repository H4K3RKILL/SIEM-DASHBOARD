
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: '12:00', errors: 4, critical: 1 },
  { name: '12:05', errors: 6, critical: 2 },
  { name: '12:10', errors: 5, critical: 1 },
  { name: '12:15', errors: 15, critical: 7 },
  { name: '12:20', errors: 27, critical: 15 },
  { name: '12:25', errors: 12, critical: 4 },
  { name: '12:30', errors: 8, critical: 3 },
  { name: '12:35', errors: 5, critical: 1 },
];

export const MockErrorChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 0, // Adjusted for better YAxis label visibility
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" /> {/* slate-700 */}
        <XAxis dataKey="name" tick={{ fill: '#9ca3af' }} stroke="#4b5563" /> {/* slate-400, slate-600 */}
        <YAxis tick={{ fill: '#9ca3af' }} stroke="#4b5563" allowDecimals={false} /> {/* slate-400, slate-600 */}
        <Tooltip
          contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.375rem' }} // bg-slate-800, border-slate-700
          labelStyle={{ color: '#f3f4f6' }} // text-slate-100
          itemStyle={{ color: '#d1d5db' }} // text-slate-300
        />
        <Legend wrapperStyle={{ color: '#d1d5db' }} /> {/* text-slate-300 */}
        <Line type="monotone" dataKey="errors" name="Total 5xx Errors" stroke="#ef4444" activeDot={{ r: 8 }} strokeWidth={2} /> {/* red-500 */}
        <Line type="monotone" dataKey="critical" name="Critical Errors (part of total)" stroke="#f97316" strokeWidth={2} /> {/* orange-500 */}
      </LineChart>
    </ResponsiveContainer>
  );
};
