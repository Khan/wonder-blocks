import * as React from "react";
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

type PrincipleSetProps = {
    children: React.ReactNode;
};

export function PrincipleSet({
    children,
}: PrincipleSetProps): React.ReactElement {
    return <View style={styles.set}>{children}</View>;
}

type Props = {
    label: string;
    title: string;
    description: string;
};

export default function Principle({
    label,
    title,
    description,
}: Props): React.ReactElement {
    return (
        <View style={styles.container}>
            <BodyText
                size="xsmall"
                weight="bold"
                tag="span"
                style={styles.label}
            >
                {label}
            </BodyText>
            <Heading size="medium" style={styles.title}>
                {title}
            </Heading>
            <BodyText tag="p" style={styles.description}>
                {description}
            </BodyText>
        </View>
    );
}

const styles = StyleSheet.create({
    set: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 400px), 1fr))",
        gap: sizing.size_160,
        paddingBlock: sizing.size_160,
    },
    container: {
        backgroundColor: semanticColor.core.background.base.default,
        border: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
        borderRadius: border.radius.radius_040,
        paddingInline: sizing.size_400,
        paddingBlock: sizing.size_560,
        gap: sizing.size_080,
    },
    label: {
        color: semanticColor.core.foreground.neutral.strong,
    },
    title: {
        color: semanticColor.core.foreground.neutral.strong,
    },
    description: {
        color: semanticColor.core.foreground.neutral.default,
    },
});
