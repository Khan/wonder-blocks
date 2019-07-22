### Example: Usage with form fields

This example allows you to generate an unique ID and make it available to associate the `<label>` and `<input>` elements. To see this example in action, check that `label[for]` and `input[id]` are using the same id.

```jsx
import {IDProvider, View} from "@khanacademy/wonder-blocks-core";

<View>
    <IDProvider scope="field">
        {(uniqueId) => (
            <label htmlFor={uniqueId}>
                Label with ID {uniqueId}:
                <input type="text" id={uniqueId} />
            </label>
        )}
    </IDProvider>
</View>
```

### Example: Identifier provided by parent component

In some cases, a parent component using `IDProvider` could have an identifier as well. For this particular scenario, we can reuse this ID and pass it down to `IDProvider`. This will avoid generating a unique identifier, and it will reuse the passed identifier instead.

```jsx
import {IDProvider, View} from "@khanacademy/wonder-blocks-core";

<View>
    <IDProvider scope="field" id="some-user-id">
        {(uniqueId) => (
            <label htmlFor={uniqueId}>
                Label with ID {uniqueId}:
                <input type="text" id={uniqueId} />
            </label>
        )}
    </IDProvider>
</View>
```