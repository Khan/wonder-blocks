import * as React from "react";
import {StyleSheet} from "aphrodite";

import {StyleType, View} from "@khanacademy/wonder-blocks-core";
import {
    Caption,
    Footnote,
    LabelLarge,
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
        variant === "semantic" ? LabelLarge : LabelSmall;

    return (
        <View style={styles.item}>
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
                    }}
                />
            </View>
            <View>
                <TypographyComponent style={{fontWeight: font.weight.bold}}>
                    {name}
                </TypographyComponent>
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
        marginBlock: spacing.large_24,
    },
    item: {
        marginBlockEnd: spacing.medium_16,
    },
    pattern: {
        backgroundImage: `radial-gradient(${color.blue} 0.5px, ${color.offWhite} 0.5px)`,
        backgroundSize: `${spacing.small_12}px ${spacing.small_12}px`,
    },
    thumbnail: {
        width: 200,
        height: 160,
    },
    primitiveThumbnail: {
        width: 160,
        height: spacing.xxxLarge_64,
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
