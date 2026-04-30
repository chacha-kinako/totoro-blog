# totoro-blog デザイン仕様書

参考イメージ：どんぐり共和国（シンプル・温かみ・ナチュラル）

---

## カラーパレット

| 変数名 | カラーコード | 用途 |
|--------|------------|------|
| `--green` | `#4a7a5a` | メインカラー（ボタン、ボーダー） |
| `--green-dark` | `#2d5a3d` | 濃い緑（見出し、ロゴ） |
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

- フォント：`system-ui, -apple-system, 'Hiragino Sans', 'Yu Gothic UI', sans-serif`
- 本文サイズ：17px（モバイルは15px）
- 行間：1.85
- h1: 2em / h2: 1.55em / h3: 1.2em

---

## 主要コンポーネント

### ヘッダー（Header.astro）
- 白背景、下に緑ボーダー3px、sticky
- ロゴ：`--green-dark`、左配置
- ナビ：テキストリンク、ホバーで `--green-pale` 背景

### ブログ一覧ページ ヘッダー帯（blog/index.astro）
- **帯状（全幅）**：`width: 100vw; margin-left: calc(50% - 50vw);`
- グラデーション：`--green-dark` → `--green` → `#6a9a72`
- 白テキスト、タイトル1.5em太字

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

### やること
- CSS のみで装飾（グラデーション、ボーダー、シャドウ）
- ナチュラルなクリーム・緑・どんぐり色を組み合わせる
- カード要素にホバーエフェクト（浮き上がり）

### やらないこと
- 絵文字を CSS の `content` に使わない
- ネオン・蛍光色は使わない
- 過剰なアニメーション

---

## ファイル構成

```
src/
  styles/global.css        # グローバルスタイル（色変数・共通要素）
  components/
    Header.astro           # ヘッダー
    Footer.astro           # フッター
    ProductCard.astro      # アフィリエイト商品カード
  layouts/
    BlogPost.astro         # 記事ページレイアウト
  pages/
    blog/index.astro       # 記事一覧ページ
    index.astro            # トップページ
  content/blog/            # 記事ファイル（.md / .mdx）
```
