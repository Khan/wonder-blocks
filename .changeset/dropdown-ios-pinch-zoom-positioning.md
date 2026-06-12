---
"@khanacademy/wonder-blocks-dropdown": patch
---

Fix `SingleSelect`/`MultiSelect` dropdown menus detaching from their opener (and the lowest one failing to open) when the page is pinch-zoomed on iOS/iPadOS. The menu now recomputes its position on `window.visualViewport` `resize`/`scroll` events, and is only hidden when the popper genuinely escapes its clipping area rather than when the opener is momentarily reported as hidden under zoom.
