import "server-only";
import fs from "fs";
import path from "path";
import type {
  MapFrontmatter,
  MapWithContent,
  MapComposition,
  Agent,
  MapSlug,
  AgentSlug,
} from "./types";
import { MAP_ORDER } from "./constants";

const CONTENT_DIR = path.join(process.cwd(), "content");

// ---- 通用工具 ----

function readJSON<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

function readDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir);
}

function parseFrontmatter(raw: string): {
  frontmatter: Record<string, unknown>;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, content: raw };
  }
  const yamlBlock = match[1];
  const body = match[2];

  // Simple YAML parser for flat key: value pairs and list items
  const frontmatter: Record<string, unknown> = {};
  const lines = yamlBlock.split("\n");
  let currentKey = "";
  for (const line of lines) {
    // YAML list item:   - "value" or - 'value' or - value
    const listMatch = line.match(/^\s*-\s+["']?(.+?)["']?\s*$/);
    if (listMatch) {
      if (currentKey) {
        const existing = frontmatter[currentKey];
        if (Array.isArray(existing)) {
          existing.push(listMatch[1]);
        } else {
          frontmatter[currentKey] = [listMatch[1]];
        }
      }
      continue;
    }

    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    currentKey = key;
    let rawValue = line.slice(colonIdx + 1).trim();

    // Skip if value is empty (list items follow on next lines)
    if (rawValue === "") {
      frontmatter[key] = [];
      continue;
    }

    // Remove quotes
    if (
      (rawValue.startsWith('"') && rawValue.endsWith('"')) ||
      (rawValue.startsWith("'") && rawValue.endsWith("'"))
    ) {
      rawValue = rawValue.slice(1, -1);
    }

    // Parse arrays: [a, b, c]
    if (rawValue.startsWith("[") && rawValue.endsWith("]")) {
      frontmatter[key] = rawValue
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""));
    } else if (rawValue === "true") {
      frontmatter[key] = true;
    } else if (rawValue === "false") {
      frontmatter[key] = false;
    } else {
      frontmatter[key] = rawValue;
    }
  }

  return { frontmatter, content: body };
}

// ---- 特工 ----

let _agentsCache: Agent[] | null = null;

export function getAllAgents(): Agent[] {
  if (_agentsCache) return _agentsCache;
  const filePath = path.join(CONTENT_DIR, "agents", "agents.json");
  if (!fs.existsSync(filePath)) return [];
  _agentsCache = readJSON<Agent[]>(filePath);
  return _agentsCache;
}

export function getAgentBySlug(slug: AgentSlug): Agent | undefined {
  return getAllAgents().find((a) => a.slug === slug);
}

export function getAgentsByRole(role: string): Agent[] {
  return getAllAgents().filter((a) => a.role === role);
}

// ---- 地图 ----

export function getAllMapSlugs(): string[] {
  const mapsDir = path.join(CONTENT_DIR, "maps");
  const files = readDir(mapsDir).filter((f) => f.endsWith(".mdx"));
  return files.map((f) => f.replace(".mdx", ""));
}

export function getAllMaps(): MapFrontmatter[] {
  const slugs = getAllMapSlugs();
  const maps = slugs
    .map((slug) => getMapBySlug(slug))
    .filter((m): m is MapFrontmatter => m !== undefined);

  // Sort by MAP_ORDER, then alphabetically
  return maps.sort((a, b) => {
    const ia = MAP_ORDER.indexOf(a.slug);
    const ib = MAP_ORDER.indexOf(b.slug);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return a.slug.localeCompare(b.slug);
  });
}

export function getMapBySlug(slug: MapSlug): MapFrontmatter | undefined {
  const filePath = path.join(CONTENT_DIR, "maps", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { frontmatter } = parseFrontmatter(raw);
  return frontmatter as unknown as MapFrontmatter;
}

export function getMapWithContent(slug: MapSlug): MapWithContent | undefined {
  const filePath = path.join(CONTENT_DIR, "maps", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { frontmatter, content } = parseFrontmatter(raw);
  return {
    ...(frontmatter as unknown as MapFrontmatter),
    content,
  };
}

export function getMapsInRotation(): MapFrontmatter[] {
  return getAllMaps().filter((m) => m.inRotation);
}

// ---- 阵容 ----

export function getComposition(mapSlug: MapSlug): MapComposition | undefined {
  const filePath = path.join(
    CONTENT_DIR,
    "compositions",
    `${mapSlug}.json`
  );
  if (!fs.existsSync(filePath)) return undefined;
  return readJSON<MapComposition>(filePath);
}

export function getAllCompositions(): MapComposition[] {
  const files = readDir(path.join(CONTENT_DIR, "compositions")).filter((f) =>
    f.endsWith(".json")
  );
  return files
    .map((f) => getComposition(f.replace(".json", "")))
    .filter((c): c is MapComposition => c !== undefined);
}
