// @flow
import {SettleSignal} from "./settle-signal.js";

/**
 * A controller for the `RespondWith` API to control response settlement.
 */
export class SettleController {
    #signal: SettleSignal;

    constructor() {
        this.#signal = new SettleSignal();
    }

    /**
     * The signal to pass to the `RespondWith` API.
     */
    get signal(): SettleSignal {
        return this.#signal;
    }

    /**
     * Settle the signal and therefore any associated responses.
     *
     * @throws {Error} if the signal has already been settled.
     */
    settle(): void {
        this.#signal.settle();
    }
}
