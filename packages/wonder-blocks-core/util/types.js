// @flow
import * as React from "react";

import type {CSSProperties} from "aphrodite";

type NestedArray<T> = $ReadOnlyArray<T | NestedArray<T>>;
type Falsy = false | 0 | null | void;
export type StyleType =
    | CSSProperties
    | Falsy
    | NestedArray<CSSProperties | Falsy>;

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
// TODO(kevinb): convert to disjoint union of exact object types keyed on role
// eslint-disable-next-line flowtype/require-exact-type
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
    style?: StyleType,
    children?: React.Node,
    [otherProp: string]: any,
};

/**
 * Interface implemented by types that can provide identifiers.
 */
export interface IIdentifierFactory {
    get(id: string): string;
}
