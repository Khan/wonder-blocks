import {SettleSignal} from "./settle-signal";

/**
 * A controller for the `RespondWith` API to control response settlement.
 */
export class SettleController {
    private _settleFn: undefined | (() => void);
    private _signal: SettleSignal;

    constructor() {
        // Create our signal.
        // We pass in a method to capture it's settle function so that
        // only we can call it.
        this._signal = new SettleSignal(
            (settleFn: () => void) => (this._settleFn = settleFn),
        );
    }

    /**
     * The signal to pass to the `RespondWith` API.
     */
    get signal(): SettleSignal {
        return this._signal;
    }

    /**
     * Settle the signal and therefore any associated responses.
     *
     * @throws {Error} if the signal has already been settled.
     */
    settle(): void {
        this._settleFn?.();
    }
}
