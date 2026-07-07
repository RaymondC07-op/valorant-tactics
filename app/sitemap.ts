import type { MetadataRoute } from "next";
import { getAllMapSlugs } from "@/lib/content";

export const dynamic = "force-static";

const BASE_URL = "https://valorant-tactics.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const mapSlugs = getAllMapSlugs();

  const staticRoutes = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE_URL}/maps`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/compositions`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/agents`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
  ];

  const mapRoutes = mapSlugs.map((slug) => ({
    url: `${BASE_URL}/maps/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...mapRoutes];
}
