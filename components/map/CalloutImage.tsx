"use client";

import { useState } from "react";

interface Props {
  src: string;
  alt: string;
}

export default function CalloutImage({ src, alt }: Props) {
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState(false);

  if (error) {
    return (
      <div className="flex items-center justify-center h-48 bg-valorant-dark/40 border border-gray-700/20 rounded-sm text-gray-500 text-sm">
        🗺️ 报点图制作中，敬请期待
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-gray-700/20 overflow-hidden bg-valorant-dark/40">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700/10">
        <div className="flex items-center gap-2">
          <span className="w-3 h-px bg-valorant-gold/60" />
          <span className="text-xs font-semibold text-valorant-gold uppercase tracking-wider">
            {alt}
          </span>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          {expanded ? "收起" : "展开"}
        </button>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? "max-h-[800px] opacity-100" : "max-h-48 opacity-80"
        }`}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-auto"
          loading="lazy"
          onError={() => setError(true)}
        />
      </div>
    </div>
  );
}
