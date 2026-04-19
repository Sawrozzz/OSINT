import React, { useState, useMemo } from "react";
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
import { formatToNepalTime } from "../utils/formatUtils";

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
  const [expandedDetails, setExpandedDetails] = useState<
    Record<number, boolean>
  >({});

  const toggleDetails = (id: number) => {
    setExpandedDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const showExportButtons = results.length > 0 && !loading;

  // 🔥 SORT RESULTS (signal first)
  const sortedResults = useMemo(() => {
    return [...results].sort((a, b) => {
      return (
        b.confidence_score - a.confidence_score ||
        (b.relevance_level === "High" ? 1 : 0) -
        (a.relevance_level === "High" ? 1 : 0)
      );
    });
  }, [results]);

  const getRiskColor = (risk?: string) => {
    switch (risk?.toLowerCase()) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    }
  };

  const getRelevanceColor = (level?: string) => {
    switch (level?.toLowerCase()) {
      case "high":
        return "text-emerald-400";
      case "medium":
        return "text-yellow-400";
      default:
        return "text-slate-500";
    }
  };

  const getConfidenceColor = (score?: number) => {
    if (!score) return "text-slate-500";
    if (score > 0.8) return "text-emerald-400";
    if (score > 0.5) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-slate-300 font-sans">
      {/* NAV */}
      <nav className="border-b border-slate-800 sticky top-0 bg-[#0b1220]/80 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={onBackClick}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition"
          >
            <ArrowLeft size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">
              New search
            </span>
          </button>

          {showExportButtons && (
            <div className="flex gap-3">
              <button
                onClick={onDownloadMarkdown}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold border border-slate-700"
              >
                <FileText size={14} /> Markdown
              </button>
              <button
                onClick={onDownloadPDF}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black rounded-lg text-xs font-bold"
              >
                <FileDown size={14} /> PDF
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto p-6 md:p-12 space-y-12">
        {/* HEADER */}
        <header className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-emerald-400">
              {targetType} • {formatToNepalTime(new Date())}
            </p>
            <h2 className="text-4xl font-bold text-white capitalize">{query}</h2>
          </div>

          {/* SUMMARY */}
          <div className="grid grid-cols-3 gap-6 border-y border-slate-800 py-6 font-mono">
            <div>
              <p className="text-xs text-slate-500">Findings</p>
              <p className="text-xl font-bold text-white">{results.length}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">High Confidence</p>
              <p className="text-xl font-bold text-emerald-400">
                {results.filter((r) => r.confidence_score > 0.8).length}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">High Risk</p>
              <p className="text-xl font-bold text-red-400">
                {results.filter((r) => r.data.risk_factor === "High").length}
              </p>
            </div>
          </div>
        </header>

        {/* RESULTS */}
        {["Technical", "News", "Social"].map((catName) => {
          const categoryResults = sortedResults.filter((r) =>
            r.category.toLowerCase().includes(catName.toLowerCase())
          );
          if (!categoryResults.length && !loading) return null;

          return (
            <section key={catName} className="space-y-6">
              <h3 className="text-lg font-semibold text-white border-l-4 border-emerald-500 pl-3">
                {catName} Intelligence ({categoryResults.length})
              </h3>

              <div className="grid gap-4">
                {categoryResults.map((res) => (
                  <div
                    key={res.id}
                    className="bg-[#111827] border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition"
                  >
                    {/* HEADER */}
                    <div className="flex justify-between mb-3">
                      <div className="flex gap-2 items-center">
                        <span className="text-xs bg-slate-800 px-2 py-0.5 rounded">
                          {res.source}
                        </span>

                        {res.data.risk_factor && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded border ${getRiskColor(
                              res.data.risk_factor
                            )}`}
                          >
                            {res.data.risk_factor} Risk
                          </span>
                        )}
                      </div>

                      {(res.data.url ||
                        res.data.profile_url ||
                        res.data.hostname) && (
                          <a
                            href={
                              res.data.url ||
                              res.data.profile_url ||
                              `https://${res.data.hostname}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                    </div>

                    <h4 className="text-lg font-semibold text-white">
                      {res.data.title ||
                        res.data.hostname ||
                        res.data.username ||
                        "Data Point"}
                    </h4>

                    <div className="flex gap-4 text-xs font-mono mt-1 mb-2">
                      <span className={getConfidenceColor(res.confidence_score)}>
                        {(res.confidence_score * 100).toFixed(0)}% Confidence
                      </span>
                      <span className={getRelevanceColor(res.relevance_level)}>
                        {res.relevance_level} Relevance
                      </span>
                    </div>

                    <p className="text-sm text-slate-400">
                      {res.data.description ||
                        res.data.text ||
                        "No summary available"}
                    </p>

                    <button
                      onClick={() => toggleDetails(res.id)}
                      className="mt-4 text-xs text-slate-500 hover:text-emerald-400 flex items-center gap-2"
                    >
                      <Database size={14} />
                      {expandedDetails[res.id]
                        ? "Hide Details"
                        : "View Details"}
                      {expandedDetails[res.id] ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                    </button>

                    {expandedDetails[res.id] && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
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

                          return (
                            <div
                              key={key}
                              className="bg-slate-900 p-2 rounded text-xs"
                            >
                              <p className="text-slate-500 uppercase">
                                {key}
                              </p>
                              <p className="text-slate-300 break-all">
                                {typeof value === "object"
                                  ? JSON.stringify(value)
                                  : String(value)}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {loading && (
          <div className="text-center py-20 text-emerald-400 text-sm animate-pulse">
            Processing intelligence...
          </div>
        )}
      </main>
    </div>
  );
};

export default ResultsPage;