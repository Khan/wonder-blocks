// @flow

/**
 * This interface should be implemented by types that are interested in the
 * notifications of active state being stolen. Generally, this would also be
 * subscribers that may also steal active state, but not necessarily.
 *
 * Once implemented, the type must call subscribe on a tracker to begin
 * receiving notifications.
 */
export interface IActiveTrackerSubscriber {
    /**
     * Notification raised when something steals the active state from a
     * subscribed tracker.
     */
    activeStateStolen: () => void;
}

/**
 * This class is used to track the concept of active state (though technically
 * that could be any boolean state). The tracker has a variety of subscribers
 * that receive notifications of state theft and can steal the state.
 *
 * For the tooltip, this enables us to have a single tooltip active at any one
 * time. The tracker allows tooltip anchors to coordinate which of them is
 * active, and to ensure that if a different one becomes active, all the others
 * know that they aren't.
 *
 * - When notified that the state has been stolen, subscribers can immediately
 * reflect that theft (in the case of a tooltip, they would hide themselves).
 * - The thief does not get notified if they were the one who stole the state
 * since they should already know that they did that (this avoids having to have
 * checks for reentrancy, for example).
 * - When the subscriber that owns the state no longer needs it, it can
 * voluntarily give it up.
 * - If the state is stolen while a subscriber owns the
 * state, that subscriber does not give up the state, as it doesn't have it
 * anymore (it was stolen).
 */
export default class ActiveTracker {
    _subscribers: Array<IActiveTrackerSubscriber> = [];
    _active: boolean;

    _getIndex(who: IActiveTrackerSubscriber) {
        return this._subscribers.findIndex((v) => v === who);
    }

    /**
     * Called when a tooltip anchor becomes active so that it can tell all other
     * anchors that they are no longer the active tooltip. Returns true if
     * the there was a steal of active state from another anchor; otherwise, if
     * no other anchor had been active, returns false.
     */
    steal(who: IActiveTrackerSubscriber) {
        const wasActive = !!this._active;
        this._active = true;
        for (const anchor of this._subscribers) {
            if (anchor === who) {
                // We don't need to notify the thief.
                continue;
            }
            anchor.activeStateStolen();
        }
        return wasActive;
    }

    /**
     * Called if a tooltip doesn't want to be active anymore.
     * Should not be called when being told the active spot was stolen by
     * another anchor, only when the anchor is unhovered and unfocused and they
     * were active.
     */
    giveup() {
        this._active = false;
    }

    /**
     * Subscribes a tooltip anchor to the tracker so that it can be notified of
     * steals. Returns a method that can be used to unsubscribe the anchor from
     * notifications.
     */
    subscribe(who: IActiveTrackerSubscriber): () => void {
        if (this._getIndex(who) >= 0) {
            throw new Error("Already subscribed.");
        }
        this._subscribers.push(who);

        const unsubscribe = () => {
            const index = this._getIndex(who);
            this._subscribers.splice(index, 1);
        };
        return unsubscribe;
    }
}
