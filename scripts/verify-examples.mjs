import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const docsPath = resolve("client/src/main.tsx");
const sourceRoot = resolve("../onekit-js/src");
const docs = await readFile(docsPath, "utf8");
const publicNames = new Set();

async function collect(path) {
  const text = await readFile(path, "utf8");
  for (const match of text.matchAll(/export\s+(?:async\s+)?(?:function|const|class|interface|type)\s+([A-Za-z_$][\w$]*)/g)) publicNames.add(match[1]);
  for (const match of text.matchAll(/export\s*\{([^}]+)\}/g)) {
    for (const item of match[1].split(",")) {
      const name = item.trim().split(/\s+as\s+/).at(-1);
      if (name && /^[A-Za-z_$][\w$]*$/.test(name)) publicNames.add(name);
    }
  }
}

const moduleFiles = [
  "index.ts",
  "core/index.ts",
  "core/di.ts",
  "core/plugin.ts",
  "core/error-handler.ts",
  "modules/animation.ts",
  "modules/api.ts",
  "modules/a11y.ts",
  "modules/component.ts",
  "modules/ergonomics.ts",
  "modules/forms.ts",
  "modules/jsx.ts",
  "modules/query.ts",
  "modules/reactive.ts",
  "modules/router.ts",
  "modules/ssr.ts",
  "modules/storage.ts",
  "modules/store.ts",
  "modules/template.ts",
  "modules/utils.ts",
  "modules/vdom.ts",
  "modules/web-components.ts",
  "okjs.ts",
  "testing.ts",
];
for (const file of moduleFiles) await collect(resolve(sourceRoot, file));

const imported = new Set();
for (const match of docs.matchAll(/import\s*\{([^}]+)\}\s*from\s*["']onekit-js["']/g)) {
  for (const item of match[1].split(",")) {
    const name = item.trim().split(/\s+as\s+/)[0];
    if (name && /^[A-Za-z_$][\w$]*$/.test(name)) imported.add(name);
  }
}
const missing = [...imported].filter((name) => !publicNames.has(name)).sort();
if (missing.length) throw new Error(`Documentation imports missing public OneKit exports: ${missing.join(", ")}`);
console.log(`Example export verification passed (${imported.size} root imports checked).`);
