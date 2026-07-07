"use client";

import { useState } from "react";
import { getAgentBySlugStatic } from "@/lib/agent-data";
import RoleBadge from "@/components/shared/RoleBadge";

interface AgentPillProps {
  slug: string;
}

export default function AgentPill({ slug }: AgentPillProps) {
  const agent = getAgentBySlugStatic(slug);
  const [imgError, setImgError] = useState(false);

  if (!agent) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-sm border border-gray-600/50 bg-gray-800/50 px-3 py-1.5 text-sm text-gray-400">
        {slug}
      </span>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-sm border border-gray-600/20 bg-gray-800/30 px-2.5 py-1.5">
      {/* Agent avatar */}
      <div className="w-7 h-7 rounded-sm bg-valorant-dark/80 border border-gray-600/30 flex items-center justify-center overflow-hidden shrink-0">
        {imgError ? (
          <span className="text-xs font-bold text-valorant-light">{agent.name[0]}</span>
        ) : (
          <img
            src={agent.icon}
            alt={agent.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-semibold text-valorant-light">{agent.name}</span>
        <RoleBadge role={agent.role} roleZh={agent.roleZh} />
      </div>
    </div>
  );
}
