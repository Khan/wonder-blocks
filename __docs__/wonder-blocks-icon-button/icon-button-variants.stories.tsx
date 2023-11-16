import * as React from "react";
import {StyleSheet} from "aphrodite";
import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from "@storybook/react";

import paperPlaneIcon from "@phosphor-icons/core/fill/paper-plane-tilt-fill.svg";
import {View} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {ThemeSwitcherContext, tokens} from "@khanacademy/wonder-blocks-theming";
import {HeadingLarge, LabelMedium} from "@khanacademy/wonder-blocks-typography";
import IconButton from "@khanacademy/wonder-blocks-icon-button";

/**
 * The following stories are used to generate the pseudo states for the
 * IconButton component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "IconButton / All Variants",
    parameters: {
        docs: {
            autodocs: false,
        },
    },
} as Meta;

type StoryComponentType = StoryObj<typeof IconButton>;

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
                            styles.gridRow,
                            light &&
                                (theme === "khanmigo"
                                    ? styles.darkKhanmigo
                                    : styles.darkDefault),
                        ]}
                    >
                        <LabelMedium
                            style={light && {color: tokens.color.white}}
                        >
                            {kind}-default
                        </LabelMedium>
                        <IconButton
                            icon={paperPlaneIcon}
                            onClick={action("clicked")}
                            kind={kind}
                            light={light}
                            color="default"
                        />
                    </View>
                    <View
                        style={[
                            styles.gridRow,
                            light &&
                                (theme === "khanmigo"
                                    ? styles.darkKhanmigo
                                    : styles.darkDefault),
                        ]}
                    >
                        <LabelMedium
                            style={light && {color: tokens.color.white}}
                        >
                            {kind}-destructive
                        </LabelMedium>
                        <IconButton
                            icon={paperPlaneIcon}
                            onClick={action("clicked")}
                            kind={kind}
                            light={light}
                            color="destructive"
                        />
                    </View>
                    <View
                        style={[
                            styles.gridRow,
                            light &&
                                (theme === "khanmigo"
                                    ? styles.darkKhanmigo
                                    : styles.darkDefault),
                        ]}
                    >
                        <LabelMedium
                            style={light && {color: tokens.color.white}}
                        >
                            {kind}-disabled
                        </LabelMedium>
                        <IconButton
                            icon={paperPlaneIcon}
                            onClick={action("clicked")}
                            kind={kind}
                            light={light}
                            disabled={true}
                        />
                    </View>
                </>
            )}
        </ThemeSwitcherContext.Consumer>
    );
};

const VariantsByTheme = ({themeName = "Default"}: {themeName?: string}) => (
    <View style={{marginBottom: Spacing.large_24}}>
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
        backgroundColor: tokens.color.darkBlue,
    },
    darkKhanmigo: {
        backgroundColor: tokens.color.eggplant,
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 250px)",
        gap: Spacing.large_24,
    },
    gridRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: Spacing.medium_16,
        justifyContent: "space-between",
        padding: Spacing.medium_16,
    },
});
