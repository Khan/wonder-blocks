/**
 * A default set of media queries to use for different screen sizes.
 *
 * Breakpoint documentation: https://khanacademy.atlassian.net/wiki/spaces/WB/pages/2099970518/Layout+Breakpoints
 *
 */

export const pureXsMax = "567px";
export const pureSmMin = "568px";
export const pureSmMax = "681px";
export const pureMdMin = "682px";
export const pureMdMax = "1023px";
export const pureLgMin = "1024px";

export const mediaQueries = {
    // Named
    xs: `@media screen and (max-width: ${pureXsMax})`,
    sm: `@media screen and (min-width: ${pureSmMin}) and (max-width: ${pureSmMax})`,
    md: `@media screen and (min-width: ${pureMdMin}) and (max-width: ${pureMdMax})`,
    lg: `@media screen and (min-width: ${pureMdMin}) and (max-width: ${pureLgMin})`,
    xl: `@media screen and (min-width: ${pureLgMin})`,

    xsOrSmaller: `@media screen and (max-width: ${pureXsMax})`,
    smOrSmaller: `@media screen and (max-width: ${pureSmMax})`,
    mdOrSmaller: `@media screen and (max-width: ${pureMdMax})`,
    lgOrSmaller: `@media screen and (max-width: ${pureLgMin})`,

    smOrLarger: `@media screen and (min-width: ${pureSmMin})`,
    mdOrLarger: `@media screen and (min-width: ${pureMdMin})`,
    lgOrLarger: `@media screen and (min-width: ${pureLgMin})`,
} as const;
