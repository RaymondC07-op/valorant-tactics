import type { MapComposition } from "@/lib/types";
import AgentPill from "./AgentPill";
import { DIFFICULTY_COLORS } from "@/lib/constants";

interface CompositionTableProps {
  composition: MapComposition;
}

function CompCard({
  entry,
  side,
}: {
  entry: MapComposition["attack"]["recommended"][number];
  side: "attack" | "defense";
}) {
  const sideColor = side === "attack" ? "border-l-valorant-red" : "border-l-valorant-blue";

  return (
    <div className={`corner-brackets bg-valorant-dark/40 border border-gray-700/20 rounded-sm p-4 border-l-2 ${sideColor}`}>
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-lg font-semibold text-valorant-light">{entry.name}</h4>
        <span className={`text-xs rounded-full border px-2 py-0.5 font-medium ${DIFFICULTY_COLORS[entry.difficulty] || ""}`}>
          {entry.difficulty}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {entry.agents.map((slug) => (
          <AgentPill key={slug} slug={slug} />
        ))}
      </div>

      <p className="text-gray-400 text-sm mb-2 leading-relaxed">{entry.rationale}</p>

      <div className="bg-valorant-dark/60 rounded-md px-3 py-2 border border-valorant-gold/20">
        <span className="text-valorant-gold text-xs font-semibold uppercase tracking-wider">获胜条件：</span>
        <span className="text-gray-300 text-sm">{entry.winCondition}</span>
      </div>
    </div>
  );
}

export default function CompositionTable({ composition }: CompositionTableProps) {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold text-valorant-light mb-6 border-b border-valorant-red/30 pb-3">
        推荐阵容
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attack Column */}
        <div>
          <h3 className="text-lg font-semibold text-valorant-red mb-4 flex items-center gap-2">
            <span>⚔️</span> 进攻阵容
          </h3>
          <div className="space-y-4">
            {composition.attack.recommended.map((comp, i) => (
              <CompCard key={i} entry={comp} side="attack" />
            ))}
          </div>
          {composition.attack.alternativeAgents.length > 0 && (
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
              <span>备选特工：</span>
              {composition.attack.alternativeAgents.map((slug) => (
                <AgentPill key={slug} slug={slug} />
              ))}
            </div>
          )}
        </div>

        {/* Defense Column */}
        <div>
          <h3 className="text-lg font-semibold text-valorant-blue mb-4 flex items-center gap-2">
            <span>🛡️</span> 防守阵容
          </h3>
          <div className="space-y-4">
            {composition.defense.recommended.map((comp, i) => (
              <CompCard key={i} entry={comp} side="defense" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
