/*
 * Docu Web / Paper Index system
 * OneKit-only runtime: reactive state + effects drive search, active navigation,
 * copy feedback, and mobile drawer behavior. React is not used by this entrypoint.
 */
import { reactive, effect } from "onekit-js";
import "./index.css";

const state = reactive({
  query: "",
  active: "overview",
  copied: false,
  mobileOpen: false,
});

const sections = [
  { id: "overview", label: "Overview", group: "Start here", number: "01" },
  { id: "installation", label: "Installation", group: "Start here", number: "02" },
  { id: "reactive", label: "Reactive state", group: "Core concepts", number: "03" },
  { id: "components", label: "Components", group: "Core concepts", number: "04" },
  { id: "routing", label: "Routing", group: "Core concepts", number: "05" },
  { id: "production", label: "Production", group: "Ship it", number: "06" },
];

const icon = (name: string) => {
  const paths: Record<string, string> = {
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    arrow: '<path d="M5 12h13"/><path d="m13 6 6 6-6 6"/>',
    copy: '<rect x="9" y="9" width="10" height="10" rx="2"/><path d="M15 9V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    external: '<path d="M14 5h5v5"/><path d="m19 5-8 8"/><path d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true" class="ui-icon">${paths[name] ?? ""}</svg>`;
};

const logo = `<div class="brand-mark" aria-hidden="true"><span></span><i></i></div>`;

function renderShell() {
  document.body.innerHTML = `
    <div class="site-frame">
      <header class="topbar">
        <a class="wordmark" href="#overview" data-section="overview">${logo}<span>docu<span class="wordmark-accent">web</span></span></a>
        <div class="topbar-meta"><span class="version-pill">ONEKIT JS · V3</span><a href="https://github.com/hidecard/onekit-js" target="_blank" rel="noreferrer">GitHub ${icon("external")}</a><button class="mobile-menu" aria-label="Open navigation">${icon("menu")}</button></div>
      </header>
      <div class="content-frame">
        <aside class="sidebar" aria-label="Documentation navigation">
          <div class="sidebar-intro"><span class="eyebrow">The field guide</span><p>Build small, reactive interfaces with a runtime that stays out of your way.</p></div>
          <nav id="sidebar-nav"></nav>
          <div class="sidebar-foot"><span class="status-dot"></span><span>v3.1.13 · MIT licensed</span></div>
        </aside>
        <main class="main-column">
          <section class="hero" id="overview">
            <div class="hero-copy"><span class="eyebrow">A practical guide to OneKit</span><h1>Build once.<br><em>Read it twice.</em></h1><p class="hero-lede">A compact, TypeScript-first reactive framework for browser applications. No ceremony. Just clear primitives that let your interface stay close to the DOM.</p><div class="hero-actions"><a class="button button-dark" href="#installation" data-section="installation">Start with the basics ${icon("arrow")}</a><a class="text-link" href="#reactive" data-section="reactive">Browse the API</a></div></div>
            <div class="hero-art"><img src="/manus-storage/docu-web-hero_7be2b1e9.png" alt="Abstract editorial illustration of a technical guide" /><div class="art-caption"><span>FIG. 01</span><span>OneKit / browser runtime</span></div></div>
          </section>
          <div class="reading-layout"><article class="document" id="document-content">
            <div class="document-meta"><span>DOCUMENTATION / V3</span><span>8 MIN READ</span><span>UPDATED AUG 15, 2026</span></div>
            <div class="search-row"><div class="search-box">${icon("search")}<input id="doc-search" type="search" placeholder="Search the field guide…" aria-label="Search documentation" /><kbd>⌘ K</kbd></div><span id="search-count" class="search-count"></span></div>
            <div id="doc-sections"></div>
          </article><aside class="toc" aria-label="On this page"><span class="eyebrow">On this page</span><div id="toc-links"></div><div class="toc-note"><span class="red-rule"></span><p>Keep the surface small. Let the state do the work.</p></div></aside></div>
          </main>
        </div>
        <footer class="footer"><span>Docu Web / OneKit JS field guide</span><span>Designed for builders who read the source.</span></footer>
      </div>
    </div>`;
}

const sectionMarkup: Record<string, string> = {
  overview: `<section class="doc-section" data-id="overview"><div class="section-kicker"><span>01</span><span>START HERE</span></div><h2>The short version</h2><p>OneKit is a small browser runtime for interfaces that need to feel immediate. It gives you reactive state, components, templates, routing, stores, SSR, and Vite tooling without asking you to adopt a large application architecture.</p><div class="principle-grid"><div><span class="principle-no">A</span><strong>Explicit</strong><p>Import the primitives you use. Keep the mental model visible.</p></div><div><span class="principle-no">B</span><strong>Reactive</strong><p>State changes flow to the DOM through small, disposable effects.</p></div><div><span class="principle-no">C</span><strong>Browser-first</strong><p>Start close to the platform, then add structure as the product grows.</p></div></div></section>`,
  installation: `<section class="doc-section" data-id="installation"><div class="section-kicker"><span>02</span><span>START HERE</span></div><h2>Install the runtime</h2><p>Bring OneKit into an existing Vite or TypeScript app, or create a starter project with the built-in generator. The package ships its own TypeScript declarations.</p><div class="code-card"><div class="code-head"><span>TERMINAL</span><button data-copy="npm install onekit-js">${icon("copy")}<span>Copy</span></button></div><pre><code><span class="code-muted">$</span> npm install onekit-js</code></pre></div><div class="note-card"><span class="note-label">NOTE</span><p>OneKit requires Node.js 18 or newer for the CLI and build tooling. For an app, import public APIs from <code>onekit-js</code>, not internal source paths.</p></div></section>`,
  reactive: `<section class="doc-section" data-id="reactive"><div class="section-kicker"><span>03</span><span>CORE CONCEPTS</span></div><h2>Start with the smallest reactive surface</h2><p>Wrap state, read it in an effect, and let OneKit schedule the update. The result is direct enough to debug and structured enough to scale.</p><div class="code-card"><div class="code-head"><span>src/main.ts</span><button data-copy="state.count += 1">${icon("copy")}<span>Copy</span></button></div><pre><code><span class="kw">import</span> { reactive, effect } <span class="kw">from</span> <span class="str">"onekit-js"</span>;

<span class="kw">const</span> state = reactive({ count: <span class="num">0</span> });

effect(() =&gt; {
  document.querySelector(<span class="str">"#count"</span>)!.textContent =
    String(state.count);
});

state.count += <span class="num">1</span>;</code></pre></div></section>`,
  components: `<section class="doc-section" data-id="components"><div class="section-kicker"><span>04</span><span>CORE CONCEPTS</span></div><h2>Components with a clear exit</h2><p>Use components when a piece of UI owns state, lifecycle, or a reusable view. Disposable scopes keep effects and listeners from leaking when the component leaves the page.</p><div class="quote-block"><span>“</span><p>For most applications, prefer a component or disposable scope so the effect is cleaned up automatically.</p></div></section>`,
  routing: `<section class="doc-section" data-id="routing"><div class="section-kicker"><span>05</span><span>CORE CONCEPTS</span></div><h2>Routes that explain themselves</h2><p>Choose history or hash mode for browser applications, and memory mode for tests or non-browser environments. If you use history mode, configure the server to return the app entrypoint for client-side routes.</p><div class="route-list"><div><span class="route-method">GET</span><code>/guide/reactive</code><span>Reactive state guide</span></div><div><span class="route-method">GET</span><code>/api/components</code><span>Component reference</span></div></div></section>`,
  production: `<section class="doc-section" data-id="production"><div class="section-kicker"><span>06</span><span>SHIP IT</span></div><h2>Production checklist</h2><p>Before publishing, run the same checks that protect the package: type-checking, tests, a clean build, and package verification.</p><div class="checklist"><div><span>01</span><strong>Type-check</strong><code>npm run type-check</code></div><div><span>02</span><strong>Test</strong><code>npm test -- --runInBand</code></div><div><span>03</span><strong>Build</strong><code>npm run build</code></div></div></section>`,
};

function renderNavigation() {
  const grouped = sections.reduce<Record<string, typeof sections>>((acc, item) => { (acc[item.group] ??= []).push(item); return acc; }, {});
  const nav = document.querySelector("#sidebar-nav");
  if (!nav) return;
  nav.innerHTML = Object.entries(grouped).map(([group, items]) => `<div class="nav-group"><span class="nav-group-label">${group}</span>${items.map((item) => `<a class="nav-item ${state.active === item.id ? "is-active" : ""}" href="#${item.id}" data-section="${item.id}"><span>${item.number}</span>${item.label}</a>`).join("")}</div>`).join("");
  nav.querySelectorAll<HTMLElement>("[data-section]").forEach((item) => item.addEventListener("click", () => { state.active = item.dataset.section ?? "overview"; state.mobileOpen = false; }));
}

function renderDocument() {
  const target = document.querySelector("#doc-sections");
  const count = document.querySelector("#search-count");
  if (!target || !count) return;
  const query = state.query.trim().toLowerCase();
  const visible = sections.filter((section) => !query || section.label.toLowerCase().includes(query) || sectionMarkup[section.id].toLowerCase().includes(query));
  target.innerHTML = visible.length ? visible.map((section) => sectionMarkup[section.id]).join("") : `<div class="empty-state"><span>NO MATCHES</span><h3>Nothing in the field guide yet.</h3><p>Try “reactive”, “routing”, or “install”.</p></div>`;
  count.textContent = query ? `${visible.length} result${visible.length === 1 ? "" : "s"}` : "";
  target.querySelectorAll<HTMLElement>("[data-copy]").forEach((button) => button.addEventListener("click", async () => { await navigator.clipboard?.writeText(button.dataset.copy ?? ""); state.copied = true; setTimeout(() => state.copied = false, 1400); }));
}

function renderToc() {
  const toc = document.querySelector("#toc-links");
  if (!toc) return;
  toc.innerHTML = sections.map((item) => `<a class="toc-link ${state.active === item.id ? "is-active" : ""}" href="#${item.id}" data-section="${item.id}">${item.label}</a>`).join("");
  toc.querySelectorAll<HTMLElement>("[data-section]").forEach((item) => item.addEventListener("click", () => { state.active = item.dataset.section ?? "overview"; }));
}

renderShell();
renderNavigation();
renderDocument();
renderToc();

document.querySelector("#doc-search")?.addEventListener("input", (event) => { state.query = (event.target as HTMLInputElement).value; });
document.querySelector(".mobile-menu")?.addEventListener("click", () => { state.mobileOpen = !state.mobileOpen; });
document.addEventListener("keydown", (event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); document.querySelector<HTMLInputElement>("#doc-search")?.focus(); } });
document.querySelectorAll<HTMLElement>("[data-section]").forEach((item) => item.addEventListener("click", () => { state.active = item.dataset.section ?? "overview"; }));

effect(() => {
  renderNavigation();
  renderDocument();
  renderToc();
  document.querySelector(".sidebar")?.classList.toggle("is-open", state.mobileOpen);
  document.querySelectorAll<HTMLElement>("[data-copy] span").forEach((label) => { if (state.copied) label.textContent = "Copied"; });
});
