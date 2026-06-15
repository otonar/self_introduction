# Portfolio Site

自己紹介・制作物紹介・授業資料の配布を目的に構築した個人ポートフォリオサイトです。

**[→ Live](https://aotosuzuki.vercel.app)**

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Database**: Neon (PostgreSQL) + Drizzle ORM
- **Storage**: Vercel Blob
- **Deploy**: Vercel

## Getting Started

```bash
npm install
vercel link
vercel env pull .env.local
npm run db:push
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `POSTGRES_URL` | Neon の接続文字列 |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob トークン |
| `RESOURCES_PASSWORD` | Resources 管理画面のパスワード |
| `RESOURCES_SECRET` | Cookie 署名用シークレット |

## Docs

- [開発ドキュメント](docs/DEVELOPMENT.md) — 設計・ファイル構成・実装の工夫
