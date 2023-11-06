import * as React from "react";
import {StyleSheet} from "aphrodite";

import magnifyingGlass from "@phosphor-icons/core/regular/magnifying-glass.svg";
import magnifyingGlassBold from "@phosphor-icons/core/bold/magnifying-glass-bold.svg";
import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {tokens} from "@khanacademy/wonder-blocks-theming";
import {HeadingLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentTile from "../component-tile";
import {styles} from "../styles";

export default function IconSection() {
    return (
        <>
            <HeadingLarge id="icon" tag="h3" style={styles.sectionLabel}>
                Icon
            </HeadingLarge>
            <View style={styles.section}>
                <ComponentTile
                    name="PhosphorIcon"
                    href="/?path=/docs/icon-phosphoricon--docs"
                    description={`Displays a small informational or
                        decorative image available from the
                        @phosphor-icons/core package.`}
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
            </View>
        </>
    );
}

const localStyles = StyleSheet.create({
    content: {
        flexDirection: "row",
        alignItems: "end",
    },
    icon: {
        marginRight: tokens.spacing.medium_16,
    },
});
