---
"@khanacademy/wonder-blocks-progress-spinner": patch
---

Restore the `main`, `module` and `types` fields in `package.json`. They were
dropped when the package gained an `exports` map, which broke the build:
the Rollup config reads a package's output paths from those fields when its
`exports` entries have no `source`. Tools that don't read `exports` also use
them to find the package's entry points.
