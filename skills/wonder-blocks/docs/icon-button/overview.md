# IconButton

The `wonder-blocks-icon-button` package provides a set of icon button components
that allow you to create buttons with icons. These buttons are designed to be
accessible and easy to use, with support for keyboard navigation and screen
readers.

For more details about each type of IconButton, refer to the docs for that
component!

## IconButton

A button whose contents are an icon. This is a simple button that can be used to
trigger actions or navigate to other pages. It uses a flat design, our most
common design pattern that can be used across different experiences.

```tsx
<View style={styles.row}>
    <IconButton
        icon={magnifyingGlass}
        aria-label="search"
        onClick={(e) => console.log("Click!")}
    />
    <IconButton
        icon={magnifyingGlass}
        aria-label="search"
        kind="secondary"
        onClick={(e) => console.log("Click!")}
    />
    <IconButton
        icon={magnifyingGlass}
        aria-label="search"
        kind="tertiary"
        onClick={(e) => console.log("Click!")}
    />
    <IconButton
        disabled={true}
        icon={magnifyingGlass}
        aria-label="search"
        onClick={(e) => console.log("Click!")}
    />
</View>
```

## ActivityIconButton

An icon button that is used for actions in the context of learner activities. It
uses a "chonky" design, which is a more playful and engaging design that is
suitable for learner activities.

```tsx
<View style={{gap: sizing.size_160, flexDirection: "row"}}>
    <ActivityIconButton
        actionType="progressive"
        icon={magnifyingGlass}
        aria-label="search"
        onClick={(e) =>}
    />
    <ActivityIconButton
        icon={magnifyingGlass}
        aria-label="search"
        kind="secondary"
        onClick={(e) =>}
    />
    <ActivityIconButton
        icon={magnifyingGlass}
        aria-label="search"
        kind="tertiary"
        onClick={(e) =>}
    />
    <ActivityIconButton
        disabled={true}
        icon={magnifyingGlass}
        aria-label="search"
        onClick={(e) =>}
    />
</View>
```

## ConversationIconButton

An icon button that is used in the context of conversations, such as sending a
message or performing an action related to a conversation. This is useful in
chat widgets, like the one used in Khanmigo.

```tsx
<View style={{gap: sizing.size_160, flexDirection: "row"}}>
    <ConversationIconButton
        icon={microphone}
        aria-label="search"
        onClick={(e) =>}
    />
    <ConversationIconButton
        icon={microphone}
        aria-label="search"
        kind="secondary"
        onClick={(e) =>}
    />
    <ConversationIconButton
        icon={microphone}
        aria-label="search"
        kind="tertiary"
        onClick={(e) =>}
    />
    <ConversationIconButton
        disabled={true}
        icon={microphone}
        aria-label="search"
        onClick={(e) =>}
    />
</View>
```


---

## Components & Guides

- [Activity Icon Button](activity-icon-button.md)
- [Conversation Icon Button](conversation-icon-button.md)
- [Icon Button](icon-button.md)
- [Node Icon Button](node-icon-button.md)
