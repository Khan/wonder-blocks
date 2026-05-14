# Button

> Package: `@khanacademy/wonder-blocks-button`

The `Button` component is a reusable button that can be used in various
contexts. It can be used as a link or a button, and it supports various
props to customize its behavior and appearance.
### Usage
```tsx
import Button from "@khanacademy/wonder-blocks-button";
<Button
    onClick={(e) => console.log("Hello, world!")}
>
    Hello, world!
</Button>
```

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
| `actionType` | `"progressive" \| "destructive" \| "neutral"` |  | The action type/category of the button. |
| `size` | `"small" \| "medium" \| "large"` |  | The size of the button. "medium" = height: 40; "small" = height: 32; |
| `spinner` | `boolean` |  | If true, replaces the contents with a spinner. |
| `labelStyle` | `StyleType` |  | Optional custom styles for the inner label. |
| `style` | `StyleType` |  | Optional custom styles. |
| `styles` | `{ startIcon?: StyleType; endIcon?: StyleType }` |  | Optional custom styles for specific sub-elements within the Button. |

---

## Default

```tsx
<Button kind="primary" actionType="progressive" size="medium" disabled={false}>
  {"Hello, world!"}
</Button>
```

---

## Kinds

There are three kinds of buttons: `primary` (default), `secondary`, and
`tertiary`.

```tsx
<View style={{padding: spacing.medium_16, gap: spacing.medium_16}}>
    <View style={styles.rowWithGap}>
        <Button onClick={() => {}}>Hello, world!</Button>
        <Button onClick={() => {}} kind="secondary">
            Hello, world!
        </Button>
        <Button onClick={() => {}} kind="tertiary">
            Hello, world!
        </Button>
    </View>
    <View style={styles.rowWithGap}>
        <Button onClick={() => {}} disabled={true}>
            Hello, world!
        </Button>
        <Button onClick={() => {}} disabled={true} kind="secondary">
            Hello, world!
        </Button>
        <Button onClick={() => {}} disabled={true} kind="tertiary">
            Hello, world!
        </Button>
    </View>
    <View style={styles.rowWithGap}>
        <Button onClick={() => {}} actionType="destructive">
            Hello, world!
        </Button>
        <Button
            onClick={() => {}}
            kind="secondary"
            actionType="destructive"
        >
            Hello, world!
        </Button>
        <Button
            onClick={() => {}}
            kind="tertiary"
            actionType="destructive"
        >
            Hello, world!
        </Button>
    </View>
    <View style={styles.rowWithGap}>
        <Button onClick={() => {}} actionType="neutral">
            Hello, world!
        </Button>
        <Button
            onClick={() => {}}
            kind="secondary"
            actionType="neutral"
        >
            Hello, world!
        </Button>
        <Button onClick={() => {}} kind="tertiary" actionType="neutral">
            Hello, world!
        </Button>
    </View>
</View>
```

---

## ActionType

Buttons have an `actionType` prop that is either `progressive` (the default,
as shown above), `destructive` or `neutral` (as can seen below):

```tsx
<View style={{gap: spacing.medium_16}}>
    <View style={styles.row}>
        <Button
            style={styles.button}
            onClick={() => {}}
            actionType="destructive"
        >
            Primary
        </Button>
        <Button
            style={styles.button}
            onClick={() => {}}
            kind="secondary"
            actionType="destructive"
        >
            Secondary
        </Button>
        <Button
            style={styles.button}
            onClick={() => {}}
            kind="tertiary"
            actionType="destructive"
        >
            Tertiary
        </Button>
    </View>
    <View style={styles.row}>
        <Button
            style={styles.button}
            onClick={() => {}}
            actionType="neutral"
        >
            Primary
        </Button>
        <Button
            style={styles.button}
            onClick={() => {}}
            kind="secondary"
            actionType="neutral"
        >
            Secondary
        </Button>
        <Button
            style={styles.button}
            onClick={() => {}}
            kind="tertiary"
            actionType="neutral"
        >
            Tertiary
        </Button>
    </View>
</View>
```

---

## Icon

Buttons can have a start icon or an end icon. The `startIcon` prop
results in the icon appearing before the label (left for LTR, right for RTL)
and the `endIcon` prop results in the icon appearing after the label (right
for LTR, left for RTL).
__NOTE:__ Icons are available from the [Phosphor
Icons](https://phosphoricons.com/) library.
To use a Phosphor icon, you can use the following syntax:
```tsx
import pencilSimple from "@phosphor-icons/core/regular/pencil-simple.svg";
export const ButtonExample = () => (
    <Button startIcon={pencilSimple}>
        Example button
    </Button>
);
```
For custom icons, you can use the Wonder Blocks Icon component:
```tsx
import {Icon} from "@khanacademy/wonder-blocks-icon";
export const ButtonExample = () => (
    <Button startIcon={<Icon><img src="example.svg" alt="Example icon" /></Icon>}>
        Example button
    </Button>
);
```
Note: The Button component will handle the sizing for the icons

```tsx
<IconExample />
```

---

## Icons With Accessible Names

If the `startIcon` or `endIcon` provide meaning, you can provide an accessible
name for the icons so that it is included in the accessible name of the button.
For example, when using a `PhosphorIcon`, you can use the `aria-label` prop
to provide an accessible name. When using a `Icon` component, you can provide
the accessible name to the `children` element (ie the `alt` attribute on the
`img` element).

```tsx
<View style={styles.row}>
    <Button
        style={styles.button}
        startIcon={
            <PhosphorIcon
                icon={IconMappings.cookie}
                aria-label="Cookie"
            />
        }
        endIcon={
            <PhosphorIcon
                icon={IconMappings.iceCream}
                aria-label="Ice Cream"
            />
        }
    >
        With PhosphorIcon aria-label
    </Button>
    <Button
        style={styles.button}
        startIcon={
            <Icon>
                <img
                    src={"logo.svg"}
                    alt="Wonder Blocks start icon"
                />
            </Icon>
        }
        endIcon={
            <Icon>
                <img
                    src={"logo.svg"}
                    alt="Wonder Blocks end icon"
                />
            </Icon>
        }
    >
        With Icon and img alt
    </Button>
</View>
```

---

## Size

Buttons have a size that's either `medium` (default), `small`, or `large`.

```tsx
<View>
    <View style={styles.row}>
        <BodyText style={styles.fillSpace}>small</BodyText>
        <View style={[styles.row, styles.example]}>
            <Button style={styles.button} onClick={() => {}} size="small">
                Label
            </Button>
            <Button
                style={styles.button}
                onClick={() => {}}
                kind="secondary"
                size="small"
            >
                Label
            </Button>
            <Button
                style={styles.button}
                onClick={() => {}}
                kind="tertiary"
                size="small"
            >
                Label
            </Button>
        </View>
    </View>
    <View style={styles.row}>
        <BodyText style={styles.fillSpace}>medium (default)</BodyText>

        <View style={[styles.row, styles.example]}>
            <Button style={styles.button} onClick={() => {}} size="medium">
                Label
            </Button>
            <Button
                style={styles.button}
                onClick={() => {}}
                kind="secondary"
                size="medium"
            >
                Label
            </Button>
            <Button
                style={styles.button}
                onClick={() => {}}
                kind="tertiary"
                size="medium"
            >
                Label
            </Button>
        </View>
    </View>
    <View style={styles.row}>
        <BodyText style={styles.fillSpace}>large</BodyText>
        <View style={[styles.row, styles.example]}>
            <Button style={styles.button} onClick={() => {}} size="large">
                Label
            </Button>
            <Button
                style={styles.button}
                onClick={() => {}}
                kind="secondary"
                size="large"
            >
                Label
            </Button>
            <Button
                style={styles.button}
                onClick={() => {}}
                kind="tertiary"
                size="large"
            >
                Label
            </Button>
        </View>
    </View>
</View>
```

---

## Spinner

Buttons can show a spinner. This is useful when indicating to a user that their input has been recognized but that the operation will take some time. While the spinner property is set to true the button is disabled.

```tsx
<View style={{flexDirection: "row"}}>
    <Button
        onClick={() => {}}
        spinner={true}
        size="large"
        aria-label={"waiting"}
    >
        Hello, world
    </Button>
    <Strut size={16} />
    <Button onClick={() => {}} spinner={true} aria-label={"waiting"}>
        Hello, world
    </Button>
    <Strut size={16} />
    <Button
        onClick={() => {}}
        spinner={true}
        size="small"
        aria-label={"waiting"}
    >
        Hello, world
    </Button>
</View>
```

---

## Truncating labels

If the label is too long for the button width, the text will be truncated.

```tsx
<View style={{flexDirection: "row", flexWrap: "wrap"}}>
    <Button onClick={() => {}} style={styles.truncatedButton}>
        label too long for the parent container
    </Button>
    <Strut size={spacing.medium_16} />
    <Button
        onClick={() => {}}
        style={styles.truncatedButton}
        startIcon={plus}
    >
        label too long for the parent container
    </Button>
    <Strut size={spacing.medium_16} />
    <Button
        size="small"
        onClick={() => {}}
        style={styles.truncatedButton}
    >
        label too long for the parent container
    </Button>
    <Strut size={spacing.medium_16} />
    <Button
        size="small"
        onClick={() => {}}
        style={styles.truncatedButton}
        startIcon={plus}
    >
        label too long for the parent container
    </Button>
</View>
```

---

## Custom Styles

Buttons can be styled with custom styles. This story shows a button with a
custom width and height (using the `style` prop), and also a custom label
style that prevents the label from being truncated (`labelStyle`).
__NOTE:__ Please use this feature sparingly. This could be useful for simple
cases like the one shown below, but it could cause some issues if used in
more complex cases.

```tsx
<View style={{gap: spacing.medium_16}}>
    <View style={{flexDirection: "row", gap: spacing.medium_16}}>
        <Button kind="primary" />
        <Button kind="secondary" />
        <Button kind="tertiary" />
    </View>
</View>
```

---

## Custom Icon Size

The `styles` prop allows overriding styles for specific sub-elements
within the Button. In this example, the start icon is rendered at 24x24
instead of the default theme size.
**Note:** Use this prop sparingly and only when the default theme styling
does not meet your needs (e.g. a custom trigger button that requires a
non-standard icon size).

```tsx
<Button startIcon={plus} kind="secondary" styles={{
            startIcon: {width: sizing.size_240, height: sizing.size_240},
        }}>
  {"Custom icon size"}
</Button>
```

---

## Submitting forms

If the button is inside a form, you can use the `type="submit"` variant, so the form will be submitted on click.

```tsx
<form
    onSubmit={(e) => {
        e.preventDefault();
        window.alert("form submitted"); // eslint-disable-line no-alert
    }}
>
    <View>
        <LabeledField
            label="Foo"
            field={
                <TextField id="foo" value="bar" onChange={() => {}} />
            }
        />
        <Button type="submit">Submit</Button>
    </View>
</form>
```

---

## Preventing navigation

Sometimes you may need to perform an async action either before or during navigation. This can be accomplished with `beforeNav` and `safeWithNav` respectively.

```tsx
<MemoryRouter>
    <CompatRouter>
        <View style={styles.row}>
            <Button
                href="/foo"
                style={styles.button}
                onClick={(e) => {
                    e.preventDefault();
                }}
            >
                This button prevents navigation.
            </Button>
            <Routes>
                <Route
                    path="/foo"
                    element={<View id="foo">Hello, world!</View>}
                />
            </Routes>
        </View>
    </CompatRouter>
</MemoryRouter>
```

---

## Navigation with React Router

Buttons do client-side navigation by default, if React Router exists:

```tsx
<MemoryRouter>
    <CompatRouter>
        <View style={styles.row}>
            <Button href="/foo" style={styles.button}>
                Uses Client-side Nav
            </Button>
            <Button href="/foo" style={styles.button} skipClientNav>
                Avoids Client-side Nav
            </Button>
            <Routes>
                <Route
                    path="/foo"
                    element={<View id="foo">Hello, world!</View>}
                />
            </Routes>
        </View>
    </CompatRouter>
</MemoryRouter>
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
    <Button
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
        Focus on the Button (left)
    </Button>
</View>
```

---

## Press Duration Tracking

This story demonstrates tracking press duration from `onMouseDown` to `onMouseUp`,
useful for measuring how long a user holds down on a button. The tracking also
handles cases where the mouse leaves the button area during the press.

```tsx
<View>
    <Button
        kind="primary"
        startIcon={clock}
        onMouseEnter={handleMouseEnter}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
    >
        Track Press Duration
    </Button>
    <Strut size={spacing.medium_16} />
    <View
        style={{
            padding: spacing.medium_16,
            backgroundColor:
                semanticColor.core.background.base.subtle,
            borderRadius: 4,
            maxWidth: 400,
        }}
    >
        <BodyText size="medium" weight="bold">
            Press Duration Tracker
        </BodyText>
        <Strut size={spacing.xSmall_8} />
        <BodyText size="medium">
            Last Event: <strong>{lastEvent}</strong>
        </BodyText>
        <BodyText size="medium">
            Press Duration:{" "}
            <strong>
                {pressDuration !== null
                    ? `${pressDuration}ms`
                    : "N/A"}
            </strong>
        </BodyText>
        <BodyText size="medium">
            Currently Pressing:{" "}
            <strong>{pressStartTime ? "Yes" : "No"}</strong>
        </BodyText>
        <Strut size={spacing.small_12} />
        <BodyText size="medium" weight="bold">
            Interaction History:
        </BodyText>
        {interactionHistory.length > 0 ? (
            <View style={{marginTop: spacing.xSmall_8}}>
                {interactionHistory.map((entry, index) => (
                    <BodyText
                        key={index}
                        size="small"
                        style={{fontFamily: "monospace"}}
                    >
                        {entry}
                    </BodyText>
                ))}
            </View>
        ) : (
            <BodyText size="small" style={{fontStyle: "italic"}}>
                No interactions yet
            </BodyText>
        )}
    </View>
</View>
```



---

## Related docs

- [Overview](overview.md)
- [Accessibility](accessibility.md)
- [Activity Button](activity-button.md)
- [Best Practices](best-practices.md)
- [Navigation Callbacks](navigation-callbacks.md)
