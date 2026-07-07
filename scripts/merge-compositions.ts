/**
 * 阵容数据重构脚本：合并 attack/defense → 统一 recommended 列表
 * 用法: npx tsx scripts/merge-compositions.ts
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const COMP_DIR = join(import.meta.dirname, "..", "content", "compositions");

interface OldEntry {
  name: string;
  agents: string[];
  rationale: string;
  difficulty: string;
  winCondition: string;
  tactics?: { coordination: string; strategy: string };
}

interface OldFormat {
  mapSlug: string;
  updatedAt: string;
  attack: {
    recommended: OldEntry[];
    alternativeAgents: string[];
  };
  defense: {
    recommended: OldEntry[];
  };
}

interface NewFormat {
  mapSlug: string;
  updatedAt: string;
  recommended: OldEntry[];
  alternativeAgents: string[];
}

function mergeComposition(filePath: string): boolean {
  const raw = readFileSync(filePath, "utf-8");
  const old: OldFormat = JSON.parse(raw);

  // Deduplicate by agent composition signature (sorted agent join)
  const seen = new Set<string>();
  const merged: OldEntry[] = [];

  const allEntries = [
    ...old.attack.recommended.map((e) => ({ ...e, _source: "attack" as const })),
    ...old.defense.recommended.map((e) => ({ ...e, _source: "defense" as const })),
  ];

  for (const entry of allEntries) {
    const sig = [...entry.agents].sort().join(",");
    const { _source, ...clean } = entry;

    if (seen.has(sig)) {
      // Already have this agent combo — keep the one with more detail (tactics)
      const existing = merged.find(
        (e) => [...e.agents].sort().join(",") === sig
      );
      if (existing && entry.tactics && !existing.tactics) {
        // Replace with the more detailed version
        const idx = merged.indexOf(existing);
        merged[idx] = clean;
      }
      continue;
    }

    seen.add(sig);
    merged.push(clean);
  }

  const result: NewFormat = {
    mapSlug: old.mapSlug,
    updatedAt: old.updatedAt,
    recommended: merged,
    alternativeAgents: old.attack.alternativeAgents || [],
  };

  writeFileSync(filePath, JSON.stringify(result, null, 2) + "\n", "utf-8");
  console.log(`  [OK] ${result.mapSlug}: ${old.attack.recommended.length}+${old.defense.recommended.length} → ${merged.length} unified`);
  return true;
}

function main() {
  console.log("🔄 阵容数据重构：attack/defense → unified recommended\n");

  const files = readdirSync(COMP_DIR).filter((f) => f.endsWith(".json"));

  for (const file of files) {
    try {
      mergeComposition(join(COMP_DIR, file));
    } catch (e) {
      console.error(`  [FAIL] ${file}:`, e);
    }
  }

  console.log(`\n✅ 完成！${files.length} 个文件已重构`);
}

main();
