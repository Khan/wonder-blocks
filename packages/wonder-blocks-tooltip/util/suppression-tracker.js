// @flow
import {setFlushableTimeout} from "@khanacademy/wonder-blocks-core";

import type {FlushableTimeout} from "@khanacademy/wonder-blocks-core";
import type {ICanBeSuppressed} from "./types.js";

/**
 * This class provides facilities for tracking any number of suppressees
 * and arbitrating which ones are active or supressed based on which was
 * tracked most recently and those that are being tracked as a whole.
 */
export default class SuppressionTracker {
    _activeStack: Array<ICanBeSuppressed> = [];

    _firstUnsuppressDelay: ?number;
    _lastSuppressDelay: ?number;

    _suppressTimeout: ?FlushableTimeout;
    _unsuppressTimeout: ?FlushableTimeout;

    /**
     * @param {number} firstUnsuppressDelay Optional. Delay to apply before
     * calling unsuppress on a suppressee if it is the first item being tracked.
     *
     * @param {number} lastSuppressDelay Optional. Delay to apply before
     * calling suppress on a suppressee if it is the last item being tracked.
     */
    constructor(firstUnsuppressDelay?: ?number, lastSuppressDelay?: ?number) {
        this._firstUnsuppressDelay = firstUnsuppressDelay;
        this._lastSuppressDelay = lastSuppressDelay;
    }

    _getIndex(suppressee: ICanBeSuppressed) {
        return this._activeStack.findIndex((s) => s === suppressee);
    }

    track(suppressee: ICanBeSuppressed) {
        if (this._unsuppressTimeout) {
            // If we are about to unsuppress an item, let's cancel that
            // because this will be adding a new item to unsuppress.
            this._unsuppressTimeout.clear();
        }
        const hadPendingSuppress = !!this._suppressTimeout;
        if (this._suppressTimeout) {
            // If we have a delayed suppression waiting to occur, let's flush
            // that to make it happen now.
            this._suppressTimeout.flush();
        }

        // If we are already tracking this suppressee, then throw.
        const index = this._getIndex(suppressee);
        if (index >= 0) {
            throw new Error(
                "Attempting to track suppressee already being tracked",
            );
        }
        const previouslyActive = this._activeStack[0];
        this._activeStack.unshift(suppressee);
        if (previouslyActive) {
            // Replace the previously active suppressee with this new one.
            previouslyActive.suppress(true);
        }

        if (
            hadPendingSuppress ||
            previouslyActive ||
            !this._firstUnsuppressDelay
        ) {
            // This is either not our first item or we don't have a delay for
            // first unsuppress, so instantly unsuppress.
            suppressee.unsuppress(true);
        } else {
            // This is our first one and we have a delay for first unsupress,
            // so we unsuppress it on a timeout.
            this._unsuppressTimeout = setFlushableTimeout(
                (flushed) => suppressee.unsuppress(flushed),
                this._firstUnsuppressDelay,
            );
            this._unsuppressTimeout.promise.then(
                () => (this._unsuppressTimeout = null),
            );
        }
    }

    untrack(suppressee: ICanBeSuppressed) {
        // NOTE: No need to check for pending suppressions because that can
        // only happen after a track and we already flush them when calling
        // track, so there won't be one here.

        // If we don't have this suppressee in our tracking, then throw.
        const index = this._getIndex(suppressee);
        if (index < 0) {
            throw new Error(
                "Attempted to untrack suppressee that wasn't being tracked",
            );
        }

        // Remove the suppressee from the stack.
        this._activeStack.splice(index, 1);

        if (this._activeStack.length > 0 || !this._lastSuppressDelay) {
            // If there are other things being tracked that we can switch to,
            // or we don't have a delay for last supress, suppress instantly.
            suppressee.suppress(true);

            if (this._activeStack.length > 0 && index === 0) {
                // If we removed the active suppressee and we have another in
                // our stack, then unsuppress the new one instantly.
                this._activeStack[0].unsuppress(true);
            }
        } else {
            // This is our last one and we have a delay for last supress,
            // so we suppress it on a timeout.
            this._suppressTimeout = setFlushableTimeout(
                (flushed) => suppressee.suppress(flushed),
                this._lastSuppressDelay,
            );
            this._suppressTimeout.promise.then(
                () => (this._suppressTimeout = null),
            );
        }
    }
}
