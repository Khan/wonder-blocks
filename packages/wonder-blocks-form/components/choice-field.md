 The user of this component is responsible for keeping track of checked state
 and providing an onChange callback.

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
        return <View>
            <ChoiceField
                label="Receive assignment reminders for Algebra"
                checked={this.state.assignment}
                id="assignment"
                onChange={(checked) => this.handleChange("assignment", checked)}
                testId="algebra-assignment-test"
                variant="checkbox"
            />
        </View>;
    }
}

<Settings />
```
