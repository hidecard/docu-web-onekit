const base = (process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:4173").replace(/\/$/, "");
const checks = [
  ["home", "/", "Docu Web"],
  ["architecture route", "/docs/architecture", "id=\"root\""],
  ["deep reactivity route", "/docs/deep-reactivity", "id=\"root\""],
  ["recipes route", "/docs/recipes", "id=\"root\""],
  ["migration route", "/docs/migration", "id=\"root\""],
  ["performance route", "/docs/performance", "id=\"root\""],
  ["troubleshooting route", "/docs/troubleshooting", "id=\"root\""],
  ["runtime asset", "/onekit-runtime.js", "reactive"],
];

for (const [label, path, marker] of checks) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  let response;
  try {
    response = await fetch(`${base}${path}`, { signal: controller.signal });
  } catch (error) {
    throw new Error(`${label} could not be fetched from ${base}${path}: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    clearTimeout(timeout);
  }
  const body = await response.text();
  if (!response.ok) throw new Error(`${label} returned HTTP ${response.status}`);
  if (!body.includes(marker)) throw new Error(`${label} did not contain expected marker: ${marker}`);
  console.log(`Smoke check passed: ${label}`);
}
