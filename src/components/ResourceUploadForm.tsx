"use client";

import { useState, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const typeOptions = [
  { value: "slides", label: "スライド" },
  { value: "notes", label: "ノート" },
  { value: "report", label: "レポート" },
  { value: "other", label: "その他" },
] as const;

export default function ResourceUploadForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      setError(null);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(json.error ?? "アップロードに失敗しました");
      } else {
        router.push("/resources/admin");
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="タイトル *">
          <input
            name="title"
            required
            placeholder="例: 第3回講義まとめ"
            className={inputClass}
          />
        </Field>
        <Field label="科目名 *">
          <input
            name="subject"
            required
            placeholder="例: アルゴリズム論"
            className={inputClass}
          />
        </Field>
        <Field label="年度・学期 *">
          <input
            name="year"
            required
            placeholder="例: 2024前期"
            className={inputClass}
          />
        </Field>
        <Field label="種別">
          <select name="type" className={inputClass}>
            {typeOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="メモ（任意）">
        <textarea
          name="description"
          rows={2}
          placeholder="資料の内容・補足など"
          className={`${inputClass} resize-none`}
        />
      </Field>

      <Field label="ファイル *">
        <div
          className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed border-border px-6 py-8 text-sm text-muted-foreground transition hover:border-ring hover:text-foreground"
          onClick={() => fileRef.current?.click()}
        >
          <Upload className="h-5 w-5" />
          <span>クリックしてファイルを選択</span>
          <input
            ref={fileRef}
            type="file"
            name="file"
            required
            className="hidden"
          />
        </div>
      </Field>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? "アップロード中..." : "アップロード"}
      </Button>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30";
