import * as React from "react";

import {StyleSheet} from "aphrodite";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {AllVariants} from "./all-variants";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";

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
    focusWithin: [
        `.${commonStates.focus.className}`,
        `.${commonStates.hoverAndFocus.className}`,
        `.${commonStates.pressAndFocus.className}`,
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
    styles: stylesProp,
    title,
    layout = "responsive",
}: Props) {
    return (
        <View style={styles.flexStartContainer}>
            <AllVariants
                rows={rows}
                columns={columns}
                styles={{
                    rowHeader: [styles.rowHeader, stylesProp?.rowHeader],
                    cell: [styles.cell, stylesProp?.cell],
                }}
                title={title}
                layout={layout}
            >
                {({props, name}) => {
                    return (
                        <View style={[styles.container]}>
                            {states.map(({className, name: stateName}) => (
                                <View
                                    key={name}
                                    className={className}
                                    style={styles.flexStartContainer}
                                >
                                    <LabelSmall style={styles.label}>
                                        {name}
                                    </LabelSmall>
                                    <View style={styles.content}>
                                        {children({
                                            props,
                                            className,
                                            name: `${name}-${stateName}`,
                                        })}
                                    </View>
                                </View>
                            ))}
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
    },
    container: {
        gap: sizing.size_160,
    },
    flexStartContainer: {
        alignItems: "flex-start",
    },
    label: {
        paddingBlockEnd: sizing.size_080,
        color: semanticColor.text.secondary,
    },
    content: {
        maxWidth: "100%",
    },
    cell: {
        alignContent: "flex-start",
    },
});
