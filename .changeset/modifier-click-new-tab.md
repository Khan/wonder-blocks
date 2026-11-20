---
"@khanacademy/wonder-blocks-clickable": patch
---

Let the browser handle modified clicks (Cmd, Ctrl, Shift or Alt) on components with an `href`, so that e.g. Cmd/Ctrl-click opens the link in a new tab instead of navigating in the current one. This affects everything that uses `ClickableBehavior` to render a link: `Link`, `Button`, `ActivityButton`, `Clickable`, `CompactCell`, `DetailCell` and `ActionItem`. `onClick` and `safeWithNav` are still called. Links with `beforeNav` are unchanged and still navigate in the current tab.
