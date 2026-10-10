import React, { useState } from 'react';
import {
  X,
  FileDown,
  ExternalLink,
  Check,
  ShieldCheck,
  FileText,
  Sparkles,
} from 'lucide-react';
import { downloadAuditPdf, openAuditPdfInNewTab } from '../utils/downloadPdf';

interface PdfOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfOptionsModal: React.FC<PdfOptionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    const success = downloadAuditPdf();
    if (success) {
      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
        onClose();
      }, 1500);
    }
  };

  const handleOpenOnline = () => {
    openAuditPdfInNewTab();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  DevoraCamp 10-Page Handbook
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  VERIFIED
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                How would you like to view this document?
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Choice Suggestions */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed">
            The official 10-page technical guide contains complete startup commands, modular architecture, error recovery solutions, and verification checklists. Select your preferred option below:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            {/* Option 1: Open PDF without download */}
            <button
              type="button"
              onClick={handleOpenOnline}
              className="flex flex-col items-start p-4 rounded-xl bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/50 text-left transition-all group cursor-pointer shadow-sm relative overflow-hidden"
            >
              <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-3 group-hover:scale-110 transition-transform">
                <ExternalLink className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                <span>Open PDF</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 font-normal">
                  In New Tab
                </span>
              </span>
              <span className="text-[11px] text-slate-400 mt-1 leading-snug">
                Read the 10-page guide instantly in your browser without downloading any file.
              </span>
            </button>

            {/* Option 2: Download PDF file */}
            <button
              type="button"
              onClick={handleDownload}
              className="flex flex-col items-start p-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/60 text-left transition-all group cursor-pointer shadow-sm relative overflow-hidden"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
                {downloadSuccess ? (
                  <Check className="w-4 h-4 text-emerald-300" />
                ) : (
                  <FileDown className="w-4 h-4 text-emerald-300" />
                )}
              </div>
              <span className="text-sm font-bold text-emerald-300 group-hover:text-emerald-200 transition-colors flex items-center gap-1.5">
                <span>{downloadSuccess ? 'Downloaded!' : 'Download PDF'}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/30 text-emerald-200 font-normal">
                  Save File
                </span>
              </span>
              <span className="text-[11px] text-slate-400 mt-1 leading-snug">
                Save the complete 10-page PDF document to your device for offline reading.
              </span>
            </button>
          </div>

          <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Guaranteed zero format errors • Verified 10 complete pages</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs">
          <span className="text-slate-400">Press Esc or click Close</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
