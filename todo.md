# Docu Web Feature TODO

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
