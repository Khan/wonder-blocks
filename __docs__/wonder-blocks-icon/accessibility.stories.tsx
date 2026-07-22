import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

import {IconMappings} from "./phosphor-icon.argtypes";

export default {
    title: "Packages / Icon / Accessibility",
    component: PhosphorIcon,

    // Disables chromatic testing for these stories.
    parameters: {
        previewTabs: {
            canvas: {
                hidden: true,
            },
        },

        viewMode: "docs",

        chromatic: {
            disableSnapshot: true,
        },
    },
};

export const IconContrast = {
    render: () => (
        <View
            style={{
                flexDirection: "row",
                marginBlockEnd: sizing.size_080,
            }}
        >
            <BodyText>High contrast icon (GOOD):</BodyText>
            <PhosphorIcon
                icon={IconMappings.checkCircle}
                style={{
                    color: semanticColor.core.foreground.instructive.default,
                    marginInlineStart: sizing.size_080,
                }}
            />
        </View>
    ),
};

export const RightToLeftIcons = {
    render: () => (
        <View
            dir="ltr"
            style={{
                flexDirection: "row",
            }}
        >
            <PhosphorIcon icon={IconMappings.caretRight} />
            <BodyText
                style={{
                    marginInlineStart: sizing.size_080,
                }}
            >
                {"Left to right"}
            </BodyText>
        </View>
    ),
    name: "Right to left icons",
};
