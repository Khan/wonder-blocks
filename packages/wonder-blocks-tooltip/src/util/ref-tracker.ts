/**
 * This is a little helper that we can use to wrap the react-popper reference
 * update methods so that we can convert a regular React ref into a DOM node
 * as react-popper expects, and also ensure we only update react-popper
 * on actual changes, and not just renders of the same thing.
 */
import * as React from "react";
import * as ReactDOM from "react-dom";

import type {PopperChildrenProps} from "react-popper";

type PopperRef = PopperChildrenProps["ref"];
type TargetFn = (target?: HTMLElement | null) => void;

export default class RefTracker {
    _lastRef: HTMLElement | null | undefined;
    _targetFn: TargetFn | undefined;

    updateRef: (
        ref?: React.Component<any> | Element | null | undefined,
    ) => void = (ref) => {
        if (ref) {
            // We only want to update the reference if it is
            // actually changed. Otherwise, we can trigger another render that
            // would then update the reference again and just keep looping.
            // eslint-disable-next-line import/no-deprecated
            const domNode = ReactDOM.findDOMNode(ref);
            if (domNode instanceof HTMLElement && domNode !== this._lastRef) {
                this._lastRef = domNode;
                this._targetFn?.(domNode);
            }
        }
    };

    setCallback: (targetFn?: PopperRef | null | undefined) => void = (
        targetFn,
    ) => {
        if (this._targetFn !== targetFn) {
            if (targetFn && typeof targetFn !== "function") {
                throw new Error("targetFn must be a function");
            }

            this._targetFn = targetFn || undefined;
            if (this._lastRef && this._targetFn) {
                this._targetFn(this._lastRef);
            }
        }
    };
}
