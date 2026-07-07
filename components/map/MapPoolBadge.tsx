interface MapPoolBadgeProps {
  inRotation: boolean;
}

export default function MapPoolBadge({ inRotation }: MapPoolBadgeProps) {
  if (inRotation) {
    return (
      <span className="inline-flex items-center rounded-full bg-valorant-green/20 text-valorant-green border border-valorant-green/30 text-xs px-2 py-0.5 font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-valorant-green mr-1.5" />
        当前轮换
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-gray-600/20 text-gray-500 border border-gray-600/30 text-xs px-2 py-0.5 font-medium">
      非轮换
    </span>
  );
}
