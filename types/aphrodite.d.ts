declare module "aphrodite" {
    import * as React from "react";

    const xs = "@media screen and (max-width: 567px) /* breakpoints.xs */";
    const sm =
        "@media screen and (min-width: 568px) and (max-width: 681px) /* breakpoints.sm */";
    const md =
        "@media screen and (min-width: 682px) and (max-width: 1023px) /* breakpoints.md */";
    const lg =
        "@media screen and (min-width: 682px) and (max-width: 1024px) /* breakpoints.lg */";
    const xl = "@media screen and (min-width: 1024px) /* breakpoints.xl */";
    const xsOrSmaller =
        "@media screen and (max-width: 567px) /* breakpoints.xsOrSmaller */";
    const smOrSmaller =
        "@media screen and (max-width: 681px) /* breakpoints.smOrSmaller */";
    const mdOrSmaller =
        "@media screen and (max-width: 1023px) /* breakpoints.mdOrSmaller */";
    const lgOrSmaller =
        "@media screen and (min-width: 1024px) /* breakpoints.lgOrLarger */";
    const smOrLarger =
        "@media screen and (min-width: 568px) /* breakpoints.smOrLarger */";
    const mdOrLarger =
        "@media screen and (min-width: 682px) /* breakpoints.mdOrLarger */";
    const lgOrLarger =
        "@media screen and (min-width: 1024px) /* breakpoints.lgOrLarger */";

    type _CSSProperties = React.CSSProperties & {
        /**
         * Browser Specific
         */
        MsFlexBasis?: React.CSSProperties["flexBasis"];
        MsFlexPreferredSize?: React.CSSProperties["flexBasis"];
        WebkitFlexBasis?: React.CSSProperties["flexBasis"];
        flexBasis?: React.CSSProperties["flexBasis"];
        "::-moz-focus-inner"?: React.CSSProperties;

        /**
         * Media queries
         */
        "@media (max-width: 1023px)"?: React.CSSProperties;
        "@media (min-width: 1024px)"?: React.CSSProperties;
        "@media (min-width: 1168px)"?: React.CSSProperties;

        [xs]?: React.CSSProperties;
        [sm]?: React.CSSProperties;
        [md]?: React.CSSProperties;
        [lg]?: React.CSSProperties;
        [xl]?: React.CSSProperties;
        [xsOrSmaller]?: React.CSSProperties;
        [smOrSmaller]?: React.CSSProperties;
        [mdOrSmaller]?: React.CSSProperties;
        [lgOrSmaller]?: React.CSSProperties;
        [smOrLarger]?: React.CSSProperties;
        [mdOrLarger]?: React.CSSProperties;
        [lgOrLarger]?: React.CSSProperties;
    };

    /**
     * A CSS property definition.
     */
    export type CSSProperties = _CSSProperties & {
        /**
         * Pseudo-selectors
         */
        "::placeholder"?: _CSSProperties;
        ":active"?: _CSSProperties;
        ":after"?: _CSSProperties;
        ":first-child"?: _CSSProperties;
        ":focus-visible"?: _CSSProperties;
        ":focus:not(:focus-visible)"?: _CSSProperties;
        ":focus"?: _CSSProperties;
        ":hover"?: _CSSProperties;
        ":last-child"?: _CSSProperties;
    };

    /**
     * Aphrodite style declaration
     */
    export type StyleDeclaration = Record<string, CSSProperties>;

    export interface StyleSheetStatic {
        /**
         * Create style sheet
         */
        create(styles: StyleDeclaration): StyleDeclaration;
        /**
         * Rehydrate class names from server renderer
         */
        rehydrate(renderedClassNames: Array<string>): void;
    }

    export const StyleSheet: StyleSheetStatic;

    type Falsy = false | 0 | null | undefined;

    /**
     * Get class names from passed styles
     */
    export function css(...styles: Array<CSSProperties | Falsy>): string;
}
