import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import RotationStatus from "@/components/home/RotationStatus";
import QuickNav from "@/components/home/QuickNav";

export const metadata: Metadata = {
  title: "专业地图攻略与阵容推荐",
  description: "无畏契约束手职业战术手册 — 覆盖全部13张地图的进攻防守战术、报点点位、阵容搭配。每张地图都有详细的战术攻略和阵容推荐。",
  openGraph: {
    title: "无畏契约战术手册 — 专业地图攻略与阵容推荐",
    description: "覆盖全部13张地图的进攻防守战术、报点点位、阵容搭配。",
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "无畏契约战术手册",
    description: "覆盖全部13张地图的进攻防守战术、报点点位、阵容搭配。",
  },
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <RotationStatus />
      <QuickNav />
    </main>
  );
}
