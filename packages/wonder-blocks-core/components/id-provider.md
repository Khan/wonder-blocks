### Example: Usage with form fields

This example allows you to generate an unique ID and make it available to associate the `<label>` and `<input>` elements. To see this example in action, check that `label[for]` and `input[id]` are using the same id.

```jsx
const children = (uniqueId) => (
    <label htmlFor={uniqueId}>
        Label with ID {uniqueId}:
        <input type="text" id={uniqueId} />
    </label>
);

<View>
    <IDProvider scope="field">
        {children}
    </IDProvider>
</View>
```