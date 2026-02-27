# Neutral Badge

> Package: `@khanacademy/wonder-blocks-badge`

A badge that represents information without conveying additional meaning
through its visual presentation
`NeutralBadge` uses the `Badge` component and applies the appropriate styles
for the neutral styling. For more details, see the `Badge` docs.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showBorder` | `boolean` |  | Whether to show the border. Defaults to `true`. |

---

## Default

The badge takes an icon and/or a label:
- `icon`: The icon to display in the badge. It can be a `PhosphorIcon` or a
`Icon` for custom icons (see Custom Icons docs for more details). If the icon
conveys meaning, set the alt text on the icon being used
- `label`: The label to display in the badge.

```tsx
<NeutralBadge label="Badge" icon="cookieBold" />
```

---

## No Border

A badge can be used without a border.

```tsx
<NeutralBadge icon="cookieBold" label="Badge" showBorder={false} />
```

---

## Label Only

A badge can be used with only a label.

```tsx
<NeutralBadge label="Badge" />
```

---

## Icon Only

A badge can be used with only an icon.

```tsx
<NeutralBadge icon="cookieBold" />
```

---

## Custom Icons

A badge can be used with a custom icon using the `PhosphorIcon` or `Icon`
components. Here are some examples with custom icons:
- A custom single colored svg icon
  - Use with the `PhosphorIcon` component
  - If the svg has `fill="currentColor"` and the `color` prop for
    `PhosphorIcon` is not set, then the icon will use the color specified by
    the `Badge` component.
- A multi-colored inline svg
  - Use with the `Icon` component
  - The `Icon` component supports svg assets that define their own fill
- An `img` element
  - Use with the `Icon` component
  - The `Icon` component supports `img` elements
- For icons that are from the Phosphor library, continue using the
`PhosphorIcon` component.
If the icon conveys meaning, it should have alt text.

```tsx
<View style={{gap: sizing.size_240}}>
    <Heading size="large">
        Custom single colored svg icon using PhosphorIcon
    </Heading>
    <NeutralBadge
        icon={
            <PhosphorIcon
                icon={singleColoredIcon}
                aria-label="Crown"
            />
        }
        label="Custom Icon"
    />
    <Heading size="large">
        Custom single colored svg icon using PhosphorIcon and color
        prop
    </Heading>
    <NeutralBadge
        icon={
            <PhosphorIcon
                icon={singleColoredIcon}
                aria-label="Crown"
                color={semanticColor.status.success.foreground}
            />
        }
        label="Custom Icon"
    />
    <Heading size="large">
        Custom multi-colored inline svg using the Icon component
    </Heading>
    <NeutralBadge
        icon={<Icon>{multiColoredIcon}</Icon>}
        label="Custom Icon"
    />
    <Heading size="large">
        Custom img element using the Icon component with a svg src
    </Heading>
    <NeutralBadge
        icon={
            <Icon>
                <img src={"logo.svg"} alt="Wonder Blocks" />
            </Icon>
        }
        label="Custom Icon"
    />
    <Heading size="large">
        Custom img element using the Icon component with a png src
    </Heading>
    <NeutralBadge
        icon={
            <Icon>
                <img src="avatar.png" alt="Example avatar" />
            </Icon>
        }
        label="Custom Icon"
    />
</View>
```

---

## Custom Styles

A badge can be used with custom styles. The following parts can be styled:
- `root`: Styles the root element
- `icon`: Styles the icon element
- `label`: Styles the text in the element
Here is an example of custom styles using semantic tokens.

```tsx
<NeutralBadge
    label={"Badge" || ""}
    icon={
        "cookieBold" ? (
            <PhosphorIcon
                icon={"cookieBold"}
                aria-label={"Example icon"}
            />
        ) : undefined
    }
    styles={{
        root: {
            backgroundColor:
                semanticColor.core.background.neutral.strong,
            borderColor: semanticColor.core.border.knockout.default,
            color: semanticColor.core.foreground.knockout.default,
        },
        icon: {
            color: semanticColor.core.foreground.knockout.default,
        },
        label: {
            fontWeight: font.weight.medium,
        },
    }}
/>
```



---

## Related docs

- [Overview](overview.md)
- [Badge](badge.md)
- [Due Badge](due-badge.md)
- [Gem Badge](gem-badge.md)
- [Status Badge](status-badge.md)
- [Streak Badge](streak-badge.md)
