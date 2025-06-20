# MyLink – コヤマ@SWC のリンクまとめ

1 ページ完結型リンク集 (lit.link ライク) のソースコードです。GitHub Pages にデプロイすることで、無料で公開できます。

## 公開手順 (GitHub Pages)

1. **リポジトリ設定を開く**  
   GitHub で本リポジトリページを開き、上部メニューの `Settings` をクリックします。

2. **Pages メニューへ移動**  
   左サイドバーの "Pages"（または "Pages and deployment"）を選択します。

3. **Branch を選択**  
   "Build and deployment" セクション → `Source` のプルダウンで `Deploy from a branch` を選択し、
   Branch を `main`、Folder を `/ (root)` に設定して **Save** します。

4. **公開 URL を確認**  
   数十秒〜数分でビルドが完了すると、同じ画面に `Your site is live at ...` と URL が表示されます。  
   その URL があなたの MyLink ページです。

5. **カスタムドメイン (任意)**  
   ドメインをお持ちの場合は "Custom domain" に入力し、DNS 設定で `CNAME` レコードを `koyama-swc.github.io` に向けてください。

---

## プロジェクト構成

```
my-link/
├── index.html          # メインページ
├── style.css           # スタイルシート
├── script.js           # リンク生成 & SW 登録
├── links.json          # リンク定義 (編集すると自動反映)
├── manifest.json       # PWA マニフェスト
├── service-worker.js   # キャッシュ制御
├── assets/
│   ├── avatar.png      # プロフィール画像
│   └── ...             # 背景画像など自由に追加
└── README.md           # このファイル
```

## 追加カスタマイズ

- **プロフィール画像** : `assets/avatar.png` を差し替え。
- **リンクの背景画像** : `assets/画像名` を追加し、`links.json` 各項目に `"bg": "assets/画像名"` を追記。
- **オフラインページ** : `offline.html` を編集してオリジナルメッセージを表示可能。

## 開発用ローカルサーバー

```bash
# プロジェクトルートで実行
python -m http.server 8080
```

ブラウザで `http://127.0.0.1:8080/` を開き、変更を即座に確認できます。

---

© 2025 Koyama SWC
