import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMapWithContent, getComposition, getAllMapSlugs } from "@/lib/content";
import MapSidebar from "@/components/map/MapSidebar";
import CompositionTable from "@/components/composition/CompositionTable";
import MapPoolBadge from "@/components/map/MapPoolBadge";
import { DIFFICULTY_COLORS } from "@/lib/constants";
import MapContentRenderer from "./MapContentRenderer";
import CalloutImage from "@/components/map/CalloutImage";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllMapSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const map = getMapWithContent(slug);
  if (!map) return { title: "地图未找到" };

  return {
    title: `${map.name}攻略 - ${map.nameEn}战术详解`,
    description: `${map.name}(${map.nameEn})详细攻防战术攻略：包含报点点位、进攻路线、防守站位、推荐阵容。${map.playstyle}`,
    openGraph: {
      title: `${map.name}攻略 - ${map.nameEn}战术详解 - 无畏契约战术手册`,
      description: `${map.name}(${map.nameEn})详细攻防战术攻略：包含报点点位、进攻路线、防守站位、推荐阵容。${map.playstyle}`,
      type: "article",
      locale: "zh_CN",
    },
  };
}

export default async function MapDetailPage({ params }: Props) {
  const { slug } = await params;
  const mapData = getMapWithContent(slug);
  const composition = getComposition(slug);

  if (!mapData) notFound();

  return (
    <main className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-valorant-dark/80 to-valorant-dark border border-gray-700/30 p-6 sm:p-8 mb-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-valorant-red/5 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-valorant-light">
                  {mapData.name}
                </h1>
                <p className="text-gray-400 text-lg mt-1">{mapData.nameEn}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <MapPoolBadge inRotation={mapData.inRotation} />
                <span className={`text-sm rounded-full border px-3 py-1 font-medium ${DIFFICULTY_COLORS[mapData.difficulty] || ""}`}>
                  难度：{mapData.difficulty}
                </span>
              </div>
            </div>

            <p className="text-gray-300 max-w-2xl mt-3 leading-relaxed">{mapData.playstyle}</p>

            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-400">
              <div className="flex items-center gap-1.5">
                <span className="text-valorant-gold font-semibold">{mapData.sites.length}</span> 个包点
                <span className="text-gray-600">（{mapData.sites.join("、")}）</span>
              </div>
              <span className="text-gray-600">·</span>
              <span>上线于 {mapData.releasePatch} 版本</span>
              <span className="text-gray-600">·</span>
              <span>更新于 {mapData.updatedAt}</span>
            </div>

            {mapData.features.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {mapData.features.map((f, i) => (
                  <span key={i} className="text-xs bg-valorant-dark/60 text-gray-300 border border-gray-600/30 rounded-full px-3 py-1">
                    {f}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-56 shrink-0 hidden lg:block">
            <MapSidebar />
          </aside>

          {/* Main Content */}
          <article className="flex-1 min-w-0">
            {/* Callout Image */}
            {mapData.calloutImage && (
              <div className="mb-8">
                <CalloutImage
                  src={mapData.calloutImage}
                  alt={`${mapData.name}报点图`}
                />
              </div>
            )}

            <MapContentRenderer content={mapData.content} />

            {/* Composition Section */}
            {composition && <CompositionTable composition={composition} />}

            {!composition && (
              <div className="my-8 p-6 bg-valorant-dark/40 border border-gray-700/30 rounded-xl text-center">
                <p className="text-gray-500">该地图的阵容推荐正在制作中，敬请期待。</p>
              </div>
            )}
          </article>
        </div>
      </div>
    </main>
  );
}
