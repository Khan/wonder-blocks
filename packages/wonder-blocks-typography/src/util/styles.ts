import {StyleSheet} from "aphrodite";
import type {StyleDeclaration} from "aphrodite";
import {font} from "@khanacademy/wonder-blocks-tokens";

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
    HeadingXxLargeMediumWeight: {
        ...Heading,
        fontSize: font.heading.size.xxlarge,
        fontWeight: font.weight.medium,
        lineHeight: font.heading.lineHeight.xxlarge,
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
    BodyMonospace: {
        ...common,
        fontFamily: font.family.mono,
        fontWeight: font.weight.medium,
        fontSize: font.body.size.medium,
        lineHeight: font.body.lineHeight.medium,
    },
});

export {styles as default};
