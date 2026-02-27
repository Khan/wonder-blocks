# Deprecated Semantic Colors

---

## Action Primary

For buttons, links, and controls to communicate the presence and meaning of
interaction.
These action tokens are meant for internal WB use and will be make private in the future. Please use the semanticColor.core tokens instead.

Communicates strong emphasis and primary actions.

```tsx
<View>
    <Heading>Progressive</Heading>
    <ColorGroupStory
        category={semanticColor.action.primary.progressive}
        group="action.primary.progressive"
        includeExample={true}
    />
    <Heading>Destructive</Heading>
    <ColorGroupStory
        category={semanticColor.action.primary.destructive}
        group="action.primary.destructive"
        includeExample={true}
    />
    <Heading>Neutral</Heading>
    <ColorGroupStory
        category={semanticColor.action.primary.neutral}
        group="action.primary.neutral"
        includeExample={true}
    />
    <Heading>Disabled</Heading>
    <ColorGroup
        colors={semanticColor.action.primary.disabled}
        group="action.primary.disabled"
        variant="compact"
        style={styles.gridCompact}
    />
</View>
```

---

## Action Secondary

Communicates secondary actions and less emphasis.

```tsx
<View>
    <Heading>Progressive</Heading>
    <ColorGroupStory
        category={semanticColor.action.secondary.progressive}
        group="action.secondary.progressive"
        includeExample={true}
    />
    <Heading>Destructive</Heading>
    <ColorGroupStory
        category={semanticColor.action.secondary.destructive}
        group="action.secondary.destructive"
        includeExample={true}
    />
    <Heading>Neutral</Heading>
    <ColorGroupStory
        category={semanticColor.action.secondary.neutral}
        group="action.secondary.neutral"
        includeExample={true}
    />
    <Heading>Disabled</Heading>
    <ColorGroup
        colors={semanticColor.action.secondary.disabled}
        group="action.secondary.disabled"
        variant="compact"
        style={styles.gridCompact}
    />
</View>
```

---

## Action Tertiary

Communicates tertiary actions that have the lowest hierarchy.

```tsx
<View>
    <Heading>Progressive</Heading>
    <ColorGroupStory
        category={semanticColor.action.tertiary.progressive}
        group="action.tertiary.progressive"
        includeExample={true}
    />
    <Heading>Destructive</Heading>
    <ColorGroupStory
        category={semanticColor.action.tertiary.destructive}
        group="action.tertiary.destructive"
        includeExample={true}
    />
    <Heading>Neutral</Heading>
    <ColorGroupStory
        category={semanticColor.action.tertiary.neutral}
        group="action.tertiary.neutral"
        includeExample={true}
    />
    <Heading>Disabled</Heading>
    <ColorGroup
        colors={semanticColor.action.tertiary.disabled}
        group="action.tertiary.disabled"
        variant="compact"
        style={styles.gridCompact}
    />
</View>
```

---

## Status

For labels, icons, filters, alerts, and other elements where color can add
meaning to the state of the system or an item in the system.
Note: These status tokens are deprecated and will be removed in the future.
Please use the semantic feedback tokens instead: `semanticColor.feedback`

```tsx
<View style={styles.grid}>
    <ColorGroup
        colors={semanticColor.status.critical}
        group="status.critical"
        valuePrefix={valuePrefix}
    />
    <ColorGroup
        colors={semanticColor.status.warning}
        group="status.warning"
        valuePrefix={valuePrefix}
    />
    <ColorGroup
        colors={semanticColor.status.success}
        group="status.success"
        valuePrefix={valuePrefix}
    />
    <ColorGroup
        colors={semanticColor.status.notice}
        group="status.notice"
        valuePrefix={valuePrefix}
    />
    <ColorGroup
        colors={semanticColor.status.neutral}
        group="status.neutral"
        valuePrefix={valuePrefix}
    />
</View>
```



---

## Related docs

- [Overview](overview.md)
- [Border](border.md)
- [Box Shadow](box-shadow.md)
- [Deprecated Color Deprecated](deprecated-color-deprecated.md)
- [Deprecated Spacing Deprecated](deprecated-spacing-deprecated.md)
- [Media Query Breakpoints](media-query-breakpoints.md)
- [Semantic Color](semantic-color.md)
- [Semantic Colors Groups](semantic-colors-groups.md)
- [Sizing](sizing.md)
- [Typography](typography.md)
- [Utilities Fade](utilities-fade.md)
- [Utilities Mix](utilities-mix.md)
