---
"@khanacademy/wonder-blocks-styles": minor
"@khanacademy/wonder-blocks-popover": patch
"@khanacademy/wonder-blocks-clickable": patch
"@khanacademy/wonder-blocks-link": patch
---

- `wonder-blocks-styles`: Add CSS mixin counterparts to the `actionStyles` and `minTargetSizeStyles` JS exports for CSS Modules authors: `@khanacademy/wonder-blocks-styles/action-styles.css` (`--wb-action-inverse`) and `@khanacademy/wonder-blocks-styles/min-target-size-styles.css` (`--wb-min-target-size`).
- `wonder-blocks-styles`, `wonder-blocks-clickable`, `wonder-blocks-link`: Fix the minimum target size hit area in right-to-left layouts. It was offset beside the control instead of centered on it.
- `wonder-blocks-popover`: `PopoverContentCore`'s light close button (`closeButtonLight`) now uses the `--wb-action-inverse` CSS mixin instead of the Aphrodite `actionStyles.inverse` style. No visual change.
