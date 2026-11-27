(function () {
  const data = window.demoData;
  const toast = document.querySelector("#toast");
  const sidebar = document.querySelector("#sidebar");
  const pageTitle = document.querySelector("#pageTitle");
  const viewNames = { home: "主页", industry: "行业推演", ranking: "排行榜" };
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
  }

  function showView(name, updateHash = true) {
    if (name === "knowledge") name = "industry";
    document.querySelectorAll("[data-view]").forEach((view) => view.classList.toggle("is-visible", view.dataset.view === name));
    document.querySelectorAll("[data-nav]").forEach((item) => item.classList.toggle("is-active", item.dataset.nav === name));
    pageTitle.textContent = viewNames[name] || "主页";
    sidebar.classList.remove("is-open");
    if (updateHash) window.history.replaceState(null, "", `#${name}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.querySelectorAll("[data-nav]").forEach((item) => item.addEventListener("click", () => showView(item.dataset.nav)));
  document.querySelectorAll("[data-jump]").forEach((item) => item.addEventListener("click", () => showView(item.dataset.jump)));
  document.querySelector("#openMenu").addEventListener("click", () => sidebar.classList.add("is-open"));
  document.querySelector("#closeMenu").addEventListener("click", () => sidebar.classList.remove("is-open"));

  function renderSaved() {
    const target = document.querySelector("#savedList");
    if (!target) return;
    target.innerHTML = data.saved.map((item, index) => `
      <article class="saved-item"><span class="saved-index">0${index + 1}</span><span class="saved-tone saved-tone--${item.tone}"></span><div><span class="saved-type">${item.type}</span><strong>${item.title}</strong><small>${item.meta}</small></div><button class="saved-open" type="button" data-jump="ranking">查看 ↗</button></article>
    `).join("");
    target.querySelectorAll("[data-jump]").forEach((item) => item.addEventListener("click", () => showView(item.dataset.jump)));
  }

  function renderPath() {
    const target = document.querySelector("#pathMap");
    target.innerHTML = data.pathNodes.map((node, index) => `
      <article class="path-node ${index > 3 ? "is-muted" : ""}"><div class="node-dot"></div><span class="node-phase">${node.phase}</span><strong>${node.title}</strong><p>${node.desc}</p></article>
    `).join("");
  }

  function renderEvidence() {
    const target = document.querySelector("#evidenceGrid");
    target.innerHTML = data.evidence.map((item) => `
      <article class="evidence-card"><div class="evidence-top"><span class="evidence-type">${item.type}</span><span class="evidence-likes">♥ ${item.likes}</span></div><blockquote>“${item.quote}”</blockquote><div class="evidence-footer"><small>${item.author}<br />${item.source}</small><a href="https://www.zhihu.com" target="_blank" rel="noreferrer">查看来源 ↗</a></div></article>
    `).join("");
  }

  function renderAgents() {
    const target = document.querySelector("#agentsRow");
    target.innerHTML = data.agents.map((agent) => `
      <article class="agent-card"><div class="agent-top"><span class="agent-avatar">${agent.avatar}</span><span class="agent-role">${agent.role}</span></div><h3>${agent.title}</h3><p>${agent.desc}</p><span class="agent-stance">${agent.stance}</span></article>
    `).join("");
  }

  function renderRanking(filter = "all") {
    const target = document.querySelector("#rankingList");
    const rows = data.ranking.filter((item) => filter === "all" || item.category === filter);
    target.innerHTML = rows.map((item) => `
      <article class="ranking-row"><span class="ranking-number">${item.rank}</span><span class="ranking-tag">${item.tag}</span><div class="ranking-content"><strong>${item.title}</strong><small>${item.author}</small></div><span class="ranking-likes">♥ ${item.likes}<small>${item.trend}</small></span><button class="ranking-more" type="button" aria-label="查看 ${item.title}">↗</button></article>
    `).join("");
  }

  document.querySelectorAll(".ranking-tab").forEach((button) => button.addEventListener("click", () => {
    document.querySelectorAll(".ranking-tab").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    renderRanking(button.dataset.rankFilter);
  }));

  function restart() {
    showView("home");
    showToast("已回到主页，可以开始新的推演。");
  }

  document.querySelector("#restartTop").addEventListener("click", restart);
  renderSaved(); renderAgents(); renderRanking();
  const initialView = window.location.hash.slice(1);
  if (viewNames[initialView]) showView(initialView, false);
})();
