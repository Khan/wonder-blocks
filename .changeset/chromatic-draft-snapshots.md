---
---

CI only (WB-2391): reduce Chromatic snapshot usage by disabling snapshots on
draft PRs. Draft PRs still publish their Storybook to Chromatic (so a preview
URL is available) but capture no snapshots, so no snapshot quota is consumed.
Full snapshots run automatically when a PR is marked ready for review, or on
demand via a `/chromatic` PR comment. No published package changes.