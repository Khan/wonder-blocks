# Button

The `wonder-blocks-button` package provides a set of button components that
allow you to create buttons with text and optional icons. These buttons are
designed to be accessible and easy to use, with support for keyboard navigation
and screen readers.

For more details about each type of Button, refer to the docs for that
component!

## Button

A simple button that can be used to trigger actions or navigate to other pages.
It uses a flat design, our most common design pattern that can be used across
different experiences.

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

## ActivityButton

A button that is used for actions in the context of learner activities. It uses
a "chonky" design, which is a more playful and engaging design that is suitable
for learner activities.

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

## Components & Guides

- [Accessibility](accessibility.md)
- [Activity Button](activity-button.md)
- [Best Practices](best-practices.md)
- [Button](button.md)
- [Navigation Callbacks](navigation-callbacks.md)
