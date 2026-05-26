# 開発ドキュメント

## ファイル構成

```
src/
├── app/
│   ├── layout.tsx              # 共通レイアウト（Navbar・Footer・フォント）
│   ├── page.tsx                # トップページ（Hero・Skills・Featured Works）
│   ├── about/page.tsx          # Aboutページ
│   ├── works/
│   │   ├── page.tsx            # 作品一覧
│   │   └── [slug]/page.tsx     # 作品詳細（静的生成）
│   ├── contact/page.tsx        # Contactページ
│   └── resources/
│       ├── page.tsx            # 資料一覧（検索対応）
│       ├── login/page.tsx      # 管理者ログイン
│       ├── admin/page.tsx      # アップロード・削除管理画面
│       └── actions.ts          # Server Actions（ログイン・アップロード・削除）
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── WorkCard.tsx
│   ├── ResourceUploadForm.tsx
│   ├── SearchInput.tsx
│   └── ui/                     # shadcn/ui コンポーネント
├── data/
│   ├── profile.ts              # 名前・SNS・スキルなど（ここを編集してカスタマイズ）
│   └── works.ts                # 作品データ（ここを編集してカスタマイズ）
├── db/
│   ├── index.ts                # DB接続（シングルトン）
│   └── schema.ts               # Drizzle スキーマ定義
├── lib/
│   ├── resources.ts            # 資料のCRUD処理
│   ├── safe-equal.ts           # タイミングセーフな文字列比較
│   └── magic-bytes.ts          # ファイルマジックバイト検証
└── middleware.ts               # Resources 認証ミドルウェア
```

## 技術選定の理由

| 技術 | 理由 |
|------|------|
| Next.js App Router | Server Components・静的生成・Server Actions を一つのフレームワークで完結できる |
| Tailwind CSS v4 + shadcn/ui | ユーティリティクラスによる高速なUI実装。shadcn/ui はコピーベースで自由にカスタマイズ可能 |
| Neon + Drizzle ORM | サーバーレス向けHTTP接続・型安全なクエリビルダー |
| Vercel Blob | Vercel との親和性が高く、設定不要でファイルアップロードが可能 |

## 設計上の工夫

### Resources の認証フロー

ミドルウェア（`middleware.ts`）と Server Actions（`actions.ts`）の二重でアクセス制御を実装している。

- **ミドルウェア**: `/resources/*` へのリクエストをページルーティングレベルでガード
- **Server Actions**: ミドルウェアをバイパスした直接呼び出しも `assertAuthenticated()` で防止
- **パスワード比較**: `timingSafeEqual` を使用してタイミング攻撃を防止
- **セッション**: HttpOnly Cookie にシークレットを保存（30日間有効）

### DB接続のシングルトン化

`src/db/index.ts` でインスタンスをモジュールスコープにキャッシュし、サーバーレス環境での接続数の増大を抑制している。

### Works の静的生成

`generateStaticParams` により作品詳細ページをビルド時に静的生成し、ランタイムのDBアクセスをゼロにしている。

### Resources のみ動的レンダリング

`export const dynamic = "force-dynamic"` を Resources ページのみに限定し、それ以外は静的扱いにしてパフォーマンスを確保している。
