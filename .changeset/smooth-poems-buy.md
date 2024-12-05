---
"@khanacademy/wonder-blocks-dropdown": patch
---

Update `DropdownCore` to check for key presses using `event.key` instead of `event.which` or `event.keyCode` (which are both deprecated now)
