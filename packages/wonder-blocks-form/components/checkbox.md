The checkbox has various styles for clickable states. Here are sets of default checkboxes, checkboxes in an error state, and disabled checkboxes.
```js
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    marginRight: {
        marginRight: 16,
    }
});

const handleChange = (checked) => console.log(`clicked on checkbox, will be checked=${checked.toString()}`);

<View style={styles.row}>
    <Checkbox error={false} checked={false} style={styles.marginRight} onChange={handleChange} />
    <Checkbox error={false} checked={true} style={styles.marginRight} onChange={handleChange} />
    <Checkbox error={true} checked={false} style={styles.marginRight} onChange={handleChange} />
    <Checkbox error={true} checked={true} style={styles.marginRight} onChange={handleChange} />
    <Checkbox disabled={true} checked={false} style={styles.marginRight} onChange={handleChange} />
    <Checkbox disabled={true} checked={true} style={styles.marginRight} onChange={handleChange} />
</View>
```

The checkbox can have a optional label and description. This allows it to be
used as a settings-like item. The user of this component is responsible for
keeping track of checked state and providing an onChange callback.

```js
const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const {LabelMedium, LabelSmall} = require("@khanacademy/wonder-blocks-typography");
const {StyleSheet} = require("aphrodite");

class Settings extends React.Component {
    constructor() {
        super();
        this.state = {
            assignment: false,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
        this.setState({
            assignment: checked,
        });
        // Potentially do something here with this updated state information.
    }

    render() {
        const handleChanged = (checked) => console.log(`clicked on checkbox with checked=${checked.toString()}`);
        const headingText = "Functions";
        const descriptionText = `A great cook knows how to take basic ingredients and
        prepare a delicious meal. In this topic, you will become function-chefs! You
        will learn how to combine functions with arithmetic operations and how to
        compose functions.`;
        return <View>
            <Checkbox
                label="Receive assignment reminders for Algebra"
                description="You will receive a reminder 24 hours before each deadline"
                checked={this.state.assignment}
                id="assignment"
                onChange={this.handleChange}
                testId="algebra-assignment-test"
                variant="checkbox"
            />
        </View>;
    }
}

<Settings />
```

Sometimes one may wish to use a checkbox in a different context (label may not
be right next to the checkbox), like in this example content item. Use a
`<label htmlFor={id}>` element where the id matches the `id` prop of the
Checkbox. This is for accessibility purposes, and doing this also automatically
makes the label a click target for the checkbox.
```js
const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const {LabelMedium, LabelSmall} = require("@khanacademy/wonder-blocks-typography");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    topic: {
        maxWidth: 600,
    },
});

class ContentItem extends React.Component {
    constructor() {
        super();
        this.state = {
            checked: false,
        }
    }

    handleChange(checked) {
        this.setState({
            checked: checked,
        });
        // Potentially do something here with this updated state information.
    }

    render() {
        const handleChanged = (checked) => console.log(`clicked on checkbox with checked=${checked.toString()}`);
        const headingText = "Functions";
        const descriptionText = `A great cook knows how to take basic ingredients and
        prepare a delicious meal. In this topic, you will become function-chefs! You
        will learn how to combine functions with arithmetic operations and how to
        compose functions.`;
        return <View style={styles.wrapper}>
            <View style={styles.topic}>
                <label htmlFor="topic-123"><LabelMedium>{headingText}</LabelMedium></label>
                <LabelSmall>{descriptionText}</LabelSmall>
            </View>
            <Checkbox checked={this.state.checked} id="topic-123" onChange={checked => this.handleChange(checked)} />
        </View>;
    }
}

<ContentItem />
```
