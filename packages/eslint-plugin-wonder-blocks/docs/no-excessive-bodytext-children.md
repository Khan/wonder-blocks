# no-excessive-bodytext-children

Disallow `BodyText` with more direct JSX element children than a configurable
threshold.

## Rule Details

`BodyText` is intended for text content, not complex layouts. When it contains
many direct child elements, it is likely being used as a structural container —
a role better served by `View` or another block-level element.

There is also an accessibility concern: screen readers such as VoiceOver break
up paragraph content at element boundaries. Each child element — even a `<span>`
used purely for styling — interrupts the flow of content being read aloud.
Keeping the number of child elements low reduces these interruptions and produces
a more natural reading experience.

Text nodes and expression containers (`{value}`) do not count toward the limit.

Examples of **incorrect** code (with the default threshold of 5):

```tsx
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
/* Five or fewer direct child elements */
<BodyText>
    <span>one</span>
    <span>two</span>
    <span>three</span>
    <span>four</span>
    <span>five</span>
</BodyText>

/* Text nodes do not count */
<BodyText>
    Some text <strong>bold</strong> more text <em>emphasis</em> and more.
</BodyText>

/* Use View for complex layouts */
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
`BodyText`.

```js
// .eslintrc.js
{
    "@khanacademy/wonder-blocks/no-excessive-bodytext-children": ["error", { maxChildren: 3 }]
}
```

## When Not To Use It

Disable this rule if your team deliberately uses `BodyText` as a rich inline
container and the child-count threshold is not a useful signal in your codebase.
