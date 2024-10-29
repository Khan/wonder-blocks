/**
 * A default set of media queries to use for different screen sizes.
 *
 * Breakpoint documentation: https://khanacademy.atlassian.net/wiki/spaces/WB/pages/2099970518/Layout+Breakpoints
 *
 */

export const pureWidths = {
    xsMax: 567,
    smMin: 568,
    smMax: 681,
    mdMin: 682,
    mdMax: 1023,
    lgMin: 1024,
} as const;

export const breakpoints = {
    // Named
    xs: `@media screen and (max-width: ${pureWidths.xsMax}px) /* breakpoints.xs */`,
    sm: `@media screen and (min-width: ${pureWidths.smMin}px) and (max-width: ${pureWidths.smMax}px) /* breakpoints.sm */`,
    md: `@media screen and (min-width: ${pureWidths.mdMin}px) and (max-width: ${pureWidths.mdMax}px) /* breakpoints.md */`,
    lg: `@media screen and (min-width: ${pureWidths.mdMin}px) and (max-width: ${pureWidths.lgMin}px) /* breakpoints.lg */`,
    xl: `@media screen and (min-width: ${pureWidths.lgMin}px) /* breakpoints.xl */`,

    xsOrSmaller: `@media screen and (max-width: ${pureWidths.xsMax}px) /* breakpoints.xsOrSmaller */`,
    smOrSmaller: `@media screen and (max-width: ${pureWidths.smMax}px) /* breakpoints.smOrSmaller */`,
    mdOrSmaller: `@media screen and (max-width: ${pureWidths.mdMax}px) /* breakpoints.mdOrSmaller */`,
    lgOrSmaller: `@media screen and (max-width: ${pureWidths.lgMin}px) /* breakpoints.lgOrSmaller */`,

    smOrLarger: `@media screen and (min-width: ${pureWidths.smMin}px) /* breakpoints.smOrLarger */`,
    mdOrLarger: `@media screen and (min-width: ${pureWidths.mdMin}px) /* breakpoints.mdOrLarger */`,
    lgOrLarger: `@media screen and (min-width: ${pureWidths.lgMin}px) /* breakpoints.lgOrLarger */`,
} as const;
