// ============================================================
// 无畏契约战术手册 - TypeScript 类型定义
// ============================================================

export type Role = "duelist" | "initiator" | "controller" | "sentinel";
export type RoleZh = "决斗者" | "先锋" | "控场者" | "哨卫";
export type Difficulty = "初级" | "中级" | "高级";
export type Side = "attack" | "defense";
export type MapSlug = string;
export type AgentSlug = string;

// ---- 特工 ----
export interface Agent {
  slug: AgentSlug;
  name: string;
  nameEn: string;
  role: Role;
  roleZh: RoleZh;
  releaseDate: string;
  origin: string;
  abilities: string[];
  icon: string;
}

// ---- 地图 ----
export interface MapFrontmatter {
  slug: MapSlug;
  name: string;
  nameEn: string;
  releaseDate: string;
  releasePatch: string;
  inRotation: boolean;
  sites: string[];
  difficulty: Difficulty;
  playstyle: string;
  features: string[];
  minimapImage: string;
  calloutImage?: string;
  updatedAt: string;
}

export interface MapWithContent extends MapFrontmatter {
  content: string; // raw MDX body
  sections?: TacticChapter[]; // parsed H2/H3 structure
}

// ---- 阵容 ----
export interface CompositionEntry {
  name: string;
  agents: AgentSlug[];
  rationale: string;
  difficulty: Difficulty;
  winCondition: string;
  tactics?: {
    coordination: string;   // 5人技能配合，局部协同
    strategy: string;       // 整体控图/转点/经济策略
  };
}

// Parsed MDX chapter structure
export interface TacticChapter {
  id: string;
  title: string;
  content: string;
  level: 2 | 3;
  subsections: TacticChapter[];
}

export interface MapComposition {
  mapSlug: MapSlug;
  updatedAt: string;
  recommended: CompositionEntry[];
  alternativeAgents: AgentSlug[];
}

// ---- 导航 ----
export interface NavItem {
  label: string;
  href: string;
}
