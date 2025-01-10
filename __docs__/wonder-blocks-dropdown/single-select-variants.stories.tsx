import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import {View} from "@khanacademy/wonder-blocks-core";
import {ThemeSwitcherContext} from "@khanacademy/wonder-blocks-theming";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingLarge, LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {SingleSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";

/**
 * The following stories are used to generate the pseudo states for the
 * single select component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Dropdown / SingleSelect / All Variants",
    parameters: {
        docs: {
            autodocs: false,
        },
    },
} as Meta;

type StoryComponentType = StoryObj<typeof SingleSelect>;

const defaultProps = {
    placeholder: "Placeholder",
    onChange: () => {},
};

const selectItems = [
    <OptionItem label="item 1" value="1" />,
    <OptionItem label="item 2" value="2" />,
    <OptionItem label="item 3" value="3" />,
];

const KindVariants = ({light}: {light: boolean}) => {
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
                        <LabelMedium style={light && {color: color.white}}>
                            Default
                        </LabelMedium>
                        <SingleSelect {...defaultProps} light={light}>
                            {selectItems}
                        </SingleSelect>
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
                        <LabelMedium style={light && {color: color.white}}>
                            Disabled
                        </LabelMedium>
                        <SingleSelect
                            {...defaultProps}
                            light={light}
                            disabled={true}
                        >
                            {selectItems}
                        </SingleSelect>
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
                        <LabelMedium style={light && {color: color.white}}>
                            Error
                        </LabelMedium>
                        <SingleSelect
                            {...defaultProps}
                            light={light}
                            error={true}
                        >
                            {selectItems}
                        </SingleSelect>
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
                        <LabelMedium style={light && {color: color.white}}>
                            Value selected
                        </LabelMedium>
                        <SingleSelect
                            {...defaultProps}
                            selectedValue="1"
                            light={light}
                        >
                            {selectItems}
                        </SingleSelect>
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
            <KindVariants light={false} />
            <KindVariants light={true} />
        </View>
    </View>
);

const AllVariants = () => (
    <>
        <VariantsByTheme />
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
        gridTemplateColumns: "repeat(4, 250px)",
        gap: spacing.large_24,
    },
    gridRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.medium_16,
        justifyContent: "space-between",
        padding: spacing.medium_16,
    },
});
