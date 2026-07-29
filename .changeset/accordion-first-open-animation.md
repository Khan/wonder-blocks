---
"@khanacademy/wonder-blocks-accordion": patch
---

Fix `AccordionSection` not animating on the first open when `animated` is true. The expand/collapse `grid-template-rows` value is now applied as an inline style on the grid element instead of an Aphrodite class, so its rule is present from the first render. Previously Aphrodite injected the expanded rule lazily, in the same commit as the first open, which suppressed the transition on that first expand only (every subsequent toggle animated correctly). This is a visual-only fix — verify in the browser (the accordion "With Animation" stories).
