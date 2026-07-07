import type { Metadata } from "next";
import { getAllMaps } from "@/lib/content";
import FilteredMapsClient from "./FilteredMapsClient";

export const metadata: Metadata = {
  title: "地图攻略",
  description: "浏览全部无畏契约地图的攻防战术攻略，包括亚海悬城、隐世修所、源工重镇等13张地图。",
  openGraph: {
    title: "地图攻略 - 无畏契约战术手册",
    description: "浏览全部无畏契约地图的攻防战术攻略，包括亚海悬城、隐世修所、源工重镇等13张地图。",
    type: "website",
    locale: "zh_CN",
  },
};

export default function MapsPage() {
  const maps = getAllMaps();

  return (
    <main className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-valorant-red/40" />
            <span className="text-xs font-medium text-valorant-red tracking-[0.15em] uppercase">Map Intel</span>
            <span className="w-8 h-px bg-valorant-red/40" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-valorant-light mb-3">
            地图攻略
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            选择一张地图查看详细的进攻防守战术、报点点位和推荐阵容。
            当前竞技轮换池共7张地图，非轮换地图仍可在休闲模式中游玩。
          </p>
        </div>
        <FilteredMapsClient maps={maps} />
      </div>
    </main>
  );
}
