import React from "react";
import type {StrictArgs} from "@storybook/react";
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

type Props = {
    scenarios: {name: string; props: StrictArgs}[];
    children: (props: any, name: string) => React.ReactNode;
};

/**
 * Useful for stories that show different scenarios.
 *
 * Normally, ScenariosLayout is used for different cases at rest state.
 */
export const ScenariosLayout = (props: Props) => {
    const {scenarios, children} = props;
    return (
        <View style={styles.container}>
            {scenarios.map((scenario) => {
                return (
                    <View key={scenario.name} style={styles.scenario}>
                        <LabelLarge>{scenario.name}</LabelLarge>
                        {children(scenario.props, scenario.name)}
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: sizing.size_200,
        alignItems: "flex-start",
    },
    scenario: {
        gap: sizing.size_100,
        maxWidth: "100%",
    },
});
