// @flow

// TODO(kevinb): better flow typings for style after updating flow
// type NestedArray<T> = $ReadOnlyArray<T | NestedArray<T>>;
// type Falsy = false | 0 | null | void;
// type StyleList<T> = T | Falsy | NestedArray<T | Falsy>;

// export type StyleType<T: Object> = StyleList<$ReadOnly<T>>;

export type StyleType<T: Object> = any; // eslint-disable-line no-unused-vars

export type TextTag = "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

// Source: https://www.w3.org/WAI/PF/aria-1.1/roles#role_definitions
type roles =
    | "alert"
    | "alertdialog"
    | "application"
    | "article"
    | "banner"
    | "button"
    | "checkbox"
    | "columnheader"
    | "combobox"
    | "command" // abstract role
    | "complementary"
    | "composite" // abstract role
    | "contentinfo"
    | "dialog"
    | "directory"
    | "document"
    | "form"
    | "grid"
    | "gridcell"
    | "group"
    | "heading"
    | "img"
    | "input" // abstract role
    | "landmark" // abstract role
    | "link"
    | "list"
    | "listbox"
    | "listitem"
    | "log"
    | "main"
    | "marquee"
    | "math"
    | "menu"
    | "menubar"
    | "menuitem"
    | "menuitemcheckbox"
    | "menuitemradio"
    | "navigation"
    | "note"
    | "option"
    | "presentation"
    | "progressbar"
    | "radio"
    | "radiogroup"
    | "range" // abstract role
    | "region"
    | "reletype" // abstract role
    | "row"
    | "rowgroup"
    | "rowheader"
    | "scrollbar"
    | "search"
    | "section" // abstract role
    | "sectionhead" // abstract role
    | "select" // abstract role
    | "separator"
    | "slider"
    | "spinbutton"
    | "status"
    | "structure" // abstract role
    | "tab"
    | "tablist"
    | "tabpanel"
    | "textbox"
    | "timer"
    | "toolbar"
    | "tooltip"
    | "tree"
    | "treegrid"
    | "treeitem"
    | "widget" // abstract role
    // abstract role
    | "window";

type IdRef = string;
type IdRefList = IdRef | Array<IdRef>;

// Source: https://www.w3.org/WAI/PF/aria-1.1/states_and_properties
// TODO(kevinb): figure out how to type ID ref lists
export type AriaProps = {
    role?: roles,
    "aria-activedescendant"?: IdRef,
    "aria-atomic"?: "false" | "true",
    "aria-autocomplete"?: "both" | "inline" | "list" | "none",
    "aria-busy"?: "true" | "false",
    "aria-checked"?: "false" | "mixed" | "true" | "undefined",
    "aria-controls"?: IdRefList,
    "aria-describedat"?: string, // URI
    "aria-describedby"?: IdRefList,
    "aria-disabled"?: "false" | "true",
    "aria-dropeffect"?: "copy" | "execute" | "link" | "move" | "none" | "popup",
    "aria-expanded"?: "false" | "true" | "undefined",
    "aria-flowto"?: IdRefList,
    "aria-grabbed"?: "false" | "true" | "undefined",
    "aria-haspopup"?: "false" | "true",
    "aria-hidden"?: "false" | "true",
    "aria-invalid"?: "grammar" | "false" | "spelling" | "true",
    "aria-label"?: string,
    "aria-labelledby"?: IdRefList,
    "aria-level"?: number, // integer
    "aria-live"?: "assertive" | "off" | "polite",
    "aria-multiline"?: "false" | "true",
    "aria-multiselectable"?: "false" | "true",
    "aria-orientation"?: "horizontal" | "vertical",
    "aria-owns"?: IdRefList,
    "aria-posinset"?: number, // integer
    "aria-pressed"?: "false" | "mixed" | "true" | "undefined",
    "aria-readonly"?: "false" | "true",
    "aria-relevant"?: void, // Not using aria-relevant is a best practice
    "aria-required"?: "false" | "true",
    "aria-selected"?: "false" | "true" | "undefined",
    "aria-setsize"?: number, // integer
    "aria-sort"?: "ascending" | "descending" | "none" | "other",
    "aria-valuemax"?: number,
    "aria-valuemin"?: number,
    "aria-valuenow"?: number,
    "aria-valuetext"?: string,
};

export type Props = AriaProps & {
    style?: any,
    children?: any,
    [otherProp: string]: any,
};

export type MediaSize = "small" | "medium" | "large";

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
        /** Is there a maximum width enabled on this spec. */
        hasMaxWidth?: boolean,
    },
};

/**
 * Interface implemented by types that can provide identifiers.
 */
export interface IIdentifierFactory {
    get(id: string): string;
}
