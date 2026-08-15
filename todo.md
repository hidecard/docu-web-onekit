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
