import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getAllPosts, getAllTags, formatDate } from "@/lib/posts";
import { profile } from "@/data/profile";

export const metadata: Metadata = { title: "Blog" };

type Props = { searchParams: Promise<{ tag?: string }> };

export default async function BlogPage({ searchParams }: Props) {
  const { tag } = await searchParams;
  const allPosts = getAllPosts();
  const allTags = getAllTags();

  const posts = tag
    ? allPosts.filter((p) => p.tags.includes(tag))
    : allPosts;

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <div className="mb-10 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Blog
        </p>
        <h1 className="text-4xl font-bold tracking-tight">記事</h1>
        <p className="text-muted-foreground">{profile.nameEn} の技術メモ・雑記</p>
      </div>

      {allTags.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2">
          <Link href="/blog">
            <Badge
              variant={!tag ? "default" : "outline"}
              className="cursor-pointer"
            >
              すべて
            </Badge>
          </Link>
          {allTags.map((t) => (
            <Link key={t} href={`/blog?tag=${encodeURIComponent(t)}`}>
              <Badge
                variant={tag === t ? "default" : "outline"}
                className="cursor-pointer"
              >
                {t}
              </Badge>
            </Link>
          ))}
        </div>
      )}

      {posts.length === 0 ? (
        <p className="py-24 text-center text-muted-foreground">
          {tag ? `「${tag}」の記事はまだありません。` : "記事がまだありません。"}
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {posts.map((post) => (
            <li key={post.slug} className="py-8">
              <Link href={`/blog/${post.slug}`} className="group block space-y-2">
                <p className="text-xs text-muted-foreground">
                  {formatDate(post.date)}
                </p>
                <h2 className="text-xl font-semibold tracking-tight group-hover:text-muted-foreground transition-colors">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                )}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
