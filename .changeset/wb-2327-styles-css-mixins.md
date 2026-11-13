---
"@khanacademy/wonder-blocks-styles": minor
"@khanacademy/wonder-blocks-popover": patch
---

- `wonder-blocks-styles`: Add CSS mixin counterparts to the `actionStyles` and `minTargetSizeStyles` JS exports for CSS Modules authors: `@khanacademy/wonder-blocks-styles/action-styles.css` (`--wb-action-inverse`) and `@khanacademy/wonder-blocks-styles/min-target-size-styles.css` (`--wb-min-target-size`). The JS exports are unchanged.
- `wonder-blocks-popover`: `PopoverContentCore`'s light close button (`closeButtonLight`) now uses the `--wb-action-inverse` CSS mixin instead of the Aphrodite `actionStyles.inverse` style. No visual change.
