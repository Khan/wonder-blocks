declare module "aphrodite" {
    import * as React from "react";

    type _CSSProperties = React.CSSProperties & {
        MsFlexBasis?: React.CSSProperties["flexBasis"];
        MsFlexPreferredSize?: React.CSSProperties["flexBasis"];
        WebkitFlexBasis?: React.CSSProperties["flexBasis"];
        flexBasis?: React.CSSProperties["flexBasis"];
    };

    /**
     * A CSS property definition.
     */
    export type CSSProperties = _CSSProperties & {
        "::placeholder"?: _CSSProperties;
        ":after"?: _CSSProperties;
        ":focus-visible"?: _CSSProperties;
        ":focus"?: _CSSProperties;
        ":hover"?: _CSSProperties;

        "@media (max-width: 1023px)"?: _CSSProperties;
        "@media (min-width: 1024px)"?: _CSSProperties;
        "@media (min-width: 1168px)"?: _CSSProperties;

        "::-moz-focus-inner"?: _CSSProperties;
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
