import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-valorant-dark via-valorant-dark/95 to-valorant-dark py-20 sm:py-28">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-valorant-red/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-valorant-red/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-valorant-light">
            无畏契约
            <span className="text-valorant-red block mt-1">战术手册</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            掌握所有地图的攻防战术与最佳阵容搭配。
            基于 VCT 职业比赛与社区攻略整理，助你快速提升游戏理解。
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/maps"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-valorant-red text-white font-semibold hover:bg-valorant-red/90 transition-colors shadow-lg shadow-valorant-red/25"
            >
              查看地图攻略
            </Link>
            <Link
              href="/compositions"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-gray-600/50 text-gray-300 font-semibold hover:border-valorant-red/50 hover:text-valorant-light transition-colors"
            >
              浏览阵容推荐
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
