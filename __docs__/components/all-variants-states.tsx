import * as React from "react";
import {StyleSheet} from "aphrodite";
import {AllVariants, type Props as AllVariantsProps} from "./all-variants";
import {
    HeadingLarge,
    HeadingMedium,
} from "@khanacademy/wonder-blocks-typography";
import {View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

type Props = Omit<AllVariantsProps, "children"> & {
    /**
     * The children as a function that receives the state props used to render
     * each variant of the component.
     */
    children: (props: any, name: string, isRtl?: boolean) => React.ReactNode;

    /**
     * The states to render.
     */
    states?: State[];
};

type State = {name: string; id: string};

export const commonStates = {
    base: {name: "Base", id: "base"},
    hover: {name: "Hover", id: "hover"},
    focus: {name: "Focus", id: "focus"},
    press: {name: "Press", id: "press"},
    hoverAndFocus: {name: "Hover and Focus", id: "hover-and-focus"},
};

export const defaultPseudoStates = {
    hover: [
        `#${commonStates.hover.id} *`,
        `#${commonStates.hoverAndFocus.id} *`,
    ],
    focusVisible: [
        `#${commonStates.focus.id} *`,
        `#${commonStates.hoverAndFocus.id} *`,
    ],
    active: [`#${commonStates.press.id} *`],
};

export const defaultStates: State[] = [
    commonStates.base,
    commonStates.hover,
    commonStates.focus,
    commonStates.press,
    commonStates.hoverAndFocus,
];

export const AllVariantsStates = (props: Props) => {
    const {children, rows, columns, layout, states = defaultStates} = props;

    return (
        <View style={styles.container}>
            {states.map((state) => (
                <View key={state.id} id={state.id} style={styles.state}>
                    <HeadingMedium>{state.name}</HeadingMedium>
                    <AllVariants rows={rows} columns={columns} layout={layout}>
                        {(props, name) => children(props, name)}
                    </AllVariants>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: sizing.size_400,
        alignItems: "flex-start",
    },
    state: {
        gap: sizing.size_100,
    },
});
