import Link from "next/link";
import { SITE_NAME, NAV_ITEMS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-valorant-dark/80 border-t border-valorant-red/10 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-valorant-red font-bold text-lg mb-2">{SITE_NAME}</h3>
            <p className="text-gray-500 text-sm">
              掌握所有无畏契约地图的攻防战术与最佳阵容搭配
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-valorant-light font-medium mb-3 text-sm uppercase tracking-wider">快速导航</h4>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-400 hover:text-valorant-light text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="text-valorant-light font-medium mb-3 text-sm uppercase tracking-wider">免责声明</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              本网站为社区玩家自发创建的战术参考站点，与 Riot Games 及腾讯无任何关联。
              所有战术内容仅供参考，实际游戏体验可能因版本更新而有所差异。
            </p>
          </div>
        </div>

        <div className="border-t border-valorant-dark/50 mt-6 pt-6 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} {SITE_NAME} — 由社区爱好者维护，内容基于 VCT 职业比赛与社区攻略整理
        </div>
      </div>
    </footer>
  );
}
