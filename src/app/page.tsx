"use client";

import { useState } from "react";
import { UseCaseSearchBox } from "@/components/search/UseCaseSearchBox";
import { ToolCard } from "@/components/tools/ToolCard";
import { ToolRecommendation } from "@/lib/openrouter";

interface SearchResults {
  recommendations: ToolRecommendation[];
}

export default function Home() {
  const [results, setResults] = useState<SearchResults | null>(null);

  const handleResults = (newResults: SearchResults | null) => {
    setResults(newResults);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      <main className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
        <header className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Find the Best AI Tool for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Any Use Case</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            Describe what you want to do. Get expert recommendations backed by real-world capabilities and live web context.
          </p>
        </header>

        <section className="mb-16">
          <UseCaseSearchBox onResults={handleResults} />
        </section>

        {results && (
          <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Top Recommendations
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.recommendations.map((tool, index) => (
                <ToolCard
                  key={index}
                  name={tool.name}
                  reason={tool.reason}
                  quality_note={tool.quality_note}
                  url={tool.url}
                />
              ))}
            </div>
          </section>
        )}

        {!results && (
          <section className="mt-24 space-y-8 opacity-75">
             <div className="text-center">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">Or browse by category</h2>
              <p className="text-sm text-slate-500 mb-8">Explore tools manually</p>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Coding', 'Writing', 'Presentations', 'Image Gen', 'Video', 'Research', 'Social Media', 'Automation'].map((cat) => (
                  <a key={cat} href="#" className="flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-2xl hover:border-blue-400 hover:shadow-md transition-all group cursor-not-allowed">
                    <span className="font-medium text-slate-700 group-hover:text-blue-600">{cat}</span>
                    <span className="text-xs text-slate-400 mt-1">Coming soon</span>
                  </a>
                ))}
             </div>
          </section>
        )}
      </main>
    </div>
  );
}
