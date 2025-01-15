import * as React from "react";
import {StyleSheet} from "aphrodite";

import {StyleType, View} from "@khanacademy/wonder-blocks-core";
import {
    Caption,
    Footnote,
    LabelSmall,
} from "@khanacademy/wonder-blocks-typography";
import {
    border,
    color,
    font,
    semanticColor,
    spacing,
} from "@khanacademy/wonder-blocks-tokens";
import {getTokenName} from "./tokens-util";

type Variant = "primitive" | "semantic" | "compact";

type Props = {
    /**
     * A dictionary of colors to display.
     */
    colors: Record<string, string>;
    /**
     * The type of color group to display.
     */
    variant: Variant;
    /**
     * The group name to use as a prefix for the color names.
     */
    group: string;
    /**
     * Custom styles for the component.
     */
    style?: StyleType;
};

export function ColorGroup({
    colors,
    group,
    style,
    variant = "semantic",
}: Props) {
    return (
        <View style={[styles.group, style]}>
            {Object.entries(colors).map(([name, value]) => (
                <Color
                    key={name}
                    name={group + "." + name}
                    value={value}
                    variant={variant}
                />
            ))}
        </View>
    );
}

type ColorProps = {
    name: string;
    value: string;
    variant: Variant;
};

function Color({name, value, variant}: ColorProps) {
    return (
        <View style={[styles.item, styles[variant + "Item"]]}>
            <View
                style={[
                    styles.thumbnail,
                    styles[variant + "Thumbnail"],
                    styles.pattern,
                ]}
            >
                <View
                    style={{
                        backgroundColor: value,
                        boxShadow: `inset 0 0 1px 0 ${semanticColor.border.primary}`,
                        // Expand to fill the parent container
                        alignSelf: "stretch",
                        flex: 1,
                        padding: spacing.medium_16,
                    }}
                />
            </View>
            <View style={styles.info}>
                <LabelSmall
                    style={{
                        fontWeight: font.weight.bold,
                    }}
                >
                    {name}
                </LabelSmall>
                {variant !== "primitive" ? (
                    <>
                        <Caption>
                            Primitive:{" "}
                            <em>{getTokenName(color, value) || value}</em>
                        </Caption>
                        <LabelSmall>
                            Value:{" "}
                            <Footnote style={styles.code}>{value}</Footnote>
                        </LabelSmall>
                    </>
                ) : (
                    <Footnote style={styles.code}>{value}</Footnote>
                )}
            </View>
        </View>
    );
}

const itemWidth = 200;
const itemHeight = 120;

const styles = StyleSheet.create({
    group: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBlock: spacing.large_24,
    },
    item: {
        maxWidth: itemWidth,
        overflowWrap: "break-word",
    },
    compactItem: {
        flexDirection: "row",
        gap: spacing.xSmall_8,
        maxWidth: "unset",
    },
    pattern: {
        backgroundImage: `radial-gradient(${color.blue} 0.5px, ${color.offWhite} 0.5px)`,
        backgroundSize: `${spacing.small_12}px ${spacing.small_12}px`,
        boxShadow: `0 0 1px 0 ${semanticColor.border.primary}`,
    },
    thumbnail: {
        width: itemWidth,
        height: itemHeight,
    },
    primitiveThumbnail: {
        width: 160,
        height: spacing.xxxLarge_64,
    },
    compactThumbnail: {
        width: spacing.xxxLarge_64,
        height: spacing.xxxLarge_64,
    },
    info: {
        paddingInlineEnd: spacing.medium_16,
    },
    code: {
        alignSelf: "flex-start",
        color: semanticColor.text.primary,
        display: "inline-flex",
        backgroundColor: semanticColor.surface.secondary,
        border: `1px solid ${color.offBlack16}`,
        padding: spacing.xxxxSmall_2,
        borderRadius: border.radius.medium_4,
    },
});
