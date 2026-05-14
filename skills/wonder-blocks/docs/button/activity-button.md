# ActivityButton

> Package: `@khanacademy/wonder-blocks-button`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string` | *required* | Text to appear on the button. |
| `startIcon` | `PhosphorIconAsset \| React.ReactElement` |  | A Phosphor icon asset (imported as a static SVG file) that |
| `endIcon` | `PhosphorIconAsset \| React.ReactElement` |  | A Phosphor icon asset (imported as a static SVG file) that |
| `kind` | `"primary" \| "secondary" \| "tertiary"` |  | The kind of the button, either primary, secondary, or tertiary. |
| `disabled` | `boolean` |  | Whether the button is disabled. |
| `id` | `string` |  | An optional id attribute. |
| `testId` | `string` |  | Test ID used for e2e testing. |
| `rel` | `string` |  | Specifies the type of relationship between the current document and the |
| `target` | `"_blank"` |  | A target destination window for a link to open in. Should only be used |
| `tabIndex` | `number` |  | Set the tabindex attribute on the rendered element. |
| `skipClientNav` | `boolean` |  | Whether to avoid using client-side navigation. |
| `href` | `string` |  | URL to navigate to. |
| `type` | `"submit"` |  | Used for buttons within forms. |
| `className` | `string` |  | Adds CSS classes to the Button. |
| `onClick` | `(e: React.SyntheticEvent) => unknown` |  | Function to call when button is clicked. |
| `onMouseDown` | `(e: React.MouseEvent) => unknown` |  | Respond to a raw "mousedown" event. |
| `onMouseUp` | `(e: React.MouseEvent) => unknown` |  | Respond to a raw "mouseup" event. |
| `onMouseEnter` | `(e: React.MouseEvent) => unknown` |  | Respond to a raw "mouseenter" event. |
| `onMouseLeave` | `(e: React.MouseEvent) => unknown` |  | Respond to a raw "mouseleave" event. |
| `beforeNav` | `() => Promise<unknown>` |  | Run async code before navigating. If the promise returned rejects then |
| `safeWithNav` | `() => Promise<unknown>` |  | Run async code in the background while client-side navigating. If the |
| `actionType` | `"progressive" \| "neutral"` |  | The action type of the button. This determines the visual style of the |
| `styles` | `{ root?: StyleType; box?: StyleType; startIcon?: StyleType; endIcon?: StyleType; label?: StyleType }` |  | Custom styles for the elements in the ActivityButton component. |

---

## Default

Minimal activity button which only includes a label and an `onClick`
handler. The `kind` prop is set to `primary` by default.

```tsx
<ActivityButton disabled={false} kind="primary" />
```

---

## With Start Icon

This example includes a start icon, which is specified using the
`startIcon` prop. The `endIcon` prop can also be used to specify an icon
that appears at the end of the button.

```tsx
<ActivityButton startIcon={magnifyingGlass} disabled={false} kind="primary">
  {"Search"}
</ActivityButton>
```

---

## With Custom Icons

For non-Phosphor icons, you can use the Wonder Blocks Icon component for the
`startIcon` and `endIcon` props.
```tsx
import {Icon} from "@khanacademy/wonder-blocks-icon";
<ActivityButton
    startIcon={<Icon><img alt="" src="logo.svg" /></Icon>}
    endIcon={<Icon><img alt="" src="logo.svg" /></Icon>}
>
  Action
</ActivityButton>
```
Note: The ActivityButton component will handle the sizing for the icons.

```tsx
<ActivityButton startIcon={<Icon>
                <img alt="" src="logo.svg" />
            </Icon>} endIcon={<Icon>
                <img alt="" src="logo.svg" />
            </Icon>} kind="secondary">
  {"Action"}
</ActivityButton>
```

---

## Kinds

In this example, we have `primary (default)`, `secondary`, `tertiary` and
`disabled` `ActivityButton`'s from left to right.

```tsx
<View style={{gap: sizing.size_160, flexDirection: "row"}}>
    <ActivityButton />
    <ActivityButton kind="secondary" />
    <ActivityButton kind="tertiary" />
    <ActivityButton disabled={true} />
</View>
```

---

## ActionType

ActivityButton has an `actionType` prop that is either `progressive` (the
default) or `neutral`:

```tsx
<View style={{gap: sizing.size_160}}>
    {actionTypes.map((actionType, index) => (
        <View
            key={index}
            style={{gap: sizing.size_160, flexDirection: "row"}}
        >
            {kinds.map((kind, index) => (
                <ActivityButton
                    onClick={() => {}}
                    actionType={actionType}
                    kind={kind}
                    key={`${kind}-${actionType}-${index}`}
                />
            ))}
            <ActivityButton
                disabled={true}
                onClick={(e) =>}
                actionType={actionType}
                key={`disabled-${actionType}-${index}`}
            />
        </View>
    ))}
</View>
```

---

## With Custom Styles

Sometimes you may want to apply custom styles to the button. In this
example, we apply this by passing a `style` prop to the button.
Note that we recommend using the default styles, but if you need to
customize the button, we encourage to use it for layout purposes only.
The following parts can be styled:
- `root`: Styles the root element (button)
- `box`: Styles the "chonky" box element
- `startIcon`: Styles the start icon element
- `endIcon`: Styles the end icon element
- `label`: Styles the text in the button

```tsx
<ActivityButton startIcon={magnifyingGlass} endIcon={caretRight} styles={{
            root: {
                gap: sizing.size_200,
            },
            box: {
                gap: sizing.size_320,
            },
            startIcon: {
                alignSelf: "flex-start",
            },
            endIcon: {
                alignSelf: "flex-end",
            },
            label: {
                border: `${border.width.thin} solid ${semanticColor.core.border.instructive.subtle}`,
                padding: sizing.size_120,
            },
        }}>
  {"Search"}
</ActivityButton>
```

---

## Receiving Focus Programmatically

This button can receive focus programmatically. This is useful for cases where
you want to focus the button when the user interacts with another
component, such as a form field or another button.
To do this, we use a `ref` to the button and call the `focus()` method
on it, so the `ActivityButton` receives focus.

```tsx
<View style={{gap: sizing.size_160, flexDirection: "row"}}>
    <ActivityButton
        startIcon={magnifyingGlass}
        endIcon={caretRight}
        ref={buttonRef}
        onClick={(e) =>}
    />
    <Button
        onClick={() => {
            // Focus the button when the button is clicked.
            if (buttonRef.current) {
                buttonRef.current.focus();
            }
        }}
        kind="secondary"
    >
        Focus on the Activity Button (left)
    </Button>
</View>
```

---

## Press Duration Tracking

This story demonstrates how to use the mouse event handlers (`onMouseDown`,
`onMouseUp`, and `onMouseLeave`) to track the duration of button presses.
This is useful for analytics, accessibility features, or UI feedback that
depends on how long a user interacts with a button.
**Use cases:**
- Measuring engagement time before click completion
- Detecting accidental clicks vs intentional presses
- Providing haptic feedback based on press duration
- Analytics tracking for user interaction patterns
**Try it:** Press and hold the button for different lengths of time, or
press and drag away from the button to see how the events are tracked.

```tsx
<View style={{gap: sizing.size_240}}>
    <View
        style={{
            gap: sizing.size_160,
            flexDirection: "row",
            alignItems: "center",
        }}
    >
        <ActivityButton
            startIcon={clock}
            onMouseEnter={handleMouseEnter}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {isCurrentlyPressed
                ? "Pressed!"
                : "Track Press Duration"}
        </ActivityButton>

        <Button
            kind="secondary"
            size="small"
            onClick={resetTracking}
        >
            Reset
        </Button>
    </View>

    <View
        style={{
            gap: sizing.size_120,
            padding: sizing.size_160,
            backgroundColor:
                semanticColor.core.background.neutral.subtle,
            borderRadius: sizing.size_080,
            minHeight: "120px",
        }}
    >
        <BodyText size="medium" weight="semi">
            Press Tracking Information
        </BodyText>

        <View style={{gap: sizing.size_060}}>
            <BodyText>
                <strong>Current State:</strong>{" "}
                {isCurrentlyPressed
                    ? `Pressed (${pressStartTime ? Math.round((Date.now() - pressStartTime) / 10) * 10 : 0}ms+)`
                    : "Released"}
            </BodyText>

            {pressDuration !== null && (
                <BodyText>
                    <strong>Last Press Duration:</strong>{" "}
                    {pressDuration}ms
                </BodyText>
            )}

            <BodyText>
                <strong>Last Event:</strong> {lastEvent}
            </BodyText>
        </View>

        {interactionHistory.length > 0 && (
            <View style={{gap: sizing.size_040}}>
                <BodyText weight="semi">Recent Events:</BodyText>
                {interactionHistory.map((event, index) => (
                    <BodyText
                        key={index}
                        size="small"
                        style={{
                            opacity: 1 - index * 0.15,
                            fontFamily: "monospace",
                        }}
                    >
                        {event}
                    </BodyText>
                ))}
            </View>
        )}
    </View>
</View>
```



---

## Related docs

- [Overview](overview.md)
- [Accessibility](accessibility.md)
- [Best Practices](best-practices.md)
- [Button](button.md)
- [Navigation Callbacks](navigation-callbacks.md)
