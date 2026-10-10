/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DocsContent } from './components/DocsContent';
import { TableOfContents } from './components/TableOfContents';
import { SearchModal } from './components/SearchModal';
import { PdfOptionsModal } from './components/PdfOptionsModal';
import { DOC_SECTIONS } from './data/docsContent';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);

  // Sync hash with active section on load and hashchange
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        // Check if hash matches a section or subsection
        const matchedSection = DOC_SECTIONS.find(
          (sec) =>
            sec.id === hash || sec.subsections.some((sub) => sub.id === hash)
        );
        if (matchedSection) {
          setActiveSection(matchedSection.id);
          // If subsection, scroll to it after short delay
          setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Keyboard shortcut: Cmd+K or Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectSection = (sectionId: string) => {
    setActiveSection(sectionId);
    window.location.hash = sectionId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Top Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        onOpenAuditModal={() => setIsAuditModalOpen(true)}
      />

      {/* Main Container Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex">
        {/* Navigation Sidebar */}
        <Sidebar
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onOpenAuditModal={() => setIsAuditModalOpen(true)}
        />

        {/* Central Content Area */}
        <main className="flex-1 min-w-0 md:pl-68 lg:pl-76 py-8 lg:py-10 flex justify-between">
          <DocsContent
            activeSection={activeSection}
            onSelectSection={handleSelectSection}
            onOpenAuditModal={() => setIsAuditModalOpen(true)}
          />

          {/* On-Page Table of Contents */}
          <TableOfContents activeSectionId={activeSection} />
        </main>
      </div>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelect={handleSelectSection}
      />

      {/* PDF Action Selection Modal (Download or Open Online) */}
      <PdfOptionsModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />
    </div>
  );
}
