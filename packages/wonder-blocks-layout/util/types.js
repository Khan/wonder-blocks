// @flow

export type MediaSize = "small" | "medium" | "large";

export type MediaQuery = "all" | "mdOrSmaller" | "mdOrLarger" | MediaSize;

// eslint-disable-next-line flowtype/require-exact-type
export type MediaSpec = {
    [sizeName: MediaSize]: {
        /** The query to use to match the viewport against. */
        query: string,
        /** The total number of columns to use for the layout. */
        totalColumns: number,
        /** The width of the gutter between columns, in pixels. */
        gutterWidth: number,
        /** The width of the margin, wrapping the row, in pixels. */
        marginWidth: number,
        /** A possible maximum width to have on the layout. */
        maxWidth?: number,
    },
};
