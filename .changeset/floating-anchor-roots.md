---
"@khanacademy/wonder-blocks-switch": patch
"@khanacademy/wonder-blocks-form": patch
---

`Switch`, `Checkbox`, `Radio` and `Choice` apply the `FloatingReferenceAttributeName` attribute to their root element (their ref keeps pointing at the inner `<input>`), so tooltips anchored to them cover the whole control.
