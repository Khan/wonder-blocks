# no-invalid-bodytext-children

Disallow block-level elements and excessive direct children inside `BodyText`.

## Rule Details

`BodyText` renders as a `<p>` element by default. HTML does not allow block-level
elements (e.g. `<div>`, `<section>`, headings) as children of `<p>`. Placing them
inside a default `BodyText` produces invalid markup that browsers must silently
repair, which can cause layout or accessibility issues.

`View` always renders as `<div>` and is never valid as a child of `BodyText`,
regardless of the `tag` prop.

This rule also warns when `BodyText` has more than 5 direct JSX element children
(configurable). `BodyText` is for text content — complex layouts with many child
elements belong in a `View` or other block container.

Add `tag="div"` (or another block-container tag) to `BodyText` to allow
block-level children. Use `tag="span"` on a child `BodyText` to make it inline.

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

/* BodyText defaults to <p> — two <p>s cannot nest */
<BodyText>
    <BodyText>nested</BodyText>
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

/* View always renders as <div> — never valid inside BodyText */
<BodyText>
    <View>layout</View>
</BodyText>

/* Too many direct child elements (default max: 5) */
<BodyText>
    <span>one</span>
    <span>two</span>
    <span>three</span>
    <span>four</span>
    <span>five</span>
    <span>six</span>
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

/* Use View for layouts that need block children */
<View>
    <BodyText>First paragraph</BodyText>
    <BodyText>Second paragraph</BodyText>
</View>
```

## Options

```ts
{
    maxChildren?: number  // default: 5
}
```

### `maxChildren`

Sets the maximum number of direct JSX element children allowed in a single
`BodyText`. Text nodes and expression containers do not count toward this limit.

```js
// .eslintrc.js
{
    "@khanacademy/wonder-blocks/no-invalid-bodytext-children": ["error", { maxChildren: 3 }]
}
```

## When Not To Use It

Disable this rule only if you are intentionally rendering HTML that deviates
from the standard content model and have a specific reason to do so.
