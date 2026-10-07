import bodyMonospace from "../components/body-monospace.module.css";
import bodyText from "../components/body-text.module.css";
import heading from "../components/heading.module.css";

/**
 * CSS Modules class names that mirror the Aphrodite `styles` export, key for
 * key.
 *
 * Each value is the same class (or pair of classes) that `Heading`,
 * `BodyText` and `BodyMonospace` render with: the shared base class plus the
 * size/weight variant class. Pass them through the Wonder Blocks `style` prop,
 * which routes class-name strings to `className`.
 *
 * ```tsx
 * import {typographyClassNames} from "@khanacademy/wonder-blocks-typography";
 *
 * <View style={[typographyClassNames.BodyTextMediumMediumWeight, style]} />
 * ```
 *
 * Unlike the Aphrodite `styles`, these rules are emitted in
 * `@layer shared`, so any Aphrodite style on the same element (including one
 * that comes *before* it in a `style` array) wins over them.
 */
const typographyClassNames = {
    Heading: heading.heading,
    HeadingSmallBoldWeight: `${heading.heading} ${heading.smallBold}`,
    HeadingSmallSemiWeight: `${heading.heading} ${heading.smallSemi}`,
    HeadingSmallMediumWeight: `${heading.heading} ${heading.smallMedium}`,
    HeadingMediumBoldWeight: `${heading.heading} ${heading.mediumBold}`,
    HeadingMediumSemiWeight: `${heading.heading} ${heading.mediumSemi}`,
    HeadingMediumMediumWeight: `${heading.heading} ${heading.mediumMedium}`,
    HeadingLargeBoldWeight: `${heading.heading} ${heading.largeBold}`,
    HeadingLargeSemiWeight: `${heading.heading} ${heading.largeSemi}`,
    HeadingLargeMediumWeight: `${heading.heading} ${heading.largeMedium}`,
    HeadingXLargeBoldWeight: `${heading.heading} ${heading.xlargeBold}`,
    HeadingXLargeMediumWeight: `${heading.heading} ${heading.xlargeMedium}`,
    HeadingXLargeSemiWeight: `${heading.heading} ${heading.xlargeSemi}`,
    HeadingXxLargeMediumWeight: `${heading.heading} ${heading.xxlargeMedium}`,
    HeadingXxLargeSemiWeight: `${heading.heading} ${heading.xxlargeSemi}`,
    HeadingXxLargeBoldWeight: `${heading.heading} ${heading.xxlargeBold}`,
    BodyText: bodyText.bodyText,
    BodyTextXSmallMediumWeight: `${bodyText.bodyText} ${bodyText.xsmallMedium}`,
    BodyTextXSmallSemiWeight: `${bodyText.bodyText} ${bodyText.xsmallSemi}`,
    BodyTextXSmallBoldWeight: `${bodyText.bodyText} ${bodyText.xsmallBold}`,
    BodyTextSmallMediumWeight: `${bodyText.bodyText} ${bodyText.smallMedium}`,
    BodyTextSmallSemiWeight: `${bodyText.bodyText} ${bodyText.smallSemi}`,
    BodyTextSmallBoldWeight: `${bodyText.bodyText} ${bodyText.smallBold}`,
    BodyTextMediumMediumWeight: `${bodyText.bodyText} ${bodyText.mediumMedium}`,
    BodyTextMediumSemiWeight: `${bodyText.bodyText} ${bodyText.mediumSemi}`,
    BodyTextMediumBoldWeight: `${bodyText.bodyText} ${bodyText.mediumBold}`,
    BodyMonospace: bodyMonospace.bodyMonospace,
} as const satisfies Record<string, string>;

export {typographyClassNames as default};
