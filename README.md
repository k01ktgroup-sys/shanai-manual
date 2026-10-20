# 社内マニュアル（WEB版）

## フォルダの中身

| 場所 | 内容 |
|---|---|
| `index.html` | マニュアル一覧（トップページ） |
| `kishuhenko/index.html` | 機種変更マニュアル（SCV46 → Galaxy A25 5G） |
| `_template/index.html` | 新しいマニュアルを作るためのひな形 |
| `assets/style.css` | 全マニュアル共通のデザイン |
| `assets/manual.js` | チェックボックスの保存・印刷ボタン・検索 |

## 公開URL（GitHub Pages）

- マニュアル一覧： https://k01ktgroup-sys.github.io/smartphone-manual/
- 機種変更マニュアル： https://k01ktgroup-sys.github.io/smartphone-manual/kishuhenko/
- 保存場所： https://github.com/k01ktgroup-sys/smartphone-manual

※ URLを知っている人は誰でも見られます。パスワードなどの秘密情報は書かないでください。
（検索エンジンには載らないよう設定しています）

## 書きかえたあと公開に反映する方法

このフォルダで次のコマンドを実行します（1〜2分で反映されます）。

```
git add -A
git commit -m "変更内容のメモ"
git push
```

## 本社で書きかえが必要な箇所（機種変更マニュアル）

点線の枠（📝マーク）が本社記入欄です。

- 連絡先の電話番号（ページ最下部「困ったとき」）
- 新しいSIMカードを配る場合の案内（STEP 3）
- 画面ロック番号の扱い（STEP 2）
- 古いスマホの返却方法（STEP 5）

## スクリーンショットの差し替え

今の画面イメージはHTMLで描いた「見本」です。実機の画面に差し替える場合：

1. `kishuhenko/images/` フォルダを作り、画像（PNG/JPG）を入れる
2. 差し替えたい `<figure class="shot">` の中身を次のように書きかえる

```html
<figure class="shot">
  <figcaption><span class="who new">新しいスマホ</span></figcaption>
  <img src="images/step2-1.png" alt="開始ボタン">
</figure>
```

## マニュアルを追加する方法

1. `_template` フォルダをコピーして名前を変える（英数字。例：`wifi-settei`）
2. 中の `index.html` を書きかえる
3. トップの `index.html` のカードをコピーして、リンク先を新しいフォルダにする
