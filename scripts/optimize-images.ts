/**
 * 图片优化脚本：PNG → WebP 转换 + 压缩
 *
 * 处理三类图片：
 *   地图背景图 (minimap)   → max 1200px 宽, quality 80
 *   报点图     (callouts)  → 保持原尺寸,   quality 85
 *   特工头像   (agents)    → 128×128,      quality 85
 *
 * 用法: npx tsx scripts/optimize-images.ts
 */

import sharp from "sharp";
import { readdir, stat, unlink } from "fs/promises";
import { join, extname } from "path";

const PUBLIC = join(import.meta.dirname, "..", "public", "images");

interface Job {
  input: string;
  output: string;
  options: { width?: number; height?: number; quality: number };
  label: string;
}

async function getPngFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".png"))
    .map((e) => join(dir, e.name));
}

async function processJob(job: Job): Promise<{ file: string; before: number; after: number }> {
  const before = (await stat(job.input)).size;
  let pipeline = sharp(job.input);

  if (job.options.width || job.options.height) {
    pipeline = pipeline.resize(job.options.width ?? undefined, job.options.height ?? undefined, {
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  await pipeline.webp({ quality: job.options.quality }).toFile(job.output);
  const after = (await stat(job.output)).size;
  const pct = Math.round((1 - after / before) * 100);
  console.log(`  ${job.label.padEnd(24)} ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB  (${pct}%↓)`);
  return { file: job.input, before, after };
}

async function main() {
  console.log("🖼  图片优化开始...\n");

  const mapDir = join(PUBLIC, "maps");
  const agentDir = join(PUBLIC, "agents");

  const mapFiles = await getPngFiles(mapDir);
  const agentFiles = await getPngFiles(agentDir);

  // Separate minimaps from callouts by filename pattern
  const minimaps = mapFiles.filter((f) => !f.includes("-callouts"));
  const callouts = mapFiles.filter((f) => f.includes("-callouts"));

  console.log(`📁 地图背景: ${minimaps.length} 张`);
  console.log(`📁 报点图:   ${callouts.length} 张`);
  console.log(`📁 特工头像: ${agentFiles.length} 张\n`);

  const jobs: Job[] = [
    ...minimaps.map((f) => ({
      input: f,
      output: f.replace(/\.png$/i, ".webp"),
      options: { width: 1200, quality: 80 },
      label: f.split(/[\\/]/).pop()!,
    })),
    ...callouts.map((f) => ({
      input: f,
      output: f.replace(/\.png$/i, ".webp"),
      options: { quality: 85 },
      label: f.split(/[\\/]/).pop()!,
    })),
    ...agentFiles.map((f) => ({
      input: f,
      output: f.replace(/\.png$/i, ".webp"),
      options: { width: 128, height: 128, quality: 85 },
      label: f.split(/[\\/]/).pop()!,
    })),
  ];

  let totalBefore = 0;
  let totalAfter = 0;

  for (const job of jobs) {
    const result = await processJob(job);
    totalBefore += result.before;
    totalAfter += result.after;
  }

  const totalPct = Math.round((1 - totalAfter / totalBefore) * 100);
  console.log(`\n📊 总计: ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB  (${totalPct}%↓)`);
  console.log("✅ 图片优化完成！\n");
  console.log("💡 运行 npx tsx scripts/update-image-refs.ts 更新所有 .png → .webp 引用");
  console.log("💡 然后手动删除旧 .png 文件或运行清理脚本\n");
}

main().catch((e) => {
  console.error("❌ 图片优化失败:", e);
  process.exit(1);
});
