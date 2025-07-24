import {StyleSheet} from "aphrodite";
import * as React from "react";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {ActionColorGroup} from "../components/color";
import {View} from "@khanacademy/wonder-blocks-core";
import {Heading} from "@khanacademy/wonder-blocks-typography";

export default {
    title: "Packages/Tokens/Testing/SemanticColors",
    parameters: {
        chromatic: {
            disableSnapshot: true,
        },
    },
};

const ColorGroupStory = ({
    category,
    group,
}: {
    category: Record<string, Record<string, string>>;
    group: string;
}) => {
    return (
        <View style={styles.gridCompact}>
            <ActionColorGroup
                category={category}
                group={group}
                includeExample={false}
            />
        </View>
    );
};

export const SemanticColors = {
    render: () => {
        return (
            <View style={{gap: sizing.size_120}}>
                <Heading tag="h1" size="xlarge">
                    Semantic Colors
                </Heading>
                <Heading tag="h2" size="large">
                    Core
                </Heading>
                <Heading tag="h3" size="medium">
                    Border
                </Heading>
                <CoreBorder />
                <Heading tag="h3">Background</Heading>
                <CoreBackground />
                <Heading tag="h3">Foreground</Heading>
                <CoreForeground />
            </View>
        );
    },
    parameters: {
        chromatic: {
            disableSnapshots: true,
        },
    },
};
export const CoreBorder = () => {
    return (
        <ColorGroupStory
            category={semanticColor.core.border}
            group="core.border"
        />
    );
};

export const CoreBackground = () => {
    return (
        <ColorGroupStory
            category={semanticColor.core.background}
            group="core.background"
        />
    );
};

export const CoreForeground = () => {
    return (
        <ColorGroupStory
            category={semanticColor.core.foreground}
            group="core.foreground"
        />
    );
};

const styles = StyleSheet.create({
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(100px, auto))",
    },
    gridSmall: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, 160px)",
    },
    gridCompact: {
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(100px, auto))",
    },

    banner: {
        marginBottom: sizing.size_320,
    },
});
