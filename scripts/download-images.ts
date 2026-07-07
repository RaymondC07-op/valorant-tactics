/**
 * 从 valorant-api.com 下载特工头像和地图缩略图
 * 用法: npx tsx scripts/download-images.ts
 */

import fs from "fs";
import path from "path";

const PUBLIC_DIR = path.join(process.cwd(), "public", "images");
const AGENTS_DIR = path.join(PUBLIC_DIR, "agents");
const MAPS_DIR = path.join(PUBLIC_DIR, "maps");

interface ApiAgent {
  uuid: string;
  displayName: string;
  developerName: string;
  displayIcon: string;
  isPlayableCharacter: boolean;
}

interface ApiMap {
  uuid: string;
  displayName: string;
  splash: string;
  listViewIcon: string;
  displayIcon?: string;
  coordinates?: string;
}

async function downloadFile(url: string, dest: string): Promise<boolean> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.log(`  [SKIP] HTTP ${res.status}: ${path.basename(dest)}`);
      return false;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buffer);
    console.log(`  [OK] ${path.basename(dest)} (${(buffer.length / 1024).toFixed(1)} KB)`);
    return true;
  } catch (err) {
    console.log(`  [FAIL] ${path.basename(dest)}: ${err}`);
    return false;
  }
}

async function downloadAgents() {
  console.log("\n=== 下载特工头像 ===\n");
  fs.mkdirSync(AGENTS_DIR, { recursive: true });

  const res = await fetch("https://valorant-api.com/v1/agents?language=zh-CN&isPlayableCharacter=true");
  const json = await res.json() as { data: ApiAgent[] };

  let count = 0;
  for (const agent of json.data) {
    if (!agent.displayIcon) continue;
    const slug = (agent.developerName || agent.displayName).toLowerCase().replace(/[\s\/]/g, "-");
    const dest = path.join(AGENTS_DIR, `${slug}.webp`);

    // Skip if already exists
    if (fs.existsSync(dest)) {
      console.log(`  [HAS] ${slug}.webp`);
      count++;
      continue;
    }

    const ok = await downloadFile(agent.displayIcon, dest);
    if (ok) count++;

    // Be polite — small delay between requests
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(`\n特工头像: ${count} 个\n`);
}

async function downloadMaps() {
  console.log("\n=== 下载地图缩略图 ===\n");
  fs.mkdirSync(MAPS_DIR, { recursive: true });

  const res = await fetch("https://valorant-api.com/v1/maps?language=zh-CN");
  const json = await res.json() as { data: ApiMap[] };

  let count = 0;
  for (const map of json.data) {
    // 只下载有坐标的真实地图（跳过练习场等）
    if (!map.coordinates && !map.splash) continue;

    const slug = map.displayName.toLowerCase().replace(/[\s\/]/g, "-");
    const imageUrl = map.splash || map.listViewIcon || map.displayIcon;
    if (!imageUrl) continue;

    const dest = path.join(MAPS_DIR, `${slug}.webp`);

    if (fs.existsSync(dest)) {
      console.log(`  [HAS] ${slug}.webp`);
      count++;
      continue;
    }

    const ok = await downloadFile(imageUrl, dest);
    if (ok) count++;

    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(`\n地图图片: ${count} 个\n`);
}

async function main() {
  console.log("无畏契约图片下载工具");
  console.log("数据来源: valorant-api.com (community API)\n");

  await downloadAgents();
  await downloadMaps();

  console.log("=== 全部完成 ===");
}

main().catch((err) => {
  console.error("下载失败:", err);
  process.exit(1);
});
