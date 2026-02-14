import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { docPages } from '../data/docs';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';

interface DocsPageProps {
  docId: string;
  canGoBack: boolean;
  canGoForward: boolean;
  goBack: () => void;
  goForward: () => void;
  onDocClick: (docId: string) => void;
}

export const DocsPage: React.FC<DocsPageProps> = ({
  docId,
  canGoBack,
  canGoForward,
  goBack,
  goForward,
  onDocClick,
}) => {
  const doc = docPages[docId];

  if (!doc) {
    return (
      <div className="h-full flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="flex items-center" style={{ paddingTop: '16px', paddingBottom: '10px', paddingLeft: '16px', paddingRight: '24px' }}>
          <div className="flex items-center gap-2">
            <button
              className={`p-1 rounded transition-colors ${canGoBack ? 'hover:bg-[var(--hover-bg)]' : 'opacity-40 cursor-default'}`}
              style={{ color: 'var(--sidebar-icon)', backgroundColor: 'transparent' }}
              title="Back"
              onClick={goBack}
              disabled={!canGoBack}
            >
              <ArrowLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              className={`p-1 rounded transition-colors ${canGoForward ? 'hover:bg-[var(--hover-bg)]' : 'opacity-40 cursor-default'}`}
              style={{ color: 'var(--sidebar-icon)', backgroundColor: 'transparent' }}
              title="Forward"
              onClick={goForward}
              disabled={!canGoForward}
            >
              <ArrowRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <BookOpen size={48} strokeWidth={1} style={{ color: 'var(--text-muted)', opacity: 0.3, margin: '0 auto 16px' }} />
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Page Not Found
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              This documentation page doesn't exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeContent: string[] = [];
    let codeLanguage = '';
    let inTable = false;
    let tableRows: string[][] = [];
    let listItems: string[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} style={{ marginBottom: '16px', paddingLeft: '24px' }}>
            {listItems.map((item, i) => (
              <li key={i} style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-primary)', marginBottom: '4px' }}>
                {renderInlineMarkdown(item)}
              </li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    const flushTable = () => {
      if (tableRows.length > 0) {
        elements.push(
          <table key={`table-${elements.length}`} style={{ marginBottom: '16px', width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {tableRows[0]?.map((cell, i) => (
                  <th key={i} style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border-primary)', fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {cell.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.slice(2).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, i) => (
                    <td key={i} style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-primary)', fontSize: '14px', color: 'var(--text-primary)' }}>
                      {renderInlineMarkdown(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
        tableRows = [];
        inTable = false;
      }
    };

    const renderInlineMarkdown = (text: string): React.ReactNode => {
      // Handle links first: [text](url)
      const linkPattern = /(\[[^\]]+\]\([^)]+\))/g;
      const linkParts = text.split(linkPattern);

      return linkParts.map((part, i) => {
        // Check if this part is a link
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          const [, linkText, url] = linkMatch;
          // Internal doc link: doc:doc-id
          if (url.startsWith('doc:')) {
            const targetDocId = url.slice(4);
            return (
              <a
                key={i}
                href="#"
                onClick={(e) => { e.preventDefault(); onDocClick(targetDocId); }}
                style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}
                onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
              >
                {linkText}
              </a>
            );
          }
          // External link
          return (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}
              onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
              {linkText}
            </a>
          );
        }

        // Handle inline code
        const codeParts = part.split(/(`[^`]+`)/g);
        return codeParts.map((codePart, j) => {
          if (codePart.startsWith('`') && codePart.endsWith('`')) {
            return (
              <code key={`${i}-${j}`} style={{ backgroundColor: 'var(--bg-tertiary)', padding: '2px 6px', borderRadius: '4px', fontSize: '13px', fontFamily: 'monospace' }}>
                {codePart.slice(1, -1)}
              </code>
            );
          }
          // Handle bold
          const boldParts = codePart.split(/(\*\*[^*]+\*\*)/g);
          return boldParts.map((bp, k) => {
            if (bp.startsWith('**') && bp.endsWith('**')) {
              return <strong key={`${i}-${j}-${k}`}>{bp.slice(2, -2)}</strong>;
            }
            return bp;
          });
        });
      });
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          const code = codeContent.join('\n');
          const lang = codeLanguage || 'text';
          const grammar = Prism.languages[lang];
          // Apply Prism highlighting if grammar exists, otherwise apply custom coloring for hashtags, === and ---
          let highlighted: string;
          if (grammar) {
            highlighted = Prism.highlight(code, grammar, lang);
          } else {
            highlighted = code
              .replace(/(^|\n)(===)/g, '$1<span style="color: #c678dd;">$2</span>')
              .replace(/(^|\n)(---)/g, '$1<span style="color: #c678dd;">$2</span>')
              .replace(/(^|\n)(#[\w-]+)/g, '$1<span style="color: #c678dd;">$2</span>');
          }
          elements.push(
            <pre key={`code-${elements.length}`} className={`language-${lang}`} style={{ backgroundColor: '#2d2d2d', padding: '16px', borderRadius: '8px', marginBottom: '16px', overflow: 'auto' }}>
              <code
                className={`language-${lang}`}
                style={{ fontSize: '13px', fontFamily: 'monospace', lineHeight: '1.4' }}
                dangerouslySetInnerHTML={{ __html: highlighted }}
              />
            </pre>
          );
          codeContent = [];
          codeLanguage = '';
          inCodeBlock = false;
        } else {
          flushList();
          flushTable();
          codeLanguage = line.slice(3).trim();
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeContent.push(line);
        continue;
      }

      // Table rows
      if (line.startsWith('|')) {
        flushList();
        const cells = line.split('|').filter(c => c.trim() !== '');
        if (cells.length > 0) {
          if (!inTable) inTable = true;
          tableRows.push(cells);
        }
        continue;
      } else if (inTable) {
        flushTable();
      }

      // Headers
      if (line.startsWith('# ')) {
        flushList();
        elements.push(
          <h1 key={`h1-${elements.length}`} style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', marginTop: i > 0 ? '32px' : '0' }}>
            {renderInlineMarkdown(line.slice(2))}
          </h1>
        );
        continue;
      }

      if (line.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={`h2-${elements.length}`} style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px', marginTop: '28px' }}>
            {renderInlineMarkdown(line.slice(3))}
          </h2>
        );
        continue;
      }

      if (line.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={`h3-${elements.length}`} style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px', marginTop: '24px' }}>
            {renderInlineMarkdown(line.slice(4))}
          </h3>
        );
        continue;
      }

      // List items
      if (line.startsWith('- ')) {
        listItems.push(line.slice(2));
        continue;
      } else if (listItems.length > 0) {
        flushList();
      }

      // Empty line
      if (line.trim() === '') {
        continue;
      }

      // Regular paragraph
      elements.push(
        <p key={`p-${elements.length}`} style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-primary)', marginBottom: '16px' }}>
          {renderInlineMarkdown(line)}
        </p>
      );
    }

    flushList();
    flushTable();

    return elements;
  };

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Navigation bar */}
      <div className="flex items-center" style={{ paddingTop: '16px', paddingBottom: '10px', paddingLeft: '16px', paddingRight: '24px' }}>
        <div className="flex items-center gap-2">
          <button
            className={`p-1 rounded transition-colors ${canGoBack ? 'hover:bg-[var(--hover-bg)]' : 'opacity-40 cursor-default'}`}
            style={{ color: 'var(--sidebar-icon)', backgroundColor: 'transparent' }}
            title="Back"
            onClick={goBack}
            disabled={!canGoBack}
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
          </button>
          <button
            className={`p-1 rounded transition-colors ${canGoForward ? 'hover:bg-[var(--hover-bg)]' : 'opacity-40 cursor-default'}`}
            style={{ color: 'var(--sidebar-icon)', backgroundColor: 'transparent' }}
            title="Forward"
            onClick={goForward}
            disabled={!canGoForward}
          >
            <ArrowRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto" style={{ padding: '24px 48px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {renderContent(doc.content)}
        </div>
      </div>
    </div>
  );
};
