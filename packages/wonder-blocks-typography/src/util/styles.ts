import {StyleSheet} from "aphrodite";
import type {StyleDeclaration} from "aphrodite";
import {font, breakpoint} from "@khanacademy/wonder-blocks-tokens";

const common = {
    display: "block",
} as const;

const styles: StyleDeclaration = StyleSheet.create({
    Title: {
        ...common,
        fontFamily: font.family.sans,
        fontWeight: font.weight.black,
        [breakpoint.mediaQuery.xl]: {
            fontSize: font.size.xxxLarge,
            lineHeight: font.lineHeight.xxxLarge,
        },
        [breakpoint.mediaQuery.mdOrSmaller]: {
            fontSize: font.size.xxLarge,
            lineHeight: font.lineHeight.xxLarge,
        },
    },
    Tagline: {
        ...common,
        fontFamily: font.family.sans,
        fontWeight: font.weight.medium,
        fontSize: font.size.large,
        lineHeight: font.lineHeight.large,
    },
    Heading: {
        ...common,
        fontFamily: font.family.sans,
        // weight and size are determined by props
        // lineHeight is determined by fontSize on REM scale
    },
    BodyText: {
        ...common,
        fontFamily: font.family.sans,
        margin: 0,
        // weight and size are determined by props
        // lineHeight is determined by fontSize on REM scale
    },
    HeadingLarge: {
        ...common,
        fontFamily: font.family.sans,
        fontWeight: font.weight.bold,
        [breakpoint.mediaQuery.xl]: {
            fontSize: font.size.xxLarge,
            lineHeight: font.lineHeight.xxLarge,
        },
        [breakpoint.mediaQuery.mdOrSmaller]: {
            fontSize: font.size.xLarge,
            lineHeight: font.lineHeight.xLarge,
        },
    },
    HeadingMedium: {
        ...common,
        fontFamily: font.family.sans,
        fontWeight: font.weight.bold,
        [breakpoint.mediaQuery.xl]: {
            fontSize: font.size.xLarge,
            lineHeight: font.lineHeight.xLarge,
        },
        [breakpoint.mediaQuery.mdOrSmaller]: {
            fontSize: "2.2rem",
            lineHeight: "2.6rem",
        },
    },
    HeadingSmall: {
        ...common,
        fontFamily: font.family.sans,
        fontWeight: font.weight.bold,
        fontSize: font.size.large,
        lineHeight: font.lineHeight.large,
    },
    HeadingXSmall: {
        ...common,
        fontFamily: font.family.sans,
        fontWeight: font.weight.bold,
        fontSize: font.size.xSmall,
        lineHeight: font.lineHeight.xSmall,
        letterSpacing: 0.6,
        textTransform: "uppercase",
    },
    BodySerifBlock: {
        ...common,
        fontFamily: font.family.serif,
        fontWeight: font.weight.medium,
        fontSize: font.size.large,
        lineHeight: font.lineHeight.large,
    },
    BodySerif: {
        ...common,
        fontFamily: font.family.serif,
        fontWeight: font.weight.medium,
        fontSize: font.size.medium,
        lineHeight: font.size.medium,
    },
    BodyMonospace: {
        ...common,
        fontFamily: font.family.mono,
        fontWeight: font.weight.medium,
        fontSize: font.size.medium,
        lineHeight: font.lineHeight.medium,
    },
    Body: {
        ...common,
        fontFamily: font.family.sans,
        fontWeight: font.weight.medium,
        fontSize: font.size.medium,
        lineHeight: font.lineHeight.xMedium,
    },
    LabelLarge: {
        ...common,
        fontFamily: font.family.sans,
        fontWeight: font.weight.bold,
        fontSize: font.size.medium,
        lineHeight: font.lineHeight.medium,
    },
    LabelMedium: {
        ...common,
        fontFamily: font.family.sans,
        fontWeight: font.weight.medium,
        fontSize: font.size.medium,
        lineHeight: font.lineHeight.medium,
    },
    LabelSmall: {
        ...common,
        fontFamily: font.family.sans,
        fontWeight: font.weight.medium,
        fontSize: font.size.small,
        lineHeight: font.lineHeight.small,
    },
    LabelXSmall: {
        ...common,
        fontFamily: font.family.sans,
        fontWeight: font.weight.medium,
        fontSize: font.size.xSmall,
        lineHeight: font.lineHeight.xSmall,
    },
    Caption: {
        ...common,
        fontFamily: font.family.sans,
        fontWeight: font.weight.medium,
        fontSize: font.size.small,
        lineHeight: font.lineHeight.medium,
    },
    Footnote: {
        ...common,
        fontFamily: font.family.sans,
        fontWeight: font.weight.medium,
        fontSize: font.size.xSmall,
        lineHeight: font.lineHeight.small,
    },
});

export {styles as default};
