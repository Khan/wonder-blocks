import * as React from "react";
import type {StrictArgs} from "@storybook/react-vite";
import {StyleSheet} from "aphrodite";
import {StyleType, View} from "@khanacademy/wonder-blocks-core";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

type Props = {
    scenarios: {
        name: string;
        props: StrictArgs;
        decorator?: React.ReactElement;
    }[];
    children: (props: any, name: string) => React.ReactNode;
    styles?: {
        root?: StyleType;
    };
};

/**
 * Useful for stories that show different scenarios.
 *
 * Normally, ScenariosLayout is used for different cases at rest state.
 */
export const ScenariosLayout = (props: Props) => {
    const {scenarios, children, styles: stylesProp} = props;
    return (
        <View style={[styles.container, stylesProp?.root]}>
            {scenarios.map((scenario) => {
                const renderer = children(scenario.props, scenario.name);
                const {decorator: Decorator} = scenario;
                return (
                    <View key={scenario.name} style={styles.scenario}>
                        <LabelLarge>{scenario.name}</LabelLarge>
                        {Decorator
                            ? React.cloneElement(Decorator, {
                                  children: renderer,
                              })
                            : renderer}
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: sizing.size_160,
        alignItems: "flex-start",
    },
    scenario: {
        gap: sizing.size_080,
        maxWidth: "100%",
    },
});
