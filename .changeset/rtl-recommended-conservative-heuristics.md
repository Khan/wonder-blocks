---
"@khanacademy/eslint-plugin-wonder-blocks": major
---

Trim `require-logical-properties-for-rtl` to its high-signal checks, narrow the `translateX` check instead of removing it, and extend the `padding`/`margin` shorthand check to 3- and 4-value forms.

**Removed** the directional `transformOrigin`, `boxShadow`/`textShadow`, `linear-gradient`, `cursor` resize, and `backgroundPositionX/Y` checks. These had no logical-property fix and couldn't distinguish RTL-safe code (symmetric gradients, X-offset shadows already paired for RTL, block-axis `backgroundPositionY`) from genuine bugs, producing almost entirely false positives that forced `eslint-disable` suppressions on correct code. Keeping them as disabled-by-default options would have left dead, un-fixable checks behind, so they are removed outright.

**Narrowed** the `translateX` check rather than removing it. The old check flagged every `translateX(...)`, which fired on the RTL-safe `translateX(-50%)` / `translateX(50%)` self-centering idiom and caused all of that idiom's false positives. It now exempts `±50%` centering (and skips values wrapped in `calc()`/`var()`) while still flagging px and non-±50% percentage offsets, which are genuinely directional and don't mirror in RTL. Report-only (no logical replacement exists).

**The rule now takes no options at all.** All option flags are gone, including `warnBackgroundPosition` — the `backgroundPosition`/`background` directional check it gated is now unconditional, matching `float`/`clear`/`direction`. This is a **breaking change**: the schema previously used `additionalProperties: false`, so any config that set `warnDirectionalTransforms`, `warnShadows`, `warnGradients`, `warnCursorDirections`, `warnBackgroundPositionXY`, or `warnBackgroundPosition` will now error and must drop it.

**Extended** the `padding`/`margin` shorthand check to expand 3-value (`A B C`) and 4-value (`A B C D`) forms in addition to 2-value, with autofix. The 4-value form is the one that genuinely breaks in RTL — its left/right values differ and don't auto-mirror — and was previously not caught at all.

**Added autofix** for `float: left/right` → `inline-start/inline-end` and `clear: left/right` → `inline-start/inline-end` (previously report-only). The flow-relative `float`/`clear` values are now Baseline / widely available (Chrome/Edge 118, Safari 15, Firefox 55), so the fix the rule already recommended can be applied automatically.

**Kept:** the property-name → logical-property fixes, `textAlign` value swap, `float`/`clear`, `direction`, and the `backgroundPosition`/`background` directional check. The `recommended` config now enables the rule as a bare `"error"`. Part of CLASS-14252.
