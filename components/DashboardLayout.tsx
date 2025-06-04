
import React from 'react';
import type { ViewType, IconProps } from '../types';
import { ShieldCheckIcon, MenuIcon, XIcon } from './icons'; // Assuming XIcon is for close menu

interface NavItem {
  id: ViewType;
  label: string;
  icon: React.FC<IconProps>;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  navItems: readonly NavItem[]; // Changed from NavItem[] to readonly NavItem[]
  currentView: ViewType;
  onNavClick: (view: ViewType) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, navItems, currentView, onNavClick }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 flex-shrink-0 w-64 bg-slate-800 border-r border-slate-700 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:block`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700">
          <div className="flex items-center">
            <ShieldCheckIcon className="w-8 h-8 text-blue-500 mr-2" />
            <h1 className="text-xl font-semibold">SIEM Dashboard</h1>
          </div>
          <button
            className="md:hidden text-slate-400 hover:text-slate-200"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-6">
          <ul>
            {navItems.map((item) => (
              <li key={item.id} className="px-3">
                <button
                  onClick={() => {
                    onNavClick(item.id);
                    setIsSidebarOpen(false); // Close sidebar on mobile after click
                  }}
                  className={`w-full flex items-center px-4 py-3 rounded-md transition-colors duration-150
                    ${currentView === item.id 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-slate-300 hover:bg-slate-700 hover:text-slate-100'
                    }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header for mobile nav toggle */}
        <header className="md:hidden flex items-center justify-between h-16 px-6 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center">
            <ShieldCheckIcon className="w-8 h-8 text-blue-500 mr-2" />
             <h1 className="text-xl font-semibold">SIEM Dashboard</h1>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="text-slate-400 hover:text-slate-200 focus:outline-none"
            aria-label="Open sidebar"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-900">
          {children}
        </main>
      </div>
       {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black opacity-50 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};
