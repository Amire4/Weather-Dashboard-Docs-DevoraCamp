import React from 'react';
import {
  BookOpen,
  FolderGit2,
  Layers,
  Code,
  AlertOctagon,
  PlayCircle,
  ChevronRight,
} from 'lucide-react';
import { DOC_SECTIONS } from '../data/docsContent';

interface SidebarProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSelectSection,
  isOpen,
  onClose,
}) => {
  // Category Icons
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Overview':
        return <BookOpen className="w-4 h-4 text-emerald-400" />;
      case 'Setup':
        return <FolderGit2 className="w-4 h-4 text-cyan-400" />;
      case 'Step-by-Step Guides':
        return <Layers className="w-4 h-4 text-indigo-400" />;
      case 'Code Reference':
        return <Code className="w-4 h-4 text-amber-400" />;
      case 'Troubleshooting':
        return <AlertOctagon className="w-4 h-4 text-rose-400" />;
      case 'Live Demo':
        return <PlayCircle className="w-4 h-4 text-emerald-400" />;
      default:
        return <ChevronRight className="w-4 h-4 text-slate-400" />;
    }
  };

  // Group sections by category
  const categories = [
    'Overview',
    'Setup',
    'Step-by-Step Guides',
    'Code Reference',
    'Troubleshooting',
    'Live Demo',
  ] as const;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 lg:w-72 bg-slate-950/95 md:bg-slate-950/60 border-r border-slate-800/80 overflow-y-auto transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 space-y-6">
          {/* Documentation Version / Badge */}
          <div className="px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Docs Version</span>
            <span className="font-mono text-emerald-400 font-semibold">Next.js 15 / React 19</span>
          </div>

          {/* Navigation Categories */}
          <div className="space-y-5">
            {categories.map((category) => {
              const categorySections = DOC_SECTIONS.filter(
                (sec) => sec.category === category
              );

              if (categorySections.length === 0) return null;

              return (
                <div key={category} className="space-y-1.5">
                  <div className="flex items-center gap-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {getCategoryIcon(category)}
                    <span>{category}</span>
                  </div>

                  <div className="space-y-0.5">
                    {categorySections.map((section) => {
                      const isActive = activeSection === section.id;
                      return (
                        <div key={section.id} className="space-y-0.5">
                          <button
                            type="button"
                            onClick={() => {
                              onSelectSection(section.id);
                              onClose();
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                              isActive
                                ? 'bg-emerald-500/10 text-emerald-300 font-semibold border-l-2 border-emerald-400'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                            }`}
                          >
                            <span className="truncate">{section.title}</span>
                          </button>

                          {/* Subsections if active */}
                          {isActive && section.subsections.length > 0 && (
                            <div className="pl-4 pr-1 py-1 space-y-1 border-l border-slate-800 ml-3">
                              {section.subsections.map((sub) => (
                                <a
                                  key={sub.id}
                                  href={`#${sub.id}`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    const el = document.getElementById(sub.id);
                                    if (el) {
                                      el.scrollIntoView({ behavior: 'smooth' });
                                    }
                                    onClose();
                                  }}
                                  className="block py-1 px-2 text-[11px] text-slate-400 hover:text-emerald-400 transition-colors truncate"
                                >
                                  {sub.title}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Footer Links */}
          <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 space-y-1 px-3">
            <p>DevoraCamp Curriculum</p>
            <p className="text-slate-400 font-mono text-[10px]">Updated: 25 Sept 2026</p>
          </div>
        </div>
      </aside>
    </>
  );
};
