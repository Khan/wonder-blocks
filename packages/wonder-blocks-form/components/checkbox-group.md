A checkbox group allows multiple selection. This component autopopulates many
props for its children Choice components. The Choice component is exposed for
the user to apply custom styles or to indicate which choices are disabled.

This example has two items with descriptions, and it sets an error state to the
entire group if more than three items are selected.

Try out the keyboard navigation! Use tab and shift+tab to navigate among the
choices, and use space to select/de-select each option.

```js
const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    wrapper: {
        width: 300,
    },
    marginRight: {
        marginRight: 16,
    }
});

class CheckboxGroupPizzaExample extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedValues: ["pineapple"],
        };
    }

    handleChange(change) {
        console.log(`${change} was selected!`);
        const error = this.checkForError(change);
        this.setState({
            selectedValues: change,
            error: error,
        });
    }

    checkForError(input) {
        if (input.length > 3) {
            return "You have selected too many toppings";
        }
    }

    render() {
        return <CheckboxGroup
            label="Pizza order"
            description="You may choose at most three toppings"
            errorMessage={this.state.error}
            groupName="Toppings"
            onChange={(change) => this.handleChange(change)}
            selectedValues={this.state.selectedValues}
        >
            <Choice label="Pepperoni" value="pepperoni"  />
            <Choice label="Sausage" value="sausage" description="Imported from Italy" />
            <Choice label="Extra cheese" value="cheese" />
            <Choice label="Green pepper" value="pepper" />
            <Choice label="Mushroom" value="mushroom" />
            <Choice label="Pineapple" value="pineapple" description="Does in fact belong on pizzas" />
        </CheckboxGroup>
    }
}
<View style={[styles.wrapper]}>
    <CheckboxGroupPizzaExample />
</View>
```
