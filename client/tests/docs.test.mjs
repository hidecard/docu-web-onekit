import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(new URL("../..", import.meta.url).pathname);
const read = (file) => readFile(resolve(root, file), "utf8");

describe("documentation release surface", () => {
  it("contains the production and framework coverage sections", async () => {
    const source = await read("client/src/main.tsx");
    for (const marker of ["Docu Data", "DEPLOYMENT", "CI/CD", "COMPLETE API COVERAGE", "Accessibility focus", "SSR and hydration"]) {
      expect(source).toContain(marker);
    }
  });

  it("keeps the browser runtime aligned with required exports", async () => {
    const runtime = await read("client/public/onekit-runtime.js");
    for (const exportName of ["reactive", "computed", "renderToString", "createSkipLink", "sanitizeHTML", "request"]) {
      expect(runtime).toContain(exportName);
    }
  });

  it("keeps the selected-version policy and current route surface explicit", async () => {
    const source = await read("client/src/main.tsx");
    for (const marker of ["versionPolicies", "data-version-policy", "architecture", "deep-reactivity", "recipes", "migration", "performance", "troubleshooting", "notFound", "404 · NOT FOUND", "Escape", "data-close-drawer", "runnerSrcDoc", "id=\"count\"", "SAFE RUNTIME · COMPLETE", "frame.dataset.pendingCode", "TIMEOUT: sandbox reset", "sandboxing example…", "Execution timed out. The sandbox was reset."]) {
      expect(source).toContain(marker);
    }
    expect(source).not.toContain("/docs/deployment");
  });

  it("keeps provider automation and security configuration present", async () => {
    const vercel = await read(".github/workflows/deploy-vercel.yml");
    const netlify = await read(".github/workflows/deploy-netlify.yml");
    const ci = await read(".github/workflows/ci.yml");
    const headers = await read("netlify.toml");
    expect(vercel).toContain("pnpm dlx vercel");
    expect(vercel).not.toContain("pnpm dlx --yes vercel");
    expect(netlify).toContain("NETLIFY_SITE_ID");
    expect(ci).toContain("pnpm run smoke");
    expect(headers).toContain("X-Content-Type-Options");
  });
});
