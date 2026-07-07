import type { NavItem } from "./types";

// ---- 角色中文名 ----
export const ROLE_NAMES: Record<string, string> = {
  duelist: "决斗者",
  initiator: "先锋",
  controller: "控场者",
  sentinel: "哨卫",
};

// ---- 角色颜色 ----
export const ROLE_COLORS: Record<string, string> = {
  duelist: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  initiator: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  controller: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  sentinel: "bg-green-500/20 text-green-400 border-green-500/30",
};

export const ROLE_ICON_COLORS: Record<string, string> = {
  duelist: "#F97316",
  initiator: "#06B6D4",
  controller: "#A855F7",
  sentinel: "#22C55E",
};

// ---- 难度标签颜色 ----
export const DIFFICULTY_COLORS: Record<string, string> = {
  "初级": "bg-green-500/20 text-green-400 border-green-500/30",
  "中级": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "高级": "bg-red-500/20 text-red-400 border-red-500/30",
};

// ---- 导航项 ----
export const NAV_ITEMS: NavItem[] = [
  { label: "首页", href: "/" },
  { label: "地图攻略", href: "/maps" },
  { label: "阵容推荐", href: "/compositions" },
  { label: "特工图鉴", href: "/agents" },
];

// ---- 站点信息 ----
export const SITE_NAME = "无畏契约战术手册";
export const SITE_DESCRIPTION = "掌握所有无畏契约地图的攻防战术与最佳阵容搭配";
export const SITE_URL = "https://valorant-tactics.vercel.app";

// ---- 地图排序（推荐顺序） ----
export const MAP_ORDER: string[] = [
  "ascent",
  "haven",
  "bind",
  "split",
  "lotus",
  "sunset",
  "breeze",
  "icebox",
  "pearl",
  "fracture",
  "abyss",
  "corrode",
  "summit",
];
