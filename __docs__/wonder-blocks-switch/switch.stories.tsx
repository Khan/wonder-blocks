import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import {StyleSheet} from "aphrodite";
import {expect} from "@storybook/jest";
import {userEvent, within} from "@storybook/testing-library";

import Switch from "@khanacademy/wonder-blocks-switch";
import {RenderStateRoot, View} from "@khanacademy/wonder-blocks-core";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import {ThemeSwitcherContext, tokens} from "@khanacademy/wonder-blocks-theming";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";

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
        <Switch checked={true} disabled={true} />
        <Switch
            checked={false}
            disabled={true}
            icon={<Icon icon={icons.search} />}
        />
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

export const KhanmigoTheme: StoryComponentType = () => {
    const [checkedOne, setCheckedOne] = React.useState(false);
    const [checkedTwo, setCheckedTwo] = React.useState(false);

    return (
        <ThemeSwitcherContext.Provider value="khanmigo">
            <View style={[styles.dark, styles.row]}>
                <View style={styles.column}>
                    <LabelMedium style={styles.textLight}>Default</LabelMedium>
                    <Switch checked={checkedOne} onChange={setCheckedOne} />
                    <Switch checked={true} />
                    <Switch checked={false} disabled={true} />
                    <Switch checked={true} disabled={true} />
                </View>
                <View style={styles.column}>
                    <LabelMedium style={styles.textLight}>
                        With Icon
                    </LabelMedium>
                    <Switch
                        checked={checkedTwo}
                        onChange={setCheckedTwo}
                        icon={<Icon icon={icons.search} />}
                    />
                    <Switch
                        checked={true}
                        icon={<Icon icon={icons.search} />}
                    />
                    <Switch
                        checked={false}
                        disabled={true}
                        icon={<Icon icon={icons.search} />}
                    />
                    <Switch
                        checked={true}
                        disabled={true}
                        icon={<Icon icon={icons.search} />}
                    />
                </View>
            </View>
        </ThemeSwitcherContext.Provider>
    );
};

KhanmigoTheme.parameters = {
    docs: {
        description: {
            story: `The switch supports the \`khanmigo\` theme.`,
        },
    },
};

const styles = StyleSheet.create({
    column: {
        flexDirection: "column",
        alignItems: "start",
        gap: tokens.spacing.xSmall_8,
    },
    dark: {
        backgroundColor: tokens.color.eggplant,
        padding: tokens.spacing.xSmall_8,
    },
    row: {
        flexDirection: "row",
        gap: tokens.spacing.medium_16,
    },
    textLight: {
        color: tokens.color.white,
    },
});
