import Link from "next/link";
import { getMapsInRotation } from "@/lib/content";

export default function RotationStatus() {
  const rotationMaps = getMapsInRotation();

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-valorant-light">
            当前竞技轮换地图
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            2026赛季 Act 4 — 轮换池共 {rotationMaps.length} 张地图
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {rotationMaps.map((map) => (
            <Link
              key={map.slug}
              href={`/maps/${map.slug}`}
              className="group flex items-center gap-3 bg-valorant-dark/40 border border-gray-700/30 rounded-lg px-4 py-3 hover:border-valorant-red/50 hover:bg-valorant-dark/60 transition-all"
            >
              <div className="w-8 h-8 rounded bg-valorant-red/20 border border-valorant-red/30 flex items-center justify-center text-xs font-bold text-valorant-red">
                {map.sites.length}
              </div>
              <div>
                <span className="text-sm font-medium text-valorant-light group-hover:text-valorant-red transition-colors">
                  {map.name}
                </span>
                <p className="text-xs text-gray-500">{map.nameEn}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
