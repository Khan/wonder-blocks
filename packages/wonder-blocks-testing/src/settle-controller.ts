import {SettleSignal} from "./settle-signal";

/**
 * A controller for the `RespondWith` API to control response settlement.
 */
export class SettleController {
    // @ts-expect-error [FEI-5019] - TS2564 - Property '#settleFn' has no initializer and is not definitely assigned in the constructor.
    #settleFn: () => void;
    #signal: SettleSignal;

    constructor() {
        // Create our signal.
        // We pass in a method to capture it's settle function so that
        // only we can call it.
        this.#signal = new SettleSignal(
            (settleFn: () => void) => (this.#settleFn = settleFn),
        );
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
        this.#settleFn();
    }
}
