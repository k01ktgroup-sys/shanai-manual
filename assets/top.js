/* =========================================================
   トップページ（マニュアル一覧）の絞り込みとキーワード検索
   ・分類は Google スプレッドシートから読む（assets/config.js の MANUAL_API_URL）
   ・読めないときは一覧だけ表示し、絞り込みボタンは隠す
   ========================================================= */
(function () {
  var API = window.MANUAL_API_URL || "";
  var DEPTS = window.MANUAL_DEPTS || [];
  var TYPES = window.MANUAL_TYPES || [];
  var CACHE_KEY = "manual-filter-data";
  var STATE_KEY = "manual-filter-state";

  var cards = Array.prototype.slice.call(document.querySelectorAll(".cards .card"));
  var search = document.getElementById("search");
  var box = document.getElementById("filters");
  var note = document.getElementById("filter-note");
  var empty = document.getElementById("no-result");

  var data = {};          // id -> { depts: [], type: "" }
  var ready = false;      // 分類を読み込めたか
  var state = { dept: "", type: "" };
  try { var s = JSON.parse(sessionStorage.getItem(STATE_KEY) || "null"); if (s) state = s; } catch (e) {}

  function idOf(card) {
    var m = /manuals\/([^/]+)\//.exec(card.getAttribute("href") || "");
    return m ? m[1] : "";
  }

  function apply() {
    var q = search ? search.value.trim().toLowerCase() : "";
    var filtering = ready && (state.dept || state.type);
    var shown = 0;
    cards.forEach(function (c) {
      var ok = !q || c.textContent.toLowerCase().indexOf(q) >= 0;
      if (c.classList.contains("soon")) ok = ok && !filtering && !q;
      else if (filtering) {
        var d = data[idOf(c)];
        if (!d) ok = false;
        if (ok && state.dept) ok = d.depts.indexOf(state.dept) >= 0;
        if (ok && state.type) ok = d.type === state.type;
      }
      c.style.display = ok ? "" : "none";
      if (ok && !c.classList.contains("soon")) shown++;
    });
    if (empty) empty.hidden = shown > 0;
    if (box) box.querySelectorAll("button[data-k]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(state[b.dataset.k] === b.dataset.v));
    });
  }

  function buildRow(label, key, values) {
    var row = document.createElement("div");
    row.className = "filter-row";
    row.setAttribute("role", "group");
    row.setAttribute("aria-label", label);
    var h = document.createElement("span");
    h.className = "filter-label";
    h.textContent = label;
    row.appendChild(h);
    [""].concat(values).forEach(function (v) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "filter-btn";
      b.dataset.k = key;
      b.dataset.v = v;
      b.textContent = v || "全て";
      row.appendChild(b);
    });
    return row;
  }

  function setData(items) {
    data = {};
    (items || []).forEach(function (it) { data[it.id] = { depts: it.depts || [], type: it.type || "" }; });
    ready = true;
    if (box) box.hidden = false;
    if (note) note.hidden = true;
    apply();
  }

  function fail() {
    if (ready) return;           // 前回の分類が残っていればそのまま使う
    if (box) box.hidden = true;
    if (note) note.hidden = false;
    apply();
  }

  if (box) {
    box.innerHTML = "";   // 保存したページを開いたときなど、前のボタンが残っていても2重にしない
    box.appendChild(buildRow("事業部", "dept", DEPTS));
    box.appendChild(buildRow("種類", "type", TYPES));
    box.addEventListener("click", function (ev) {
      var b = ev.target.closest("button[data-k]");
      if (!b) return;
      state[b.dataset.k] = b.dataset.v;
      try { sessionStorage.setItem(STATE_KEY, JSON.stringify(state)); } catch (e) {}
      apply();
    });
  }
  if (search) search.addEventListener("input", apply);

  /* 前回読んだ分類があれば先に使い、裏で最新を読み直す */
  try { var cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null"); if (cached) setData(cached); } catch (e) {}
  apply();

  if (!API) { fail(); return; }
  var done = false;
  var timer = setTimeout(function () { if (!done) fail(); }, 10000);
  fetch(API, { method: "GET" })
    .then(function (r) { return r.json(); })
    .then(function (r) {
      done = true; clearTimeout(timer);
      if (!r || !r.ok) throw new Error("ng");
      try { localStorage.setItem(CACHE_KEY, JSON.stringify(r.items)); } catch (e) {}
      setData(r.items);
    })
    .catch(function () { done = true; clearTimeout(timer); fail(); });
})();
