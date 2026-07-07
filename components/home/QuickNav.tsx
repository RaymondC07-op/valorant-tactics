import Link from "next/link";
import { getAllMaps, getAllAgents } from "@/lib/content";

export default function QuickNav() {
  const maps = getAllMaps();
  const agents = getAllAgents();
  const inRotation = maps.filter((m) => m.inRotation);

  return (
    <section className="py-20 bg-valorant-dark/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-valorant-red/40" />
            <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-valorant-red" />
            <span className="w-8 h-px bg-valorant-red/40" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-valorant-light">
            浏览战术库
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Maps */}
          <Link
            href="/maps"
            className="corner-brackets group bg-valorant-dark/40 border border-gray-700/20 rounded-sm p-6 hover:border-valorant-red/30 transition-all duration-300"
          >
            {/* Icon — tactical style */}
            <div className="w-12 h-12 mb-5 rounded-sm bg-valorant-red/10 border border-valorant-red/20 flex items-center justify-center group-hover:bg-valorant-red/15 transition-colors">
              <svg className="w-6 h-6 text-valorant-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="12" y1="3" x2="12" y2="21" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <circle cx="8" cy="8" r="1.5" fill="currentColor" />
                <circle cx="16" cy="16" r="1.5" fill="currentColor" />
              </svg>
            </div>

            <h3 className="text-lg font-bold text-valorant-light mb-2 group-hover:text-valorant-red transition-colors">
              地图攻略
            </h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              覆盖全部 {maps.length} 张地图的攻防战术与报点点位
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-700/20">
              <span className="flex items-center gap-1 text-xs text-valorant-green font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-valorant-green pulse-dot" />
                {inRotation.length} 张轮换中
              </span>
              <span className="text-xs text-gray-600">
                {maps.length - inRotation.length} 张备选
              </span>
            </div>
          </Link>

          {/* Compositions */}
          <Link
            href="/compositions"
            className="corner-brackets group bg-valorant-dark/40 border border-gray-700/20 rounded-sm p-6 hover:border-valorant-red/30 transition-all duration-300"
          >
            <div className="w-12 h-12 mb-5 rounded-sm bg-valorant-gold/10 border border-valorant-gold/20 flex items-center justify-center group-hover:bg-valorant-gold/15 transition-colors">
              <svg className="w-6 h-6 text-valorant-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="12,2 22,20 2,20" />
                <line x1="12" y1="10" x2="12" y2="16" />
                <circle cx="12" cy="8" r="1.5" fill="currentColor" />
              </svg>
            </div>

            <h3 className="text-lg font-bold text-valorant-light mb-2 group-hover:text-valorant-gold transition-colors">
              阵容推荐
            </h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              每张地图的进攻与防守最佳特工搭配方案
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-700/20">
              <span className="text-xs text-gray-500">
                含战术理由 · 获胜条件
              </span>
            </div>
          </Link>

          {/* Agents */}
          <Link
            href="/agents"
            className="corner-brackets group bg-valorant-dark/40 border border-gray-700/20 rounded-sm p-6 hover:border-valorant-red/30 transition-all duration-300"
          >
            <div className="w-12 h-12 mb-5 rounded-sm bg-valorant-blue/10 border border-valorant-blue/20 flex items-center justify-center group-hover:bg-valorant-blue/15 transition-colors">
              <svg className="w-6 h-6 text-valorant-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
                <line x1="18" y1="22" x2="6" y2="22" />
              </svg>
            </div>

            <h3 className="text-lg font-bold text-valorant-light mb-2 group-hover:text-valorant-blue transition-colors">
              特工图鉴
            </h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              了解全部 {agents.length} 位特工的技能与定位角色
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-700/20">
              <span className="text-xs text-gray-500">
                决斗者 · 先锋 · 控场者 · 哨卫
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
