---
"@khanacademy/wonder-blocks-tooltip": patch
---

Fix the Tooltip tail being mispositioned in RTL contexts. The tail is now positioned from a physical origin, matching the coordinate space Popper.js reports its offset in, instead of relying on the bubble's direction-aware flex flow. This also fixes the Popover tail, which renders `TooltipTail`.
