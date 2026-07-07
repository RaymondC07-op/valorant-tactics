import { getAgentBySlugStatic } from "@/lib/agent-data";
import RoleBadge from "@/components/shared/RoleBadge";

interface AgentPillProps {
  slug: string;
}

export default function AgentPill({ slug }: AgentPillProps) {
  const agent = getAgentBySlugStatic(slug);

  if (!agent) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-600/50 bg-gray-800/50 px-3 py-1.5 text-sm text-gray-400">
        {slug}
      </span>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-gray-600/30 bg-gray-800/40 px-3 py-1.5">
      <div className="w-6 h-6 rounded-full bg-valorant-dark/80 border border-gray-600/50 flex items-center justify-center text-xs font-bold text-valorant-light overflow-hidden">
        {agent.name[0]}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-valorant-light leading-tight">{agent.name}</span>
        <RoleBadge role={agent.role} roleZh={agent.roleZh} />
      </div>
    </div>
  );
}
