# StatusBadge

> Package: `@khanacademy/wonder-blocks-badge`

A badge that represents a status.
`StatusBadge` uses the `Badge` component and applies the appropriate styles
for the status kinds. For more details, see the `Badge` docs.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `kind` | `"info" \| "success" \| "warning" \| "critical"` |  | The kind of badge to display. Defaults to `info`. |
| `showBorder` | `boolean` |  | Whether to show the border. Defaults to `true`. |

---

## Default

```tsx
<StatusBadge
    label={"Badge" || ""}
    icon={
        "cookieBold" ? (
            <PhosphorIcon icon={"cookieBold"} aria-label="Example icon" />
        ) : undefined
    }
/>
```

---

## Kinds

The different kinds of status badges.

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

---

## No Border

A status badge can be used without a border.

```tsx
<View style={styles.container}>
    {kinds.map((kind) => {
        const kindLabel =
            kind.charAt(0).toUpperCase() + kind.slice(1);
        return (
            <StatusBadge
                showBorder={false}
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

---

## Label Only

A badge can be used with only a label.

```tsx
<StatusBadge label="Badge" />
```

---

## Icon Only

A badge can be used with only an icon.

```tsx
<StatusBadge icon="cookieBold" />
```

---

## Custom Icons

For more details about using custom icons, see the Badge docs for custom icons.

```tsx
<View style={{gap: sizing.size_240}}>
    <HeadingLarge>
        Custom single colored svg icon using PhosphorIcon
    </HeadingLarge>
    <View style={styles.container}>
        {kinds.map((kind) => {
            return (
                <StatusBadge
                    key={kind}
                    kind={kind}
                    icon={
                        <PhosphorIcon
                            icon={singleColoredIcon}
                            aria-label="Crown"
                        />
                    }
                    label="Custom Icon"
                />
            );
        })}
    </View>
    <HeadingLarge>
        Custom single colored svg icon using PhosphorIcon and color
        prop
    </HeadingLarge>
    <View style={styles.container}>
        {kinds.map((kind) => {
            return (
                <StatusBadge
                    key={kind}
                    kind={kind}
                    icon={
                        <PhosphorIcon
                            icon={singleColoredIcon}
                            aria-label="Crown"
                            color={
                                semanticColor.core.foreground
                                    .neutral.default
                            }
                        />
                    }
                    label="Custom Icon"
                />
            );
        })}
    </View>
    <HeadingLarge>
        Custom multi-colored inline svg using the Icon component
    </HeadingLarge>
    <View style={styles.container}>
        {kinds.map((kind) => {
            return (
                <StatusBadge
                    key={kind}
                    kind={kind}
                    icon={<Icon>{multiColoredIcon}</Icon>}
                    label="Custom Icon"
                />
            );
        })}
    </View>
    <HeadingLarge>
        Custom img element using the Icon component with a svg src
    </HeadingLarge>
    <View style={styles.container}>
        {kinds.map((kind) => {
            return (
                <StatusBadge
                    key={kind}
                    kind={kind}
                    icon={
                        <Icon>
                            <img
                                src="logo.svg"
                                alt="Wonder Blocks"
                            />
                        </Icon>
                    }
                    label="Custom Icon"
                />
            );
        })}
    </View>
    <HeadingLarge>
        Custom img element using the Icon component with a png src
    </HeadingLarge>
    <View style={styles.container}>
        {kinds.map((kind) => {
            return (
                <StatusBadge
                    key={kind}
                    kind={kind}
                    icon={
                        <Icon>
                            <img
                                src="avatar.png"
                                alt="Example avatar"
                            />
                        </Icon>
                    }
                    label="Custom Icon"
                />
            );
        })}
    </View>
</View>
```



---

## Related docs

- [Overview](overview.md)
- [Badge](badge.md)
- [Due Badge](due-badge.md)
- [Gem Badge](gem-badge.md)
- [Neutral Badge](neutral-badge.md)
- [Streak Badge](streak-badge.md)
