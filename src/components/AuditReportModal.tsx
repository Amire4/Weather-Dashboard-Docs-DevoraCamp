import React, { useState, useEffect } from 'react';
import {
  X,
  FileDown,
  ExternalLink,
  Check,
  CheckCircle,
  ShieldCheck,
  AlertTriangle,
  Terminal,
} from 'lucide-react';
import { downloadAuditPdf, getAuditPdfBlobUrl, openAuditPdfInNewTab } from '../utils/downloadPdf';

interface AuditReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditReportModal: React.FC<AuditReportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      const url = getAuditPdfBlobUrl();
      setBlobUrl(url);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const success = downloadAuditPdf();
    if (success) {
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }
  };

  const handleOpenPdf = () => {
    openAuditPdfInNewTab();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-900/90">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold text-white truncate">
                  DevoraCamp Weather Dashboard Handbook & Audit Report
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  10 PAGES • 100% VERIFIED
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate">
                Comprehensive 10-Page Technical Guide & Engineering Quality Assurance Document
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar: Strictly Download PDF and Open PDF in New Tab */}
        <div className="px-5 py-3 border-b border-slate-800/80 bg-slate-950/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Official 10-Page PDF Document Ready</span>
          </div>

          {/* Action Buttons: Only Download PDF and Open PDF */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Open PDF in New Tab without downloading */}
            <button
              type="button"
              onClick={handleOpenPdf}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 hover:text-emerald-200 font-semibold border border-slate-700 transition-colors cursor-pointer"
              title="Open full 10-page PDF in a new tab without downloading"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>Open PDF in New Tab</span>
            </button>

            {/* Primary Direct Download PDF Button */}
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-sm cursor-pointer"
              title="Download clean, verified 10-page PDF directly"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal Body: Direct Full PDF Viewer */}
        <div className="flex-1 overflow-hidden p-3 sm:p-5 flex flex-col bg-slate-950">
          <div className="w-full flex-1 rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-inner flex flex-col min-h-[55vh]">
            {blobUrl ? (
              <iframe
                src={blobUrl}
                title="DevoraCamp 10-Page Audit Report PDF"
                className="w-full h-full border-0 rounded-xl"
              />
            ) : (
              <div className="p-8 text-center text-slate-400 flex flex-col items-center justify-center flex-1">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                <p>Loading 10-page PDF document...</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between gap-4 text-xs">
          <span className="text-slate-400 hidden sm:inline">
            Direct binary PDF buffer (10 complete pages, verified 0 errors, 0 warnings)
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleOpenPdf}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              <span>Open in New Tab</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all flex items-center gap-1.5"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
