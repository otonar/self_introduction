import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { works } from "@/data/works";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aotosuzuki.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/works`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const workRoutes: MetadataRoute.Sitemap = works.map((work) => ({
    url: `${siteUrl}/works/${work.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes, ...workRoutes];
}
