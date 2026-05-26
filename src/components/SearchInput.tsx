"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition, useCallback, useRef } from "react";
import { Search } from "lucide-react";

export default function SearchInput({ defaultValue }: { defaultValue?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        const params = new URLSearchParams();
        if (value.trim()) params.set("q", value.trim());
        startTransition(() => {
          router.push(`${pathname}?${params.toString()}`);
        });
      }, 300);
    },
    [router, pathname]
  );

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="search"
        defaultValue={defaultValue}
        onChange={handleChange}
        placeholder="タイトル・科目名・年度・メモで検索..."
        className={`w-full rounded-lg border border-border bg-background py-2 pl-9 pr-4 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30 ${
          isPending ? "opacity-60" : ""
        }`}
      />
    </div>
  );
}
