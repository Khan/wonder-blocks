# no-invalid-bodytext-children

Disallow block-level elements inside `BodyText`.

## Rule Details

`BodyText` renders as a `<p>` element by default. HTML does not allow block-level
elements (e.g. `<div>`, `<section>`, headings) as children of `<p>`. Placing them
inside a default `BodyText` produces invalid markup that browsers must silently
repair, which can cause layout or accessibility issues.

`View` defaults to `<div>` and is invalid as a child of a phrasing-content
`BodyText` unless given an inline `tag` prop (e.g. `tag="span"`).

Add `tag="div"` (or another block-container tag) to `BodyText` to allow
block-level children. Use `tag="span"` on a child `BodyText` to make it inline.

`BodyText` nested inside another `BodyText` is handled by
[`no-invalid-bodytext-parent`](./no-invalid-bodytext-parent.md), which also
provides an auto-fix.

Examples of **incorrect** code:

```tsx
/* <div> cannot be a child of <p> */
<BodyText>
    <div>some block content</div>
</BodyText>

/* <p> cannot be nested inside <p> */
<BodyText>
    <p>nested paragraph</p>
</BodyText>

/* Block-level HTML elements are not valid inside <p> */
<BodyText>
    <section>section content</section>
</BodyText>
<BodyText>
    <h2>Subheading</h2>
</BodyText>

/* WB Heading components render as block-level elements */
<BodyText>
    <Heading>Title</Heading>
</BodyText>

/* View defaults to <div> — invalid inside a phrasing-content BodyText */
<BodyText>
    <View>layout</View>
</BodyText>
```

Examples of **correct** code:

```tsx
/* Inline/phrasing-content children are always valid */
<BodyText>
    Plain text with <strong>bold</strong> and <em>emphasis</em>.
</BodyText>

/* tag="div" allows block children */
<BodyText tag="div">
    <div>block content</div>
</BodyText>

/* tag="span" on inner BodyText makes it inline */
<BodyText>
    Outer text <BodyText tag="span">inline nested</BodyText>
</BodyText>

/* tag="span" on View makes it inline — valid inside BodyText */
<BodyText>
    Read more <View tag="span">details here</View>.
</BodyText>

/* Use View for layouts that need block children */
<View>
    <BodyText>First paragraph</BodyText>
    <BodyText>Second paragraph</BodyText>
</View>
```

## When Not To Use It

Disable this rule only if you are intentionally rendering HTML that deviates
from the standard content model and have a specific reason to do so.
