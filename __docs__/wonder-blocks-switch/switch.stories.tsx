import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";
import {StyleSheet} from "aphrodite";
import {expect, userEvent, within} from "storybook/test";
import magnifyingGlassIcon from "@phosphor-icons/core/bold/magnifying-glass-bold.svg";

import Switch from "@khanacademy/wonder-blocks-switch";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import * as tokens from "@khanacademy/wonder-blocks-tokens";

import packageConfig from "../../packages/wonder-blocks-switch/package.json";
import ComponentInfo from "../components/component-info";

import SwitchArgtypes from "./switch.argtypes";

type StoryComponentType = StoryObj<typeof Switch>;

/**
 * A Switch is an input that allows users to toggle between two states,
 * typically `on` and `off`. It is a controlled component, meaning that the
 * state of the switch is controlled by the `checked` prop. See the Best
 * Practices tab for more information on how to use this component with labels,
 * descriptions, tooltips, and more.
 *
 * ### Usage
 * ```jsx
 *
 *import Switch from "@khanacademy/wonder-blocks-switch";
 *
 *<Switch checked={false} onChange={() => {}} />
 *```
 */
export default {
    title: "Packages / Switch",
    component: Switch,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            // These stories are being tested in
            // switch-testing-snapshots.stories.tsx
            disableSnapshot: true,
        },
    },
    argTypes: SwitchArgtypes,
} as Meta<typeof Switch>;

function ControlledDefaultSwitch(args: PropsFor<typeof Switch>) {
    const [checked, setChecked] = React.useState(args.checked);

    // Update the checked state when the args change.
    React.useEffect(() => {
        setChecked(args.checked);
    }, [args.checked]);

    return <Switch {...args} checked={checked} onChange={setChecked} />;
}

/**
 * The switch has a default state that can be controlled by the `checked` prop.
 */
export const Default: StoryComponentType = {
    args: {
        "aria-label": "Example",
        checked: false,
        onChange: () => {},
    },
    render: ControlledDefaultSwitch,
    decorators: [
        (Story) => (
            <View>
                <Story />
            </View>
        ),
    ],
};

/**
 * The switch is a controlled component, so state should
 * be used to keep track of whether it is checked or not.
 * The `onChange` prop is optional in case the toggle will
 * be wrapped in a larger clickable component.
 */
export const Controlled: StoryComponentType = {
    render: function Render() {
        const [checkedOne, setCheckedOne] = React.useState(false);
        const [checkedTwo, setCheckedTwo] = React.useState(false);

        return (
            <View style={styles.column}>
                <Switch
                    aria-label="Example"
                    checked={checkedOne}
                    onChange={setCheckedOne}
                />
                <Switch
                    testId="test-switch"
                    aria-label="test switch"
                    checked={checkedTwo}
                    onChange={setCheckedTwo}
                    icon={<PhosphorIcon icon={magnifyingGlassIcon} />}
                />
            </View>
        );
    },
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);

        const switchWithIcon = canvas.getByTestId("test-switch");
        const switchInput = canvas.getByRole("switch", {name: "test switch"});

        await userEvent.tab();
        await userEvent.tab();

        expect(switchInput).toHaveProperty("checked", false);

        await userEvent.click(switchWithIcon);
        // Wait for animations to finish
        await new Promise((resolve) => setTimeout(resolve, 150));

        expect(switchInput).toHaveProperty("checked", true);
    },
};

/**
 * The switch can be disabled. Note that we use `aria-disabled` to allow the
 * switch to receive focus even when disabled. This helps Screen Readers to
 * announce the state of the switch.
 */
export const Disabled: StoryComponentType = {
    render: () => (
        <View style={styles.column}>
            <Switch
                aria-label="Disabled example"
                checked={false}
                disabled={true}
            />
            <Switch
                aria-label="Checked Disabled example"
                checked={true}
                disabled={true}
            />
            <Switch
                aria-label="Disabled example"
                checked={false}
                disabled={true}
                icon={<PhosphorIcon icon={magnifyingGlassIcon} />}
            />
            <Switch
                aria-label="Checked example"
                checked={true}
                disabled={true}
                icon={<PhosphorIcon icon={magnifyingGlassIcon} />}
            />
        </View>
    ),
};

/**
 * The switch can take a `PhosphorIcon` element which will be rendered inside
 * the slider.
 */
export const WithIcon: StoryComponentType = {
    render: () => {
        return (
            <View style={styles.column}>
                <Switch
                    aria-label="Example"
                    checked={false}
                    icon={<PhosphorIcon icon={magnifyingGlassIcon} />}
                />

                <Switch
                    aria-label="Checked example"
                    checked={true}
                    icon={<PhosphorIcon icon={magnifyingGlassIcon} />}
                />
            </View>
        );
    },
};

const styles = StyleSheet.create({
    column: {
        flexDirection: "column",
        alignItems: "start",
        gap: tokens.sizing.size_080,
    },
});
