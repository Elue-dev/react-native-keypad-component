"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language = "bash", title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightCode = (text: string, lang: string) => {
    if (lang === "bash") {
      return text;
    }

    // Keywords to highlight
    const keywords =
      /\b(import|from|const|let|var|function|return|export|default|if|else|for|while|async|await|new|class|extends|interface|type|enum|as|is|of|in)\b/g;
    const strings = /(['"`])(?:(?=(\\?))\2.)*?\1/g;
    const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;
    const numbers = /\b(\d+)\b/g;
    const functions = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g;

    let highlighted = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    highlighted = highlighted
      .replace(keywords, '<span class="text-blue-400">$1</span>')
      .replace(strings, '<span class="text-green-400">$&</span>')
      .replace(comments, '<span class="text-gray-500">$1</span>')
      .replace(numbers, '<span class="text-orange-400">$1</span>');

    return highlighted;
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden bg-slate-950">
      <div className="flex items-center justify-between bg-slate-900 px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          {title && <span className="text-sm text-gray-400 ml-2">{title}</span>}
        </div>
        <div className="flex items-center gap-3">
          {language && (
            <span className="text-sm text-gray-400">{language}</span>
          )}
          <button
            onClick={handleCopy}
            className="p-1.5 hover:bg-slate-800 rounded transition-colors text-gray-400 hover:text-gray-200"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <pre className="text-sm font-mono text-gray-100 p-4 leading-relaxed">
          <code
            dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }}
          />
        </pre>
      </div>
    </div>
  );
}
