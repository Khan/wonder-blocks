/*
 * A toolbar component that often acts as a container header.
 */
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {
    HeadingSmall,
    LabelLarge,
    LabelSmall,
} from "@khanacademy/wonder-blocks-typography";
import type {AriaProps} from "@khanacademy/wonder-blocks-core";

type Props = AriaProps & {
    /**
     * Whether we should use the default light color scheme or switch to a
     * darker blue scheme.
     */
    color?: "dark" | "light";
    /**
     * An optional node to render on the left side of the toolbar. This will
     * often be empty, but may include a close button for modals.
     */
    leftContent?: React.ReactNode;
    /**
     * An optional node to render on the right side of the toolbar. This will
     * typically include buttons, links, or span elements with text.
     */
    rightContent?: React.ReactNode;
    /**
     * How much vertical space to use for the toolbar. If this prop is not
     * provided, the default is "medium".
     */
    size?: "small" | "medium";
    /**
     * An optional subtitle rendered in a lighter colour and smaller font size
     * below the title. Only visible on larger media sizes.
     */
    subtitle?: string;
    /**
     * The main title rendered in larger bold text. It also supports rendering
     * React nodes (use with caution).
     */
    title?: string | React.ReactNode;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
};

/**
 * The `Toolbar` component is a generic toolbar wrapper that exposes
 * customization options. An optional `title` and `subtitle` property can be
 * used along with left and right content passed as props.
 *
 * ### Usage
 *
 * ```jsx
 * import Toolbar from "@khanacademy/wonder-blocks-toolbar";
 *
 * <Toolbar
 *   size="small"
 *   leftContent={<IconButton icon={icons.dismiss} kind="tertiary" />}
 *   rightContent={<Button>Next Video</Button>}
 * />
 * ```
 */
export default function Toolbar({
    color = "light",
    leftContent,
    rightContent,
    size = "medium",
    subtitle,
    title,
}: Props): React.ReactElement {
    const TitleComponent = subtitle ? LabelLarge : HeadingSmall;

    return (
        <View
            style={[
                sharedStyles.container,
                title && typeof title === "string"
                    ? sharedStyles.containerWithTextTitle
                    : sharedStyles.containerWithNonTextTitle,
                color === "dark" && sharedStyles.dark,
                size === "small" && sharedStyles.small,
            ]}
        >
            <View style={sharedStyles.leftColumn}>{leftContent}</View>

            {title && typeof title === "string" ? (
                <View style={sharedStyles.titles}>
                    <TitleComponent id="wb-toolbar-title">
                        {title}
                    </TitleComponent>
                    {subtitle && (
                        <LabelSmall
                            style={color === "light" && sharedStyles.subtitle}
                        >
                            {subtitle}
                        </LabelSmall>
                    )}
                </View>
            ) : (
                <View style={sharedStyles.titles}>{title}</View>
            )}

            <View style={sharedStyles.rightColumn}>{rightContent}</View>
        </View>
    );
}

const sharedStyles = StyleSheet.create({
    container: {
        border: `1px solid ${color.offBlack16}`,
        flex: 1,
        display: "grid",
        alignItems: "center",
        minHeight: 66,
        paddingLeft: spacing.medium_16,
        paddingRight: spacing.medium_16,
        width: "100%",
    },
    containerWithTextTitle: {
        gridTemplateColumns: "1fr minmax(auto, 67%) 1fr",
    },
    containerWithNonTextTitle: {
        gridTemplateColumns:
            "minmax(max-content, 1fr) auto minmax(max-content, 1fr)",
    },
    small: {
        minHeight: 50,
    },
    dark: {
        backgroundColor: color.darkBlue,
        boxShadow: `0 1px 0 0 ${color.white64}`,
        color: "white",
    },
    leftColumn: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    rightColumn: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    subtitle: {
        color: color.offBlack64,
    },
    titles: {
        padding: spacing.small_12,
        textAlign: "center",
        justifySelf: "center",
        maxWidth: "100%",
    },
});
