ChoiceField is to be used independently. If you wish to use choices as part of a
group, please look at CheckboxGroup and RadioGroup, which takes the Choice
component as children and auto-populate many props.

ChoiceField is pretty much a checkbox or radio button with a label and optional
description. The click target includes the label but not the description. The
user of the component is responsible for keeping track of checked state and
providing an onChange callback.

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
            <ChoiceField
                label="Receive assignment reminders for Algebra"
                testId="algebra-assignment-test"
                checked={this.state.assignment}
                onChange={(checked) => this.handleChange("assignment", checked)}
                variant="checkbox"
            />
            <Strut size={8} />
            <ChoiceField
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
