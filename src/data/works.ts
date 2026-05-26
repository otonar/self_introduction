export type Work = {
  slug: string;
  title: string;
  description: string;
  detail: string;
  tags: string[];
  category: "Web" | "App" | "OSS" | "Other";
  year: number;
  status?: "planned";
  githubUrl?: string;
  demoUrl?: string;
  thumbnail: string;
};

export const works: Work[] = [
  {
    slug: "oto-agora",
    title: "otoAgora",
    description: "「思想」をフォローする議論SNS。人ではなくアイデアそのもので評価される新しい議論空間。",
    detail: `otoAgora は、従来の「人をフォローするSNS」とは異なり、「思想・主張」そのものをフォローする議論プラットフォームです。

議題に対して主張（Thesis）を投稿し、他ユーザーが同意・反論（Argument）を重ねることで議論ツリーが構築されます。フォローするのは人ではなく「思想（Perspective）」であり、フィードには自分が共感する視点からの投稿だけが流れてきます。

バックエンドは Hono + Cloudflare Workers でエッジ環境で動作し、フロントエンドは Next.js App Router + Zustand による状態管理で実装しました。JWT 認証・レート制限・UNIQUE制約による二重投票防止など、セキュリティ面にも配慮しています。`,
    tags: ["TypeScript", "Next.js", "Hono", "Cloudflare Workers", "PostgreSQL", "Drizzle ORM", "Zustand"],
    category: "Web",
    year: 2026,
    demoUrl: "https://agora-app-ruddy.vercel.app",
    thumbnail: "/thumbnails/oto-agora.png",
  },
  {
    slug: "nashitora",
    title: "nashitora",
    description: "Instagramのハッシュタグから観光地データを収集し、AIが最適な旅行ルートを提案するWebアプリ。",
    detail: `nashitora は、Instagram の投稿データを活用した観光地可視化・旅行プラン生成アプリです。

Instagram Graph API でハッシュタグに紐づく観光地投稿を自動収集し、Google Maps API で複数地点のルートを最適化します。OpenAI API が旅行プランの文章生成と近隣ホテルの提案を担います。

UI には Gradio を採用しており、コードの少ない構成でインタラクティブな操作を実現しています。Docker でのコンテナ化にも対応し、環境構築の手間を最小化しました。`,
    tags: ["Python", "Django", "Gradio", "OpenAI API", "Google Maps API", "Instagram API", "Docker"],
    category: "Web",
    year: 2024,
    githubUrl: "https://github.com/otonar/nashitora",
    thumbnail: "/thumbnails/nashitora.png",
  },
  {
    slug: "self-introduction",
    title: "ポートフォリオサイト",
    description: "このサイト自体。自己紹介・制作物紹介・授業メモの保存を目的に構築したポートフォリオ。",
    detail: `このポートフォリオサイト自体も制作物の一つです。

Next.js App Router の Server Components・Server Actions・静的生成を組み合わせ、シンプルながら機能的な構成を目指しました。Resources ページでは大学の授業資料をアップロード・配布でき、パスワード認証・セッション管理・ファイルの MIME タイプ検証など実用的な機能を実装しています。

認証はミドルウェアと Server Actions の二重ガードで保護し、パスワード比較には timingSafeEqual を使用してタイミング攻撃を防止しています。スタイリングは Tailwind CSS v4 + shadcn/ui、ストレージは Vercel Blob、DB は Neon + Drizzle ORM を採用しました。`,
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "Neon", "Vercel Blob", "Drizzle ORM"],
    category: "Web",
    year: 2026,
    thumbnail: "/thumbnails/self-introduction.png",
  },
  {
    slug: "oto-money",
    title: "otoMoney",
    description: "割り勘管理アプリ。日用品などの立替を記録し、精算額を自動計算・可視化する。",
    detail: `otoMoney は、家族やカップル、同居パートナー向けの立替・精算管理アプリです（開発予定）。

スーパーなどで片方がまとめて支払った日用品の費用を記録し、それぞれの負担額を自動計算します。「今月は誰がいくら多く払っているか」をグラフで可視化し、精算のタイミングをわかりやすく通知する設計を予定しています。

モバイルファーストで設計し、レシートを撮影するだけで品目・金額を自動入力できる機能も検討中です。`,
    tags: ["未定"],
    category: "App",
    year: 2026,
    status: "planned",
    thumbnail: "/thumbnails/oto-money.png",
  },
];

export const categories = ["All", "Web", "App", "OSS", "Other"] as const;
