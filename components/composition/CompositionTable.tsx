"use client";

import { useState } from "react";
import type { MapComposition } from "@/lib/types";
import AgentPill from "./AgentPill";
import { DIFFICULTY_COLORS } from "@/lib/constants";

interface CompositionTableProps {
  composition: MapComposition;
}

function CompCard({
  entry,
}: {
  entry: MapComposition["recommended"][number];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="corner-brackets bg-valorant-dark/40 border border-gray-700/20 rounded-sm overflow-hidden transition-all duration-300 border-l-2 border-l-valorant-red"
    >
      {/* Clickable header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 hover:bg-white/[0.02] transition-colors"
        aria-expanded={expanded}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-bold text-valorant-light">{entry.name}</h4>
            <span className={`text-xs rounded-sm border px-2 py-0.5 font-medium ${DIFFICULTY_COLORS[entry.difficulty] || ""}`}>
              {entry.difficulty}
            </span>
          </div>
          <span className={`text-gray-500 transition-transform duration-200 shrink-0 ${expanded ? "rotate-180" : ""}`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          {entry.agents.map((slug) => (
            <AgentPill key={slug} slug={slug} />
          ))}
        </div>

        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{entry.rationale}</p>

        {!expanded && (
          <p className="text-xs mt-2 text-valorant-red font-medium">
            点击展开详细战术 →
          </p>
        )}
      </button>

      {/* Expanded content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 border-t border-gray-700/10 space-y-4">
          {/* Win condition */}
          <div className="rounded-sm px-3 py-2 border border-valorant-gold/20 bg-valorant-red/5">
            <span className="text-valorant-gold text-xs font-semibold uppercase tracking-wider">
              获胜条件：
            </span>
            <span className="text-gray-300 text-sm ml-1">{entry.winCondition}</span>
          </div>

          {/* Tactics - Coordination */}
          {entry.tactics && (
            <>
              <div>
                <h5 className="text-sm font-bold text-valorant-light mb-1 flex items-center gap-2">
                  <span className="w-3 h-px bg-valorant-red/60" />
                  技能配合与局部协同
                </h5>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {entry.tactics.coordination}
                </p>
              </div>

              {/* Tactics - Strategy */}
              <div>
                <h5 className="text-sm font-bold text-valorant-light mb-1 flex items-center gap-2">
                  <span className="w-3 h-px bg-valorant-blue/60" />
                  整体战术安排
                </h5>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {entry.tactics.strategy}
                </p>
              </div>
            </>
          )}

          {/* Fallback if no tactics yet */}
          {!entry.tactics && (
            <p className="text-gray-500 text-xs italic">详细战术内容正在制作中。</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CompositionTable({ composition }: CompositionTableProps) {
  return (
    <section className="my-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-valorant-red/40" />
        <h2 className="text-xl font-extrabold text-valorant-light tracking-tight">
          推荐阵容
        </h2>
        <span className="text-xs text-gray-600">点击阵容查看详细战术</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {composition.recommended.map((comp, i) => (
          <CompCard key={i} entry={comp} />
        ))}
      </div>

      {composition.alternativeAgents.length > 0 && (
        <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
          <span className="shrink-0">备选特工：</span>
          <div className="flex flex-wrap gap-1.5">
            {composition.alternativeAgents.map((slug) => (
              <AgentPill key={slug} slug={slug} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
