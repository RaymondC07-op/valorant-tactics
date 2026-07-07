import type { Metadata } from "next";
import { getAllMaps, getAllAgents } from "@/lib/content";

export const metadata: Metadata = {
  title: "关于本站",
  description: "关于无畏契约战术手册网站的介绍、免责声明和更新方式。",
  openGraph: {
    title: "关于本站 - 无畏契约战术手册",
    description: "关于无畏契约战术手册网站的介绍、免责声明和更新方式。",
    type: "website",
    locale: "zh_CN",
  },
};

export default function AboutPage() {
  const mapCount = getAllMaps().length;
  const agentCount = getAllAgents().length;

  return (
    <main className="py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-3 mb-3 w-full justify-center">
          <span className="w-8 h-px bg-valorant-red/40" />
          <span className="text-xs font-medium text-valorant-red tracking-[0.15em] uppercase">About</span>
          <span className="w-8 h-px bg-valorant-red/40" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-valorant-light mb-8 text-center">
          关于本站
        </h1>

        <div className="space-y-8">
          {/* Introduction */}
          <section className="bg-valorant-dark/40 border border-gray-700/30 rounded-sm p-6">
            <h2 className="text-xl font-bold text-valorant-light mb-3">📖 关于战术手册</h2>
            <p className="text-gray-300 leading-relaxed">
              无畏契约战术手册是一个由社区玩家自发创建的战术参考网站。我们致力于为中文玩家提供
              专业、实用的无畏契约战术内容，帮助大家快速提升游戏理解。
            </p>
            <p className="text-gray-300 leading-relaxed mt-3">
              当前已收录 <span className="text-valorant-red font-semibold">{mapCount}</span> 张地图的攻防战术攻略
              和 <span className="text-valorant-red font-semibold">{agentCount}</span> 位特工的详细介绍。
              内容基于 VCT 职业比赛分析、社区高分攻略和玩家实战经验整理而成。
            </p>
          </section>

          {/* Content Sources */}
          <section className="bg-valorant-dark/40 border border-gray-700/30 rounded-sm p-6">
            <h2 className="text-xl font-bold text-valorant-light mb-3">📝 内容来源</h2>
            <ul className="space-y-2 text-gray-300">
              <li>• VCT（无畏契约冠军巡回赛）职业比赛战术分析</li>
              <li>• 社区知名攻略作者与教练的公开教学内容</li>
              <li>• 国内外无畏契约论坛（VLR.gg、Reddit、贴吧、B站）的热门讨论</li>
              <li>• 游戏内实战数据与版本更新说明</li>
            </ul>
          </section>

          {/* Update Mechanism */}
          <section className="bg-valorant-dark/40 border border-gray-700/30 rounded-sm p-6">
            <h2 className="text-xl font-bold text-valorant-light mb-3">🔄 更新机制</h2>
            <p className="text-gray-300 leading-relaxed">
              我们会定期检测无畏契约官方版本更新。当新地图或新特工发布时，系统会自动提醒内容维护者，
              及时补充新的战术攻略和阵容推荐。所有内容均需人工审核后发布，确保信息准确可靠。
            </p>
          </section>

          {/* Disclaimer */}
          <section className="bg-valorant-dark/40 border border-gray-700/30 rounded-sm p-6 border-l-4 border-l-valorant-red">
            <h2 className="text-xl font-bold text-valorant-light mb-3">⚠️ 免责声明</h2>
            <div className="space-y-3 text-gray-400 text-sm leading-relaxed">
              <p>
                <strong className="text-valorant-light">非官方项目：</strong>
                本网站与 Riot Games 及腾讯无任何关联。"无畏契约"（VALORANT）是 Riot Games 的注册商标。
                所有游戏内的角色、地图、图标和名称均为 Riot Games 的财产。
              </p>
              <p>
                <strong className="text-valorant-light">内容准确性：</strong>
                战术内容基于特定版本编写，可能随游戏平衡性调整而发生变化。
                我们尽力保持内容更新，但无法保证所有信息始终与最新游戏版本完全一致。
              </p>
              <p>
                <strong className="text-valorant-light">仅供参考：</strong>
                本站提供的战术建议仅供参考，实际游戏体验因个人水平、团队配合和对手策略而异。
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-valorant-dark/40 border border-gray-700/30 rounded-sm p-6 text-center">
            <h2 className="text-xl font-bold text-valorant-light mb-3">💬 反馈与贡献</h2>
            <p className="text-gray-300 leading-relaxed">
              如果你发现内容错误、有更好的战术建议，或想要参与内容维护，
              欢迎通过 GitHub Issues 提交反馈。
            </p>
            <p className="text-gray-500 text-sm mt-3">
              本网站使用 Next.js 构建，部署于 Vercel，内容托管在 GitHub。
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
