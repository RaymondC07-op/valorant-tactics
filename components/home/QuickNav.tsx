import Link from "next/link";
import { getAllMaps, getAllAgents } from "@/lib/content";

export default function QuickNav() {
  const maps = getAllMaps();
  const agents = getAllAgents();
  const inRotation = maps.filter((m) => m.inRotation);
  const outRotation = maps.filter((m) => !m.inRotation);

  return (
    <section className="py-16 bg-valorant-dark/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-valorant-light text-center mb-10">
          快速导航
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Maps */}
          <Link
            href="/maps"
            className="group bg-valorant-dark/40 border border-gray-700/30 rounded-xl p-6 hover:border-valorant-red/50 transition-all hover:shadow-lg hover:shadow-valorant-red/5"
          >
            <div className="text-3xl mb-3">🗺️</div>
            <h3 className="text-lg font-bold text-valorant-light mb-2 group-hover:text-valorant-red transition-colors">
              地图攻略
            </h3>
            <p className="text-gray-400 text-sm mb-3 leading-relaxed">
              覆盖全部 {maps.length} 张地图的攻防战术
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="text-valorant-green">{inRotation.length}张</span> 轮换中
              <span className="text-gray-600">·</span>
              <span>{outRotation.length}张</span> 备选
            </div>
          </Link>

          {/* Compositions */}
          <Link
            href="/compositions"
            className="group bg-valorant-dark/40 border border-gray-700/30 rounded-xl p-6 hover:border-valorant-red/50 transition-all hover:shadow-lg hover:shadow-valorant-red/5"
          >
            <div className="text-3xl mb-3">⚔️</div>
            <h3 className="text-lg font-bold text-valorant-light mb-2 group-hover:text-valorant-red transition-colors">
              阵容推荐
            </h3>
            <p className="text-gray-400 text-sm mb-3 leading-relaxed">
              每张地图的进攻与防守最佳阵容搭配
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              含战术理由与获胜条件分析
            </div>
          </Link>

          {/* Agents */}
          <Link
            href="/agents"
            className="group bg-valorant-dark/40 border border-gray-700/30 rounded-xl p-6 hover:border-valorant-red/50 transition-all hover:shadow-lg hover:shadow-valorant-red/5"
          >
            <div className="text-3xl mb-3">👤</div>
            <h3 className="text-lg font-bold text-valorant-light mb-2 group-hover:text-valorant-red transition-colors">
              特工图鉴
            </h3>
            <p className="text-gray-400 text-sm mb-3 leading-relaxed">
              了解全部 {agents.length} 位特工的技能与定位
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              决斗者 · 先锋 · 控场者 · 哨卫
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
