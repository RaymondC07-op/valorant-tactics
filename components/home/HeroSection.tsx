import Link from "next/link";
import { getMapsInRotation } from "@/lib/content";

export default function HeroSection() {
  const rotationCount = getMapsInRotation().length;
  return (
    <section className="relative overflow-hidden bg-valorant-dark py-24 sm:py-32">
      {/* Tactical grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,70,85,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,70,85,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 50% at 50% 40%, black 40%, transparent 70%)",
        }}
      />

      {/* Scan line */}
      <div className="scan-line" />

      {/* Accent blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-valorant-red/3 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-1/2 w-[400px] h-[400px] bg-valorant-red/3 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      {/* Diagonal accent bar */}
      <div className="absolute top-0 left-0 w-1 h-32 bg-gradient-to-b from-valorant-red/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Tactical eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6 animate-fade-up">
            <span className="w-6 h-px bg-valorant-red/60" />
            <span className="text-xs font-medium text-valorant-red tracking-[0.2em] uppercase">
              Tactical Field Manual
            </span>
            <span className="w-6 h-px bg-valorant-red/60" />
          </div>

          {/* Main heading */}
          <h1 className="animate-fade-up animate-fade-up-delay-1">
            <span className="block text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-valorant-light leading-tight">
              无畏契约
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl font-black text-valorant-red tracking-tighter mt-2 leading-tight">
              战术手册
            </span>
          </h1>

          {/* Description */}
          <p className="animate-fade-up animate-fade-up-delay-2 mt-8 text-lg sm:text-xl text-gray-400 max-w-xl mx-auto leading-relaxed">
            基于 VCT 职业比赛与社区攻略整理的战术知识库。
            <br />
            掌握每张地图的攻防阵容、报点点位和战术策略。
          </p>

          {/* CTAs */}
          <div className="animate-fade-up animate-fade-up-delay-3 mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/maps"
              className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-sm bg-valorant-red text-white font-bold text-sm tracking-wider overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(255,70,85,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                进入地图攻略
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-200" />
            </Link>
            <Link
              href="/compositions"
              className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-sm border border-gray-600/40 text-gray-300 font-bold text-sm tracking-wider hover:border-valorant-red/60 hover:text-valorant-light transition-all"
            >
              <span className="relative z-10 flex items-center gap-2">
                浏览阵容推荐
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
          </div>

          {/* Stats row */}
          <div className="animate-fade-up animate-fade-up-delay-3 mt-14 flex justify-center gap-8 sm:gap-12">
            {[
              { value: "13", label: "地图攻略" },
              { value: "29", label: "特工图鉴" },
              { value: String(rotationCount), label: "轮换地图" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-valorant-light tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 mt-1 tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom diagonal cut */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-valorant-dark/30 to-transparent pointer-events-none" />
    </section>
  );
}
