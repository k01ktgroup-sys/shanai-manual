# 社内マニュアル（WEB版）

📘 マニュアルの作り方・注意事項は **[GUIDE.md（作成ガイド）](GUIDE.md)** を見てください。

## 公開URL（GitHub Pages）

- マニュアル一覧： https://k01ktgroup-sys.github.io/shanai-manual/
- 機種変更マニュアル： https://k01ktgroup-sys.github.io/shanai-manual/manuals/smartphone-kishuhenko/
- 保存場所： https://github.com/k01ktgroup-sys/shanai-manual

※ URLを知っている人は誰でも見られます。パスワードなどの秘密情報は書かないでください。
（検索エンジンには載らないよう設定しています）

## フォルダ構成

```
shanai-manual/
├─ README.md            この説明書
├─ index.html           マニュアル一覧（トップページ）
├─ assets/              全マニュアル共通のデザイン（style.css）と動き（manual.js）
├─ _template/           新しいマニュアルのひな形
└─ manuals/             マニュアル本体（1本＝1フォルダ）
    └─ smartphone-kishuhenko/   スマホの機種変更（SCV46 → Galaxy A25 5G）
        ├─ index.html
        └─ images/              実機の画面写真
```

各フォルダにある `CLAUDE.md` は、Claude に作業してもらうときのメモです（GitHubには公開されません）。

## マニュアルを追加する方法

1. `_template` フォルダを `manuals` フォルダの中にコピーし、英数字の名前に変える
   - 名前は「分野-内容」にします。例：`virusbuster-koshin`、`pc-printer-settei`
2. 中の `index.html` を書きかえる
3. トップの `index.html` のカードをコピーして、リンク先を `manuals/新しいフォルダ名/index.html` にする

### Claude に頼む場合

チャット欄の先頭に **`/web-manual`** と入れて依頼します。どのフォルダ・環境のチャットからでも使えます。

```
/web-manual ウイルスバスター更新のマニュアルを作りたい
/web-manual 機種変更マニュアルのSTEP3の続きです（このあと写真を送る）
```

`/web-manual` を付けない依頼は、WEBに公開しないマニュアルとして扱われます。

## 書きかえたあと公開に反映する方法

このフォルダで次のコマンドを実行します（1〜2分で反映されます）。

```
git add -A
git commit -m "変更内容のメモ"
git push
```

GitHub のブラウザ画面で直接ファイルを直すこともできます（鉛筆マーク → Commit changes）。

## 画面写真の差し替え

今の画面イメージはHTMLで描いた「見本」です。実機の画面に差し替える場合：

1. そのマニュアルの `images/` フォルダに画像（PNG/JPG）を入れる
2. 差し替えたい `<figure class="shot">` の中身を次のように書きかえる

```html
<figure class="shot">
  <figcaption><span class="who new">新しいスマホ</span></figcaption>
  <img src="images/step2-1.png" alt="開始ボタン">
</figure>
```

## 本社で書きかえが必要な箇所（機種変更マニュアル）

点線の枠（📝マーク）が本社記入欄です。

- 連絡先の電話番号（ページ最下部「困ったとき」）
- 新しいSIMカードを配る場合の案内（STEP 2）
- 画面ロック番号の扱い（STEP 3）
- 古いスマホの返却方法（STEP 5）
