"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { ToolRecommendation } from "@/lib/openrouter";

interface SearchResults {
  recommendations: ToolRecommendation[];
}

export function UseCaseSearchBox({ onResults }: { onResults: (results: SearchResults | null) => void }) {
  const [useCase, setUseCase] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!useCase.trim()) return;

    setIsLoading(true);
    setError(null);
    onResults(null);

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ useCase }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Failed to fetch recommendations");
      }

      onResults(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        </div>
        <input
          type="text"
          value={useCase}
          onChange={(e) => setUseCase(e.target.value)}
          placeholder="I want to..."
          className="block w-full pl-12 pr-32 py-4 text-lg border-2 border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-50 focus:border-blue-500 bg-white transition-all placeholder:text-slate-400"
          disabled={isLoading}
        />
        <div className="absolute inset-y-2 right-2 flex items-center">
          <button
            type="submit"
            disabled={isLoading || !useCase.trim()}
            className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Searching...
              </>
            ) : (
              "Find Tools"
            )}
          </button>
        </div>
      </form>
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100 flex items-start gap-3">
          <div className="mt-0.5 font-bold">Error:</div>
          <div>{error}</div>
        </div>
      )}
      <div className="flex flex-wrap gap-2 justify-center text-sm text-slate-500">
        <span>Try:</span>
        <button type="button" onClick={() => setUseCase("Make a pitch deck")} className="hover:text-blue-600 underline decoration-slate-300 underline-offset-4">Make a pitch deck</button>
        <span>&middot;</span>
        <button type="button" onClick={() => setUseCase("Write a React component")} className="hover:text-blue-600 underline decoration-slate-300 underline-offset-4">Write a React component</button>
        <span>&middot;</span>
        <button type="button" onClick={() => setUseCase("Summarize a research paper")} className="hover:text-blue-600 underline decoration-slate-300 underline-offset-4">Summarize a research paper</button>
      </div>
    </div>
  );
}
