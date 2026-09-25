import React from 'react';
import { Search, CloudSun, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onToggleSidebar,
  isSidebarOpen,
  activeSection,
  onSelectSection,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Brand Title */}
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              onSelectSection('overview');
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
              <CloudSun className="w-5 h-5" />
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
              DevoraCamp Docs
            </span>
          </a>
        </div>

        {/* Center: Clean 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold tracking-wide text-slate-400">
          <button
            type="button"
            onClick={() => onSelectSection('overview')}
            className={`hover:text-emerald-400 transition-colors whitespace-nowrap cursor-pointer ${
              activeSection === 'overview' ? 'text-emerald-400 font-bold' : ''
            }`}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => onSelectSection('setup')}
            className={`hover:text-emerald-400 transition-colors whitespace-nowrap cursor-pointer ${
              activeSection === 'setup' ? 'text-emerald-400 font-bold' : ''
            }`}
          >
            Setup
          </button>
          <button
            type="button"
            onClick={() => onSelectSection('step-1-types')}
            className={`hover:text-emerald-400 transition-colors whitespace-nowrap cursor-pointer ${
              activeSection.startsWith('step-') ? 'text-emerald-400 font-bold' : ''
            }`}
          >
            Step-by-Step Guides
          </button>
          <button
            type="button"
            onClick={() => onSelectSection('code-reference')}
            className={`hover:text-emerald-400 transition-colors whitespace-nowrap cursor-pointer ${
              activeSection === 'code-reference' ? 'text-emerald-400 font-bold' : ''
            }`}
          >
            Code Reference
          </button>
          <button
            type="button"
            onClick={() => onSelectSection('live-demo')}
            className={`hover:text-emerald-400 transition-colors whitespace-nowrap cursor-pointer ${
              activeSection === 'live-demo' ? 'text-emerald-400 font-bold' : ''
            }`}
          >
            Live Demo
          </button>
        </nav>

        {/* Right: Search and Quick Action */}
        <div className="flex items-center gap-3">
          {/* Quick Search Trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-all text-xs font-medium cursor-pointer"
            aria-label="Open search dialog"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search docs...</span>
            <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500 bg-slate-950 border border-slate-800">
              ⌘K
            </span>
          </button>

          {/* Live Demo Direct Link Button */}
          <button
            type="button"
            onClick={() => onSelectSection('live-demo')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors whitespace-nowrap shadow-sm cursor-pointer"
          >
            <span>Live Demo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
