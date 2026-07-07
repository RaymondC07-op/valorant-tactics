import type { Metadata } from "next";
import Link from "next/link";
import { getAllMaps, getComposition } from "@/lib/content";
import AgentPill from "@/components/composition/AgentPill";
import MapPoolBadge from "@/components/map/MapPoolBadge";
import { DIFFICULTY_COLORS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "阵容推荐",
  description: "浏览全部无畏契约地图的最佳阵容搭配，含战术理由与获胜条件。比赛攻防同阵容，一局到底。",
  openGraph: {
    title: "阵容推荐 - 无畏契约战术手册",
    description: "浏览全部无畏契约地图的最佳阵容搭配，含战术理由与获胜条件。比赛攻防同阵容，一局到底。",
    type: "website",
    locale: "zh_CN",
  },
};

export default function CompositionsPage() {
  const maps = getAllMaps();

  return (
    <main className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-valorant-red/40" />
            <span className="text-xs font-medium text-valorant-red tracking-[0.15em] uppercase">Team Comps</span>
            <span className="w-8 h-px bg-valorant-red/40" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-valorant-light mb-3">
            阵容推荐
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            每张地图的最佳阵容搭配，包含战术理由、获胜条件和备选特工建议。比赛无法更换特工，同一阵容需兼顾攻防两端。
          </p>
        </div>

        <div className="space-y-10">
          {maps.map((map) => {
            const comp = getComposition(map.slug);
            return (
              <section key={map.slug} id={map.slug} className="scroll-mt-20">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xl font-bold text-valorant-light">
                    <Link href={`/maps/${map.slug}`} className="hover:text-valorant-red transition-colors">
                      {map.name}
                    </Link>
                  </h2>
                  <span className="text-gray-500 text-sm">{map.nameEn}</span>
                  <MapPoolBadge inRotation={map.inRotation} />
                </div>

                {comp ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {comp.recommended.map((c, i) => (
                      <div key={i} className="bg-valorant-dark/40 border border-gray-700/30 rounded-sm p-3 border-l-4 border-l-valorant-red">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-valorant-light text-sm">{c.name}</h4>
                          <span className={`text-xs rounded-sm border px-1.5 py-0.5 ${DIFFICULTY_COLORS[c.difficulty] || ""}`}>
                            {c.difficulty}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {c.agents.map((slug) => (
                            <AgentPill key={slug} slug={slug} />
                          ))}
                        </div>
                        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{c.rationale}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm bg-valorant-dark/40 border border-gray-700/30 rounded-sm p-4">
                    该地图的阵容推荐正在制作中。
                  </p>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
