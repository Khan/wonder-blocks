---
---

Storybook only: restore the `Catalog` sidebar section by nesting its stories under `Catalog / Components`. Removing `states.stories.tsx` had left `Catalog` with only single-segment titles, which caused it to render as a loose top-level entry instead of a category section. No published package changes.
