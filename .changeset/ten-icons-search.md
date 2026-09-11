---
"@khanacademy/wonder-blocks-styles": minor
"@khanacademy/wonder-blocks-clickable": patch
"@khanacademy/wonder-blocks-link": patch
---

Swap out the `::after` pseudo-element for `::before` in `minTargetSizeStyles.minTargetSize` so that Cypress doesn't claim the element is obscured by another element. `::before` paints before the element's children, so when a test targets a descendant of a `Clickable` or `Link`, `elementFromPoint` resolves to that descendant rather than to the clickable ancestor. Pointer events on a pseudo-element still target the originating element, so the 24x24 target size guarantee is unchanged.
