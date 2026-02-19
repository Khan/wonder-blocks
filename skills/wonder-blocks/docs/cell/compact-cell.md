# CompactCell

> Package: `@khanacademy/wonder-blocks-cell`

`CompactCell` is the simplest form of the Cell. It is a compacted-height Cell
with limited subviews and accessories. Typically they represent additional
info or selection lists. It has a minimum height of 48px and a non-bold
title. It does not have subtitles or a progress bar, and in general it has
less vertical space around text and accessories.
### Usage
```jsx
import {CompactCell} from "@khanacademy/wonder-blocks-cell";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import caretRightIcon from "@phosphor-icons/core/regular/caret-right.svg";
<CompactCell
 title="Compact cell"
 rightAccessory={<PhosphorIcon icon={caretRightIcon} size="medium" />}
/>
```

---

## Default Compact Cell

Default CompactCell example. It will be rendered as the first/default story and
it can be interacted with the controls panel in the Browser.

```tsx
<CompactCell title="Basic Cell" rightAccessory={<PhosphorIcon icon={IconMappings.caretRight} />} />
```

---

## Compact Cell Left

You can create a minimal cell that only uses a title and an PhosphorIcon that
can be placed on the left or right (or both). In this case, we will place the
icon on the left to show you how cell is flexible. Note that you can pass any
of the existing WB components such as `PhosphorIcon`, `IconButton`,
`Tooltip`, etc.

```tsx
<CompactCell
    title="Intro to rational & irrational numbers"
    leftAccessory={
        <PhosphorIcon icon={IconMappings.article} size="medium" />
    }
/>
```

---

## Compact Cell Right

You can also create a cell with an accessory placed on the right. Note that
you can pass any of the existing WB components such as `PhosphorIcon`.

```tsx
<CompactCell
    title="Intro to rational & irrational numbers"
    rightAccessory={
        <PhosphorIcon icon={IconMappings.caretRight} size="medium" />
    }
/>
```

---

## Compact Cell With Different Heights

Cells should keep a consistent height no matter the content passed in the
title prop. It should also respect a `minHeight` of 48px.

```tsx
<>
    <CompactCell
        title="Single line with short accessory."
        rightAccessory={AccessoryMappings.withCaret}
    />
    <Strut size={spacing.xSmall_8} />
    <CompactCell
        title="Single line with tall accessory."
        rightAccessory={AccessoryMappings.withIconText}
    />
    <Strut size={spacing.xSmall_8} />
    <CompactCell
        title="Multi line title with tall accessory. Content should fit within the container and the cell height should be consistent no matter the content length."
        rightAccessory={AccessoryMappings.withIconText}
    />
</>
```

---

## CompactCell with both accessories

You can also create a more complex cell with accessories placed on both
sides. Note that you can extend the PhosphorIcon component with custom paths
such as the following example.

```tsx
<CompactCell
    title="Intro to rational & irrational numbers"
    leftAccessory={
        <PhosphorIcon icon={IconMappings.article} size="medium" />
    }
    rightAccessory={
        <PhosphorIcon icon={IconMappings.calendar} size="medium" />
    }
/>
```

---

## CompactCell accessories with custom styles

Accessories can also be customized to adapt to different sizes and
alignments. In this example, we can see how a cell can be customized for both
accessories.

```tsx
<CompactCell
    title="CompactCell with custom accessory styles"
    leftAccessory={
        <PhosphorIcon icon={IconMappings.article} size="medium" />
    }
    rightAccessory={
        <PhosphorIcon icon={IconMappings.caretRightBold} size="small" />
    }
    styles={{
        leftAccessory: {
            minWidth: spacing.xxLarge_48,
            alignSelf: "flex-start",
            alignItems: "flex-start",
        },
        rightAccessory: {
            minWidth: spacing.large_24,
            alignSelf: "flex-end",
            alignItems: "flex-end",
        },
    }}
/>
```

---

## Defining horizontal rule variants

Cell components can use the `horizontalRule` prop to use a set of predefined
variants that we can use to match our needs.

```tsx
<>
    <CompactCell
        title="This is a basic cell with an 'inset' horizontal rule"
        leftAccessory={
            <PhosphorIcon icon={IconMappings.article} size="medium" />
        }
        horizontalRule="inset"
    />
    <CompactCell
        title="This is a basic cell with a 'full-width' horizontal rule"
        leftAccessory={
            <PhosphorIcon icon={IconMappings.article} size="medium" />
        }
        horizontalRule="full-width"
    />
    <CompactCell
        title="This is a basic cell without a horizontal rule"
        leftAccessory={
            <PhosphorIcon icon={IconMappings.article} size="medium" />
        }
        horizontalRule="none"
    />
</>
```

---

## Compact Cell With Custom Styles

`CompactCell` can be used with custom styles. The following parts can be
styled:
- `root`: Styles the root element
- `content`: Styles the content area (between the accessories)
- `leftAccessory`: Styles the left accessory element
- `rightAccessory`: Styles the right accessory element

```tsx
<CompactCell
    title="CompactCell with a dark background"
    leftAccessory={
        <PhosphorIcon icon={IconMappings.article} size="medium" />
    }
    rightAccessory={
        <PhosphorIcon
            icon={IconMappings.calendar}
            color={semanticColor.core.foreground.knockout.default}
        />
    }
    styles={{
        root: {
            background: semanticColor.core.background.neutral.strong,
            color: semanticColor.core.foreground.knockout.default,
        },
    }}
    onClick={() => {}}
/>
```

---

## Clickable Compact Cell

```tsx
<CompactCell
    title="Intro to rational & irrational numbers"
    rightAccessory={<PhosphorIcon icon={IconMappings.caretRight} />}
    onClick={() => {}}
    aria-label="Press to navigate to the article"
/>
```

---

## Compact Cell Active

The cell also supports different states within itself. The different styles
are defined internally (e.g hover, focused, pressed, active, disabled) and we
allow passing some props to use the `active` or `disabled` state.

```tsx
<CompactCell
    title="Title for article item"
    leftAccessory={
        <PhosphorIcon
            icon={IconMappings.playCircle}
            size="medium"
            color="black"
        />
    }
    rightAccessory={
        <PhosphorIcon icon={IconMappings.calendarBold} size="small" />
    }
    active={true}
    onClick={() => {}}
/>
```

---

## Compact Cell Disabled

In the following example we can see how the `disabled` state works. Note that
we apply an opacity to all the elements to make it more apparent that the
cell is disabled. This includes text, SVG icons, images, etc.

```tsx
<CompactCell
    title="Title for article item"
    leftAccessory={AccessoryMappings.withImage}
    rightAccessory={
        <PhosphorIcon icon={IconMappings.calendarBold} size="small" />
    }
    disabled={true}
    onClick={() => {}}
/>
```

---

## Compact Cells As List Items

These are `CompactCell` instances with custom background colors. Note that we
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
        <CompactCell
            title="Active Cell"
            leftAccessory={
                <PhosphorIcon
                    icon={IconMappings.article}
                    size="medium"
                />
            }
            active={true}
            href="https://khanacademy.org"
            horizontalRule="full-width"
        />
    </View>
    <View role="listitem">
        <CompactCell
            title="Cell with default bg color"
            leftAccessory={
                <PhosphorIcon
                    icon={IconMappings.article}
                    size="medium"
                />
            }
            href="https://khanacademy.org"
            horizontalRule="full-width"
        />
    </View>
    <View role="listitem">
        <CompactCell
            title="Cell with a faded background color"
            leftAccessory={
                <PhosphorIcon
                    icon={IconMappings.article}
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
        <CompactCell
            title="Cell with a solid background color"
            leftAccessory={
                <PhosphorIcon
                    icon={IconMappings.article}
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

## Related docs

- [Detail Cell](detail-cell.md)
