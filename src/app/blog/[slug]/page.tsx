import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";
import GiscusComments from "@/components/GiscusComments";
import { profile } from "@/data/profile";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [profile.nameEn],
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Link
        href="/blog"
        className="mb-10 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Blog に戻る
      </Link>

      <header className="mb-10 space-y-4">
        <p className="text-xs text-muted-foreground">{formatDate(post.date)}</p>
        <h1 className="text-3xl font-bold tracking-tight leading-snug">
          {post.title}
        </h1>
        {post.description && (
          <p className="text-muted-foreground leading-relaxed">
            {post.description}
          </p>
        )}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <Link key={t} href={`/blog?tag=${encodeURIComponent(t)}`}>
                <Badge variant="secondary" className="text-xs cursor-pointer">
                  {t}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  {
                    theme: "github-dark-dimmed",
                    keepBackground: true,
                  },
                ],
              ],
            },
          }}
        />
      </div>

      <GiscusComments />
    </div>
  );
}
