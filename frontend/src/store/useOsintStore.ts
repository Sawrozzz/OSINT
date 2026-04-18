/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axios from "axios";

import type { ScanResult, TargetType, SearchSession } from "../types/osint";

export const API_BASE = import.meta.env.VITE_API_URL;

interface OsintState {
  results: ScanResult[];
  currentSearch: SearchSession | null;
  loading: boolean;
  error: string | null;
  startSearch: (query: string, targetType: TargetType) => Promise<void>;
}

export const useOsintStore = create<OsintState>((set) => ({
  results: [],
  currentSearch: null,
  loading: false,
  error: null,

  startSearch: async (query, targetType) => {
    set({ loading: true, error: null, results: [] });

    try {
      const { data: search } = await axios.post<SearchSession>(
        `${API_BASE}/searches`,
        {
          query,
          target_type: targetType,
        },
      );
      set({ currentSearch: search });

      const pollInterval = setInterval(async () => {
        try {
          const { data: statusCheck } = await axios.get(
            `${API_BASE}/searches/${search.id}`,
          );
          if (statusCheck.status === "completed") {
            clearInterval(pollInterval);
            set({ results: statusCheck.results, loading: false });
          }
        } catch (error: any) {
          clearInterval(pollInterval);
          set({ error: error || "Polling failed", loading: false });
        }
      }, 4000);
    } catch (error: any) {
      console.error(error);
      set({ error: error || "Failed to connect to backend", loading: false });
    }
  },
}));
