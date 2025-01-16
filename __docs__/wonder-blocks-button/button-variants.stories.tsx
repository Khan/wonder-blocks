import * as React from "react";
import {StyleSheet} from "aphrodite";
import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from "@storybook/react";

import paperPlaneIcon from "@phosphor-icons/core/fill/paper-plane-tilt-fill.svg";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {ThemeSwitcherContext} from "@khanacademy/wonder-blocks-theming";
import {color, semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingLarge, LabelMedium} from "@khanacademy/wonder-blocks-typography";
import Button from "@khanacademy/wonder-blocks-button";

/**
 * The following stories are used to generate the pseudo states for the
 * Button component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Button / All Variants",
    parameters: {
        docs: {
            autodocs: false,
        },
        chromatic: {
            // NOTE: This is required to prevent Chromatic from cutting off the
            // dark background in screenshots (accounts for all the space taken
            // by the variants).
            viewports: [1700],
        },
    },
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
    light,
    size,
}: {
    color?: ButtonProps["color"];
    disabled?: ButtonProps["disabled"];
    label?: string;
    light: boolean;
    size: ButtonProps["size"];
}) {
    const theme = React.useContext(ThemeSwitcherContext);
    const category = disabled ? "disabled" : color;

    return (
        <View
            style={[
                styles.variants,
                light &&
                    (theme === "khanmigo"
                        ? styles.darkKhanmigo
                        : styles.darkDefault),
            ]}
        >
            <LabelMedium style={[styles.label, light && styles.inverseLabel]}>
                {size} / {category}
            </LabelMedium>
            {kinds.map((kind) => (
                <React.Fragment key={kind}>
                    <Button
                        onClick={action("clicked")}
                        disabled={disabled}
                        kind={kind}
                        light={light}
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
                        light={light}
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
                        light={light}
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

const KindVariants = ({light}: {light: boolean}) => {
    return (
        <>
            {sizes.map((size) => (
                <>
                    {colors.map((color) => (
                        <>
                            <VariantsGroup
                                size={size}
                                color={color}
                                light={light}
                            />
                            {light && (
                                <VariantsGroup
                                    size={size}
                                    color={color}
                                    disabled={true}
                                    light={light}
                                />
                            )}
                        </>
                    ))}
                    {!light && (
                        <VariantsGroup
                            size={size}
                            disabled={true}
                            light={light}
                        />
                    )}
                </>
            ))}
        </>
    );
};

const VariantsByTheme = ({themeName = "Default"}: {themeName?: string}) => (
    <View style={{marginBottom: spacing.large_24}}>
        <HeadingLarge>{themeName} theme</HeadingLarge>
        <KindVariants light={false} />
        <KindVariants light={true} />
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
    darkDefault: {
        backgroundColor: color.darkBlue,
    },
    darkKhanmigo: {
        backgroundColor: color.eggplant,
    },
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
    inverseLabel: {
        color: semanticColor.text.inverse,
    },
});
