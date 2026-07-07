import type { Role } from "@/lib/types";
import { ROLE_COLORS } from "@/lib/constants";

interface RoleBadgeProps {
  role: Role;
  roleZh: string;
  size?: "sm" | "md";
}

export default function RoleBadge({ role, roleZh, size = "sm" }: RoleBadgeProps) {
  const colorClass = ROLE_COLORS[role] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  const sizeClass = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${colorClass} ${sizeClass}`}>
      {roleZh}
    </span>
  );
}
