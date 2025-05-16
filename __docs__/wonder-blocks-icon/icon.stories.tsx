import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import {StyleSheet} from "aphrodite";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-icon/package.json";
import {Icon} from "@khanacademy/wonder-blocks-icon";
import {View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";

export default {
    title: "Packages / Icon / Icon",
    component: Icon,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
} as Meta<typeof Icon>;

type StoryComponentType = StoryObj<typeof Icon>;

export const Default: StoryComponentType = {
    args: {
        icon: "/logo.svg",
    },
};

export const Sizes: StoryComponentType = {
    render: () => {
        return (
            <View style={styles.container}>
                {(["small", "medium", "large", "xlarge"] as const).map(
                    (size) => (
                        <View key={size}>
                            <View style={styles.iconContainer}>
                                <LabelSmall>{size}</LabelSmall>
                                <Icon icon="/logo.svg" size={size} />
                            </View>
                        </View>
                    ),
                )}
            </View>
        );
    },
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: sizing.size_360,
    },
    iconContainer: {
        alignItems: "center",
        gap: sizing.size_080,
    },
});
