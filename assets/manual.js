/* =========================================================
   社内マニュアル 共通スクリプト
   ・チェックボックスの状態をこの端末に保存（ページを閉じても残る）
   ・セクション内のチェックが全部付いたら目次に ✔ を表示
   ・一覧ページの検索
   ========================================================= */
(function () {
  var key = "manual-check:" + location.pathname;

  function load() {
    try { return JSON.parse(localStorage.getItem(key) || "{}"); } catch (e) { return {}; }
  }
  function save(state) {
    try { localStorage.setItem(key, JSON.stringify(state)); } catch (e) { /* 保存できない環境でも動作は継続 */ }
  }

  function updateToc() {
    document.querySelectorAll(".toc a[href^='#']").forEach(function (a) {
      var sec = document.querySelector(a.getAttribute("href"));
      if (!sec) return;
      var boxes = sec.querySelectorAll(".check input[type=checkbox]");
      var all = boxes.length > 0 && Array.prototype.every.call(boxes, function (b) { return b.checked; });
      a.classList.toggle("done", all);
    });
  }

  var state = load();
  document.querySelectorAll(".check input[type=checkbox]").forEach(function (box, i) {
    var id = box.id || "c" + i;
    box.checked = !!state[id];
    box.addEventListener("change", function () {
      state[id] = box.checked;
      save(state);
      updateToc();
    });
  });
  updateToc();

  var reset = document.getElementById("reset-check");
  if (reset) {
    reset.addEventListener("click", function () {
      if (!confirm("チェックをすべて外します。よろしいですか？")) return;
      state = {};
      save(state);
      document.querySelectorAll(".check input[type=checkbox]").forEach(function (b) { b.checked = false; });
      updateToc();
    });
  }

  var printBtn = document.getElementById("print-page");
  if (printBtn) printBtn.addEventListener("click", function () { window.print(); });

  /* 一覧ページの検索 */
  var search = document.getElementById("search");
  if (search) {
    search.addEventListener("input", function () {
      var q = search.value.trim().toLowerCase();
      document.querySelectorAll(".cards .card").forEach(function (c) {
        c.style.display = !q || c.textContent.toLowerCase().indexOf(q) >= 0 ? "" : "none";
      });
    });
  }
})();
