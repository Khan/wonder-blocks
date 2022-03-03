Adds a `style` property to a component. A component can be a Wonder Blocks
Component (e.g. Link, Button), a custom React Component (see example 4. Using
the `Style` prop) or
a DOM intrinsic (e.g. "div", "span"). This helps you to manipulate and extend
styles by using the `styles` prop. For more context on this, check
the [StyleType](#styletype) type definition below.

### Usage

```js static
addStyle(
    Component: React.Element | "string",
    defaultStyle?: StyleType
): React.Element;
```

The `addStyle` function is a HOC that accepts a **React Component** or a **DOM**
**intrinsic** ("div", "span", etc.) as its first argument and optional default
styles as its second argument. This HOC returns a **React Component** with a
`style` prop included ready to be rendered.

#### Function arguments

| Argument | Flow&nbsp;Type | Default | Description |
| --- | --- | --- | --- |
| `Component` | `React.Element`, `string` | _Required_ | The component that will be decorated. |
| `defaultStyle` | `StyleType` | null | The initial styles to be applied. |

### Types

#### StyleType

```js static
type NestedArray<T> = $ReadOnlyArray<T | NestedArray<T>>;
type Falsy = false | 0 | null | void;

export type StyleType =
    | CSSProperties
    | Falsy
    | NestedArray<CSSProperties | Falsy>;
```

**Note:** `StyleType` can contain a combination of style rules from an Aphrodite
StyleSheet as well inline style objects (see example 4).

#### CSSProperties

[See source file](https://github.com/Khan/wonder-blocks/blob/main/flow-typed/aphrodite.flow.js#L13)


### Examples

#### 1. Adding default styles

You can create a new styled component by using the `addStyle` function. Note
here that you can also define default styles for this component by passing an
initial style object to this function.

```jsx
import {StyleSheet} from "aphrodite";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {addStyle} from "@khanacademy/wonder-blocks-core";

const styles = StyleSheet.create({
    // default style for all instances of StyledInput
    input: {
        background: Color.white,
        border: `1px solid ${Color.offBlack16}`,
        borderRadius: Spacing.xxxSmall_4,
        fontSize: Spacing.medium_16,
        padding: Spacing.xSmall_8,
    }
});

const StyledInput = addStyle("input", styles.input);

<StyledInput type="text" placeholder="Lorem ipsum"/>;
```

#### 2. Overriding a default style

After defining default styles, you can also customize the instance by adding
and/or merging styles using the `style` prop in your newly created styled
component.

```jsx
import {StyleSheet} from "aphrodite";
import Color, {fade} from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {addStyle} from "@khanacademy/wonder-blocks-core";

const styles = StyleSheet.create({
    // default style for all instances of StyledInput
    input: {
        background: Color.white,
        border: `1px solid ${Color.offBlack16}`,
        borderRadius: Spacing.xxxSmall_4,
        fontSize: Spacing.medium_16,
        padding: Spacing.xSmall_8,
    },
    error: {
        background: fade(Color.red, 0.16),
        borderColor: Color.red,
    }
});

const StyledInput = addStyle("input", styles.input);

<StyledInput style={styles.error} type="text" placeholder="Lorem ipsum"/>;
```

#### 3. Adding styles dynamically

This example shows that you can dynamically create styles by adding them to the
`style` prop only when you need them.

```jsx
import {StyleSheet} from "aphrodite";
import Color, {fade} from "@khanacademy/wonder-blocks-color";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";

const StyledInput = addStyle("input");

class DynamicStyles extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
        this.setState({
            error: checked,
        });
    }

    render() {
        return (
            <View>
                <Checkbox
                    label="Click here to add the error style to the input"
                    checked={this.state.error}
                    onChange={this.handleChange}
                />
                <StyledInput
                    style={[
                        styles.input,
                        this.state.error && styles.error,
                    ]}
                    type="text"
                    placeholder="Lorem ipsum"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // default style for all instances of StyledInput
    input: {
        border: `1px solid ${Color.offBlack16}`,
        borderRadius: Spacing.xxxSmall_4,
        fontSize: Spacing.medium_16,
        padding: Spacing.xSmall_8,
    },
    error: {
        background: fade(Color.red, 0.16),
        borderColor: Color.red,
    },
});

<DynamicStyles />
```

#### 4. Using the `style` prop

There are some cases where you don't need to use `addStyle`. For example, if you
need to create a custom component that is using a Wonder Blocks component, you
can create a `style` prop and pass it down to the WB component itself.

**NOTE:** Make sure to import the `StyleType` type definition and assign it to
the prop:

```js static
import type {StyleType} from "@khanacademy/wonder-blocks-core";

type Props = {
    style: StyleType,
    // add the other props here
};
```

```jsx
import {StyleSheet} from "aphrodite";
import Color from "@khanacademy/wonder-blocks-color";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Title} from "@khanacademy/wonder-blocks-typography";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";

// you'll need to import the type definition here
// import type {StyleType} from "@khanacademy/wonder-blocks-core";

class CustomComponent extends React.Component {
    render() {
        return (
            <View style={[
                styles.default,
                // this `style` prop should be of type `StyleType`
                this.props.style,
            ]}>
                <Title>Lorem ipsum</Title>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // default styles
    default: {
        background: Color.white,
        color: Color.white,
        padding: Spacing.medium_16,
    },
    // style to be passed as a prop
    customStyle: {
        background: Color.lightBlue,
    },
});

<CustomComponent
    style={[
        // you can pass style rules from an Aphrodite StyleSheet
        styles.customStyle,
        // and pass inline styles as well
        {
            border: `1px solid ${Color.darkBlue}`,
            padding: Spacing.xxLarge_48,
        }
    ]}
/>

```

**Warning:** In the case of React components from other packages, they may not
handle `className` or `style` in which case wrapping them in `addStyle` won't do
anything.
