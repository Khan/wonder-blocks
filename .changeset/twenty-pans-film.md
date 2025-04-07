---
"@khanacademy/wonder-blocks-tabs": minor
---

Tabs

- Added `id` and `testId`  props
- Cache previously visited tab panels. This is so tabs are only mounted when
they are selected the first time. Re-visiting a tab doesn't re-mount the panel
- Support ARIA props in items in the `tabs` prop
- Support a render function for a tab's label in the `tabs` prop
