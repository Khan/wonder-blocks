import * as React from "react";
import {StyleSheet} from "aphrodite";
import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from "@storybook/react";

import paperPlaneIcon from "@phosphor-icons/core/fill/paper-plane-tilt-fill.svg";
import {allModes} from "../../.storybook/modes";

import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {ThemeSwitcherContext} from "@khanacademy/wonder-blocks-theming";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingLarge, LabelMedium} from "@khanacademy/wonder-blocks-typography";
import Button from "@khanacademy/wonder-blocks-button";

/**
 * The following stories are used to generate the pseudo states for the
 * Button component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Button / Button - All Variants",
    parameters: {
        chromatic: {
            // NOTE: This is required to prevent Chromatic from cutting off the
            // dark background in screenshots (accounts for all the space taken
            // by the variants).
            modes: {
                wide: allModes.wide,
            },
        },
    },
    tags: ["!autodocs"],
} as Meta;

type StoryComponentType = StoryObj<typeof Button>;

type ButtonProps = PropsFor<typeof Button>;

const sizes: Array<ButtonProps["size"]> = ["medium", "small", "large"];
const kinds: Array<ButtonProps["kind"]> = ["primary", "secondary", "tertiary"];

const colors: Array<ButtonProps["color"]> = ["default", "destructive"];

function VariantsGroup({
    color = "default",
    disabled = false,
    label = "Button",
    size,
}: {
    color?: ButtonProps["color"];
    disabled?: ButtonProps["disabled"];
    label?: string;
    size: ButtonProps["size"];
}) {
    const category = disabled ? "disabled" : color;

    return (
        <View style={[styles.variants]}>
            <LabelMedium style={styles.label}>
                {size} / {category}
            </LabelMedium>
            {kinds.map((kind) => (
                <React.Fragment key={kind}>
                    <Button
                        onClick={action("clicked")}
                        disabled={disabled}
                        kind={kind}
                        color={color}
                        size={size}
                    >
                        {label}
                    </Button>
                    {/* startIcon */}
                    <Button
                        onClick={action("clicked")}
                        disabled={disabled}
                        kind={kind}
                        color={color}
                        size={size}
                        startIcon={paperPlaneIcon}
                    >
                        {label}
                    </Button>
                    {/* endIcon */}
                    <Button
                        onClick={action("clicked")}
                        disabled={disabled}
                        kind={kind}
                        color={color}
                        size={size}
                        endIcon={paperPlaneIcon}
                    >
                        {label}
                    </Button>
                </React.Fragment>
            ))}
        </View>
    );
}

const VariantsByTheme = ({themeName = "Default"}: {themeName?: string}) => (
    <View style={{marginBottom: spacing.large_24}}>
        <HeadingLarge>{themeName} theme</HeadingLarge>
        {sizes.map((size) => (
            <React.Fragment key={size}>
                {colors.map((color) => (
                    <VariantsGroup key={color} size={size} color={color} />
                ))}
                <VariantsGroup size={size} disabled={true} />
            </React.Fragment>
        ))}
    </View>
);

const AllVariants = () => (
    <>
        <VariantsByTheme />
        <ThemeSwitcherContext.Provider value="khanmigo">
            <VariantsByTheme themeName="Khanmigo" />
        </ThemeSwitcherContext.Provider>
    </>
);

export const Default: StoryComponentType = {
    render: AllVariants,
};

export const Hover: StoryComponentType = {
    render: AllVariants,
    parameters: {pseudo: {hover: true}},
};

export const Focus: StoryComponentType = {
    render: AllVariants,
    parameters: {pseudo: {focusVisible: true}},
};

export const HoverFocus: StoryComponentType = {
    name: "Hover + Focus",
    render: AllVariants,
    parameters: {pseudo: {hover: true, focusVisible: true}},
};

export const Active: StoryComponentType = {
    render: AllVariants,
    parameters: {pseudo: {active: true}},
};

const styles = StyleSheet.create({
    variants: {
        justifyContent: "flex-start",
        padding: spacing.medium_16,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xLarge_32,
    },
    label: {
        minWidth: 150,
    },
});
