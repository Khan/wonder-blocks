---
"@khanacademy/wonder-blocks-tabs": patch
---

Fix issue where TabPanel is set with tabIndex=0 before it has determined if it has focusable elements within it (related to a focus management bug when Tabs are used inside a Popover)
