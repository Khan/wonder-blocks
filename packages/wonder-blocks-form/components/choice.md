The Choice component is intended to be used as children of CheckboxGroup and
RadioGroup, which autopopulate certain props in Choice.

Choice may be used by itself. In this case, it's pretty much a checkbox / radio
button with a label and optional description. The click target includes the
label but not the description. The user of the component is responsible for
keeping track of checked state.

```js
const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const {LabelMedium, LabelSmall} = require("@khanacademy/wonder-blocks-typography");
const {Strut} = require("@khanacademy/wonder-blocks-layout");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    wrapper: {
    },
});

class Settings extends React.Component {
    constructor() {
        super();
        this.state = {
            assignment: false,
            agreement: false,
        }
    }

    handleChange(choiceKey, checked) {
        this.setState({
            [choiceKey]: checked,
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
            <Choice
                label="Receive assignment reminders for Algebra"
                testId="algebra-assignment-test"
                checked={this.state.assignment}
                onChange={(checked) => this.handleChange("assignment", checked)}
                variant="checkbox"
            />
            <Strut size={8} />
            <Choice
                label="I agree to not cheat in Algebra"
                description="because otherwise I will never learn!"
                checked={this.state.agreement}
                // once checked, this Choice will not receive an onChange
                // callback unless the state was reset for some reason
                onChange={(checked) => this.handleChange("agreement", checked)}
                variant="radio"
            />
        </View>;
    }
}

<Settings />
```
