import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const source = await readFile(resolve(root, "client/src/main.tsx"), "utf8");
const requiredLabels = [
  "Docu Data",
  "DEPLOYMENT",
  "CI/CD",
  "Template compiler",
  "SSR and hydration",
  "Accessibility focus",
  "Security and CSP",
  "Resource loading",
  "Error boundary",
  "HMR and plugins",
  "Reactive snapshots",
  "Scope diagnostics",
  "DevTools instrumentation",
  "DOM animation",
  "Safe expressions",
  "Deep utilities",
  "Open Graph SSR",
  "Store plugins",
  "Component props lifecycle",
];
const requiredApis = [
  "renderToString",
  "hydrate",
  "createSSRContext",
  "createErrorBoundary",
  "createLandmarks",
  "createSkipLink",
  "trapFocus",
  "generateCSPHeader",
  "sanitizeInput",
  "preloadModule",
  "preloadScript",
  "preloadStyle",
  "request",
  "put",
  "del",
  "watch",
  "nextTick",
  "batch",
  "withCache",
  "registerDirective",
  "preserveHMRState",
  "snapshot",
  "bind",
  "autorun",
  "effectScope",
  "registerDisposable",
  "devToolsSnapshot",
  "getResourceGraph",
  "ok",
  "evaluateSafeExpression",
  "deepCloneSafe",
  "throttle",
  "validateSelector",
  "renderOpenGraph",
  "createStore",
  "addStorePlugin",
  "getInstance",
  "destroy",
];
const required = [...requiredLabels, ...requiredApis];
const missing = required.filter((item) => !source.includes(item));
if (missing.length) {
  console.error(`Documentation verification failed. Missing: ${missing.join(", ")}`);
  process.exit(1);
}
const accessibilityMarkers = ["aria-label", "aria-live", "aria-current", "Skip to content"];
const missingAccessibility = accessibilityMarkers.filter((item) => !source.includes(item));
if (missingAccessibility.length) {
  console.error(`Accessibility markers missing: ${missingAccessibility.join(", ")}`);
  process.exit(1);
}
console.log(`Documentation verification passed (${required.length} API/content markers).`);
console.log("Accessibility marker verification passed.");
