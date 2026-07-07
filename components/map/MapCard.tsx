import Link from "next/link";
import type { MapFrontmatter } from "@/lib/types";
import MapPoolBadge from "./MapPoolBadge";
import { DIFFICULTY_COLORS } from "@/lib/constants";

interface MapCardProps {
  map: MapFrontmatter;
}

export default function MapCard({ map }: MapCardProps) {
  return (
    <Link
      href={`/maps/${map.slug}`}
      className="corner-brackets group block bg-valorant-dark/40 border border-gray-700/20 rounded-sm overflow-hidden hover:border-valorant-red/40 transition-all duration-300"
    >
      {/* Map Image */}
      <div className="aspect-video bg-gradient-to-br from-valorant-dark/80 to-valorant-dark relative overflow-hidden">
        {map.minimapImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
            style={{ backgroundImage: `url(${map.minimapImage})` }}
          />
        )}
        <div className="absolute top-3 right-3">
          <MapPoolBadge inRotation={map.inRotation} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-valorant-dark/90 to-transparent h-20" />
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          {map.sites.map((site) => (
            <span key={site} className="text-xs bg-valorant-red/30 text-valorant-red border border-valorant-red/40 rounded-sm px-1.5 py-0.5 font-bold">
              {site}点
            </span>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-lg font-bold text-valorant-light group-hover:text-valorant-red transition-colors">
            {map.name}
          </h3>
          <span className={`text-xs rounded-sm border px-2 py-0.5 font-medium ${DIFFICULTY_COLORS[map.difficulty] || ""}`}>
            {map.difficulty}
          </span>
        </div>
        <p className="text-gray-500 text-xs mb-2">{map.nameEn}</p>
        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">{map.playstyle}</p>

        {/* Features */}
        {map.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {map.features.slice(0, 2).map((f, i) => (
              <span key={i} className="text-xs text-gray-500 bg-white/5 rounded-sm px-2 py-0.5">
                {f}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
