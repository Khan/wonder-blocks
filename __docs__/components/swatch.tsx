import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {
    Caption,
    LabelLarge,
    LabelSmall,
    LabelXSmall,
} from "@khanacademy/wonder-blocks-typography";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

type Segments = 1 | 2 | 3;

const UseType = {
    text: {
        content: "Aa",
        label: "Text & Icons",
    },
    icons: {
        content: <PhosphorIcon icon={IconMappings.lightbulbBold} />,
        label: "Icons",
    },
} as const;

/**
 * Get the color swatch information for a given color and segment count.
 */
const getColorSegments = (
    segments: Segments,
    colorSegment: string,
    dark: boolean,
) => {
    switch (segments) {
        case 1:
            return [
                {
                    foreground: dark ? colorSegment : color.white64,
                    background: dark ? color.darkBlue : colorSegment,
                },
            ];
        case 2:
            return [
                {
                    foreground: colorSegment,
                    background: colorSegment,
                },
                {
                    foreground: colorSegment,
                    background: color.darkBlue,
                },
            ];
        case 3:
        default:
            return [
                {
                    foreground: color.white,
                    background: colorSegment,
                },
                {
                    foreground: colorSegment,
                    background: color.offWhite,
                },
                {
                    foreground: colorSegment,
                    background: color.white,
                },
            ];
    }
};

type Props = {
    color: string;
    name: string;
    description: string;
    use?: "text" | "icons" | null;
    segments: Segments;
    dark: boolean;
    displayColor: boolean;
};

export const Swatch = ({
    name,
    color,
    use,
    description,
    segments = 3,
    dark = false,
    displayColor = false,
}: Props): React.ReactElement => {
    const maybeRenderUseLabel = () => {
        if (!use) {
            return null;
        }
        return (
            <LabelSmall style={styles.usage}>
                Use in: <strong>{UseType[use].label}</strong>
            </LabelSmall>
        );
    };

    const renderSegments = () => {
        return getColorSegments(segments, color, dark).map((color, index) => (
            <View
                key={index}
                style={[
                    styles.swatchItem,
                    {
                        color: color.foreground,
                        backgroundColor: color.background,
                    },
                ]}
            >
                {use ? <LabelLarge>{UseType[use]?.content}</LabelLarge> : null}
            </View>
        ));
    };

    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <LabelLarge>{name}</LabelLarge>
                <LabelXSmall style={styles.tag}>{color}</LabelXSmall>
                <Caption>{description}</Caption>
                {maybeRenderUseLabel()}
            </View>
            <View style={styles.swatch}>{renderSegments()}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        color: color.offBlack,
        flexDirection: "row",
        marginBottom: spacing.xLarge_32,
    },
    info: {
        alignItems: "flex-start",
        flexBasis: "30%",
    },
    tag: {
        background: color.offWhite,
        border: `solid 1px ${color.offBlack8}`,
        borderRadius: spacing.xxxxSmall_2,
        margin: `${spacing.xxxSmall_4}px 0`,
        padding: `0 ${spacing.xxxSmall_4}px`,
    },
    usage: {
        color: color.offBlack64,
    },
    swatch: {
        flexDirection: "row",
        flexBasis: "70%",
        borderRadius: spacing.xxxSmall_4,
        background: color.white,
        boxShadow: `0 1px ${spacing.xxxSmall_4}px 0 ${color.offBlack8}`,
        border: `1px solid ${color.offBlack16}`,
        overflow: "hidden",
        height: spacing.xxxLarge_64,
    },
    swatchItem: {
        gap: spacing.medium_16,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: spacing.medium_16,
    },
});
