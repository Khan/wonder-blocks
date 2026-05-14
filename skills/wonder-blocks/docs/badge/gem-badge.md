# GemBadge

> Package: `@khanacademy/wonder-blocks-badge`

A badge that represents gem rewards.
`GemBadge` uses the `Badge` component and applies the appropriate styles
and icon. For more details, see the `Badge` docs.

---

## Default

```tsx
<GemBadge label="Badge" showIcon iconAriaLabel="Gems" />
```

---

## No Icon

Set `showIcon` to `false` to hide the gem icon.

```tsx
<GemBadge label="Badge" showIcon={false} />
```

---

## Icon Only

Set `showIcon` to `true` to show the gem icon. Alt text for the gem icon can
be set using the `iconAriaLabel` prop.

```tsx
<GemBadge showIcon iconAriaLabel="Gems" />
```



---

## Related docs

- [Overview](overview.md)
- [Badge](badge.md)
- [Due Badge](due-badge.md)
- [Neutral Badge](neutral-badge.md)
- [Status Badge](status-badge.md)
- [Streak Badge](streak-badge.md)
