import type { Metadata } from "next";
import { works } from "@/data/works";
import WorkCard from "@/components/WorkCard";

export const metadata: Metadata = {
  title: "Works",
};

export default function WorksPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="space-y-2 mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Works
        </p>
        <h1 className="text-4xl font-bold tracking-tight">プロダクト一覧</h1>
        <p className="text-muted-foreground">これまでに作ったプロジェクトの一覧です。</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((work) => (
          <WorkCard key={work.slug} work={work} />
        ))}
      </div>
    </div>
  );
}
