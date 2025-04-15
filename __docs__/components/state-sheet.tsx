import * as React from "react";

import {StyleSheet} from "aphrodite";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {AllVariants} from "./all-variants";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelMedium} from "@khanacademy/wonder-blocks-typography";

export const commonStates = {
    rest: {name: "Rest", className: "rest"},
    hover: {name: "Hover", className: "hover"},
    press: {name: "Press", className: "press"},
    focus: {name: "Focus", className: "focusVisible"},
    hoverAndFocus: {name: "Hover + Focus", className: "hover-focusVisible"},
    pressAndFocus: {name: "Press + Focus", className: "press-focusVisible"},
};

/**
 * The default pseudo states for the `StateSheet` component.
 *
 * This is used to generate the pseudo states for the component in Chromatic.
 * Each className is a CSS class that is applied to the component to simulate
 * the pseudo state.
 *
 * @see https://github.com/chromaui/storybook-addon-pseudo-states?tab=readme-ov-file#targeting-specific-elements
 */
export const defaultPseudoStates = {
    hover: [
        `.${commonStates.hover.className} *`,
        `.${commonStates.hoverAndFocus.className} *`,
    ],
    focusVisible: [
        `.${commonStates.focus.className} *`,
        `.${commonStates.hoverAndFocus.className} *`,
        `.${commonStates.pressAndFocus.className} *`,
    ],
    active: [
        `.${commonStates.press.className} *`,
        `.${commonStates.pressAndFocus.className} *`,
    ],
};

/**
 * The default states that will be included in the `StateSheet` component.
 */
export const defaultStates: Array<State> = Object.values(commonStates);

/**
 * A state representing a pseudo state of a component.
 * e.g. `rest`, `hover`, `press`, `focus`, etc.
 */
type State = {name: string; className: string};

/**
 * The labels for the states presented in the row headers in the `StateSheet`
 * component.
 */
function StateLabels({
    states,
    variant,
}: {
    states: Array<State>;
    variant: string | React.ReactNode;
}) {
    return (
        <View style={styles.stateLabelsContainer}>
            <LabelLarge style={{alignSelf: "center"}}>{variant}</LabelLarge>
            <View
                style={[
                    styles.rowHeaderStates,
                    {gridTemplateRows: `repeat(${states.length}, 40px)`},
                ]}
            >
                {states.map(({name}, index) => (
                    <LabelMedium key={index}>{name}</LabelMedium>
                ))}
            </View>
        </View>
    );
}

type Props = PropsFor<typeof AllVariants> & {
    /**
     * The states to display in the table as rows.
     */
    states?: Array<State>;
};

/**
 * A table that displays all possible states of a component.
 */
export function StateSheet({
    children,
    columns,
    rows,
    states = defaultStates,
    title,
}: Props) {
    // Override the default row headers to include the state labels.
    const rowsWithStateLabels = rows.map(({name, props}) => ({
        name: <StateLabels variant={name} states={states} />,
        props,
    }));

    return (
        <View>
            <AllVariants
                rows={rowsWithStateLabels}
                columns={columns}
                styles={{
                    rowHeader: styles.rowHeader,
                }}
                title={title}
            >
                {({props}) => {
                    return (
                        <View style={styles.container}>
                            {states.map(({className, name}) =>
                                children({
                                    props,
                                    className,
                                    name,
                                }),
                            )}
                        </View>
                    );
                }}
            </AllVariants>
        </View>
    );
}

const styles = StyleSheet.create({
    rowHeader: {
        verticalAlign: "top",
        padding: 0,
    },
    container: {
        gap: sizing.size_160,
    },

    stateLabelsContainer: {
        flexDirection: "row",
        gap: sizing.size_160,
        padding: sizing.size_160,
        justifyContent: "space-between",
        background: semanticColor.surface.secondary,
        borderTop: `${sizing.size_010} solid ${semanticColor.border.strong}`,
    },
    rowHeaderStates: {
        gap: sizing.size_160,
        display: "grid",
        alignItems: "center",
        textAlign: "right",
    },
});
