import * as React from "react";

import type {CSSProperties} from "aphrodite";

import type {AriaAttributes, AriaRole} from "./aria-types";

type NestedArray<T> = ReadonlyArray<T | NestedArray<T>>;
type Falsy = false | 0 | null | undefined;
export type StyleType =
    | CSSProperties
    | Falsy
    | NestedArray<CSSProperties | Falsy>;

export type AriaProps = Readonly<AriaAttributes> &
    Readonly<{
        role?: AriaRole;
    }>;

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
    /**
     * Optional attribute to indicate to the Screen Reader which language the
     * item text is in.
     */
    lang?: string;
    /**
     * Optional CSS classes for the entire dropdown component.
     */
    className?: string;

    htmlFor?: string;
    tabIndex?: number;
    id?: string;
    title?: string;

    // TODO(kevinb) remove the need for this
    "data-modal-launcher-portal"?: boolean;
    // Used by tooltip bubble
    "data-placement"?: string;
} & AriaProps &
    EventHandlers;

/**
 * Interface implemented by types that can provide identifiers.
 */
export interface IIdentifierFactory {
    get(id: string): string;
}

export * from "./types.propsfor";
