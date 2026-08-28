---
"@khanacademy/wonder-blocks-icon-button": minor
---

Add `onKeyDown` prop to `IconButton`, composed with (not replacing) internal Space/Enter handling. Fixes `IconButtonUnstyled` bug where a caller `onKeyDown` silently overrode internal key handling.
