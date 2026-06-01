---
---

Run the storybook Vitest browser project serially (`maxWorkers: 1`) so the
CI run stays under the runner's memory limit. The browser-mode suite had
grown large enough to OOM-kill the runner (exit 137) at the default worker
count, and `maxWorkers: 2` was still borderline. Also disable axe-core's
asset preloading in the Storybook preview config to silence a noisy
`Couldn't load preload assets` warning logged once per test. CI/tooling-only
changes with no impact on published packages.
