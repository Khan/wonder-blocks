import * as React from "react";
import {StyleSheet} from "aphrodite";

import {StyleType, View} from "@khanacademy/wonder-blocks-core";
import {
    Caption,
    Footnote,
    LabelLarge,
    LabelMedium,
    LabelSmall,
} from "@khanacademy/wonder-blocks-typography";
import {
    border,
    color,
    semanticColor,
    spacing,
} from "@khanacademy/wonder-blocks-tokens";
import {getTokenName} from "./tokens-util";

type Props = {
    /**
     * A dictionary of colors to display.
     */
    colors: Record<string, string>;
    /**
     * The type of color group to display.
     */
    variant: "primitive" | "semantic";
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
    variant: "primitive" | "semantic";
};

function Color({name, value, variant}: ColorProps) {
    const TypographyComponent =
        variant === "semantic" ? LabelLarge : LabelMedium;

    return (
        <View style={styles[variant + "Group"]}>
            <View
                style={[
                    styles.thumbnail,
                    styles[variant + "Thumbnail"],
                    {backgroundColor: value},
                ]}
            />
            <View>
                <TypographyComponent>{name}</TypographyComponent>
                {variant === "semantic" ? (
                    <>
                        <Caption>
                            Primitive: <em>{getTokenName(color, value)}</em>
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

const styles = StyleSheet.create({
    group: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.small_12,
        marginBlock: spacing.large_24,
    },
    primitiveGroup: {
        flexDirection: "row",
    },
    thumbnail: {
        border: `1px solid ${semanticColor.border.subtle}`,
        color: semanticColor.text.inverse,
        width: 185,
        height: 160,
        padding: spacing.large_24,
        wordWrap: "break-word",
        justifyContent: "space-between",
    },
    primitiveThumbnail: {
        marginInlineEnd: spacing.small_12,
        width: spacing.xxLarge_48,
        height: spacing.xxLarge_48,
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
