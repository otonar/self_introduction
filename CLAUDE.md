# Claude Code ガイドライン

## 絶対に読まない・表示しないファイル

以下のファイルは機密情報を含む。内容を読んだり、出力に含めたり、変数展開したりしてはならない。

- `.env` / `.env.local` / `.env.*.local` — パスワード・APIキー・シークレット（POSTGRES_URL・BLOB_READ_WRITE_TOKEN を含む）
- `*.pem` / `*.key` / `*.p12` / `*.pfx` — 秘密鍵・証明書
- `.gitconfig` — git の認証情報が含まれる可能性あり

## 作業上のルール

- 環境変数の値をチャットに出力しない
- シークレット系の文字列をコードにハードコードしない（必ず env var を参照する）
- git commit 前に `.env*` が `.gitignore` に含まれていることを確認する
