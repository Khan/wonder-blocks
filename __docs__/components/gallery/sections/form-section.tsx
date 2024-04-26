import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import {
    Checkbox,
    CheckboxGroup,
    Choice,
    RadioGroup,
    TextField,
    LabeledTextField,
} from "@khanacademy/wonder-blocks-form";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentTile from "../component-tile";
import {styles} from "../styles";

export default function BannerSection() {
    const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
    const [selectedValue, setSelectedValue] = React.useState<string>("");
    const [checked, setChecked] = React.useState<boolean>(false);
    const [textValue, setTextValue] = React.useState<string>("");
    const [labeledTextFieldValue, setLabeledTextFieldValue] =
        React.useState<string>("");

    return (
        <>
            <HeadingLarge id="form" tag="h3" style={styles.sectionLabel}>
                Form
            </HeadingLarge>
            <View style={styles.section}>
                <ComponentTile
                    name="Checkbox"
                    href="/?path=/docs/packages-form-checkbox--docs"
                    description="A selection that can be checked or unchecked."
                >
                    <Checkbox
                        label={"Checkbox label"}
                        checked={checked}
                        disabled={false}
                        onChange={() => setChecked(!checked)}
                    />
                </ComponentTile>

                <ComponentTile
                    name="CheckboxGroup"
                    href="/?path=/docs/packages-form-checkboxgroup--docs"
                    description="Allows multiple selections."
                >
                    <CheckboxGroup
                        groupName="toppings"
                        selectedValues={selectedValues}
                        onChange={(values) => setSelectedValues(values)}
                    >
                        <Choice label="Pepperoni" value="pepperoni-1" />
                        <Choice
                            label="Sausage"
                            value="sausage-1"
                            description="Imported from Italy"
                        />
                        <Choice label="Extra cheese" value="cheese-1" />
                        <Choice label="Green pepper" value="pepper-1" />
                        <Choice label="Mushroom" value="mushroom-1" />
                    </CheckboxGroup>
                </ComponentTile>

                <ComponentTile
                    name="RadioGroup"
                    href="/?path=/docs/packages-form-radiogroup--docs"
                    description="Allows only a single selection."
                >
                    <RadioGroup
                        groupName="pokemon"
                        selectedValue={selectedValue}
                        onChange={(value) => setSelectedValue(value)}
                    >
                        <Choice label="Bulbasaur" value="bulbasaur-1" />
                        <Choice
                            label="Charmander"
                            value="charmander-1"
                            description="Oops, we ran out of Charmanders"
                            disabled
                        />
                        <Choice label="Squirtle" value="squirtle-1" />
                        <Choice label="Pikachu" value="pikachu-1" />
                    </RadioGroup>
                </ComponentTile>

                <ComponentTile
                    name="TextField"
                    href="/?path=/docs/packages-form-textfield--docs"
                    description={`Standard text input field. This is
                        used to accept a single line of text from
                        the user.`}
                >
                    <TextField
                        id="text-field"
                        type="text"
                        value={textValue}
                        placeholder="Text"
                        onChange={(value) => setTextValue(value)}
                    />
                </ComponentTile>

                <ComponentTile
                    name="LabeledTextField"
                    href="/?path=/docs/packages-form-labeledtextfield--docs"
                    description={`Used to accept a single line of text
                        from the user paired with a label, description,
                        and error field elements.`}
                >
                    <LabeledTextField
                        label="Name (Label)"
                        description="Please enter your name"
                        value={labeledTextFieldValue}
                        onChange={(newValue) =>
                            setLabeledTextFieldValue(newValue)
                        }
                        placeholder="Name"
                    />
                </ComponentTile>
            </View>
        </>
    );
}
