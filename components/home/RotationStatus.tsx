import Link from "next/link";
import { getMapsInRotation } from "@/lib/content";

export default function RotationStatus() {
  const rotationMaps = getMapsInRotation();

  return (
    <section className="py-20 bg-valorant-dark/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-valorant-red/40" />
            <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-valorant-green" />
            <span className="w-8 h-px bg-valorant-red/40" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-valorant-light mb-3">
            当前竞技轮换地图
          </h2>
          <p className="text-gray-500 text-sm">
            2026 赛季 Act 4 · 轮换池共 <span className="text-valorant-green font-semibold">{rotationMaps.length}</span> 张地图
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {rotationMaps.map((map) => (
            <Link
              key={map.slug}
              href={`/maps/${map.slug}`}
              className="group flex items-center gap-3 bg-valorant-dark/40 border border-gray-700/20 rounded-sm px-4 py-3 hover:border-valorant-red/40 hover:bg-valorant-dark/60 transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-sm bg-valorant-red/10 border border-valorant-red/20 flex items-center justify-center text-xs font-bold text-valorant-red group-hover:bg-valorant-red/20 transition-colors">
                {map.sites.length}
              </div>
              <div>
                <span className="text-sm font-semibold text-valorant-light group-hover:text-valorant-red transition-colors">
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
