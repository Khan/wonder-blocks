# Media Query Breakpoints

---

## Breakpoint Media Queries

You can use mediaQuery conditions by importing `breakpoint` from the
`wonder-blocks-tokens` package and accessing its object properties for sizing
like so: `breakpoint.mediaQuery.sm`.
```js
import {breakpoint} from "@khanacademy/wonder-blocks-tokens";
const styles = {
    [breakpoint.mediaQuery.sm]: {
        flexDirection: "column",
    },
};
```

```tsx
<TokenTable
    columns={[
        {
            label: "Media Query Token",
            cell: (row: Row) => (
                <Code>{`breakpoint.mediaQuery.${row.label}`}</Code>
            ),
        },
        {
            label: "Value",
            cell: "value",
        },
    ]}
    tokens={tokens.breakpoint.mediaQuery}
/>
```

---

## Breakpoint Widths

You can also use pure width values by importing `breakpoint` from the
`wonder-blocks-tokens` package and accessing the `width` object:
`breakpoint.width.sm`. These can be useful for tooling or in CSS where a number value
is needed. Therefore, pixel values are returned without a unit. You can
interpolate a string to add the `px` unit like so:
```js
import {breakpoint} from "@khanacademy/wonder-blocks-tokens";
const styles = {
    element: {
        maxWidth: `${breakpoint.width.lg}px`,
    },
};
```

```tsx
<TokenTable
    columns={[
        {
            label: "Width Token",
            cell: (row: Row) => (
                <Code>{`breakpoint.width.${row.label}`}</Code>
            ),
        },
        {
            label: "Value (px)",
            cell: "value",
        },
    ]}
    tokens={tokens.breakpoint.width}
/>
```



---

## Related docs

- [Overview](overview.md)
- [Border](border.md)
- [Box Shadow](box-shadow.md)
- [Deprecated Color Deprecated](deprecated-color-deprecated.md)
- [Deprecated Deprecated Semantic Colors](deprecated-deprecated-semantic-colors.md)
- [Deprecated Spacing Deprecated](deprecated-spacing-deprecated.md)
- [Semantic Color](semantic-color.md)
- [Semantic Colors Groups](semantic-colors-groups.md)
- [Sizing](sizing.md)
- [Typography](typography.md)
- [Utilities Fade](utilities-fade.md)
- [Utilities Mix](utilities-mix.md)
