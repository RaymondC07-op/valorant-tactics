"use client";

import { useState } from "react";

interface Props {
  src: string;
  alt: string;
}

export default function CalloutImage({ src, alt }: Props) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex items-center justify-center h-48 bg-valorant-dark/40 border border-gray-700/30 rounded-xl text-gray-500 text-sm">
        🗺️ 报点图制作中，敬请期待
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="rounded-xl border border-gray-700/30 w-full max-w-3xl"
      loading="lazy"
      onError={() => setError(true)}
    />
  );
}
