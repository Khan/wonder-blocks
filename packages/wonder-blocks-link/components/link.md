### Example: Link

```js
const Color = require("@khanacademy/wonder-blocks-color").default;
const {View} = require("@khanacademy/wonder-blocks-core");

<View>
    <p>
    I am a <Link href="#nonexistent-link">Primary Link</Link>. <span
    style={{color: Color.offBlack64}}>My friend the
    <Link href="#secondary-nonexistent-link" kind="secondary">Secondary Link
    </Link> is used here with a lighter text.</span> We also have a
    <Link href="#" visitable={true}>Visitable Primary Link</Link> friend.
    </p>
    <p style={{backgroundColor: Color.darkBlue, color: Color.white64, padding: 10}}>
        I am a <Link href="#dark-link" light={true}>Primary Link</Link> used on
        a dark background. My friend the Secondary Link isn't supported on this
        dark background.
    </p>
</View>
```

### Example: Link with Typography element

You can also use a Typography element instead of just plain text.

```js
const {HeadingSmall} = require("@khanacademy/wonder-blocks-typography");
const {View} = require("@khanacademy/wonder-blocks-core");

<View>
    <Link href="#nonexistent-link">
        <HeadingSmall>Heading inside a Link element</HeadingSmall>
    </Link>
</View>
```
