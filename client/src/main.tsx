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
  version: "3.1.13",
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
];

const versions = {
  "3.1.13": "Current · stable",
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
          <div class="sidebar-foot"><span class="status-dot"></span><span>v3.1.13 · MIT licensed</span></div>
        </aside><button class="drawer-backdrop" aria-label="Close navigation" data-close-drawer></button>
        <main class="main-column">
          <section class="hero" id="overview">
            <div class="hero-copy"><span class="eyebrow">A practical guide to OneKit</span><h1>Build once.<br><em>Read it twice.</em></h1><p class="hero-lede">A compact, TypeScript-first reactive framework for browser applications. No ceremony. Just clear primitives that let your interface stay close to the DOM.</p><div class="hero-actions"><a class="button button-dark" href="/docs/journey" data-section="journey">Start the learner path ${icon("arrow")}</a><a class="text-link" href="/docs/features" data-section="features">See all features</a></div><div class="learning-stamp"><span class="stamp-check">✓</span><span><strong>Learning route</strong><small>Beginner → builder → production</small></span></div></div>
            <div class="hero-art"><img src="/manus-storage/docu-web-hero_7be2b1e9.png" alt="Abstract editorial illustration of a technical guide" /><div class="art-caption"><span>FIG. 01</span><span>OneKit / browser runtime</span></div></div>
          </section>
          <div class="reading-layout"><article class="document" id="document-content">
            <div id="breadcrumbs" class="breadcrumbs" aria-label="Breadcrumb"></div><div class="document-meta"><span>DOCUMENTATION / V3</span><span>8 MIN READ</span><span>UPDATED AUG 15, 2026</span></div>
            <div class="search-row"><div class="search-box">${icon("search")}<input id="doc-search" type="search" placeholder="Search the field guide…" aria-label="Search documentation" /><kbd>⌘ K</kbd></div><span id="search-count" class="search-count"></span></div>
            <div id="doc-sections"></div>
          </article><aside class="toc" aria-label="On this page"><span class="eyebrow">On this page</span><div id="toc-links"></div><div class="toc-note"><span class="red-rule"></span><p>Keep the surface small. Let the state do the work.</p></div></aside></div>
          </main>
        </div>
        <footer class="footer"><span>Docu Web / OneKit JS field guide</span><span>Developed by Arkar Yab</span></footer>
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

sectionMarkup.journey = `<section class="doc-section learner-section" data-id="journey"><div class="section-kicker"><span>07</span><span>LEARN ONEKIT</span></div><div class="learner-heading"><div><h2>Learn by building the surface.</h2><p>Follow the path in order or jump to the feature you need. Every stop pairs a plain-language explanation with a small, runnable example.</p></div><span class="level-badge">6 stages</span></div><div class="journey-grid"><a href="/docs/installation" data-section="installation"><span>01</span><strong>First app</strong><small>Install, mount, and make the browser respond.</small></a><a href="/docs/reactive" data-section="reactive"><span>02</span><strong>State</strong><small>Reactive, computed, watched, and batched.</small></a><a href="/docs/components" data-section="components"><span>03</span><strong>UI systems</strong><small>Components, templates, JSX, and VDOM.</small></a><a href="/docs/routing" data-section="routing"><span>04</span><strong>Navigation</strong><small>Routes, stores, plugins, and scopes.</small></a><a href="/docs/features" data-section="features"><span>05</span><strong>Browser tools</strong><small>HTTP, storage, a11y, security, and Web Components.</small></a><a href="/docs/production" data-section="production"><span>06</span><strong>Ship it</strong><small>SSR, hydration, Vite, CLI, tests, and release checks.</small></a></div></section>`;

sectionMarkup.features = `<section class="doc-section learner-section" data-id="features"><div class="section-kicker"><span>08</span><span>LEARN ONEKIT</span></div><div class="learner-heading"><div><h2>OneKit, mapped for learners.</h2><p>Use this catalog as your map. Start with the core, then add the browser and production modules when your app asks for them.</p></div><span class="level-badge">18 areas</span></div><div class="feature-catalog"><div class="feature-cluster"><div class="cluster-head"><span>CORE RUNTIME</span><small>Start here</small></div><div class="feature-row"><code>reactive · computed · effect · watch</code><span>State and dependency tracking</span></div><div class="feature-row"><code>defineComponent · mount · scope</code><span>Components and lifecycle</span></div><div class="feature-row"><code>template · directives · expressions</code><span>Declarative DOM views</span></div><div class="feature-row"><code>h · jsx · render · patch</code><span>JSX, VDOM, and render helpers</span></div></div><div class="feature-cluster"><div class="cluster-head"><span>APP ARCHITECTURE</span><small>Build structure</small></div><div class="feature-row"><code>router · history · hash · memory</code><span>Navigation and route state</span></div><div class="feature-row"><code>store · plugins · DI</code><span>Shared state and composition</span></div><div class="feature-row"><code>scope · errors · loading</code><span>Teardown and boundaries</span></div><div class="feature-row"><code>SSR · hydration</code><span>Server output and client takeover</span></div></div><div class="feature-cluster"><div class="cluster-head"><span>BROWSER + SHIP</span><small>Go further</small></div><div class="feature-row"><code>request · get · post · API</code><span>HTTP helpers</span></div><div class="feature-row"><code>storage · cache · snapshot</code><span>Browser storage and utilities</span></div><div class="feature-row"><code>a11y · security · sanitize</code><span>Accessible, safer interfaces</span></div><div class="feature-row"><code>animation · Web Components · DevTools</code><span>Polish and integration</span></div><div class="feature-row"><code>Vite plugin · CLI · testing</code><span>Developer workflow</span></div></div></div></section>`;

sectionMarkup.api = `<section class="doc-section api-section" data-id="api"><div class="section-kicker"><span>09</span><span>REFERENCE</span></div><div class="api-heading"><div><h2>API reference, in motion</h2><p>Read the primitive, then change it. This playground runs a safe, browser-only subset of the example so the feedback loop stays visible.</p></div><div class="api-version-badge"><span class="eyebrow">Selected version</span><strong data-version-label>${state.version}</strong><small data-version-description>${versions[state.version as keyof typeof versions]}</small></div></div><div class="api-grid"><div class="api-index"><div class="api-index-head"><span>PUBLIC API</span><span>TYPE</span></div><button class="api-item is-selected" data-api="reactive"><span><code>reactive()</code><small>Proxy-backed state</small></span><b>fn</b></button><button class="api-item" data-api="effect"><span><code>effect()</code><small>Tracked side effect</small></span><b>fn</b></button><button class="api-item" data-api="computed"><span><code>computed()</code><small>Lazy derived value</small></span><b>fn</b></button><button class="api-item" data-api="watch"><span><code>watch()</code><small>Observe a source</small></span><b>fn</b></button></div><div class="playground"><div class="playground-bar"><span class="playground-title"><i></i>LIVE PLAYGROUND</span><span class="playground-meta" data-version-label>${state.version}</span></div><div class="playground-editor"><textarea id="playground-code" spellcheck="false" aria-label="OneKit playground code">${state.playgroundCode}</textarea><div class="playground-output"><div class="output-head"><span>OUTPUT</span><span>IFRAME SANDBOX</span></div><iframe id="playground-frame" title="Sandboxed OneKit playground" sandbox="allow-scripts"></iframe></div></div><div class="playground-actions"><button class="button button-dark" id="run-playground">Run example ${icon("arrow")}</button><button class="text-button" id="reset-playground">Reset</button><span class="playground-hint">Try changing <code>count += 1</code></span></div></div></div></section>`;

const usageCard = (label: string, importLine: string, code: string, note: string) => {
  const formatted = code.replace(/\\n/g, "\n");
  const copyValue = `${importLine}\n${formatted}`.replace(/"/g, "&quot;");
  return `<div class="usage-card"><div class="usage-card-head"><span>${label}</span><button class="copy-inline" data-copy="${copyValue}">Copy</button></div><p>${note}</p><pre><code><span class="code-import">${importLine}</span>\n${formatted}</code></pre></div>`;
};

sectionMarkup.reactive += `<div class="usage-lab"><div class="section-kicker"><span>USAGE</span><span>REACTIVE STATE</span></div>${usageCard("Reactive state", "import { reactive, effect } from \"onekit-js\";", "const state = reactive({ count: 0 });\\neffect(() => {\\n  document.querySelector(\"#count\").textContent = String(state.count);\\n});\\nstate.count += 1;", "Wrap plain data with reactive() and subscribe with effect(). Mutate the proxy directly; OneKit tracks the dependency and updates the DOM.")}${usageCard("Derived state", "import { reactive, computed } from \"onekit-js\";", "const cart = reactive({ total: 120, tax: 0.05 });\\nconst grandTotal = computed(() => cart.total * (1 + cart.tax));\\nconsole.log(grandTotal.value);", "Use computed() for a value derived from reactive state. Read the result through .value.")}</div></section>`;

sectionMarkup.components += `<div class="usage-lab"><div class="section-kicker"><span>USAGE</span><span>COMPONENTS</span></div>${usageCard("Component", "import { defineComponent, mount } from \"onekit-js\";", "const Counter = defineComponent({\\n  setup() { return { count: 0 }; },\\n  template: `<button>Count: {{ count }}</button>`,\\n});\\nmount(Counter, document.querySelector(\"#app\"));", "Keep component setup, template, and mounting explicit. A component owns its state and is mounted into a real DOM element.")}${usageCard("JSX / VDOM", "import { h, render } from \"onekit-js\";", "const view = h(\"button\", { class: \"button\" }, \"Save\");\\nrender(view, document.querySelector(\"#app\"));", "Use h() and render() when you need a programmatic view instead of a template string.")}</div></section>`;

sectionMarkup.routing += `<div class="usage-lab"><div class="section-kicker"><span>USAGE</span><span>ROUTER</span></div>${usageCard("Application router", "import { createRouter } from \"onekit-js\";", "const router = createRouter([\\n  { path: \"/\", handler: () => show(\"home\") },\\n  { path: \"/docs/:slug\", handler: ({ params }) => show(params.slug) },\\n], { mode: \"history\" });\\nawait router.start();\\nawait router.navigate(\"/docs/reactive\");", "Define route records, start the router once, then navigate with absolute paths. Use history mode for browser URLs and memory mode in tests.")}${usageCard("Navigation subscription", "import { createRouter } from \"onekit-js\";", "router.subscribe((to, from) => {\\n  document.title = `${to.route?.path} · Docu Web`;\\n  console.log(from?.fullPath, to.fullPath);\\n});", "Subscribe to route matches when the shell needs to update titles, breadcrumbs, or analytics.")}</div></section>`;

sectionMarkup.production += `<div class="usage-lab"><div class="section-kicker"><span>USAGE</span><span>SHIP IT</span></div>${usageCard("HTTP helper", "import { get, post } from \"onekit-js\";", "const user = await get(\"/api/user\");\\nawait post(\"/api/events\", { type: \"lesson_complete\" });", "Use the public request helpers for JSON APIs. Keep credentials and secrets on the server; never place private tokens in browser code.")}${usageCard("Vite integration", "import { oneKitVite } from \"onekit-js/vite\";", "export default {\\n  plugins: [oneKitVite()],\\n};", "Add the Vite plugin in the build configuration so the OneKit development workflow stays consistent.")}</div></section>`;

sectionMarkup.features += `<div class="usage-lab feature-usage"><div class="section-kicker"><span>USAGE MAP</span><span>FRAMEWORK PATTERNS</span></div><p class="usage-intro">These are the patterns you will use most often in a OneKit application. Each example is intentionally small: import the public API, wire it to the browser, then compose the pieces.</p>${usageCard("Store", "import { createStore } from \"onekit-js\";", "const store = createStore({ user: null });\\nstore.setState({ user: { id: 1, name: \"Learner\" } });\\nconsole.log(store.getState().user);", "Use a store for shared state that belongs to more than one component.")}${usageCard("Storage", "import { storage } from \"onekit-js\";", "storage.set(\"theme\", \"paper\");\\nconst theme = storage.get(\"theme\");", "Use OneKit storage helpers for browser persistence instead of reaching into localStorage throughout the app.")}${usageCard("Accessibility", "import { announce, focusVisible } from \"onekit-js\";", "announce(\"Lesson saved\");\\nfocusVisible(document.querySelector(\"#next\"));", "Use the accessibility helpers for status announcements and intentional focus movement.")}${usageCard("Web Component", "import { registerWebComponent } from \"onekit-js\";", "registerWebComponent(\"lesson-card\", {\\n  template: `<article><slot></slot></article>`,\\n});", "Register a reusable custom element when your OneKit UI needs to cross framework boundaries.")}</div></section>`;

const runnerSrcDoc = `<!doctype html><html><head><meta charset="UTF-8"><style>body{margin:0;padding:15px;background:#11242e;color:#a9cba1;font:12px/1.75 monospace;white-space:pre-wrap}#status{color:#71878c;font-size:10px;margin-bottom:10px;text-transform:uppercase;letter-spacing:.08em}#output{color:#a9cba1}</style></head><body><div id="status">SAFE RUNTIME · READY</div><div id="output">Run the example to see OneKit react.</div><script>
const outputNode=document.getElementById('output'); const statusNode=document.getElementById('status');
const send=(message)=>parent.postMessage({source:'docu-onekit-runner',...message},'*');
let OneKitRuntime=null;
function paint(text){outputNode.textContent=String(text);}
window.addEventListener('message',(event)=>{const data=event.data;if(!data||data.type!=='run'||!OneKitRuntime)return;statusNode.textContent='SAFE RUNTIME · RUNNING';outputNode.textContent='';try{const runUserCode=new Function('reactive','effect','computed','watch','output','console','"use strict";\\n'+data.code);runUserCode(OneKitRuntime.reactive,OneKitRuntime.effect,OneKitRuntime.computed,OneKitRuntime.watch,paint,{log:(...args)=>paint(args.join(' '))});statusNode.textContent='SAFE RUNTIME · COMPLETE';send({type:'complete',text:outputNode.textContent})}catch(error){statusNode.textContent='RUNTIME ERROR';outputNode.textContent=(error&&error.name?error.name+': ':'')+(error&&error.message?error.message:String(error));send({type:'error',text:outputNode.textContent})}});
const runtimeScript=document.createElement('script');runtimeScript.src='/manus-storage/onekit-runtime_c9655d42.js';runtimeScript.onload=()=>{OneKitRuntime=window.OneKit;statusNode.textContent='SAFE RUNTIME · ONEKIT LOADED';send({type:'ready',runtime:'onekit-js'});};runtimeScript.onerror=()=>{statusNode.textContent='RUNTIME LOAD ERROR';outputNode.textContent='Unable to load the OneKit runtime.';send({type:'error',text:outputNode.textContent});};document.head.appendChild(runtimeScript);
</script></body></html>`;

function resetRunner(frame: HTMLIFrameElement) {
  frame.srcdoc = runnerSrcDoc;
  frame.dataset.ready = "true";
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
