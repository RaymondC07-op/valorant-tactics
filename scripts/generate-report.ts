/**
 * 生成「网站开发项目总结」Word 文档
 * 用法: npx tsx scripts/generate-report.ts
 */

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  WidthType,
  BorderStyle,
  LevelFormat,
  ShadingType,
} from "docx";
import { writeFileSync } from "fs";
import { join } from "path";

async function main() {
  const doc = new Document({
    title: "无畏契约战术手册 — 网站开发项目总结",
    styles: {
      default: {
        document: {
          run: { font: "Microsoft YaHei", size: 22 },
        },
      },
    },
    sections: [
      {
        children: [
          // ===== 标题 =====
          new Paragraph({
            text: "无畏契约战术手册 — 网站开发项目总结",
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({ text: "AI Agent 全流程驱动的中文 Valorant 战术知识库", color: "666666", size: 24 }),
            ],
          }),

          // ===== 1. 项目概述 =====
          heading("一、项目概述"),
          para("《无畏契约战术手册》是一个面向中国 Valorant 玩家的中文战术知识库网站。" +
            "当前中文社区缺乏结构化的战术资料，玩家只能从零散的视频、论坛帖子和英文资源中自行整理。" +
            "本网站将 VCT 职业比赛战术、报点点位、阵容搭配整合为系统化中文文字攻略，支持按地图浏览、按章节展开阅读。"),

          // ===== 2. 技术栈 =====
          heading("二、技术栈"),
          techTable(),

          // ===== 3. AI Agent 开发流程 =====
          heading("三、AI Agent 嵌入开发流程"),
          para("本次开发全流程由 AI Agent 执行，覆盖传统开发团队的完整职能："),
          agentTable(),

          para("Agent 工作模式：需求分析 → 提交计划审批 → 分阶段执行 → 构建验证 → 迭代修复。全程 12 次提交，3 轮大型重构。",
            { spacing: { before: 200 } }),

          // ===== 4. 完成模块 =====
          heading("四、已完成模块"),
          moduleList(),

          // ===== 5. 内容规模 =====
          heading("五、内容规模"),
          contentTable(),

          // ===== 6. 性能指标 =====
          heading("六、性能指标"),
          perfTable(),

          // ===== 7. 上线状态 =====
          heading("七、上线状态"),
          para("• Vercel 部署：valorant-tactics.vercel.app（海外可访问）"),
          para("• Cloudflare Pages：配置已就绪，连接 GitHub 后即可实现国内直连访问"),
          para("• GitHub 仓库：https://github.com/RaymondC07-op/valorant-tactics"),

          // ===== 8. 效率提升 =====
          heading("八、AI Agent vs 传统开发效率对比"),
          efficiencyTable(),

          // ===== 9. 图片优化 =====
          heading("九、关键性能优化"),
          para("图片优化（PNG → WebP）：43.2MB → 1.6MB，减少 97%。地图背景图单张最大从 6.9MB 降至 110KB，" +
            "特工头像从 1.5MB 降至 252KB。所有资源自托管，零外部依赖（无 Google Fonts、无运行时 API 调用）。"),
          para("JavaScript 优化：react-markdown（314KB）通过 next/dynamic 异步加载，首屏 HTML 预渲染完整内容，" +
            "用户看到页面时即可阅读全部战术，交互功能随后激活。首页 JS 总量 621KB（gzip 后约 200KB）。"),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = join(import.meta.dirname, "..", "网站开发项目总结.docx");
  writeFileSync(outputPath, buffer);
  console.log(`✅ 已生成: ${outputPath}`);
}

// ---- helpers ----

function heading(text: string): Paragraph {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 160 },
  });
}

function para(text: string, opts?: { spacing?: { before?: number; after?: number } }): Paragraph {
  return new Paragraph({
    spacing: opts?.spacing ?? { after: 120 },
    children: [new TextRun({ text, size: 22 })],
  });
}

function cell(text: string, opts?: { bold?: boolean; shading?: string }): TableCell {
  return new TableCell({
    shading: opts?.shading ? { type: ShadingType.SOLID, color: opts.shading } : undefined,
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text, bold: opts?.bold, size: 20 })],
      }),
    ],
  });
}

function headerCell(text: string): TableCell {
  return cell(text, { bold: true, shading: "FF4655" });
}

function techTable(): Table {
  const rows = [
    ["框架", "Next.js 16 (Turbopack)"],
    ["渲染模式", "静态导出 (output: 'export')"],
    ["样式方案", "Tailwind CSS v4 + 自定义战术 HUD 主题"],
    ["内容格式", "MDX (地图攻略) + JSON (阵容/特工数据)"],
    ["Markdown 渲染", "react-markdown + remark-gfm + rehype-raw"],
    ["图片处理", "Sharp 批量转换 PNG → WebP"],
    ["字体方案", "Geist 自托管 woff2（不依赖 Google Fonts）"],
    ["部署平台", "Vercel + Cloudflare Pages"],
  ];

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      ...rows.map(([label, value]) =>
        new TableRow({
          children: [
            cell(label, { bold: true, shading: "1A1A2E" }),
            cell(value),
          ],
        })
      ),
    ],
  });
}

function agentTable(): Table {
  const roles = [
    ["前端开发", "全站 15+ 组件编写，5 个页面路由，响应式布局"],
    ["后端/数据层", "MDX 解析器、JSON 内容加载、TypeScript 类型系统设计"],
    ["内容创作", "62 套阵容战术文案（每套含协同配合 + 整体策略，约 200-300 字中文）"],
    ["UI 设计", "战术 HUD 视觉风格（角标装饰、扫描线动画、中文排版系统）"],
    ["图片工程", "12 张报点图爬取（Liquipedia）+ 43MB → 1.6MB WebP 压缩"],
    ["性能优化", "动态导入、图片格式转换、静态资源自托管、代码分割"],
    ["运维部署", "Vercel 自动部署、Cloudflare Pages 配置"],
  ];

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          headerCell("角色"),
          headerCell("AI Agent 执行的任务"),
        ],
      }),
      ...roles.map(([role, task]) =>
        new TableRow({
          children: [
            cell(role, { bold: true, shading: "1A1A2E" }),
            cell(task),
          ],
        })
      ),
    ],
  });
}

function moduleList(): Paragraph {
  const items = [
    "首页 — Hero 战术标语 + 轮换地图池 + 快捷导航",
    "地图攻略 (/maps) — 13 张地图卡片列表，筛选轮换/非轮换",
    "地图详情 (/maps/[slug]) — 手风琴折叠面板（地图概览/报点/进攻战术/防守战术），滚动目录侧边栏，报点标注图，阵容推荐卡片",
    "阵容推荐 (/compositions) — 13 张地图统一阵容列表（攻防共用）",
    "特工图鉴 (/agents) — 29 位特工按角色筛选，头像+技能信息",
    "关于 (/about) — 站点介绍",
    "404 / Error — 中文错误页面与错误边界",
    "自动生成 sitemap.xml",
  ];

  return new Paragraph({
    spacing: { after: 120 },
    children: items.flatMap((item, i) => [
      new TextRun({ text: `  ${i + 1}. ${item}`, size: 22, break: 1 }),
    ]),
  });
}

function contentTable(): Table {
  const data = [
    ["地图攻略 (MDX)", "13 张，每张含 2-6 个战术章节"],
    ["阵容推荐", "62 套，60 套含详细协同配合 + 战术安排"],
    ["特工数据", "29 位，含角色、技能、国籍等完整信息"],
    ["报点图", "12 张（来源：Liquipedia 社区）"],
    ["中文总字数", "约 110KB（约 5.5 万汉字）"],
  ];

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({ children: [headerCell("内容类型"), headerCell("规模")] }),
      ...data.map(([type, scale]) =>
        new TableRow({
          children: [cell(type, { bold: true, shading: "1A1A2E" }), cell(scale)],
        })
      ),
    ],
  });
}

function perfTable(): Table {
  const data = [
    ["构建总大小", "6.8 MB（含全部静态资源）"],
    ["首页 JS", "621 KB (gzip 后约 200 KB)"],
    ["图片总大小", "1.6 MB（从 43MB PNG 压缩为 WebP）"],
    ["外部依赖", "0（无 Google Fonts、无运行时 API 调用）"],
    ["首屏加载", "HTML 预渲染战术内容，交互 JS 异步加载"],
    ["构建时间", "约 6s（编译 + 静态生成 22 条路由）"],
    ["字体加载", "自托管 woff2，196KB，不依赖外部 CDN"],
  ];

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({ children: [headerCell("指标"), headerCell("数值")] }),
      ...data.map(([label, value]) =>
        new TableRow({
          children: [cell(label, { bold: true, shading: "1A1A2E" }), cell(value)],
        })
      ),
    ],
  });
}

function efficiencyTable(): Table {
  const data = [
    ["62 套阵容文案编写", "2-3 天", "约 30 分钟"],
    ["12 张报点图收集处理", "1-2 天", "约 15 分钟"],
    ["UI 设计 + 实现", "3-5 天", "约 2 小时"],
    ["全站性能优化", "1-2 天", "约 30 分钟"],
    ["上线前审计修复（23 项）", "1 天", "约 1 小时"],
    ["部署 + CI/CD 配置", "0.5 天", "约 15 分钟"],
  ];

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          headerCell("环节"),
          headerCell("传统方式"),
          headerCell("AI Agent 方式"),
        ],
      }),
      ...data.map(([task, old, ai]) =>
        new TableRow({
          children: [
            cell(task, { bold: true, shading: "1A1A2E" }),
            cell(old),
            cell(ai),
          ],
        })
      ),
    ],
  });
}

main().catch((e) => {
  console.error("生成失败:", e);
  process.exit(1);
});
