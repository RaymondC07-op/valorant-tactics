import type { MapFrontmatter } from "@/lib/types";
import MapCard from "./MapCard";

interface MapGridProps {
  maps: MapFrontmatter[];
}

export default function MapGrid({ maps }: MapGridProps) {
  if (maps.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p className="text-lg">暂无地图数据</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {maps.map((map) => (
        <MapCard key={map.slug} map={map} />
      ))}
    </div>
  );
}
