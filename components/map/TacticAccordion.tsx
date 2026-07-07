"use client";

import { useState } from "react";
import MapContentRenderer from "@/app/maps/[slug]/MapContentRenderer";
import type { TacticChapter } from "@/lib/types";

interface Props {
  sections: TacticChapter[];
}

export default function TacticAccordion({ sections }: Props) {
  // Separate sections by category
  const overviewSections = sections.filter((s) =>
    ["地图概览", "报点位置"].includes(s.title)
  );
  const attackSection = sections.find((s) => s.title === "进攻战术");
  const defenseSection = sections.find((s) => s.title === "防守战术");
  const otherSections = sections.filter(
    (s) =>
      !["地图概览", "报点位置", "进攻战术", "防守战术"].includes(s.title)
  );

  return (
    <div className="space-y-6">
      {/* Overview sections — always expanded */}
      {overviewSections.map((section) => (
        <OverviewBlock key={section.id} section={section} />
      ))}

      {/* Attack tactics — expandable subsections */}
      {attackSection && (
        <TacticGroup
          section={attackSection}
          sideColor="valorannt-red"
          icon={
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polygon points="12,2 22,20 2,20" />
              <line x1="12" y1="10" x2="12" y2="16" />
            </svg>
          }
        />
      )}

      {/* Defense tactics — expandable subsections */}
      {defenseSection && (
        <TacticGroup
          section={defenseSection}
          sideColor="valorant-blue"
          icon={
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="6" width="18" height="12" rx="2" />
              <line x1="12" y1="6" x2="12" y2="18" />
            </svg>
          }
        />
      )}

      {/* Other sections */}
      {otherSections.map((section) => (
        <OverviewBlock key={section.id} section={section} />
      ))}
    </div>
  );
}

/* ---- Overview block (always expanded) ---- */
function OverviewBlock({ section }: { section: TacticChapter }) {
  return (
    <section id={section.id} className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-px bg-valorant-red/40" />
        <h2 className="text-xl font-extrabold text-valorant-light tracking-tight">
          {section.title}
        </h2>
      </div>
      <div className="bg-valorant-dark/40 border border-gray-700/20 rounded-sm p-5">
        <MapContentRenderer content={section.content} />
      </div>
    </section>
  );
}

/* ---- Expandable tactic group (H2 with H3 cards) ---- */
function TacticGroup({
  section,
  sideColor,
  icon,
}: {
  section: TacticChapter;
  sideColor: string;
  icon: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id={section.id} className="scroll-mt-24">
      {/* Group header */}
      <div className="flex items-center gap-3 mb-4">
        <span className={`text-${sideColor}`}>{icon}</span>
        <h2 className={`text-xl font-extrabold tracking-tight text-${sideColor}`}>
          {section.title}
        </h2>
        <span className="text-xs text-gray-600 ml-2">
          {section.subsections.length} 项战术
        </span>
      </div>

      {/* Subsection cards */}
      <div className="space-y-3">
        {section.subsections.map((sub) => {
          const isOpen = expanded[sub.id] ?? false;
          return (
            <div
              key={sub.id}
              id={sub.id}
              className="corner-brackets bg-valorant-dark/40 border border-gray-700/20 rounded-sm overflow-hidden transition-all duration-300"
            >
              {/* Header — clickable */}
              <button
                onClick={() => toggle(sub.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition-colors"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-valorant-light">
                  {sub.title}
                </span>
                <span
                  className={`text-gray-500 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              {/* Content — expandable */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 pb-4 border-t border-gray-700/10">
                  <MapContentRenderer content={sub.content} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
