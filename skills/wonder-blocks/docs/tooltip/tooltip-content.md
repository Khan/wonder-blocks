# TooltipContent

> Package: `@khanacademy/wonder-blocks-tooltip`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string \| React.ReactElement` |  | The title for the tooltip content. |
| `children` | `string \| React.ReactElement \| Array<React.ReactElement>` | *required* | The main content for a tooltip. |
| `contentStyle` | `ContentStyle` |  | Optional custom styles for the tooltip which are a subset of valid CSS styles |
| `testId` | `string` |  | Test ID used for e2e testing. |

---

## Default

Default example (interactive).

```tsx
<TooltipContent title="A Tooltip with a title">
  {"some text"}
</TooltipContent>
```

---

## Only Text Content

Only text content

```tsx
<TooltipContent>
  {"Only the content"}
</TooltipContent>
```

---

## Titled Content

Titled content

```tsx
<TooltipContent title="This tooltip has a title">
  {"Some content in my tooltip"}
</TooltipContent>
```

---

## Custom Content

Custom title and custom content

```tsx
<TooltipContent title={<Body>Body text title!</Body>}>
  {<>
                <Body>Body text content!</Body>
                <LabelSmall>And LabelSmall!</LabelSmall>
            </>}
</TooltipContent>
```



---

## Related docs

- [Tooltip](tooltip.md)
