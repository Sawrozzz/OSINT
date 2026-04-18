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

const HomePage: React.FC<HomePageProps> = ({
  query,
  setQuery,
  targetType,
  setTargetType,
  onSearch,
}) => {
  return (
    <div className="min-h-screen bg-[#05080a] text-slate-300 flex flex-col items-center justify-center p-6 selection:bg-emerald-500/30">
      <div className="max-w-3xl w-full space-y-10 animate-in fade-in zoom-in duration-700">
        <div className="flex items-center gap-3 text-emerald-500">
          <Shield size={32} strokeWidth={2.5} />
          <span className="font-black tracking-[0.2em] text-sm uppercase">
            Sentinel.OSINT
          </span>
        </div>

        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Open-source intelligence, <br />
            <span className="text-emerald-400">in seconds.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl leading-relaxed">
            Aggregate signals from public sources, score relevance, and export
            structured intelligence on any entity.
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
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-bold transition-all ${
                  targetType === t.id
                    ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.1)]"
                    : "border-slate-800 text-slate-500 hover:border-slate-700"
                }`}
              >
                <t.icon size={14} /> {t.label}
              </button>
            ))}
          </div>

          <div className="relative group">
            <input
              type="text"
              autoFocus
              className="w-full bg-slate-900/40 border border-slate-800 h-16 pl-14 pr-4 rounded-2xl outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all text-xl font-light text-white"
              placeholder={
                targetType === "company"
                  ? "e.g., OpenAI, Stripe, acme.com"
                  : "e.g., John Doe or @handle"
              }
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Search
              className="absolute left-5 top-5 text-slate-600"
              size={24}
            />
            <button
              type="submit"
              className="absolute right-3 top-3 h-10 px-6 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all active:scale-95"
            >
              Run recon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
