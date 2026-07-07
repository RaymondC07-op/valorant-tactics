import type { Metadata } from "next";
import { getAllAgents } from "@/lib/content";
import type { Agent, Role } from "@/lib/types";
import { ROLE_NAMES } from "@/lib/constants";
import RoleBadge from "@/components/shared/RoleBadge";
import AgentGridClient from "./AgentGridClient";

export const metadata: Metadata = {
  title: "特工图鉴 - 无畏契约战术手册",
  description: "浏览全部无畏契约特工信息：决斗者、先锋、控场者、哨卫，含技能和定位说明。",
};

export default function AgentsPage() {
  const allAgents = getAllAgents();
  const roles = new Set(allAgents.map((a) => a.role));

  // Group by role
  const byRole: Record<string, Agent[]> = {};
  for (const role of roles) {
    byRole[role] = allAgents.filter((a) => a.role === role);
  }

  return (
    <main className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-valorant-light mb-3">
            特工图鉴
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            了解全部 {allAgents.length} 位无畏契约特工的技能、角色定位和来源地区。
          </p>
        </div>

        <AgentGridClient initialAgents={allAgents} />
      </div>
    </main>
  );
}
