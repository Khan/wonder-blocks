import * as React from "react";
import {StyleSheet} from "aphrodite";
import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from "@storybook/react";

import paperPlaneIcon from "@phosphor-icons/core/fill/paper-plane-tilt-fill.svg";
import {View} from "@khanacademy/wonder-blocks-core";
import {ThemeSwitcherContext} from "@khanacademy/wonder-blocks-theming";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingLarge, LabelMedium} from "@khanacademy/wonder-blocks-typography";
import IconButton from "@khanacademy/wonder-blocks-icon-button";

/**
 * The following stories are used to generate the pseudo states for the
 * IconButton component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / IconButton / All Variants",
    parameters: {
        docs: {
            autodocs: false,
        },
    },
} as Meta;

type StoryComponentType = StoryObj<typeof IconButton>;

const sizes: ("xsmall" | "small" | "medium" | "large")[] = [
    "xsmall",
    "small",
    "medium",
    "large",
];

const KindVariants = ({
    kind,
    light,
}: {
    kind: "primary" | "secondary" | "tertiary";
    light: boolean;
}) => {
    return (
        <ThemeSwitcherContext.Consumer>
            {(theme) => (
                <>
                    <View
                        style={[
                            styles.gridCol,
                            light &&
                                (theme === "khanmigo"
                                    ? styles.darkKhanmigo
                                    : styles.darkDefault),
                        ]}
                    >
                        <LabelMedium style={light && {color: color.white}}>
                            {kind}-default
                        </LabelMedium>
                        <View style={[styles.iconButtons]}>
                            {sizes.map((size) => (
                                <IconButton
                                    aria-label="Send"
                                    icon={paperPlaneIcon}
                                    onClick={action("clicked")}
                                    kind={kind}
                                    light={light}
                                    color="default"
                                    size={size}
                                    key={size}
                                />
                            ))}
                        </View>
                    </View>
                    <View
                        style={[
                            styles.gridCol,
                            light &&
                                (theme === "khanmigo"
                                    ? styles.darkKhanmigo
                                    : styles.darkDefault),
                        ]}
                    >
                        <LabelMedium style={light && {color: color.white}}>
                            {kind}-destructive
                        </LabelMedium>
                        <View style={[styles.iconButtons]}>
                            {sizes.map((size) => (
                                <IconButton
                                    aria-label="Send"
                                    icon={paperPlaneIcon}
                                    onClick={action("clicked")}
                                    kind={kind}
                                    light={light}
                                    color="destructive"
                                    size={size}
                                    key={size}
                                />
                            ))}
                        </View>
                    </View>
                    <View
                        style={[
                            styles.gridCol,
                            light &&
                                (theme === "khanmigo"
                                    ? styles.darkKhanmigo
                                    : styles.darkDefault),
                        ]}
                    >
                        <LabelMedium style={light && {color: color.white}}>
                            {kind}-disabled
                        </LabelMedium>
                        <View style={[styles.iconButtons]}>
                            {sizes.map((size) => (
                                <IconButton
                                    aria-label="Send"
                                    icon={paperPlaneIcon}
                                    onClick={action("clicked")}
                                    kind={kind}
                                    light={light}
                                    disabled={true}
                                    size={size}
                                    key={size}
                                />
                            ))}
                        </View>
                    </View>
                </>
            )}
        </ThemeSwitcherContext.Consumer>
    );
};

const VariantsByTheme = ({themeName = "Default"}: {themeName?: string}) => (
    <View style={{marginBottom: spacing.large_24}}>
        <HeadingLarge>{themeName} theme</HeadingLarge>
        <View style={styles.grid}>
            <KindVariants kind="primary" light={false} />
            <KindVariants kind="secondary" light={false} />
            <KindVariants kind="tertiary" light={false} />
            <KindVariants kind="primary" light={true} />
        </View>
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
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 250px)",
        gap: spacing.large_24,
    },
    gridCol: {
        flexDirection: "column",
        alignItems: "center",
        gap: spacing.large_24,
        justifyContent: "space-between",
        padding: spacing.medium_16,
    },
    iconButtons: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xLarge_32,
    },
});
