---
"@khanacademy/wonder-blocks-icon-button": patch
---

`IconButton`, `ActivityIconButton`, `ConversationIconButton`, and `NodeIconButton` no longer activate (fire `onClick` or enter the pressed state) when they are `disabled` and the Enter/Space key is used. Keyboard activation now respects the `disabled` state, matching the existing mouse-click behavior. Default key handling (e.g. preventing a disabled `type="submit"` button from submitting its form) is preserved.
