/* 分類（絞り込み）の保存先：Google Apps Script のWebアプリのURL（/exec で終わる）
   ※パスワードなどの秘密は書かない。URLが変わったらここだけ直す */
window.MANUAL_API_URL = "https://script.google.com/macros/s/AKfycbwwqH6cTANgyw4ocJm4j83WUotDcQh6EWppaP6VEr4FGShU0V4svfJC_vNo6UuqmY0QjQ/exec";

/* 絞り込みの選択肢（_gas/コード.js の DEPTS・TYPES と同じにする） */
window.MANUAL_DEPTS = ["本部", "事務", "訪問介護", "居宅介護", "訪問入浴", "福祉用具", "訪問看護"];
window.MANUAL_TYPES = ["パソコン", "スマホ", "ケアプラン連携システム", "その他"];
