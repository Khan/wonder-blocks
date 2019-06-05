// @flow
import * as React from "react";

import type {CSSProperties} from "aphrodite";

type NestedArray<T> = $ReadOnlyArray<T | NestedArray<T>>;
type Falsy = false | 0 | null | void;
export type StyleType =
    | CSSProperties
    | Falsy
    | NestedArray<CSSProperties | Falsy>;

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
export type AriaProps = {|
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
|};

type MouseEvents = {|
    onMouseDown?: (e: SyntheticMouseEvent<*>) => mixed,
    onMouseUp?: (e: SyntheticMouseEvent<*>) => mixed,
    onMouseMove?: (e: SyntheticMouseEvent<*>) => mixed,
    onClick?: (e: SyntheticMouseEvent<*>) => mixed,
    onDoubleClick?: (e: SyntheticMouseEvent<*>) => mixed,
    onMouseEnter?: (e: SyntheticMouseEvent<*>) => mixed,
    onMouseLeave?: (e: SyntheticMouseEvent<*>) => mixed,
    onMouseOut?: (e: SyntheticMouseEvent<*>) => mixed,
    onMouseOver?: (e: SyntheticMouseEvent<*>) => mixed,
    onDrag?: (e: SyntheticMouseEvent<*>) => mixed,
    onDragEnd?: (e: SyntheticMouseEvent<*>) => mixed,
    onDragEnter?: (e: SyntheticMouseEvent<*>) => mixed,
    onDragExit?: (e: SyntheticMouseEvent<*>) => mixed,
    onDragLeave?: (e: SyntheticMouseEvent<*>) => mixed,
    onDragOver?: (e: SyntheticMouseEvent<*>) => mixed,
    onDragStart?: (e: SyntheticMouseEvent<*>) => mixed,
    onDrop?: (e: SyntheticMouseEvent<*>) => mixed,
|};

type KeyboardEvents = {|
    onKeyDown?: (e: SyntheticKeyboardEvent<*>) => mixed,
    onKeyPress?: (e: SyntheticKeyboardEvent<*>) => mixed,
    onKeyUp?: (e: SyntheticKeyboardEvent<*>) => mixed,
|};

type InputEvents = {|
    onChange?: (e: SyntheticInputEvent<*>) => mixed,
    onInput?: (e: SyntheticInputEvent<*>) => mixed,
    onInvalid?: (e: SyntheticInputEvent<*>) => mixed,
    onSubmit?: (e: SyntheticInputEvent<*>) => mixed,
|};

type TouchEvents = {|
    onTouchCancel?: (e: SyntheticTouchEvent<*>) => mixed,
    onTouchEnd?: (e: SyntheticTouchEvent<*>) => mixed,
    onTouchMove?: (e: SyntheticTouchEvent<*>) => mixed,
    onTouchStart?: (e: SyntheticTouchEvent<*>) => mixed,
|};

type FocusEvents = {|
    onFocus?: (e: SyntheticFocusEvent<*>) => mixed,
    onBlur?: (e: SyntheticFocusEvent<*>) => mixed,
|};

type EventHandlers = {|
    ...MouseEvents,
    ...KeyboardEvents,
    ...InputEvents,
    ...TouchEvents,
    ...FocusEvents,
    // TODO: add remaining supported events https://reactjs.org/docs/events.html#supported-events
|};

// Props shared between Text and View components.
// NOTE(jeresig): We want to leave the props for these open so that we can
// handle uncommon props for elements (e.g. htmlFor for labels).
// eslint-disable-next-line flowtype/require-exact-type
export type TextViewSharedProps = {
    /**
     * Text to appear on the button.
     */
    children?: React.Node,

    /**
     * Optional custom styles.
     */
    style?: StyleType,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,

    tabIndex?: number,

    id?: string,

    tag?: string,

    // TODO(kevinb) remove the need for this
    "data-modal-launcher-portal"?: boolean,

    // Used by tooltip bubble
    "data-placement"?: string,

    ...AriaProps,

    ...EventHandlers,
};

/**
 * Interface implemented by types that can provide identifiers.
 */
export interface IIdentifierFactory {
    get(id: string): string;
}
