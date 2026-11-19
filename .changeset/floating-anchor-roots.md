---
"@khanacademy/wonder-blocks-switch": patch
"@khanacademy/wonder-blocks-form": patch
"@khanacademy/wonder-blocks-banner": patch
"@khanacademy/wonder-blocks-cell": patch
"@khanacademy/wonder-blocks-dropdown": patch
"@khanacademy/wonder-blocks-modal": patch
---

Pass the `FloatingReferenceAttributeName` attribute along, so these components can be the anchor of a `Tooltip`:

- `Switch`, `Checkbox`, `Radio` and `Choice` apply it to their root element (their ref keeps pointing at the inner `<input>`), so the tooltip covers the whole control.
- `Banner`, `DetailCell`, `CompactCell` and `ActionItem` apply it to their root element.
- `ModalLauncher` passes it to the opener rendered by `children`.
