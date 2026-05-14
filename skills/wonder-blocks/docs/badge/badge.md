# Badge

> Package: `@khanacademy/wonder-blocks-badge`

Badges are visual indicators used to display concise information, such as
a status, label, or count.

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
<Badge label="Badge" icon="cookieBold" />
```

---

## No Border

A badge can be used without a border.

```tsx
<Badge icon="cookieBold" label="Badge" showBorder={false} />
```

---

## Label Only

A badge can be used with only a label.

```tsx
<Badge label="Badge" />
```

---

## Icon Only

A badge can be used with only an icon.

```tsx
<Badge icon="cookieBold" />
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
    <HeadingLarge>
        Custom single colored svg icon using PhosphorIcon
    </HeadingLarge>
    <Badge
        icon={
            <PhosphorIcon
                icon={singleColoredIcon}
                aria-label="Crown"
            />
        }
        label="Custom Icon"
    />
    <HeadingLarge>
        Custom single colored svg icon using PhosphorIcon and color
        prop
    </HeadingLarge>
    <Badge
        icon={
            <PhosphorIcon
                icon={singleColoredIcon}
                aria-label="Crown"
                color={semanticColor.status.success.foreground}
            />
        }
        label="Custom Icon"
    />
    <HeadingLarge>
        Custom multi-colored inline svg using the Icon component
    </HeadingLarge>
    <Badge
        icon={<Icon>{multiColoredIcon}</Icon>}
        label="Custom Icon"
    />
    <HeadingLarge>
        Custom img element using the Icon component with a svg src
    </HeadingLarge>
    <Badge
        icon={
            <Icon>
                <img src={"logo.svg"} alt="Wonder Blocks" />
            </Icon>
        }
        label="Custom Icon"
    />
    <HeadingLarge>
        Custom img element using the Icon component with a png src
    </HeadingLarge>
    <Badge
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
<Badge
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

## Tag

When the `tag` prop is provided, the badge will render as the specified tag.
For example, if a badge should have emphasis, use a `strong` tag.

```tsx
<Badge label="Badge" icon="cookieBold" tag="strong" />
```

---

## Badge With Tooltip

When using a `Badge` with a `Tooltip`, make sure to add `role="button"` on the
`Badge`. This is so that it is interactive and the tooltip contents can be
read out properly via the `aria-describedby` attribute on the `Badge` added
by the Tooltip component.
Note: The `Tooltip` component also sets the `tabIndex` of the `Badge` so that
it is focusable.

```tsx
<Tooltip content="This is a tooltip" opened={true}>
    <Badge
        label={"Badge" || ""}
        icon={
            "cookieBold" ? (
                <PhosphorIcon icon={"cookieBold"} />
            ) : undefined
        }
        role="button"
    />
</Tooltip>
```

---

## Badge Truncation

By default, the label is truncated after `30ch` (approximately 30 characters).
If you have long lines of text to communicate information, this badge pattern
is not the right component for that purpose.

```tsx
<Badge label="Badge with a long label that should be truncated" icon="cookieBold" />
```



---

## Related docs

- [Overview](overview.md)
- [Due Badge](due-badge.md)
- [Gem Badge](gem-badge.md)
- [Neutral Badge](neutral-badge.md)
- [Status Badge](status-badge.md)
- [Streak Badge](streak-badge.md)
