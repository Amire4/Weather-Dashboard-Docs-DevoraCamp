import React from 'react';
import { AlertTriangle, Gauge, Lightbulb, Info } from 'lucide-react';

export type CalloutType = 'warning' | 'rate-limit' | 'tip' | 'info';

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({ type, title, children }) => {
  const configs = {
    warning: {
      border: 'border-amber-500/40',
      bg: 'bg-amber-950/20',
      iconBg: 'bg-amber-500/10 text-amber-400',
      titleColor: 'text-amber-300',
      Icon: AlertTriangle,
      defaultTitle: 'Security Warning',
    },
    'rate-limit': {
      border: 'border-rose-500/40',
      bg: 'bg-rose-950/20',
      iconBg: 'bg-rose-500/10 text-rose-400',
      titleColor: 'text-rose-300',
      Icon: Gauge,
      defaultTitle: 'Rate Limits & Quota',
    },
    tip: {
      border: 'border-emerald-500/40',
      bg: 'bg-emerald-950/20',
      iconBg: 'bg-emerald-500/10 text-emerald-400',
      titleColor: 'text-emerald-300',
      Icon: Lightbulb,
      defaultTitle: 'Devora Pro Tip',
    },
    info: {
      border: 'border-cyan-500/40',
      bg: 'bg-cyan-950/20',
      iconBg: 'bg-cyan-500/10 text-cyan-400',
      titleColor: 'text-cyan-300',
      Icon: Info,
      defaultTitle: 'Note',
    },
  };

  const config = configs[type] || configs.info;
  const IconComponent = config.Icon;

  return (
    <div
      role="alert"
      className={`my-6 rounded-xl border ${config.border} ${config.bg} p-4 sm:p-5 transition-all shadow-sm`}
    >
      <div className="flex items-start gap-3.5">
        <div className={`p-2 rounded-lg shrink-0 ${config.iconBg}`}>
          <IconComponent className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-1.5 text-sm">
          <h4 className={`font-semibold tracking-tight ${config.titleColor}`}>
            {title || config.defaultTitle}
          </h4>
          <div className="text-slate-300 leading-relaxed space-y-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
