import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-10 mb-4 text-valorant-light">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-8 mb-3 text-valorant-light border-b border-valorant-dark/30 pb-2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-6 mb-2 text-valorant-light">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="my-3 leading-relaxed text-gray-300">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 my-3 space-y-1 text-gray-300">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 my-3 space-y-1 text-gray-300">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-valorant-gold">{children}</strong>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-valorant-red pl-4 my-4 italic text-gray-400">{children}</blockquote>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-valorant-red hover:text-valorant-red/80 underline transition-colors">{children}</a>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-4">
        <table className="w-full border-collapse border border-valorant-dark/50 text-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border border-valorant-dark/50 bg-valorant-dark/50 px-4 py-2 text-left font-semibold text-valorant-gold">{children}</th>
    ),
    td: ({ children }) => (
      <td className="border border-valorant-dark/50 px-4 py-2 text-gray-300">{children}</td>
    ),
    ...components,
  };
}
