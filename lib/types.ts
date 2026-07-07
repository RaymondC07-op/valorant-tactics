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
}

// ---- 阵容 ----
export interface CompositionEntry {
  name: string;
  agents: AgentSlug[];
  rationale: string;
  difficulty: Difficulty;
  winCondition: string;
}

export interface MapComposition {
  mapSlug: MapSlug;
  updatedAt: string;
  attack: {
    recommended: CompositionEntry[];
    alternativeAgents: AgentSlug[];
  };
  defense: {
    recommended: CompositionEntry[];
  };
}

// ---- 导航 ----
export interface NavItem {
  label: string;
  href: string;
}
