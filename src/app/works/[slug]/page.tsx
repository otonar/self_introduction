import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, GitBranch } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { works } from "@/data/works";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) return {};
  return { title: work.title, description: work.description };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Link
        href="/works"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Works に戻る
      </Link>

      <div className="space-y-4 mb-10">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{work.category}</Badge>
          <span className="text-sm text-muted-foreground">{work.year}</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">{work.title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {work.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {work.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mb-12">
        {work.githubUrl && (
          <a
            href={work.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <GitBranch className="mr-2 h-4 w-4" /> GitHub
          </a>
        )}
        {work.demoUrl && (
          <a
            href={work.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: "sm" })}
          >
            <ExternalLink className="mr-2 h-4 w-4" /> Demo
          </a>
        )}
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {work.detail.split("\n\n").map((para, i) => (
          <p key={i} className="text-muted-foreground leading-relaxed mb-4">
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}
