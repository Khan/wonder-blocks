// @flow
export interface IActiveTrackerSubscriber {
    activeStateStolen: () => void;
}

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
