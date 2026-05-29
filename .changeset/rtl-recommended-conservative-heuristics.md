---
"@khanacademy/eslint-plugin-wonder-blocks": minor
---

Scope the `require-logical-properties-for-rtl` value-heuristics in the `recommended` config to only those that reliably indicate a real RTL bug. `warnBackgroundPosition` stays enabled; `warnDirectionalTransforms`, `warnShadows`, `warnGradients`, `warnCursorDirections`, and `warnBackgroundPositionXY` are now disabled. Those checks have no logical-property fix and were producing almost entirely false positives on RTL-safe code (`translateX(-50%)` centering, symmetric gradients, X-offset shadows, block-axis `backgroundPositionY`), forcing `eslint-disable` suppressions on correct code. The property-name → logical-property checks (with autofix) and `backgroundPosition` directional detection remain fully enforced. This aligns `recommended` with the rule's own `defaultOptions`. Part of CLASS-14252.
