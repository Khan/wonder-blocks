---
"@khanacademy/wonder-blocks-dropdown": patch
---

Update styling for variants of `SingleSelect` and `MultiSelect`.

This addresses some styling edge cases around error/disabled states, focus/hover/active states, and light mode. The `not-allowed` cursor is also applied to the disabled state.

Styling is now applied using css pseudo-classes (`:focus-visible`, `:hover`, `:active`) instead of applying styles using js.
