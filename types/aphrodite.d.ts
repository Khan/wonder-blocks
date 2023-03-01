declare module "aphrodite" {
    /**
     * A CSS property definition.
     */
    export type CSSProperties = Record<string, any>;

    /**
     * Aphrodite style declaration
     */
    export type StyleDeclaration = Record<string, any>;

    export interface StyleSheetStatic {
        /**
         * Create style sheet
         */
        create<T extends StyleDeclaration>(styles: T): T;
        /**
         * Rehydrate class names from server renderer
         */
        rehydrate(renderedClassNames: Array<string>): void;
    }

    export const StyleSheet: StyleSheetStatic;

    /**
     * Get class names from passed styles
     */
    export function css(...styles: Array<any>): string;
}
