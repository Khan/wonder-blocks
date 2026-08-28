---
"@khanacademy/wonder-blocks-modal": minor
---

Add an optional `animated` prop to `ModalLauncher` for enter/exit animation using the `floating` motion tokens (the backdrop fades; the dialog rises, scales, and fades). It defaults to `false`, so existing usages are unchanged — opt in per instance with `animated`. When `true`, closing becomes asynchronous: the modal stays mounted for the exit animation's duration, so `onClose` and focus-return fire after it finishes. Only content built from `ModalDialog`-based dialogs (e.g. `OnePaneDialog`, `ModalPanel`) animates its float; the backdrop always fades.
