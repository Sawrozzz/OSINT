import React, { useState } from "react";
import type { TargetType, ScanResult } from "../types/osint";
import {
  FileDown,
  FileText,
  ExternalLink,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Database,
} from "lucide-react";

interface ResultsPageProps {
  query: string;
  targetType: TargetType;
  results: ScanResult[];
  loading: boolean;
  onBackClick: () => void;
  onDownloadPDF: () => void;
  onDownloadMarkdown: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({
  query,
  targetType,
  results,
  loading,
  onBackClick,
  onDownloadPDF,
  onDownloadMarkdown,
}) => {
  const showExportButtons = results.length > 0 && !loading;

  const [expandedDetails, setExpandedDetails] = useState<
    Record<number, boolean>
  >({});

  const toggleDetails = (id: number) => {
    setExpandedDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[#05080a] text-slate-300 font-sans selection:bg-emerald-500/20">
      <nav className="border-b border-slate-900 sticky top-0 bg-[#05080a]/80 backdrop-blur-xl z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={onBackClick}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />{" "}
            <span className="text-xs font-bold uppercase tracking-widest">
              New search
            </span>
          </button>

          <div className="flex gap-3">
            {showExportButtons && (
              <>
                <button
                  onClick={onDownloadMarkdown}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs font-bold border border-slate-800 transition"
                >
                  <FileText size={14} /> Markdown
                </button>
                <button
                  onClick={onDownloadPDF}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black rounded-lg text-xs font-bold transition"
                >
                  <FileDown size={14} /> PDF Report
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 md:p-12 space-y-12">
        <header className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">
              <span>{targetType}</span>
              <span className="w-1 h-1 rounded-full bg-slate-800" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <h2 className="text-5xl font-bold text-white tracking-tight">
              {query}
            </h2>
          </div>

          <div className="flex gap-8 border-y border-slate-900 py-6 font-mono">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-600 uppercase">
                Findings
              </p>
              <p className="text-xl font-bold text-white">{results.length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-600 uppercase">
                Confidence
              </p>
              <p className="text-xl font-bold text-white">
                {results.filter((r) => r.confidence_score > 0.8).length}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-600 uppercase">
                Risks
              </p>
              <p className="text-xl font-bold text-white">
                {results.filter((r) => r.data.risk_factor === "High").length}
              </p>
            </div>
          </div>
        </header>

        {["Technical", "News", "Social"].map((catName) => {
          const categoryResults = results.filter((r) =>
            r.category.toLowerCase().includes(catName.toLowerCase()),
          );
          if (categoryResults.length === 0 && !loading) return null;

          return (
            <section key={catName} className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-emerald-500 rounded-full" />
                <h3 className="text-lg font-bold text-white uppercase tracking-widest">
                  {catName} Intelligence <span>{categoryResults.length}</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {categoryResults.map((res) => (
                  <div
                    key={res.id}
                    className="group bg-slate-900/10 border border-slate-900 rounded-2xl transition-all overflow-hidden hover:border-slate-800"
                  >
                    {/* Card Header Content */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-2">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            {res.source}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          {res.data.url ||
                          res.data.link ||
                          res.data.profile_url ||
                          res.data.hostname ? (
                            <a
                              href={
                                res.data.url ||
                                res.data.link ||
                                res.data.profile_url ||
                                `https://${res.data.hostname}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-600 hover:text-emerald-400 transition-colors"
                            >
                              <ExternalLink size={16} />
                            </a>
                          ) : null}
                        </div>
                      </div>

                      <h4 className="text-xl font-bold text-white mb-2">
                        {res.data.title ||
                          res.data.hostname ||
                          res.data.username ||
                          "Data Point"}
                      </h4>
                      <p className="text-sm text-slate-500 leading-relaxed max-w-3xl">
                        {res.data.description ||
                          res.data.text ||
                          "No summary provided."}
                      </p>
                    </div>

                    {/* FAQ / ACCORDION SECTION */}
                    <div className="border-t border-slate-900 bg-black/20">
                      <button
                        onClick={() => toggleDetails(res.id)}
                        className="w-full px-6 py-4 flex items-center justify-between text-xs font-bold text-slate-500 hover:text-emerald-400 transition-colors"
                      >
                        <div className="flex items-center gap-2 uppercase tracking-widest text-[10px]">
                          <Database size={14} />
                          {expandedDetails[res.id]
                            ? "Hide Technical Attributes"
                            : "View Technical Attributes"}
                        </div>
                        {expandedDetails[res.id] ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </button>

                      {expandedDetails[res.id] && (
                        <div className="px-6 pb-6 pt-2 animate-in slide-in-from-top-2 duration-200">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {Object.entries(res.data).map(([key, value]) => {
                              if (
                                [
                                  "title",
                                  "description",
                                  "text",
                                  "url",
                                  "link",
                                  "risk_factor",
                                  "hostname",
                                  "username",
                                  "profile_url",
                                ].includes(key)
                              )
                                return null;
                              if (value === null || value === undefined)
                                return null;

                              return (
                                <div
                                  key={key}
                                  className="bg-slate-900/40 p-3 rounded-xl border border-slate-800/50"
                                >
                                  <p className="text-[8px] font-black text-slate-600 uppercase tracking-tighter mb-1">
                                    {key.replace(/_/g, " ")}
                                  </p>
                                  <p className="text-[11px] text-slate-300 font-mono break-all">
                                    {typeof value === "object"
                                      ? JSON.stringify(value)
                                      : String(value)}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 animate-pulse">
              Decrypting Source Stream
            </p>
          </div>
        )}
      </main>
    </div>
  );
};
export default ResultsPage;
