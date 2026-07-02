---
---

CI only (WB-2391): skip Chromatic snapshot builds on draft PRs to reduce
snapshot usage. Draft PRs still build Storybook and report a passing Chromatic
check; full snapshots run automatically when a PR is marked ready for review, or
on demand via a `/chromatic` comment. No published package changes.