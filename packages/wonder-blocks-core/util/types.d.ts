import { MouseEvent, KeyboardEvent, TouchEvent, FormEvent, FocusEvent, ReactNode } from "react";
import { OpenCSSProperties } from "aphrodite";
declare type Falsy = false | 0 | null | void;
interface NestedArray<T> extends ReadonlyArray<T | NestedArray<T>> {
}
export declare type StyleType = OpenCSSProperties | Falsy | NestedArray<OpenCSSProperties | Falsy>;
declare type roles = "alert" | "alertdialog" | "application" | "article" | "banner" | "button" | "checkbox" | "columnheader" | "combobox" | "command" | "complementary" | "composite" | "contentinfo" | "dialog" | "directory" | "document" | "form" | "grid" | "gridcell" | "group" | "heading" | "img" | "input" | "landmark" | "link" | "list" | "listbox" | "listitem" | "log" | "main" | "marquee" | "math" | "menu" | "menubar" | "menuitem" | "menuitemcheckbox" | "menuitemradio" | "navigation" | "note" | "option" | "presentation" | "progressbar" | "radio" | "radiogroup" | "range" | "region" | "reletype" | "row" | "rowgroup" | "rowheader" | "scrollbar" | "search" | "section" | "sectionhead" | "select" | "separator" | "slider" | "spinbutton" | "status" | "structure" | "tab" | "tablist" | "tabpanel" | "textbox" | "timer" | "toolbar" | "tooltip" | "tree" | "treegrid" | "treeitem" | "widget" | "window";
declare type IdRef = string;
declare type IdRefList = IdRef;
export declare type AriaProps = {
    role?: roles;
    "aria-activedescendant"?: IdRef;
    "aria-atomic"?: "false" | "true";
    "aria-autocomplete"?: "both" | "inline" | "list" | "none";
    "aria-busy"?: "true" | "false";
    "aria-checked"?: "false" | "mixed" | "true" | boolean;
    "aria-controls"?: IdRefList;
    "aria-describedat"?: string;
    "aria-describedby"?: IdRefList;
    "aria-disabled"?: "false" | "true";
    "aria-dropeffect"?: "copy" | "execute" | "link" | "move" | "none" | "popup";
    "aria-expanded"?: "false" | "true" | boolean;
    "aria-flowto"?: IdRefList;
    "aria-grabbed"?: "false" | "true" | boolean;
    "aria-haspopup"?: "false" | "true";
    "aria-hidden"?: "false" | "true";
    "aria-invalid"?: "grammar" | "false" | "spelling" | "true";
    "aria-label"?: string;
    "aria-labelledby"?: IdRefList;
    "aria-level"?: number;
    "aria-live"?: "assertive" | "off" | "polite";
    "aria-multiline"?: "false" | "true";
    "aria-multiselectable"?: "false" | "true";
    "aria-orientation"?: "horizontal" | "vertical";
    "aria-owns"?: IdRefList;
    "aria-posinset"?: number;
    "aria-pressed"?: "false" | "mixed" | "true" | boolean;
    "aria-readonly"?: "false" | "true";
    "aria-relevant"?: "text" | "all" | "additions" | "additions text" | "removals";
    "aria-required"?: "false" | "true";
    "aria-selected"?: "false" | "true" | boolean;
    "aria-setsize"?: number;
    "aria-sort"?: "ascending" | "descending" | "none" | "other";
    "aria-valuemax"?: number;
    "aria-valuemin"?: number;
    "aria-valuenow"?: number;
    "aria-valuetext"?: string;
};
declare type MouseEvents = {
    onMouseDown?: (e: MouseEvent) => unknown;
    onMouseUp?: (e: MouseEvent) => unknown;
    onMouseMove?: (e: MouseEvent) => unknown;
    onClick?: (e: MouseEvent) => unknown;
    onDoubleClick?: (e: MouseEvent) => unknown;
    onMouseEnter?: (e: MouseEvent) => unknown;
    onMouseLeave?: (e: MouseEvent) => unknown;
    onMouseOut?: (e: MouseEvent) => unknown;
    onMouseOver?: (e: MouseEvent) => unknown;
    onDrag?: (e: MouseEvent) => unknown;
    onDragEnd?: (e: MouseEvent) => unknown;
    onDragEnter?: (e: MouseEvent) => unknown;
    onDragExit?: (e: MouseEvent) => unknown;
    onDragLeave?: (e: MouseEvent) => unknown;
    onDragOver?: (e: MouseEvent) => unknown;
    onDragStart?: (e: MouseEvent) => unknown;
    onDrop?: (e: MouseEvent) => unknown;
};
declare type KeyboardEvents = {
    onKeyDown?: (e: KeyboardEvent) => unknown;
    onKeyPress?: (e: KeyboardEvent) => unknown;
    onKeyUp?: (e: KeyboardEvent) => unknown;
};
declare type InputEvents = {
    onChange?: (e: FormEvent) => unknown;
    onInput?: (e: FormEvent) => unknown;
    onInvalid?: (e: FormEvent) => unknown;
    onSubmit?: (e: FormEvent) => unknown;
};
declare type TouchEvents = {
    onTouchCancel?: (e: TouchEvent) => unknown;
    onTouchEnd?: (e: TouchEvent) => unknown;
    onTouchMove?: (e: TouchEvent) => unknown;
    onTouchStart?: (e: TouchEvent) => unknown;
};
declare type FocusEvents = {
    onFocus?: (e: FocusEvent) => unknown;
    onBlur?: (e: FocusEvent) => unknown;
};
declare type EventHandlers = MouseEvents & KeyboardEvents & InputEvents & TouchEvents & FocusEvents;
export declare type TextViewSharedProps = {
    /**
     * Text to appear on the button.
     */
    children?: ReactNode;
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
    "data-modal-launcher-portal"?: boolean;
    "data-placement"?: string;
} & AriaProps & EventHandlers;
/**
 * Interface implemented by types that can provide identifiers.
 */
export interface IIdentifierFactory {
    get(id: string): string;
}
export {};
