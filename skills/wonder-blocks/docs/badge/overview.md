# Badges

Badges are visual indicators used to display concise information, such as a
status, label, or count.

The `wonder-blocks-badge` packages has several types of badges. For more details
about each type of badge, refer to the docs for that component!

## StatusBadge

A badge that represents a status.

```tsx
<View style={styles.container}>
    {kinds.map((kind) => {
        const kindLabel =
            kind.charAt(0).toUpperCase() + kind.slice(1);
        return (
            <StatusBadge
                key={kind}
                kind={kind}
                label={kindLabel}
                icon={
                    <PhosphorIcon
                        icon={"cookieBold"}
                        aria-label="Cookie"
                    />
                }
            />
        );
    })}
</View>
```

## NeutralBadge

A badge that displays information without conveying additional meaning through
its visual presentation.

```tsx
<NeutralBadge label="Badge" icon="cookieBold" />
```

## GemBadge

A badge that represents gems.

```tsx
<GemBadge label="Badge" showIcon iconAriaLabel="Gems" />
```

## StreakBadge

A badge that represents a streak.

```tsx
<StreakBadge label="Badge" showIcon iconAriaLabel="Streak" />
```

## DueBadge

A badge that represents when something is due or overdue.

```tsx
<View style={{flexDirection: "row", gap: sizing.size_160}}>
    <DueBadge label={"Due"} kind="due" />
    <DueBadge label={"Overdue"} kind="overdue" />
</View>
```

## Badge (Custom Badges)

For custom badges, the `Badge` component can be used directly. The styles can be
overridden using the `styles` prop.

```tsx
<Badge label="Badge" icon="cookieBold" />
```


---

## Components & Guides

- [Badge](badge.md)
- [Due Badge](due-badge.md)
- [Gem Badge](gem-badge.md)
- [Neutral Badge](neutral-badge.md)
- [Status Badge](status-badge.md)
- [Streak Badge](streak-badge.md)
