---
"@khanacademy/wonder-blocks-accordion": patch
---

Fix `AccordionSection` not animating the first time a section is opened when `animated` is true. The expand/collapse row sizing now lives on a single stable Aphrodite class, selected off a `data-expanded` attribute, instead of swapping between two classes. Aphrodite injects a merged class's rule lazily, so the old approach pointed the first expand at a rule that did not exist yet — `grid-template-rows` computed to `none`, which cannot interpolate, and the section snapped open. Every subsequent toggle animated correctly, which is why this only ever showed up on first open.

`AccordionSection`'s wrapper element now renders a `data-expanded="true" | "false"` attribute, so snapshot tests that render an `AccordionSection` will need regenerating.

If your Jest setup inlines Aphrodite styles (`SNAPSHOT_INLINE_APHRODITE`, as Wonder Blocks' own config does), note that nested selectors are not applied on that path: a **collapsed** wrapper now reports `grid-template-rows: min-content 1fr` rather than `0fr`, so it reads as expanded in a snapshot even when it isn't. Assert expanded state via `aria-expanded` on the header, or the new `data-expanded` attribute, rather than via the wrapper's styles.
