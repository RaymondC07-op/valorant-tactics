"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("页面错误:", error);
  }, [error]);

  return (
    <main className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="text-center">
        <div className="text-5xl font-bold text-valorant-red mb-4">⚠</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-valorant-light mb-3">
          页面加载出错
        </h1>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          很抱歉，页面在加载过程中遇到了问题。请尝试刷新页面，或返回首页。
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-lg bg-valorant-red text-white font-medium hover:bg-valorant-red/90 transition-colors"
          >
            重试
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-lg border border-gray-600/50 text-gray-300 font-medium hover:bg-white/5 transition-colors"
          >
            ← 返回首页
          </Link>
        </div>
      </div>
    </main>
  );
}
