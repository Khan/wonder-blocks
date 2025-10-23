/**
 * A default set of media queries to use for different screen sizes.
 *
 * Breakpoint documentation: https://khanacademy.atlassian.net/wiki/spaces/WB/pages/2099970518/Layout+Breakpoints
 *
 */

/* Pure width values */
const width = {
    xsMax: 567,
    smMin: 568,
    smMax: 681,
    mdMin: 682,
    mdMax: 1023,
    lgMin: 1024,
} as const;

// Adapted from Classroom for zoom support
const pxShortScreenHeightBreakpoint = "500px"; // Arbitary breakpoint for screen height

/* Named mediaQuery conditions */
const mediaQuery = {
    // Note: any updates to this will need to be replicated in /types/aphrodite.d.ts
    xs: `@media screen and (max-width: ${width.xsMax}px) /* breakpoint.mediaQuery.xs */`,
    sm: `@media screen and (min-width: ${width.smMin}px) and (max-width: ${width.smMax}px) /* breakpoint.mediaQuery.sm */`,
    md: `@media screen and (min-width: ${width.mdMin}px) and (max-width: ${width.mdMax}px) /* breakpoint.mediaQuery.md */`,
    lg: `@media screen and (min-width: ${width.mdMin}px) and (max-width: ${width.lgMin}px) /* breakpoint.mediaQuery.lg */`,
    xl: `@media screen and (min-width: ${width.lgMin}px) /* breakpoint.mediaQuery.xl */`,

    xsOrSmaller: `@media screen and (max-width: ${width.xsMax}px) /* breakpoint.mediaQuery.xsOrSmaller */`,
    smOrSmaller: `@media screen and (max-width: ${width.smMax}px) /* breakpoint.mediaQuery.smOrSmaller */`,
    mdOrSmaller: `@media screen and (max-width: ${width.mdMax}px) /* breakpoint.mediaQuery.mdOrSmaller */`,
    lgOrSmaller: `@media screen and (max-width: ${width.lgMin}px) /* breakpoint.mediaQuery.lgOrSmaller */`,

    smOrLarger: `@media screen and (min-width: ${width.smMin}px) /* breakpoint.mediaQuery.smOrLarger */`,
    mdOrLarger: `@media screen and (min-width: ${width.mdMin}px) /* breakpoint.mediaQuery.mdOrLarger */`,
    lgOrLarger: `@media screen and (min-width: ${width.lgMin}px) /* breakpoint.mediaQuery.lgOrLarger */`,

    shortHeight: `@media screen and (max-height:${pxShortScreenHeightBreakpoint})`,
} as const;

export const breakpoint = {
    width,
    mediaQuery,
};
