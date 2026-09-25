import React, { useEffect, useState } from 'react';
import { AlignLeft } from 'lucide-react';
import { DOC_SECTIONS } from '../data/docsContent';

interface TableOfContentsProps {
  activeSectionId: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  activeSectionId,
}) => {
  const [activeSubId, setActiveSubId] = useState<string>('');

  const currentSection = DOC_SECTIONS.find((sec) => sec.id === activeSectionId);
  const subsections = currentSection?.subsections || [];

  useEffect(() => {
    if (subsections.length > 0) {
      setActiveSubId(subsections[0].id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSubId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0.1,
      }
    );

    subsections.forEach((sub) => {
      const el = document.getElementById(sub.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeSectionId, subsections]);

  if (subsections.length === 0) return null;

  return (
    <div className="hidden xl:block w-64 shrink-0 pl-8">
      <div className="sticky top-24 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
          <AlignLeft className="w-3.5 h-3.5 text-emerald-400" />
          <span>On This Page</span>
        </div>

        <nav className="space-y-1 text-xs border-l border-slate-800">
          {subsections.map((sub) => {
            const isActive = activeSubId === sub.id;
            return (
              <a
                key={sub.id}
                href={`#${sub.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(sub.id);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    setActiveSubId(sub.id);
                  }
                }}
                className={`block pl-3 py-1.5 transition-colors border-l -ml-[1px] ${
                  isActive
                    ? 'border-emerald-400 text-emerald-300 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {sub.title}
              </a>
            );
          })}
        </nav>

        {/* Quick Help box */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1.5 mt-6">
          <span className="font-semibold text-slate-200 block">Need help?</span>
          <p className="leading-relaxed">
            Follow each step in sequence or inspect the working demo in the Live Demo tab.
          </p>
        </div>
      </div>
    </div>
  );
};
