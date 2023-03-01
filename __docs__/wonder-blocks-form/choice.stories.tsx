import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {ComponentStory, ComponentMeta} from "@storybook/react";

import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";

import {
    Choice,
    CheckboxGroup,
    RadioGroup,
} from "@khanacademy/wonder-blocks-form";

import ComponentInfo from "../../.storybook/components/component-info";
import {name, version} from "../../packages/wonder-blocks-form/package.json";

export default {
    title: "Form / Choice",
    component: Choice,
    parameters: {
        componentSubtitle: <ComponentInfo name={name} version={version} />,
    },
} as ComponentMeta<typeof Choice>;

type StoryComponentType = ComponentStory<typeof Choice>;

export const Default: StoryComponentType = (args) => {
    const [selectedValues, setSelectedValues] = React.useState([]);
    const [selectedValue, setSelectedValue] = React.useState("");

    return (
        <View style={styles.row}>
            <CheckboxGroup
                label="Pizza order"
                description="Choose as many toppings as you would like."
                groupName="Toppings"
                // @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call.
                onChange={setSelectedValues}
                selectedValues={selectedValues}
            >
                <Choice label="Pepperoni" value="pepperoni" />
                <Choice
                    label="Sausage"
                    value="sausage"
                    description="Imported from Italy"
                />
                <Choice label="Extra cheese" value="cheese" />
                <Choice label="Green pepper" value="pepper" />
                <Choice label="Mushroom" value="mushroom" />
                <Choice {...args} />
            </CheckboxGroup>
            <Strut size={Spacing.xLarge_32} />
            <RadioGroup
                label="Pizza order"
                description="Choose only one topping."
                groupName="Toppings"
                onChange={setSelectedValue}
                selectedValue={selectedValue}
            >
                <Choice label="Pepperoni" value="pepperoni" />
                <Choice
                    label="Sausage"
                    value="sausage"
                    description="Imported from Italy"
                />
                <Choice label="Extra cheese" value="cheese" />
                <Choice label="Green pepper" value="pepper" />
                <Choice label="Mushroom" value="mushroom" />
                <Choice {...args} />
            </RadioGroup>
        </View>
    );
};

Default.args = {
    label: "Pineapple (Control)",
    value: "pineapple",
    description: "Does in fact belong on pizzas",
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
});