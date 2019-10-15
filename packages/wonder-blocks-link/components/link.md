### Example: Link

```js
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";

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

You can also use a Typography element instead of plain text.

```js
import {HeadingSmall} from "@khanacademy/wonder-blocks-typography";
import {View} from "@khanacademy/wonder-blocks-core";
import Link from "@khanacademy/wonder-blocks-link";

<View>
    <Link href="#nonexistent-link">
        <HeadingSmall>Heading inside a Link element</HeadingSmall>
    </Link>
</View>
```
