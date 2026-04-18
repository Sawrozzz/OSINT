import React, { useState } from "react";
import { API_BASE, useOsintStore } from "./store/useOsintStore";
import type { TargetType } from "./types/osint";
import HomePage from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";

const App: React.FC = () => {
  const [view, setView] = useState<"home" | "results">("home");
  const [query, setQuery] = useState<string>("");
  const [targetType, setTargetType] = useState<TargetType>("company");

  const { startSearch, results, loading, currentSearch } = useOsintStore();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setView("results");
    await startSearch(query, targetType);
  };

  const handleDownloadPDF = () => {
    if (!currentSearch) return;
    window.open(
      `${API_BASE}/searches/${currentSearch.id}/report.pdf`,
      "_blank",
    );
  };

  const handleDownloadMarkdown = () => {
    if (!currentSearch) return;
    window.location.href = `${API_BASE}/searches/${currentSearch.id}/report.md`;
  };

  if (view === "home") {
    return (
      <HomePage
        query={query}
        setQuery={setQuery}
        targetType={targetType}
        setTargetType={setTargetType}
        onSearch={handleSearch}
      />
    );
  }

  return (
    <ResultsPage
      query={query}
      targetType={targetType}
      results={results}
      loading={loading}
      onBackClick={() => setView("home")}
      onDownloadPDF={handleDownloadPDF}
      onDownloadMarkdown={handleDownloadMarkdown}
    />
  );
};

export default App;
