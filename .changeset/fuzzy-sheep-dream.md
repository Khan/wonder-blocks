---
"@khanacademy/wonder-blocks-popover": minor
"@khanacademy/wonder-blocks-tooltip": patch
---

Allow the popover tail to be optional. This is a non-breaking change as it defaults to being visible as before. The TooltipTail export of wonder-blocks-tooltip is modified to support this, but it is a minor change that does not impact the primary API and hence is a patch update. While the Popover change is similar, it has a direct impact to primary uses and so is a minor update.
