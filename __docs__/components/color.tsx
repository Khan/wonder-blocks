import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import {
    Caption,
    Footnote,
    LabelLarge,
    LabelSmall,
} from "@khanacademy/wonder-blocks-typography";
import {
    border,
    color,
    semanticColor,
    spacing,
} from "@khanacademy/wonder-blocks-tokens";

type Props = {
    colors: Record<string, string>;
    group: string;
};

type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]> | string;
};

export function flattenColors<T>(colors: RecursivePartial<T>, currentKey = "") {
    const result: Record<string, string> = {};

    for (const key in colors) {
        if (!Object.prototype.hasOwnProperty.call(colors, key)) {
            continue;
        }

        const nestedKey = currentKey !== "" ? currentKey + "." + key : key;
        const value = colors[key];
        if (typeof value === "string") {
            result[nestedKey] = value;
        } else {
            Object.assign(result, flattenColors(value, nestedKey));
        }
    }

    return result;
}

export function ColorGroup({colors, group}: Props) {
    return (
        <View style={styles.group}>
            {Object.entries(colors).map(([name, value]) => (
                <Color2 key={name} name={group + "." + name} value={value} />
            ))}
        </View>
    );
}

type ColorProps = {
    name: string;
    value: string;
};

function getColor(value: string) {
    for (const property in color) {
        if (color[property] === value) {
            return property;
        }
    }
}

export function Color({name, value}: ColorProps) {
    return (
        <View style={[styles.container, {backgroundColor: value}]}>
            <LabelLarge>{name}</LabelLarge>
            <View>
                <Caption>color.{getColor(value)}</Caption>
                <Footnote style={styles.code}>{value}</Footnote>
            </View>
        </View>
    );
}

export function Color2({name, value}: ColorProps) {
    return (
        <View>
            <View style={[styles.container, {backgroundColor: value}]} />
            <LabelLarge>{name}</LabelLarge>
            <Caption>
                Primitive: <em>{getColor(value)}</em>
            </Caption>
            <LabelSmall>
                Value: <Footnote style={styles.code}>{value}</Footnote>
            </LabelSmall>
        </View>
    );
}

const styles = StyleSheet.create({
    group: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.xSmall_8,
        marginBlock: spacing.large_24,
    },
    container: {
        border: `1px solid ${semanticColor.border.subtle}`,
        color: semanticColor.text.inverse,
        width: 185,
        height: 160,
        padding: spacing.large_24,
        wordWrap: "break-word",
        justifyContent: "space-between",
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
