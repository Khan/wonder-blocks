---
"@khanacademy/eslint-plugin-wonder-blocks": major
"@khanacademy/wonder-blocks-accordion": patch
---

Warn when a heading is passed to `AccordionSection`'s `header` prop

`AccordionSection` wraps its trigger in a heading element containing a
`<button>`, and the `header` content renders inside that button. A heading in
there produces `h2 > button > h3`, which is invalid HTML — a `<button>` may only
contain phrasing content, and nested headings give screen reader users a
duplicated heading structure. Nothing caught this before.

- **eslint-plugin-wonder-blocks:** new `no-heading-in-accordion-header` rule,
  enabled at `error` in the `recommended` config. It flags `<h1>`–`<h6>`, Wonder
  Blocks `Heading` components, and `role="heading"` anywhere inside a literal
  `header` prop on `AccordionSection`. This is a major bump because projects
  extending `recommended` will see new lint errors.
- **wonder-blocks-accordion:** `AccordionSection` now logs a development-only
  console warning when the rendered header turns out to contain a heading. It
  inspects the DOM, so it also catches headings rendered inside a consumer's own
  components, which the lint rule cannot see. It does not fire during
  server-side rendering. The `header` prop documentation now states the
  constraint.

To set the heading level, use `AccordionSection`'s `tag` prop. For
heading-sized text without heading semantics, use `<BodyText tag="span">` with
the `font.heading.*` tokens.
