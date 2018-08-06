This example has a disabled item. Selecting the last item results in an error
state for the entire group.

Try out the keyboard navigation! Use up/left and down/right to navigate among
the choices, and use tab to navigate between this radio group and the rest of
the page.

```js
const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    wrapper: {
        width: 300,
    },
});

class RadioGroupPokemonExample extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedValue: null,
        };
    }

    handleChange(change) {
        console.log(`${change} was selected!`);
        const error = this.checkForError(change);
        this.setState({
            selectedValue: change,
            error: error,
        });
    }

    checkForError(input) {
        if (input === "infiltrator") {
            return "Superman isn't a Pokemon!";
        }
    }

    render() {
        return <RadioGroup
            label="Choose a starter!"
            description="Your first Pokemon"
            errorMessage={this.state.error}
            groupName="Pokemon"
            onChange={(change) => this.handleChange(change)}
            selectedValue={this.state.selectedValue}
        >
            <Choice label="Bulbasaur" value="bulb" />
            <Choice label="Charmander" value="char" description="Oops, we ran out of Charmanders" disabled />
            <Choice label="Squirtle" value="squirt" />
            <Choice label="Pikachu" value="pika" />
            <Choice label="Superman" value="infiltrator" />
        </RadioGroup>
    }
}
<View style={styles.wrapper}>
    <RadioGroupPokemonExample />
</View>
```
