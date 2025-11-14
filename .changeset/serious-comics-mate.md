---
"@khanacademy/wonder-blocks-tabs": patch
---

Fix issue where TabPanel is set with tabIndex=0 before it has determined if it has focusable elements within it (related to a focus management bug when Tabs are used inside a Popover). Also apply WB focus styling to the tabpanel element since it is focusbale when there are no interactive elements in it.
