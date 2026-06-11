import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";

import caretDownIcon from "@phosphor-icons/core/regular/caret-down.svg";
import {View} from "@khanacademy/wonder-blocks-core";
import {
    ActionMenu,
    ActionItem,
    CustomOpener,
    OptionItem,
    SingleSelect,
} from "@khanacademy/wonder-blocks-dropdown";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import packageConfig from "../../packages/wonder-blocks-dropdown/package.json";
import ComponentInfo from "../components/component-info";
import CustomOpenerArgTypes from "./custom-opener.argtypes";

type Story = StoryObj<typeof CustomOpener>;

/**
 * `CustomOpener` is a blank-slate button primitive for use inside the `opener`
 * render prop of `SingleSelect`, `MultiSelect`, and `ActionMenu`.
 *
 * It provides correct semantics (`<button>`), the WB focus ring via
 * `:focus-visible`, `aria-disabled` support, and ref forwarding — all required
 * by the dropdown opener wiring.
 *
 * **Prefer the default opener** when it meets your design needs. `CustomOpener`
 * is intended for cases where the default visual design cannot be used.
 *
 * ### States your implementation must handle
 *
 * The default opener automatically handles all interactive states. When you use
 * `CustomOpener`, you are responsible for styling:
 *
 * - **Hover** — use the `hovered` value from the `opener` render prop
 * - **Pressed** — use the `pressed` value from the `opener` render prop
 * - **Disabled** — apply muted colors via `semanticColor` disabled tokens via
 *   the `style` prop (`cursor: not-allowed` is included automatically)
 *
 * Focus ring styles are provided automatically — you do not need to add them.
 */
export default {
    title: "Packages / Dropdown / CustomOpener",
    component: CustomOpener,
    argTypes: CustomOpenerArgTypes,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            disableSnapshot: true,
        },
    },
} as Meta<typeof CustomOpener>;

/**
 * A minimal `CustomOpener` inside a `SingleSelect`. The opener uses
 * `hovered` and `pressed` from the render prop to adjust background color.
 *
 * The WB focus ring is applied automatically when the button receives
 * keyboard focus — no extra wiring needed.
 */
export const Default: Story = {
    render: function Render() {
        const [value, setValue] = React.useState<string>("");

        return (
            <SingleSelect
                aria-label="Fruit"
                placeholder="Choose a fruit"
                selectedValue={value}
                onChange={setValue}
                opener={({hovered, pressed, text}) => (
                    <CustomOpener
                        styles={{
                            root: [
                                styles.opener,
                                hovered && styles.openerHovered,
                                pressed && styles.openerPressed,
                            ],
                        }}
                    >
                        <BodyText tag="span">{text}</BodyText>
                        <PhosphorIcon icon={caretDownIcon} size="small" />
                    </CustomOpener>
                )}
            >
                <OptionItem label="Mango" value="mango" />
                <OptionItem label="Strawberry" value="strawberry" />
                <OptionItem label="Pear" value="pear" />
            </SingleSelect>
        );
    },
    parameters: {
        chromatic: {disableSnapshot: true},
    },
};

/**
 * When `disabled` is set on the parent dropdown, it is forwarded to
 * `CustomOpener` via `aria-disabled`. The opener stays focusable but
 * non-interactive.
 *
 * You must supply visual disabled styles yourself via `styles.root` —
 * `CustomOpener` only sets `cursor: not-allowed`. In this example, the text
 * color and border are muted using `semanticColor` disabled tokens.
 */
export const Disabled: Story = {
    render: function Render() {
        return (
            <SingleSelect
                aria-label="Fruit"
                placeholder="Choose a fruit"
                selectedValue=""
                onChange={() => {}}
                disabled
                opener={({text}) => (
                    <CustomOpener
                        styles={{root: [styles.opener, styles.openerDisabled]}}
                    >
                        <BodyText tag="span">{text}</BodyText>
                        <PhosphorIcon icon={caretDownIcon} size="small" />
                    </CustomOpener>
                )}
            >
                <OptionItem label="Mango" value="mango" />
                <OptionItem label="Strawberry" value="strawberry" />
            </SingleSelect>
        );
    },
    parameters: {
        chromatic: {disableSnapshot: true},
    },
};

/**
 * A full state demo showing how the opener should look in rest, hover,
 * pressed, focus, and disabled states side-by-side.
 *
 * Because `CustomOpener` gives you a blank slate, **all visual states except
 * focus are your responsibility**. This story shows a reference implementation
 * using `semanticColor` tokens.
 */
export const AllStates: Story = {
    render: function Render() {
        const states = [
            {label: "Rest", hovered: false, pressed: false, disabled: false},
            {label: "Hover", hovered: true, pressed: false, disabled: false},
            {label: "Pressed", hovered: false, pressed: true, disabled: false},
            {label: "Disabled", hovered: false, pressed: false, disabled: true},
        ];

        return (
            <View style={styles.allStatesContainer}>
                {states.map(({label, hovered, pressed, disabled}) => (
                    <View key={label} style={styles.stateRow}>
                        <BodyText style={styles.stateLabel}>{label}</BodyText>
                        <CustomOpener
                            disabled={disabled}
                            styles={{
                                root: [
                                    styles.opener,
                                    hovered && styles.openerHovered,
                                    pressed && styles.openerPressed,
                                    disabled && styles.openerDisabled,
                                ],
                            }}
                        >
                            <BodyText tag="span">Choose a fruit</BodyText>
                            <PhosphorIcon icon={caretDownIcon} size="small" />
                        </CustomOpener>
                    </View>
                ))}
                <View style={styles.stateRow}>
                    <BodyText style={styles.stateLabel}>
                        Focus (tab to see)
                    </BodyText>
                    <CustomOpener styles={{root: styles.opener}}>
                        <BodyText tag="span">Choose a fruit</BodyText>
                        <PhosphorIcon icon={caretDownIcon} size="small" />
                    </CustomOpener>
                </View>
            </View>
        );
    },
    parameters: {
        chromatic: {disableSnapshot: true},
    },
};

/**
 * A full implementation inside an `ActionMenu`, demonstrating that
 * `CustomOpener` works with all three dropdown components (`SingleSelect`,
 * `MultiSelect`, `ActionMenu`).
 */
export const WithActionMenu: Story = {
    render: function Render() {
        const [opened, setOpened] = React.useState(false);
        return (
            <ActionMenu
                menuText="Actions"
                opened={opened}
                onToggle={setOpened}
                opener={({hovered, pressed, text}) => (
                    <CustomOpener
                        styles={{
                            root: [
                                styles.opener,
                                hovered && styles.openerHovered,
                                pressed && styles.openerPressed,
                            ],
                        }}
                    >
                        <BodyText tag="span">{text}</BodyText>
                        <PhosphorIcon icon={caretDownIcon} size="small" />
                    </CustomOpener>
                )}
            >
                <ActionItem label="Edit" onClick={() => {}} />
                <ActionItem label="Delete" onClick={() => {}} />
            </ActionMenu>
        );
    },
    parameters: {
        chromatic: {disableSnapshot: true},
    },
};

const styles = StyleSheet.create({
    opener: {
        display: "inline-flex",
        alignItems: "center",
        gap: sizing.size_080,
        padding: `${sizing.size_080}px ${sizing.size_120}px`,
        border: `${border.width.thin} solid ${semanticColor.core.border.neutral.default}`,
        borderRadius: sizing.size_040,
        color: semanticColor.core.foreground.neutral.default,
        backgroundColor: semanticColor.core.background.base.default,
    },
    openerHovered: {
        backgroundColor:
            semanticColor.action.secondary.progressive.hover.background,
        color: semanticColor.action.secondary.progressive.hover.foreground,
    },
    openerPressed: {
        backgroundColor:
            semanticColor.action.secondary.progressive.press.background,
        color: semanticColor.action.secondary.progressive.press.foreground,
    },
    openerDisabled: {
        color: semanticColor.core.foreground.neutral.subtle,
        borderColor: semanticColor.core.border.neutral.subtle,
        backgroundColor: semanticColor.core.background.base.default,
        cursor: "not-allowed",
    },
    allStatesContainer: {
        gap: sizing.size_160,
        alignItems: "flex-start",
    },
    stateRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: sizing.size_160,
    },
    stateLabel: {
        width: 80,
        color: semanticColor.core.foreground.neutral.subtle,
    },
});
