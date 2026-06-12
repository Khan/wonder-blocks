---
"@khanacademy/wonder-blocks-dropdown": patch
---

Fix dropdown menus (`SingleSelect`, `MultiSelect`, and `Combobox`) detaching from their opener (and the lowest one failing to open) when the page is pinch-zoomed on iOS/iPadOS. These components share the same portaled, `position: fixed` Popper menu, which on iOS does not track the visual viewport during pinch-zoom. The menu now recomputes its position on `window.visualViewport` `resize`/`scroll` events, and is only hidden when the popper genuinely escapes its clipping area rather than when the opener is momentarily reported as hidden under zoom.
