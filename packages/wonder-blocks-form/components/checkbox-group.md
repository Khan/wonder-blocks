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
            <Choice label="Pepperoni" value="pepperoni" />
            <Choice label="Sausage" value="sausage" description="Imported from Italy" />
            <Choice label="Extra cheese" value="cheese" />
            <Choice label="Green pepper" value="pepper" />
            <Choice label="Mushroom" value="mushroom" />
            <Choice label="Pineapple" value="pineapple" description="Does in fact belong on pizzas" />
        </CheckboxGroup>
    }
}
<View style={styles.wrapper}>
    <CheckboxGroupPizzaExample />
</View>
```

This example shows how one can add custom styles to the checkbox group and to
each component to achieve desired custom layouts. This context is inspired by
the class selector modal. The label is created separately because we are
reflowing all the elements in the group to row.

```js
const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const Color = require("@khanacademy/wonder-blocks-color").default;
const {LabelLarge} = require("@khanacademy/wonder-blocks-typography");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    wrapper: {
        width: 650,
    },
    group: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    choice: {
        marginTop: 8,
        width: 200,
    },
    title: {
        paddingBottom: 8,
        borderBottom: `1px solid ${Color.offBlack64}`,
    },
});

class ClassSelectorExample extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedValues: [],
        };
    }

    handleChange(change) {
        console.log(`${change} was selected!`);
        this.setState({
            selectedValues: change,
        });
    }

    render() {
        return <CheckboxGroup
            groupName="science-classes"
            onChange={(change) => this.handleChange(change)}
            selectedValues={this.state.selectedValues}
            style={styles.group}
        >
            <Choice label="Biology" value="1" style={styles.choice} />
            <Choice label="AP®︎ Biology" value="2" style={styles.choice} />
            <Choice label="High school biology" value="3" style={styles.choice} />
            <Choice label="Cosmology and astronomy" value="4" style={styles.choice} />
            <Choice label="Electrical engineering" value="5" style={styles.choice} />
            <Choice label="Health and medicine" value="6" style={styles.choice} />
        </CheckboxGroup>
    }
}
<View style={styles.wrapper}>
    <LabelLarge style={styles.title}>Science</LabelLarge>
    <ClassSelectorExample />
</View>
```
