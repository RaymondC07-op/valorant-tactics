import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "无畏契约战术手册 - Valorant Tactics",
    template: "%s - 无畏契约战术手册",
  },
  description: "掌握所有无畏契约地图的攻防战术与最佳阵容搭配。专业阵容推荐、报点点位、进攻防守策略。",
  keywords: ["无畏契约", "Valorant", "战术", "阵容", "地图攻略", "报点", "特工"],
  authors: [{ name: "社区玩家" }],
  openGraph: {
    title: "无畏契约战术手册",
    description: "掌握所有无畏契约地图的攻防战术与最佳阵容搭配",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-valorant-dark text-valorant-light">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
