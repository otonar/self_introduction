import type { Metadata } from "next";
import Link from "next/link";
import { Settings, FileText, BookOpen, Presentation, File } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getResources } from "@/lib/resources";
import type { ResourceType } from "@/lib/resources";
import SearchInput from "@/components/SearchInput";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Resources" };

const typeIcon: Record<ResourceType, React.ReactNode> = {
  slides: <Presentation className="h-4 w-4" />,
  notes: <BookOpen className="h-4 w-4" />,
  report: <FileText className="h-4 w-4" />,
  other: <File className="h-4 w-4" />,
};

const typeLabel: Record<ResourceType, string> = {
  slides: "スライド",
  notes: "ノート",
  report: "レポート",
  other: "その他",
};

type Props = { searchParams: Promise<{ q?: string }> };

export default async function ResourcesPage({ searchParams }: Props) {
  const { q: rawQ } = await searchParams;
  const q = rawQ?.trim().slice(0, 200);
  const resources = await getResources(q);

  const grouped = resources.reduce<Record<string, typeof resources>>(
    (acc, r) => {
      (acc[r.subject] ??= []).push(r);
      return acc;
    },
    {}
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      {/* Header */}
      <div className="mb-10 flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Resources
          </p>
          <h1 className="text-4xl font-bold tracking-tight">授業資料</h1>
          <p className="text-muted-foreground">
            大学の授業で作成・使用した資料です。
          </p>
        </div>
        <Link
          href="/resources/admin"
          className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <Settings className="h-4 w-4" />
          管理
        </Link>
      </div>

      {/* Search */}
      <div className="mb-10">
        <SearchInput defaultValue={q} />
      </div>

      {/* Results */}
      {resources.length === 0 ? (
        <div className="py-24 text-center text-muted-foreground">
          {q ? (
            <p>「{q}」に一致する資料が見つかりませんでした。</p>
          ) : (
            <>
              <p>資料がまだありません。</p>
              <Link
                href="/resources/admin"
                className="mt-2 inline-block text-sm underline underline-offset-4"
              >
                アップロードする
              </Link>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-14">
          {q && (
            <p className="text-sm text-muted-foreground">
              「{q}」の検索結果 — {resources.length} 件
            </p>
          )}
          {Object.entries(grouped).map(([subject, items]) => (
            <section key={subject}>
              <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                {subject}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((r) => (
                  <a
                    key={r.id}
                    href={`/api/resources/${r.id}/download`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Card className="h-full transition-shadow hover:shadow-md">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            {typeIcon[r.type as ResourceType]}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {r.year}
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm font-medium leading-snug">
                          {r.title}
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {r.description && (
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {r.description}
                          </p>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {typeLabel[r.type as ResourceType] ?? r.type}
                        </Badge>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
