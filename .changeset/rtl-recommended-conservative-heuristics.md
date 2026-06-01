---
"@khanacademy/eslint-plugin-wonder-blocks": major
---

Remove the low-signal value-heuristics from `require-logical-properties-for-rtl` and extend the `padding`/`margin` shorthand check to 3- and 4-value forms.

**Removed** the directional `transform`/`transformOrigin`, `boxShadow`/`textShadow`, `linear-gradient`, `cursor` resize, and `backgroundPositionX/Y` checks. These had no logical-property fix and were structurally unable to distinguish RTL-safe code (`translateX(-50%)` centering, symmetric gradients, X-offset shadows, block-axis `backgroundPositionY`) from genuine bugs, producing almost entirely false positives that forced `eslint-disable` suppressions on correct code. Keeping them as disabled-by-default options would have left dead, un-fixable checks behind, so they are removed outright rather than toggled off.

**The rule now takes no options at all.** All option flags are gone, including `warnBackgroundPosition` — the `backgroundPosition`/`background` directional check it gated is now unconditional, matching `float`/`clear`/`direction`. (In the audited cases it only ever caught real bugs, so a config-level off-switch wasn't justified; per-line `eslint-disable` remains the escape hatch.) This is a **breaking change**: the schema previously used `additionalProperties: false`, so any config that set `warnDirectionalTransforms`, `warnShadows`, `warnGradients`, `warnCursorDirections`, `warnBackgroundPositionXY`, or `warnBackgroundPosition` will now error and must drop it.

**Extended:** the `padding`/`margin` shorthand check now expands 3-value (`A B C`) and 4-value (`A B C D`) forms in addition to 2-value, with autofix. The 4-value form is the one that genuinely breaks in RTL — its left/right values differ and don't auto-mirror — and was previously not caught at all.

**Added autofix** for `float: left/right` → `inline-start/inline-end` and `clear: left/right` → `inline-start/inline-end` (previously report-only). The flow-relative `float`/`clear` values are now Baseline / widely available (Chrome/Edge 118, Safari 15, Firefox 55), so the fix the rule already recommended can be applied automatically.

**Kept:** the property-name → logical-property fixes, `textAlign` value swap, `float`/`clear`, `direction`, and the `backgroundPosition`/`background` directional check (gated by the one remaining option, `warnBackgroundPosition`, on by default). The `recommended` config now enables the rule as a bare `"error"`, relying on the rule's `defaultOptions`. Part of CLASS-14252.
