// @flow
import React, {MouseEvent, KeyboardEvent, TouchEvent, FormEvent, FocusEvent, ReactNode} from "react";

import {OpenCSSProperties} from "aphrodite";

type Falsy = false | 0 | null | void;

interface NestedArray<T> extends ReadonlyArray<T | NestedArray<T>> { };

export type StyleType =
    | OpenCSSProperties
    | Falsy
    | NestedArray<OpenCSSProperties | Falsy>;

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
type IdRefList = IdRef; //  | Array<IdRef>;

// Source: https://www.w3.org/WAI/PF/aria-1.1/states_and_properties
// TODO(kevinb): convert to disjoint union of exact object types keyed on role
// eslint-disable-next-line flowtype/require-exact-type
export type AriaProps = {
    role?: roles,
    "aria-activedescendant"?: IdRef,
    "aria-atomic"?: "false" | "true",
    "aria-autocomplete"?: "both" | "inline" | "list" | "none",
    "aria-busy"?: "true" | "false",
    "aria-checked"?: "false" | "mixed" | "true" | boolean,
    "aria-controls"?: IdRefList,
    "aria-describedat"?: string, // URI
    "aria-describedby"?: IdRefList,
    "aria-disabled"?: "false" | "true",
    "aria-dropeffect"?: "copy" | "execute" | "link" | "move" | "none" | "popup",
    "aria-expanded"?: "false" | "true" | boolean,
    "aria-flowto"?: IdRefList,
    "aria-grabbed"?: "false" | "true" | boolean,
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
    "aria-pressed"?: "false" | "mixed" | "true" | boolean,
    "aria-readonly"?: "false" | "true",
    "aria-relevant"?: "text" | "all" | "additions" | "additions text" | "removals", // Not using aria-relevant is a best practice
    "aria-required"?: "false" | "true",
    "aria-selected"?: "false" | "true" | boolean,
    "aria-setsize"?: number, // integer
    "aria-sort"?: "ascending" | "descending" | "none" | "other",
    "aria-valuemax"?: number,
    "aria-valuemin"?: number,
    "aria-valuenow"?: number,
    "aria-valuetext"?: string,
};

type MouseEvents = {
    onMouseDown?: (e: MouseEvent) => unknown,
    onMouseUp?: (e: MouseEvent) => unknown,
    onMouseMove?: (e: MouseEvent) => unknown,
    onClick?: (e: MouseEvent) => unknown,
    onDoubleClick?: (e: MouseEvent) => unknown,
    onMouseEnter?: (e: MouseEvent) => unknown,
    onMouseLeave?: (e: MouseEvent) => unknown,
    onMouseOut?: (e: MouseEvent) => unknown,
    onMouseOver?: (e: MouseEvent) => unknown,
    onDrag?: (e: MouseEvent) => unknown,
    onDragEnd?: (e: MouseEvent) => unknown,
    onDragEnter?: (e: MouseEvent) => unknown,
    onDragExit?: (e: MouseEvent) => unknown,
    onDragLeave?: (e: MouseEvent) => unknown,
    onDragOver?: (e: MouseEvent) => unknown,
    onDragStart?: (e: MouseEvent) => unknown,
    onDrop?: (e: MouseEvent) => unknown,
};

type KeyboardEvents = {
    onKeyDown?: (e: KeyboardEvent) => unknown,
    onKeyPress?: (e: KeyboardEvent) => unknown,
    onKeyUp?: (e: KeyboardEvent) => unknown,
};

type InputEvents = {
    onChange?: (e: FormEvent) => unknown,
    onInput?: (e: FormEvent) => unknown,
    onInvalid?: (e: FormEvent) => unknown,
    onSubmit?: (e: FormEvent) => unknown,
};

type TouchEvents = {
    onTouchCancel?: (e: TouchEvent) => unknown,
    onTouchEnd?: (e: TouchEvent) => unknown,
    onTouchMove?: (e: TouchEvent) => unknown,
    onTouchStart?: (e: TouchEvent) => unknown,
};

type FocusEvents = {
    onFocus?: (e: FocusEvent) => unknown,
    onBlur?: (e: FocusEvent) => unknown,
};

type EventHandlers =
    MouseEvents & KeyboardEvents & InputEvents & TouchEvents & FocusEvents;
    // TODO: add remaining supported events https://reactjs.org/docs/events.html#supported-events


// Props shared between Text and View components.
// NOTE(jeresig): We want to leave the props for these open so that we can
// handle uncommon props for elements (e.g. htmlFor for labels).
// eslint-disable-next-line flowtype/require-exact-type
export type TextViewSharedProps = {
    /**
     * Text to appear on the button.
     */
    children?: ReactNode,

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

    // TODO(kevinb) remove the need for this
    "data-modal-launcher-portal"?: boolean,

    // Used by tooltip bubble
    "data-placement"?: string,
} & AriaProps & EventHandlers;

/**
 * Interface implemented by types that can provide identifiers.
 */
export interface IIdentifierFactory {
    get(id: string): string;
}
