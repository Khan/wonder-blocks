import * as React from "react";
import {
    Title,
    Subtitle,
    Description,
    Stories,
} from "@storybook/addon-docs/blocks";
import {StyleSheet} from "aphrodite";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-tokens/package.json";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {ActionColorGroup, ColorGroup} from "../components/color";
import {Heading} from "@khanacademy/wonder-blocks-typography";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";

export default {
    title: "Packages / Tokens / Deprecated / Deprecated Semantic Colors",
    parameters: {
        docs: {
            // Use a custom page so the SB <Primary> component is not rendered
            // <Primary> renders the first story as part of the description,
            // which isn't necessary for the token pages.
            page: () => (
                <>
                    <Title />
                    <Subtitle />
                    <Description />
                    <Stories title="Tokens" />
                </>
            ),
        },
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            disableSnapshot: true,
        },
    },
    tags: ["!dev", "!manifest"],
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
});

const valuePrefix = "semanticColor.";
const ColorGroupStory = ({
    category,
    group,
    includeExample = false,
}: PropsFor<typeof ActionColorGroup>) => {
    return (
        <View style={styles.gridCompact}>
            <ActionColorGroup
                category={category}
                group={group}
                includeExample={includeExample}
                valuePrefix={valuePrefix}
            />
        </View>
    );
};

/**
 * For buttons, links, and controls to communicate the presence and meaning of
 * interaction.
 *
 * These action tokens are meant for internal WB use and will be make private in the future. Please use the semanticColor.core tokens instead.
 */
/**
 * Communicates strong emphasis and primary actions.
 */
export const ActionPrimary = () => {
    return (
        <View>
            <Heading>Progressive</Heading>
            <ColorGroupStory
                category={semanticColor.action.primary.progressive}
                group="action.primary.progressive"
                includeExample={true}
            />
            <Heading>Destructive</Heading>
            <ColorGroupStory
                category={semanticColor.action.primary.destructive}
                group="action.primary.destructive"
                includeExample={true}
            />
            <Heading>Neutral</Heading>
            <ColorGroupStory
                category={semanticColor.action.primary.neutral}
                group="action.primary.neutral"
                includeExample={true}
            />
            <Heading>Disabled</Heading>
            <ColorGroup
                colors={semanticColor.action.primary.disabled}
                group="action.primary.disabled"
                variant="compact"
                style={styles.gridCompact}
            />
        </View>
    );
};

/**
 * Communicates secondary actions and less emphasis.
 */
export const ActionSecondary = () => {
    return (
        <View>
            <Heading>Progressive</Heading>
            <ColorGroupStory
                category={semanticColor.action.secondary.progressive}
                group="action.secondary.progressive"
                includeExample={true}
            />
            <Heading>Destructive</Heading>
            <ColorGroupStory
                category={semanticColor.action.secondary.destructive}
                group="action.secondary.destructive"
                includeExample={true}
            />
            <Heading>Neutral</Heading>
            <ColorGroupStory
                category={semanticColor.action.secondary.neutral}
                group="action.secondary.neutral"
                includeExample={true}
            />
            <Heading>Disabled</Heading>
            <ColorGroup
                colors={semanticColor.action.secondary.disabled}
                group="action.secondary.disabled"
                variant="compact"
                style={styles.gridCompact}
            />
        </View>
    );
};

/**
 * Communicates tertiary actions that have the lowest hierarchy.
 */
export const ActionTertiary = () => {
    return (
        <View>
            <Heading>Progressive</Heading>
            <ColorGroupStory
                category={semanticColor.action.tertiary.progressive}
                group="action.tertiary.progressive"
                includeExample={true}
            />
            <Heading>Destructive</Heading>
            <ColorGroupStory
                category={semanticColor.action.tertiary.destructive}
                group="action.tertiary.destructive"
                includeExample={true}
            />
            <Heading>Neutral</Heading>
            <ColorGroupStory
                category={semanticColor.action.tertiary.neutral}
                group="action.tertiary.neutral"
                includeExample={true}
            />
            <Heading>Disabled</Heading>
            <ColorGroup
                colors={semanticColor.action.tertiary.disabled}
                group="action.tertiary.disabled"
                variant="compact"
                style={styles.gridCompact}
            />
        </View>
    );
};

/**
 * For labels, icons, filters, alerts, and other elements where color can add
 * meaning to the state of the system or an item in the system.
 *
 * Note: These status tokens are deprecated and will be removed in the future.
 * Please use the semantic feedback tokens instead: `semanticColor.feedback`

 */
export const Status = () => {
    return (
        <View style={styles.grid}>
            <ColorGroup
                colors={semanticColor.status.critical}
                group="status.critical"
                valuePrefix={valuePrefix}
            />
            <ColorGroup
                colors={semanticColor.status.warning}
                group="status.warning"
                valuePrefix={valuePrefix}
            />
            <ColorGroup
                colors={semanticColor.status.success}
                group="status.success"
                valuePrefix={valuePrefix}
            />
            <ColorGroup
                colors={semanticColor.status.notice}
                group="status.notice"
                valuePrefix={valuePrefix}
            />
            <ColorGroup
                colors={semanticColor.status.neutral}
                group="status.neutral"
                valuePrefix={valuePrefix}
            />
        </View>
    );
};
