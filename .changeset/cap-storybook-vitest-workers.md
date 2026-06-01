---
---

Cap the storybook Vitest browser project to `maxWorkers: 2` so the CI run
stays under the runner's memory limit. The browser-mode suite had grown
large enough to OOM-kill the runner (exit 137) at the default worker count.
This is a CI/tooling-only change with no impact on published packages.
