Spacing is a collection of simple names assigned to specific dimensions. These are used frequently when laying out Wonder Blocks components (such as with the Grid). You can use these sizes directly by importing the `wonder-blocks-spacing` package and accessing the named property like so: `Spacing.xxs`.

```js
const Spacing = require("./index.js").default;

<div>
    {Object.keys(Spacing).map((spaceName, idx) => (
        <div
            key={idx}
            style={{
                display: "flex",
                alignItems: "center",
                marginBottom: Spacing.xxs,
            }}
        >
            <div style={{width: 250, paddingRight: 10, textAlign: "right"}}>
                {spaceName}: {Spacing[spaceName]}px
            </div>
            <div
                style={{
                    backgroundColor: "black",
                    width: Spacing[spaceName],
                    height: Spacing[spaceName],
                }}
            />
        </div>
    ))}
</div>
```
