import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const runtime = await readFile(resolve(root, "client/public/onekit-runtime.js"), "utf8");
const requiredExports = [
  "reactive",
  "computed",
  "effect",
  "renderToString",
  "hydrate",
  "createErrorBoundary",
  "preloadModule",
  "createSkipLink",
  "registerDirective",
  "sanitizeHTML",
  "request",
  "validateAccessibility",
];
const missing = requiredExports.filter((name) => !runtime.includes(name));
if (missing.length) {
  console.error(`Runtime synchronization failed. Missing exports: ${missing.join(", ")}`);
  process.exit(1);
}
if (runtime.length < 1000) {
  console.error("Runtime synchronization failed. Bundle is unexpectedly small.");
  process.exit(1);
}
console.log(`Runtime synchronization passed (${requiredExports.length} required exports found).`);
