"use client";

import { useState } from "react";
import type { Agent, Role } from "@/lib/types";
import { ROLE_NAMES, ROLE_COLORS, ROLE_ICON_COLORS } from "@/lib/constants";
import RoleBadge from "@/components/shared/RoleBadge";

const ROLE_ORDER: Role[] = ["duelist", "initiator", "controller", "sentinel"];

interface Props {
  initialAgents: Agent[];
}

export default function AgentGridClient({ initialAgents }: Props) {
  const [selectedRole, setSelectedRole] = useState<Role | "all">("all");

  const filtered =
    selectedRole === "all"
      ? initialAgents
      : initialAgents.filter((a) => a.role === selectedRole);

  return (
    <>
      {/* Role Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => setSelectedRole("all")}
          className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            selectedRole === "all"
              ? "bg-valorant-red text-white"
              : "bg-valorant-dark/40 border border-gray-700/30 text-gray-400 hover:text-valorant-light"
          }`}
        >
          全部 ({initialAgents.length})
        </button>
        {ROLE_ORDER.map((role) => {
          const count = initialAgents.filter((a) => a.role === role).length;
          const isActive = selectedRole === role;
          return (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                isActive
                  ? "border-current text-white"
                  : "border-gray-700/30 text-gray-400 hover:text-valorant-light"
              }`}
              style={isActive ? { backgroundColor: `${ROLE_ICON_COLORS[role]}20`, color: ROLE_ICON_COLORS[role], borderColor: `${ROLE_ICON_COLORS[role]}40` } : {}}
            >
              {ROLE_NAMES[role]} ({count})
            </button>
          );
        })}
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((agent) => (
          <div
            key={agent.slug}
            className="corner-brackets group bg-valorant-dark/40 border border-gray-700/20 rounded-sm p-4 hover:border-valorant-red/30 transition-all duration-300 text-center"
          >
            {/* Agent Icon */}
            <div className="w-16 h-16 mx-auto rounded-full border-2 flex items-center justify-center text-2xl font-bold mb-3 overflow-hidden"
              style={{ borderColor: `${ROLE_ICON_COLORS[agent.role]}60` }}>
              <img
                src={agent.icon}
                alt={agent.name}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  // Fallback to initial on image load failure
                  const el = e.currentTarget;
                  el.style.display = "none";
                  const parent = el.parentElement;
                  if (parent) {
                    parent.style.backgroundColor = `${ROLE_ICON_COLORS[agent.role]}15`;
                    parent.textContent = agent.name[0];
                    parent.style.color = ROLE_ICON_COLORS[agent.role];
                    parent.style.fontSize = "";
                    parent.style.fontWeight = "bold";
                  }
                }}
              />
            </div>

            <h3 className="text-valorant-light font-semibold text-sm">{agent.name}</h3>
            <p className="text-gray-500 text-xs mb-2">{agent.nameEn}</p>

            <div className="flex justify-center mb-2">
              <RoleBadge role={agent.role} roleZh={agent.roleZh} />
            </div>

            <p className="text-gray-400 text-xs mb-2">{agent.origin}</p>

            {/* Abilities */}
            <div className="flex flex-wrap justify-center gap-1">
              {agent.abilities.map((ab, i) => (
                <span key={i} className="text-xs bg-valorant-dark/60 text-gray-400 border border-gray-700/30 rounded px-2 py-0.5">
                  {ab}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
