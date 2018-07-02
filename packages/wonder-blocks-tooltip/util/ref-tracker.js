// @flow
/**
 * This is a little helper that we can use to wrap the react-popper reference
 * update methods so that we can convert a regular React ref into a DOM node
 * as react-popper expects, and also ensure we only update react-popper
 * on actual changes, and not just renders of the same thing.
 */
import * as React from "react";
import * as ReactDOM from "react-dom";

import type {getRefFn} from "../util/types.js";

export default class RefTracker {
    updateRef: getRefFn;
    _lastRef: ?HTMLElement;
    _targetFn: ?(?HTMLElement) => void;

    updateRef = (ref: ?(React.Component<*> | Element)) => {
        if (ref) {
            // We only want to update the reference if it is
            // actually changed. Otherwise, we can trigger another render that
            // would then update the reference again and just keep looping.
            const domNode = ReactDOM.findDOMNode(ref);
            if (domNode instanceof HTMLElement && domNode !== this._lastRef) {
                this._lastRef = domNode;
                this._targetFn && this._targetFn(domNode);
            }
        }
    };

    setCallback = (targetFn: ?(?HTMLElement) => void) => {
        if (this._targetFn !== targetFn) {
            if (targetFn && typeof targetFn !== "function") {
                throw new Error("targetFn must be a function");
            }

            this._targetFn = targetFn || null;
            if (this._lastRef && this._targetFn) {
                this._targetFn(this._lastRef);
            }
        }
    };
}
