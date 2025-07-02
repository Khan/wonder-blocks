import {StyleSheet} from "aphrodite";
import type {StyleDeclaration} from "aphrodite";
import {font, breakpoint} from "@khanacademy/wonder-blocks-tokens";

const common = {
    display: "block",
} as const;

const Heading = {
    ...common,
    fontFamily: font.family.sans,
    // weight and size are matched by props, using the combinations below
    // lineHeight is determined by fontSize on REM scale
};

const BodyText = {
    ...common,
    fontFamily: font.family.sans,
    margin: 0,
    // weight and size are matched by props, using the combinations below
    // lineHeight is determined by fontSize on REM scale
};

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
    Heading,
    HeadingSmallBoldWeight: {
        ...Heading,
        fontSize: font.heading.size.small,
        fontWeight: font.weight.bold,
        lineHeight: font.heading.lineHeight.small,
    },
    HeadingSmallSemiWeight: {
        ...Heading,
        fontSize: font.heading.size.small,
        fontWeight: font.weight.semi,
        lineHeight: font.heading.lineHeight.small,
    },
    HeadingSmallMediumWeight: {
        ...Heading,
        fontSize: font.heading.size.small,
        fontWeight: font.weight.medium,
        lineHeight: font.heading.lineHeight.small,
    },
    HeadingMediumBoldWeight: {
        ...Heading,
        fontSize: font.heading.size.medium,
        fontWeight: font.weight.bold,
        lineHeight: font.heading.lineHeight.medium,
    },
    HeadingMediumSemiWeight: {
        ...Heading,
        fontSize: font.heading.size.medium,
        fontWeight: font.weight.semi,
        lineHeight: font.heading.lineHeight.medium,
    },
    HeadingMediumMediumWeight: {
        ...Heading,
        fontSize: font.heading.size.medium,
        fontWeight: font.weight.medium,
        lineHeight: font.heading.lineHeight.medium,
    },
    HeadingLargeBoldWeight: {
        ...Heading,
        fontSize: font.heading.size.large,
        fontWeight: font.weight.bold,
        lineHeight: font.heading.lineHeight.large,
    },
    HeadingLargeSemiWeight: {
        ...Heading,
        fontSize: font.heading.size.large,
        fontWeight: font.weight.semi,
        lineHeight: font.heading.lineHeight.large,
    },
    HeadingLargeMediumWeight: {
        ...Heading,
        fontSize: font.heading.size.large,
        fontWeight: font.weight.medium,
        lineHeight: font.heading.lineHeight.large,
    },
    HeadingXLargeBoldWeight: {
        ...Heading,
        fontSize: font.heading.size.xlarge,
        fontWeight: font.weight.bold,
        lineHeight: font.heading.lineHeight.xlarge,
    },
    HeadingXLargeMediumWeight: {
        ...Heading,
        fontSize: font.heading.size.xlarge,
        fontWeight: font.weight.medium,
        lineHeight: font.heading.lineHeight.xlarge,
    },
    HeadingXLargeSemiWeight: {
        ...Heading,
        fontSize: font.heading.size.xlarge,
        fontWeight: font.weight.semi,
        lineHeight: font.heading.lineHeight.xlarge,
    },
    HeadingXxLargeSemiWeight: {
        ...Heading,
        fontSize: font.heading.size.xxlarge,
        fontWeight: font.weight.semi,
        lineHeight: font.heading.lineHeight.xxlarge,
    },
    HeadingXxLargeBoldWeight: {
        ...Heading,
        fontSize: font.heading.size.xxlarge,
        fontWeight: font.weight.bold,
        lineHeight: font.heading.lineHeight.xxlarge,
    },
    BodyText,
    BodyTextXSmallMediumWeight: {
        ...BodyText,
        fontSize: font.body.size.xsmall,
        fontWeight: font.weight.medium,
        lineHeight: font.body.lineHeight.xsmall,
    },
    BodyTextXSmallSemiWeight: {
        ...BodyText,
        fontSize: font.body.size.xsmall,
        fontWeight: font.weight.semi,
        lineHeight: font.body.lineHeight.xsmall,
    },
    BodyTextXSmallBoldWeight: {
        ...BodyText,
        fontSize: font.body.size.xsmall,
        fontWeight: font.weight.bold,
        lineHeight: font.body.lineHeight.xsmall,
    },
    BodyTextSmallMediumWeight: {
        ...BodyText,
        fontSize: font.body.size.small,
        fontWeight: font.weight.medium,
        lineHeight: font.body.lineHeight.small,
    },
    BodyTextSmallSemiWeight: {
        ...BodyText,
        fontSize: font.body.size.small,
        fontWeight: font.weight.semi,
        lineHeight: font.body.lineHeight.small,
    },
    BodyTextSmallBoldWeight: {
        ...BodyText,
        fontSize: font.body.size.small,
        fontWeight: font.weight.bold,
        lineHeight: font.body.lineHeight.small,
    },
    BodyTextMediumMediumWeight: {
        ...BodyText,
        fontSize: font.body.size.medium,
        fontWeight: font.weight.medium,
        lineHeight: font.body.lineHeight.medium,
    },
    BodyTextMediumSemiWeight: {
        ...BodyText,
        fontSize: font.body.size.medium,
        fontWeight: font.weight.semi,
        lineHeight: font.body.lineHeight.medium,
    },
    BodyTextMediumBoldWeight: {
        ...BodyText,
        fontSize: font.body.size.medium,
        fontWeight: font.weight.bold,
        lineHeight: font.body.lineHeight.medium,
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
