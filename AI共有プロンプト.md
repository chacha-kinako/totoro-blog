# totoro-blog 環境共有プロンプト

以下をそのままコピーして別のAIに貼り付けてください。

---

## AIへの共有文

私のAstroブログの作業を手伝ってください。以下が環境情報です。

### プロジェクト概要
- ブログ名：エンジョイ！トトロライフ！（トトロ・ジブリグッズブログ）
- 運営者：hinako（非エンジニア主婦）
- フレームワーク：Astro
- ホスティング：Cloudflare Workers（GitHub連携で自動デプロイ）
- リポジトリ：https://github.com/chacha-kinako/totoro-blog
- ローカルパス：C:\Users\user\Desktop\totoro-blog
- デプロイ：mainブランチにpushすると自動でCloudflareへ反映

### デザインシステム（CSS変数）
```css
--orange: #C4714A;       /* メイン：くすみオレンジ */
--orange-dark: #9A5230;
--orange-light: #DBA882;
--orange-pale: #FDF1E8;
--green: #7BA870;        /* サブ：若葉グリーン */
--green-dark: #4E7A45;
--green-light: #AECBA6;
--green-pale: #EEF5EC;
--milk: #FAF8F4;         /* ベース：ミルクホワイト */
--milk-dark: #F0EBE0;
--beige: #E2D4BC;        /* 補助：ベージュ */
--beige-light: #EDE8DF;
--text: #3D3028;
--text-muted: #8C7B6E;
--border: #E2D4BC;
```
- 見出しフォント：Kaisei Decol（Google Fonts）
- 本文フォント：Noto Sans JP（Google Fonts）
- 雰囲気：北欧雑貨×暮らし系インスタ×無印×ナチュラルカフェ×ジブリ

### 主要ファイル構成
```
src/
├── styles/global.css        # CSS変数・共通スタイル
├── consts.ts                # サイトタイトル・説明文
├── content.config.ts        # 記事スキーマ定義
├── components/
│   ├── Header.astro         # ヘッダー（スティッキー）
│   ├── BaseHead.astro       # <head>・Google Fonts読込
│   └── Footer.astro
├── layouts/BlogPost.astro   # 記事レイアウト
├── pages/
│   ├── index.astro          # ホーム画面
│   ├── blog/index.astro     # 記事一覧
│   └── blog/[...slug].astro # 記事個別ページ
└── content/blog/            # 記事ファイル（.md / .mdx）
public/                      # 画像など静的ファイル
```

### 記事フロントマター（スキーマ）
```yaml
---
title: "記事タイトル"          # 必須
description: "説明文"          # 必須
pubDate: 'Apr 30 2026'        # 必須
heroImage: ./image.jpg         # 任意（Astro画像最適化）
cardImage: '/image.jpg'        # 任意（一覧カードのサムネイル）
cardText: 'カードラベル文字'    # 任意（サムネイル上に表示）
featured: true                 # 任意（ホームの人気記事セクションに表示）
updatedDate: 'May 1 2026'      # 任意
---
```

### ホームのカテゴリ一覧（index.astroに定義済み）
フィギアレビュー／ぬいぐるみレビュー／陶器レビュー／ランキングまとめ／グッズ購入いろは／ジブリ雑貨／お小遣い記録

### 画像の扱い
- 元ファイル：HEIC形式をpublicフォルダに保存
- 変換：Node.jsで `heic-convert` → `sharp` でリサイズ後JPEGに変換
- ヒーロー画像：1400×560px / 記事お気に入り写真：900px幅 / 雰囲気写真：500px幅

### 記事内の写真グリッド（MDX）
```html
<div class="photo-row">
  <img src="/photo1.jpg" alt="説明" />
  <img src="/photo2.jpg" alt="説明" />
</div>
```
`.photo-row`はglobal.cssで定義済み（高さ150px固定のflex横並び）

### 作業時の注意
- 非エンジニアなので専門用語を使わず平易な日本語で
- APIキー等は絶対にコードに書かない
- コミット後にpushするとCloudflareへ自動デプロイされる
- 変更はgit add → git commit → git pushの順で必ず実施
