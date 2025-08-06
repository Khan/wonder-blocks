import * as React from "react";

/**
 * A `ModalElement` is a React element that should either itself be a modal
 * (OnePaneDialog), or wrap a modal.
 *
 * If it's a wrapper component, then its props must be passed along to the child
 * modal, because we clone this element and add new props in order to capture
 * `onClose` events.
 *
 * NOTE(kevinb): we include `| null` here because that's what React.FC<> returns.
 */
export type ModalElement = React.ReactElement | null;

/**
 * The position of the modal, with logical support for RTL (Right-to-Left).
 * `inlineStart` is left-aligned in LTR,
 * `inlineEnd` is right-aligned in LTR,
 * `blockEnd` is bottom-aligned.
 */
export type DrawerAlignment = "inlineStart" | "inlineEnd" | "blockEnd";
