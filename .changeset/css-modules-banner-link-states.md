---
"@khanacademy/wonder-blocks-banner": patch
---

Keep the hover/press underline on Banner's link actions after `Link`'s move to
CSS Modules. Banner's link style overrides `textDecoration` and
`textUnderlineOffset`; those overrides now apply in every state, so the link
style restates `Link`'s hover/press values.
