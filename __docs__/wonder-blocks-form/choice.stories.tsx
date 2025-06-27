import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import {View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";

import {
    Choice,
    CheckboxGroup,
    RadioGroup,
} from "@khanacademy/wonder-blocks-form";

import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-form/package.json";

export default {
    title: "Packages / Form / Choice",
    component: Choice,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
} as Meta<typeof Choice>;

type StoryComponentType = StoryObj<typeof Choice>;

const ChoiceWrapper = (args: any) => {
    const [selectedValues, setSelectedValues] = React.useState<Array<string>>(
        [],
    );
    const [selectedValue, setSelectedValue] = React.useState("");

    return (
        <View style={styles.row}>
            <CheckboxGroup
                label="Pizza order"
                description="Choose as many toppings as you would like."
                groupName="Toppings"
                onChange={setSelectedValues}
                selectedValues={selectedValues}
            >
                <Choice label="Pepperoni" value="pepperoni-checkbox" />
                <Choice
                    label="Sausage"
                    value="sausage-checkbox"
                    description="Imported from Italy"
                />
                <Choice label="Extra cheese" value="cheese-checkbox" />
                <Choice label="Green pepper" value="pepper-checkbox" />
                <Choice label="Mushroom" value="mushroom-checkbox" />
                <Choice aria-label="Pineapple" value="pineapple" {...args} />
            </CheckboxGroup>
            <RadioGroup
                label="Pizza order"
                description="Choose only one topping."
                groupName="Toppings"
                onChange={setSelectedValue}
                selectedValue={selectedValue}
            >
                <Choice
                    aria-label="Only Pepperoni"
                    label="Pepperoni"
                    value="pepperoni-radio"
                />
                <Choice
                    aria-label="Only Sausage"
                    label="Sausage"
                    value="sausage-radio"
                    description="Imported from Italy"
                />
                <Choice
                    aria-label="Only extra cheese"
                    label="Extra cheese"
                    value="cheese-radio"
                />
                <Choice
                    aria-label="Only green pepper"
                    label="Green pepper"
                    value="pepper-radio"
                />
                <Choice
                    aria-label="Only mushroom"
                    label="Mushroom"
                    value="mushroom-radio"
                />
                <Choice
                    aria-label="Only Pineapple"
                    value="only-pineapple"
                    {...args}
                />
            </RadioGroup>
        </View>
    );
};

export const Default: StoryComponentType = {
    render: (args) => <ChoiceWrapper {...args} />,
    args: {
        label: "Pineapple (Control)",
        description: "Does in fact belong on pizzas",
    },
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        gap: spacing.xLarge_32,
    },
});
