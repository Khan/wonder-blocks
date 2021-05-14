### Creating a Clickable component

You can make custom components `Clickable` by returning them in a function of the
`Clickable` child. The eventState parameter the function takes allows access to states
pressed, hovered and clicked, which you may use to create custom styles.

Clickable has a default focus ring style built-in.  If you are creating your own
custom focus ring it should be disabled using by setting `hideDefaultFocusRing={true}`
in the props passed to `Clickable`.

```jsx
import {StyleSheet} from "aphrodite";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import {Body} from "@khanacademy/wonder-blocks-typography";

const styles = StyleSheet.create({
    hovered: {
        textDecoration: "underline",
        backgroundColor: Color.teal,
    },
    pressed: {
        color: Color.blue,
    },
    focused: {
        outline: `solid 4px ${Color.offBlack64}`,
    },
});

<View>
    <Clickable
        onClick={() => alert("You clicked some text!")}
        hideDefaultFocusRing={true}
        role="tab"
    >
        {
            ({hovered, focused, pressed}) =>
            <View style={[
                hovered && styles.hovered,
                focused && styles.focused,
                pressed && styles.pressed,
            ]}>
                <Body>
                    This text is clickable!
                </Body>
            </View>
        }
    </Clickable>
</View>
```

Clickable has a `light` prop which changes the default focus ring color to fit a dark background.

```jsx
import {StyleSheet} from "aphrodite";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Body} from "@khanacademy/wonder-blocks-typography";

const styles = StyleSheet.create({
    background: {
        backgroundColor: Color.darkBlue,
        color: Color.white,
        padding: Spacing.small_12,
    },
    hovered: {
        textDecoration: "underline",
        backgroundColor: Color.purple,
    },
    pressed: {
        color: Color.blue,
    },
});

<View style={styles.background}>
    <Clickable
        onClick={() => alert("You clicked some text!")}
        role="tab"
        light={true}
    >
        {
            ({hovered, focused, pressed}) =>
            <View style={[
                hovered && styles.hovered,
                pressed && styles.pressed,
            ]}>
                <Body>
                    This text is clickable!
                </Body>
            </View>
        }
    </Clickable>
</View>
```

### Client-Side routing with Clickable

If your Clickable component is within a React-Router enviroment, your component will automatically default to client-side routing with the `href` prop is set. This behavior can be toggeled by passing the `skipClientNav` prop. In this example we see two Clickable h1 tags, one which employs client-side routing, and the other uses skipClientNav to avoid this default behavior.

```jsx
import {StyleSheet} from "aphrodite";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {MemoryRouter, Route, Switch} from "react-router-dom";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    h1: {
        marginRight: Spacing.large_24,
    }
});

// NOTE: In actual code you would use BrowserRouter instead
<MemoryRouter>
    <View style={styles.row}>
        <Clickable href="/foo" style={styles.h1} onClick={() => console.log("I'm still on the same page!")}>
            {
                eventState =>
                    <h1>
                        Uses Client-side Nav
                    </h1>
            }
        </Clickable>
        <Clickable href="/foo" style={styles.h1} skipClientNav>
            {
                eventState =>
                    <h1>
                        Avoids Client-side Nav
                    </h1>
            }
        </Clickable>
        <Switch>
            <Route path="/foo">
                <View id="foo">Hello, world!</View>
            </Route>
        </Switch>
    </View>
</MemoryRouter>
```

### Navigating with the Keyboard

Clickable adds support to keyboard navigation. This way, your components are
accessible and emulate better the browser's behavior.

*NOTE:* If you want to navigate to an external URL and/or reload the window, make
sure to use `href` and `skipClientNav={true}`.

```jsx
import {StyleSheet} from "aphrodite";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import {Body} from "@khanacademy/wonder-blocks-typography";

const styles = StyleSheet.create({
    hovered: {
        textDecoration: "underline",
        backgroundColor: Color.teal,
    },
    pressed: {
        color: Color.blue,
    },
    focused: {
        outline: `solid 4px ${Color.lightBlue}`,
    },
});

<View>
    <Clickable
        href="https://www.khanacademy.org/about/tos"
        skipClientNav={true}
        hideDefaultFocusRing={true}
    >
        {
            ({hovered, focused, pressed}) =>
            <View style={[
                hovered && styles.hovered,
                focused && styles.focused,
                pressed && styles.pressed,
            ]}>
                <Body>
                    This text should navigate using the keyboard
                </Body>
            </View>
        }
    </Clickable>
</View>
```