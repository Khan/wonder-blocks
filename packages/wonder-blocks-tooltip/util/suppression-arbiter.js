// @flow
import type {ICanBeSuppressed} from "./types.js";

/**
 * This class provides facilities for tracking any number of suppressees
 * and arbitrating which ones are active or supressed based on which was
 * tracked most recently and those that are being tracked as a whole.
 */
export default class SuppressionArbiter {
    _activeStack: Array<ICanBeSuppressed> = [];

    _getIndex(suppressee: ICanBeSuppressed) {
        return this._activeStack.findIndex((s) => s === suppressee);
    }

    track(suppressee: ICanBeSuppressed) {
        // If we are already tracking this suppressee, then throw.
        const index = this._getIndex(suppressee);
        if (index >= 0) {
            throw new Error(
                "Attempting to track suppressee already being tracked",
            );
        }
        // Replace the currently active suppressee with this new one.
        const currentActive = this._activeStack[0];
        this._activeStack.unshift(suppressee);
        if (currentActive) {
            // If we had an active suppressee, suppress it and tell the new
            // active arbiter to instantly unsuppress.
            currentActive.suppress();
            suppressee.unsuppress(true);
        } else {
            // If we don't have an active suppressee, then unsuppress the new
            // one, but not instantly.
            suppressee.unsuppress(false);
        }
    }

    untrack(suppressee: ICanBeSuppressed) {
        // If we don't have this suppressee in our tracking, then throw.
        const index = this._getIndex(suppressee);
        if (index < 0) {
            throw new Error(
                "Attempted to untrack suppressee that wasn't being tracked",
            );
        }
        // Remove the arbiter from the stack.
        this._activeStack.splice(index, 1);
        suppressee.suppress();
        if (index === 0 && this._activeStack.length > 0) {
            // If we removed the active suppressee and we have another in our
            // stack, then unsuppress that one instantly.
            this._activeStack[0].unsuppress(true);
        }
    }
}
