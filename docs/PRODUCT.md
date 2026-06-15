# ポートフォリオサイト — プロダクトドキュメント

就職活動での技術面接・ポートフォリオ提出を想定したドキュメントです。

---

## なぜ作ったか

就職活動にあたり、制作物・スキル・人柄を一箇所で伝える場所が必要でした。
既製の SNS プロフィールや PDF 資料では伝えられない「実際に動くプロダクトを作れる」という証明を、サイト自体で示すことが目的です。

また、大学の授業資料を友人と共有する手段が LINE や USB になっていたという課題があり、Resources ページとしてサイトに統合しました。

---

## プロダクト概要

| 項目 | 内容 |
|------|------|
| URL | https://aotosuzuki.vercel.app |
| 開発期間 | 約2週間（2026年5月） |
| 開発体制 | 個人開発 |
| 対象ユーザー | 採用担当者・エンジニア・大学の友人 |

### 主な機能

- **Home / About / Works / Contact** — 自己紹介・制作物・連絡先
- **Resources** — 授業資料のアップロード・配布・全文検索（パスワード認証付き）

---

## 技術スタック

| カテゴリ | 技術 |
|---------|------|
| フレームワーク | Next.js 16（App Router） |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS v4 + shadcn/ui |
| データベース | Neon（PostgreSQL）+ Drizzle ORM |
| ファイルストレージ | Vercel Blob |
| デプロイ | Vercel |

---

## 技術選定の理由

**Next.js App Router を選んだ理由**
Server Components・Server Actions・静的生成を一つのフレームワークで完結できるため選定しました。Works の詳細ページは静的生成（`generateStaticParams`）で配信コストをゼロにしつつ、Resources だけ `force-dynamic` で動的レンダリングするという使い分けが、App Router では自然に書けます。

**Drizzle ORM を選んだ理由**
Prisma と比較し、Neon のサーバーレス HTTP ドライバーとの相性が良く、エッジ環境での動作に向いているため採用しました。型安全なクエリが書ける点も重視しています。

**Vercel Blob を選んだ理由**
ファイルアップロード機能を最小の設定で実装できるからです。S3 は IAM・バケットポリシーの設定コストが高く、個人プロダクトには過剰と判断しました。

---

## 設計上の工夫

### 認証の二重ガード

Resources ページの管理機能は、ミドルウェアと Server Actions の2層で保護しています。

```
リクエスト
  → middleware（middleware.ts）: Cookie を検証 → 未認証なら /login にリダイレクト
  → Server Action（actions.ts）: assertAuthenticated() で再検証
```

ミドルウェアだけでは Server Actions を直接 POST で呼び出してバイパスできるため、Actions 側でも毎回認証チェックを行っています。

### タイミング攻撃への対策

パスワード比較に Node.js 標準の `timingSafeEqual` を使用しています。通常の文字列比較（`===`）は一致しない文字が見つかった時点で処理を終えるため、レスポンス時間からパスワードの一致度を推測される恐れがあります。

```ts
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}
```

### DB 接続のシングルトン化

```ts
let instance: NeonHttpDatabase<typeof schema> | null = null;

export function getDb() {
  if (!instance) {
    instance = drizzle(neon(process.env.POSTGRES_URL!), { schema });
  }
  return instance;
}
```

サーバーレス環境では関数が呼ばれるたびにモジュールが再評価されることがあるため、インスタンスをモジュールスコープにキャッシュして接続数の増大を防いでいます。

---

## 苦労した点

**Server Actions のセキュリティモデルの理解**
Next.js の Server Actions はエンドポイントとして外部から直接 POST リクエストを送れるため、ページのミドルウェアで保護しても迂回されます。この挙動を把握するまでに時間がかかり、Actions 側でも認証チェックが必要だと気づいてから二重ガードの設計に至りました。

**レスポンシブ対応**
ヒーローセクションに画像とテキストを横並びにした際、モバイルで崩れる問題が発生しました。`flex-col-reverse` でモバイルでは縦積みに、`sm:flex-row` で PC では横並びになるよう Tailwind のブレークポイントを使って解決しました。

---

## 学んだこと

- Next.js App Router における静的生成・動的レンダリングの使い分け
- サーバーレス環境を前提とした DB 接続管理
- Web セキュリティ（タイミング攻撃・CSRF・HttpOnly Cookie）の実装レベルの理解

---

## 今後の改善案

- Works ページへのカテゴリフィルター追加
- OGP 画像の自動生成（SNS シェア時のサムネイル）
- Resources の公開・限定公開の切り替え機能
- ダークモード対応
