import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import {StyleSheet} from "aphrodite";
import {expect} from "@storybook/jest";
import {userEvent, within} from "@storybook/testing-library";

import Switch from "@khanacademy/wonder-blocks-switch";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";

import packageConfig from "../../packages/wonder-blocks-switch/package.json";
import ComponentInfo from "../../.storybook/components/component-info";

import SwitchArgtypes from "./switch.argtypes";

type StoryComponentType = StoryObj<typeof Switch>;

export default {
    title: "Switch",
    component: Switch,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    decorators: [
        (Story) => (
            <RenderStateRoot>
                <Story />
            </RenderStateRoot>
        ),
    ],
    argTypes: SwitchArgtypes,
} as Meta<typeof Switch>;

export const Default: StoryComponentType = {
    args: {
        checked: false,
        onChange: () => {},
    },
};

export const Controlled: StoryComponentType = () => {
    const [checkedOne, setCheckedOne] = React.useState(false);
    const [checkedTwo, setCheckedTwo] = React.useState(false);

    return (
        <View style={styles.column}>
            <Switch checked={checkedOne} onChange={setCheckedOne} />
            <Strut size={Spacing.xSmall_8} />
            <Switch
                testId="test-switch"
                aria-label="test switch"
                checked={checkedTwo}
                onChange={setCheckedTwo}
                icon={<Icon icon={icons.search} />}
            />
        </View>
    );
};

Controlled.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);

    const switchWithIcon = canvas.getByTestId("test-switch");
    const switchInput = canvas.getByRole("switch", {name: "test switch"});

    await userEvent.tab();
    await userEvent.tab();

    expect(switchWithIcon).toHaveStyle(
        "background-color: rgba(33, 36, 44, 0.5)",
    );
    expect(switchWithIcon).toHaveStyle("outline: 2px solid rgb(24, 101, 242)");
    expect(switchInput).toHaveProperty("checked", false);

    await userEvent.click(switchWithIcon);
    // Wait for animations to finish
    await new Promise((resolve) => setTimeout(resolve, 150));

    expect(switchInput).toHaveProperty("checked", true);
    expect(switchWithIcon).toHaveStyle("background-color: rgb(24, 101, 242)");
};

Controlled.parameters = {
    docs: {
        description: {
            story: `The switch is a controlled component, so state should be used to keep track of
            whether it is checked or not. The \`onChange\` prop is optional in case the toggle
            will be wrapped in a larger clickable component.`,
        },
    },
};

export const Disabled: StoryComponentType = () => (
    <View style={styles.column}>
        <Switch checked={false} disabled={true} />
        <Strut size={Spacing.xSmall_8} />
        <Switch checked={true} disabled={true} />
        <Strut size={Spacing.xSmall_8} />
        <Switch
            checked={false}
            disabled={true}
            icon={<Icon icon={icons.search} />}
        />
        <Strut size={Spacing.xSmall_8} />
        <Switch
            checked={true}
            disabled={true}
            icon={<Icon icon={icons.search} />}
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

export const WithIcon: StoryComponentType = () => {
    return (
        <View style={styles.column}>
            <Switch checked={false} icon={<Icon icon={icons.search} />} />
            <Strut size={Spacing.xSmall_8} />
            <Switch checked={true} icon={<Icon icon={icons.search} />} />
        </View>
    );
};

WithIcon.parameters = {
    docs: {
        description: {
            story: `The switch can take an \`Icon\` element which will be rendered inside the slider.`,
        },
    },
};

const styles = StyleSheet.create({
    column: {
        flexDirection: "column",
        alignItems: "start",
    },
});
