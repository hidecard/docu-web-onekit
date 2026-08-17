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
  version: "3.1.17",
  playgroundCode: `const state = reactive({ count: 0 });\neffect(() => output(String(state.count)));\nstate.count += 1;`,
  playgroundOutput: "Run the example to see OneKit react.",
});

const sections = [
  { id: "overview", label: "Overview", group: "Start here", number: "01" },
  { id: "basics", label: "Before you code", group: "Start here", number: "02" },
  { id: "first-app", label: "Your first app", group: "Start here", number: "03" },
  { id: "templates", label: "Templates & DOM", group: "Start here", number: "04" },
  { id: "events-forms", label: "Events & forms", group: "Start here", number: "05" },
  { id: "todo-project", label: "First project", group: "Start here", number: "06" },
  { id: "installation", label: "Installation", group: "Start here", number: "02" },
  { id: "reactive", label: "Reactive state", group: "Core concepts", number: "03" },
  { id: "components", label: "Components", group: "Core concepts", number: "04" },
  { id: "routing", label: "Routing", group: "Core concepts", number: "05" },
  { id: "production", label: "Production", group: "Ship it", number: "06" },
  { id: "journey", label: "Learner path", group: "Learn OneKit", number: "07" },
  { id: "features", label: "All features", group: "Learn OneKit", number: "08" },
  { id: "api", label: "API reference", group: "Reference", number: "09" },
  { id: "data", label: "Docu Data", group: "Reference", number: "10" },
  { id: "data-layer", label: "Data layer", group: "V3 guides", number: "11" },
  { id: "ssr", label: "SSR & hydration", group: "V3 guides", number: "12" },
  { id: "security", label: "Security", group: "V3 guides", number: "13" },
  { id: "testing", label: "Testing", group: "V3 guides", number: "14" },
  { id: "tooling", label: "CLI & tooling", group: "V3 guides", number: "15" },
  { id: "browser", label: "Browser utilities", group: "V3 guides", number: "16" },
  { id: "web-components", label: "Web Components", group: "V3 guides", number: "17" },
  { id: "architecture", label: "Architecture", group: "Deep dive", number: "18" },
  { id: "deep-reactivity", label: "Deep reactivity", group: "Deep dive", number: "19" },
  { id: "recipes", label: "Project recipes", group: "Build real apps", number: "20" },
  { id: "migration", label: "Migration guide", group: "Build real apps", number: "21" },
  { id: "performance", label: "Performance", group: "Ship it", number: "22" },
  { id: "troubleshooting", label: "Troubleshooting", group: "Reference", number: "23" },
];

const versions = {
  "3.1.17": "Current · stable",
  "3.1.x": "V3 minor line",
  "2.x": "Legacy reference",
};
const versionPolicies = {
  "3.1.17": "All V3 APIs shown in this manual are available unless a guide marks them experimental.",
  "3.1.x": "V3 minor line: examples target the stable V3 contract; check release notes for minor additions.",
  "2.x": "Legacy reference: the core playground stays compatible, but V3-only APIs require an upgrade.",
};

const routeMeta: Record<string, { title: string; description: string; group: string }> = {
  overview: { title: "Overview", description: "A practical introduction to the OneKit browser runtime.", group: "Start here" },
  basics: { title: "Before you code", description: "Learn the browser, TypeScript, and OneKit vocabulary before writing your first line.", group: "Start here" },
  "first-app": { title: "Your first app", description: "Create a tiny reactive OneKit app and understand every line.", group: "Start here" },
  templates: { title: "Templates & DOM", description: "Render HTML, bind values, handle lists, and keep DOM updates predictable.", group: "Start here" },
  "events-forms": { title: "Events & forms", description: "Handle user input, validation, submit state, and accessible feedback.", group: "Start here" },
  "todo-project": { title: "First project", description: "Build a small todo application step by step before moving to advanced guides.", group: "Start here" },
  installation: { title: "Installation", description: "Install OneKit and create your first project.", group: "Start here" },
  reactive: { title: "Reactive state", description: "Build predictable interfaces with reactive primitives.", group: "Core concepts" },
  components: { title: "Components", description: "Compose reusable UI with OneKit components and scopes.", group: "Core concepts" },
  routing: { title: "Routing", description: "Navigate browser applications with the OneKit router.", group: "Core concepts" },
  production: { title: "Production", description: "Type-check, test, build, and ship a OneKit application.", group: "Ship it" },
  journey: { title: "Learner path", description: "A guided path from your first OneKit app to production.", group: "Learn OneKit" },
  features: { title: "All features", description: "A complete learner map of OneKit capabilities.", group: "Learn OneKit" },
  api: { title: "API reference", description: "Read and run OneKit API primitives in the browser.", group: "Reference" },
  data: { title: "Docu Data", description: "Use structured documentation data to keep OneKit guides searchable and maintainable.", group: "Reference" },
  "data-layer": { title: "Data layer", description: "Build typed forms, cached queries, stores, and HTTP workflows.", group: "V3 guides" },
  ssr: { title: "SSR & hydration", description: "Render on the server, stream safely, and hydrate without drift.", group: "V3 guides" },
  security: { title: "Security", description: "Use OneKit's safe rendering, URL, event, style, and prototype guards.", group: "V3 guides" },
  testing: { title: "Testing", description: "Test DOM behavior with OneKit's testing helpers and predictable router modes.", group: "V3 guides" },
  tooling: { title: "CLI & tooling", description: "Create, diagnose, build, and validate OneKit projects.", group: "V3 guides" },
  browser: { title: "Browser utilities", description: "Add accessibility, storage, animation, networking, and error boundaries.", group: "V3 guides" },
  "web-components": { title: "Web Components", description: "Expose OneKit components as standards-based custom elements.", group: "V3 guides" },
  architecture: { title: "Architecture", description: "Choose boundaries for state, views, routes, effects, and services.", group: "Deep dive" },
  "deep-reactivity": { title: "Deep reactivity", description: "Understand dependency tracking, batching, scopes, and cleanup.", group: "Deep dive" },
  recipes: { title: "Project recipes", description: "Build common application surfaces with OneKit primitives.", group: "Build real apps" },
  migration: { title: "Migration guide", description: "Translate React and Vue mental models into OneKit patterns.", group: "Build real apps" },
  performance: { title: "Performance", description: "Keep updates, bundles, network work, and hydration measurable.", group: "Ship it" },
  troubleshooting: { title: "Troubleshooting", description: "Diagnose common setup, routing, rendering, and production failures.", group: "Reference" },
  notFound: { title: "Page not found", description: "The requested documentation route does not exist.", group: "Not found" },
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
          <div class="sidebar-foot"><span class="status-dot"></span><span>v3.1.17 · MIT licensed</span></div>
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
  basics: `<section class="doc-section beginner-lesson" data-id="basics"><div class="section-kicker"><span>02</span><span>START HERE</span></div><div class="lesson-heading"><div><h2>Before you write OneKit code</h2><p>Start here if reactive frameworks are new to you. OneKit does not hide the browser: HTML gives you structure, CSS gives you appearance, JavaScript gives you behavior, and OneKit keeps state changes synchronized with the DOM.</p></div><span class="level-badge">Beginner</span></div><div class="lesson-outcomes"><strong>After this chapter you can</strong><span>read a DOM selector</span><span>explain state vs. derived state</span><span>run a TypeScript example</span></div><div class="beginner-columns"><div><h3>Four words to remember</h3><dl class="definition-list"><div><dt>State</dt><dd>Data that may change while the app is open, such as a counter or signed-in user.</dd></div><div><dt>Render</dt><dd>The act of putting the current state into visible HTML.</dd></div><div><dt>Effect</dt><dd>Code that runs again when the reactive values it read change.</dd></div><div><dt>Event</dt><dd>A browser action such as click, input, submit, or keydown.</dd></div></dl></div><div class="beginner-callout"><span class="note-label">MENTAL MODEL</span><p>Write the plain browser version first. Then make the changing value reactive. If you cannot describe the DOM and event flow without OneKit, stop and simplify the example.</p></div></div><div class="lesson-check"><span>Checkpoint</span><p>Can you point to the changing value, the element that displays it, and the event that changes it? If yes, continue to the first app.</p></div></section>`,
  "first-app": `<section class="doc-section beginner-lesson" data-id="first-app"><div class="section-kicker"><span>03</span><span>START HERE</span></div><div class="lesson-heading"><div><h2>Build your first reactive app</h2><p>We will make a counter. The example is intentionally small: one state object, one output element, one effect, and one button event. Read it from top to bottom before running it.</p></div><span class="level-badge">15 min</span></div><div class="step-list"><div><span>01</span><div><strong>Give the page a target</strong><p>HTML needs an element with a stable id. The effect will update only that element.</p></div></div><div><span>02</span><div><strong>Create state</strong><p><code>reactive()</code> returns an object whose property reads can be tracked.</p></div></div><div><span>03</span><div><strong>Connect state to the DOM</strong><p>The effect reads <code>state.count</code>, so OneKit knows when to run it again.</p></div></div></div><div class="code-card runnable-card"><div class="code-head"><span>src/main.ts · complete example</span><button data-copy="const state = reactive({ count: 0 });\nconst count = document.querySelector('#count');\nconst add = document.querySelector('#add');\neffect(() => { count.textContent = String(state.count); });\nadd.addEventListener('click', () => { state.count += 1; });">${icon("copy")}<span>Copy</span></button></div><pre><code><span class="kw">import</span> { reactive, effect } <span class="kw">from</span> <span class="str">"onekit-js"</span>;

<span class="kw">const</span> state = reactive({ count: <span class="num">0</span> });
<span class="kw">const</span> count = document.querySelector(<span class="str">"#count"</span>)!;
<span class="kw">const</span> add = document.querySelector(<span class="str">"#add"</span>)!;

effect(() =&gt; {
  count.textContent = String(state.count);
});

add.addEventListener(<span class="str">"click"</span>, () =&gt; { state.count += <span class="num">1</span>; });</code></pre><div class="code-actions"><button class="text-button" data-run-code="${encodeURIComponent("const state = reactive({ count: 0 }); output('count = ' + state.count); state.count += 1; output('after click = ' + state.count);")}">Run in sandbox</button><span class="run-status" aria-live="polite">Safe browser example</span></div></div><div class="lesson-check"><span>Checkpoint</span><p>Change the initial count to <code>10</code>, run again, and explain why the output changes before any click occurs.</p></div></section>`,
  templates: `<section class="doc-section beginner-lesson" data-id="templates"><div class="section-kicker"><span>04</span><span>START HERE</span></div><div class="lesson-heading"><div><h2>Templates, text, and lists</h2><p>Use text nodes for untrusted content, stable keys for lists, and one clear render function for a small view. The browser remains the source of truth for accessible HTML.</p></div><span class="level-badge">Core skill</span></div><div class="concept-grid"><div class="data-card"><span class="data-label">TEXT</span><h3>Prefer textContent</h3><p>User names, search terms, and API values belong in text nodes. Do not concatenate untrusted strings into HTML.</p></div><div class="data-card"><span class="data-label">LISTS</span><h3>Render from data</h3><p>Map the current array to rows and give each row a stable id so updates stay understandable.</p></div><div class="data-card"><span class="data-label">EMPTY</span><h3>Design empty states</h3><p>An empty collection is a real state. Explain what happened and what the user can do next.</p></div></div><div class="code-card runnable-card"><div class="code-head"><span>render a safe list</span><button data-copy="const list = document.querySelector('#list');\nconst names = ['Ada', 'Grace', 'Lin'];\nlist.replaceChildren(...names.map(name => { const li = document.createElement('li'); li.textContent = name; return li; }));">${icon("copy")}<span>Copy</span></button></div><pre><code><span class="kw">const</span> list = document.querySelector(<span class="str">"#list"</span>)!;
<span class="kw">const</span> names = [<span class="str">"Ada"</span>, <span class="str">"Grace"</span>, <span class="str">"Lin"</span>];

list.replaceChildren(...names.map((name) =&gt; {
  <span class="kw">const</span> li = document.createElement(<span class="str">"li"</span>);
  li.textContent = name;
  <span class="kw">return</span> li;
}));</code></pre><div class="code-actions"><button class="text-button" data-run-code="${encodeURIComponent("const names = ['Ada', 'Grace', 'Lin']; names.forEach((name, index) => output((index + 1) + '. ' + name));")}">Run in sandbox</button><span class="run-status" aria-live="polite">Uses text, not HTML</span></div></div></section>`,
  "events-forms": `<section class="doc-section beginner-lesson" data-id="events-forms"><div class="section-kicker"><span>05</span><span>START HERE</span></div><div class="lesson-heading"><div><h2>Events and forms that feel complete</h2><p>Forms are a conversation: label the field, show the current value, validate at the boundary, prevent duplicate submits, and announce the result. Start with one field before building a large form.</p></div><span class="level-badge">Core skill</span></div><div class="step-list"><div><span>01</span><div><strong>Label every control</strong><p>Use a visible label or an explicit accessible name. Placeholder text is not a label.</p></div></div><div><span>02</span><div><strong>Keep a draft state</strong><p>Reactive state represents what the user typed; it is not automatically trusted server data.</p></div></div><div><span>03</span><div><strong>Validate on submit</strong><p>Show a concise error beside the field and keep focus useful after failure.</p></div></div></div><div class="code-card runnable-card"><div class="code-head"><span>email form boundary</span><button data-copy="const form = reactive({ email: '', error: '' });\nfunction submit() {\n  form.error = form.email.includes('@') ? '' : 'Enter a valid email';\n  if (!form.error) output('Ready to submit ' + form.email);\n}"> ${icon("copy")}<span>Copy</span></button></div><pre><code><span class="kw">const</span> form = reactive({ email: <span class="str">""</span>, error: <span class="str">""</span> });

<span class="kw">function</span> submit() {
  form.error = form.email.includes(<span class="str">"@"</span>)
    ? <span class="str">""</span>
    : <span class="str">"Enter a valid email"</span>;
  <span class="kw">if</span> (!form.error) sendToServer(form.email);
}</code></pre><div class="code-actions"><button class="text-button" data-run-code="${encodeURIComponent("const email = 'learner@example.com'; output(email.includes('@') ? 'Valid: ready to submit' : 'Invalid: show the field error');")}">Run validation</button><span class="run-status" aria-live="polite">No network request is made</span></div></div><div class="note-card"><span class="note-label">SECURITY</span><p>Client validation improves feedback; the server must validate authorization, shape, length, and business rules again.</p></div></section>`,
  "todo-project": `<section class="doc-section beginner-lesson" data-id="todo-project"><div class="section-kicker"><span>06</span><span>START HERE</span></div><div class="lesson-heading"><div><h2>Your first project: a todo list</h2><p>Use this project as a checkpoint before moving to routing, data fetching, SSR, or security. It combines state, derived values, events, lists, empty states, and persistence without hiding the fundamentals.</p></div><span class="level-badge">Project</span></div><div class="project-map"><div><span>01</span><strong>Model</strong><small><code>todos</code> and <code>draft</code></small></div><div><span>02</span><strong>Render</strong><small>rows, empty state, count</small></div><div><span>03</span><strong>Mutate</strong><small>add, toggle, remove</small></div><div><span>04</span><strong>Polish</strong><small>keyboard, focus, storage</small></div></div><div class="code-card"><div class="code-head"><span>project state model</span><button data-copy="const state = reactive({ todos: [], draft: '', filter: 'all' });\nconst remaining = computed(() => state.todos.filter(todo => !todo.done).length);\nfunction addTodo() { if (!state.draft.trim()) return; state.todos.push({ id: crypto.randomUUID(), title: state.draft.trim(), done: false }); state.draft = ''; }">${icon("copy")}<span>Copy</span></button></div><pre><code><span class="kw">const</span> state = reactive({
  todos: [],
  draft: <span class="str">""</span>,
  filter: <span class="str">"all"</span>,
});
<span class="kw">const</span> remaining = computed(() =&gt;
  state.todos.filter((todo) =&gt; !todo.done).length
);</code></pre></div><div class="project-checklist"><span>Done means:</span><p>You can add a todo, toggle it, remove it, explain the derived remaining count, and restore the list after a reload without storing secrets.</p></div></section>`,
  installation: `<section class="doc-section" data-id="installation"><div class="section-kicker"><span>07</span><span>START HERE</span></div><h2>Install the runtime</h2><p>Bring OneKit into an existing Vite or TypeScript app, or create a starter project with the built-in generator. The package ships its own TypeScript declarations.</p><div class="code-card"><div class="code-head"><span>TERMINAL</span><button data-copy="npm install onekit-js">${icon("copy")}<span>Copy</span></button></div><pre><code><span class="code-muted">$</span> npm install onekit-js</code></pre></div><div class="note-card"><span class="note-label">NOTE</span><p>OneKit requires Node.js 18 or newer for the CLI and build tooling. For an app, import public APIs from <code>onekit-js</code>, not internal source paths.</p></div></section>`,
  reactive: `<section class="doc-section" data-id="reactive"><div class="section-kicker"><span>03</span><span>CORE CONCEPTS</span></div><h2>Start with the smallest reactive surface</h2><p>Wrap state, read it in an effect, and let OneKit schedule the update. The result is direct enough to debug and structured enough to scale.</p><div class="lesson-outcomes"><strong>Learn to</strong><span>create a reactive object</span><span>track reads with effect</span><span>stop a side effect safely</span></div><div class="step-list"><div><span>01</span><div><strong>Wrap the source</strong><p>Use <code>reactive({ ... })</code> for mutable application state.</p></div></div><div><span>02</span><div><strong>Read inside an effect</strong><p>Dependencies are collected from values read during the effect.</p></div></div><div><span>03</span><div><strong>Change the source</strong><p>Mutate the reactive property and observe the scheduled update.</p></div></div></div>  <div class="code-card"><div class="code-head"><span>src/main.ts</span><button data-copy="const state = reactive({ count: 0 });\neffect(() => {\n  document.querySelector(\"#count\")!.textContent = String(state.count);\n});\nstate.count += 1;">${icon("copy")}<span>Copy</span></button></div><pre><code><span class="kw">import</span> { reactive, effect } <span class="kw">from</span> <span class="str">"onekit-js"</span>;

<span class="kw">const</span> state = reactive({ count: <span class="num">0</span> });

effect(() =&gt; {
  document.querySelector(<span class="str">"#count"</span>)!.textContent =
    String(state.count);
});

state.count += <span class="num">1</span>;</code></pre></div></section>`,
  components: `<section class="doc-section" data-id="components"><div class="section-kicker"><span>04</span><span>CORE CONCEPTS</span></div><h2>Components with a clear exit</h2><p>Use components when a piece of UI owns state, lifecycle, or a reusable view. Disposable scopes keep effects and listeners from leaking when the component leaves the page.</p><div class="lesson-outcomes"><strong>Learn to</strong><span>choose a component boundary</span><span>pass input explicitly</span><span>clean up listeners and effects</span></div><div class="principle-grid"><div><span class="principle-no">01</span><strong>Own one job</strong><p>Split by responsibility, not arbitrary file length.</p></div><div><span class="principle-no">02</span><strong>Make inputs visible</strong><p>Prefer props or arguments over hidden global reads.</p></div><div><span class="principle-no">03</span><strong>Leave cleanly</strong><p>Dispose timers, listeners, and effects when the view exits.</p></div></div><div class="quote-block"><span>“</span><p>For most applications, prefer a component or disposable scope so the effect is cleaned up automatically.</p></div></section>`,
  routing: `<section class="doc-section" data-id="routing"><div class="section-kicker"><span>05</span><span>CORE CONCEPTS</span></div><h2>Routes that explain themselves</h2><p>Choose history or hash mode for browser applications, and memory mode for tests or non-browser environments. If you use history mode, configure the server to return the app entrypoint for client-side routes.</p><div class="step-list"><div><span>01</span><div><strong>Choose a mode</strong><p>History gives normal URLs, hash works on static hosting, and memory is useful in tests.</p></div></div><div><span>02</span><div><strong>Define a fallback</strong><p>Unknown paths should show a recoverable 404 page rather than silently rendering home.</p></div></div><div><span>03</span><div><strong>Keep route data explicit</strong><p>Pass parameters into the view and model loading, empty, and error states.</p></div></div></div><div class="route-list"><div><span class="route-method">GET</span><code>/guide/reactive</code><span>Reactive state guide</span></div><div><span class="route-method">GET</span><code>/api/components</code><span>Component reference</span></div></div></section>`,
  production: `<section class="doc-section" data-id="production"><div class="section-kicker"><span>06</span><span>SHIP IT</span></div><h2>Production checklist</h2><p>Before publishing, run the same checks that protect the package: type-checking, tests, a clean build, and package verification.</p><div class="lesson-detail-grid"><div><span class="detail-label">BEFORE MERGE</span><p>Run formatting, type-check, unit tests, route smoke tests, and a clean build.</p></div><div><span class="detail-label">BEFORE RELEASE</span><p>Check environment variables, redirects, security headers, error pages, and mobile navigation.</p></div><div><span class="detail-label">AFTER RELEASE</span><p>Open a deep link, submit a form, and inspect provider logs.</p></div></div><div class="checklist"><div><span>01</span><strong>Type-check</strong><code>npm run type-check</code></div><div><span>02</span><strong>Test</strong><code>npm test -- --runInBand</code></div><div><span>03</span><strong>Build</strong><code>npm run build</code></div></div></section>`,
};

sectionMarkup.journey = `<section class="doc-section learner-section" data-id="journey"><div class="section-kicker"><span>07</span><span>LEARN ONEKIT</span></div><div class="learner-heading"><div><h2>Learn by building the surface.</h2><p>Follow the path in order or jump to the feature you need. Every stop pairs a plain-language explanation with a small, runnable example.</p></div><span class="level-badge">6 stages</span></div><div class="journey-grid"><a href="/docs/installation" data-section="installation"><span>01</span><strong>First app</strong><small>Install, mount, and make the browser respond.</small></a><a href="/docs/reactive" data-section="reactive"><span>02</span><strong>State</strong><small>Reactive, computed, watched, and batched.</small></a><a href="/docs/components" data-section="components"><span>03</span><strong>UI systems</strong><small>Components, templates, JSX, and VDOM.</small></a><a href="/docs/routing" data-section="routing"><span>04</span><strong>Navigation</strong><small>Routes, stores, plugins, and scopes.</small></a><a href="/docs/features" data-section="features"><span>05</span><strong>Browser tools</strong><small>HTTP, storage, a11y, security, and Web Components.</small></a><a href="/docs/production" data-section="production"><span>06</span><strong>Ship it</strong><small>SSR, hydration, Vite, CLI, tests, and release checks.</small></a></div></section>`;

sectionMarkup.features = `<section class="doc-section learner-section" data-id="features"><div class="section-kicker"><span>08</span><span>LEARN ONEKIT</span></div><div class="learner-heading"><div><h2>OneKit, mapped for learners.</h2><p>Use this catalog as your map. Start with the core, then add the browser and production modules when your app asks for them.</p></div><span class="level-badge">18 areas</span></div><div class="feature-catalog"><div class="feature-cluster"><div class="cluster-head"><span>CORE RUNTIME</span><small>Start here</small></div><div class="feature-row"><code>reactive · computed · effect · watch</code><span>State and dependency tracking</span></div><div class="feature-row"><code>defineComponent · mount · scope</code><span>Components and lifecycle</span></div><div class="feature-row"><code>template · directives · expressions</code><span>Declarative DOM views</span></div><div class="feature-row"><code>h · jsx · render · patch</code><span>JSX, VDOM, and render helpers</span></div></div><div class="feature-cluster"><div class="cluster-head"><span>APP ARCHITECTURE</span><small>Build structure</small></div><div class="feature-row"><code>router · history · hash · memory</code><span>Navigation and route state</span></div><div class="feature-row"><code>store · plugins · DI</code><span>Shared state and composition</span></div><div class="feature-row"><code>scope · errors · loading</code><span>Teardown and boundaries</span></div><div class="feature-row"><code>SSR · hydration</code><span>Server output and client takeover</span></div></div><div class="feature-cluster"><div class="cluster-head"><span>BROWSER + SHIP</span><small>Go further</small></div><div class="feature-row"><code>request · get · post · API</code><span>HTTP helpers</span></div><div class="feature-row"><code>storage · cache · snapshot</code><span>Browser storage and utilities</span></div><div class="feature-row"><code>a11y · security · sanitize</code><span>Accessible, safer interfaces</span></div><div class="feature-row"><code>animation · Web Components · DevTools</code><span>Polish and integration</span></div><div class="feature-row"><code>Vite plugin · CLI · testing</code><span>Developer workflow</span></div></div></div></section>`;

sectionMarkup.data = `<section class="doc-section" data-id="data"><div class="section-kicker"><span>10</span><span>REFERENCE</span></div><h2>Docu Data: one source for the field guide</h2><p>Keep documentation content in structured data before rendering it into navigation, search, cards, and route pages. This prevents the guide from drifting when a new framework API is added.</p><div class="data-grid"><div class="data-card"><span class="data-label">SECTION RECORD</span><code>{ id, label, group, number }</code><p>Navigation metadata drives the sidebar, pagination, breadcrumbs, and route lookup.</p></div><div class="data-card"><span class="data-label">ROUTE RECORD</span><code>{ title, description, group }</code><p>Route metadata keeps document titles and descriptions synchronized with the visible section.</p></div><div class="data-card"><span class="data-label">USAGE RECORD</span><code>{ label, importLine, code, note }</code><p>Usage cards share one renderer, one copy action, and one sandbox runner.</p></div></div><div class="code-card"><div class="code-head"><span>data-first pattern</span><button data-copy="const lessons = [{ id: \"reactive\", label: \"Reactive state\", group: \"Core concepts\" }];\nconst visible = lessons.filter(({ label }) => label.toLowerCase().includes(query));">${icon("copy")}<span>Copy</span></button></div><pre><code><span class="kw">const</span> lessons = [{ id: <span class="str">\"reactive\"</span>, label: <span class="str">\"Reactive state\"</span>, group: <span class="str">\"Core concepts\"</span> }];
<span class="kw">const</span> visible = lessons.filter(({ label }) =&gt; label.toLowerCase().includes(query));</code></pre></div><div class="note-card"><span class="note-label">MAINTENANCE RULE</span><p>When an API changes in <code>onekit-js</code>, update the canonical data and executable example together, then run type-check and production build before publishing.</p></div></section>`;

sectionMarkup.api = `<section class="doc-section api-section" data-id="api"><div class="section-kicker"><span>09</span><span>REFERENCE</span></div><div class="api-heading"><div><h2>API reference, in motion</h2><p>Read the primitive, then change it. This playground runs a safe, browser-only subset of the example so the feedback loop stays visible.</p></div><div class="api-version-badge"><span class="eyebrow">Selected version</span><strong data-version-label>${state.version}</strong><small data-version-description>${versions[state.version as keyof typeof versions]}</small><p class="api-version-policy" data-version-policy>${versionPolicies[state.version as keyof typeof versionPolicies]}</p></div></div><div class="api-grid"><div class="api-index"><div class="api-index-head"><span>PUBLIC API</span><span>TYPE</span></div><button class="api-item is-selected" data-api="reactive"><span><code>reactive()</code><small>Proxy-backed state</small></span><b>fn</b></button><button class="api-item" data-api="effect"><span><code>effect()</code><small>Tracked side effect</small></span><b>fn</b></button><button class="api-item" data-api="computed"><span><code>computed()</code><small>Lazy derived value</small></span><b>fn</b></button><button class="api-item" data-api="watch"><span><code>watch()</code><small>Observe a source</small></span><b>fn</b></button></div><div class="playground"><div class="playground-bar"><span class="playground-title"><i></i>LIVE PLAYGROUND</span><span class="playground-meta" data-version-label>${state.version}</span></div><div class="playground-editor"><textarea id="playground-code" spellcheck="false" aria-label="OneKit playground code">${state.playgroundCode}</textarea><div class="playground-output"><div class="output-head"><span>OUTPUT</span><span>IFRAME SANDBOX</span></div><iframe id="playground-frame" title="Sandboxed OneKit playground" sandbox="allow-scripts allow-same-origin"></iframe></div></div><div class="playground-actions"><button class="button button-dark" id="run-playground">Run example ${icon("arrow")}</button><button class="text-button" id="reset-playground">Reset</button><span class="playground-hint">Try changing <code>count += 1</code></span></div></div></div></section>`;

const guideDetail = (label: string, api: string) => `<div class="guide-detail-grid"><div><span class="detail-label">UNDERSTAND</span><p><strong>${label}</strong> is the boundary you are learning. Read the signature <code>${api}</code> from left to right: identify the input, the returned value, and the side effect you expect.</p></div><div><span class="detail-label">TRY IT</span><p>Copy the example, change one input, then run the smallest possible version. Compare the output before adding another abstraction.</p></div><div><span class="detail-label">CHECKPOINT</span><p>Explain what owns the data, when the code runs, and how you would clean it up or handle failure in a real application.</p></div></div>`;
const guideCard = (label: string, api: string, example: string, useWhen: string, pitfalls: string) => `<article class="guide-card"><div class="guide-card-head"><span>${label}</span><code>${api}</code></div><p><strong>Use it when:</strong> ${useWhen}</p><div class="guide-example-label"><span>COMPLETE EXAMPLE</span><span>TypeScript</span></div><pre><code>${example}</code></pre>${guideDetail(label, api)}<p class="guide-pitfall"><strong>Watch for:</strong> ${pitfalls}</p></article>`;
const guideSection = (id: string, number: string, kicker: string, title: string, intro: string, cards: string) => `<section class="doc-section expanded-guide" data-id="${id}"><div class="section-kicker"><span>${number}</span><span>${kicker}</span></div><h2>${title}</h2><p class="guide-intro">${intro}</p><div class="lesson-sequence"><span>01 Read the idea</span><span>02 Run the example</span><span>03 Change one thing</span><span>04 Check the failure case</span></div><div class="guide-grid">${cards}</div></section>`;

sectionMarkup["data-layer"] = guideSection("data-layer", "11", "V3 GUIDES", "Keep server data and UI state separate", "OneKit V3 adds small productivity layers for the parts of an application that usually become repetitive: cached reads, typed form state, validation, stores, and HTTP boundaries. Start with a clear ownership rule: the query cache owns remote data, the form owns draft input, and a store owns cross-route client state.",
  guideCard("Query client", "new QueryClient()", "import { QueryClient } from 'onekit-js/query';\n\nconst query = new QueryClient();\nconst projects = await query.fetch('projects', () => get('/api/projects'), { staleTime: 30_000 });\nconsole.log(projects);", "the same remote resource is read by multiple components and should be deduplicated or briefly cached.", "do not put passwords or auth tokens in query keys; invalidate after writes and choose a stale time that matches the data.") +
  guideCard("Typed forms", "createForm(initialValues, validator)", "import { createForm } from 'onekit-js/forms';\n\nconst form = createForm(\n  { email: '' },\n  values => values.email.includes('@') ? {} : { email: 'Enter a valid email' },\n);\nform.setField('email', 'dev@example.com');\nawait form.submit(values => post('/api/subscribe', values));", "a form needs field-level errors, touched state, submit state, and one typed source of truth.", "validate on submit as well as blur, disable duplicate submits, and never trust browser validation as server validation.") +
  guideCard("Store boundaries", "createStore(id, setup)", "import { createStore } from 'onekit-js';\n\nconst session = createStore('session', () => ({\n  state: { user: null },\n  actions: { signOut: () => { /* clear the session */ } },\n}));\nconsole.log(session.id);", "state is shared across routes but is not a server cache or a form draft.", "keep actions small and serializable; reset user-scoped stores on sign-out to avoid data leaking between sessions.") +
  guideCard("HTTP helpers", "request / get / post / put / del", "import { request, post } from 'onekit-js';\n\nconst response = await request('/api/projects', { method: 'GET' });\nawait post('/api/projects', { name: 'Docs' });\nconsole.log(response);", "you need a consistent JSON boundary with predictable errors and request methods.", "check response status, handle aborts, and keep private credentials on the server.")
);

sectionMarkup.ssr = guideSection("ssr", "12", "V3 GUIDES", "SSR that hydrates without surprises", "Server rendering is useful for first paint, SEO, and streaming content. OneKit V3 keeps the contract explicit: render the same attributes, boolean properties, styles, fragments, and text on the server and client, then hydrate only after the browser has the matching DOM.",
  guideCard("Render HTML", "renderToString(view)", "import { renderToString } from 'onekit-js/ssr';\n\nconst html = await renderToString(App({ url: request.url }));\nreturn new Response(html, { headers: { 'content-type': 'text/html' } });", "the initial document should contain meaningful content before JavaScript loads.", "do not read window or document during server render; pass request data explicitly into the view.") +
  guideCard("Streaming", "new StreamingRenderer().renderToStream(view)", "import { StreamingRenderer } from 'onekit-js/ssr';\n\nconst renderer = new StreamingRenderer();\nconst stream = await renderer.renderToStream(App({ request }));\nreturn new Response(stream, { headers: { 'content-type': 'text/html' } });", "large pages can send the shell and progressively flush ready content.", "preserve error semantics: a rejected async boundary must produce a controlled response, not a half-valid document.") +
  guideCard("Hydrate", "hydrate(root, view)", "import { hydrate } from 'onekit-js';\n\nconst root = document.querySelector('#app');\nif (root) hydrate(root, App({ url: location.pathname }));", "the server already produced the DOM and the client should attach behavior without replacing it.", "keep server and client inputs stable; mismatched IDs, booleans, styles, or fragments cause hydration drift.")
);

sectionMarkup.security = guideSection("security", "13", "V3 GUIDES", "Treat every boundary as untrusted", "OneKit V3 hardens the rendering boundary against common browser attacks. Safe defaults help, but they do not replace server-side authorization, output encoding for external systems, or a reviewed Content Security Policy.",
  guideCard("Safe URLs", "safe URL props", "import { h } from 'onekit-js';\n\nconst link = h('a', { href: userProvidedLink }, 'Open');\nrender(link, container);", "a URL comes from a user, CMS, query string, or remote API.", "reject javascript:, data:, and unexpected protocols; validate allowed hosts on the server for redirects and downloads.") +
  guideCard("HTML sanitization", "sanitized template content", "import { compileTemplate } from 'onekit-js/template';\n\nconst view = compileTemplate('<article></article>', { article });\nview.querySelector('article')!.textContent = article.body;\ncontainer.replaceChildren(view);", "you must render a trusted subset of rich text rather than plain text.", "prefer textContent for ordinary text; sanitize again if content crosses a service boundary or changes sanitizer policy.") +
  guideCard("Prototype guards", "allowlisted object keys", "const allowed = new Set(['name', 'email']);\nconst target: Record<string, unknown> = {};\nfor (const [key, value] of Object.entries(input)) {\n  if (allowed.has(key)) target[key] = value;\n}", "you copy user-controlled keys into objects, stores, or configuration.", "block __proto__, constructor, and prototype keys; use schema validation for request bodies and configuration.") +
  guideCard("CSP and events", "safe event/style handling", "const policy = {\n  'script-src': [\"'self'\"],\n  'object-src': [\"'none'\"],\n};\nconsole.log(policy);", "the app handles dynamic styles, event props, or inline content.", "avoid string-to-code evaluation, keep CSP narrow, and never treat an event name or style value from a user as trusted code.")
);

sectionMarkup.testing = guideSection("testing", "14", "V3 GUIDES", "Test behavior at the DOM boundary", "The testing layer favors what a user can observe: rendered output, events, navigation, and async updates. Use memory routing for deterministic route tests and wait for visible results instead of private implementation details.",
  guideCard("Render a view", "renderTest(view)", "import { renderTest } from 'onekit-js/testing';\n\nconst screen = renderTest(App());\nexpect(screen.getByText('Projects')).toBeTruthy();", "a test needs a small DOM container with cleanup between cases.", "assert accessible text and roles rather than component internals or generated class names.") +
  guideCard("Fire events", "fireEvent.click / input", "import { fireEvent } from 'onekit-js/testing';\n\nfireEvent.input(screen.getByLabelText('Name'), { target: { value: 'Docs' } });\nfireEvent.click(screen.getByRole('button', { name: 'Save' }));", "you want to exercise the same event path a real browser uses.", "test disabled and loading states too; do not bypass validation by mutating reactive state directly.") +
  guideCard("Wait for UI", "waitFor(assertion)", "import { waitFor } from 'onekit-js/testing';\n\nawait waitFor(() => {\n  expect(screen.getByText('Saved')).toBeTruthy();\n});", "a request, effect, router transition, or next tick updates the DOM asynchronously.", "keep timeouts bounded and make failures actionable; avoid arbitrary sleep calls.")
);

sectionMarkup.tooling = guideSection("tooling", "15", "V3 GUIDES", "Make the CLI your repeatable starting line", "The CLI creates a clean project, preserves TypeScript declarations, and surfaces diagnostics early. Use it for new apps, then keep the generated scripts in CI so local and production checks agree.",
  guideCard("Create a project", "create-onekit@1.0.7", "npm create onekit@1.0.7 my-app\ncd my-app\nnpm install\nnpm run dev", "you want the official V3 starter with the browser entrypoint, Vite types, tests, and creator credit already wired.", "use Node.js 18+ and commit the lockfile; if a registry has not published 3.1.17 yet, validate against the local package tarball during development.") +
  guideCard("Diagnostics", "onekit doctor", "npx onekit doctor\n# inspect configuration, versions, and common setup errors\n# fix the reported code before shipping", "a generated project fails before the browser renders or a teammate needs a clear setup report.", "share the diagnostic code and environment, not secrets or full credential files.") +
  guideCard("Release checks", "type-check · test · build", "npm run type-check\nnpm test\nnpm run build\nnpm run verify:declarations", "a package or app is ready for a pull request or release.", "run declaration verification after changing public exports; inspect warnings instead of hiding them.")
);

sectionMarkup.browser = guideSection("browser", "16", "V3 GUIDES", "Add platform polish without losing control", "OneKit keeps browser helpers close to the platform. Add keyboard access, safe persistence, motion preferences, network cancellation, and failure boundaries as explicit layers around your core view.",
  guideCard("Accessibility", "createSkipLink / createLandmarks", "import { createSkipLink, createLandmarks } from 'onekit-js';\n\nconst link = createSkipLink('#main', 'Skip to content');\ndocument.body.append(link);\ncreateLandmarks();", "a shell has repeated navigation, drawers, or route changes that need predictable focus.", "use real headings, labels, focus rings, and reduced-motion behavior; helpers cannot repair an incorrect information hierarchy.") +
  guideCard("Storage", "localStorage.get / set / remove", "import { localStorage } from 'onekit-js';\n\nlocalStorage.set('theme', 'dark');\nconst theme = localStorage.get('theme');\nlocalStorage.remove('theme');", "small non-sensitive preferences should survive a reload.", "never store tokens, passwords, or private personal data in localStorage; handle unavailable storage gracefully.") +
  guideCard("Animation", "ok(element).scaleIn / prefers-reduced-motion", "import { ok } from 'onekit-js';\n\nconst card = ok(element);\nif (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {\n  card.scaleIn(180);\n}", "a meaningful state transition benefits from a short visual response.", "animate opacity and transform, keep motion interruptible, and respect prefers-reduced-motion.") +
  guideCard("Error boundaries", "createErrorBoundary / errorHandler", "import { createErrorBoundary } from 'onekit-js';\n\nconst boundary = createErrorBoundary({ fallback: () => 'Try again' });\nconst result = boundary.run(() => renderPanel());", "a feature can fail independently without taking down the entire shell.", "log enough context for diagnosis while redacting tokens, request bodies, and personal data.")
);

sectionMarkup["web-components"] = guideSection("web-components", "17", "V3 GUIDES", "Share OneKit UI with any browser app", "Web Components let a OneKit component cross framework boundaries. Define a custom element at the edge of the application, keep its internal state in OneKit, and communicate with standard attributes and CustomEvents.",
  guideCard("Define an element", "registerWebComponent(name, component)", "import { registerWebComponent } from 'onekit-js';\n\nregisterWebComponent('user-card', UserCard);\n// <user-card user-id='42'></user-card>", "a host application is not built with OneKit but needs one reusable widget.", "use kebab-case names, reflect only safe public attributes, and document emitted events as a stable contract.") +
  guideCard("Observe events", "CustomEvent detail", "element.addEventListener('user-selected', event => {\n  const user = event.detail;\n  console.log(user.id);\n});", "the host needs a framework-neutral event boundary.", "validate event detail before using it and keep event names/versioned payloads backward compatible.") +
  guideCard("Unmount cleanly", "dispose / disconnectedCallback", "const instance = create('UserCard');\nconst stop = mount(instance, element);\n// call stop when the host removes the element\nstop();", "a custom element can be added and removed repeatedly by the host app.", "dispose effects, listeners, observers, and pending requests when the element disconnects.")
);

sectionMarkup.architecture = guideSection("architecture", "18", "DEEP DIVE", "Design applications around explicit boundaries", "A production OneKit app separates reactive state, view composition, URL state, external I/O, and cleanup. These boundaries keep features understandable as the codebase grows.", `<div class="manual-prose"><h2>The five boundaries</h2><div class="manual-grid"><div class="data-card"><span class="data-label">STATE</span><h3>Reactive data</h3><p>Use <code>reactive()</code> for mutable domain state and <code>computed()</code> for derived values. Do not store the same derived value in a second mutable field.</p></div><div class="data-card"><span class="data-label">VIEW</span><h3>Components</h3><p>Keep DOM composition and event wiring in components. Pass data through explicit props instead of reaching into unrelated stores.</p></div><div class="data-card"><span class="data-label">URL</span><h3>Router records</h3><p>Let route params, query strings, loaders, guards, nested layouts, and prefetching describe navigation state.</p></div><div class="data-card"><span class="data-label">I/O</span><h3>Services</h3><p>Put HTTP, storage, analytics, and browser integrations behind small functions that can be replaced in tests.</p></div></div><h2>Scalable project shape</h2><pre><code>src/
  app.ts                 # router, providers, global error policy
  routes/                # route records and page loaders
  components/            # reusable visual components
  stores/                # shared domain state
  services/              # HTTP, storage, analytics adapters
  features/              # feature-local code and tests
  styles/                # tokens and global CSS</code></pre><p>When a component grows, first extract a pure view, then move state transitions into a store or service, and finally create a route boundary when the feature has its own URL, loading state, error state, or permission policy.</p></div>`);

sectionMarkup["deep-reactivity"] = guideSection("deep-reactivity", "19", "DEEP DIVE", "Make reactivity predictable under load", "The runtime tracks reads during effects, batches writes, and exposes cleanup primitives for resources that outlive a callback. Treat those rules as contracts.", `<div class="manual-prose"><h2>Read tracking</h2><p>An effect reruns when a reactive property read during its previous execution changes. Read only the fields the view uses; broad object reads create broad dependencies.</p><pre><code>const state = reactive({ query: "", page: 1 });
const result = computed(() => search(state.query, state.page));
const stop = effect(() => renderResults(result.value));
stop();</code></pre><h2>Batch related writes</h2><pre><code>batch(() => {
  state.query = nextQuery;
  state.page = 1;
  state.status = "loading";
});
await nextTick();</code></pre><p>Use scopes and disposal callbacks for timers, listeners, observers, subscriptions, and request cancellation. If a callback can run after a route disappears, it needs an explicit cleanup owner.</p><div class="callout"><strong>Debug order:</strong> verify the effect reads the changed field, stabilize query inputs, check whether the scope was stopped, and log <code>snapshot()</code> instead of a live Proxy.</div></div>`);

sectionMarkup.recipes = guideSection("recipes", "20", "BUILD REAL APPS", "Build complete application surfaces", "The most useful examples show where every primitive belongs in a real feature.", `<div class="manual-prose"><h2>CRUD screen</h2><p>Use a route loader for the initial collection, a query client for deduplicated reads, a typed form for create/edit state, and a store only for state shared across sibling views.</p><pre><code>const tasks = await queryClient.fetch({ key: ["tasks"], queryFn: () => get("/api/tasks") });
const form = createForm({ title: "" }, { validate: values => values.title.trim() ? {} : { title: "Required" } });
async function submit() {
  if (!form.validate()) return;
  await post("/api/tasks", form.values);
  await queryClient.invalidate(["tasks"]);
}</code></pre><h2>Dashboard shell</h2><p>Put the persistent sidebar and top-level error boundary in a layout. Child routes own page titles, loaders, pending states, and permission-aware empty states.</p><h2>Search</h2><p>Keep filters reactive, debounce requests, cancel obsolete work, and encode shareable filters in the URL.</p><pre><code>const filters = reactive({ q: "", status: "all" });
const runSearch = debounce(() => router.replace({ path: "/tasks", query: filters }), 180);</code></pre><h2>Testing recipe</h2><p>Render at the DOM boundary, fire user events, wait for visible state, and assert the resulting DOM. Avoid testing internal Proxy details when a user-visible assertion expresses the contract.</p></div>`);

sectionMarkup.migration = guideSection("migration", "21", "BUILD REAL APPS", "Translate React and Vue mental models", "OneKit is familiar but intentionally smaller: browser primitives, explicit effects, and no mandatory virtual component hierarchy.", `<div class="manual-prose"><h2>React to OneKit</h2><table class="manual-table"><thead><tr><th>React</th><th>OneKit</th><th>Guidance</th></tr></thead><tbody><tr><td><code>useState</code></td><td><code>reactive()</code></td><td>Mutate a focused object.</td></tr><tr><td><code>useMemo</code></td><td><code>computed()</code></td><td>Declare derived state.</td></tr><tr><td><code>useEffect</code></td><td><code>effect()</code> + cleanup</td><td>Own subscriptions explicitly.</td></tr><tr><td>Context</td><td>store/provider boundary</td><td>Share only intentional state.</td></tr><tr><td>React Router</td><td><code>createRouter()</code></td><td>Use typed records and nested layouts.</td></tr></tbody></table><h2>Vue to OneKit</h2><table class="manual-table"><thead><tr><th>Vue</th><th>OneKit</th><th>Guidance</th></tr></thead><tbody><tr><td><code>ref</code>/<code>reactive</code></td><td><code>reactive</code></td><td>Group fields that change together.</td></tr><tr><td><code>computed</code></td><td><code>computed</code></td><td>Keep derived values read-only.</td></tr><tr><td><code>watch</code></td><td><code>watch</code></td><td>Use it for side effects.</td></tr><tr><td>Composable</td><td>service/store/scope</td><td>Choose the smallest lifecycle owner.</td></tr><tr><td>SFC</td><td><code>.okjs</code>, template, or JSX</td><td>Choose a reviewable build format.</td></tr></tbody></table><h2>Migration checklist</h2><ol><li>Move data fetching into loaders or services.</li><li>Replace duplicated derived state with <code>computed()</code>.</li><li>Give every subscription and timer a cleanup owner.</li><li>Keep authorization on the server.</li><li>Measure the same user journey before and after migration.</li></ol></div>`);

sectionMarkup.performance = guideSection("performance", "22", "SHIP IT", "Measure the work users experience", "Performance includes startup, route transitions, input latency, network duplication, DOM work, hydration, and the cost of enabled features.", `<div class="manual-prose"><div class="manual-grid"><div class="data-card"><span class="data-label">BUNDLE</span><p>Import deliberately, remove unused adapters, and inspect production output after each major feature.</p></div><div class="data-card"><span class="data-label">NETWORK</span><p>Deduplicate reads, set stale time, cancel obsolete requests, and prefetch likely routes.</p></div><div class="data-card"><span class="data-label">DOM</span><p>Keep effects narrow, batch writes, and avoid replacing a large subtree unnecessarily.</p></div><div class="data-card"><span class="data-label">SSR</span><p>Stream slow regions and keep server/client markup structurally identical.</p></div></div><h2>Review commands</h2><pre><code>npm run type-check
npm test
npm run build
npm run verify:declarations
npm pack --dry-run</code></pre><p>Record browser, route, data size, cold/warm state, build mode, and network conditions. A smaller bundle matters only when it improves the target user journey.</p></div>`);

sectionMarkup.troubleshooting = guideSection("troubleshooting", "23", "REFERENCE", "Find the earliest failing boundary", "Separate setup, compile-time, routing, runtime, browser, and deployment failures before changing code.", `<div class="manual-prose"><div class="troubleshooting-list"><div><strong>Nothing renders</strong><p>Confirm the mount target, entry module, and browser import errors. Render static text before adding reactivity.</p></div><div><strong>State does not update</strong><p>Confirm <code>reactive()</code>, the effect dependency, and that its scope was not stopped.</p></div><div><strong>Route refresh returns 404</strong><p>Configure the host fallback to <code>/index.html</code> and verify the base path.</p></div><div><strong>Hydration mismatch</strong><p>Compare attributes, booleans, styles, fragments, and conditional branches. Avoid random/time-dependent render output.</p></div><div><strong>Duplicate requests</strong><p>Stabilize query keys and object inputs; do not create arrays or dates inside render.</p></div><div><strong>Declaration error</strong><p>Run the build and declaration verifier; every public export must have a generated <code>dist/types</code> file.</p></div><div><strong>Security report</strong><p>Reproduce minimally, sanitize at the boundary, reject unsafe schemes, and add a regression test.</p></div></div><h2>Diagnostic order</h2><ol><li><code>npm run type-check</code></li><li><code>npm test -- --runInBand</code></li><li><code>npm run build</code></li><li><code>npm run verify:declarations</code></li><li>Inspect console and network panels.</li><li>Reduce the route to one component and one state transition.</li></ol></div>`);

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
sectionMarkup.features += `<div class="usage-lab feature-usage"><div class="section-kicker"><span>ADVANCED PATTERNS</span><span>ONEKIT POWER TOOLS</span></div><p class="usage-intro">Use these patterns when an application needs stronger lifecycle control, instrumentation, safe expressions, animation, and production-grade state utilities.</p>${usageCard("Reactive snapshots", "import { snapshot, bind, nextTick } from \"onekit-js\";", "const state = reactive({ title: \"OneKit\" });\nconst input = document.createElement(\"input\");\ndocument.body.append(input);\nbind(input, state, \"title\");\nstate.title = \"Advanced\";\nawait nextTick();\noutput(snapshot(state).title);", "Bind a reactive property to a DOM input, wait for the next flush, and snapshot plain serializable state.")}${usageCard("Scope diagnostics", "import { effectScope, registerDisposable, getActiveScopeDiagnostics } from \"onekit-js\";", "const scope = effectScope();\nconst resource = registerDisposable({ dispose: () => output(\"disposed\") });\noutput(String(getActiveScopeDiagnostics().length >= 0));\nscope.stop();\nresource.dispose?.();", "Use disposable scopes to make subscriptions and external resources observable and easy to clean up.")}${usageCard("DevTools instrumentation", "import { enableDevTools, devToolsSnapshot, getResourceGraph } from \"onekit-js\";", "enableDevTools({ name: \"Docu Web\" });\nconst view = devToolsSnapshot({ route: \"/docs/features\" });\noutput(view.route + \" / \" + getResourceGraph().length);", "Expose safe snapshots and resource graphs to development tooling without shipping debugging UI to production.")}${usageCard("DOM animation", "import { ok } from \"onekit-js\";", "const target = document.querySelector(\"#app\");\nif (target) { target.textContent = \"Animated\"; ok(target).pulse(160, 1); }\noutput(\"animation queued\");", "Use the chainable DOM helper for small transform/opacity animations while keeping the application logic close to the platform.")}${usageCard("Safe expressions", "import { evaluateSafeExpression } from \"onekit-js\";", "const value = evaluateSafeExpression(\"user.name\", { user: { name: \"Arkar\" } });\noutput(String(value));", "Evaluate constrained expressions against an explicit context instead of executing arbitrary application strings.")}${usageCard("Deep utilities", "import { deepCloneSafe, throttle, validateSelector } from \"onekit-js\";", "const copy = deepCloneSafe({ ready: true });\nconst valid = JSON.stringify(copy).includes(\"ready\") && validateSelector(\"#app\");\nconst limited = throttle(() => output(\"throttled\"), 20);\nlimited();\noutput(valid ? \"validated\" : \"review\");", "Combine safe cloning, JSON validation, selector validation, and throttling at untrusted or high-frequency boundaries.")}${usageCard("Open Graph SSR", "import { renderOpenGraph, renderTitle, setMeta } from \"onekit-js\";", "const title = renderTitle(\"OneKit Docs\");\nconst og = renderOpenGraph(\"og:title\", \"OneKit Docs\");\noutput(title + og);", "Generate title and Open Graph metadata from the same SSR pipeline used for route-aware pages.")}${usageCard("Store plugins", "import { createStore, addStorePlugin, getAllStores, removeStore } from \"onekit-js\";", "addStorePlugin({ onCreate: store => { store.meta = { source: \"docs\" }; } });\nconst store = createStore(\"lesson\", () => ({ count: 1 }));\noutput(String(getAllStores().length > 0));\nremoveStore(store.id);", "Use store plugins for cross-cutting persistence, telemetry, or policy while keeping feature stores small.")}${usageCard("Component props lifecycle", "import { create, getInstance, onPropsChanged, destroy } from \"onekit-js\";", "const instance = create(\"lesson-card\", { title: \"Advanced\" });\nif (instance) { onPropsChanged((next) => output(String(next.title))); const node = instance.element; getInstance(node); destroy(instance); }\noutput(\"lifecycle ready\");", "Inspect component instances and dispose them explicitly when dynamic views leave the document.")}</div></section>`;
sectionMarkup.features += `<div class="usage-lab feature-usage"><div class="section-kicker"><span>ADVANCED USAGE</span><span>REMAINING APIS</span></div><p class="usage-intro">The remaining framework systems are documented here as focused recipes: templates, DOM patching, lifecycle hooks, persistence layers, tooling, and the OKJS compiler.</p>${usageCard("Template compiler", "import { compileTemplate, initTemplateEngine } from \"onekit-js\";", "initTemplateEngine();\\nconst node = compileTemplate(\"<p>Hello {{ name }}</p>\", { name: \"OneKit\" });\\noutput(node.textContent);", "Compile a template against a plain context without a full component definition.")}${usageCard("VDOM patch", "import { createElement, patch } from \"onekit-js\";", "const next = createElement(\"p\", {}, \"Updated\");\\nconst host = document.querySelector(\"#app\");\\npatch(host, next);\\noutput(host.textContent);", "Use createElement() and patch() for low-level DOM updates.")}${usageCard("Session and cache", "import { sessionStorage, cache } from \"onekit-js\";", "sessionStorage.set(\"lesson\", \"advanced\");\\ncache.set(\"last-route\", \"/docs/features\");\\noutput(sessionStorage.get(\"lesson\") + \" / \" + cache.get(\"last-route\"));", "Use sessionStorage for tab-scoped state and cache for short-lived browser data.")}${usageCard("Component lifecycle", "import { onMounted, onUpdated, onDestroyed } from \"onekit-js\";", "onMounted(() => output(\"mounted\"));\\nonUpdated(() => console.log(\"updated\"));\\nonDestroyed(() => console.log(\"destroyed\"));", "Register lifecycle callbacks inside component setup.")}${usageCard("OKJS compiler", "import { parseOkjs, compileOkjs } from \"onekit-js\";", "const source = \"<template><h1>Hello</h1></template>\";\\nconst block = parseOkjs(source, \"lesson.okjs\");\\nconst compiled = compileOkjs(source, \"lesson.okjs\");\\noutput(String(block.template.length) + \" / \" + String(compiled.code.length));", "Parse and compile .okjs single-file components during tooling or build steps.")}${usageCard("DevTools bridge", "import { enableDevTools, isDevToolsEnabled } from \"onekit-js\";", "enableDevTools({ name: \"Docu Web\" });\\noutput(String(isDevToolsEnabled()));", "Enable the development bridge only in local tooling.")}${usageCard("Loading boundary", "import { createLoadingBoundary } from \"onekit-js\";", "const boundary = createLoadingBoundary();\\noutput(typeof boundary.start === \"function\" ? \"ready\" : \"missing\");", "Use a loading boundary for asynchronous component work.")}</div></section>`;

sectionMarkup.features += `<div class="usage-lab feature-usage"><div class="section-kicker"><span>COMPLETE API COVERAGE</span><span>DEPLOYMENT AND REMAINING SYSTEMS</span></div><p class="usage-intro">These recipes cover the framework systems that sit around the core reactive loop: server rendering, accessibility, security, resource loading, error boundaries, networking, and HMR.</p>${usageCard("SSR and hydration", "import { createSSRContext, renderToString, hydrate } from \"onekit-js\";", "const context = createSSRContext();\nconst html = renderToString({ type: \"p\", props: {}, children: [\"Hello OneKit\"] }, context);\noutput(typeof html === \"string\" ? \"SSR ready\" : \"SSR result\");", "Create a server context, render a VNode to HTML, and hydrate the matching browser root when the client starts.")}${usageCard("SSR head resources", "import { createSSRContext, addToHead, addStyle, preloadModule } from \"onekit-js\";", "const context = createSSRContext();\naddToHead(context, \"<meta name=description content=OneKit>\");\naddStyle(context, \"body{color:navy}\");\noutput(preloadModule(\"/assets/app.js\"));", "Keep server-rendered head metadata, styles, scripts, and preload hints in one SSR context.")}${usageCard("Accessibility focus", "import { createSkipLink, trapFocus, validateAccessibility } from \"onekit-js\";", "const link = createSkipLink(\"#main\", \"Skip to content\");\ndocument.body.append(link);\nconst stop = trapFocus(document.body);\noutput(validateAccessibility(document.body).valid ? \"accessible\" : \"review required\");\nstop();", "Use skip links, focus traps, and validation together for keyboard-friendly dialogs and documentation shells.")}${usageCard("Security and CSP", "import { sanitizeHTML, sanitizeURL } from \"onekit-js\";", "const clean = sanitizeHTML(\"<script>alert(1)</script>\");\nconst safeURL = sanitizeURL(\"javascript:alert(1)\");\noutput(clean + \" | \" + safeURL);", "Sanitize untrusted input at the boundary and generate a host-aligned CSP instead of trusting browser content.")}${usageCard("Resource loading", "import { preloadScript, preloadStyle, addScript } from \"onekit-js\";", "const scriptHint = preloadScript(\"/assets/feature.js\");\nconst styleHint = preloadStyle(\"/assets/feature.css\");\noutput(scriptHint.includes(\"preload\") && styleHint.includes(\"preload\") ? \"hints ready\" : \"review\");", "Generate preload hints during SSR and add scripts through the framework resource helpers when they are needed.")}${usageCard("Error boundary", "import { createErrorBoundary, errorHandler } from \"onekit-js\";", "const boundary = createErrorBoundary({ fallback: () => \"Fallback\" });\nconst safe = boundary.run(() => { throw new Error(\"demo\"); });\nerrorHandler(\"handled\", \"showcase\");\noutput(String(safe));", "Contain component failures with a boundary and route unexpected errors through the framework handler.")}${usageCard("Networking", "import { request, put, del } from \"onekit-js\";", "const options = { headers: { Accept: \"application/json\" } };\noutput(typeof request === \"function\" && typeof put === \"function\" && typeof del === \"function\" ? \"HTTP API ready\" : \"missing\");", "Use request, put, and del for JSON APIs, while keeping credentials and private tokens on the server.")}${usageCard("HMR and plugins", "import { registerDirective, registerDisposable } from \"onekit-js\";", "const resource = registerDisposable({ dispose: () => console.log(\"disposed\") });\nregisterDirective(\"focus\", { mounted: element => element.focus() });\noutput(typeof resource.dispose === \"function\" ? \"directive ready\" : \"missing\");", "Preserve local state during hot updates and register reusable directives/disposables at development time.")}${usageCard("Landmarks", "import { createLandmarks, skipToContent } from \"onekit-js\";", "createLandmarks();\nskipToContent(\"main\");\noutput(\"landmarks ready\");", "Create semantic landmarks and move focus to the main content target when navigation changes.")}${usageCard("Scheduling and cache", "import { batch, nextTick, withCache } from \"onekit-js\";", "batch(() => output(\"batched\"));\nawait nextTick();\noutput(typeof withCache === \"function\" ? \"cache ready\" : \"missing\");", "Batch reactive updates, await the next render tick, and cache repeatable SSR work with the framework helper.")}</div></section>`;

const runnerSrcDoc = `<!doctype html><html><head><meta charset="UTF-8"><style>body{margin:0;padding:15px;background:#11242e;color:#a9cba1;font:12px/1.75 monospace;white-space:pre-wrap}#status{color:#71878c;font-size:10px;margin-bottom:10px;text-transform:uppercase;letter-spacing:.08em}#output{color:#a9cba1}</style></head><body><div id="status">SAFE RUNTIME · READY</div><div id="output">Run the example to see OneKit react.</div><div id="app"><span id="count">0</span><button id="add" type="button">Add</button></div><script>
const outputNode=document.getElementById('output'); const statusNode=document.getElementById('status'); const appNode=document.getElementById('app');
const send=(message)=>parent.postMessage({source:'docu-onekit-runner',...message},'*');
let OneKitRuntime=null;
const entries=[]; function paint(text){const value=String(text); entries.push({level:'log',text:value}); outputNode.textContent=entries.map(item=>item.text).join('\\n');}
window.addEventListener('message',async(event)=>{const data=event.data;if(!data||data.type!=='run'||!OneKitRuntime)return;statusNode.textContent='SAFE RUNTIME · RUNNING';outputNode.textContent='';try{const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;const runUserCode=new AsyncFunction('reactive','effect','computed','watch','snapshot','bind','nextTick','autorun','defineComponent','register','create','mount','getInstance','destroy','setupComponent','onPropsChanged','h','render','ok','createRouter','defineStore','createStore','useStore','getAllStores','removeStore','addStorePlugin','localStorage','announce','setAriaAttributes','registerWebComponent','get','post','deepCloneSafe','throttle','validateSelector','evaluateSafeExpression','devToolsSnapshot','getResourceGraph','renderOpenGraph','safeMethod','sanitizeHTML','sanitizeURL','withScope','effectScope','onScopeDispose','renderTitle','renderMeta','debounce','generateId','compileTemplate','initTemplateEngine','createElement','patch','sessionStorage','cache','onMounted','onUpdated','onDestroyed','parseOkjs','compileOkjs','enableDevTools','isDevToolsEnabled','createLoadingBoundary','renderToString','hydrate','createSSRContext','addToHead','addStyle','preloadModule','createSkipLink','trapFocus','validateAccessibility','sanitizeInput','generateCSPHeader','updateSecurityConfig','preloadScript','preloadStyle','addScript','createErrorBoundary','errorHandler','request','put','del','preserveHMRState','registerHMRDisposable','registerDirective','output','console','document','"use strict";\\n'+data.code);await runUserCode(OneKitRuntime.reactive,OneKitRuntime.effect,OneKitRuntime.computed,OneKitRuntime.watch,OneKitRuntime.snapshot,OneKitRuntime.bind,OneKitRuntime.nextTick,OneKitRuntime.autorun,OneKitRuntime.defineComponent,OneKitRuntime.register,OneKitRuntime.create,OneKitRuntime.mount,OneKitRuntime.getInstance,OneKitRuntime.destroy,OneKitRuntime.setupComponent,OneKitRuntime.onPropsChanged,OneKitRuntime.h,OneKitRuntime.render,OneKitRuntime.ok,OneKitRuntime.createRouter,OneKitRuntime.defineStore,OneKitRuntime.createStore,OneKitRuntime.useStore,OneKitRuntime.getAllStores,OneKitRuntime.removeStore,OneKitRuntime.addStorePlugin,OneKitRuntime.localStorage,OneKitRuntime.announce,OneKitRuntime.setAriaAttributes,OneKitRuntime.registerWebComponent,OneKitRuntime.get,OneKitRuntime.post,OneKitRuntime.deepCloneSafe,OneKitRuntime.throttle,OneKitRuntime.validateSelector,OneKitRuntime.evaluateSafeExpression,OneKitRuntime.devToolsSnapshot,OneKitRuntime.getResourceGraph,OneKitRuntime.renderOpenGraph,OneKitRuntime.safeMethod,OneKitRuntime.sanitizeHTML,OneKitRuntime.sanitizeURL,OneKitRuntime.withScope,OneKitRuntime.effectScope,OneKitRuntime.onScopeDispose,OneKitRuntime.renderTitle,OneKitRuntime.renderMeta,OneKitRuntime.debounce,OneKitRuntime.generateId,OneKitRuntime.compileTemplate,OneKitRuntime.initTemplateEngine,OneKitRuntime.createElement,OneKitRuntime.patch,OneKitRuntime.sessionStorage,OneKitRuntime.cache,OneKitRuntime.onMounted,OneKitRuntime.onUpdated,OneKitRuntime.onDestroyed,OneKitRuntime.parseOkjs,OneKitRuntime.compileOkjs,OneKitRuntime.enableDevTools,OneKitRuntime.isDevToolsEnabled,OneKitRuntime.createLoadingBoundary,OneKitRuntime.renderToString,OneKitRuntime.hydrate,OneKitRuntime.createSSRContext,OneKitRuntime.addToHead,OneKitRuntime.addStyle,OneKitRuntime.preloadModule,OneKitRuntime.createSkipLink,OneKitRuntime.trapFocus,OneKitRuntime.validateAccessibility,OneKitRuntime.sanitizeInput,OneKitRuntime.generateCSPHeader,OneKitRuntime.updateSecurityConfig,OneKitRuntime.preloadScript,OneKitRuntime.preloadStyle,OneKitRuntime.addScript,OneKitRuntime.createErrorBoundary,OneKitRuntime.errorHandler,OneKitRuntime.request,OneKitRuntime.put,OneKitRuntime.del,OneKitRuntime.preserveHMRState,OneKitRuntime.registerHMRDisposable,OneKitRuntime.registerDirective,paint,{log:(...args)=>paint(args.join(' '))},document);if(!outputNode.textContent.trim()){outputNode.textContent=appNode.textContent.trim()||'Completed';}statusNode.textContent='SAFE RUNTIME · COMPLETE';send({type:'complete',text:outputNode.textContent,entries:entries.slice(-50)})}catch(error){statusNode.textContent='RUNTIME ERROR';outputNode.textContent=(error&&error.name?error.name+': ':'')+(error&&error.message?error.message:String(error));send({type:'error',text:outputNode.textContent,error:{name:error&&error.name?error.name:'Error',message:error&&error.message?error.message:String(error),stack:error&&error.stack?String(error.stack):''},entries:entries.slice(-50)})}});
fetch('/onekit-runtime.js').then(response=>response.text()).then(source=>{const moduleExports={};new Function('exports','module','define',source)(moduleExports,{exports:moduleExports},undefined);OneKitRuntime=moduleExports;statusNode.textContent='SAFE RUNTIME · ONEKIT LOADED';send({type:'ready',runtime:'onekit-js'});}).catch(error=>{statusNode.textContent='RUNTIME LOAD ERROR';outputNode.textContent=String(error);send({type:'error',text:outputNode.textContent,error:{name:error&&error.name?error.name:'Error',message:error&&error.message?error.message:String(error),stack:error&&error.stack?String(error.stack):''},entries:entries.slice(-50)});});
</script></body></html>`;

function resetRunner(frame: HTMLIFrameElement) {
  frame.dataset.loaded = "false";
  frame.srcdoc = runnerSrcDoc;
  frame.dataset.ready = "true";
}

const runnerFrames = new WeakSet<HTMLIFrameElement>();
const runnerTimers = new WeakMap<HTMLIFrameElement, number>();
let runnerBusBound = false;
function formatRunnerMessage(data: any) {
  if (data?.type === "error") return `ERROR · ${data.error?.name ?? "RuntimeError"}: ${data.error?.message ?? data.text ?? "runtime failure"}`;
  if (data?.entries?.length) return `OUTPUT · ${data.entries.map((entry: { text: string }) => entry.text).join(" | ")}`;
  return `OUTPUT · ${data?.text ?? "Completed"}`;
}
function bindRunnerBus() {
  if (runnerBusBound) return;
  runnerBusBound = true;
  window.addEventListener("message", (event) => {
    if (event.data?.source !== "docu-onekit-runner") return;
    const frame = Array.from(document.querySelectorAll<HTMLIFrameElement>("iframe")).find((candidate) => candidate.contentWindow === event.source);
    if (!frame || !runnerFrames.has(frame)) return;
    if (event.data.type === "ready") {
      frame.dataset.loaded = "true";
      const pending = frame.dataset.pendingCode;
      if (pending && frame.contentWindow) { delete frame.dataset.pendingCode; frame.contentWindow.postMessage({ type: "run", code: pending }, "*"); }
      const status = (frame.closest(".usage-card, .runnable-card") as HTMLElement | null)?.querySelector("[data-example-status], .run-status") as HTMLElement | null;
      if (status) status.textContent = "READY · OneKit loaded";
      return;
    }
    const timer = runnerTimers.get(frame);
    if (timer) { window.clearTimeout(timer); runnerTimers.delete(frame); }
    const status = (frame.closest(".usage-card, .runnable-card") as HTMLElement | null)?.querySelector("[data-example-status], .run-status") as HTMLElement | null;
    if (status) status.textContent = formatRunnerMessage(event.data);
    if (frame.id === "playground-frame") state.playgroundOutput = formatRunnerMessage(event.data);
  });
}

function bindUsageRunners() {
  bindRunnerBus();
  document.querySelectorAll<HTMLElement>(".usage-card").forEach((card) => {
    const run = card.querySelector<HTMLButtonElement>(".example-run");
    const reset = card.querySelector<HTMLButtonElement>(".example-reset");
    const frame = card.querySelector<HTMLIFrameElement>(".example-frame");
    const status = card.querySelector<HTMLElement>("[data-example-status]");
    if (!run || !reset || !frame || !status || run.dataset.bound === "true") return;
    run.dataset.bound = "true";
    const timer = { id: 0 as number | undefined };
    const execute = (code: string) => {
      if (!frame.contentWindow) return;
      if (timer.id) window.clearTimeout(timer.id);
      status.textContent = "RUNNING";
      frame.contentWindow.postMessage({ type: "run", code }, "*");
      const timeoutId = window.setTimeout(() => {
        status.textContent = "TIMEOUT: sandbox reset";
        runnerTimers.delete(frame);
        delete frame.dataset.pendingCode;
        resetFrame();
      }, 3000);
      runnerTimers.set(frame, timeoutId);
    };
    const resetFrame = () => {
      if (timer.id) { window.clearTimeout(timer.id); timer.id = undefined; }
      const timeoutId = runnerTimers.get(frame); if (timeoutId) { window.clearTimeout(timeoutId); runnerTimers.delete(frame); }
      frame.srcdoc = runnerSrcDoc;
      frame.dataset.loaded = "false";
      status.textContent = "READY";
    };
    runnerFrames.add(frame);
    run.addEventListener("click", () => {
      const code = decodeURIComponent(run.dataset.exampleCode ?? "");
      if (frame.dataset.loaded === "true") execute(code);
      else { frame.dataset.pendingCode = code; resetFrame(); }
    });
    reset.addEventListener("click", resetFrame);
    resetFrame();
  });
}

function bindLessonRunners() {
  bindRunnerBus();
  document.querySelectorAll<HTMLButtonElement>("[data-run-code]").forEach((button) => {
    if (button.dataset.bound === "true") return;
    const card = button.closest<HTMLElement>(".runnable-card");
    const status = card?.querySelector<HTMLElement>(".run-status");
    if (!card || !status) return;
    const frame = document.createElement("iframe");
    frame.className = "lesson-frame";
    frame.title = "Safe beginner code output";
    frame.setAttribute("sandbox", "allow-scripts allow-same-origin");
    card.appendChild(frame);
    button.dataset.bound = "true";
    const timer = { id: 0 as number | undefined };
    const execute = (code: string) => {
      if (!frame.contentWindow) return;
      status.textContent = "RUNNING · sandboxing example…";
      frame.contentWindow.postMessage({ type: "run", code }, "*");
      const timeoutId = window.setTimeout(() => {
        status.textContent = "TIMEOUT · example reset";
        runnerTimers.delete(frame);
        delete frame.dataset.pendingCode;
        resetRunner(frame);
      }, 1200);
      runnerTimers.set(frame, timeoutId);
    };
    frame.addEventListener("load", () => {
      status.textContent = "SAFE RUNTIME · READY";
      const pending = frame.dataset.pendingCode;
      if (pending) { delete frame.dataset.pendingCode; execute(pending); }
    }, { once: true });
    runnerFrames.add(frame);
    resetRunner(frame);
    button.addEventListener("click", () => {
      const code = decodeURIComponent(button.dataset.runCode ?? "");
      if (frame.dataset.loaded === "true") execute(code);
      else { frame.dataset.pendingCode = code; resetRunner(frame); }
    });
  });
}

function bindPlayground() {
  const code = document.querySelector<HTMLTextAreaElement>("#playground-code");
  const run = document.querySelector<HTMLButtonElement>("#run-playground");
  const reset = document.querySelector<HTMLButtonElement>("#reset-playground");
  const frame = document.querySelector<HTMLIFrameElement>("#playground-frame");
  if (!code || !run || !reset || !frame || code.dataset.bound === "true") return;
  code.dataset.bound = "true";
  bindRunnerBus();
  runnerFrames.add(frame);
  if (frame.dataset.ready !== "true") resetRunner(frame);
  const defaultCode = state.playgroundCode;
  code.addEventListener("input", () => { state.playgroundCode = code.value; });
  run.addEventListener("click", () => {
    if (frame.contentWindow) {
      state.playgroundOutput = "Running in sandbox…";
      frame.contentWindow.postMessage({ type: "run", version: state.version, code: code.value }, "*");
      const timeoutId = window.setTimeout(() => { state.playgroundOutput = "Execution timed out. The sandbox was reset."; runnerTimers.delete(frame); resetRunner(frame); }, 3000);
      runnerTimers.set(frame, timeoutId);
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
  const meta = routeMeta[id] ?? routeMeta.notFound;
  document.title = `${meta.title} · Docu Web`;
  let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!description) { description = document.createElement("meta"); description.name = "description"; document.head.appendChild(description); }
  description.content = meta.description;
}

function renderBreadcrumbs() {
  const target = document.querySelector<HTMLElement>("#breadcrumbs");
  if (!target) return;
  const meta = routeMeta[state.active] ?? routeMeta.notFound;
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
  target.innerHTML = visible.length ? `${visible.map((section) => sectionMarkup[section.id]).join("")}${pager}` : `<div class="empty-state"><span>404 · NOT FOUND</span><h3>This chapter is not in the field guide.</h3><p>Check the URL or return to the overview to choose a documented route.</p><a class="button button-dark" href="/" data-section="overview">Back to overview ${icon("arrow")}</a></div>`;
  count.textContent = query ? `${visible.length} result${visible.length === 1 ? "" : "s"}` : "";
  target.querySelectorAll<HTMLElement>("[data-copy]").forEach((button) => button.addEventListener("click", async () => { await navigator.clipboard?.writeText(button.dataset.copy ?? ""); state.copied = true; setTimeout(() => state.copied = false, 1400); }));
}

function renderToc() {
  const toc = document.querySelector("#toc-links");
  if (!toc) return;
  const current = routeMeta[state.active] ?? routeMeta.notFound;
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
let drawerReturnFocus: HTMLElement | null = null;
const setDrawerOpen = (open: boolean) => {
  if (open && !state.mobileOpen) drawerReturnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : mobileMenu;
  state.mobileOpen = open;
  sidebar?.classList.toggle("is-open", open);
  backdrop?.classList.toggle("is-visible", open);
  mobileMenu?.setAttribute("aria-expanded", String(open));
  sidebar?.setAttribute("aria-hidden", String(!open));
  sidebar?.toggleAttribute("inert", !open);
  document.body.classList.toggle("drawer-open", open);
  if (open) requestAnimationFrame(() => (sidebar?.querySelector<HTMLElement>("a, button, input") ?? sidebar)?.focus());
  else requestAnimationFrame(() => drawerReturnFocus?.focus());
};
mobileMenu?.setAttribute("aria-expanded", "false");
mobileMenu?.addEventListener("click", () => setDrawerOpen(!sidebar?.classList.contains("is-open")));
backdrop?.addEventListener("click", () => setDrawerOpen(false));
document.addEventListener("keydown", (event) => {
  if (!state.mobileOpen) return;
  if (event.key === "Escape") { event.preventDefault(); setDrawerOpen(false); return; }
  if (event.key !== "Tab" || !sidebar) return;
  const focusable = Array.from(sidebar.querySelectorAll<HTMLElement>("a, button, input, select, textarea, [tabindex]:not([tabindex='-1'])")).filter((node) => !node.hasAttribute("disabled"));
  if (!focusable.length) return;
  const first = focusable[0]; const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
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
  bindLessonRunners();
});

effect(() => {
  const version = state.version;
  document.querySelectorAll<HTMLElement>("[data-version-label]").forEach((node) => { node.textContent = version; });
  const description = document.querySelector<HTMLElement>("[data-version-description]");
  if (description) description.textContent = versions[version as keyof typeof versions];
  const policy = document.querySelector<HTMLElement>("[data-version-policy]");
  if (policy) policy.textContent = versionPolicies[version as keyof typeof versionPolicies];
  const versionSelect = document.querySelector<HTMLSelectElement>(".version-control select");
  if (versionSelect && versionSelect.value !== version) versionSelect.value = version;
      document.querySelector(".sidebar")?.classList.toggle("is-open", state.mobileOpen);
      document.querySelector("[data-close-drawer]")?.classList.toggle("is-visible", state.mobileOpen);
      document.body.classList.toggle("drawer-open", state.mobileOpen);
  document.querySelectorAll<HTMLElement>("[data-copy] span").forEach((label) => { if (state.copied) label.textContent = "Copied"; });
});
