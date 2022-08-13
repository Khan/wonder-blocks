// @flow
/**
 * A signal for controlling the `RespondWith` API responses.
 *
 * This provide finely-grained control over the promise lifecycle to support
 * complex test scenarios.
 */
export class SettleSignal extends EventTarget {
    #settled: boolean = false;

    constructor(setSettleFn: ?(settleFn: () => void) => mixed = null) {
        super();

        setSettleFn?.(() => {
            if (this.#settled) {
                throw new Error("SettleSignal already settled");
            }
            this.#settled = true;
            this.dispatchEvent(new Event("settled"));
        });
    }

    /**
     * An already settled signal.
     */
    static settle(): SettleSignal {
        const signal = new SettleSignal();
        signal.#settled = true;
        return signal;
    }

    /**
     * Has this signal been settled yet?
     */
    get settled(): boolean {
        return this.#settled;
    }
}
