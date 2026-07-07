/**
 * 从 Liquipedia 下载 Valorant 报点图（标注版顶视图）
 * 用法: npx tsx scripts/download-callouts.ts
 */

import fs from "fs";
import path from "path";

const MAPS_DIR = path.join(process.cwd(), "public", "images", "maps");

// Map name on Liquipedia (may differ from our slug)
const MAP_LIQUIPEDIA_NAMES: Record<string, string> = {
  ascent: "Ascent",
  bind: "Bind",
  haven: "Haven",
  split: "Split",
  lotus: "Lotus",
  sunset: "Sunset",
  breeze: "Breeze",
  icebox: "Icebox",
  pearl: "Pearl",
  fracture: "Fracture",
  abyss: "Abyss",
  corrode: "Corrode",
  summit: "Summit",
};

async function fetchImageUrl(mapLiquipediaName: string): Promise<string | null> {
  const url = `https://liquipedia.net/valorant/${mapLiquipediaName}`;
  console.log(`  Fetching: ${url}`);

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.log(`  [SKIP] HTTP ${res.status}`);
      return null;
    }
    const html = await res.text();

    // Find top-down view image URL
    // Pattern: https://liquipedia.net/commons/images/thumb/.../VALORANT_{Name}_Top.png/...
    const match = html.match(
      /https:\/\/liquipedia\.net\/commons\/images\/thumb\/[^"]+?(VALORANT[^"]*?_Top\.(?:png|webp))[^"]*/i
    );
    if (match) {
      // Convert to full-resolution URL by removing /thumb/ and /{size}px- prefix
      let fullUrl = match[0];
      // Remove /thumb/ from path
      fullUrl = fullUrl.replace("/thumb/", "/");
      // Remove the size suffix like /675px-VALORANT_Ascent_2022_Top.png
      fullUrl = fullUrl.replace(/\/\d+px-([^/]+)$/, "/$1");
      console.log(`  Found: ${match[1]}`);
      return fullUrl;
    }

    // Try alternative pattern - some maps might use different naming
    const altMatch = html.match(
      /https:\/\/liquipedia\.net\/commons\/images\/[^"]+?(VALORANT[^"]*?[Tt]op[^"]*?\.(?:png|webp))[^"]*/i
    );
    if (altMatch) {
      console.log(`  Found (alt): ${altMatch[1]}`);
      return altMatch[0];
    }

    console.log("  [NOT FOUND] No top-down image on page");
    return null;
  } catch (err) {
    console.log(`  [ERROR] ${err}`);
    return null;
  }
}

async function downloadFile(url: string, dest: string): Promise<boolean> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.log(`    [SKIP] HTTP ${res.status}`);
      return false;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buffer);
    console.log(`    [OK] ${path.basename(dest)} (${(buffer.length / 1024).toFixed(1)} KB)`);
    return true;
  } catch (err) {
    console.log(`    [FAIL] ${err}`);
    return false;
  }
}

async function main() {
  console.log("=== 下载 Liquipedia 报点图 ===\n");
  fs.mkdirSync(MAPS_DIR, { recursive: true });

  const slugs = Object.keys(MAP_LIQUIPEDIA_NAMES);
  let success = 0;
  let skipped = 0;

  for (const slug of slugs) {
    const dest = path.join(MAPS_DIR, `${slug}-callouts.png`);
    if (fs.existsSync(dest)) {
      console.log(`[HAS] ${slug}-callouts.png`);
      skipped++;
      continue;
    }

    const liquipediaName = MAP_LIQUIPEDIA_NAMES[slug];
    console.log(`\n--- ${slug} (${liquipediaName}) ---`);
    const imageUrl = await fetchImageUrl(liquipediaName);

    if (imageUrl) {
      const ok = await downloadFile(imageUrl, dest);
      if (ok) success++;
    }

    // Be polite — delay between requests
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log(`\n=== 完成: ${success} 下载, ${skipped} 已存在, ${slugs.length - success - skipped} 未获取 ===`);
}

main().catch((err) => {
  console.error("下载失败:", err);
  process.exit(1);
});
