import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="text-center">
        <div className="text-7xl font-bold text-valorant-red mb-4">404</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-valorant-light mb-3">
          页面未找到
        </h1>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          你访问的页面不存在或已被移除。请检查网址是否正确，或返回首页继续浏览战术攻略。
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-valorant-red text-white font-medium hover:bg-valorant-red/90 transition-colors"
        >
          ← 返回首页
        </Link>
      </div>
    </main>
  );
}
