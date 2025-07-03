/**
 * A signal for controlling the `RespondWith` API responses.
 *
 * This provide finely-grained control over the promise lifecycle to support
 * complex test scenarios.
 */
export class SettleSignal extends EventTarget {
    private _settled = false;

    constructor(
        setSettleFn: ((settleFn: () => void) => unknown) | null = null,
    ) {
        super();

        // If we were given a function, we call it with a method that will
        // settle ourselves. This allows the appropriate SettleController
        // to be in charge of settling this instance.
        setSettleFn?.(() => {
            if (this._settled) {
                throw new Error("SettleSignal already settled");
            }
            this._settled = true;
            this.dispatchEvent(new Event("settled"));
        });
    }

    /**
     * An already settled signal.
     */
    static settle(): SettleSignal {
        const signal = new SettleSignal();
        signal._settled = true;
        return signal;
    }

    /**
     * Has this signal been settled yet?
     */
    get settled(): boolean {
        return this._settled;
    }
}
