# totoro-blog デザイン仕様書

参考イメージ：ジブリパーク公式サイト ＋ どんぐり共和国
- 写真を大きく使う（ジブリパーク風）
- ナチュラルな緑・どんぐり色・クリーム色（どんぐり共和国風）
- タイトルは明朝系の手書き風フォントでジブリらしさを演出

---

## カラーパレット

| 変数名 | カラーコード | 用途 |
|--------|------------|------|
| `--green` | `#4a7a5a` | メインカラー（ボタン、ボーダー） |
| `--green-dark` | `#2d5a3d` | 濃い緑（見出し、ロゴ、オーバーレイ） |
| `--green-light` | `#7aaa8a` | 薄めの緑（アクセント） |
| `--green-pale` | `#eaf3ed` | 極薄緑（h2背景、ホバー背景） |
| `--acorn` | `#b87333` | どんぐり色（アクセント） |
| `--acorn-light` | `#f0e0c8` | 薄いどんぐり色（h3ボーダー） |
| `--cream` | `#faf8f2` | ページ背景 |
| `--cream-dark` | `#f2ede0` | コード背景 |
| `--border` | `#e2d9c8` | カード・テーブルのボーダー |
| `--text` | `#3a3228` | 本文テキスト |
| `--text-muted` | `#7a6e62` | サブテキスト、日付など |

---

## タイポグラフィ

### タイトル・ロゴ（ジブリ風）
- フォント：`'Kaisei Decol'`（Google Fonts）→ 明朝系・手書きの温かみ
- フォールバック：`'Hiragino Mincho ProN', 'Yu Mincho', serif`
- 使う場所：ブログロゴ、ヒーローテキスト

### 本文
- フォント：`system-ui, -apple-system, 'Hiragino Sans', 'Yu Gothic UI', sans-serif`
- 本文サイズ：17px（モバイルは15px）
- 行間：1.85
- h1: 2em / h2: 1.55em / h3: 1.2em

---

## 主要コンポーネント

### ヘッダー（Header.astro）
- 白背景、下に緑ボーダー3px、sticky
- ロゴ：Kaisei Decorフォント、`--green-dark`、左配置
- ナビ：ゴシック体テキストリンク、ホバーで `--green-pale` 背景

### ブログ一覧ページ ヒーロー（blog/index.astro）
- **全幅写真帯**：`width: 100vw; margin-left: calc(50% - 50vw);` 高さ340px
- 写真：`/public/hero-bg.jpg`（元画像：IMG_8946.HEIC、1400×560px に最適化）
- 暗いグラデーションオーバーレイ（上18% → 下52% の森の緑）
- タイトル：Kaisei Decorフォント、白、2.2em、text-shadow で立体感
- モバイル：高さ220px、文字1.5em

### 記事カード（blog/index.astro）
- 白背景、角丸16px、薄シャドウ
- 上部に緑→どんぐり色のカラーバー（高さ6px）
- ホバー：Y方向-5px、シャドウ強調
- 2カラムグリッド（モバイルは1カラム）

### 記事ページ（BlogPost.astro）
- パンくず：`› 記事一覧 › タイトル`
- 記事ヘッダーボックス：白背景、角丸18px、上部グラデーションバー8px
- 本文（.prose）：白背景、角丸18px、パディング2em

### 見出しスタイル（global.css）
- **h2**：左に緑ボーダー5px＋薄緑背景＋角丸（右のみ）
- **h3**：どんぐり色の下ボーダー2px

---

## アフィリエイト用コンポーネント

### ProductCard.astro
- Props: `title`, `description`, `price`, `image`, `amazon`, `rakuten`, `label`
- MDXで `import ProductCard from '../../components/ProductCard.astro'` してから使用

### ボタンクラス（global.css）
- `.btn--amazon`：オレンジ `#ff9900`
- `.btn--rakuten`：赤 `#bf0000`
- `.btn--green`：`--green`

---

## デザイン方針

### やること（ジブリパーク＋どんぐり共和国スタイル）
- **写真を大きく**: 実際の部屋・グッズ写真をヒーローに使う
- **タイトルに個性を**: Kaisei Decorフォントでジブリらしい手書き感
- ナチュラルな緑・どんぐり色・クリーム色で統一
- カード要素にホバーエフェクト（浮き上がり）

### やらないこと
- 絵文字を CSS の `content` に使わない
- ネオン・蛍光色は使わない
- 過剰なアニメーション

---

## 画像管理

| ファイル | 用途 | サイズ |
|---------|------|--------|
| `/public/hero-bg.jpg` | ブログ一覧ヒーロー写真 | 1400×560px、約132KB |
| `/public/favicon.svg` | ファビコン | SVG |

※ 元画像（IMG_8946.HEIC・8458×3806px）は `public/` に保管。
※ 新しい写真を追加したい場合は `sharp` で変換→最適化してから使う。

---

## ファイル構成

```
public/
  hero-bg.jpg              # ヒーロー写真（最適化済み）
src/
  styles/global.css        # グローバルスタイル（色変数・共通要素）
  components/
    BaseHead.astro         # <head>タグ（Google Fontsの読み込みもここ）
    Header.astro           # ヘッダー（Kaisei Decorロゴ）
    Footer.astro           # フッター
    ProductCard.astro      # アフィリエイト商品カード
  layouts/
    BlogPost.astro         # 記事ページレイアウト
  pages/
    blog/index.astro       # 記事一覧（写真ヒーロー＋2カラムカード）
    index.astro            # トップページ
  content/blog/            # 記事ファイル（.md / .mdx）
```
