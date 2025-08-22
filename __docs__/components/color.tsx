import * as React from "react";
import {StyleSheet} from "aphrodite";

import {StyleType, View} from "@khanacademy/wonder-blocks-core";
import {
    Footnote,
    LabelLarge,
    LabelSmall,
} from "@khanacademy/wonder-blocks-typography";
import {
    border,
    color,
    font,
    semanticColor,
    sizing,
    spacing,
} from "@khanacademy/wonder-blocks-tokens";
import {getTokenName, maybeGetCssVariableInfo} from "./tokens-util";
import {CopyButton} from "./copy-button";

type Variant = "primitive" | "semantic" | "compact";

type Props = {
    /**
     * A dictionary of colors to display.
     */
    colors: Record<string, string>;
    /**
     * The type of color group to display.
     */
    variant?: Variant;
    /**
     * The group name to use as a prefix for the color names.
     */
    group: string;
    /**
     * Custom styles for the component.
     */
    style?: StyleType;
    /**
     * The prefix to use for the color value.
     */
    valuePrefix?: string;
};

export function ColorGroup({
    colors,
    group,
    style,
    variant = "semantic",
    valuePrefix,
}: Props) {
    return (
        <View style={[styles.group, style]}>
            {Object.entries(colors).map(([name, value]) => (
                <Color
                    key={name}
                    name={group + "." + name}
                    value={value}
                    variant={variant}
                    valuePrefix={valuePrefix}
                />
            ))}
        </View>
    );
}

type ColorProps = {
    name: string;
    value: string;
    variant: Variant;
    valuePrefix?: string;
};

function Color({name, value, variant, valuePrefix}: ColorProps) {
    function renderInfo() {
        const rawValue = maybeGetCssVariableInfo(value).value;

        if (variant === "compact") {
            const tokenName = name.toString().split(".");
            return (
                <View style={styles.card}>
                    <LabelLarge style={styles.capitalized}>
                        {tokenName.at(tokenName.length - 1)}
                    </LabelLarge>
                    <LabelSmall>{name}</LabelSmall>

                    <Footnote>
                        <em>{getTokenName(color, rawValue) || rawValue}</em>
                    </Footnote>
                </View>
            );
        }

        if (variant === "primitive") {
            return (
                <>
                    <LabelSmall
                        style={{
                            fontWeight: font.weight.bold,
                        }}
                    >
                        {name}
                    </LabelSmall>
                    <Footnote style={styles.code}>{value}</Footnote>
                </>
            );
        }

        return (
            <View
                style={{
                    paddingInlineEnd: sizing.size_120,
                    paddingBlockEnd: sizing.size_080,
                    paddingBlockStart: sizing.size_040,
                    paddingInlineStart: sizing.size_040,
                }}
            >
                <LabelSmall
                    style={{
                        fontWeight: font.weight.bold,
                    }}
                >
                    {name}
                </LabelSmall>
                <Footnote>
                    <em>{getTokenName(color, rawValue) || rawValue}</em>
                </Footnote>
            </View>
        );
    }

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
                        boxShadow: `inset 0 0 1px 0 ${semanticColor.core.border.neutral.subtle}`,
                        // Expand to fill the parent container
                        alignSelf: "stretch",
                        flex: 1,
                    }}
                />
            </View>

            <View style={styles.info}>{renderInfo()}</View>
            <View style={styles.copyButtonContainer}>
                <CopyButton value={`${valuePrefix}${name}`} kind="tertiary" />
            </View>
        </View>
    );
}

type ActionColorGroupProps = {
    /**
     * A dictionary of colors to display.
     */
    category: Record<string, Record<string, string>>;
    /**
     * The group name to use as a prefix for the color names.
     */
    group: string;
    /**
     * Whether to include an example of the color.
     * This is useful for showing how the color looks in a UI context.
     */
    includeExample?: boolean;
    /**
     * The prefix to use for the color value.
     */
    valuePrefix?: string;
};

export function ActionColorGroup({
    category,
    group,
    includeExample = true,
    valuePrefix,
}: ActionColorGroupProps) {
    return Object.entries(category).map(([state, colorGroup], index) => (
        <View style={styles.actionGroup} key={index}>
            <LabelLarge style={styles.capitalized}>{state}</LabelLarge>
            {includeExample && <Example style={colorGroup} />}
            <ColorGroup
                colors={colorGroup}
                group={group + "." + state}
                variant="compact"
                valuePrefix={valuePrefix}
            />
        </View>
    ));
}

function Example({style}: {style?: any}) {
    return (
        <>
            <View
                style={{
                    marginBlock: spacing.xSmall_8,
                    marginInline: spacing.medium_16,
                    padding: spacing.medium_16,
                    backgroundColor: style.background,
                    color: style.foreground,
                    outline: `4px solid ${style.border}`,
                    outlineOffset: 3,
                    textAlign: "center",
                }}
            >
                Some Text
            </View>
        </>
    );
}

const itemWidth = 200;
const itemHeight = 120;

const styles = StyleSheet.create({
    group: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBlock: spacing.medium_16,
    },
    actionGroup: {
        margin: spacing.xxxSmall_4,
        padding: spacing.xxxSmall_4,
        gap: spacing.xxxSmall_4,
        border: `1px dashed ${semanticColor.core.border.neutral.subtle}`,
    },
    item: {
        maxWidth: itemWidth,
        overflowWrap: "break-word",
    },
    compactItem: {
        marginBlockEnd: spacing.xSmall_8,
        maxWidth: "100%",
        width: "100%",

        backgroundColor: semanticColor.core.background.base.subtle,
        border: `1px solid ${semanticColor.core.border.neutral.subtle}`,
        borderRadius: border.radius.radius_040,
    },
    pattern: {
        backgroundImage: `radial-gradient(${color.blue} 0.5px, ${color.offWhite} 0.5px)`,
        backgroundSize: `${spacing.small_12}px ${spacing.small_12}px`,
        boxShadow: `0 0 1px 0 ${semanticColor.core.border.neutral.subtle}`,
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
        justifyContent: "space-between",
        width: "100%",
        height: spacing.xxxLarge_64,
    },
    info: {
        paddingInlineEnd: spacing.medium_16,
    },
    card: {
        paddingInline: spacing.xSmall_8,
    },
    code: {
        alignSelf: "flex-start",
        color: semanticColor.core.foreground.neutral.strong,
        display: "inline-flex",
        backgroundColor: semanticColor.core.background.base.subtle,
        border: `1px solid ${color.offBlack16}`,
        padding: spacing.xxxxSmall_2,
        borderRadius: border.radius.radius_040,
    },
    capitalized: {
        textTransform: "capitalize",
    },
    copyButtonContainer: {
        position: "absolute",
        insetBlockEnd: sizing.size_040,
        insetInlineEnd: sizing.size_040,
    },
});
