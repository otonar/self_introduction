import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Trash2, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { getResources } from "@/lib/resources";
import ResourceUploadForm from "@/components/ResourceUploadForm";
import { deleteResource, logout } from "../actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Resources — 管理" };

const typeLabel: Record<string, string> = {
  slides: "スライド",
  notes: "ノート",
  report: "レポート",
  other: "その他",
};

export default async function AdminPage() {
  const resources = await getResources();

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <Link
          href="/resources"
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Resources に戻る
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ログアウト
          </button>
        </form>
      </div>

      <h1 className="mb-10 text-3xl font-bold tracking-tight">管理画面</h1>

      {/* Upload */}
      <section className="mb-14">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          新規アップロード
        </h2>
        <ResourceUploadForm />
      </section>

      <Separator />

      {/* File list */}
      <section className="mt-12">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          アップロード済み ({resources.length} 件)
        </h2>

        {resources.length === 0 ? (
          <p className="text-sm text-muted-foreground">まだファイルがありません。</p>
        ) : (
          <ul className="space-y-3">
            {resources.map((r) => (
              <li
                key={r.id}
                className="flex items-start justify-between gap-4 rounded-lg border border-border p-4"
              >
                <div className="min-w-0 space-y-1">
                  <p className="truncate text-sm font-medium">{r.title}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {r.subject}
                    </span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{r.year}</span>
                    <Badge variant="secondary" className="text-xs">
                      {typeLabel[r.type] ?? r.type}
                    </Badge>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <a
                    href={r.blobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="開く"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <form
                    action={async () => {
                      "use server";
                      await deleteResource(r.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="text-muted-foreground transition-colors hover:text-red-500"
                      aria-label="削除"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
