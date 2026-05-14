# Clickable

> Package: `@khanacademy/wonder-blocks-clickable`

A component to turn any custom component into a clickable one.
Works by wrapping `ClickableBehavior` around the child element and styling
the child appropriately and encapsulates routing logic which can be
customized. Expects a function which returns an element as its child.
Clickable allows your components to:
- Handle mouse / touch / keyboard events
- Match the standard behavior of the given role
- Apply custom styles based on pressed / focused / hovered state
- Perform Client Side Navigation when href is passed and the component is a
  descendent of a react-router Router.
### Usage
```jsx
<Clickable onClick={() => alert("You clicked me!")}>
    {({hovered, focused, pressed}) =>
        <div
            style={[
                hovered && styles.hovered,
                focused && styles.focused,
                pressed && styles.pressed,
            ]}
        >
            Click Me!
        </div>
    }
</Clickable>
```

---

## Default

```tsx
<Clickable>
    {({hovered, pressed, focused}) => (
        <View
            testId=""
            disabled={false}
            hideDefaultFocusRing={false}
            style={[
                styles.clickable,
                hovered && styles.hovered,
                pressed && styles.pressed,
                focused && styles.focused,
            ]}
        >
            <Body>This text is clickable!</Body>
        </View>
    )}
</Clickable>
```

---

## Basic

You can make custom components Clickable by returning them in a function of the Clickable child. The eventState parameter the function takes allows access to states pressed, hovered and clicked, which you may use to create custom styles.

Clickable has a default focus ring style built-in.  If you are creating your own custom focus ring it should be disabled using by setting `hideDefaultFocusRing={true}` in the props passed to `Clickable`.

```tsx
<View style={styles.centerText}>
    <Clickable
        testId=""
        disabled={false}
        hideDefaultFocusRing={false}
        href="https://www.khanacademy.org/about/tos"
        skipClientNav={true}
    >
        {({hovered, pressed}) => (
            <View
                style={[
                    hovered && styles.hovered,
                    pressed && styles.pressed,
                ]}
            >
                <Body>This text is clickable!</Body>
            </View>
        )}
    </Clickable>
</View>
```

---

## Disabled

Disabled state

```tsx
<>
    <Clickable onClick={() => {}}>
        {({hovered, pressed}) => (
            <View
                testId=""
                disabled={false}
                hideDefaultFocusRing={false}
                style={[
                    styles.clickable,
                    hovered && styles.hovered,
                    pressed && styles.pressed,
                ]}
            >
                <Body>
                    Disabled clickable using the default disabled style
                </Body>
            </View>
        )}
    </Clickable>
    <Clickable onClick={() => {}}>
        {({hovered, focused, pressed}) => (
            <View
                style={[
                    styles.clickable,
                    hovered && styles.hovered,
                    pressed && styles.pressed,
                    false && styles.disabled,
                ]}
            >
                <Body>
                    Disabled clickable passing custom disabled styles
                </Body>
            </View>
        )}
    </Clickable>
</>
```

---

## Client Side Navigation

```tsx
<MemoryRouter>
    <CompatRouter>
        <View>
            <View style={styles.row}>
                <Clickable
                    testId=""
                    disabled={false}
                    hideDefaultFocusRing={false}
                    href="/foo"
                    style={styles.heading}
                    onClick={() => {
                        // eslint-disable-next-line no-console
                        console.log("I'm still on the same page!");
                    }}
                >
                    {(eventState) => (
                        <LabelLarge>Uses Client-side Nav</LabelLarge>
                    )}
                </Clickable>
                <Clickable
                    href="/iframe.html?id=clickable-clickable--default&viewMode=story"
                    style={styles.heading}
                    skipClientNav
                >
                    {(eventState) => (
                        <LabelLarge>Avoids Client-side Nav</LabelLarge>
                    )}
                </Clickable>
            </View>
            <View style={styles.navigation}>
                <Routes>
                    <Route
                        path="/foo"
                        element={
                            <View id="foo">
                                The first clickable element does client-side
                                navigation here.
                            </View>
                        }
                    />
                    <Route
                        path="*"
                        element={<View>See navigation changes here</View>}
                    />
                </Routes>
            </View>
        </View>
    </CompatRouter>
</MemoryRouter>
```

---

## Ref

```tsx
<View style={[styles.centerText, styles.centered]}>
    <Clickable ref={clickableRef}>
        {({hovered, focused, pressed}) => (
            <View
                testId=""
                disabled={false}
                hideDefaultFocusRing={false}
                style={[
                    hovered && styles.hovered,
                    pressed && styles.pressed,
                    focused && styles.focused,
                ]}
            >
                <Body>Press below to focus me!</Body>
            </View>
        )}
    </Clickable>
    <Button style={styles.button} onClick={handleSubmit}>
        Focus
    </Button>
</View>
```



---

## Related docs

- [Clickable Accessibility](clickable-accessibility.md)
- [Clickable Behavior](clickable-behavior.md)
