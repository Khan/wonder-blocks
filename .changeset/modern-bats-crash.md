---
"@khanacademy/wonder-blocks-popover": patch
"@khanacademy/wonder-blocks-tooltip": patch
---

Only show the `TooltipPopper` contents once the popper has positioned itself. This fixes the issue where Tooltips are initially rendered in the top left corner for a brief moment before moving to the correct position (which was causing a flickering effect).
