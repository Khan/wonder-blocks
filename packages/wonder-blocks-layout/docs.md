## Spring and Strut

`Spring` and `Strut` are two components that can make certain layouts easier to implement.
`Spring` is infinitely compressible and expands to fill available space while `Strut`
is uncompressible and occupies a fixed amount of space specified by its `size` prop.

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
    <Strut size={Spacing.small}/>
    <Button style={styles.button}>B</Button>
    <Strut size={Spacing.small}/>
    <Button style={styles.button}>C</Button>
    <Spring/>
    <Button style={styles.button}>Cancel</Button>
    <Strut size={Spacing.small}/>
    <Button style={styles.button}>Accept</Button>
</View>
```

## MediaLayout

`MediaLayout` is a container component takes in a `styleSheets` object whose keys are
media sizes.  I listens for changes to the current media size and passes the current
`mediaSize`, `mediaSpec`, and `styles` to `children` which is a render function taking
those three values as object.

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

By default, `MediaLayout` uses `MEDIA_DEFAULT_SPEC`. Here you can see a simple
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
styles defined in `all`, and in case there are duplicate properties, the
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
            padding: Spacing.medium,
        },
    }),

    large: StyleSheet.create({
        // override the `padding` prop` here
        test: {
            backgroundColor: Color.darkBlue,
            padding: Spacing.xxLarge,
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
    {({mediaSize, mediaSpec, styles}) => {
        return <View style={styles.test}>Hello, world!</View>;
    }}
</MediaLayout>
```

#### 3. Using a different spec for Modals:

There are cases when you will need to use a different spec, for example in
Modals, where you can use `MEDIA_MODAL_SPEC` instead. You just need to use the
`MediaLayoutContext.Provider` to specify this spec value.

```js
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import {OnePaneDialog} from "@khanacademy/wonder-blocks-modal";
import Button from "@khanacademy/wonder-blocks-button";
import {Body} from "@khanacademy/wonder-blocks-typography";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {MediaLayout, MediaLayoutContext, MEDIA_MODAL_SPEC} from "@khanacademy/wonder-blocks-layout";

const styleSheets = {
    large: StyleSheet.create({
        example: {
            alignItems: "center",
            backgroundColor: Color.darkBlue,
            padding: Spacing.medium,
        },

        footer: {
            flexDirection: "row",
        },

        button: {
            marginLeft: Spacing.medium,
        }
    }),

    small: StyleSheet.create({
        example: {
            backgroundColor: Color.lightBlue,
        },

        footer: {
            flexDirection: "column-reverse",
            width: "100%",
        },
    }),
};

// If using flow, make sure to add the type `MediaLayoutContextValue`
const contextValue = {
    ssrSize: "large",
    mediaSpec: MEDIA_MODAL_SPEC,
};

<MediaLayoutContext.Provider value={contextValue}>
    <MediaLayout styleSheets={styleSheets}>
        {({mediaSize, mediaSpec, styles}) => {
            return (
                <View style={styles.example}>
                    <OnePaneDialog
                        title="Title"
                        subtitle="You're reading the subtitle!"
                        content={
                            <View style={styles.modalContent}>
                                <Body tag="p">
                                    {
                                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                                    }
                                </Body>
                            </View>
                        }
                        footer={
                            <View style={styles.footer}>
                                <Button style={styles.button} kind="tertiary">Back</Button>
                                <Button style={styles.button}>Continue</Button>
                            </View>
                        }
                    />
                </View>
            );
        }}
    </MediaLayout>
</MediaLayoutContext.Provider>
```