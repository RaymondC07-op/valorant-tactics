"use client";

import { useState, useEffect } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function MapSidebar() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLHeadingElement>(
      "article h2, article h3"
    );
    const items: TocItem[] = [];
    elements.forEach((el, idx) => {
      const id = el.id || `heading-${idx}`;
      if (!el.id) el.id = id;
      items.push({
        id,
        text: el.textContent || "",
        level: el.tagName === "H2" ? 2 : 3,
      });
    });
    setHeadings(items);

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

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-20">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-4 h-px bg-valorant-red/40" />
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-[0.15em]">
          内容目录
        </h4>
      </div>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li key={h.id}>
            <button
              onClick={() => scrollTo(h.id)}
              className={`text-left text-sm w-full py-2.5 transition-colors rounded px-2 ${
                h.level === 3 ? "pl-5" : "pl-2"
              } ${
                activeId === h.id
                  ? "text-valorant-red bg-valorant-red/5 border-l-2 border-valorant-red"
                  : "text-gray-400 hover:text-gray-300 border-l-2 border-transparent"
              }`}
            >
              {h.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
