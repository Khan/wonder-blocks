import * as React from "react";

import type {CSSProperties} from "aphrodite";

type NestedArray<T> = ReadonlyArray<T | NestedArray<T>>;
type Falsy = false | 0 | null | undefined;
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
    | "combobox" // abstract role
    | "command"
    | "complementary" // abstract role
    | "composite"
    | "contentinfo"
    | "dialog"
    | "directory"
    | "document"
    | "form"
    | "grid"
    | "gridcell"
    | "group"
    | "heading"
    | "img" // abstract role
    | "input" // abstract role
    | "landmark"
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
    | "radiogroup" // abstract role
    | "range"
    | "region" // abstract role
    | "reletype"
    | "row"
    | "rowgroup"
    | "rowheader"
    | "scrollbar"
    | "search" // abstract role
    | "section" // abstract role
    | "sectionhead" // abstract role
    | "select"
    | "separator"
    | "slider"
    | "spinbutton"
    | "status" // abstract role
    | "structure"
    | "tab"
    | "tablist"
    | "tabpanel"
    | "textbox"
    | "timer"
    | "toolbar"
    | "tooltip"
    | "tree"
    | "treegrid"
    | "treeitem" // abstract role
    // abstract role
    | "widget"
    | "window";

type IdRef = string;
type IdRefList = IdRef | Array<IdRef>;

// Source: https://www.w3.org/WAI/PF/aria-1.1/states_and_properties
// TODO(kevinb): convert to disjoint union of exact object types keyed on role
// eslint-disable-next-line ft-flow/require-exact-type
export type AriaProps = {
    role?: roles;
    ["aria-activedescendant"]?: IdRef;
    ["aria-atomic"]?: "false" | "true";
    ["aria-autocomplete"]?: "both" | "inline" | "list" | "none";
    ["aria-busy"]?: "true" | "false";
    ["aria-checked"]?: "false" | "mixed" | "true" | "undefined";
    ["aria-controls"]?: IdRefList;
    // https://www.w3.org/TR/wai-aria-1.1/#aria-current
    ["aria-current"]?:
        | "false"
        | "true"
        | "page"
        | "step"
        | "location"
        | "date"
        | "time";
    ["aria-describedat"]?: string; // URI,
    ["aria-describedby"]?: IdRefList;
    ["aria-disabled"]?: "false" | "true";
    ["aria-dropeffect"]?:
        | "copy"
        | "execute"
        | "link"
        | "move"
        | "none"
        | "popup";
    ["aria-expanded"]?: "false" | "true" | "undefined";
    ["aria-flowto"]?: IdRefList;
    ["aria-grabbed"]?: "false" | "true" | "undefined";
    ["aria-haspopup"]?: "false" | "true";
    ["aria-hidden"]?: "false" | "true";
    ["aria-invalid"]?: "grammar" | "false" | "spelling" | "true";
    ["aria-label"]?: string;
    ["aria-labelledby"]?: IdRefList;
    ["aria-level"]?: number; // integer,
    ["aria-live"]?: "assertive" | "off" | "polite";
    ["aria-multiline"]?: "false" | "true";
    ["aria-multiselectable"]?: "false" | "true";
    ["aria-orientation"]?: "horizontal" | "vertical";
    ["aria-owns"]?: IdRefList;
    ["aria-posinset"]?: number; // integer,
    ["aria-pressed"]?: "false" | "mixed" | "true" | "undefined";
    ["aria-readonly"]?: "false" | "true";
    ["aria-relevant"]?: undefined; // Not using aria-relevant is a best practice,
    ["aria-required"]?: "false" | "true";
    ["aria-selected"]?: "false" | "true" | "undefined";
    ["aria-setsize"]?: number; // integer,
    ["aria-sort"]?: "ascending" | "descending" | "none" | "other";
    ["aria-valuemax"]?: number;
    ["aria-valuemin"]?: number;
    ["aria-valuenow"]?: number;
    ["aria-valuetext"]?: string;
    ["aria-modal"]?: "false" | "true";
};

type MouseEvents = {
    onMouseDown?: (e: React.MouseEvent) => unknown;
    onMouseUp?: (e: React.MouseEvent) => unknown;
    onMouseMove?: (e: React.MouseEvent) => unknown;
    onClick?: (e: React.MouseEvent) => unknown;
    onDoubleClick?: (e: React.MouseEvent) => unknown;
    onMouseEnter?: (e: React.MouseEvent) => unknown;
    onMouseLeave?: (e: React.MouseEvent) => unknown;
    onMouseOut?: (e: React.MouseEvent) => unknown;
    onMouseOver?: (e: React.MouseEvent) => unknown;
    onDrag?: (e: React.MouseEvent) => unknown;
    onDragEnd?: (e: React.MouseEvent) => unknown;
    onDragEnter?: (e: React.MouseEvent) => unknown;
    onDragExit?: (e: React.MouseEvent) => unknown;
    onDragLeave?: (e: React.MouseEvent) => unknown;
    onDragOver?: (e: React.MouseEvent) => unknown;
    onDragStart?: (e: React.MouseEvent) => unknown;
    onDrop?: (e: React.MouseEvent) => unknown;
};

type KeyboardEvents = {
    onKeyDown?: (e: React.KeyboardEvent) => unknown;
    onKeyPress?: (e: React.KeyboardEvent) => unknown;
    onKeyUp?: (e: React.KeyboardEvent) => unknown;
};

type InputEvents = {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
    onInput?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
    onInvalid?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
    onSubmit?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
};

type TouchEvents = {
    onTouchCancel?: (e: React.TouchEvent) => unknown;
    onTouchEnd?: (e: React.TouchEvent) => unknown;
    onTouchMove?: (e: React.TouchEvent) => unknown;
    onTouchStart?: (e: React.TouchEvent) => unknown;
};

type FocusEvents = {
    onFocus?: (e: React.FocusEvent) => unknown;
    onBlur?: (e: React.FocusEvent) => unknown;
};

type EventHandlers = MouseEvents &
    KeyboardEvents &
    InputEvents &
    TouchEvents & // TODO: add remaining supported events https://reactjs.org/docs/events.html#supported-events
    FocusEvents;

// Props shared between Text and View components.
// NOTE(jeresig): We want to leave the props for these open so that we can
// handle uncommon props for elements (e.g. htmlFor for labels).
// eslint-disable-next-line ft-flow/require-exact-type
export type TextViewSharedProps = {
    /**
     * Text to appear on the button.
     */
    children?: React.ReactNode;
    /**
     * Optional custom styles.
     */
    style?: StyleType;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
    tabIndex?: number;
    id?: string;
    // TODO(kevinb) remove the need for this
    ["data-modal-launcher-portal"]?: boolean;
    // Used by tooltip bubble
    ["data-placement"]?: string;
} & AriaProps &
    EventHandlers;

/**
 * Interface implemented by types that can provide identifiers.
 */
export interface IIdentifierFactory {
    get(id: string): string;
}
