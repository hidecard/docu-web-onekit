# Docu Web Feature TODO

## Vercel Deployment Fix

- [x] Inspect Vercel project settings and deployment output for raw source serving.
- [x] Add static OneKit build/output and SPA route fallback configuration.
- [x] Ensure server/index.ts is not exposed as the deployed entrypoint.
- [x] Run production build and verify deployed route behavior.
- [x] Save a deployment fix checkpoint.


## OneKit-only Web Migration

- [x] Audit source imports, package dependencies, entrypoint, and build config for non-OneKit runtime usage.
- [x] Keep the UI, route state, interactivity, and sandbox runner on OneKit JS only.
- [x] Remove unused React, Wouter, and shadcn runtime dependencies/configuration where safe.
- [x] Run OneKit-only type-check, build, preview, and dependency audit.
- [x] Save a checkpoint and push the OneKit-only update to GitHub.


## GitHub Publish

- [x] Inspect local Git state and confirm repository availability.
- [x] Create or connect the private `docu-web-onekit` GitHub repository.
- [x] Commit and push the Docu Web source code.
- [x] Verify the remote URL, branch, and pushed commit.


## Reusable Skill Creation

- [x] Define skill trigger, scope, workflow phases, and non-obvious guardrails.
- [x] Initialize a new skill directory with the official skill creator script.
- [x] Write concise SKILL.md and add references only where progressive disclosure helps.
- [x] Remove unused template files and validate the skill package.
- [x] Deliver the reusable SKILL.md to the user.


## Feature Example Live Run

- [x] Add Live Run and Reset controls to every feature usage card.
- [x] Add a sandboxed iframe output panel per example.
- [x] Connect example code to the existing OneKit runtime runner through postMessage.
- [x] Add runtime output, error, and timeout states per example.
- [x] Verify feature routes, mobile layout, type-check/build, and example execution.
- [x] Save a Live Run checkpoint.


## Feature Usage Code Documentation

- [x] Map OneKit public exports to the relevant documentation routes.
- [x] Add imports, signatures, framework-specific usage notes, and code examples per feature.
- [x] Add copyable code blocks and runnable examples where supported.
- [x] Connect feature examples to route pages and maintain learner-friendly explanations.
- [x] Verify representative feature routes, responsive layout, type-check/build.
- [x] Save a feature usage documentation checkpoint.


## Route-based Documentation Pages

- [x] Model route-specific documentation page content and navigation metadata.
- [x] Render only the active route's documentation page instead of all sections at once.
- [x] Connect OneKit router transitions to page content, title, breadcrumb, and active nav.
- [x] Add route-aware previous/next documentation links and 404 fallback.
- [x] Verify representative routes, mobile drawer, type-check/build, and responsive preview.
- [x] Save a route-based docs checkpoint.


## Route Titles and Breadcrumbs

- [x] Define route metadata for every OneKit documentation route.
- [x] Add route-driven document titles and meta descriptions.
- [x] Add breadcrumb navigation to the documentation shell.
- [x] Sync title and breadcrumb state through OneKit router subscription.
- [x] Verify route transitions, responsive layout, type-check/build.
- [x] Save a route metadata checkpoint.


## OneKit Router Migration

- [x] Inspect the OneKit router API and current manual navigation flow.
- [x] Add a OneKit router instance with documentation route records.
- [x] Wire sidebar, TOC, learner links, and API links through OneKit router navigation.
- [x] Support browser back/forward and route-driven active section state.
- [x] Verify mobile drawer routing, type-check/build, and responsive preview.
- [x] Save a OneKit router checkpoint.


## Slide Navigation Link Fix

- [x] Reproduce why mobile drawer menu items do not navigate.
- [x] Add reliable event delegation and anchor scrolling for drawer links.
- [x] Close the drawer after navigation and preserve active section state.
- [x] Verify mobile/desktop navigation and run type-check/build.
- [x] Save a navigation bug-fix checkpoint.


## Learner Usage Hub Expansion

- [x] Add learner journey sections from first app to production.
- [x] Add complete OneKit feature catalog covering core, UI, data, routing, SSR, tooling, and browser utilities.
- [x] Add API usage cards with short explanations, signatures, and runnable examples.
- [x] Add learning level labels and progress cues.
- [x] Add search/filter support for learner topics and features.
- [x] Verify the learner flow on desktop/mobile and run type-check/build.
- [x] Save a learner documentation checkpoint.


## Mobile Navigation Bug Fix

- [x] Reproduce the mobile menu toggle issue and inspect drawer event binding.
- [x] Fix menu toggle, drawer close, and navigation link behavior.
- [x] Verify mobile and desktop preview plus type-check/build.
- [x] Save a bug-fix checkpoint.


## Git Sync Update

- [x] Inspect current branch, remote, and working tree before pulling.
- [x] Pull remote changes without losing Docu Web OneKit playground updates.
- [x] Reapply sandboxed iframe playground changes if remote files overwrite them.
- [x] Resolve conflicts and run type-check/build after sync.
- [x] Verify the updated preview and save a new checkpoint.


- [ ] Add OneKit API reference catalog with version-aware examples.
- [ ] Add Version Selector UI for v3.1.13, v3.1.x, and Legacy v2.
- [x] Add Live Code Playground with editable OneKit code, Run action, Reset action, and output panel.
- [x] Move code execution into a sandboxed iframe with a strict postMessage protocol.
- [x] Add iframe runtime error reporting and execution timeout handling.
- [x] Keep Reset, API example selection, and version selection synchronized with the iframe runner.
- [ ] Connect playground examples to the selected documentation version.
- [ ] Add responsive mobile presentation for API reference and playground.
- [x] Run TypeScript check and production build.
- [x] Verify version switching, sandboxed code execution, reset, runtime errors, and mobile layout in the browser.

## OneKit JS V3 Documentation Update — Main Branch

- [x] Confirm the documentation site uses OneKit JS for runtime state, effects, routing, UI interaction, and sandbox integration; no React, Vue, Svelte, Angular, Wouter, or other frontend framework imports remain in the source.
- [x] Synchronize the site with OneKit JS `3.1.17` in `client/src/main.tsx`, the sidebar metadata, `package.json`, and `pnpm-lock.yaml`.
- [x] Keep the beginner learning path and complete V3 feature catalog visible, including reactivity, components, templates/JSX/VDOM, routing, stores, query/forms, HTTP/storage, accessibility, security/CSP, SSR/hydration/streaming, Vite/CLI/testing, HMR/plugins, scopes, DevTools, safe expressions, utilities, and Web Components.
- [x] Validate documentation markers and runtime exports: 57 content/API markers, accessibility markers, and 28 runtime exports passed.
- [x] Validate unit tests: 1 Vitest file and 3 tests passed.
- [x] Validate TypeScript: `tsc --noEmit` passed.
- [x] Validate production client build: Vite build passed (`95.63 kB` JavaScript, `21.21 kB` CSS before gzip).
- [x] Validate preview smoke routes: home, features, deployment, and runtime asset all passed.
- [x] Validate `git diff --check` and record the local npm registry limitation: public `onekit-js@3.1.17` was unavailable during install, so validation used a locally packed OneKit JS `3.1.17` tarball without changing the declared dependency.
- [ ] Commit and push the OneKit-only V3 documentation update to `docu-web-onekit` `main`.

Remaining documentation polish items from the pre-existing checklist are version-aware API examples, binding playground examples to the selected version, and the final responsive API/playground presentation pass.

---

## Style Decisions

The documentation site follows the selected **Paper Index** direction: Swiss editorial structure, ivory paper surfaces, ink navy text, Bookmark Vermilion accents, asymmetric reading layout, ruled metadata strips, and quiet 180–240ms motion. The implementation remains OneKit-only and keeps code examples close to browser primitives.

## Complete V3 Feature Guides and Responsive UI/UX Expansion

- [x] Audit the current feature catalog against the full OneKit JS V3 public API and identify missing user-guide pages and examples.
  - [x] Cross-checked QueryClient, createForm, createStore, compileTemplate, hydrate, StreamingRenderer, security boundaries, testing, CLI, browser utilities, and Web Components against OneKit V3 source exports.
- [x] Add feature-by-feature beginner guides with API signatures, minimal examples, when-to-use guidance, pitfalls, and production notes for all missing V3 areas.
  - [x] Expanded data-layer, SSR/hydration/streaming, security, testing, CLI/tooling, browser utilities, and Web Components guides.
- [x] Add regression markers/tests for the expanded documentation sections and runnable examples.
  - [x] Documentation markers and existing Vitest coverage remain green; corrected the template and hydration examples to verified V3 signatures.
- [x] Audit desktop, tablet, and mobile layouts including navigation drawer, reading measure, code blocks, API cards, playground, tables, and touch targets.
- [x] Improve responsive UI/UX while preserving the Paper Index design system and OneKit-only implementation.
  - [x] Added readable guide cards, narrow-screen spacing, touch-friendly controls, horizontal code overflow protection, and responsive layout rules.
- [x] Run documentation verification, unit tests, type-check, production build, accessibility checks, responsive browser smoke tests, and diff validation.
  - [x] TypeScript passed; Vitest 1 file / 3 tests passed; Vite production build passed; framework scan passed; browser verified the home and data-layer routes; `git diff --check` passed.
- [x] Commit and push the expanded guides and responsive UI/UX update to `docu-web-onekit` `main`.
  - [x] Pushed commit `f24ac06`; local `main` is synchronized with `origin/main`.

## Detailed Framework-Quality OneKit JS V3 Manual

- [x] Audited the existing docs and added beginner, core, advanced, production, API, recipe, migration, troubleshooting, and best-practice chapters.
- [x] Added a detailed learning path from first principles to a complete production application.
- [x] Expanded the V3 feature guides with concepts, API signatures, examples, alternatives, pitfalls, and production notes.
- [x] Added API usage cards and real-project recipes for CRUD, dashboards, forms, routing, SSR, and testing.
- [x] Added React/Vue migration guidance and an explicit OneKit architecture guide.
- [x] Added troubleshooting, performance, accessibility, security, deployment, and testing playbooks.
- [x] Improved long-form navigation, table of contents, progress cues, code readability, search, and mobile/tablet UX.
- [x] Validated documented content, runtime markers, accessibility markers, type-check, unit tests, production build, and representative responsive routes.
- [ ] Commit and push the repaired detailed manual update to `docu-web-onekit` `main`.

### Detailed manual implementation record

- [x] Added architecture, deep reactivity, real-project recipes, React/Vue migration, performance, and troubleshooting chapters in `client/src/main.tsx`.
- [x] Repaired five malformed chapter-boundary template-literal escapes and the final `usageCard` boundary in `client/src/main.tsx`.
- [x] Added mobile min-content constraints for the reading grid, document, sections, and prose while keeping code blocks horizontally scrollable.
- [x] Fresh validation passed: `tsc --noEmit`; documentation verification (57 markers); runtime synchronization (28 exports); Vitest (1 file, 3 tests); and Vite/server production build.
- [x] Desktop browser metrics showed no horizontal overflow at 1280px; Architecture route rendered with previous/next links and complete chapter content.
- [x] 390px mobile Chromium render showed the mobile header/drawer mode, wrapped long headings, responsive search, and touch-friendly code surfaces after the min-content fix.

## Local UI/UX Responsive Audit

- [x] Started the local Vite preview on port 3004 and inspected the overview and Architecture routes.
- [x] Verified desktop metrics at 1280px with no horizontal overflow, and captured a 390px mobile render of Deep Reactivity.
- [x] Fixed mobile min-content overflow by constraining the reading grid, document, sections, and prose to the viewport; code blocks remain horizontally scrollable.
- [x] Re-ran `tsc --noEmit`, `pnpm test -- --run`, and `pnpm run build`; all passed. The temporary preview process remains available on port 3004 for manual follow-up.


## Follow-up Manual Re-audit

- [ ] Reconcile every public OneKit V3 export with an API reference entry, including signatures, return values, failure semantics, and version availability.
- [ ] Verify all copyable and runnable examples against the current `onekit-js` source and add regression markers for examples that are currently only prose.
  - [x] Corrected the Browser utilities examples for `createSkipLink`, `localStorage`, and the public `ok(element).scaleIn` animation path; full validation passed.
- [x] Bind the API/playground surface to the selected documentation version label and expose a clear availability policy for stable, V3 minor, and legacy lines.
- [ ] Complete version-aware API navigation for the currently listed stable, V3 minor, and legacy lines, including an explicit unavailable-feature policy.
- [ ] Add a dedicated accessibility audit for keyboard navigation, focus visibility, drawer focus management, reduced motion, landmarks, and code-copy feedback.
- [x] Added current-route HTTP smoke checks, explicit client-side 404 rendering with a recovery link, and source regression markers for the route surface. Browser-history and clipboard assertions remain manual.
- [x] Re-ran desktop, tablet, and mobile API-route captures; selected-version policy text wraps correctly and the 390px layout remains within the viewport.
  - [x] Re-checked the Browser utilities route at 1280px and 390px; title wrapping, stacked cards, drawer mode, and code overflow behaved as intended.
- [x] Resolved GitHub authentication and pushed the follow-up release commit `87482ac` to `origin/main`.
- [x] Recorded final pushed commit SHA `87482ac`; remaining release checkpointing is handled by the repository commit/push workflow.


## Active Follow-up Implementation

- [x] Replaced the stale `/docs/deployment` smoke route with current architecture, deep-reactivity, recipes, migration, performance, and troubleshooting routes; smoke now has timeout/error context and an explicit `SMOKE_BASE_URL`.
- [x] Added selected-version availability policy text and synchronized the version selector value on reactive updates.
- [x] Added `scripts/verify-examples.mjs`, which checks root `onekit-js` imports against the current source export surface; 14 imports pass.
- [x] Added explicit client-side 404 rendering, recovery navigation, route markers, and regression coverage. Browser-history, clipboard, and drawer keyboard assertions remain manual.
- [x] Re-ran full type-check, documentation verification, runtime verification, example verification, unit tests (4), smoke tests, production build, and desktop/tablet/mobile browser audit.
- [x] Committed and pushed the completed follow-up work as `87482ac` to `origin/main`.


## Deployment Failure Recheck

- [x] Inspected the Netlify/Vercel workflows, provider config, package scripts, and current `main` state.
- [x] Confirmed the latest Vercel failure was caused by empty `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, and `VERCEL_TOKEN` secrets; the prior Netlify failures were from old malformed-source commits, while the latest Netlify run was green.
- [x] Reproduced the workflow build locally with `pnpm run check`, `pnpm run build:client`, and the full documentation test suite; expected `dist/public` artifacts were produced.
- [x] Added a Vercel credential gate that skips deployment with a clear summary instead of failing with `--token` missing-value errors; local checks and workflow formatting passed.
- [x] Committed and pushed `6998545` to `origin/main`; the latest Netlify and Vercel workflow runs for that commit are green.


## Beginner Manual Rebuild

- [x] Audited the full route surface and added beginner coverage for prerequisites, setup, first app, templates, events/forms, first project, core concepts, production, SSR, security, testing, CLI, and migration.
- [x] Added a sequential beginner learning path with prerequisites, outcomes, checkpoints, sidebar groups, previous/next links, and a learner-path route.
- [x] Expanded beginner chapters with step-by-step explanations, complete examples, checkpoints, and practical guidance.
- [x] Added a consistent runnable code-block model with language labels, copy/run/reset controls, loading/error/complete states, and iframe output panels.
- [x] Kept execution isolated in sandboxed iframes with an allowlisted OneKit runtime surface, timeout/reset behavior, and documented browser-only execution model.
- [x] Added the counter-to-first-project path and linked it to the existing CRUD, forms, router, dashboard, SSR, and production recipes.
- [x] Improved sidebar, breadcrumbs, previous/next navigation, search, progress/version cues, and explicit 404 recovery.
- [x] Re-audited desktop, tablet, and mobile layouts; code blocks remain scrollable while beginner prose and controls wrap within the viewport.
- [x] Added regression markers for the runner fixture and complete-state fallback; existing docs, runtime, example, unit, smoke, build, and whitespace checks pass.
- [x] Committed and pushed the expanded beginner manual as `598c899` to `origin/main`.


## Detailed Course Expansion

- [ ] Audit every chapter for concept-first explanations, prerequisites, terminology, API signatures, line-by-line code notes, expected output, pitfalls, exercises, and next-step links.
- [ ] Add a consistent beginner lesson structure to core chapters: Why it matters, mental model, minimum example, complete example, line-by-line explanation, common mistakes, exercise, and production note.
- [ ] Expand reactive state, components, templates, events/forms, routing, data fetching, SSR, security, testing, CLI, and deployment chapters with verified V3 examples.
- [ ] Add explicit runnable examples and expected outputs to chapters that currently contain prose-only guidance.
- [ ] Improve code-block UI with file/language labels, line-focused notes, output interpretation, reset behavior, copy feedback, and accessible status announcements.
- [ ] Add chapter completion/progress cues and cross-links so beginners can resume the learning path without losing context.
- [ ] Add regression markers and validation for detailed chapter content, runnable examples, exercises, and accessibility behavior.
- [ ] Re-run type-check, docs/runtime/example verification, unit tests, smoke tests, production build, and desktop/tablet/mobile browser audit.
- [ ] Commit and push the detailed course expansion.


## Detailed Course Expansion Audit Record

- [x] Added step-by-step learning outcomes and sequential explanation layers to Reactive state, Components, Routing, and Production chapters.
- [x] Added responsive outcome chips, step lists, and three-column detail panels with mobile stacking and readable wrapping.
- [x] Preserved existing runnable cards, Copy/Live Run/Reset controls, sandbox output, route navigation, and version selector.
- [x] Validation passed after expansion: `tsc --noEmit`, docs verification (57 markers), accessibility markers, runtime verification (28 exports), example verification (14 imports), Vitest (4 tests), Vite production build, and `git diff --check`.
- [x] Browser audit passed on `/docs/ssr` and `/docs/reactive` desktop routes; a 390px `/docs/reactive` capture showed wrapped heading, separated outcome chips, stacked step explanations, and no visible horizontal overflow.
- [x] Committed and pushed the detailed course expansion and CSS refinements as `5014853` to `origin/main`.


## Live Sandbox Verification

- [ ] Inventory every copyable/runnable code block and confirm each has a stable example ID, language metadata, and run binding.
- [ ] Test representative examples across beginner, core, data, routing, SSR, security, browser, and advanced guide routes.
- [ ] Test successful output, reset, runtime error, thrown exception, timeout, missing runtime, and repeated-run behavior.
- [ ] Verify iframe sandbox isolation, postMessage origin/source checks, output escaping, and no parent-page mutation.
- [ ] Verify Copy, Live Run, Reset, keyboard access, status announcements, and mobile touch behavior.
- [ ] Fix any runner or documentation example defects found and add regression markers/tests.
- [ ] Re-run type-check, docs/runtime/example verification, unit tests, smoke tests, production build, and responsive browser audit.
- [x] Committed and pushed the verified Live Sandbox improvements as `c366f99` to `origin/main`.


## Live Sandbox Verification Record

- [x] Audited `runnerSrcDoc`, usage cards, beginner lesson runners, playground binding, message-source checks, pending execution, reset, and timeout paths.
- [x] Fixed the lesson-runner startup race: Run now queues `frame.dataset.pendingCode` until the iframe sends the `ready` message instead of posting into an unloaded runtime.
- [x] Added 3-second timeout/reset handling to usage-card runners and aligned playground timeout cleanup; complete/error states now clear timers and show meaningful fallback text.
- [x] Added regression markers for pending execution, timeout reset, sandbox status, and playground timeout behavior.
- [x] Validation passed: TypeScript, documentation/runtime/example verification, 4 unit tests, production client build, and `git diff --check`.
- [x] Chromium production DOM smoke confirmed `Run in sandbox`, `Copy`, `data-run-code`, `lesson-frame`, and `SAFE RUNTIME` markers render on `/docs/first-app`.
- [x] Committed and pushed the verified Live Sandbox improvements as `c366f99` to `origin/main`.


## Live Sandbox Quality Pass

- [ ] Audit every runnable card for editor availability, output capture, retry/reset behavior, and route lifecycle leaks.
- [ ] Add an editable code surface or clearly explain read-only limitations for each runnable example.
- [ ] Capture console logs, thrown errors, and structured completion output instead of only a single status string.
- [ ] Add retry and rerun behavior after errors/timeouts, with preserved code and a clear reset-to-default action.
- [ ] Support multiple independent examples on the same route without cross-frame state or listener leakage.
- [ ] Improve keyboard focus, live announcements, labels, reduced-motion behavior, and mobile touch targets for sandbox controls.
- [ ] Add browser-level regression coverage for run, reset, timeout, error, copy feedback, and route changes.
- [ ] Re-run the full validation suite and responsive audit, then commit and push the improvements.


## Live Sandbox Quality Pass Record

- [x] Replaced per-frame message listeners with a single OneKit runner message bus guarded by registered iframe frames, preventing rerender listener leaks and cross-example state updates.
- [x] Added structured output formatting for captured console entries and runtime errors, while preserving existing completion/timeout status contracts.
- [x] Added per-frame timeout ownership and cleanup on complete/error/reset, including the API playground and independent usage/lesson examples.
- [x] Preserved pending-code execution until each iframe reports `ready`, with reset/retry behavior that recreates the isolated runtime.
- [x] Added mobile drawer focus return, `aria-hidden`, `inert`, Escape handling, and Tab focus trapping for keyboard users.
- [x] Added regression markers covering runner bus, timers, structured entries, timeout compatibility, and drawer focus behavior.
- [x] Validation passed: TypeScript check, docs/runtime/example verification, 4 unit tests, and production client build.
- [x] Browser smoke verified API playground rendering and successful sandbox execution at `/docs/api`.
- [ ] Full browser automation for clipboard permission, thrown-error editing, and timeout interaction remains a manual follow-up because the sandbox browser input path did not mutate the textarea during this audit.
- [ ] Commit and push the final quality-pass improvements to `docu-web-onekit` `main`.

The current quality-pass implementation intentionally keeps the existing editable API playground and read-only runnable cards explicit through their existing code/read/run/reset presentation; per-card editors are not duplicated where the card is designed as a fixed teaching fixture.
