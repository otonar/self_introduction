"use client";

import Giscus from "@giscus/react";

export default function GiscusComments() {
  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  if (!repo || !repoId || !categoryId) return null;

  return (
    <div className="mt-16 border-t border-border pt-10">
      <Giscus
        repo={repo as `${string}/${string}`}
        repoId={repoId}
        category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "General"}
        categoryId={categoryId}
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="preferred_color_scheme"
        lang="ja"
        loading="lazy"
      />
    </div>
  );
}
