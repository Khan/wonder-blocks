# DueBadge

> Package: `@khanacademy/wonder-blocks-badge`

A badge that communicates when a task is due.
`DueBadge` uses the `Badge` component and applies the appropriate styles
for the kinds.
Note: The `iconAriaLabel` prop can be used to set an `aria-label` on the icon
if `showIcon` is `true`. This is helpful for providing context to screen
readers about what the badge is communicating.
For more details, see the `Badge` docs.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `kind` | `"due" \| "overdue"` |  | The kind of due badge. Defaults to `due`. |

---

## Default

```tsx
<DueBadge label={"Badge" || ""} />
```

---

## Kinds

The `DueBadge` supports two kinds: `due` and `overdue`. By default, the
`due` kind is used.

```tsx
<View style={{flexDirection: "row", gap: sizing.size_160}}>
    <DueBadge label={"Due"} kind="due" />
    <DueBadge label={"Overdue"} kind="overdue" />
</View>
```

---

## Label Only

A badge can be used with only a label.

```tsx
<DueBadge label="Badge" />
```

---

## Icon Only

Set `showIcon` to `true` to show the icon only. Alt text for the icon can be
set using the `iconAriaLabel` prop.

```tsx
<View style={{flexDirection: "row", gap: sizing.size_160}}>
    <DueBadge showIcon={true} iconAriaLabel="Due" kind="due" />
    <DueBadge
        showIcon={true}
        iconAriaLabel="Overdue"
        kind="overdue"
    />
</View>
```



---

## Related docs

- [Overview](overview.md)
- [Badge](badge.md)
- [Gem Badge](gem-badge.md)
- [Neutral Badge](neutral-badge.md)
- [Status Badge](status-badge.md)
- [Streak Badge](streak-badge.md)
