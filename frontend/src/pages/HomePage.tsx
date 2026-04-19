import React from "react";
import type { TargetType } from "../types/osint";
import { Shield, Building2, User, Search } from "lucide-react";

interface HomePageProps {
  query: string;
  setQuery: (query: string) => void;
  targetType: TargetType;
  setTargetType: (type: TargetType) => void;
  onSearch: (e: React.FormEvent) => void;
}

const DATA_SOURCES = [
  {
    category: "Social",
    color: "text-emerald-400",
    sources: ["GitHub", "Reddit"],
  },
  {
    category: "Technical",
    color: "text-blue-400",
    sources: ["WHOIS", "DNS Dumpster"],
  },
  {
    category: "News",
    color: "text-purple-400",
    sources: ["News APIs"],
  },
];


const HomePage: React.FC<HomePageProps> = ({
  query,
  setQuery,
  targetType,
  setTargetType,
  onSearch,
}) => {
  return (
    <div className="min-h-screen bg-[#0b1220] text-slate-300 flex flex-col items-center justify-center p-6 selection:bg-emerald-500/30">
      <div className="max-w-3xl w-full space-y-10 animate-in fade-in zoom-in duration-700">
        <div className="flex items-center gap-3 text-emerald-500">
          <Shield size={32} strokeWidth={2.5} />
          <span className="font-black tracking-[0.2em] text-sm uppercase">
            OSINT.By.Sawroz
          </span>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Intelligence Lookup Engine
          </h1>

          <p className="text-slate-400 max-w-xl">
            Search public data sources, analyze signals, and generate structured
            intelligence reports.
          </p>
        </div>

        <form onSubmit={onSearch} className="space-y-6">
          <div className="flex gap-3">
            {[
              { id: "company", label: "Organization", icon: Building2 },
              { id: "individual", label: "Individual", icon: User },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTargetType(t.id as TargetType)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-semibold ${targetType === t.id
                    ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                    : "border-slate-700 text-slate-400 hover:border-slate-600"
                  }`}
              >
                <t.icon size={14} />
                {t.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              autoFocus
              className="w-full bg-[#111827] border border-slate-700 h-16 pl-14 pr-32 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 text-lg text-white"
              placeholder={
                targetType === "company"
                  ? "Enter company name, domain (e.g., meta.com)"
                  : "Enter full name, username or alias"
              }
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <Search className="absolute left-5 top-5 text-slate-500" size={22} />

            <button
              type="submit"
              className="absolute right-2 top-2 h-12 px-6 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg cursor-pointer"
            >
              Analyze
            </button>
          </div>
        </form>
        <div className="pt-6 space-y-4">
          <p className="text-xs uppercase tracking-widest text-slate-500">
            Data Sources
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {DATA_SOURCES.map((section) => (
              <div
                key={section.category}
                className="bg-slate-900/40 border border-slate-800 rounded-lg p-4 space-y-2 hover:border-slate-700 transition"
              >
                <p
                  className={`font-semibold uppercase text-[10px] tracking-wider ${section.color}`}
                >
                  {section.category}
                </p>

                <div className="flex flex-wrap gap-2">
                  {section.sources.map((src) => (
                    <span
                      key={src}
                      className="px-2 py-0.5 bg-slate-800 rounded text-slate-300"
                    >
                      {src}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-[12px] text-slate-600 text-center">
          Data sourced from publicly available intelligence streams.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
