/**
 * 无畏契约新内容检测脚本
 *
 * 调用 valorant-api.com 获取最新英雄/地图数据，
 * 与本地 content/ 目录对比，检测新增内容。
 *
 * 用法: npx tsx scripts/check-new-content.ts
 * 输出: GitHub Actions 兼容的 output 格式
 */

import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

// ---- API 调用 ----

interface ValorantAgent {
  uuid: string;
  displayName: string;
  developerName: string;
  role?: { displayName: string };
  isPlayableCharacter: boolean;
}

interface ValorantMap {
  uuid: string;
  displayName: string;
  coordinates?: string;
  mapUrl?: string;
}

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
  return res.json() as Promise<T>;
}

// ---- 获取本地数据 ----

function getLocalAgentSlugs(): Set<string> {
  const filePath = path.join(CONTENT_DIR, "agents", "agents.json");
  if (!fs.existsSync(filePath)) return new Set();
  const agents = JSON.parse(fs.readFileSync(filePath, "utf-8")) as { slug: string }[];
  return new Set(agents.map((a) => a.slug));
}

function getLocalMapSlugs(): Set<string> {
  const mapsDir = path.join(CONTENT_DIR, "maps");
  if (!fs.existsSync(mapsDir)) return new Set();
  const files = fs.readdirSync(mapsDir).filter((f) => f.endsWith(".mdx"));
  return new Set(files.map((f) => f.replace(".mdx", "")));
}

// ---- 主逻辑 ----

async function main() {
  console.log("[check-new-content] 开始检测...\n");

  const localAgents = getLocalAgentSlugs();
  const localMaps = getLocalMapSlugs();

  console.log(`  本地: ${localAgents.size} 特工, ${localMaps.size} 地图\n`);

  let newAgents: string[] = [];
  let newMaps: string[] = [];

  try {
    const agentRes = await fetchJSON<{ data: ValorantAgent[] }>(
      "https://valorant-api.com/v1/agents?language=zh-CN&isPlayableCharacter=true"
    );

    for (const a of agentRes.data) {
      // 用 developerName 或小写 displayName 作为 slug
      const slug = (a.developerName || a.displayName).toLowerCase().replace(/[\s\/]/g, "-");
      if (!localAgents.has(slug)) {
        newAgents.push(
          `- **${a.displayName}** (${a.role?.displayName || "未知角色"}) — \`${slug}\``
        );
      }
    }
  } catch (err) {
    console.warn(`  [WARN] 无法获取特工数据: ${err}`);
  }

  try {
    const mapRes = await fetchJSON<{ data: ValorantMap[] }>(
      "https://valorant-api.com/v1/maps?language=zh-CN"
    );

    for (const m of mapRes.data) {
      if (!m.coordinates) continue; // 跳过练习场等非正式地图
      const slug = m.displayName.toLowerCase().replace(/[\s\/]/g, "-");
      if (!localMaps.has(slug)) {
        newMaps.push(
          `- **${m.displayName}** — \`${slug}\``
        );
      }
    }
  } catch (err) {
    console.warn(`  [WARN] 无法获取地图数据: ${err}`);
  }

  // ---- 输出 ----

  console.log("=== 检测报告 ===\n");

  if (newAgents.length > 0) {
    console.log(`🆕 新特工 (${newAgents.length}):`);
    newAgents.forEach((a) => console.log(a));
    console.log();
  } else {
    console.log("✅ 无新特工\n");
  }

  if (newMaps.length > 0) {
    console.log(`🆕 新地图 (${newMaps.length}):`);
    newMaps.forEach((m) => console.log(m));
    console.log();
  } else {
    console.log("✅ 无新地图\n");
  }

  // GitHub Actions 输出
  if (process.env.GITHUB_OUTPUT) {
    const outputFile = process.env.GITHUB_OUTPUT;
    const newAgentsStr = newAgents.join("\\n");
    const newMapsStr = newMaps.join("\\n");
    const hasNew = newAgents.length > 0 || newMaps.length > 0;

    fs.appendFileSync(outputFile, `new_agents=${newAgentsStr}\n`);
    fs.appendFileSync(outputFile, `new_maps=${newMapsStr}\n`);
    fs.appendFileSync(outputFile, `has_new=${hasNew}\n`);
  }

  if (newAgents.length > 0 || newMaps.length > 0) {
    console.log("⚠️ 发现新内容，请更新 content/ 目录并重新部署。");
    process.exit(0);
  } else {
    console.log("👍 内容已是最新。");
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("检测失败:", err);
  process.exit(1);
});
