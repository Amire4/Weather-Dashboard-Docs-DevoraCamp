import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-css';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'typescript',
  filename,
  showLineNumbers = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const getHighlightedCode = () => {
    try {
      const prismLang = Prism.languages[language] || Prism.languages.typescript || Prism.languages.javascript;
      if (prismLang) {
        return Prism.highlight(code.trim(), prismLang, language);
      }
    } catch {
      // ignore
    }
    return code.trim();
  };

  const lines = code.trim().split('\n');

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-slate-800 bg-[#070b14] shadow-xl">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800/80 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700/80" />
          </div>
          {filename ? (
            <span className="font-mono text-slate-300 font-medium tracking-tight">
              {filename}
            </span>
          ) : (
            <span className="text-slate-400 uppercase text-[11px] font-semibold tracking-wider">
              {language}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-500 font-mono text-[11px] hidden sm:inline">
            {lines.length} {lines.length === 1 ? 'line' : 'lines'}
          </span>
          <button
            onClick={handleCopy}
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs font-medium cursor-pointer border border-slate-700/50"
            title="Copy code to clipboard"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto text-sm leading-relaxed font-mono">
        <pre className="text-slate-200">
          <code
            dangerouslySetInnerHTML={{
              __html: getHighlightedCode(),
            }}
          />
        </pre>
      </div>
    </div>
  );
};
