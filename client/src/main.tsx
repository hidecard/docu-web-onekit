/*
 * Docu Web / Paper Index system
 * OneKit-only runtime: reactive state + effects drive search, active navigation,
 * copy feedback, and mobile drawer behavior. React is not used by this entrypoint.
 */
import { reactive, effect, createRouter } from "onekit-js";
import "./index.css";

const state = reactive({
  query: "",
  active: "overview",
  copied: false,
  mobileOpen: false,
  version: "3.1.16",
  playgroundCode: `const state = reactive({ count: 0 });\neffect(() => output(String(state.count)));\nstate.count += 1;`,
  playgroundOutput: "Run the example to see OneKit react.",
});

const sections = [
  { id: "overview", label: "Overview", group: "Start here", number: "01" },
  { id: "installation", label: "Installation", group: "Start here", number: "02" },
  { id: "reactive", label: "Reactive state", group: "Core concepts", number: "03" },
  { id: "components", label: "Components", group: "Core concepts", number: "04" },
  { id: "routing", label: "Routing", group: "Core concepts", number: "05" },
  { id: "production", label: "Production", group: "Ship it", number: "06" },
  { id: "journey", label: "Learner path", group: "Learn OneKit", number: "07" },
  { id: "features", label: "All features", group: "Learn OneKit", number: "08" },
  { id: "api", label: "API reference", group: "Reference", number: "09" },
  { id: "data", label: "Docu Data", group: "Reference", number: "10" },
];

const versions = {
  "3.1.16": "Current · stable",
  "3.1.x": "V3 minor line",
  "2.x": "Legacy reference",
};

const routeMeta: Record<string, { title: string; description: string; group: string }> = {
  overview: { title: "Overview", description: "A practical introduction to the OneKit browser runtime.", group: "Start here" },
  installation: { title: "Installation", description: "Install OneKit and create your first project.", group: "Start here" },
  reactive: { title: "Reactive state", description: "Build predictable interfaces with reactive primitives.", group: "Core concepts" },
  components: { title: "Components", description: "Compose reusable UI with OneKit components and scopes.", group: "Core concepts" },
  routing: { title: "Routing", description: "Navigate browser applications with the OneKit router.", group: "Core concepts" },
  production: { title: "Production", description: "Type-check, test, build, and ship a OneKit application.", group: "Ship it" },
  journey: { title: "Learner path", description: "A guided path from your first OneKit app to production.", group: "Learn OneKit" },
  features: { title: "All features", description: "A complete learner map of OneKit capabilities.", group: "Learn OneKit" },
  api: { title: "API reference", description: "Read and run OneKit API primitives in the browser.", group: "Reference" },
  data: { title: "Docu Data", description: "Use structured documentation data to keep OneKit guides searchable and maintainable.", group: "Reference" },
};

const sectionPath = (id: string) => id === "overview" ? "/" : `/docs/${id}`;
const pathSection = (path: string) => path === "/" ? "overview" : path.replace("/docs/", "");
const appRouter = createRouter(
  sections.map((section) => ({ path: sectionPath(section.id), handler: () => { state.active = section.id; applyRouteMeta(section.id); } })),
  { mode: "history" },
);
const routerStart = appRouter.start();
appRouter.subscribe((to) => {
  const id = pathSection(to.fullPath);
  state.active = id;
  applyRouteMeta(id);
  requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }));
});

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
        <a class="wordmark" href="/" data-section="overview">${logo}<span>docu<span class="wordmark-accent">web</span></span></a>
        <div class="topbar-meta"><label class="version-control"><span>VERSION</span><select id="version-select" aria-label="Documentation version">${Object.entries(versions).map(([value, label]) => `<option value="${value}" ${state.version === value ? "selected" : ""}>${value} · ${label.split(" · ")[0]}</option>`).join("")}</select></label><span class="version-pill">ONEKIT JS · V3</span><a href="https://github.com/hidecard/onekit-js" target="_blank" rel="noreferrer">GitHub ${icon("external")}</a><button class="mobile-menu" aria-label="Open navigation">${icon("menu")}</button></div>
      </header>
      <div class="content-frame">
        <aside class="sidebar" aria-label="Documentation navigation">
          <div class="sidebar-intro"><span class="eyebrow">The field guide</span><p>Build small, reactive interfaces with a runtime that stays out of your way.</p></div>
          <nav id="sidebar-nav"></nav>
          <div class="sidebar-foot"><span class="status-dot"></span><span>v3.1.16 · MIT licensed</span></div>
        </aside><button class="drawer-backdrop" aria-label="Close navigation" data-close-drawer></button>
        <main class="main-column">
          <section class="hero" id="overview">
            <div class="hero-copy"><span class="eyebrow">A practical guide to OneKit</span><h1>Build once.<br><em>Read it twice.</em></h1><p class="hero-lede">A compact, TypeScript-first reactive framework for browser applications. No ceremony. Just clear primitives that let your interface stay close to the DOM.</p><div class="hero-actions"><a class="button button-dark" href="/docs/journey" data-section="journey">Start the learner path ${icon("arrow")}</a><a class="text-link" href="/docs/features" data-section="features">See all features</a></div><div class="learning-stamp"><span class="stamp-check">✓</span><span><strong>Learning route</strong><small>Beginner → builder → production</small></span></div></div>
            <div class="hero-art"><div class="hero-illustration" role="img" aria-label="Abstract editorial illustration of a technical guide"><svg viewBox="0 0 520 330" aria-hidden="true"><rect width="520" height="330" fill="#f5eddf"/><path d="M104 280h250l-30-170H134z" fill="#1d3540"/><path d="M134 110h190l-18-42H152z" fill="#d85e49"/><path d="M154 112h155v112H154z" fill="#f7f0e4"/><path d="M176 139h91M176 158h111M176 177h82M176 196h101" stroke="#1d3540" stroke-width="6" stroke-linecap="round" opacity=".75"/><path d="M392 58v192M368 82h48M368 116h48M368 150h48M368 184h48" stroke="#d85e49" stroke-width="3" opacity=".8"/><circle cx="390" cy="58" r="9" fill="#1d3540"/><path d="M70 286h370" stroke="#d85e49" stroke-width="2"/><path d="M84 52l32 26-22 30" fill="none" stroke="#1d3540" stroke-width="5"/><circle cx="430" cy="270" r="16" fill="#d85e49"/><circle cx="430" cy="270" r="6" fill="#f5eddf"/></svg></div><div class="art-caption"><span>FIG. 01</span><span>OneKit / browser runtime</span></div></div>
          </section>
          <div class="reading-layout"><article class="document" id="document-content">
            <div id="breadcrumbs" class="breadcrumbs" aria-label="Breadcrumb"></div><div class="document-meta"><span>DOCUMENTATION / V3</span><span>8 MIN READ</span><span>UPDATED AUG 15, 2026</span></div>
            <div class="search-row"><div class="search-box">${icon("search")}<input id="doc-search" type="search" placeholder="Search the field guide…" aria-label="Search documentation" /><kbd>⌘ K</kbd></div><span id="search-count" class="search-count"></span></div>
            <div id="doc-sections"></div>
          </article><aside class="toc" aria-label="On this page"><span class="eyebrow">On this page</span><div id="toc-links"></div><div class="toc-note"><span class="red-rule"></span><p>Keep the surface small. Let the state do the work.</p></div></aside></div>
          </main>
        </div>
        <footer class="footer"><span>Docu Web / OneKit JS field guide</span><span>Developed by Arkar Yan</span></footer>
      </div>
    </div>`;
}

const sectionMarkup: Record<string, string> = {
  overview: `<section class="doc-section" data-id="overview"><div class="section-kicker"><span>01</span><span>START HERE</span></div><h2>The short version</h2><p>OneKit is a small browser runtime for interfaces that need to feel immediate. It gives you reactive state, components, templates, routing, stores, SSR, and Vite tooling without asking you to adopt a large application architecture.</p><div class="principle-grid"><div><span class="principle-no">A</span><strong>Explicit</strong><p>Import the primitives you use. Keep the mental model visible.</p></div><div><span class="principle-no">B</span><strong>Reactive</strong><p>State changes flow to the DOM through small, disposable effects.</p></div><div><span class="principle-no">C</span><strong>Browser-first</strong><p>Start close to the platform, then add structure as the product grows.</p></div></div></section>`,
  installation: `<section class="doc-section" data-id="installation"><div class="section-kicker"><span>02</span><span>START HERE</span></div><h2>Install the runtime</h2><p>Bring OneKit into an existing Vite or TypeScript app, or create a starter project with the built-in generator. The package ships its own TypeScript declarations.</p><div class="code-card"><div class="code-head"><span>TERMINAL</span><button data-copy="npm install onekit-js">${icon("copy")}<span>Copy</span></button></div><pre><code><span class="code-muted">$</span> npm install onekit-js</code></pre></div><div class="note-card"><span class="note-label">NOTE</span><p>OneKit requires Node.js 18 or newer for the CLI and build tooling. For an app, import public APIs from <code>onekit-js</code>, not internal source paths.</p></div></section>`,
  reactive: `<section class="doc-section" data-id="reactive"><div class="section-kicker"><span>03</span><span>CORE CONCEPTS</span></div><h2>Start with the smallest reactive surface</h2><p>Wrap state, read it in an effect, and let OneKit schedule the update. The result is direct enough to debug and structured enough to scale.</p>  <div class="code-card"><div class="code-head"><span>src/main.ts</span><button data-copy="const state = reactive({ count: 0 });\neffect(() => {\n  document.querySelector(\"#count\")!.textContent = String(state.count);\n});\nstate.count += 1;">${icon("copy")}<span>Copy</span></button></div><pre><code><span class="kw">import</span> { reactive, effect } <span class="kw">from</span> <span class="str">"onekit-js"</span>;

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

sectionMarkup.journey = `<section class="doc-section learner-section" data-id="journey"><div class="section-kicker"><span>07</span><span>LEARN ONEKIT</span></div><div class="learner-heading"><div><h2>Learn by building the surface.</h2><p>Follow the path in order or jump to the feature you need. Every stop pairs a plain-language explanation with a small, runnable example.</p></div><span class="level-badge">6 stages</span></div><div class="journey-grid"><a href="/docs/installation" data-section="installation"><span>01</span><strong>First app</strong><small>Install, mount, and make the browser respond.</small></a><a href="/docs/reactive" data-section="reactive"><span>02</span><strong>State</strong><small>Reactive, computed, watched, and batched.</small></a><a href="/docs/components" data-section="components"><span>03</span><strong>UI systems</strong><small>Components, templates, JSX, and VDOM.</small></a><a href="/docs/routing" data-section="routing"><span>04</span><strong>Navigation</strong><small>Routes, stores, plugins, and scopes.</small></a><a href="/docs/features" data-section="features"><span>05</span><strong>Browser tools</strong><small>HTTP, storage, a11y, security, and Web Components.</small></a><a href="/docs/production" data-section="production"><span>06</span><strong>Ship it</strong><small>SSR, hydration, Vite, CLI, tests, and release checks.</small></a></div></section>`;

sectionMarkup.features = `<section class="doc-section learner-section" data-id="features"><div class="section-kicker"><span>08</span><span>LEARN ONEKIT</span></div><div class="learner-heading"><div><h2>OneKit, mapped for learners.</h2><p>Use this catalog as your map. Start with the core, then add the browser and production modules when your app asks for them.</p></div><span class="level-badge">18 areas</span></div><div class="feature-catalog"><div class="feature-cluster"><div class="cluster-head"><span>CORE RUNTIME</span><small>Start here</small></div><div class="feature-row"><code>reactive · computed · effect · watch</code><span>State and dependency tracking</span></div><div class="feature-row"><code>defineComponent · mount · scope</code><span>Components and lifecycle</span></div><div class="feature-row"><code>template · directives · expressions</code><span>Declarative DOM views</span></div><div class="feature-row"><code>h · jsx · render · patch</code><span>JSX, VDOM, and render helpers</span></div></div><div class="feature-cluster"><div class="cluster-head"><span>APP ARCHITECTURE</span><small>Build structure</small></div><div class="feature-row"><code>router · history · hash · memory</code><span>Navigation and route state</span></div><div class="feature-row"><code>store · plugins · DI</code><span>Shared state and composition</span></div><div class="feature-row"><code>scope · errors · loading</code><span>Teardown and boundaries</span></div><div class="feature-row"><code>SSR · hydration</code><span>Server output and client takeover</span></div></div><div class="feature-cluster"><div class="cluster-head"><span>BROWSER + SHIP</span><small>Go further</small></div><div class="feature-row"><code>request · get · post · API</code><span>HTTP helpers</span></div><div class="feature-row"><code>storage · cache · snapshot</code><span>Browser storage and utilities</span></div><div class="feature-row"><code>a11y · security · sanitize</code><span>Accessible, safer interfaces</span></div><div class="feature-row"><code>animation · Web Components · DevTools</code><span>Polish and integration</span></div><div class="feature-row"><code>Vite plugin · CLI · testing</code><span>Developer workflow</span></div></div></div></section>`;

sectionMarkup.data = `<section class="doc-section" data-id="data"><div class="section-kicker"><span>10</span><span>REFERENCE</span></div><h2>Docu Data: one source for the field guide</h2><p>Keep documentation content in structured data before rendering it into navigation, search, cards, and route pages. This prevents the guide from drifting when a new framework API is added.</p><div class="data-grid"><div class="data-card"><span class="data-label">SECTION RECORD</span><code>{ id, label, group, number }</code><p>Navigation metadata drives the sidebar, pagination, breadcrumbs, and route lookup.</p></div><div class="data-card"><span class="data-label">ROUTE RECORD</span><code>{ title, description, group }</code><p>Route metadata keeps document titles and descriptions synchronized with the visible section.</p></div><div class="data-card"><span class="data-label">USAGE RECORD</span><code>{ label, importLine, code, note }</code><p>Usage cards share one renderer, one copy action, and one sandbox runner.</p></div></div><div class="code-card"><div class="code-head"><span>data-first pattern</span><button data-copy="const lessons = [{ id: \"reactive\", label: \"Reactive state\", group: \"Core concepts\" }];\nconst visible = lessons.filter(({ label }) => label.toLowerCase().includes(query));">${icon("copy")}<span>Copy</span></button></div><pre><code><span class="kw">const</span> lessons = [{ id: <span class="str">\"reactive\"</span>, label: <span class="str">\"Reactive state\"</span>, group: <span class="str">\"Core concepts\"</span> }];
<span class="kw">const</span> visible = lessons.filter(({ label }) =&gt; label.toLowerCase().includes(query));</code></pre></div><div class="note-card"><span class="note-label">MAINTENANCE RULE</span><p>When an API changes in <code>onekit-js</code>, update the canonical data and executable example together, then run type-check and production build before publishing.</p></div></section>`;

sectionMarkup.api = `<section class="doc-section api-section" data-id="api"><div class="section-kicker"><span>09</span><span>REFERENCE</span></div><div class="api-heading"><div><h2>API reference, in motion</h2><p>Read the primitive, then change it. This playground runs a safe, browser-only subset of the example so the feedback loop stays visible.</p></div><div class="api-version-badge"><span class="eyebrow">Selected version</span><strong data-version-label>${state.version}</strong><small data-version-description>${versions[state.version as keyof typeof versions]}</small></div></div><div class="api-grid"><div class="api-index"><div class="api-index-head"><span>PUBLIC API</span><span>TYPE</span></div><button class="api-item is-selected" data-api="reactive"><span><code>reactive()</code><small>Proxy-backed state</small></span><b>fn</b></button><button class="api-item" data-api="effect"><span><code>effect()</code><small>Tracked side effect</small></span><b>fn</b></button><button class="api-item" data-api="computed"><span><code>computed()</code><small>Lazy derived value</small></span><b>fn</b></button><button class="api-item" data-api="watch"><span><code>watch()</code><small>Observe a source</small></span><b>fn</b></button></div><div class="playground"><div class="playground-bar"><span class="playground-title"><i></i>LIVE PLAYGROUND</span><span class="playground-meta" data-version-label>${state.version}</span></div><div class="playground-editor"><textarea id="playground-code" spellcheck="false" aria-label="OneKit playground code">${state.playgroundCode}</textarea><div class="playground-output"><div class="output-head"><span>OUTPUT</span><span>IFRAME SANDBOX</span></div><iframe id="playground-frame" title="Sandboxed OneKit playground" sandbox="allow-scripts allow-same-origin"></iframe></div></div><div class="playground-actions"><button class="button button-dark" id="run-playground">Run example ${icon("arrow")}</button><button class="text-button" id="reset-playground">Reset</button><span class="playground-hint">Try changing <code>count += 1</code></span></div></div></div></section>`;

const usageCard = (label: string, importLine: string, code: string, note: string) => {
  const formatted = code.replace(/\\n/g, "\n");
  const copyValue = `${importLine}\n${formatted}`.replace(/"/g, "&quot;");
  const runnerCode = encodeURIComponent(formatted);
  return `<div class="usage-card"><div class="usage-card-head"><span>${label}</span><button class="copy-inline" data-copy="${copyValue}">Copy</button></div><p>${note}</p><pre><code><span class="code-import">${importLine}</span>\n${formatted}</code></pre><div class="example-runner"><div class="example-runner-bar"><span>LIVE EXAMPLE</span><span class="example-status" data-example-status>READY</span></div><div class="example-runner-actions"><button class="button button-dark example-run" data-example-code="${runnerCode}">Live Run ${icon("arrow")}</button><button class="text-button example-reset">Reset</button></div><iframe class="example-frame" title="${label} live example" sandbox="allow-scripts allow-same-origin"></iframe></div></div>`;
};

sectionMarkup.reactive += `<div class="usage-lab"><div class="section-kicker"><span>USAGE</span><span>REACTIVE STATE</span></div>${usageCard("Reactive state", "import { reactive, effect } from \"onekit-js\";", "const state = reactive({ count: 0 });\\neffect(() => output(String(state.count)));\\nstate.count += 1;", "Wrap plain data with reactive() and subscribe with effect(). In the live runner, output() represents a DOM text node.")}${usageCard("Derived state", "import { reactive, computed } from \"onekit-js\";", "const cart = reactive({ total: 120, tax: 0.05 });\\nconst grandTotal = computed(() => cart.total * (1 + cart.tax));\\noutput(String(grandTotal.value));", "Use computed() for a value derived from reactive state. Read the result through .value.")}</div></section>`;

sectionMarkup.components += `<div class="usage-lab"><div class="section-kicker"><span>USAGE</span><span>COMPONENTS</span></div>${usageCard("Component", "import { defineComponent, register, create, mount } from \"onekit-js\";", "const Counter = defineComponent({\\n  name: \"Counter\",\\n  data: () => ({ count: 0 }),\\n  template: `<button>Count: {{ count }}</button>`,\\n});\\nregister(\"Counter\", Counter);\\nconst instance = create(\"Counter\");\\nmount(instance, \"#app\");", "Define state with data(), register the definition, create an instance, then mount it into a real DOM element.")}${usageCard("JSX / VDOM", "import { h, render } from \"onekit-js\";", "const view = h(\"button\", { class: \"button\" }, \"Save\");\\nrender(view, document.querySelector(\"#app\"));", "Use h() and render() when you need a programmatic view instead of a template string.")}</div></section>`;

sectionMarkup.routing += `<div class="usage-lab"><div class="section-kicker"><span>USAGE</span><span>ROUTER</span></div>${usageCard("Application router", "import { createRouter } from \"onekit-js\";", "const router = createRouter([\\n  { path: \"/\", handler: () => output(\"home\") },\\n  { path: \"/docs/:slug\", handler: ({ to }) => output(to.params.slug) },\\n], { mode: \"memory\", initialPath: \"/\" });\\nawait router.start();\\nawait router.navigate(\"/docs/reactive\");", "Define route records, start the router once, then navigate with absolute paths. Memory mode keeps this browser sandbox deterministic.")}${usageCard("Navigation subscription", "import { createRouter } from \"onekit-js\";", "const router = createRouter([{ path: \"/\" }], { mode: \"memory\" });\\nrouter.subscribe((to, from) => {\\n  output(`${from?.fullPath ?? \"(start)\"} → ${to.fullPath}`);\\n});\\nawait router.start();", "Subscribe to the actual RouteLocation values emitted by OneKit when the shell needs to update titles, breadcrumbs, or analytics.")}</div></section>`;

sectionMarkup.production += `<div class="usage-lab"><div class="section-kicker"><span>USAGE</span><span>SHIP IT</span></div>${usageCard("HTTP helper", "import { get, post } from \"onekit-js\";", "const user = await get(\"/api/user\");\\nawait post(\"/api/events\", { type: \"lesson_complete\" });\\noutput(JSON.stringify(user));", "Use the public request helpers for JSON APIs. Keep credentials and secrets on the server; never place private tokens in browser code.")}${usageCard("Vite integration", "import { oneKitVitePlugin } from \"onekit-js/vite\";", "const config = {\\n  plugins: [oneKitVitePlugin()],\\n};\\noutput(config.plugins.length);", "Add oneKitVitePlugin() in the build configuration so the OneKit development workflow stays consistent.")}</div></section>`;
sectionMarkup.production += `<div class="deployment-guide"><div class="section-kicker"><span>DEPLOYMENT</span><span>PRODUCTION GUIDE</span></div><h2>Build once, host anywhere</h2><p class="usage-intro">Docu Web is a Vite-powered static frontend. Build the client, publish <code>dist/public</code>, and configure your host to send unknown routes to <code>/index.html</code> so documentation routes continue to work after refresh.</p><div class="deployment-grid"><div class="data-card"><span class="data-label">1 · INSTALL</span><pre><code>pnpm install</code></pre><p>Use the lockfile and the same Node.js version used by CI or your hosting provider.</p></div><div class="data-card"><span class="data-label">2 · CHECK</span><pre><code>pnpm run check</code></pre><p>Catch TypeScript errors before creating a production artifact.</p></div><div class="data-card"><span class="data-label">3 · BUILD</span><pre><code>pnpm run build:client</code></pre><p>Vite writes the deployable files to <code>dist/public</code>.</p></div><div class="data-card"><span class="data-label">4 · PREVIEW</span><pre><code>pnpm run preview</code></pre><p>Verify direct navigation to <code>/docs/data</code> and other nested routes.</p></div></div><div class="deployment-block"><div class="code-head"><span>Environment variables</span><button data-copy="VITE_ANALYTICS_ENDPOINT=https://analytics.example.com&#10;VITE_ANALYTICS_WEBSITE_ID=your-site-id">${icon("copy")}<span>Copy</span></button></div><p>Only public browser-safe values belong in <code>VITE_*</code> variables. Never put API secrets, private tokens, database credentials, or signing keys in a client build.</p><pre><code><span class="kw">VITE_ANALYTICS_ENDPOINT</span>=https://analytics.example.com<br><span class="kw">VITE_ANALYTICS_WEBSITE_ID</span>=your-site-id</code></pre></div><div class="deployment-block"><div class="code-head"><span>Static host configuration</span></div><div class="host-table"><div><strong>Vercel</strong><span>Build <code>pnpm run build:client</code>; output <code>dist/public</code>; add a rewrite from <code>/(.*)</code> to <code>/index.html</code>.</span></div><div><strong>Netlify</strong><span>Build <code>pnpm run build:client</code>; publish <code>dist/public</code>; add <code>/* /index.html 200</code> to <code>dist/public/_redirects</code>.</span></div><div><strong>Cloudflare Pages</strong><span>Build <code>pnpm run build:client</code>; output <code>dist/public</code>; enable the SPA fallback for documentation routes.</span></div><div><strong>GitHub Pages</strong><span>Publish <code>dist/public</code> through Pages and add a deep-link fallback; a custom domain or reverse proxy is recommended for history routing.</span></div></div></div><div class="deployment-block"><div class="code-head"><span>Cache and security policy</span></div><p>Serve hashed files under <code>/assets/</code> with long-lived immutable caching. Keep <code>index.html</code> short-lived or revalidated. Enable HTTPS, review your Content Security Policy against analytics requirements, and keep source maps private when appropriate.</p></div><div class="deployment-block"><div class="code-head"><span>Release checklist</span></div><p>Run check and build, preview the bundle, test nested-route refreshes, verify <code>/onekit-runtime.js</code>, confirm analytics variables, and inspect the browser console for failed asset or CORS requests.</p></div><div class="deployment-block"><div class="code-head"><span>Troubleshooting</span></div><p><strong>404 on refresh:</strong> add the SPA fallback rewrite. <strong>Blank page:</strong> serve <code>dist/public</code> and verify rooted asset URLs. <strong>Analytics warning:</strong> define both public variables or remove analytics for that environment. <strong>Stale release:</strong> revalidate <code>index.html</code> and purge the CDN. <strong>Runtime failure:</strong> deploy <code>onekit-runtime.js</code> at the site root.</p></div></div></section>`;

sectionMarkup.production += `<div class="deployment-guide cicd-guide"><div class="section-kicker"><span>CI/CD</span><span>GITHUB ACTIONS</span></div><h2>Automated deployment from GitHub</h2><p class="usage-intro">The repository includes validation, Vercel, and Netlify workflows under <code>.github/workflows/</code>. Every pull request runs the type-check and production build; pull requests can create previews, while pushes to <code>main</code> publish production deployments.</p><div class="deployment-grid"><div class="data-card"><span class="data-label">CI</span><p><code>ci.yml</code> runs on pull requests and pushes to <code>main</code>. It installs from the lockfile, runs <code>pnpm run check</code>, and builds the client.</p></div><div class="data-card"><span class="data-label">VERCEL</span><p><code>deploy-vercel.yml</code> creates preview deployments for pull requests and production deployments from <code>main</code>.</p></div><div class="data-card"><span class="data-label">NETLIFY</span><p><code>deploy-netlify.yml</code> creates deploy previews for pull requests and production deploys from <code>main</code>.</p></div><div class="data-card"><span class="data-label">PROTECTION</span><p>Use GitHub Environments named <code>preview</code> and <code>production</code> to restrict production secrets and approvals.</p></div></div><div class="deployment-block"><div class="code-head"><span>Required GitHub secrets</span></div><div class="host-table"><div><strong>Vercel</strong><span><code>VERCEL_TOKEN</code>, <code>VERCEL_ORG_ID</code>, and <code>VERCEL_PROJECT_ID</code>.</span></div><div><strong>Netlify</strong><span><code>NETLIFY_AUTH_TOKEN</code> and <code>NETLIFY_SITE_ID</code>.</span></div><div><strong>Optional public config</strong><span>Define <code>VITE_ANALYTICS_ENDPOINT</code> and <code>VITE_ANALYTICS_WEBSITE_ID</code> as environment variables when analytics is enabled.</span></div></div><p>Store provider credentials as encrypted GitHub Actions secrets. Do not commit tokens to workflow files, repository variables, or the client source.</p></div><div class="deployment-block"><div class="code-head"><span>Provider setup</span><button data-copy="gh secret set VERCEL_TOKEN&#10;gh secret set VERCEL_ORG_ID&#10;gh secret set VERCEL_PROJECT_ID&#10;gh secret set NETLIFY_AUTH_TOKEN&#10;gh secret set NETLIFY_SITE_ID">${icon("copy")}<span>Copy</span></button></div><p>Connect the repository to the target Vercel project or Netlify site first. Then add the provider identifiers and tokens to the matching GitHub Environment or repository secrets. The workflows already use <code>pnpm run build:client</code> and publish <code>dist/public</code>.</p></div><div class="deployment-block"><div class="code-head"><span>Branch policy</span></div><p>Pull requests from this repository run CI and preview deployment jobs. Pull requests from forks run CI only because GitHub does not expose deployment secrets to untrusted fork workflows. Only pushes to <code>main</code> run production deployment jobs. Protect <code>main</code> and require the CI check before merging. If only one hosting provider is desired, disable the unused provider workflow or leave its secrets unset; the CI workflow remains provider-independent.</p></div><div class="deployment-block"><div class="code-head"><span>Manual recovery</span></div><p>Re-run a failed workflow from the GitHub Actions tab after correcting secrets or provider settings. For a safe rollback, redeploy the last known-good commit rather than editing generated files in <code>dist/public</code>.</p></div></div></section>`;
sectionMarkup.features += `<div class="usage-lab feature-usage"><div class="section-kicker"><span>USAGE MAP</span><span>FRAMEWORK PATTERNS</span></div><p class="usage-intro">These are the patterns you will use most often in a OneKit application. Each example is intentionally small: import the public API, wire it to the browser, then compose the pieces.</p>${usageCard("Store", "import { defineStore } from \"onekit-js\";", "const tasks = defineStore(\"tasks\", () => ({\\n  state: () => ({ items: [] }),\\n  actions: { add(item) { this.$patch(state => state.items.push(item)); } },\\n}));\\ntasks.add(\"Read the guide\");\\noutput(tasks.$state.items.length);", "Use defineStore(id, setup) for shared reactive state and actions that belong to more than one component.")}${usageCard("Storage", "import { localStorage } from \"onekit-js\";", "localStorage.set(\"theme\", \"paper\");\\noutput(localStorage.get(\"theme\"));", "Use the public localStorage helper for browser persistence instead of reaching into native storage throughout the app.")}${usageCard("Accessibility", "import { announce, setAriaAttributes } from \"onekit-js\";", "const next = document.createElement(\"button\");\\nnext.id = \"next\";\\nsetAriaAttributes(next, { \"aria-label\": \"Next lesson\", \"aria-current\": \"page\", \"aria-live\": \"polite\" });\\nannounce(\"Lesson saved\");\\noutput(next.getAttribute(\"aria-label\"));", "Use the actual accessibility helpers for live announcements and ARIA attributes.")}${usageCard("Web Component", "import { registerWebComponent } from \"onekit-js\";", "registerWebComponent(\"lesson-card\", {\\n  name: \"LessonCard\",\\n  template: `<article><slot></slot></article>`,\\n});\\noutput(\"lesson-card registered\");", "Pass a component definition as the second argument when registering a custom element.")}${usageCard("Security", "import { sanitizeHTML, sanitizeURL } from \"onekit-js\";", "const safeMarkup = sanitizeHTML(\"<img src=x onerror=alert(1)>\");\\nconst safeURL = sanitizeURL(\"javascript:alert(1)\");\\noutput(`${safeMarkup} | ${safeURL}`);", "Sanitize untrusted markup and URLs at the boundary before inserting user-controlled content into the document.")}${usageCard("Scoped effects", "import { withScope } from \"onekit-js\";", "const result = withScope(() => ({ ready: true }));\\noutput(String(result.value.ready));\\nresult.scope.stop();", "Use withScope() to group effects and disposables so a feature can stop its resources as one unit.")}${usageCard("Error safety", "import { safeMethod } from \"onekit-js\";", "const guarded = safeMethod(() => { throw new Error(\"demo\"); });\\noutput(String(guarded()));", "Wrap optional integrations with safeMethod() so failures are contained by the framework error handler.")}${usageCard("SSR metadata", "import { renderTitle, renderMeta } from \"onekit-js\";", "const title = renderTitle(\"Docu Web\");\\nconst meta = renderMeta(\"description\", \"OneKit field guide\");\\noutput(title + meta);", "Compose server-rendered head metadata with the same public helpers used by the client application.")}${usageCard("Utilities", "import { debounce, generateId } from \"onekit-js\";", "const id = generateId();\\nconst later = debounce(() => output(\"debounced\"), 10);\\nlater();\\noutput(id.length > 0 ? \"scheduled\" : \"missing\");", "Use the framework utilities for stable identifiers and controlled high-frequency callbacks.")}</div></section>`;
sectionMarkup.features += `<div class="usage-lab feature-usage"><div class="section-kicker"><span>ADVANCED USAGE</span><span>REMAINING APIS</span></div><p class="usage-intro">The remaining framework systems are documented here as focused recipes: templates, DOM patching, lifecycle hooks, persistence layers, tooling, and the OKJS compiler.</p>${usageCard("Template compiler", "import { compileTemplate, initTemplateEngine } from \"onekit-js\";", "initTemplateEngine();\\nconst node = compileTemplate(\"<p>Hello {{ name }}</p>\", { name: \"OneKit\" });\\noutput(node.textContent);", "Compile a template against a plain context without a full component definition.")}${usageCard("VDOM patch", "import { createElement, patch } from \"onekit-js\";", "const next = createElement(\"p\", {}, \"Updated\");\\nconst host = document.querySelector(\"#app\");\\npatch(host, next);\\noutput(host.textContent);", "Use createElement() and patch() for low-level DOM updates.")}${usageCard("Session and cache", "import { sessionStorage, cache } from \"onekit-js\";", "sessionStorage.set(\"lesson\", \"advanced\");\\ncache.set(\"last-route\", \"/docs/features\");\\noutput(sessionStorage.get(\"lesson\") + \" / \" + cache.get(\"last-route\"));", "Use sessionStorage for tab-scoped state and cache for short-lived browser data.")}${usageCard("Component lifecycle", "import { onMounted, onUpdated, onDestroyed } from \"onekit-js\";", "onMounted(() => output(\"mounted\"));\\nonUpdated(() => console.log(\"updated\"));\\nonDestroyed(() => console.log(\"destroyed\"));", "Register lifecycle callbacks inside component setup.")}${usageCard("OKJS compiler", "import { parseOkjs, compileOkjs } from \"onekit-js\";", "const source = \"<template><h1>Hello</h1></template>\";\\nconst block = parseOkjs(source, \"lesson.okjs\");\\nconst compiled = compileOkjs(source, \"lesson.okjs\");\\noutput(String(block.template.length) + \" / \" + String(compiled.code.length));", "Parse and compile .okjs single-file components during tooling or build steps.")}${usageCard("DevTools bridge", "import { enableDevTools, isDevToolsEnabled } from \"onekit-js\";", "enableDevTools({ name: \"Docu Web\" });\\noutput(String(isDevToolsEnabled()));", "Enable the development bridge only in local tooling.")}${usageCard("Loading boundary", "import { createLoadingBoundary } from \"onekit-js\";", "const boundary = createLoadingBoundary();\\noutput(typeof boundary.start === \"function\" ? \"ready\" : \"missing\");", "Use a loading boundary for asynchronous component work.")}</div></section>`;

sectionMarkup.features += `<div class="usage-lab feature-usage"><div class="section-kicker"><span>COMPLETE API COVERAGE</span><span>DEPLOYMENT AND REMAINING SYSTEMS</span></div><p class="usage-intro">These recipes cover the framework systems that sit around the core reactive loop: server rendering, accessibility, security, resource loading, error boundaries, networking, and HMR.</p>${usageCard("SSR and hydration", "import { createSSRContext, renderToString, hydrate } from \"onekit-js\";", "const context = createSSRContext();\nconst html = renderToString({ type: \"p\", props: {}, children: [\"Hello OneKit\"] }, context);\noutput(typeof html === \"string\" ? \"SSR ready\" : \"SSR result\");", "Create a server context, render a VNode to HTML, and hydrate the matching browser root when the client starts.")}${usageCard("SSR head resources", "import { createSSRContext, addToHead, addStyle, preloadModule } from \"onekit-js\";", "const context = createSSRContext();\naddToHead(context, \"<meta name=description content=OneKit>\");\naddStyle(context, \"body{color:navy}\");\noutput(preloadModule(\"/assets/app.js\"));", "Keep server-rendered head metadata, styles, scripts, and preload hints in one SSR context.")}${usageCard("Accessibility focus", "import { createSkipLink, trapFocus, validateAccessibility } from \"onekit-js\";", "const link = createSkipLink(\"#main\", \"Skip to content\");\ndocument.body.append(link);\nconst stop = trapFocus(document.body);\noutput(validateAccessibility(document.body).valid ? \"accessible\" : \"review required\");\nstop();", "Use skip links, focus traps, and validation together for keyboard-friendly dialogs and documentation shells.")}${usageCard("Security and CSP", "import { sanitizeHTML, sanitizeURL } from \"onekit-js\";", "const clean = sanitizeHTML(\"<script>alert(1)</script>\");\nconst safeURL = sanitizeURL(\"javascript:alert(1)\");\noutput(clean + \" | \" + safeURL);", "Sanitize untrusted input at the boundary and generate a host-aligned CSP instead of trusting browser content.")}${usageCard("Resource loading", "import { preloadScript, preloadStyle, addScript } from \"onekit-js\";", "const scriptHint = preloadScript(\"/assets/feature.js\");\nconst styleHint = preloadStyle(\"/assets/feature.css\");\noutput(scriptHint.includes(\"preload\") && styleHint.includes(\"preload\") ? \"hints ready\" : \"review\");", "Generate preload hints during SSR and add scripts through the framework resource helpers when they are needed.")}${usageCard("Error boundary", "import { createErrorBoundary, errorHandler } from \"onekit-js\";", "const boundary = createErrorBoundary({ fallback: () => \"Fallback\" });\nconst safe = boundary.run(() => { throw new Error(\"demo\"); });\nerrorHandler(\"handled\", \"showcase\");\noutput(String(safe));", "Contain component failures with a boundary and route unexpected errors through the framework handler.")}${usageCard("Networking", "import { request, put, del } from \"onekit-js\";", "const options = { headers: { Accept: \"application/json\" } };\noutput(typeof request === \"function\" && typeof put === \"function\" && typeof del === \"function\" ? \"HTTP API ready\" : \"missing\");", "Use request, put, and del for JSON APIs, while keeping credentials and private tokens on the server.")}${usageCard("HMR and plugins", "import { registerDirective, registerDisposable } from \"onekit-js\";", "const resource = registerDisposable({ dispose: () => console.log(\"disposed\") });\nregisterDirective(\"focus\", { mounted: element => element.focus() });\noutput(typeof resource.dispose === \"function\" ? \"directive ready\" : \"missing\");", "Preserve local state during hot updates and register reusable directives/disposables at development time.")}${usageCard("Landmarks", "import { createLandmarks, skipToContent } from \"onekit-js\";", "createLandmarks();\nskipToContent(\"main\");\noutput(\"landmarks ready\");", "Create semantic landmarks and move focus to the main content target when navigation changes.")}${usageCard("Scheduling and cache", "import { batch, nextTick, withCache } from \"onekit-js\";", "batch(() => output(\"batched\"));\nawait nextTick();\noutput(typeof withCache === \"function\" ? \"cache ready\" : \"missing\");", "Batch reactive updates, await the next render tick, and cache repeatable SSR work with the framework helper.")}</div></section>`;

const runnerSrcDoc = `<!doctype html><html><head><meta charset="UTF-8"><style>body{margin:0;padding:15px;background:#11242e;color:#a9cba1;font:12px/1.75 monospace;white-space:pre-wrap}#status{color:#71878c;font-size:10px;margin-bottom:10px;text-transform:uppercase;letter-spacing:.08em}#output{color:#a9cba1}</style></head><body><div id="status">SAFE RUNTIME · READY</div><div id="output">Run the example to see OneKit react.</div><div id="app"></div><script>
const outputNode=document.getElementById('output'); const statusNode=document.getElementById('status'); const appNode=document.getElementById('app');
const send=(message)=>parent.postMessage({source:'docu-onekit-runner',...message},'*');
let OneKitRuntime=null;
function paint(text){outputNode.textContent=String(text);}
window.addEventListener('message',async(event)=>{const data=event.data;if(!data||data.type!=='run'||!OneKitRuntime)return;statusNode.textContent='SAFE RUNTIME · RUNNING';outputNode.textContent='';try{const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;const runUserCode=new AsyncFunction('reactive','effect','computed','watch','defineComponent','register','create','mount','h','render','createRouter','defineStore','localStorage','announce','setAriaAttributes','registerWebComponent','get','post','safeMethod','sanitizeHTML','sanitizeURL','withScope','effectScope','onScopeDispose','renderTitle','renderMeta','debounce','generateId','compileTemplate','initTemplateEngine','createElement','patch','sessionStorage','cache','onMounted','onUpdated','onDestroyed','parseOkjs','compileOkjs','enableDevTools','isDevToolsEnabled','createLoadingBoundary','renderToString','hydrate','createSSRContext','addToHead','addStyle','preloadModule','createSkipLink','trapFocus','validateAccessibility','sanitizeInput','generateCSPHeader','updateSecurityConfig','preloadScript','preloadStyle','addScript','createErrorBoundary','errorHandler','request','put','del','preserveHMRState','registerHMRDisposable','registerDirective','output','console','document','"use strict";\\n'+data.code);await runUserCode(OneKitRuntime.reactive,OneKitRuntime.effect,OneKitRuntime.computed,OneKitRuntime.watch,OneKitRuntime.defineComponent,OneKitRuntime.register,OneKitRuntime.create,OneKitRuntime.mount,OneKitRuntime.h,OneKitRuntime.render,OneKitRuntime.createRouter,OneKitRuntime.defineStore,OneKitRuntime.localStorage,OneKitRuntime.announce,OneKitRuntime.setAriaAttributes,OneKitRuntime.registerWebComponent,OneKitRuntime.get,OneKitRuntime.post,OneKitRuntime.safeMethod,OneKitRuntime.sanitizeHTML,OneKitRuntime.sanitizeURL,OneKitRuntime.withScope,OneKitRuntime.effectScope,OneKitRuntime.onScopeDispose,OneKitRuntime.renderTitle,OneKitRuntime.renderMeta,OneKitRuntime.debounce,OneKitRuntime.generateId,OneKitRuntime.compileTemplate,OneKitRuntime.initTemplateEngine,OneKitRuntime.createElement,OneKitRuntime.patch,OneKitRuntime.sessionStorage,OneKitRuntime.cache,OneKitRuntime.onMounted,OneKitRuntime.onUpdated,OneKitRuntime.onDestroyed,OneKitRuntime.parseOkjs,OneKitRuntime.compileOkjs,OneKitRuntime.enableDevTools,OneKitRuntime.isDevToolsEnabled,OneKitRuntime.createLoadingBoundary,OneKitRuntime.renderToString,OneKitRuntime.hydrate,OneKitRuntime.createSSRContext,OneKitRuntime.addToHead,OneKitRuntime.addStyle,OneKitRuntime.preloadModule,OneKitRuntime.createSkipLink,OneKitRuntime.trapFocus,OneKitRuntime.validateAccessibility,OneKitRuntime.sanitizeInput,OneKitRuntime.generateCSPHeader,OneKitRuntime.updateSecurityConfig,OneKitRuntime.preloadScript,OneKitRuntime.preloadStyle,OneKitRuntime.addScript,OneKitRuntime.createErrorBoundary,OneKitRuntime.errorHandler,OneKitRuntime.request,OneKitRuntime.put,OneKitRuntime.del,OneKitRuntime.preserveHMRState,OneKitRuntime.registerHMRDisposable,OneKitRuntime.registerDirective,paint,{log:(...args)=>paint(args.join(' '))},document);statusNode.textContent='SAFE RUNTIME · COMPLETE';send({type:'complete',text:outputNode.textContent})}catch(error){statusNode.textContent='RUNTIME ERROR';outputNode.textContent=(error&&error.name?error.name+': ':'')+(error&&error.message?error.message:String(error));send({type:'error',text:outputNode.textContent})}});
fetch('/onekit-runtime.js').then(response=>response.text()).then(source=>{const moduleExports={};new Function('exports','module','define',source)(moduleExports,{exports:moduleExports},undefined);OneKitRuntime=moduleExports;statusNode.textContent='SAFE RUNTIME · ONEKIT LOADED';send({type:'ready',runtime:'onekit-js'});}).catch(error=>{statusNode.textContent='RUNTIME LOAD ERROR';outputNode.textContent=String(error);send({type:'error',text:outputNode.textContent});});
</script></body></html>`;

function resetRunner(frame: HTMLIFrameElement) {
  frame.srcdoc = runnerSrcDoc;
  frame.dataset.ready = "true";
}

function bindUsageRunners() {
  document.querySelectorAll<HTMLElement>(".usage-card").forEach((card) => {
    const run = card.querySelector<HTMLButtonElement>(".example-run");
    const reset = card.querySelector<HTMLButtonElement>(".example-reset");
    const frame = card.querySelector<HTMLIFrameElement>(".example-frame");
    const status = card.querySelector<HTMLElement>("[data-example-status]");
    if (!run || !reset || !frame || !status || run.dataset.bound === "true") return;
    run.dataset.bound = "true";
    const execute = (code: string) => {
      if (!frame.contentWindow) return;
      status.textContent = "RUNNING";
      frame.contentWindow.postMessage({ type: "run", code }, "*");
    };
    const resetFrame = () => {
      frame.srcdoc = runnerSrcDoc;
      frame.dataset.loaded = "false";
      status.textContent = "READY";
    };
    window.addEventListener("message", (event) => {
      if (event.source !== frame.contentWindow || event.data?.source !== "docu-onekit-runner") return;
      if (event.data.type === "ready") {
        frame.dataset.loaded = "true";
        const pending = frame.dataset.pendingCode;
        if (pending) { delete frame.dataset.pendingCode; execute(pending); }
      }
      if (event.data.type === "complete" || event.data.type === "error") {
        status.textContent = event.data.type === "error" ? `ERROR: ${event.data.text ?? "runtime failure"}` : "COMPLETE";
      }
    });
    run.addEventListener("click", () => {
      const code = decodeURIComponent(run.dataset.exampleCode ?? "");
      if (frame.dataset.loaded === "true") execute(code);
      else { frame.dataset.pendingCode = code; resetFrame(); }
    });
    reset.addEventListener("click", resetFrame);
    resetFrame();
  });
}

function bindPlayground() {
  const code = document.querySelector<HTMLTextAreaElement>("#playground-code");
  const run = document.querySelector<HTMLButtonElement>("#run-playground");
  const reset = document.querySelector<HTMLButtonElement>("#reset-playground");
  const frame = document.querySelector<HTMLIFrameElement>("#playground-frame");
  if (!code || !run || !reset || !frame || code.dataset.bound === "true") return;
  code.dataset.bound = "true";
  if (frame.dataset.ready !== "true") resetRunner(frame);
  const defaultCode = state.playgroundCode;
  code.addEventListener("input", () => { state.playgroundCode = code.value; });
  const w = window as Window & { __docuRunnerBound?: boolean; __docuRunnerTimer?: number };
  if (!w.__docuRunnerBound) {
    w.__docuRunnerBound = true;
    window.addEventListener("message", (event) => {
      if (event.source !== frame.contentWindow || event.data?.source !== "docu-onekit-runner") return;
      if (event.data.type === "complete" || event.data.type === "error") {
        state.playgroundOutput = event.data.text;
        if (w.__docuRunnerTimer) window.clearTimeout(w.__docuRunnerTimer);
      }
    });
  }
  run.addEventListener("click", () => {
    if (frame.contentWindow) {
      state.playgroundOutput = "Running in sandbox…";
      frame.contentWindow.postMessage({ type: "run", version: state.version, code: code.value }, "*");
      w.__docuRunnerTimer = window.setTimeout(() => { state.playgroundOutput = "Execution timed out. The sandbox was reset."; resetRunner(frame); }, 900);
    }
  });
  reset.addEventListener("click", () => { code.value = defaultCode; state.playgroundCode = defaultCode; state.playgroundOutput = "Run the example to see OneKit react."; resetRunner(frame); });
  document.querySelectorAll<HTMLButtonElement>(".api-item").forEach((item) => item.addEventListener("click", () => {
    document.querySelectorAll(".api-item").forEach((node) => node.classList.remove("is-selected")); item.classList.add("is-selected");
    const api = item.dataset.api ?? "reactive";
    const examples: Record<string, string> = { reactive: `const state = reactive({ count: 0 });\\neffect(() => output(String(state.count)));\\nstate.count += 1;`, effect: `const state = reactive({ count: 0 });\\nconst stop = effect(() => output(state.count));\\nstate.count += 1;\\nstop();`, computed: `const cart = reactive({ price: 20, qty: 2 });\\nconst total = computed(() => cart.price * cart.qty);\\noutput(total.value);`, watch: `const state = reactive({ count: 0 });\\nwatch(() => state.count, (next) => output(next));\\nstate.count += 1;` };
    code.value = examples[api] ?? examples.reactive; state.playgroundCode = code.value; resetRunner(frame);
  }));
}

function applyRouteMeta(id: string) {
  const meta = routeMeta[id] ?? routeMeta.overview;
  document.title = `${meta.title} · Docu Web`;
  let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!description) { description = document.createElement("meta"); description.name = "description"; document.head.appendChild(description); }
  description.content = meta.description;
}

function renderBreadcrumbs() {
  const target = document.querySelector<HTMLElement>("#breadcrumbs");
  if (!target) return;
  const meta = routeMeta[state.active] ?? routeMeta.overview;
  target.innerHTML = `<a href="/" data-section="overview">Docu Web</a><span>/</span><span>${meta.group}</span><span>/</span><strong>${meta.title}</strong>`;
}

async function navigateToSection(id: string) {
  state.mobileOpen = false;
  state.query = "";
  await routerStart;
  await appRouter.navigate(sectionPath(id));
  requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }));
}

function renderNavigation() {
  const grouped = sections.reduce<Record<string, typeof sections>>((acc, item) => { (acc[item.group] ??= []).push(item); return acc; }, {});
  const nav = document.querySelector("#sidebar-nav");
  if (!nav) return;
  nav.innerHTML = Object.entries(grouped).map(([group, items]) => `<div class="nav-group"><span class="nav-group-label">${group}</span>${items.map((item) => `<a class="nav-item ${state.active === item.id ? "is-active" : ""}" href="${sectionPath(item.id)}" data-section="${item.id}"><span>${item.number}</span>${item.label}</a>`).join("")}</div>`).join("");

}

function renderDocument() {
  const target = document.querySelector("#doc-sections");
  const count = document.querySelector("#search-count");
  if (!target || !count) return;
  const query = state.query.trim().toLowerCase();
  const currentIndex = sections.findIndex((section) => section.id === state.active);
  const current = sections[currentIndex];
  const visible = query
    ? sections.filter((section) => section.label.toLowerCase().includes(query) || sectionMarkup[section.id].toLowerCase().includes(query))
    : current ? [current] : [];
  const previous = currentIndex > 0 ? sections[currentIndex - 1] : undefined;
  const next = currentIndex >= 0 && currentIndex < sections.length - 1 ? sections[currentIndex + 1] : undefined;
  const pager = !query && current ? `<nav class="route-pager" aria-label="Documentation pagination"><span>${previous ? `<a href="${sectionPath(previous.id)}" data-section="${previous.id}"><small>Previous</small><strong>← ${previous.label}</strong></a>` : ""}</span><span>${next ? `<a href="${sectionPath(next.id)}" data-section="${next.id}"><small>Next</small><strong>${next.label} →</strong></a>` : ""}</span></nav>` : "";
  document.querySelector(".hero")?.classList.toggle("route-hidden", !query && state.active !== "overview");
  target.innerHTML = visible.length ? `${visible.map((section) => sectionMarkup[section.id]).join("")}${pager}` : `<div class="empty-state"><span>NO MATCHES</span><h3>Nothing in the field guide yet.</h3><p>Try “reactive”, “routing”, or “install”.</p></div>`;
  count.textContent = query ? `${visible.length} result${visible.length === 1 ? "" : "s"}` : "";
  target.querySelectorAll<HTMLElement>("[data-copy]").forEach((button) => button.addEventListener("click", async () => { await navigator.clipboard?.writeText(button.dataset.copy ?? ""); state.copied = true; setTimeout(() => state.copied = false, 1400); }));
}

function renderToc() {
  const toc = document.querySelector("#toc-links");
  if (!toc) return;
  const current = routeMeta[state.active] ?? routeMeta.overview;
  toc.innerHTML = `<a class="toc-link is-active" href="${sectionPath(state.active)}" data-section="${state.active}">${current.title}</a><span class="toc-route-note">Current route</span>`;
}

renderShell();
renderNavigation();
renderDocument();
renderToc();
renderBreadcrumbs();
bindPlayground();

document.querySelector("#doc-search")?.addEventListener("input", (event) => { state.query = (event.target as HTMLInputElement).value; });
document.querySelector<HTMLSelectElement>("#version-select")?.addEventListener("change", (event) => { state.version = (event.target as HTMLSelectElement).value; });
const mobileMenu = document.querySelector<HTMLButtonElement>(".mobile-menu");
const sidebar = document.querySelector<HTMLElement>(".sidebar");
const backdrop = document.querySelector<HTMLButtonElement>("[data-close-drawer]");
const setDrawerOpen = (open: boolean) => {
  state.mobileOpen = open;
  sidebar?.classList.toggle("is-open", open);
  backdrop?.classList.toggle("is-visible", open);
  mobileMenu?.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("drawer-open", open);
};
mobileMenu?.setAttribute("aria-expanded", "false");
mobileMenu?.addEventListener("click", () => setDrawerOpen(!sidebar?.classList.contains("is-open")));
backdrop?.addEventListener("click", () => setDrawerOpen(false));
document.addEventListener("keydown", (event) => { if (event.key === "Escape") setDrawerOpen(false); });
document.addEventListener("keydown", (event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); document.querySelector<HTMLInputElement>("#doc-search")?.focus(); } });
document.addEventListener("click", (event) => {
  const link = (event.target as HTMLElement).closest<HTMLElement>("[data-section]");
  if (!link) return;
  event.preventDefault();
  void navigateToSection(link.dataset.section ?? "overview");
});

effect(() => {
  const query = state.query;
  void query;
  renderDocument();
  renderNavigation();
  renderToc();
  renderBreadcrumbs();
  bindPlayground();
  bindUsageRunners();
});

effect(() => {
  const version = state.version;
  document.querySelectorAll<HTMLElement>("[data-version-label]").forEach((node) => { node.textContent = version; });
  const description = document.querySelector<HTMLElement>("[data-version-description]");
  if (description) description.textContent = versions[version as keyof typeof versions];
  document.querySelector(".version-control select")?.setAttribute("value", version);
      document.querySelector(".sidebar")?.classList.toggle("is-open", state.mobileOpen);
      document.querySelector("[data-close-drawer]")?.classList.toggle("is-visible", state.mobileOpen);
      document.body.classList.toggle("drawer-open", state.mobileOpen);
  document.querySelectorAll<HTMLElement>("[data-copy] span").forEach((label) => { if (state.copied) label.textContent = "Copied"; });
});
