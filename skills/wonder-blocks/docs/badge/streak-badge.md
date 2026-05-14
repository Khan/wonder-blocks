# StreakBadge

> Package: `@khanacademy/wonder-blocks-badge`

A badge that represents streaks.
`StreakBadge` uses the `Badge` component and applies the appropriate styles
and icon. For more details, see the `Badge` docs.

---

## Default

```tsx
<StreakBadge label="Badge" showIcon iconAriaLabel="Streak" />
```

---

## No Icon

Set `showIcon` to `false` to hide the streak icon.

```tsx
<StreakBadge label="Badge" showIcon={false} />
```

---

## Icon Only

Set `showIcon` to `true` to show the streak icon. Alt text for the streak icon can
be set using the `iconAriaLabel` prop.

```tsx
<StreakBadge showIcon iconAriaLabel="Streak" />
```



---

## Related docs

- [Overview](overview.md)
- [Badge](badge.md)
- [Due Badge](due-badge.md)
- [Gem Badge](gem-badge.md)
- [Neutral Badge](neutral-badge.md)
- [Status Badge](status-badge.md)
