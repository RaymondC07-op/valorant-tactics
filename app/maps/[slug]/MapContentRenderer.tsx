"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { Components } from "react-markdown";

interface Props {
  content: string;
}

const components: Components = {
  img: ({ src, alt, ...props }) => (
    <img
      src={src}
      alt={alt || "报点图"}
      className="rounded-sm border border-gray-700/30 my-6 w-full max-w-3xl"
      loading="lazy"
      {...props}
    />
  ),
};

export default function MapContentRenderer({ content }: Props) {
  return (
    <div className="prose prose-invert prose-lg max-w-none
      prose-headings:text-valorant-light
      prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-valorant-dark/30 prose-h2:pb-2
      prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
      prose-p:text-gray-300 prose-p:leading-relaxed prose-p:my-3
      prose-strong:text-valorant-gold prose-strong:font-semibold
      prose-li:text-gray-300 prose-li:leading-relaxed
      prose-a:text-valorant-red hover:prose-a:text-valorant-red/80
      prose-blockquote:border-valorant-red prose-blockquote:text-gray-400
      prose-code:text-valorant-red prose-code:bg-valorant-dark/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
      prose-pre:bg-valorant-dark/80 prose-pre:border prose-pre:border-gray-700/30
      prose-table:border-collapse
      prose-th:border prose-th:border-gray-600/50 prose-th:bg-valorant-dark/50 prose-th:px-4 prose-th:py-2 prose-th:text-valorant-gold
      prose-td:border prose-td:border-gray-600/50 prose-td:px-4 prose-td:py-2 prose-td:text-gray-300
      prose-img:rounded-sm prose-img:border prose-img:border-gray-700/30
    ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
