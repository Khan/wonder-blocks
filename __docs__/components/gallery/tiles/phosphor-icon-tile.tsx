import * as React from "react";
import {StyleSheet} from "aphrodite";

import magnifyingGlass from "@phosphor-icons/core/regular/magnifying-glass.svg";
import magnifyingGlassBold from "@phosphor-icons/core/bold/magnifying-glass-bold.svg";
import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {spacing} from "@khanacademy/wonder-blocks-tokens";

import ComponentTile from "../component-tile";
import {styles} from "../styles";
import {CommonTileProps} from "../types";

export default function PhosphorIconTile(props: CommonTileProps) {
    return (
        <ComponentTile
            name="PhosphorIcon"
            href="/?path=/docs/packages-icon-phosphoricon--docs"
            description={`Displays a small informational or
                        decorative image available from the
                        @phosphor-icons/core package.`}
            {...props}
        >
            <View style={[localStyles.content, styles.centerContent]}>
                <PhosphorIcon
                    icon={magnifyingGlassBold}
                    size="xlarge"
                    style={localStyles.icon}
                />
                <PhosphorIcon
                    icon={magnifyingGlassBold}
                    size="large"
                    style={localStyles.icon}
                />
                <PhosphorIcon
                    icon={magnifyingGlass}
                    size="medium"
                    style={localStyles.icon}
                />
                <PhosphorIcon
                    icon={magnifyingGlassBold}
                    size="small"
                    style={localStyles.icon}
                />
            </View>
        </ComponentTile>
    );
}

const localStyles = StyleSheet.create({
    content: {
        flexDirection: "row",
        alignItems: "end",
    },
    icon: {
        marginRight: spacing.medium_16,
    },
});
