// @flow
import * as React from "react";

/**
 * A `ModalElement` is a React element that should either itself be a modal
 * (StandardModal, OneColumnModal, TwoColumnModal), or wrap a modal.
 *
 * If it's a wrapper component, then its props must be passed along to the child
 * modal, because we clone this element and add new props in order to capture
 * `onClose` events.
 */
export type ModalElement = React.Element<any>;
