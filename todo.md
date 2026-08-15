# Docu Web Feature TODO

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
