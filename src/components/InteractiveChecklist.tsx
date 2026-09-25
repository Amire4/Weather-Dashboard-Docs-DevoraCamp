import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface ChecklistItem {
  id: string;
  label: string;
  detail: string;
}

const DEFAULT_ITEMS: ChecklistItem[] = [
  {
    id: 'api-key',
    label: 'Obtain & Activate API Key',
    detail: 'Registered at OpenWeatherMap and created a 32-character API key.',
  },
  {
    id: 'env-setup',
    label: 'Configure .env.local',
    detail: 'Added NEXT_PUBLIC_OPENWEATHER_API_KEY with appropriate .gitignore protection.',
  },
  {
    id: 'ts-interfaces',
    label: 'Define TypeScript Interfaces',
    detail: 'Created strict WeatherResponse, MainWeatherData, and WindData types.',
  },
  {
    id: 'ui-styling',
    label: 'Build Weather Condition UI Cards',
    detail: 'Styled temperature, wind, humidity, pressure, and visibility with Tailwind CSS.',
  },
  {
    id: 'api-fetch',
    label: 'Implement Asynchronous Fetching',
    detail: 'Added async/await fetch calls with URL encoding and loading skeleton states.',
  },
  {
    id: 'error-handling',
    label: 'Handle 404 & 401 Error States',
    detail: 'Displayed contextual alerts for invalid cities or unauthorized keys.',
  },
  {
    id: 'local-storage',
    label: 'Persist Recent Searches',
    detail: 'Saved search queries to browser localStorage with quick re-fetch capability.',
  },
];

export const InteractiveChecklist: React.FC = () => {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('devoracamp_checklist');
      if (saved) {
        setCompleted(JSON.parse(saved));
      }
    } catch {
      // storage unavailable
    }
  }, []);

  const toggleItem = (id: string) => {
    const updated = { ...completed, [id]: !completed[id] };
    setCompleted(updated);
    try {
      localStorage.setItem('devoracamp_checklist', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const completedCount = Object.values(completed).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / DEFAULT_ITEMS.length) * 100);

  return (
    <div className="my-8 p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <span>Developer Milestone Checklist</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {completedCount} of {DEFAULT_ITEMS.length} complete
            </span>
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Track your progress as you complete each section of this documentation.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full sm:w-44 space-y-1">
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span>Progress</span>
            <span className="text-emerald-400 font-semibold">{progressPercent}%</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        {DEFAULT_ITEMS.map((item) => {
          const isDone = !!completed[item.id];
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleItem(item.id)}
              className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <Circle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              )}
              <div className="space-y-0.5">
                <span
                  className={`text-xs font-semibold block ${
                    isDone ? 'line-through text-slate-400' : 'text-slate-200'
                  }`}
                >
                  {item.label}
                </span>
                <p className="text-[11px] text-slate-400 leading-normal">
                  {item.detail}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
