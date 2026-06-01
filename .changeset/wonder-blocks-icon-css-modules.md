---
"@khanacademy/wonder-blocks-icon": patch
---

Internal: migrate the `Icon` component from Aphrodite to CSS Modules as
the first real consumer of the new Rollup CSS pipeline (WB-2324 Phase
0.1). The public component API is unchanged — same props, same DOM
output. Consumers using `@khanacademy/wonder-blocks-icon` automatically
pick up the bundled `dist/index.css` via a side-effect import in the
JS entry; SSR consumers that can't process CSS imports may need a CSS
loader / mock in their build (standard webpack / Vite / Next.js setups
handle this out of the box).

A new package subpath, `@khanacademy/wonder-blocks-icon/css`, exposes
the extracted stylesheet for consumers that prefer to load it
explicitly.
