---
"@khanacademy/eslint-plugin-wonder-blocks": major
---

Trim `require-logical-properties-for-rtl` to its high-signal checks and enable it in the `recommended` config as `"error"`.

- **Removed** the low-signal checks (`transformOrigin`, `boxShadow`/`textShadow`, `linear-gradient` direction, `cursor` resize, `backgroundPositionX/Y`) — no logical fix, almost all false positives.
- **Narrowed `translateX`**: flags px / non-±50% offsets (directional), exempts the `±50%` centering idiom and `calc()`/`var()`. Report-only.
- **Extended** the `padding`/`margin` shorthand check to 3- and 4-value forms (autofix); the 4-value form is the real RTL hazard.
- **Added autofix** for `float`/`clear` `left/right` → `inline-start/inline-end`.
- **Kept**: property-name fixes, `textAlign`, `float`/`clear`, `direction`, `backgroundPosition` directional detection.

**Breaking:** the rule now takes no options. Any config passing `warnDirectionalTransforms`, `warnShadows`, `warnGradients`, `warnCursorDirections`, `warnBackgroundPositionXY`, or `warnBackgroundPosition` will now error and must drop it.

Part of CLASS-14252.
