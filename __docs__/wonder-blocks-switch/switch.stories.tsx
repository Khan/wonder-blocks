import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import {StyleSheet} from "aphrodite";

import Switch from "@khanacademy/wonder-blocks-switch";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";

import packageConfig from "../../packages/wonder-blocks-switch/package.json";
import ComponentInfo from "../../.storybook/components/component-info";

import SwitchArgtypes from "./switch.argtypes";

type StoryComponentType = StoryObj<typeof Switch>;

export default {
    title: "Switch / Switch",
    component: Switch,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    argTypes: SwitchArgtypes,
} as Meta<typeof Switch>;

export const Default: StoryComponentType = {
    args: {
        checked: false,
        onChange: () => {},
    },
};

export const Controlled: StoryComponentType = () => {
    const [checked, setChecked] = React.useState(false);

    return <Switch checked={checked} onChange={setChecked} />;
};

Controlled.parameters = {
    docs: {
        description: {
            story: `The switch is a controlled component, so state should be used to keep track of
            whether it is checked or not.`,
        },
    },
};

export const WithLabel: StoryComponentType = () => {
    const [checked, setChecked] = React.useState(false);

    return (
        <Switch
            checked={checked}
            onChange={setChecked}
            label="Getting Enough Sleep"
        />
    );
};

WithLabel.parameters = {
    docs: {
        description: {
            story: `The switch can have an optional label to the right. The label should not depend
            on the state of the switch.`,
        },
    },
};

export const Disabled: StoryComponentType = () => (
    <View style={styles.column}>
        <Switch
            checked={false}
            onChange={() => {}}
            label="Getting Enough Sleep"
            disabled={true}
        />
        <Strut size={Spacing.xSmall_8} />
        <Switch
            checked={true}
            onChange={() => {}}
            label="Superpowers"
            disabled={true}
        />
    </View>
);

Disabled.parameters = {
    docs: {
        description: {
            story: `The switch can be disabled.`,
        },
    },
};

const styles = StyleSheet.create({
    column: {
        flexDirection: "column",
        alignItems: "start",
    },
});
