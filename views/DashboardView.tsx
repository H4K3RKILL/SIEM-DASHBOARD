
import React from 'react';
import { MockErrorChart } from '../components/MockErrorChart'; // General Error Trends
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { BarChartIcon, UserGroupIcon, ServerStackIcon } from '../components/icons'; 

// Mock data for "Privilege Elevations vs. Login Successes"
const privilegeLoginData = [
  { time: 'Mon', logins: 120, elevations: 5, failedLogins: 15 },
  { time: 'Tue', logins: 150, elevations: 8, failedLogins: 10 },
  { time: 'Wed', logins: 130, elevations: 3, failedLogins: 20 },
  { time: 'Thu', logins: 160, elevations: 12, failedLogins: 5 },
  { time: 'Fri', logins: 180, elevations: 7, failedLogins: 12 },
  { time: 'Sat', logins: 90, elevations: 2, failedLogins: 8 },
  { time: 'Sun', logins: 80, elevations: 1, failedLogins: 5 },
];

// Mock data for "Data Transfer by Service"
const dataTransferData = [
  { service: 'API GW', egressGB: 150, ingressGB: 200 },
  { service: 'Payment Svc', egressGB: 50, ingressGB: 70 },
  { service: 'User Svc', egressGB: 30, ingressGB: 40 },
  { service: 'Reporting DB', egressGB: 250, ingressGB: 10 }, // High egress might be an indicator
  { service: 'Auth Svc', egressGB: 5, ingressGB: 5 },
  { service: 'File Share', egressGB: 180, ingressGB: 20},
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82Ca9D'];


export const DashboardView: React.FC = () => {
  return (
    <div className="p-2 sm:p-4 md:p-6 space-y-6">
      <h2 className="text-3xl font-semibold text-slate-100 mb-6">SIEM Overview Dashboard</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-slate-100 mb-3 flex items-center">
                <BarChartIcon className="w-6 h-6 mr-2 text-red-400" />
                Error-Rate Trends (All Microservices)
            </h3>
            <div className="h-80"> {/* Increased height for better chart visibility */}
                <MockErrorChart />
            </div>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg shadow-lg">
             <h3 className="text-xl font-semibold text-slate-100 mb-3 flex items-center">
                <UserGroupIcon className="w-6 h-6 mr-2 text-green-400" />
                Privilege Elevations vs. Login Successes
            </h3>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={privilegeLoginData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="time" tick={{ fill: '#9ca3af' }} stroke="#4b5563" />
                        <YAxis tick={{ fill: '#9ca3af' }} stroke="#4b5563" allowDecimals={false}/>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.375rem' }}
                            labelStyle={{ color: '#f3f4f6' }}
                            itemStyle={{ color: '#d1d5db' }}
                        />
                        <Legend wrapperStyle={{ color: '#d1d5db', paddingTop: '10px' }} />
                        <Bar dataKey="logins" name="Successful Logins" fill="#22c55e" /> {/* green-500 */}
                        <Bar dataKey="failedLogins" name="Failed Logins" fill="#f97316" /> {/* orange-500 */}
                        <Bar dataKey="elevations" name="Privilege Elevations" fill="#ef4444" /> {/* red-500 */}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
         <div className="bg-slate-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-slate-100 mb-3 flex items-center">
                <ServerStackIcon className="w-6 h-6 mr-2 text-sky-400" />
                Data Transfer by Service (Egress/Ingress GB)
            </h3>
            <div className="h-80">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dataTransferData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="service" tick={{ fill: '#9ca3af' }} stroke="#4b5563" angle={-15} textAnchor="end" height={50} interval={0}/>
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" tick={{ fill: '#9ca3af' }} allowDecimals={false} label={{ value: 'Egress (GB)', angle: -90, position: 'insideLeft', fill: '#9ca3af', dy: 40 }} />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" tick={{ fill: '#9ca3af' }} allowDecimals={false} label={{ value: 'Ingress (GB)', angle: 90, position: 'insideRight', fill: '#9ca3af', dy: -40 }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.375rem' }}
                            labelStyle={{ color: '#f3f4f6' }}
                            itemStyle={{ color: '#d1d5db' }}
                        />
                        <Legend wrapperStyle={{ color: '#d1d5db', paddingTop: '10px' }} />
                        <Bar yAxisId="left" dataKey="egressGB" name="Egress (GB)" fill="#8884d8" />
                        <Bar yAxisId="right" dataKey="ingressGB" name="Ingress (GB)" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-slate-800 rounded-lg shadow-xl">
        <h3 className="text-2xl font-semibold text-slate-100 mb-4">Dashboard Notes</h3>
        <p className="text-sm text-slate-300">
          This dashboard presents a simulated overview of key security metrics as outlined in the project plan. 
          The "Error-Rate Trends" chart tracks HTTP 5xx errors. 
          "Privilege Elevations vs. Login Successes" monitors user access patterns. 
          "Data Transfer by Service" helps identify anomalous data movements.
        </p>
        <p className="text-sm text-slate-400 mt-2">
          In a real SIEM, these charts would be powered by live log data and KQL/Elasticsearch DSL queries, with drill-down capabilities.
          The configuration of such dashboards (e.g., exported as JSON/NDJSON from Kibana or Azure Sentinel Workbooks) is a key deliverable for easy replication and version control.
        </p>
      </div>

    </div>
  );
};
