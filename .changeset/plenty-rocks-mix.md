---
"@khanacademy/wonder-blocks-toolbar": major
---

Update Toolbar to use CSS grid. This allows consumers to set `max-width: 100%` on elements passed to the `title` prop to ensure the title does not overlap `leftContent` or `rightContent`. Consumers dependent on the flex behavior of the previous implementation will need to update to support the grid layout. Namely, any consumer using a hack like `width: 100vw` on `rightContent` to force it to take up the full width of the toolbar on mobile will need to use `width: 100%` instead.
