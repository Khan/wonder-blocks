## Spring and Strut

`Spring` and `Strut` are two components that can make certain layouts easier to implement.
`Spring` is infinitely compressible and expands to fill available space while `Strut`
is incompressible and occupies a fixed amount of space specified by its `size` prop.

```js
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import Button from "@khanacademy/wonder-blocks-button";
import {Spring, Strut} from "@khanacademy/wonder-blocks-layout";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        border: `solid 1px ${Color.offBlack50}`,
    },
    button: {
        width: 100,
    },
});

<View style={styles.container}>
    <Button style={styles.button}>A</Button>
    <Strut size={Spacing.small_12}/>
    <Button style={styles.button}>B</Button>
    <Strut size={Spacing.small_12}/>
    <Button style={styles.button}>C</Button>
    <Spring/>
    <Button style={styles.button}>Cancel</Button>
    <Strut size={Spacing.small_12}/>
    <Button style={styles.button}>Accept</Button>
</View>
```

## MediaLayout

`MediaLayout` is a container component that accepts a `styleSheets` object, whose keys are
media sizes.  It listens for changes to the current media size and passes the current
`mediaSize`, `mediaSpec`, and `styles` to `children`, which is a render function taking
those three values as an object.

Valid keys for the `styleSheets` object are (in order of precedence):
- `small`, `medium`, `large`
- `mdOrSmaller`, `mdOrLarger`
- `all`

`MediaLayout` will merge style rules from multiple styles that match the current media
query, e.g. `"(min-width: 1024px)"`.

The `mediaSpec` is an object with one or more of the following keys: `small`, `medium`,
or `large`.  Each value contains the following data:
- `query: string` e.g. "(min-width: 1024px)"
- `totalColumns: number`
- `gutterWidth: number`
- `marginWidth: number`
- `maxWidth: number`

### Examples

#### 1. Switching styles for different screen sizes

By default, `MediaLayout` uses `MEDIA_DEFAULT_SPEC`. Here you can see an
example that changes styles depending on the current spec.

```js
import {StyleSheet} from "aphrodite";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {MediaLayout} from "@khanacademy/wonder-blocks-layout";

const styleSheets = {
    large: StyleSheet.create({
        test: {
            backgroundColor: Color.darkBlue,
            color: Color.white,
        },
    }),
    medium: StyleSheet.create({
        test: {
            backgroundColor: Color.blue,
            color: Color.white,
        },
    }),
    small: StyleSheet.create({
        test: {
            backgroundColor: Color.lightBlue,
            color: Color.white,
        },
    }),
};

<MediaLayout styleSheets={styleSheets}>
    {({mediaSize, mediaSpec, styles}) => {
        return <View style={styles.test}>Hello, world!</View>;
    }}
</MediaLayout>
```

#### 2. Defining shared styles for all sizes

You can use the `all` key to define styles for all the different sizes. This
means that by using this key, all the sizes (small, medium, large) will use the
styles defined in `all`, and in case there are duplicate properties, more
specific sizes will take more importance.

```js
import {StyleSheet} from "aphrodite";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {MediaLayout} from "@khanacademy/wonder-blocks-layout";

const styleSheets = {
    all: StyleSheet.create({
        // use shared styles for all sizes
        test: {
            color: Color.white,
            padding: Spacing.medium_16,
        },
    }),

    large: StyleSheet.create({
        // override the `padding` prop` here
        test: {
            backgroundColor: Color.darkBlue,
            padding: Spacing.xxLarge_48,
        },
    }),

    medium: StyleSheet.create({
        test: {
            backgroundColor: Color.blue,
        },
    }),

    small: StyleSheet.create({
        test: {
            backgroundColor: Color.lightBlue,
        },
    }),
};

<MediaLayout styleSheets={styleSheets}>
    {({styles}) => {
        return <View style={styles.test}>Hello, world!</View>;
    }}
</MediaLayout>
```

#### 3. Using a custom spec:

There are cases when you might need to use a custom media query spec. For that
situation you can define your own custom `MEDIA_SPEC`. You need to use the
`MediaLayoutContext.Provider` to specify this spec value.

**NOTE:** Make sure to import the `MediaSpec` and `MediaLayoutContextValue` type
definitions:

```js static
// 1. Import the required types
import type {MediaSpec, MediaLayoutContextValue} from "@khanacademy/wonder-blocks-layout";

// 2. Add the `MediaSpect` type to the MEDIA_CUSTOM_SPEC object
const MEDIA_CUSTOM_SPEC: MediaSpec = {
    ...
};

// 3. Make sure to add the type `MediaLayoutContextValue`
const contextValue: MediaLayoutContextValue = {
    ssrSize: "large",
    mediaSpec: MEDIA_CUSTOM_SPEC,
};
```

```js
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import {Body, HeadingLarge, HeadingSmall} from "@khanacademy/wonder-blocks-typography";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {MediaLayout, MediaLayoutContext} from "@khanacademy/wonder-blocks-layout";

// If you're using flow, make sure to import these types by uncommenting the following line
// import type {MediaSpec, MediaLayoutContextValue} from "@khanacademy/wonder-blocks-layout";

const styleSheets = {
    large: StyleSheet.create({
        example: {
            alignItems: "center",
            backgroundColor: Color.darkBlue,
            color: Color.white,
            padding: Spacing.xxxLarge_64,
        },
    }),

    small: StyleSheet.create({
        example: {
            backgroundColor: Color.lightBlue,
            padding: Spacing.small_12,
        },
    }),
};

// Custom media spec definition
// Make sure to add the type `MediaSpec`
const MEDIA_CUSTOM_SPEC = {
    small: {
        query: "(max-width: 767px)",
        totalColumns: 4,
        gutterWidth: Spacing.medium_16,
        marginWidth: Spacing.medium_16,
    },
    large: {
        query: "(min-width: 768px)",
        totalColumns: 12,
        gutterWidth: Spacing.xLarge_32,
        marginWidth: Spacing.xxLarge_48,
    },
};

// Make sure to add the type `MediaLayoutContextValue`
const contextValue = {
    ssrSize: "large",
    mediaSpec: MEDIA_CUSTOM_SPEC,
};

<MediaLayoutContext.Provider value={contextValue}>
    <MediaLayout styleSheets={styleSheets}>
        {({mediaSize, styles}) => {
            const HeadingComponent = (mediaSize === "small") ? HeadingSmall : HeadingLarge;

            return (
                <View style={styles.example}>
                    <HeadingComponent>Current mediaSpec: {mediaSize}</HeadingComponent>
                    <Body tag="p">
                        {
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                        }
                    </Body>
                </View>
            );
        }}
    </MediaLayout>
</MediaLayoutContext.Provider>
```
