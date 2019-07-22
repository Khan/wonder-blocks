This example has a disabled item. Selecting the last item results in an error
state for the entire group.

Try out the keyboard navigation! Use up/left and down/right to navigate among
the choices, and use tab to navigate between this radio group and the rest of
the page.

```js
import {Choice, RadioGroup} from "@khanacademy/wonder-blocks-form";
import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";

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
        this.handleChange = this.handleChange.bind(this);
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
            onChange={this.handleChange}
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

This example shows how to use custom styling to change the appearance of the
radio group to look more like a multiple choice question.

```js
import {Choice, RadioGroup} from "@khanacademy/wonder-blocks-form";
import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";

const styles = StyleSheet.create({
    wrapper: {
        width: 650,
    },
    choice: {
        margin: 0,
        height: 48,
        borderTop: "solid 1px #CCC",
        justifyContent: "center",
        ":last-child": {
            borderBottom: "solid 1px #CCC",
        },
    },
    prompt: {
        marginBottom: 16,
    },
});

class ClassSelectorExample extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedValue: null,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(change) {
        console.log(`${change} was selected!`);
        this.setState({
            selectedValue: change,
        });
    }

    render() {
        return <RadioGroup
            groupName="science-classes"
            onChange={this.handleChange}
            selectedValue={this.state.selectedValue}
        >
            <Choice label="A" value="1" style={styles.choice} />
            <Choice label="B" value="2" style={styles.choice} />
            <Choice label="AB" value="3" style={styles.choice} />
            <Choice label="O" value="4" style={styles.choice} />
        </RadioGroup>
    }
}

<View>
    <LabelLarge style={styles.prompt}>
        Select your blood type
    </LabelLarge>
    <ClassSelectorExample />
</View>
```
