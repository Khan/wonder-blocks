---
"@khanacademy/eslint-plugin-wonder-blocks": major
---

Remove the low-signal value-heuristics from `require-logical-properties-for-rtl` and extend the `padding`/`margin` shorthand check to 3- and 4-value forms.

**Removed** (along with their options `warnDirectionalTransforms`, `warnShadows`, `warnGradients`, `warnCursorDirections`, `warnBackgroundPositionXY`): the directional `transform`/`transformOrigin`, `boxShadow`/`textShadow`, `linear-gradient`, `cursor` resize, and `backgroundPositionX/Y` checks. These had no logical-property fix and were structurally unable to distinguish RTL-safe code (`translateX(-50%)` centering, symmetric gradients, X-offset shadows, block-axis `backgroundPositionY`) from genuine bugs, producing almost entirely false positives that forced `eslint-disable` suppressions on correct code. Keeping them as disabled-by-default options would have left dead, un-fixable checks behind, so they are removed outright rather than toggled off. This is a **breaking change**: the schema uses `additionalProperties: false`, so any config that set one of these options will now error and must drop it.

**Extended:** the `padding`/`margin` shorthand check now expands 3-value (`A B C`) and 4-value (`A B C D`) forms in addition to 2-value, with autofix. The 4-value form is the one that genuinely breaks in RTL — its left/right values differ and don't auto-mirror — and was previously not caught at all.

**Kept:** the property-name → logical-property fixes, `textAlign` value swap, `float`/`clear`, `direction`, and the `backgroundPosition`/`background` directional check (gated by the one remaining option, `warnBackgroundPosition`, on by default). The `recommended` config now enables the rule as a bare `"error"`, relying on the rule's `defaultOptions`. Part of CLASS-14252.
