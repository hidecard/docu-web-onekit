const base = process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:4173";
const checks = [
  ["home", "/", "Docu Web"],
  ["features route", "/docs/features", "id=\"root\""],
  ["deployment route", "/docs/deployment", "id=\"root\""],
  ["runtime asset", "/onekit-runtime.js", "reactive"],
];
for (const [label, path, marker] of checks) {
  const response = await fetch(`${base}${path}`);
  const body = await response.text();
  if (!response.ok) {
    throw new Error(`${label} returned HTTP ${response.status}`);
  }
  if (!body.includes(marker)) {
    throw new Error(`${label} did not contain expected marker: ${marker}`);
  }
  console.log(`Smoke check passed: ${label}`);
}
