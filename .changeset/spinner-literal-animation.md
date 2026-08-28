---
"@khanacademy/wonder-blocks-progress-spinner": patch
---

Fix `CircularSpinner` not animating after the animation-token refactor. The spinner referenced the CSS-variable form (`animation.loop.spin.*`), which emits `var(--wb-animation-loop-spin-*)`; where those custom properties are not registered on the page the declaration is invalid and `animation-duration` falls back to `0s`, freezing the spinner. It now formats the raw token values into literal CSS via `cssDuration(animationValue.loop.spin.duration)` / `cssEasing(animationValue.loop.spin.easing)` (matching the drawer/accordion pattern), so it no longer depends on the CSS variables being present.
