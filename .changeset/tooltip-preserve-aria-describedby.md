---
"@khanacademy/wonder-blocks-tooltip": major
---

Tooltip no longer overrides an anchor's own `aria-describedby`. If the anchor element already sets `aria-describedby`, Tooltip leaves it alone. Providing the `id` prop now opts out of the automatic `aria-describedby` as documented; the bubble content's id is `${id}-aria-content`, so consumers can reference it themselves.
