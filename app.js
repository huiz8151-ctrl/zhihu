(function () {
  const data = window.demoData;
  const toast = document.querySelector("#toast");
  const sidebar = document.querySelector("#sidebar");
  const appShell = document.querySelector(".app-shell--sidebar");
  const workspaceMain = document.querySelector("#workspaceMain");
  const sidebarToggle = document.querySelector("#toggleSidebar");
  const pageTitle = document.querySelector("#pageTitle");
  const viewNames = { home: "主页", knowledge: "知识学习", ranking: "我的问题" };
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
  }

  function showView(name, updateHash = true) {
    const nextName = viewNames[name] ? name : "home";
    document.querySelectorAll("[data-view]").forEach((view) => view.classList.toggle("is-visible", view.dataset.view === nextName));
    document.querySelectorAll("[data-nav]").forEach((item) => item.classList.toggle("is-active", item.dataset.nav === nextName));
    pageTitle.textContent = viewNames[nextName];
    if (nextName === "ranking") showQuestionScreen("list");
    sidebar.classList.remove("is-open");
    if (updateHash) window.history.replaceState(null, "", `#${nextName}`);
    workspaceMain?.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.querySelectorAll("[data-nav]").forEach((item) => item.addEventListener("click", () => showView(item.dataset.nav)));
  document.querySelectorAll("[data-jump]").forEach((item) => item.addEventListener("click", () => showView(item.dataset.jump)));
  document.querySelector("#openMenu").addEventListener("click", () => sidebar.classList.add("is-open"));
  document.querySelector("#closeMenu").addEventListener("click", () => sidebar.classList.remove("is-open"));

  function setSidebarCollapsed(collapsed, persist = true) {
    if (!appShell || !sidebarToggle) return;
    appShell.classList.toggle("is-sidebar-collapsed", collapsed);
    sidebarToggle.textContent = collapsed ? "›" : "‹";
    sidebarToggle.setAttribute("aria-expanded", String(!collapsed));
    sidebarToggle.setAttribute("aria-label", collapsed ? "展开侧栏" : "收起侧栏");
    if (persist) {
      try { window.localStorage.setItem("zhitu-sidebar-collapsed", String(collapsed)); } catch (error) { /* demo can continue without persistence */ }
    }
  }

  if (sidebarToggle) {
    let collapsed = false;
    try { collapsed = window.localStorage.getItem("zhitu-sidebar-collapsed") === "true"; } catch (error) { /* demo can continue without persistence */ }
    setSidebarCollapsed(collapsed, false);
    sidebarToggle.addEventListener("click", () => setSidebarCollapsed(!appShell.classList.contains("is-sidebar-collapsed")));
  }

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

  const typeLabels = { answer: "高赞回答", comment: "关键评论", manual: "人工添加" };
  const stanceLabels = { support: "支持基础", practice: "支持实践", parallel: "基础与实践并行", opposition: "反对直接跳过基础", neutral: "中立观察" };
  const currentQuestionId = "question-ai-path";
  let currentExperienceFilter = "all";
  const debatePool = new Set();

  function escapeHtml(value = "") {
    return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  }

  function formatLikes(likes) {
    if (!likes) return "—";
    return likes >= 1000 ? `${(likes / 1000).toFixed(likes % 1000 ? 1 : 0)}K` : String(likes);
  }

  function getExperienceScore(item) {
    return (item.likes || 0) * 0.4 + (item.relevance || 0) * 100 * 0.6;
  }

  function matchesExperienceFilter(item, filter) {
    if (filter === "all") return true;
    if (filter === "answer" || filter === "comment") return item.type === filter;
    return true;
  }

  function getCurrentExperiences() {
    return data.experiences.filter((item) => item.questionId === currentQuestionId);
  }

  function renderQuestionList() {
    const target = document.querySelector("#userQuestionList");
    if (!target) return;
    target.innerHTML = data.questions.map((question, index) => `
      <article class="user-question-card" data-question-id="${escapeHtml(question.id)}">
        <div class="user-question-index">0${index + 1}</div>
        <div class="user-question-main"><span class="question-card-status">${escapeHtml(question.status || "已保存")}</span><h3>${escapeHtml(question.title)}</h3><div class="user-question-meta"><span>${escapeHtml(question.source)}</span><span>已整理 ${question.experienceCount} 条经验</span><span>更新于 ${escapeHtml(question.updatedAt)}</span></div></div>
        <button class="question-card-action" type="button" data-open-question="${escapeHtml(question.id)}">查看经验 <span>→</span></button>
      </article>
    `).join("");
    target.querySelectorAll("[data-open-question]").forEach((button) => button.addEventListener("click", () => showQuestionDetail(button.dataset.openQuestion)));
    target.querySelectorAll(".user-question-card").forEach((card) => card.addEventListener("click", (event) => { if (!event.target.closest("button")) showQuestionDetail(card.dataset.questionId); }));
  }

  function showQuestionScreen(screen) {
    const list = document.querySelector("#questionListScreen");
    const detail = document.querySelector("#questionDetailScreen");
    const showDetail = screen === "detail";
    list.classList.toggle("is-visible", !showDetail);
    detail.classList.toggle("is-visible", showDetail);
    detail.setAttribute("aria-hidden", String(!showDetail));
  }

  function showQuestionDetail(questionId = currentQuestionId) {
    const question = data.questions.find((item) => item.id === questionId) || data.questions[0];
    if (!question) return;
    document.querySelector("#detailQuestionTitle").textContent = question.title;
    document.querySelector("#experienceCount").textContent = getCurrentExperiences().length;
    showQuestionScreen("detail");
    renderRanking("all");
  }

  function renderRanking(filter = currentExperienceFilter) {
    currentExperienceFilter = filter;
    const target = document.querySelector("#rankingList");
    const rows = getCurrentExperiences().filter((item) => matchesExperienceFilter(item, filter)).sort((a, b) => getExperienceScore(b) - getExperienceScore(a));
    target.innerHTML = rows.length ? rows.map((item, index) => {
      const type = typeLabels[item.type] || item.tag;
      const stance = stanceLabels[item.stance] || item.stanceLabel || "未分类";
      const inPool = debatePool.has(item.id);
      const sourceAction = item.sourceUrl ? `<a class="experience-source-link" href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noreferrer">查看原文 ↗</a>` : `<span class="experience-source-link is-muted">暂无链接</span>`;
      return `<article class="experience-row"><div class="experience-index">${String(index + 1).padStart(2, "0")}</div><div class="experience-main"><div class="experience-meta"><span class="experience-type experience-type--${item.type}">${escapeHtml(type)}</span><span class="experience-stance">${escapeHtml(stance)}</span><span class="experience-relevance">相关度 ${item.relevance || 0}%</span></div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.content)}</p><div class="experience-footer"><span>${escapeHtml(item.author)} · ${escapeHtml(item.sourceLabel)}</span><span class="experience-actions">${sourceAction}<button class="pool-button ${inPool ? "is-added" : ""}" type="button" data-pool-id="${escapeHtml(item.id)}">${inPool ? "已加入辩论池" : "加入辩论池 ＋"}</button></span></div></div><div class="experience-likes"><strong>♥ ${formatLikes(item.likes)}</strong><small>${item.type === "manual" ? "手动添加" : "赞同"}</small></div></article>`;
    }).join("") : `<div class="empty-experience">当前筛选下还没有经验，试试切换标签或手动添加一条。</div>`;
    target.querySelectorAll("[data-pool-id]").forEach((button) => button.addEventListener("click", () => {
      const id = button.dataset.poolId;
      if (debatePool.has(id)) { debatePool.delete(id); showToast("已从辩论池移除。"); } else { debatePool.add(id); showToast("已加入 Agent 辩论池。"); }
      renderRanking(currentExperienceFilter);
      updateExperienceInsights();
    }));
    updateExperienceInsights();
  }

  function updateExperienceInsights() {
    const experiences = getCurrentExperiences();
    const count = (stance) => experiences.filter((item) => item.stance === stance).length;
    const countNode = document.querySelector("#experienceCount");
    if (countNode) countNode.textContent = experiences.length;
    const currentQuestion = data.questions.find((question) => question.id === currentQuestionId);
    if (currentQuestion) currentQuestion.experienceCount = experiences.length;
    renderQuestionList();
    const debateCount = document.querySelector("#debateCount");
    if (debateCount) debateCount.textContent = debatePool.size;
    const stats = { support: count("support"), practice: count("practice"), parallel: count("parallel") };
    Object.entries(stats).forEach(([key, value]) => {
      const node = document.querySelector(`[data-stance-count="${key}"]`);
      if (node) node.textContent = value;
    });
  }

  function loadManualExperiences() {
    try {
      const stored = JSON.parse(window.localStorage.getItem("zhitu-manual-experiences") || "[]");
      if (Array.isArray(stored)) data.experiences = [...stored.map((item) => ({ ...item, questionId: item.questionId || currentQuestionId })), ...data.experiences.filter((item) => item.addedBy !== "user")];
    } catch (error) {
      // Local storage can be unavailable when the file is opened directly.
    }
  }

  function saveManualExperiences() {
    try { window.localStorage.setItem("zhitu-manual-experiences", JSON.stringify(data.experiences.filter((item) => item.addedBy === "user"))); } catch (error) { /* demo can continue without persistence */ }
  }

  function setModal(open) {
    const modal = document.querySelector("#evidenceModal");
    modal.classList.toggle("is-open", open);
    modal.setAttribute("aria-hidden", String(!open));
    if (open) document.querySelector("#manualContent").focus();
  }

  function bindEvidenceModal() {
    document.querySelector("#openEvidenceModal").addEventListener("click", () => setModal(true));
    document.querySelector("#closeEvidenceModal").addEventListener("click", () => setModal(false));
    document.querySelector("#cancelEvidence").addEventListener("click", () => setModal(false));
    document.querySelector("#evidenceModal").addEventListener("click", (event) => { if (event.target.id === "evidenceModal") setModal(false); });
    document.querySelector("#evidenceForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const content = document.querySelector("#manualContent").value.trim();
      if (!content) return;
      const type = document.querySelector("#manualType").value;
      const stance = document.querySelector("#manualStance").value;
      const sourceUrl = document.querySelector("#manualSource").value.trim();
      const newExperience = { id: `manual-${Date.now()}`, questionId: currentQuestionId, type, source: "user", tag: "人工添加", title: content.length > 28 ? `${content.slice(0, 28)}…` : content, content, author: "我的经验", sourceLabel: "本地手动添加", sourceUrl, likes: 0, relevance: 0, stance, stanceLabel: stanceLabels[stance], addedBy: "user" };
      data.experiences.unshift(newExperience);
      saveManualExperiences();
      setModal(false);
      document.querySelector("#evidenceForm").reset();
      renderRanking(currentExperienceFilter);
      showToast("经验已添加到当前问题。");
    });
  }

  function bindForms() {
    const questionInput = document.querySelector("#questionInput");
    document.querySelectorAll(".example-chip").forEach((button) => button.addEventListener("click", () => {
      questionInput.value = button.dataset.question;
      questionInput.focus();
      showToast("已替换为这个问题，你可以继续调整。");
    }));
    document.querySelectorAll(".goal-option").forEach((button) => button.addEventListener("click", () => {
      document.querySelectorAll(".goal-option").forEach((item) => item.classList.remove("is-selected"));
      button.classList.add("is-selected");
    }));
    document.querySelector("#questionForm").addEventListener("submit", (event) => {
      event.preventDefault();
      if (!questionInput.value.trim()) { questionInput.focus(); showToast("先写下一个你真正想解决的问题吧。"); return; }
      showView("knowledge");
      showToast("正在结合知乎经验和你的背景生成路径……");
    });
  }

  document.querySelectorAll(".ranking-tab").forEach((button) => button.addEventListener("click", () => {
    document.querySelectorAll(".ranking-tab").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    renderRanking(button.dataset.rankFilter);
  }));

  document.querySelector("#importQuestion").addEventListener("click", () => showToast("已导入当前问题的演示回答摘要。"));
  document.querySelector("#backToQuestions").addEventListener("click", () => showQuestionScreen("list"));
  document.querySelector("#newQuestion").addEventListener("click", () => { showView("knowledge"); showToast("先写下你的问题，再生成一条新的学习路径。"); });

  loadManualExperiences();
  renderSaved(); renderPath(); renderEvidence(); renderQuestionList(); renderRanking(); bindForms(); bindEvidenceModal(); showQuestionScreen("list");
  const initialView = window.location.hash.slice(1);
  if (viewNames[initialView]) showView(initialView, false);
})();
