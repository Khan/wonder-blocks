# DetailCell

> Package: `@khanacademy/wonder-blocks-cell`

This is a variant of CompactCell that allows adding subtitles, before and
after the cell title. They typically represent an item that can be
clicked/tapped to view more complex details. They vary in height depending on
the presence or absence of subtitles, and they allow for a wide range of
functionality depending on which accessories are active.
### Usage
```jsx
import {DetailCell} from "@khanacademy/wonder-blocks-cell";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
<DetailCell
 leftAccessory={<PhosphorIcon icon={contentVideo} size="medium" />}
 subtitle1="Subtitle 1"
 title="Detail cell"
 subtitle1="Subtitle 2"
 rightAccessory={<PhosphorIcon icon={caretRight} size="medium" />}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `subtitle1` | `TypographyText` |  | You can either provide a string or a custom node Typography element (or |
| `subtitle2` | `TypographyText` |  | You can either provide a string or a custom node Typography element (or |

---

## Default Detail Cell

```tsx
<DetailCell title="Title for article item" subtitle1="Subtitle 1 for article item" subtitle2="Subtitle 2 for article item" leftAccessory={<PhosphorIcon icon={IconMappings.playCircle} size="medium" />} rightAccessory={<PhosphorIcon icon={IconMappings.caretRight} />} />
```

---

## Detail Cell Active

For more complex scenarios where we need to use more content such as
subtitles, we provide a DetailCell component that can be used to cover these
cases. The following example shows how to include a subtitle and use the
active state.

```tsx
<DetailCell
    title="Title for article item"
    subtitle1="Subtitle for article item"
    subtitle2="Subtitle for article item"
    leftAccessory={
        <PhosphorIcon icon={IconMappings.playCircle} size="medium" />
    }
    rightAccessory={
        <PhosphorIcon icon={IconMappings.caretRightBold} size="small" />
    }
    active={true}
/>
```

---

## Detail Cell Disabled

For more complex scenarios where we need to use more content such as
subtitles, we provide a DetailCell component that can be used to cover these
cases. The following example shows how to include a subtitle and use the
active state.

```tsx
<DetailCell
    title="Title for article item"
    subtitle1="Subtitle for article item"
    subtitle2="Subtitle for article item"
    leftAccessory={
        <PhosphorIcon icon={IconMappings.playCircle} size="medium" />
    }
    rightAccessory={
        <PhosphorIcon icon={IconMappings.caretRightBold} size="small" />
    }
    disabled={true}
/>
```

---

## Detail Cell With Custom Styles

`DetailCell` can be used with custom styles. The following parts can be
styled:
- `root`: Styles the root element
- `content`: Styles the content area (between the accessories)
- `leftAccessory`: Styles the left accessory element
- `rightAccessory`: Styles the right accessory element

```tsx
<DetailCell
    title="Title for article item"
    leftAccessory={
        <PhosphorIcon icon={IconMappings.caretLeftBold} size="small" />
    }
    rightAccessory={
        <PhosphorIcon icon={IconMappings.caretRightBold} size="small" />
    }
    styles={{
        root: {
            textAlign: "center",
            minHeight: 88,
        },
        content: {
            alignSelf: "flex-start",
        },
        leftAccessory: {
            alignSelf: "flex-start",
        },
        rightAccessory: {
            alignSelf: "flex-start",
        },
    }}
/>
```

---

## Clickable Detail Cell

Cell components can also also be clickable. This is done by passing a
`onClick` prop to the component.

```tsx
<DetailCell
    title="Title for article item"
    subtitle1="Subtitle for article item"
    subtitle2="Subtitle for article item"
    leftAccessory={
        <PhosphorIcon icon={IconMappings.playCircle} size="medium" />
    }
    rightAccessory={<PhosphorIcon icon={IconMappings.caretRight} />}
    onClick={() => {}}
    aria-label="Press to navigate to the article"
/>
```

---

## Client-side navigation with DetailCell

Cells accept an `href` prop to be able to navigate to a different URL. Note
that this will use client-side navigation if the Cell component is within a
React-Router environment.

```tsx
<MemoryRouter>
    <CompatRouter>
        <View>
            <DetailCell
                title="Data"
                subtitle2="Subtitle for article item"
                leftAccessory={
                    <PhosphorIcon
                        icon={IconMappings.playCircle}
                        size="medium"
                    />
                }
                rightAccessory={
                    <PhosphorIcon icon={IconMappings.caretRight} />
                }
                href="/math/algebra"
                aria-label="Press to navigate to the article"
            />
            <DetailCell
                title="Geometry"
                subtitle2="Subtitle for article item"
                leftAccessory={
                    <PhosphorIcon
                        icon={IconMappings.playCircle}
                        size="medium"
                    />
                }
                rightAccessory={
                    <PhosphorIcon icon={IconMappings.caretRight} />
                }
                href="/math/geometry"
                aria-label="Press to navigate to the article"
                horizontalRule="none"
            />
        </View>

        <View style={styles.navigation}>
            <Routes>
                <Route
                    path="/math/algebra"
                    element={<View>Navigates to /math/algebra</View>}
                />
                <Route
                    path="/math/geometry"
                    element={<View>Navigates to /math/geometry</View>}
                />
                <Route
                    path="*"
                    element={<View>See navigation changes here</View>}
                />
            </Routes>
        </View>
    </CompatRouter>
</MemoryRouter>
```

---

## Detail Cells As List Items

These are `DetailCell` instances with custom background colors. Note that we
use the `style` prop to pass a custom style object to the cell.
We recommend using a faded background color (third cell) to make the cell
look as expected with different states (e.g. hover, focus, active).
If you use a solid background color (last cell), the cell states will not
change the background color.
_NOTE:_ We use custom roles here to make sure that the cell focus ring is
displayed correctly while using `View` elements as parent containers. We
encourage using semantic HTML elements (e.g. `ul`, `li`) when possible (via
`addStyle("ul")` if you need to add Aphrodite Styles).

```tsx
<View role="list">
    <View role="listitem">
        <DetailCell
            title="Active Cell"
            rightAccessory={
                <PhosphorIcon
                    icon={IconMappings.caretRight}
                    size="medium"
                />
            }
            active={true}
            href="https://khanacademy.org"
            horizontalRule="full-width"
        />
    </View>
    <View role="listitem">
        <DetailCell
            title="Cell with default bg color"
            rightAccessory={
                <PhosphorIcon
                    icon={IconMappings.caretRight}
                    size="medium"
                />
            }
            href="https://khanacademy.org"
            horizontalRule="full-width"
        />
    </View>
    <View role="listitem">
        <DetailCell
            title="Disabled Cell"
            rightAccessory={
                <PhosphorIcon
                    icon={IconMappings.caretRight}
                    size="medium"
                />
            }
            disabled={true}
            href="https://khanacademy.org"
            horizontalRule="full-width"
        />
    </View>
    <View role="listitem">
        <DetailCell
            title="Cell with a faded background color"
            rightAccessory={
                <PhosphorIcon
                    icon={IconMappings.caretRight}
                    size="medium"
                />
            }
            href="https://khanacademy.org"
            horizontalRule="full-width"
            styles={{
                root: {
                    background:
                        semanticColor.core.background.overlay.default,
                },
            }}
        />
    </View>
    <View role="listitem">
        <DetailCell
            title="Cell with a solid background color"
            rightAccessory={
                <PhosphorIcon
                    icon={IconMappings.caretRight}
                    size="medium"
                />
            }
            onClick={() => {}}
            styles={{
                root: {
                    background:
                        semanticColor.core.background.warning.subtle,
                },
            }}
            horizontalRule="full-width"
        />
    </View>
</View>
```

---

## Custom Styles

Custom styling can be applied to the component using the `styles` prop.

```tsx
<View style={{gap: spacing.large_24}}>
    Active
    <DetailCell
        leftAccessory={<PhosphorIcon icon={IconMappings.playCircle} size="medium" />}
        rightAccessory={<PhosphorIcon icon={IconMappings.checkCircleFill} size="medium" />}
        styles={{
            root: {
                borderRadius: border.radius.radius_120,
                ":active": {
                    borderRadius: border.radius.radius_120,
                },
            },
        }}
        active={true}
    />
    Pressed
    <DetailCell
        styles={{
            root: {
                ":active": {
                    borderRadius: border.radius.radius_120,
                },
            },
        }}
    />
    Different content heights
    <View
        style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "16px",
        }}
    >
        <DetailCell
            title="Title"
            subtitle1="Subtitle 1"
            subtitle2="Subtitle2"
            onClick={() => {}}
            styles={{
                root: [
                    {
                        border: `1px solid ${semanticColor.core.border.neutral.subtle}`,
                    },
                ],
            }}
            horizontalRule={"none"}
        />
        <DetailCell
            title="Title"
            onClick={() => {}}
            styles={{
                root: [
                    styles?.root,
                    {
                        border: `1px solid ${semanticColor.core.border.neutral.subtle}`,
                    },
                ],
            }}
            horizontalRule={"none"}
        />
        <DetailCell
            title="Title"
            onClick={() => {}}
            styles={{
                root: [
                    styles?.root,
                    {
                        border: `1px solid ${semanticColor.core.border.neutral.subtle}`,
                    },
                ],
            }}
            horizontalRule={"none"}
        />
    </View>
</View>
```



---

## Related docs

- [Compact Cell](compact-cell.md)
