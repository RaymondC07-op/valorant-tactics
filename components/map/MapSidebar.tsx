"use client";

import { useState, useEffect } from "react";
import type { TacticChapter } from "@/lib/types";

interface Props {
  sections?: TacticChapter[];
}

export default function MapSidebar({ sections }: Props) {
  const [activeId, setActiveId] = useState<string>("");

  // Observe scroll position to highlight active section
  useEffect(() => {
    if (!sections) return;
    const ids = sections.flatMap((s) => [
      s.id,
      ...s.subsections.map((sub) => sub.id),
    ]);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!sections || sections.length === 0) return null;

  return (
    <nav className="sticky top-20 bg-valorant-dark/30 border border-gray-700/20 rounded-sm p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-4 h-px bg-valorant-red/40" />
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-[0.15em]">
          战术章节
        </h4>
      </div>
      <ul className="space-y-0.5">
        {sections.map((section) => (
          <li key={section.id}>
            {/* H2 section header */}
            <button
              onClick={() => scrollTo(section.id)}
              className={`text-left text-sm w-full py-2 transition-colors rounded-sm px-2 font-medium ${
                activeId === section.id
                  ? "text-valorant-red bg-valorant-red/5 border-l-2 border-valorant-red"
                  : "text-gray-300 hover:text-valorant-light border-l-2 border-transparent"
              }`}
            >
              {section.title}
            </button>

            {/* H3 subsections */}
            {section.subsections.length > 0 && (
              <ul className="ml-2">
                {section.subsections.map((sub) => (
                  <li key={sub.id}>
                    <button
                      onClick={() => scrollTo(sub.id)}
                      className={`text-left text-xs w-full py-1.5 transition-colors rounded-sm px-2 pl-5 ${
                        activeId === sub.id
                          ? "text-valorant-red bg-valorant-red/5 border-l-2 border-valorant-red"
                          : "text-gray-500 hover:text-gray-300 border-l-2 border-transparent"
                      }`}
                    >
                      {sub.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
