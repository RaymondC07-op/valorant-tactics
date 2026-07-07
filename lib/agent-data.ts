/**
 * Client-safe agent data.
 * Uses direct JSON import (no fs) so it works in both server and client components.
 */
import agentsData from "@/content/agents/agents.json";
import type { Agent, AgentSlug, Role } from "./types";

const agents: Agent[] = agentsData as Agent[];

const agentMap = new Map<string, Agent>();
agents.forEach((a) => agentMap.set(a.slug, a));

export function getAllAgentsStatic(): Agent[] {
  return agents;
}

export function getAgentBySlugStatic(slug: AgentSlug): Agent | undefined {
  return agentMap.get(slug);
}

export function getAgentsByRoleStatic(role: string): Agent[] {
  return agents.filter((a) => a.role === role);
}

export { type Agent, type AgentSlug, type Role };
