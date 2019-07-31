Adds a `style` property to components. A component can be either a custom React
Component (e.g. Link, Button) or a JSX intrinsic (e.g. "div", "span").
This helps you to manipulate and extend styles more easily by using the `styles`
prop as an array of different style objects.

### Example: Adding default styles

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
        borderRadius: Spacing.xxxSmall,
        fontSize: Spacing.medium,
        padding: Spacing.xSmall,
    }
});

const StyledInput = addStyle("input", styles.input);

<StyledInput type="text" placeholder="Lorem ipsum"/>;
```

### Example: Overriding a default style

After defining default styles, you can also customize the instance by adding
and/or merging styles using the `style` prop in your newly created styled component.

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
        borderRadius: Spacing.xxxSmall,
        fontSize: Spacing.medium,
        padding: Spacing.xSmall,
    },
    error: {
        background: fade(Color.red, 0.16),
        borderColor: Color.red,
    }
});

const StyledInput = addStyle("input", styles.input);

<StyledInput style={styles.error} type="text" placeholder="Lorem ipsum"/>;
```

### Example: Adding styles dynamically

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
        borderRadius: Spacing.xxxSmall,
        fontSize: Spacing.medium,
        padding: Spacing.xSmall,
    },
    error: {
        background: fade(Color.red, 0.16),
        borderColor: Color.red,
    },
});

<DynamicStyles />
```