import * as React from "react";
import {Meta, StoryObj} from "@storybook/react";
import info from "@phosphor-icons/core/regular/info.svg";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-styles/package.json";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";

export default {
    title: "Packages / Styles / Focus Styles",
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        docs: {
            canvas: {
                sourceState: "shown",
            },
        },
    },
} as Meta<any>;

type StoryComponentType = StoryObj<any>;

/**
 * ### `focus`
 * A global focus style that can be applied to any element.
 *
 * This style injects a combination of `outline` and `box-shadow` to indicate
 * the element is focused. This is used for accessibility purposes as it allows
 * the element to present a focus state on Windows High Contrast mode.
 */
export const Focus: StoryComponentType = {
    name: "focus",
    render: () => {
        return (
            <View
                style={{
                    padding: spacing.medium_16,
                    flexDirection: "row",
                    placeItems: "center",
                }}
            >
                <View
                    style={{
                        background: semanticColor.status.success.background,
                        padding: spacing.medium_16,
                        gap: spacing.medium_16,
                    }}
                >
                    <IconButton
                        kind="tertiary"
                        icon={info}
                        style={focusStyles.focus}
                    />
                </View>
                <View
                    style={{
                        background: semanticColor.surface.inverse,
                        padding: spacing.medium_16,
                        gap: spacing.medium_16,
                    }}
                >
                    <IconButton
                        kind="tertiary"
                        icon={info}
                        style={[
                            focusStyles.focus,
                            {color: semanticColor.text.inverse},
                        ]}
                    />
                </View>
            </View>
        );
    },
    parameters: {
        docs: {
            source: {
                code: JSON.stringify(focusStyles.focus, null, "\t"),
            },
        },
        pseudo: {focusVisible: true},
    },
};
