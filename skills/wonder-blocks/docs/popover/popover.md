# Popover

---

## Default

---

## No Tail

No tail

---

## Trigger Element

This example shows a popover adorning the same element that triggers it. This
is accomplished by passing a function as children and using the `open`
property passed it as the `onClick` handler on a button in this example.
**NOTES:**
- You will always need to add a trigger element inside the Popover to control
  when and/or from where to open the popover dialog.
- For this example, if you use the `image` prop, make sure to avoid using
  `icon` at the same time. Doing so will throw an error.

```tsx
<Popover
    dismissEnabled={true}
    content={
        <PopoverContent
            closeButtonVisible
            title="Title"
            content="The popover content."
            image={
                <img
                    src="illustration.svg"
                    alt="An illustration of a person skating on a pencil"
                    width={288}
                    height={200}
                />
            }
        />
    }
>
    {({open}) => <Button onClick={open}>Trigger element</Button>}
</Popover>
```

---

## Dismiss Enabled

Povoper can be closed via light dismiss. This means that the popover will be
closed under the following conditions:
- Keyboard: The user presses `Esc`.
- Click outside: The user clicks outside of the popover.
- Focus out: The user tabs before the trigger element or after the last
  focusable element inside the popover.
The `dismissEnabled` prop can be used to enable or disable light dismiss
(default is `false`).

---

## Controlled

Sometimes you'll want to trigger a popover programmatically. This can be done
by setting the `opened` prop to `true`. In this situation the `Popover` is a
controlled component. The parent is responsible for managing the
opening/closing of the popover when using this prop. This means that you'll
also have to update `opened` to `false` in response to the `onClose` callback
being triggered.
Here you can see as well how the focus is managed when a popover is opened.
To see more details, please check the **Accesibility section**.

```tsx
<View style={[styles.row, {gap: sizing.size_320}]}>
    <Popover
        opened={opened}
        onClose={() => {
            setOpened(false);
        }}
        content={({close}) => (
            <PopoverContent
                title="Controlled popover"
                content="This popover is controlled programatically. This means that is only displayed using the `opened` prop."
                actions={
                    <Button
                        onClick={() => {
                            close();
                        }}
                    >
                        Click to close the popover
                    </Button>
                }
            />
        )}
    >
        <Button
            onClick={() =>
                // eslint-disable-next-line no-console
                console.log("This is a controlled popover.")
            }
        >
            Anchor element (it does not open the popover)
        </Button>
    </Popover>

    <Button onClick={() => setOpened(true)}>
        Outside button (click here to re-open the popover)
    </Button>
</View>
```

---

## With Actions

Sometimes you need to add actions to be able to control the popover state.
For this reason, you can make use of the `actions` prop:

```tsx
<Popover
    content={({close}) => (
        <PopoverContent
            title="Popover with actions"
            content="This example shows a popover which contains a set of actions that can be used to control the popover itself."
            actions={
                <View
                    style={[
                        styles.row,
                        styles.actions,
                        {gap: sizing.size_160},
                    ]}
                >
                    <LabelLarge>
                        Step {step} of {totalSteps}
                    </LabelLarge>
                    <Button
                        kind="tertiary"
                        onClick={() => {
                            if (step < totalSteps) {
                                setStep(step + 1);
                            } else {
                                close();
                            }
                        }}
                    >
                        {step < totalSteps
                            ? "Skip this step"
                            : "Finish"}
                    </Button>
                </View>
            }
        />
    )}
    placement="top"
>
    <Button>Open popover with actions</Button>
</Popover>
```

---

## With initialFocusId

Sometimes, you may want a specific element inside the Popover to receive
focus first. This can be done using the `initialFocusId` prop on the
`Popover` component. Just pass in the ID of the element that should receive
focus, and it will automatically receieve focus once the popover is
displayed.
In this example, the first button would have received the focus by default,
but the second button receives focus instead since its ID is passed into the
`initialFocusId` prop.

---

## With closedFocusId

You can use the `closedFocusId` prop on the `Popover` component to specify
where to set the focus after the popover dialog has been closed. This is
useful for cases when you need to return the focus to a specific element.
In this example, `closedFocusId` is set to the ID of the button labeled
"Focus here after close.", and it means that the focus will be set on that
button after the popover dialog has been closed/dismissed.

```tsx
<View style={{gap: 20}}>
    <Button id="button-to-focus-on">Focus here after close</Button>
    <Popover
        dismissEnabled={true}
        closedFocusId="button-to-focus-on"
        content={
            <PopoverContent
                closeButtonVisible={true}
                title="Returning focus to a specific element"
                content='After dismissing the popover, the focus will be set on the button labeled "Focus here after close."'
            />
        }
    >
        <Button>Open popover</Button>
    </Popover>
</View>
```

---

## Custom Popover Content

Popovers can have custom layouts. This is done by using the
`PopoverContentCore` component.
_NOTE:_ If you choose to use this component, you'll have to set the
`aria-labelledby` and `aria-describedby` attributes manually. Make sure to
pass the `id` prop to the `Popover` component and use it as the value for
these attributes. Also, make sure to assign the `${id}-title` prop to the
`title` element and `${id}-content` prop to the `content` element.

---

## Keyboard Navigation

This example shows how the focus is managed when a popover is opened. If the
popover is closed, the focus flows naturally. However, if the popover is
opened, the focus is managed internally by the `Popover` component.
The focus is managed in the following way:
- When the popover is opened, the focus is set on the first focusable element
 inside the popover.
- When the popover is closed, the focus is returned to the element that
triggered the popover.
- If the popover is opened and the focus reaches the last focusable element
inside the popover, the next tab will set focus on the next focusable
element that exists after the PopoverAnchor (or trigger element).
- If the focus is set to the first focusable element inside the popover, the
next shift + tab will set focus on the PopoverAnchor element.
- If you have custom keyboard navigation (like with left and right arrow keys)
popover won't override them
**NOTE:** You can add/remove buttons after the trigger element by using the
buttons at the top of the example.

```tsx
<View>
    <View style={[styles.row, {gap: sizing.size_160}]}>
        <Button
            kind="secondary"
            onClick={() => {
                setNumButtonsAfter(numButtonsAfter + 1);
            }}
        >
            Add button after trigger element
        </Button>
        <Button
            kind="secondary"
            actionType="destructive"
            onClick={() => {
                if (numButtonsAfter > 0) {
                    setNumButtonsAfter(numButtonsAfter - 1);
                }
            }}
        >
            Remove button after trigger element
        </Button>
        <Button
            kind="secondary"
            onClick={() => {
                setNumButtonsInside(numButtonsInside + 1);
            }}
        >
            Add button inside popover
        </Button>
        <Button
            kind="secondary"
            actionType="destructive"
            onClick={() => {
                if (numButtonsAfter > 0) {
                    setNumButtonsInside(numButtonsInside - 1);
                }
            }}
        >
            Remove button inside popover
        </Button>
    </View>
    <View style={styles.playground}>
        <Button>First button</Button>
        <Popover
            content={({close}) => (
                <PopoverContent
                    closeButtonVisible
                    title="Keyboard navigation"
                    content="This example shows how the focus is managed when a popover is opened."
                    actions={
                        <View style={[styles.row, styles.actions]}>
                            {Array.from(
                                {length: numButtonsInside},
                                (_, index) => (
                                    <Button
                                        onClick={() => {}}
                                        key={index}
                                        kind="tertiary"
                                    >
                                        {`Button ${index + 1}`}
                                    </Button>
                                ),
                            )}
                        </View>
                    }
                />
            )}
            placement="top"
        >
            <Button>Open popover (trigger element)</Button>
        </Popover>
        {Array.from({length: numButtonsAfter}, (_, index) => (
            <Button onClick={() => {}} key={index}>
                {`Button ${index + 1}`}
            </Button>
        ))}
    </View>
</View>
```

---

## Custom Keyboard Navigation

Similar example to KeyboardNavigation except this one highlights
how popover does not override custom keyboard interactions for
content inside the popover.
NOTE: To see the arrow key navigation, add additional buttons to
the popover container.

```tsx
<View style={[{padding: "120px 0"}]}>
    <View style={[styles.row, {gap: sizing.size_160}]}>
        <Button
            kind="secondary"
            onClick={() => {
                setNumButtonsAfter(numButtonsAfter + 1);
            }}
        >
            Add button after trigger element
        </Button>
        <Button
            kind="secondary"
            actionType="destructive"
            onClick={() => {
                if (numButtonsAfter > 0) {
                    setNumButtonsAfter(numButtonsAfter - 1);
                }
            }}
        >
            Remove button after trigger element
        </Button>
        <Button
            kind="secondary"
            onClick={() => {
                setNumButtonsInside(numButtonsInside + 1);
            }}
        >
            Add button inside popover
        </Button>
        <Button
            kind="secondary"
            actionType="destructive"
            onClick={() => {
                if (numButtonsAfter > 0) {
                    setNumButtonsInside(numButtonsInside - 1);
                }
            }}
        >
            Remove button inside popover
        </Button>
    </View>
    <View style={styles.playground}>
        <Button>First button</Button>
        <Popover
            portal={false}
            content={({close}) => (
                <PopoverContent
                    closeButtonVisible
                    title="Keyboard navigation"
                    content="This example shows how the focus is managed when a popover is opened."
                    actions={
                        <View
                            style={[styles.row, styles.actions]}
                            onKeyDown={onArrowKeyFocus}
                        >
                            {Array.from(
                                {length: numButtonsInside},
                                (_, index) => (
                                    <ArrowButton
                                        onClick={() => {}}
                                        index={index}
                                        focus={index === focus}
                                    />
                                ),
                            )}
                        </View>
                    }
                />
            )}
            placement="top"
        >
            <Button>Open popover (trigger element)</Button>
        </Popover>
        {Array.from({length: numButtonsAfter}, (_, index) => (
            <Button onClick={() => {}} key={index}>
                {`Button ${index + 1}`}
            </Button>
        ))}
    </View>
</View>
```

---

## Popover Alignment

```tsx
<View style={styles.container}>
    <BasePopoverExample placement="right" />
    <BasePopoverExample placement="bottom" />
    <BasePopoverExample placement="top" />
    <BasePopoverExample placement="left" />
</View>
```

---

## With Document Root Boundary

Sometimes you need to change the underlining behavior to position the Popover
by the whole webpage (document) instead of by the viewport. This is a useful
tool for popovers with large content that might not fit in small screen sizes
or at 400% zoom. For this reason, you can make use of the \`rootBoundary\`
prop:

```tsx
<View style={{paddingBottom: "500px"}}>
    <Popover
        rootBoundary="document"
        content={() => (
            <PopoverContent
                title="Popover with rootBoundary='document'"
                content="This example shows a popover with the rootBoundary='document'. This means that instead of aligning the popover to the viewport, it will instead place the popover where there is room in the DOM. This is a useful tool for popovers with large content that might not fit in small screen sizes or at 400% zoom."
            />
        )}
        placement="top"
    >
        <Button>Open popover with document rootBoundary</Button>
    </Popover>
</View>
```

---

## With Custom Aria Label

With custom aria-label - overrides the default aria-labelledby

---

## With Custom Aria Described By

With custom aria-describedby - overrides the default aria-describedby

```tsx
<View style={styles.example}>
    <Popover
        aria-describedby="custom-popover-description"
        placement="bottom"
        opened={opened}
        onClose={() => setOpened(false)}
        content={
            <>
                <HeadingMedium
                    id="custom-popover-description"
                    style={styles.srOnly}
                >
                    Hidden text that would describe the popover
                    content
                </HeadingMedium>
                <PopoverContent
                    title="Title"
                    content="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo."
                    closeButtonVisible
                />
            </>
        }
    >
        <Button
            onClick={() => {
                setOpened(true);
            }}
        >
            {`Open popover`}
        </Button>
    </Popover>
</View>
```

---

## In Corners

If the Popover is placed near the edge of the viewport, default spacing of
12px is applied to provide spacing between the Popover and the viewport. This
spacing value can be overridden using the `viewportPadding` prop.
Note: The `viewportPadding` prop is only applied when `rootBoundary` is
`viewport`.

```tsx
<View
    style={{
        height: "80vh",
        width: "100vw",
        justifyContent: "space-between",
    }}
>
    <View
        style={{
            flexDirection: "row",
            justifyContent: "space-between",
        }}
    >
        <PopoverInCorner />
        <PopoverInCorner />
    </View>
    <View
        style={{
            flexDirection: "row",
            justifyContent: "space-between",
        }}
    >
        <PopoverInCorner />
        <PopoverInCorner />
    </View>
</View>
```



---

## Related docs

- [Popover Accessibility](popover-accessibility.md)
- [Popover Content](popover-content.md)
- [Popover Content Core](popover-content-core.md)
