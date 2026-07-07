"use client";

import { useState } from "react";
import MapGrid from "@/components/map/MapGrid";
import type { MapFrontmatter } from "@/lib/types";

type Filter = "all" | "rotation" | "archive";

interface Props {
  maps: MapFrontmatter[];
}

export default function FilteredMapsClient({ maps }: Props) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered: MapFrontmatter[] = (() => {
    switch (filter) {
      case "rotation":
        return maps.filter((m) => m.inRotation);
      case "archive":
        return maps.filter((m) => !m.inRotation);
      default:
        return maps;
    }
  })();

  const counts = {
    all: maps.length,
    rotation: maps.filter((m) => m.inRotation).length,
    archive: maps.filter((m) => !m.inRotation).length,
  };

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: `全部 (${counts.all})` },
    { key: "rotation", label: `当前轮换 (${counts.rotation})` },
    { key: "archive", label: `非轮换 (${counts.archive})` },
  ];

  return (
    <>
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-valorant-dark/40 border border-gray-700/30 rounded-lg p-1 gap-1">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === f.key
                  ? "bg-valorant-red text-white shadow-sm"
                  : "text-gray-400 hover:text-valorant-light"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <MapGrid maps={filtered} />
    </>
  );
}
